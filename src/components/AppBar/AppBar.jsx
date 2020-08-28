import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuRoundedIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchRoundedIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import SideDrawer from './SideDrawer';
import * as actionCreators from '../../store/actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.appBar + 2,
		[theme.breakpoints.up('lg')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('lg')]: {
			display: 'none'
		}
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.55), // was black 0.15
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.75) // was black 0.25
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto'
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, // vertical padding + font size from searchIcon
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch'
			}
		}
	},
	// necessary for content to be below app bar
	content: {
		flexGrow: 1,
		padding: 0,
		backgroundColor: theme.palette.common.white
	},
	displayNone: {
		display: 'none'
	}
}));

function TopBar(props) {
	const classes = useStyles();

	const handleDrawerToggle = () => {
		props.onShowSideDrawer();
	};

	return (
		<div className={classes.root}>
			<AppBar
				position="absolute"
				color="transparent"
				className={clsx(classes.appBar, {
					[classes.displayNone]: props.showFiltersPanel
				})}
				elevation={0}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuRoundedIcon />
					</IconButton>
					<Box flexGrow="1" justifyContent="flex-start"></Box>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchRoundedIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
				</Toolbar>
			</AppBar>

			<SideDrawer />

			<main className={classes.content}>{props.children}</main>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel,
		showSideDrawer: state.showSideDrawer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onShowSideDrawer: () => dispatch(actionCreators.showSideDrawer()),
		onHideSideDrawer: () => dispatch(actionCreators.hideSideDrawer())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

import React, { useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
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

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.appBar + 2,
		[theme.breakpoints.up('lg')]: {
			width: `calc(100% - ${theme.mixins.sideMenu.width}px)`,
			marginLeft: theme.mixins.sideMenu.width
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
		backgroundColor: fade(theme.palette.common.black, 0.15), // was black 0.15
		'&:hover': {
			backgroundColor: fade(theme.palette.common.black, 0.25) // was black 0.25
		},
		backgroundBlendMode: 'darken',
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
		backgroundColor: theme.palette.background.paper
	},
	displayNone: {
		display: 'none'
	}
}));

function TopBar({
	setCurrentUserData,
	currentUserData,
	setShowSideDrawer,
	showFiltersPanel,
	setShowSnackbar,
	...props
}) {
	const classes = useStyles();

	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		axios
			.get('https://api.vomad.guide/auth/login/success', {
				withCredentials: true,
				crossorigin: true,
				cancelToken: source.token
			})
			.then((response) => {
				if (mounted) {
					if (response.status === 200) return response.data.user;
					else throw new Error('failed to authenticate user');
				}
			})
			.then((user) => {
				if (mounted) {
					setCurrentUserData({ id: user.user_id, username: user.user_name }, true);
					setShowSnackbar({
						snackData: {
							type: 'success',
							message: 'Welcome back, ' + user.user_name
						}
					});
				}
			})
			.catch((error) => {
				if (mounted) {
					setCurrentUserData(null, false);
				}
			});

		return () => {
			mounted = false;
			source.cancel('Auth call cancelled during clean-up');
		};
	}, [setCurrentUserData, setShowSnackbar]);

	const handleDrawerToggle = () => {
		setShowSideDrawer();
	};

	return (
		<div className={classes.root}>
			<AppBar
				position="absolute"
				color="transparent"
				className={clsx(classes.appBar, {
					[classes.displayNone]: showFiltersPanel
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
		showSideDrawer: state.showSideDrawer,
		currentUserData: state.currentUserData
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setShowSideDrawer: () => dispatch(actionCreators.showSideDrawer()),
		setCurrentUserData: (user, isAuth) =>
			dispatch(actionCreators.setCurrentUserData(user, isAuth)),
		setShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData }))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

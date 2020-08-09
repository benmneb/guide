import React, { useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import BathtubIcon from '@material-ui/icons/Bathtub';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenuIcon from '@material-ui/icons/Menu';
import GetAppIcon from '@material-ui/icons/GetApp';
import Toolbar from '@material-ui/core/Toolbar';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('lg')]: {
			width: drawerWidth,
			flexShrink: 0
		}
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
	title: {
		flexGrow: 1
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.black, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.black, 0.25)
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
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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
	toolbar: {
		height: 64,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	drawerPaper: {
		width: drawerWidth
	},
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
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<div className={classes.toolbar}>
				<img
					style={{ height: 30, marginTop: 5 }}
					src={require('../../assets/logo.png')}
					alt="Vomad Guide: Find Vegan Products Near You"
				/>
			</div>
			<Divider />
			<List>
				<ListItem button>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={'Home'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<FastfoodIcon />
					</ListItemIcon>
					<ListItemText primary={'Food & Drink'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<BathtubIcon />
					</ListItemIcon>
					<ListItemText primary={'Household'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<AddCircleOutlineIcon />
					</ListItemIcon>
					<ListItemText primary={'Add Products'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<FavoriteIcon />
					</ListItemIcon>
					<ListItemText primary={'Support Us'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<VisibilityIcon />
					</ListItemIcon>
					<ListItemText primary={'Advertise'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<GetAppIcon />
					</ListItemIcon>
					<ListItemText primary={'Get the App'} />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button>
					<ListItemText primary="Terms of Use" />
				</ListItem>
				<ListItem button>
					<ListItemText primary="Privacy Policy" />
				</ListItem>
			</List>
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />

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
						<MenuIcon />
					</IconButton>
					<Box flexGrow="1" justifyContent="flex-start"></Box>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
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

			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden lgUp implementation="js">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden mdDown implementation="js">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>{props.children}</main>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel
	};
};

export default connect(mapStateToProps)(TopBar);

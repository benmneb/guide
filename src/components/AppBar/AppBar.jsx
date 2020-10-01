import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	AppBar,
	Toolbar,
	IconButton,
	InputBase,
	Button,
	Tooltip,
	Box
} from '@material-ui/core';
import { MenuRounded, SearchRounded, AccountCircleRounded } from '@material-ui/icons';
import { fade, makeStyles } from '@material-ui/core/styles';
import SideDrawer from './SideDrawer';
import {
	setIsUsingEmailAuthRoute,
	showSnackbar,
	showSideDrawer
} from '../../store/actions';
import { usePrepareLink, getParams, getEnums } from '../../utils/routing';

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
		marginRight: theme.spacing(1),
		[theme.breakpoints.up('lg')]: {
			display: 'none'
		}
	},
	logo: {
		height: 25,
		marginTop: theme.spacing(0.5),
		'&:hover': {
			cursor: 'pointer'
		}
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.black, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.black, 0.25)
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
	profileButton: {
		padding: theme.spacing(1)
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

export default function TopBar({ children }) {
	const styles = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const currentUserData = useSelector((state) => state.auth.currentUserData);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const showFiltersPanel = useSelector((state) => state.ui.showFiltersPanel);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(
				showSnackbar({
					snackData: {
						type: 'success',
						message: 'Welcome back, ' + currentUserData.username
					}
				})
			);
		}
	}, [isAuthenticated, dispatch, currentUserData]);

	const handleDrawerToggle = () => {
		dispatch(showSideDrawer());
	};

	function handleLoginClick() {
		dispatch(setIsUsingEmailAuthRoute('login'));
		history.push(authLink);
	}

	function handleSignUpClick() {
		dispatch(setIsUsingEmailAuthRoute('join'));
		history.push(authLink);
	}

	const advertiseLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.advertise
		}
	});
	const supportUsLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.supportUs
		}
	});
	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		}
	});
	const userProfileLink = usePrepareLink(
		isAuthenticated && {
			query: {
				[getParams.popup]: getEnums.popup.userProfile
			},
			pushToQuery: {
				[getParams.userId]: currentUserData.id
			}
		}
	);

	return (
		<Box className={styles.root}>
			<AppBar
				position="absolute"
				color="transparent"
				className={clsx(styles.appBar, {
					[styles.displayNone]: showFiltersPanel
				})}
				elevation={0}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={styles.menuButton}
					>
						<MenuRounded />
					</IconButton>
					<Box
						display={{ xs: 'none', sm: 'inherit', lg: 'none' }}
						onClick={handleDrawerToggle}
					>
						<img
							className={styles.logo}
							src="https://ik.imagekit.io/vomadguide/logo/logo_a_nCYxlAP.png"
							alt="Vomad Guide: The Vegan Product Guide"
						/>
					</Box>
					<Box flexGrow="1" justifyContent="flex-start"></Box>
					<Box className={styles.search}>
						<Box className={styles.searchIcon}>
							<SearchRounded />
						</Box>
						<InputBase
							placeholder="Search…"
							classes={{
								root: styles.inputRoot,
								input: styles.inputInput
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Box>
					<Box display={{ xs: 'none', md: 'inline-flex' }} marginLeft={1}>
						<Button component={Link} to={advertiseLink}>
							Advertise
						</Button>
						<Button component={Link} to={supportUsLink}>
							Support Us
						</Button>
					</Box>
					<Box display={{ xs: 'none', sm: 'inline-flex' }}>
						{isAuthenticated ? (
							<Box marginLeft={0}>
								<Tooltip title="View your profile and settings">
									<IconButton
										edge="end"
										component={Link}
										to={userProfileLink}
										classes={{ root: styles.profileButton }}
									>
										<AccountCircleRounded fontSize="large" />
									</IconButton>
								</Tooltip>
							</Box>
						) : (
							<>
								<Box marginLeft={1}>
									<Button variant="outlined" onClick={handleLoginClick}>
										Login
									</Button>
								</Box>
								<Box marginLeft={1}>
									<Button variant="contained" color="primary" onClick={handleSignUpClick}>
										Sign up
									</Button>
								</Box>
							</>
						)}
					</Box>
				</Toolbar>
			</AppBar>

			<SideDrawer />

			<Box component="main" className={styles.content}>
				{children}
			</Box>
		</Box>
	);
}

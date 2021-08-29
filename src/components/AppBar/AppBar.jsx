import { useEffect, useRef } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { useConfirm } from 'material-ui-confirm';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Button, Tooltip, Box } from '@material-ui/core';
import { MenuRounded, AccountCircleRounded, LockOpenRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import SideDrawer from './SideDrawer';
import {
	setIsUsingEmailAuthRoute,
	updateAuthState,
	showSnackbar,
	showSideDrawer,
	setDeferredInstallPrompt,
	setHasInstalledPWA
} from '../../store/actions';
import { usePrepareLink, getParams, getEnums } from '../../utils/routing';
import SearchBar from './SearchBar';
import UserAvatar from '../../utils/UserAvatar';

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
	profileButtonBox: {
		display: 'inline-flex',
		marginLeft: theme.spacing(1),
		[theme.breakpoints.up('md')]: {
			marginLeft: theme.spacing(0)
		}
	},
	profileButton: {
		padding: theme.spacing(1)
	},
	authButtonLabel: {
		whiteSpace: 'nowrap'
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
	const confirm = useConfirm();
	const dispatch = useDispatch();
	const currentUserData = useSelector((state) => state.auth.currentUserData);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const showFiltersPanel = useSelector((state) => state.ui.showFiltersPanel);
	const isFirstMount = useRef(true);

	const advertiseLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.advertise
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

	// check if PWA is installable on device
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
		dispatch(setDeferredInstallPrompt(e));
	});

	// check if user is installing PWA
	window.addEventListener('appinstalled', (evt) => {
		console.log('app installed', evt);
		dispatch(setHasInstalledPWA(true));
	});

	// show snackbar on first page load if logged in
	useEffect(() => {
		if (isAuthenticated && isFirstMount.current) {
			isFirstMount.current = false;
			const greeting =
				currentUserData.authState === 'new user created'
					? 'Welcome to the Guide, '
					: 'Welcome back, ';
			dispatch(
				showSnackbar({
					type: 'success',
					message: greeting + currentUserData.username
				})
			);
			// if they just registered, check for a temp account and ask to link it
			if (currentUserData.authState === 'new user created') {
				axios
					.get('/auth/check-temp-user')
					.then((res) => {
						confirm({
							title: 'Previous activity detected',
							description: `There are ${res.data[0].rating_count} product ratings associated with this device, do you want to connect this activity to your new account?`,
							confirmationText: 'Connect'
						})
							.then(() => {
								dispatch(updateAuthState('claimed'));
								axios
									.put(`/auth/link-user/${currentUserData.id}`, {
										temp_user_id: res.data[0].temp_user_id
									})
									.then(() => {
										dispatch(
											showSnackbar({
												type: 'success',
												color: 'info',
												message: 'Succesfully connected'
											})
										);
									})
									.catch((err) => {
										console.error(err.message);
										dispatch(
											showSnackbar({
												type: 'error',
												message: 'Something went wrong connecting the temporary account'
											})
										);
									});
							})
							.catch(() => {
								dispatch(updateAuthState('chose not to claim'));
							});
					})
					.catch((err) => {
						if (err.response.data === 'no temp user') {
							dispatch(updateAuthState('nothing to claim'));
						} else {
							console.log('While checking for a temp user:', err);
						}
					});
			}
		}
	}, [isAuthenticated, dispatch, currentUserData, confirm]);

	const handleDrawerToggle = () => {
		dispatch(showSideDrawer());
	};

	function handleAuthClick(route) {
		dispatch(setIsUsingEmailAuthRoute(route));
		history.push(authLink);
	}

	return (
		<Box className={styles.root}>
			<AppBar
				position="absolute"
				color="transparent"
				className={clsx('mui-fixed', styles.appBar, {
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
							src="https://images.vomad.guide/logos/vomadGUIDE.png"
							alt="🌱 Vomad Guide"
						/>
					</Box>
					<Box flexGrow="1" justifyContent="flex-start"></Box>
					<SearchBar />
					<Box display={{ xs: 'none', md: 'inline-flex' }} marginLeft={1}>
						<Tooltip title="Promote your brand on the Guide">
							<Button component={Link} to={advertiseLink}>
								Advertise
							</Button>
						</Tooltip>
						<Tooltip title="Support the Guide on Patreon">
							<Button
								component="a"
								href="https://www.patreon.com/vomad"
								target="_blank"
								rel="noopener noreferrer"
							>
								Support Us
							</Button>
						</Tooltip>
					</Box>
					{isAuthenticated ? (
						<Box display="inline-flex">
							<Box className={styles.profileButtonBox}>
								<Tooltip title="View your profile and settings">
									<IconButton
										edge="end"
										component={Link}
										to={userProfileLink}
										classes={{ root: styles.profileButton }}
									>
										{currentUserData.avatar ? (
											<UserAvatar component="topbar" userData={currentUserData} />
										) : (
											<AccountCircleRounded fontSize="large" />
										)}
									</IconButton>
								</Tooltip>
							</Box>
						</Box>
					) : (
						<Box display="inline-flex">
							<Box display={{ xs: 'inline-flex', sm: 'none' }}>
								<Box marginLeft={1}>
									<IconButton
										color="inherit"
										edge="end"
										aria-label="login or sign up"
										onClick={() => handleAuthClick('join')}
									>
										<LockOpenRounded />
									</IconButton>
								</Box>
							</Box>
							<Box display={{ xs: 'none', sm: 'inline-flex' }}>
								<Box marginLeft={1}>
									<Button
										variant="outlined"
										onClick={() => handleAuthClick('login')}
										classes={{ label: styles.authButtonLabel }}
									>
										Login
									</Button>
								</Box>
								<Box marginLeft={1}>
									<Button
										variant="contained"
										color="primary"
										onClick={() => handleAuthClick('join')}
										classes={{ label: styles.authButtonLabel }}
									>
										Sign up
									</Button>
								</Box>
							</Box>
						</Box>
					)}
				</Toolbar>
			</AppBar>

			<SideDrawer />

			<Box component="main" className={styles.content}>
				{children}
			</Box>
		</Box>
	);
}

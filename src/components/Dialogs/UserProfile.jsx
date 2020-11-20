import { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '../../utils/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
	Button,
	Dialog,
	IconButton,
	Tooltip,
	Typography,
	Grid,
	Menu,
	MenuItem,
	ListItemIcon,
	Backdrop,
	CircularProgress,
	Box
} from '@material-ui/core';
import {
	PhotoCameraRounded,
	SettingsRounded,
	ExitToAppRounded,
	CloudUploadRounded,
	DeleteForeverRounded
} from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { red } from '@material-ui/core/colors';
import UserProfileSettings from './UserProfileSettings';
import { getTimeAgo } from '../../utils/timeAgo';
import {
	setCurrentUserData,
	showSnackbar,
	updateUsername,
	updateAvatar
} from '../../store/actions';
import UserAvatar from '../../utils/UserAvatar';

const useStyles = makeStyles((theme) => ({
	dialogContentRoot: {
		padding: theme.spacing(2)
	},
	karma: {
		color: theme.palette.grey[500],
		fontWeight: theme.typography.fontWeightBold,
		fontSize: '0.9rem',
		lineHeight: '2',
		width: '100%'
	},
	avatar: {
		width: 200,
		height: 200,
		fontSize: '3rem'
	},
	input: {
		display: 'none'
	},
	logoutButton: {
		marginLeft: theme.spacing(1)
	},
	deleteAvatarButton: {
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
		'&:hover': {
			backgroundColor: red[700]
		}
	},
	backdrop: {
		zIndex: theme.zIndex.modal + 1,
		color: '#fff'
	}
}));

export default function UserProfile({ isOpened }) {
	const styles = useStyles();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const confirm = useConfirm();
	const currentUserData = useSelector((state) => state.auth.currentUserData);
	const urlSearchParamsId = useRef(new URLSearchParams(location.search).get('id'));
	const [showSettingsModal, setShowSettingsModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [isOwnProfile, setIsOwnProfile] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [pending, setPending] = useState(false);

	// get user data on load
	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (isOpened) {
			axios
				.get(`/user/${urlSearchParamsId.current}`, {
					cancelToken: source.token
				})
				.then((res) => mounted && setSelectedUser(res.data[0]))
				.catch((err) => {
					if (mounted) {
						dispatch(
							showSnackbar({
								type: 'error',
								title: 'Could not load user details',
								message: 'Something went wrong. Please try again.'
							})
						);
						console.error(err);
					}
				});
		}

		return () => {
			mounted = false;
			source.cancel('User modal call cancelled during clean-up');
		};
	}, [isOpened, dispatch]);

	// check if its their own profile
	useEffect(() => {
		let mounted = true;
		if (mounted && currentUserData)
			setIsOwnProfile(currentUserData.id === Number(urlSearchParamsId.current));
		return () => (mounted = false);
	}, [currentUserData]);

	const goBack = useCallback(() => {
		if (location.search.includes('?view=user')) {
			history.push(location.pathname + location.search.split('?view=user')[0]);
		} else if (location.search.includes('&view=user')) {
			history.push(location.pathname + location.search.split('&view=user')[0]);
		} else history.push(location.pathname);
	}, [history, location.pathname, location.search]);

	const onClose = () => {
		if (isOpened) {
			goBack();
		}
	};

	function handleShowSettingsModal() {
		setShowSettingsModal(true);
	}

	function handleHideSettingsModal() {
		setShowSettingsModal(false);
	}

	function handleLogoutClick() {
		confirm({
			description: 'Please confirm you want to log out of your account.',
			confirmationText: 'Log out'
		})
			.then(() => {
				dispatch(setCurrentUserData(null, false));
				return (window.location.href = 'https://api.vomad.guide/auth/logout');
			})
			.catch(() => null);
	}

	const handleClickChangeAvatar = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseAvatarMenu = () => {
		setAnchorEl(null);
	};

	function handleAvatarUpload(e) {
		confirm({
			description:
				'Please confirm you want to change your avatar to the image you just selected. If you chose a large file, this might take a while.',
			confirmationText: 'Change avatar'
		})
			.then(() => {
				setPending('Uploading');
				const data = new FormData();
				data.append('image', e.target.files[0]);
				axios
					.post(`/avatar/image-upload/${currentUserData.id}`, data)
					.then((res) => {
						const releventUrl = `https://${res.data.imageUrl.split('amazonaws.com/')[1]}`;
						axios
							.post('/avatar/image-update', {
								user_id: currentUserData.id,
								avatar: releventUrl
							})
							.then(() => {
								setPending(false);
								dispatch(
									showSnackbar({
										type: 'info',
										message: 'Image uploaded'
									})
								);
								getNewAvatarAfterUpload();
							})
							.catch((err) => {
								setPending(false);
								dispatch(
									showSnackbar({
										type: 'error',
										title: 'Could not change avatar',
										message: `${err.message}. Please try again.`
									})
								);
								console.error(err.message);
							});
					})
					.catch((err) => {
						setPending(false);
						dispatch(
							showSnackbar({
								type: 'error',
								title: 'Could not change avatar',
								message: `${err.message}. Please try again.`
							})
						);
						console.error(err.message);
					});
			})
			.catch(() => null);
	}

	async function getNewAvatarAfterUpload() {
		try {
			const response = await axios.get(`/user/${currentUserData.id}`);
			const avatar = await response.data[0].avatar;
			setSelectedUser((prev) => ({ ...prev, avatar }));
			dispatch(updateAvatar(avatar));
		} catch (err) {
			console.error(err);
			dispatch(
				showSnackbar({
					type: 'info',
					title: 'Your new avatar was uploaded',
					message:
						'But we had trouble refreshing the data. Check back soon and you should see the new image.'
				})
			);
		}
	}

	function handleDeleteAvatar() {
		handleCloseAvatarMenu();

		if (!selectedUser.avatar) {
			return dispatch(
				showSnackbar({
					type: 'error',
					title: "You can't delete the default avatar",
					message: 'If you want to change it, upload a new one.'
				})
			);
		}

		confirm({
			description: 'Please confirm you want to delete your avatar.',
			confirmationText: 'Delete avatar',
			confirmationButtonProps: { className: styles.deleteAvatarButton }
		})
			.then(() => {
				setPending('Deleting');
				axios
					.delete(`/avatar/image-delete/${currentUserData.id}`)
					.then(() => {
						setPending(false);
						setSelectedUser((prev) => ({ ...prev, avatar: null }));
						dispatch(updateAvatar(null));
						dispatch(
							showSnackbar({
								type: 'info',
								message: 'Avatar deleted'
							})
						);
					})
					.catch((err) => {
						setPending(false);
						console.error(err);
						if (err.response.data === 'no avatar found') {
							dispatch(
								showSnackbar({
									type: 'error',
									message: "You can't delete the default avatar."
								})
							);
						} else {
							dispatch(
								showSnackbar({
									type: 'error',
									title: 'Could not delete avatar',
									message: 'Something went wrong. Please try again.'
								})
							);
						}
					});
			})
			.catch(() => null);
	}

	function handleUpdateUsername(username) {
		dispatch(updateUsername(username));
		setSelectedUser((prev) => ({ ...prev, user_name: username }));
	}

	return (
		<>
			<Dialog
				onClose={onClose}
				aria-label="user-profile"
				open={Boolean(isOpened)}
				maxWidth="xs"
				fullWidth
			>
				<DialogTitle noTitle onClose={onClose} />
				<DialogContent className={styles.dialogContentRoot}>
					<Grid
						component="header"
						container
						spacing={3}
						direction="column"
						alignItems="center"
					>
						<Grid item container xs={12} direction="column" alignItems="center">
							{selectedUser ? (
								<>
									<Box display="block">
										<Tooltip
											title={`Karma is an expression of ${
												isOwnProfile ? 'your' : 'this users'
											} total activity on the Guide. You accrue more positive karma by leaving ratings and reviews, and tagging and voting on stores.`}
										>
											<Typography
												className={styles.karma}
												variant="overline"
												component="span"
												align="center"
											>
												{selectedUser.points !== null ? `+${selectedUser.points}` : '0'}{' '}
												karma
											</Typography>
										</Tooltip>
									</Box>
									<Typography component="h1" variant="h4" align="center">
										{selectedUser.user_name}
									</Typography>
								</>
							) : (
								<Box display="flex" flexDirection="column" alignItems="center">
									<Typography variant="overline">
										<Skeleton width={110} />
									</Typography>
									<Typography variant="h4">
										<Skeleton width={220} />
									</Typography>
								</Box>
							)}
						</Grid>
						<Grid
							item
							container
							xs={12}
							direction="column"
							justify="center"
							alignItems="center"
						>
							<Box
								display="flex"
								justifyContent="center"
								marginLeft={isOwnProfile ? 3 : 0}
							>
								{selectedUser ? (
									<UserAvatar userData={selectedUser} component="userProfile" />
								) : (
									<Skeleton variant="circle" className={styles.avatar} />
								)}
								{isOwnProfile && (
									<Box display="flex" flexDirection="column-reverse" marginLeft={-3}>
										<Tooltip title="Change avatar">
											<IconButton
												aria-label="change avatar"
												component="span"
												onClick={handleClickChangeAvatar}
											>
												<PhotoCameraRounded />
											</IconButton>
										</Tooltip>
									</Box>
								)}
							</Box>
						</Grid>
						<Grid
							item
							container
							xs={12}
							direction="column"
							justify="center"
							alignItems="center"
						>
							{selectedUser ? (
								<>
									<Typography>
										Ratings:{' '}
										<Box component="span" fontWeight="fontWeightBold">
											{selectedUser.total_ratings !== null
												? selectedUser.total_ratings
												: '0'}
										</Box>
									</Typography>
									<Typography>
										Reviews:{' '}
										<Box component="span" fontWeight="fontWeightBold">
											{selectedUser.total_reviews !== null
												? selectedUser.total_reviews
												: '0'}
										</Box>
									</Typography>
									<Typography>
										Stores tagged:{' '}
										<Box component="span" fontWeight="fontWeightBold">
											{selectedUser.stores_tagged !== null
												? selectedUser.stores_tagged
												: '0'}
										</Box>
									</Typography>
									<Typography>
										Joined{' '}
										<Box component="span" fontWeight="fontWeightBold">
											{getTimeAgo(new Date(selectedUser.joined_date)).toLowerCase()}
										</Box>
									</Typography>
								</>
							) : (
								<Box display="flex" flexDirection="column" alignItems="center">
									<Typography>
										<Skeleton width={100} />
									</Typography>
									<Typography>
										<Skeleton width={130} />
									</Typography>
									<Typography>
										<Skeleton width={200} />
									</Typography>
									<Typography>
										<Skeleton width={180} />
									</Typography>
								</Box>
							)}
							{isOwnProfile && (
								<Box marginTop={2} display="flex">
									<Button
										variant="outlined"
										onClick={handleShowSettingsModal}
										startIcon={<SettingsRounded />}
									>
										Settings
									</Button>
									<Button
										variant="outlined"
										onClick={handleLogoutClick}
										startIcon={<ExitToAppRounded />}
										className={styles.logoutButton}
									>
										Logout
									</Button>
								</Box>
							)}
						</Grid>
					</Grid>
					<Backdrop open={Boolean(pending)} className={styles.backdrop}>
						<Box display="flex" flexDirection="column" alignItems="center">
							<Typography gutterBottom>
								<Box component="span" fontWeight="fontWeightBold">
									{pending} image...
								</Box>
							</Typography>
							<CircularProgress color="inherit" />
						</Box>
					</Backdrop>
				</DialogContent>
			</Dialog>
			<Menu
				id="avatar-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleCloseAvatarMenu}
			>
				<input
					accept="image/png, image/jpeg, image/webp"
					className={styles.input}
					id="upload-avatar"
					type="file"
					onChange={handleAvatarUpload}
				/>
				<label htmlFor="upload-avatar">
					<MenuItem onClick={handleCloseAvatarMenu}>
						<ListItemIcon>
							<CloudUploadRounded />
						</ListItemIcon>
						Change avatar
					</MenuItem>
				</label>
				<MenuItem onClick={handleDeleteAvatar}>
					<ListItemIcon>
						<DeleteForeverRounded />
					</ListItemIcon>
					Delete avatar
				</MenuItem>
			</Menu>
			<UserProfileSettings
				show={showSettingsModal}
				hide={handleHideSettingsModal}
				updateUsername={handleUpdateUsername}
			/>
		</>
	);
}

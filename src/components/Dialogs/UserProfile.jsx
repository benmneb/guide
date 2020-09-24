import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '../../utils/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
	Avatar,
	Button,
	Dialog,
	IconButton,
	Tooltip,
	Typography,
	useMediaQuery,
	Grid,
	Box
} from '@material-ui/core';
import {
	PhotoCameraRounded,
	SettingsRounded,
	ExitToAppRounded
} from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import UserProfileSettings from './UserProfileSettings';
import { getTimeAgo } from '../../utils/timeAgo';
import randomMC from 'random-material-color';
import * as actionCreators from '../../store/actions';

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
	}
}));

function UserProfile({ isOpened, currentUserData, setCurrentUserData }) {
	const styles = useStyles();
	const history = useHistory();
	const location = useLocation();
	const confirm = useConfirm();
	const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
	const urlSearchParamsId = new URLSearchParams(location.search).get('id');
	const [showSettingsModal, setShowSettingsModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [isOwnProfile, setIsOwnProfile] = useState(false);

	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (isOpened) {
			axios
				.get(`https://api.vomad.guide/user/${urlSearchParamsId}`, {
					cancelToken: source.token
				})
				.then((response) => {
					if (mounted) setSelectedUser(response.data[0]);
				})
				.then(() => {
					if (mounted && currentUserData)
						setIsOwnProfile(currentUserData.id === Number(urlSearchParamsId));
				})
				.catch((err) => {
					if (mounted) console.error(err);
				});
		}

		return () => {
			mounted = false;
			source.cancel('User modal call cancelled during clean-up');
		};
	}, [urlSearchParamsId, setSelectedUser, isOpened, currentUserData]);

	const goBack = useCallback(() => {
		if (location.search.includes('?view=user')) {
			history.push(location.pathname + location.search.split('?view=user')[0]);
		} else if (location.search.includes('&view=user')) {
			history.push(location.pathname + location.search.split('&view=user')[0]);
		} else history.push(location.pathname);
	}, [history, location.pathname, location.search]);

	const onClose = () => {
		goBack();
	};

	function handleShowSettingsModal() {
		setShowSettingsModal(true);
	}

	function handleHideSettingsModal() {
		setShowSettingsModal(false);
	}

	function handleLogoutClick() {
		confirm({
			title: 'Log Out?',
			description: 'Please confirm you want to log out of your account.',
			confirmationText: 'Log out',
			confirmationButtonProps: { variant: 'contained', color: 'primary' },
			cancellationButtonProps: { autoFocus: true }
		})
			.then(() => {
				setCurrentUserData(null, false);
				return (window.location.href = 'https://api.vomad.guide/auth/logout');
			})
			.catch(() => null);
	}

	const color = selectedUser && randomMC.getColor({ text: selectedUser.user_name });

	return (
		<>
			<Dialog
				onClose={onClose}
				fullScreen={fullScreen}
				aria-labelledby="product-dialog-title"
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
									<Typography
										className={styles.karma}
										variant="overline"
										component="span"
										display="block"
										align="center"
									>
										+ TODO: karma
									</Typography>
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
									<Avatar
										src={selectedUser.avatar}
										alt={selectedUser.user_name.toUpperCase()}
										className={styles.avatar}
										style={{ backgroundColor: color }}
									>
										{selectedUser.user_name.charAt(0).toUpperCase()}
									</Avatar>
								) : (
									<Skeleton variant="circle" className={styles.avatar} />
								)}
								{isOwnProfile && (
									<Box display="flex" flexDirection="column-reverse" marginLeft={-3}>
										<input
											accept="image/*"
											className={styles.input}
											id="icon-button-file"
											type="file"
										/>
										<label htmlFor="icon-button-file">
											<Tooltip title="Upload a new avatar" enterDelay={1000}>
												<IconButton aria-label="upload a new avatar" component="span">
													<PhotoCameraRounded />
												</IconButton>
											</Tooltip>
										</label>
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
											TODO:
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
										style={{ marginLeft: 8 }}
									>
										Logout
									</Button>
								</Box>
							)}
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
			<UserProfileSettings show={showSettingsModal} hide={handleHideSettingsModal} />
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUserData: state.currentUserData
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentUserData: (user, isAuth) =>
			dispatch(actionCreators.setCurrentUserData(user, isAuth))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

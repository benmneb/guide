import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
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
import { user as fakeUser } from '../../assets/user';
import randomMC from 'random-material-color';

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

function UserProfile({ isOpened, currentUserData }) {
	const styles = useStyles();
	const history = useHistory();
	const location = useLocation();
	const confirm = useConfirm();
	const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
	const [showSettingsModal, setShowSettingsModal] = useState(false);

	const goBack = useCallback(() => {
		history.push(location.pathname);
	}, [history, location.pathname]);

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
			.then(() => (window.location.href = 'https://api.vomad.guide/auth/logout'))
			.catch(() => null);
	}

	const color = randomMC.getColor({ text: fakeUser[0].username });

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
							<Typography
								className={styles.karma}
								variant="overline"
								component="span"
								display="block"
								align="center"
							>
								{currentUserData ? (
									`+${fakeUser[0].karma} karma`
								) : (
									<Skeleton width={110} />
								)}
							</Typography>
							<Typography component="h1" variant="h4" align="center">
								{currentUserData ? currentUserData.username : <Skeleton width="30%" />}
							</Typography>
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
								marginLeft={
									currentUserData && fakeUser[0].id === currentUserData.id ? 3 : 0
								}
							>
								{currentUserData ? (
									<Avatar
										src={fakeUser[0].avatar}
										alt={String(currentUserData.username).toUpperCase()}
										className={styles.avatar}
										style={{ backgroundColor: color }}
									/>
								) : (
									<Skeleton variant="circle" className={styles.avatar} />
								)}
								{currentUserData && fakeUser[0].id === currentUserData.id && (
									<Box display="flex" flexDirection="column-reverse" marginLeft={-3}>
										<input
											accept="image/*"
											className={styles.input}
											id="icon-button-file"
											type="file"
										/>
										<label htmlFor="icon-button-file">
											<Tooltip title="Upload a new avatar" enterDelay={1000}>
												<IconButton aria-label="upload avatar" component="span">
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
							<Typography>
								Ratings:{' '}
								<Box component="span" fontWeight="fontWeightBold">
									{fakeUser[0].ratings.length}
								</Box>
							</Typography>
							<Typography>
								Reviews:{' '}
								<Box component="span" fontWeight="fontWeightBold">
									{fakeUser[0].reviews.length}
								</Box>
							</Typography>
							<Typography>
								Stores tagged:{' '}
								<Box component="span" fontWeight="fontWeightBold">
									{fakeUser[0].storesTagged.length}
								</Box>
							</Typography>
							<Typography>
								Joined{' '}
								<Box component="span" fontWeight="fontWeightBold">
									{getTimeAgo(fakeUser[0].joinedDate)}
								</Box>
							</Typography>
							{currentUserData && fakeUser[0].id === currentUserData.id && (
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
			<UserProfileSettings
				show={showSettingsModal}
				hide={handleHideSettingsModal}
				userId={currentUserData && currentUserData.id}
			/>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUserData: state.currentUserData
	};
};
export default connect(mapStateToProps)(UserProfile);

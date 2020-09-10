import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
	Avatar,
	Button,
	Dialog,
	IconButton,
	Typography,
	useMediaQuery,
	Grid,
	Box
} from '@material-ui/core';
import { CloseRounded, PhotoCameraRounded, SettingsRounded } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import UserProfileSettings from './UserProfileSettings';
import { getTimeAgo } from '../../utils/timeAgo';
import { user } from '../../assets/user';

const useStyles = makeStyles((theme) => ({
	closeBtnContainer: {
		margin: 0,
		padding: 0
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	},
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

function ProductModal({ showUserProfileModal, onToggleUserProfileModal }) {
	const styles = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	const [showSettingsModal, setShowSettingsModal] = useState(false);

	const currentUserId = 4; // 4 is what the user.js is

	const onCloseModal = () => {
		onToggleUserProfileModal();
	};

	function handleShowSettingsModal() {
		setShowSettingsModal(true);
	}

	function handleHideSettingsModal() {
		setShowSettingsModal(false);
	}

	return (
		<>
			<Dialog
				onClose={onCloseModal}
				fullScreen={fullScreen}
				aria-labelledby="product-dialog-title"
				open={showUserProfileModal}
				maxWidth="xs"
				fullWidth
			>
				<MuiDialogTitle disableTypography className={styles.closeBtnContainer}>
					<IconButton
						aria-label="close"
						className={styles.closeButton}
						onClick={onCloseModal}
					>
						<CloseRounded />
					</IconButton>
				</MuiDialogTitle>
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
								{user ? `+${user[0].karma} karma` : <Skeleton width={110} />}
							</Typography>
							<Typography component="h1" variant="h4" align="center">
								{user ? user[0].username : <Skeleton width="30%" />}
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
								marginLeft={user && user[0].id === currentUserId ? 3 : 0}
							>
								{user ? (
									<Avatar
										src={user[0].avatar}
										alt={user[0].username}
										className={styles.avatar}
									/>
								) : (
									<Skeleton variant="circle" className={styles.avatar} />
								)}
								{user && user[0].id === currentUserId && (
									<Box display="flex" flexDirection="column-reverse" marginLeft={-3}>
										<input
											accept="image/*"
											className={styles.input}
											id="icon-button-file"
											type="file"
										/>
										<label htmlFor="icon-button-file">
											<IconButton aria-label="upload avatar" component="span">
												<PhotoCameraRounded />
											</IconButton>
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
									{user[0].ratings.length}
								</Box>
							</Typography>
							<Typography>
								Reviews:{' '}
								<Box component="span" fontWeight="fontWeightBold">
									{user[0].reviews.length}
								</Box>
							</Typography>
							<Typography>
								Stores tagged:{' '}
								<Box component="span" fontWeight="fontWeightBold">
									{user[0].storesTagged.length}
								</Box>
							</Typography>
							<Typography>
								Joined{' '}
								<Box component="span" fontWeight="fontWeightBold">
									{getTimeAgo(user[0].joinedDate)}
								</Box>
							</Typography>
							{user && user[0].id === currentUserId && (
								<Box marginTop={2} display="flex" flexDirection="column">
									<Button
										variant="outlined"
										onClick={handleShowSettingsModal}
										startIcon={<SettingsRounded />}
									>
										Settings
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
				userId={currentUserId}
			/>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		showUserProfileModal: state.showUserProfileModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleUserProfileModal: () => dispatch(actionCreators.toggleUserProfileModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);

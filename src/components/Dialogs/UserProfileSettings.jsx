import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackbar, setCurrentUserData } from '../../store/actions';
import { useForm } from 'react-hook-form';
import { useConfirm } from 'material-ui-confirm';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '../../utils/DialogTitle';
import {
	Collapse,
	Dialog,
	FormControl,
	FormHelperText,
	Input,
	InputAdornment,
	InputLabel,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	Tooltip,
	Typography,
	Box
} from '@material-ui/core';
import {
	CreateRounded,
	MailOutlineRounded,
	DeleteForeverRounded,
	LockRounded,
	VisibilityRounded,
	VisibilityOffRounded
} from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import LoadingButton from '../../utils/LoadingButton';

const useStyles = makeStyles((theme) => ({
	modal: {
		height: 320,
		width: theme.breakpoints.values.sm / 2
	},
	marginBtm: {
		marginBottom: theme.spacing()
	},
	dialogTitle: {
		textAlign: 'left'
	},
	titleRoot: {
		margin: 0,
		padding: 0
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	},
	deleteAccount: {
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
		'&:hover': {
			backgroundColor: red[700]
		}
	},
	textFieldRoot: {
		width: '20ch'
	}
}));

export default function AboutEdit({ hide, show, updateUsername }) {
	const styles = useStyles();
	const confirm = useConfirm();
	const dispatch = useDispatch();
	const currentUserData = useSelector((state) => state.auth.currentUserData);
	const { register, handleSubmit, errors, watch } = useForm();
	const [editUsername, setEditUsername] = useState(false);
	const [changeEmail, setChangeEmail] = useState(false);
	const [updatePassword, setUpdatePassword] = useState(false);
	const [deleteAccount, setDeleteAccount] = useState(false);
	const [showPasswords, setShowPasswords] = useState(false);
	const [pending, setPending] = useState(false);

	const handleClose = () => {
		if (show) {
			hide();
		}
	};

	const handleExited = () => {
		setEditUsername(false);
		setDeleteAccount(false);
		setChangeEmail(false);
		setUpdatePassword(false);
	};

	function handleSettingClick(setting) {
		switch (setting) {
			case 'editUsername':
				setEditUsername(!editUsername);
				setChangeEmail(false);
				setDeleteAccount(false);
				setUpdatePassword(false);
				break;
			case 'changeEmail':
				setChangeEmail(!changeEmail);
				setEditUsername(false);
				setDeleteAccount(false);
				setUpdatePassword(false);
				break;
			case 'updatePassword':
				setUpdatePassword(!updatePassword);
				setChangeEmail(false);
				setEditUsername(false);
				setDeleteAccount(false);
				break;
			case 'deleteAccount':
				setDeleteAccount(!deleteAccount);
				setEditUsername(false);
				setChangeEmail(false);
				setUpdatePassword(false);
				break;
			default:
				return null;
		}
	}

	const onSubmitUsername = (data) => {
		confirm({
			description: `Please confirm you want to change your username to ${data.username}`
		})
			.then(() => {
				setPending('username');
				axios
					.put(`https://api.vomad.guide/auth/update-username/${currentUserData.id}`, {
						user_name: data.username
					})
					.then(() => {
						setEditUsername(false);
						setPending(false);
						dispatch(
							showSnackbar({
								type: 'success',
								message: 'Username changed successfully'
							})
						);
						updateUsername(data.username);
					})
					.catch(() => {
						setPending(false);
						dispatch(
							showSnackbar({
								type: 'error',
								message: 'Could not update username, please try again soon.'
							})
						);
					});
			})
			.catch(() => setPending(false));
	};

	const onSubmitEmail = (data) => {
		confirm({
			description: `Please confirm you want to change you email to ${data.email}`
		})
			.then(() => {
				setPending('email');
				axios
					.put(`https://api.vomad.guide/auth/update-email/${currentUserData.id}`, {
						email: data.email
					})
					.then(() => {
						setChangeEmail(false);
						setPending(false);
						dispatch(
							showSnackbar({
								type: 'warning',
								title: 'Email changed',
								message: 'Please check your inbox for a confirmation email'
							})
						);
					})
					.catch((err) => {
						if (err.response.data === 'must enter a different email') {
							setPending(false);
							return dispatch(
								showSnackbar({
									type: 'error',
									title: 'Email must be different',
									message:
										'The email you entered is the same as the one you are trying to change!'
								})
							);
						}
						if (err.response.data === 'email associated with another account') {
							setPending(false);
							return dispatch(
								showSnackbar({
									type: 'error',
									title: 'Email exists',
									message: 'That email is already associated with another account.'
								})
							);
						}
						setPending(false);
						return dispatch(
							showSnackbar({
								type: 'error',
								message: 'Could not change email, please try again soon.'
							})
						);
					});
			})
			.catch(() => setPending(false));
	};

	const onSubmitPassword = (data) => {
		confirm({
			description: `Please confirm you want to update your password.`
		})
			.then(() => {
				setPending('password');
				axios
					.post(`https://api.vomad.guide/auth/update-password/${currentUserData.id}`, {
						password: data.password
					})
					.then(() => {
						setUpdatePassword(false);
						setPending(false);
						dispatch(
							showSnackbar({
								type: 'success',
								message: 'Password successfully updated'
							})
						);
					})
					.catch(() => {
						setPending(false);
						return dispatch(
							showSnackbar({
								type: 'error',
								message: 'Could not update password, please try again soon.'
							})
						);
					});
			})
			.catch(() => setPending(false));
	};

	const handleDeleteAccountClick = () => {
		confirm({
			description:
				'This action will also log out you out immediately. There is no going back from this.',
			confirmationText: 'Delete Account',
			confirmationButtonProps: { className: styles.deleteAccount }
		})
			.then(() => {
				setPending('deleteAccount');
				return (window.location.href = 'https://api.vomad.guide/auth/logout-on-delete');
			})
			.then(() => {
				axios
					.delete(`https://api.vomad.guide/auth/delete-user/${currentUserData.id}`)
					.then(() => {
						setPending(false);
						dispatch(setCurrentUserData(null, false));
					})
					.then(() => {
						dispatch(
							showSnackbar({
								type: 'success',
								color: 'info',
								message: 'Account deleted. Sorry to see you go.',
								emoji: '👋'
							})
						);
					})
					.catch(() => {
						setPending(false);
						return dispatch(
							showSnackbar({
								type: 'error',
								message: 'Could not delete account, please try again.'
							})
						);
					});
			})
			.catch(() => setPending(false));
	};

	const handleClickShowPassword = () => {
		setShowPasswords(!showPasswords);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Dialog
			onClose={handleClose}
			onExited={handleExited}
			aria-labelledby="simple-dialog-title"
			open={show}
			maxWidth="sm"
			classes={{ paperWidthSm: styles.modal }}
		>
			<DialogTitle
				id="user-profile-setting-title"
				className={styles.dialogTitle}
				onClose={handleClose}
			>
				Profile Settings
			</DialogTitle>
			<List>
				<ListItem
					button
					onClick={() => handleSettingClick('editUsername')}
					selected={editUsername}
				>
					<ListItemIcon>
						<CreateRounded />
					</ListItemIcon>
					<ListItemText primary="Edit Username" />
				</ListItem>
				<Collapse in={editUsername} timeout="auto" unmountOnExit>
					<Box
						component="form"
						onSubmit={handleSubmit(onSubmitUsername)}
						display="flex"
						alignItems="baseline"
						justifyContent="space-evenly"
						marginY={2}
					>
						<TextField
							id="edit-username"
							name="username"
							size="small"
							type="text"
							placeholder="New username"
							margin="dense"
							inputRef={register({
								required: 'Enter a new username',
								minLength: { value: 5, message: 'Minimum 5 characters' },
								maxLength: { value: 25, message: 'Maximum 25 characters' }
							})}
							error={Boolean(errors.username)}
							helperText={Boolean(errors.username) && errors.username.message}
							autoFocus
							classes={{ root: styles.textFieldRoot }}
						/>
						<LoadingButton
							type="submit"
							variant="contained"
							color="primary"
							pending={pending === 'username'}
						>
							Edit
						</LoadingButton>
					</Box>
				</Collapse>
				<ListItem
					button
					onClick={() => handleSettingClick('changeEmail')}
					selected={changeEmail}
				>
					<ListItemIcon>
						<MailOutlineRounded />
					</ListItemIcon>
					<ListItemText primary="Change Email" />
				</ListItem>
				<Collapse in={changeEmail} timeout="auto" unmountOnExit>
					<Box
						component="form"
						onSubmit={handleSubmit(onSubmitEmail)}
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="space-evenly"
						marginY={1}
					>
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="center"
							width="80%"
						>
							<TextField
								id="change-email"
								name="email"
								size="small"
								type="text"
								placeholder="New email"
								margin="dense"
								inputRef={register({
									required: 'Please enter an email',
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: 'Please enter a valid email'
									}
								})}
								error={Boolean(errors.email)}
								helperText={Boolean(errors.email) && errors.email.message}
								fullWidth
								autoFocus
							/>
							<Box display="flex" justifyContent="center" marginY={1.5}>
								<LoadingButton
									type="submit"
									variant="contained"
									color="primary"
									pending={pending === 'email'}
								>
									Change
								</LoadingButton>
							</Box>
						</Box>
					</Box>
				</Collapse>
				<ListItem
					button
					onClick={() => handleSettingClick('updatePassword')}
					selected={updatePassword}
				>
					<ListItemIcon>
						<LockRounded />
					</ListItemIcon>
					<ListItemText primary="Update Password" />
				</ListItem>
				<Collapse in={updatePassword} timeout="auto" unmountOnExit>
					<Box
						component="form"
						onSubmit={handleSubmit(onSubmitPassword)}
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<Box display="flex" flexDirection="column" justifyContent="center">
							<FormControl margin="dense">
								<InputLabel htmlFor="password" margin="dense">
									New password
								</InputLabel>
								<Input
									autoFocus
									margin="dense"
									name="password"
									label="New password"
									type={showPasswords ? 'text' : 'password'}
									inputRef={register({
										required: 'Password required',
										minLength: {
											value: 6,
											message: 'Minimum 6 characters'
										},
										maxLength: {
											value: 20,
											message: 'Maximum 20 characters'
										}
									})}
									error={Boolean(errors.password)}
									fullWidth
								/>
								{errors.password && (
									<FormHelperText error>{errors.password.message}</FormHelperText>
								)}
							</FormControl>
							<FormControl margin="dense">
								<InputLabel htmlFor="confirmpassword" margin="dense">
									Confirm new password
								</InputLabel>
								<Input
									margin="dense"
									name="confirmpassword"
									label="Confirm new password"
									type={showPasswords ? 'text' : 'password'}
									inputRef={register({
										required: 'Please confirm password',
										minLength: {
											value: 6,
											message: 'Minimum 6 characters'
										},
										maxLength: {
											value: 20,
											message: 'Maximum 20 characters'
										},
										validate: (value) =>
											value === watch('password') || 'Passwords must match'
									})}
									error={Boolean(errors.confirmpassword)}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												size="small"
											>
												{showPasswords ? (
													<Tooltip title="Hide passwords">
														<VisibilityRounded />
													</Tooltip>
												) : (
													<Tooltip title="Show passwords">
														<VisibilityOffRounded />
													</Tooltip>
												)}
											</IconButton>
										</InputAdornment>
									}
									fullWidth
								/>
								{errors.confirmpassword && (
									<FormHelperText error>{errors.confirmpassword.message}</FormHelperText>
								)}
							</FormControl>
							<Box display="flex" justifyContent="center" marginY={1.5}>
								<LoadingButton
									type="submit"
									variant="contained"
									color="primary"
									pending={pending === 'password'}
								>
									Update
								</LoadingButton>
							</Box>
						</Box>
					</Box>
				</Collapse>
				<ListItem
					button
					onClick={() => handleSettingClick('deleteAccount')}
					selected={deleteAccount}
				>
					<ListItemIcon>
						<DeleteForeverRounded />
					</ListItemIcon>
					<ListItemText primary="Delete Account" />
				</ListItem>
				<Collapse in={deleteAccount} timeout="auto" unmountOnExit>
					<Box display="flex" flexDirection="column" alignItems="center" margin={2}>
						<Typography variant="body2" paragraph>
							Do you really want to delete your account? This is permanent and can not be
							undone.
						</Typography>
						<LoadingButton
							variant="contained"
							onClick={handleDeleteAccountClick}
							className={styles.deleteAccount}
							pending={pending === 'deleteAccount'}
						>
							Delete Account Forever
						</LoadingButton>
					</Box>
				</Collapse>
			</List>
		</Dialog>
	);
}

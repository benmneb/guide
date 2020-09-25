import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { useForm } from 'react-hook-form';
import { useConfirm } from 'material-ui-confirm';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
	Button,
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

function AboutEdit({ onShowSnackbar, ...props }) {
	const styles = useStyles();
	const confirm = useConfirm();
	const theme = useTheme();
	const [editUsername, setEditUsername] = useState(false);
	const [changeEmail, setChangeEmail] = useState(false);
	const [updatePassword, setUpdatePassword] = useState(false);
	const [deleteAccount, setDeleteAccount] = useState(false);
	const { register, handleSubmit, errors, watch } = useForm();
	const [showPasswords, setShowPasswords] = useState(false);

	const handleClose = () => {
		setTimeout(() => {
			setEditUsername(false);
			setDeleteAccount(false);
			setChangeEmail(false);
		}, theme.transitions.duration.leavingScreen);
		props.hide();
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
		console.log('new username', data);
		onShowSnackbar({
			snackData: {
				type: 'success',
				message: 'Username changed'
			}
		});
		setEditUsername(false);
	};

	const onSubmitEmail = (data) => {
		console.log('new email', data);
		onShowSnackbar({
			snackData: {
				type: 'warning',
				message: 'Please check your inbox for a confirmation email'
			}
		});
		setChangeEmail(false);
	};

	const onSubmitPassword = (data) => {
		console.log('new password', data);
		onShowSnackbar({
			snackData: {
				type: 'success',
				message: 'Password successfully updated'
			}
		});
		setUpdatePassword(false);
	};

	const handleClickShowPassword = () => {
		setShowPasswords(!showPasswords);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleDeleteAccountClick = () => {
		confirm({
			title: 'Delete Account?',
			description: 'Please confirm you want to delete your account.',
			confirmationText: 'Delete Account',
			confirmationButtonProps: { className: styles.deleteAccount },
			cancellationButtonProps: { autoFocus: true }
		})
			.then(() => console.info('TODO: DELETE ACCOUNT PLZZ HESHAM'))
			.catch(() => null);
	};

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={props.show}
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
						<Button type="submit" variant="contained" color="primary">
							Change
						</Button>
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
						alignItems="baseline"
						justifyContent="space-evenly"
						marginY={2}
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
							autoFocus
							classes={{ root: styles.textFieldRoot }}
						/>
						<Button type="submit" variant="contained" color="primary">
							Change
						</Button>
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
					<ListItemText primary="Update password" />
				</ListItem>
				<Collapse in={updatePassword} timeout="auto" unmountOnExit>
					<Box
						component="form"
						onSubmit={handleSubmit(onSubmitPassword)}
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
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
						<Box marginY={1.5}>
							<Button type="submit" variant="contained" color="primary">
								Update
							</Button>
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
							Do you really want to delete your account? This action is permanent and can
							not be undone.
						</Typography>
						<Button
							variant="contained"
							onClick={handleDeleteAccountClick}
							className={styles.deleteAccount}
						>
							Delete Account Forever
						</Button>
					</Box>
				</Collapse>
			</List>
		</Dialog>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		onShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData }))
	};
};

export default connect(null, mapDispatchToProps)(AboutEdit);

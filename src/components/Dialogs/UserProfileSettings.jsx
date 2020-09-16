import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {
	IconButton,
	Collapse,
	DialogTitle,
	Dialog,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	Typography,
	Button,
	Box
} from '@material-ui/core';
import {
	CloseRounded,
	CreateRounded,
	MailOutlineRounded,
	DeleteForeverRounded
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
	const [editUsername, setEditUsername] = useState(false);
	const [changeEmail, setChangeEmail] = useState(false);
	const [deleteAccount, setDeleteAccount] = useState(false);
	const { register, handleSubmit, errors } = useForm();

	const handleClose = () => {
		props.hide();
		setEditUsername(false);
		setDeleteAccount(false);
	};

	function handleSettingClick(setting) {
		switch (setting) {
			case 'editUsername':
				setEditUsername(!editUsername);
				setChangeEmail(false);
				setDeleteAccount(false);
				break;
			case 'changeEmail':
				setChangeEmail(!changeEmail);
				setEditUsername(false);
				setDeleteAccount(false);
				break;
			case 'deleteAccount':
				setDeleteAccount(!deleteAccount);
				setEditUsername(false);
				setChangeEmail(false);
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

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={props.show}
			maxWidth="sm"
			classes={{ paperWidthSm: styles.modal }}
		>
			<MuiDialogTitle disableTypography className={styles.titleRoot}>
				<IconButton
					aria-label="close"
					className={styles.closeButton}
					onClick={handleClose}
				>
					<CloseRounded />
				</IconButton>
			</MuiDialogTitle>
			<DialogTitle id="simple-dialog-title" className={styles.dialogTitle}>
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
						direction="column"
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
						direction="column"
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
						<Button variant="contained" className={styles.deleteAccount}>
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

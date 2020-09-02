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
	ExitToAppRounded,
	DeleteForeverRounded
} from '@material-ui/icons';

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
	deleteAccountLabel: {
		color: theme.palette.error.main
	},
	deleteAccountBorder: {
		borderColor: theme.palette.error.main
	},
	textFieldRoot: {
		width: '20ch'
	}
}));

function AboutEdit({ onShowSnackbar, ...props }) {
	const styles = useStyles();
	const [editUsername, setEditUsername] = useState(false);
	const [logOut, setLogOut] = useState(false);
	const [deleteAccount, setDeleteAccount] = useState(false);
	const { register, handleSubmit, errors } = useForm();

	const handleClose = () => {
		props.hide();
		setEditUsername(false);
		setLogOut(false);
		setDeleteAccount(false);
	};

	function handleSettingClick(setting) {
		switch (setting) {
			case 'editUsername':
				setEditUsername(!editUsername);
				setLogOut(false);
				setDeleteAccount(false);
				break;
			case 'logOut':
				setLogOut(!logOut);
				setEditUsername(false);
				setDeleteAccount(false);
				break;
			case 'deleteAccount':
				setDeleteAccount(!deleteAccount);
				setLogOut(false);
				setEditUsername(false);
				break;
			default:
				return null;
		}
	}

	const onSubmit = (data) => {
		console.log('new username', data);
		onShowSnackbar({
			snackData: {
				type: 'success',
				message: 'Username changed'
			}
		});
		setEditUsername(false);
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
						onSubmit={handleSubmit(onSubmit)}
						display="flex"
						direction="column"
						alignItems="center"
						justifyContent="space-evenly"
						marginY={2}
					>
						<TextField
							id="edit-username"
							name="username"
							size="small"
							type="text"
							placeholder="New username"
							inputRef={register({ required: true, minLength: 5, maxLength: 25 })}
							error={Boolean(errors.username)}
							autoFocus
							classes={{ root: styles.textFieldRoot }}
						/>

						<Button type="submit" variant="outlined" size="small" color="primary">
							Change
						</Button>
					</Box>
				</Collapse>
				<ListItem button onClick={() => handleSettingClick('logOut')} selected={logOut}>
					<ListItemIcon>
						<ExitToAppRounded />
					</ListItemIcon>
					<ListItemText primary="Log Out" />
				</ListItem>
				<Collapse in={logOut} timeout="auto" unmountOnExit>
					<Box display="flex" flexDirection="column" alignItems="center" marginY={2}>
						<Typography variant="body2" paragraph>
							Are you sure you want to log out?
						</Typography>
						<Box display="flex">
							<Button size="small" variant="outlined" color="primary">
								Log Out
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
						<Box display="flex">
							<Button
								size="small"
								variant="outlined"
								classes={{
									label: styles.deleteAccountLabel,
									outlined: styles.deleteAccountBorder
								}}
							>
								Delete Account Forever
							</Button>
						</Box>
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

import React from 'react';
import { connect } from 'react-redux';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseRoundedIcon from '@material-ui/icons/Close';
import SendRoundedIcon from '@material-ui/icons/Send';
import { useTheme, withStyles } from '@material-ui/core/styles';
import {
	Dialog,
	DialogContent,
	DialogContentText,
	Button,
	TextField,
	Typography,
	IconButton,
	useMediaQuery,
	Box
} from '@material-ui/core';
import * as actionCreators from '../../store/actions';
import { useForm } from 'react-hook-form';

const styles = (theme) => ({
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography {...other}>
			<Box component="header">
				<Typography variant="h6" component="h1">
					{children}
				</Typography>
				{onClose ? (
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={onClose}
					>
						<CloseRoundedIcon />
					</IconButton>
				) : null}
			</Box>
		</MuiDialogTitle>
	);
});

function Advertise({ onShowSnackbar, showAdvertiseModal, onToggleAdvertiseModal }) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		console.log('data', data);
		onShowSnackbar({
			snackData: {
				type: 'success',
				title: 'Message sent',
				message: `Thanks for your interest, we'll be in touch`,
				emoji: '🤝'
			}
		});
		onClose();
	};

	const onClose = () => {
		onToggleAdvertiseModal();
	};

	return (
		<Dialog
			open={showAdvertiseModal}
			onClose={onClose}
			aria-labelledby="form-dialog-title"
			fullScreen={fullScreen}
		>
			<DialogTitle id="form-dialog-title" onClose={onClose}>
				Advertise on The Guide
			</DialogTitle>
			<DialogContent>
				<DialogContentText component="hgroup">
					<Typography component="h2" variant="body1">
						<span role="img" aria-label="">
							👀
						</span>{' '}
						Put your brand in front of a very specific audience.
					</Typography>
					<Typography component="h2" variant="body1">
						<span role="img" aria-label="">
							🌱
						</span>{' '}
						Help people find vegan products easier.
					</Typography>
					<Typography component="h2" variant="body1">
						<span role="img" aria-label="">
							🚀
						</span>{' '}
						Support an independent vegan start-up.
					</Typography>
				</DialogContentText>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						name="name"
						label="Your Name"
						type="text"
						variant="outlined"
						inputRef={register({
							required: true,
							minLength: 2,
							maxLength: { value: 50, message: 'Maximum 50 characters' }
						})}
						error={Boolean(errors.name)}
						helperText={Boolean(errors.name) && errors.name.message}
						fullWidth
					/>
					<TextField
						margin="dense"
						id="email"
						name="email"
						label="Business Email"
						type="email"
						variant="outlined"
						inputRef={register({
							required: true,
							pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email' }
						})}
						error={Boolean(errors.email)}
						helperText={Boolean(errors.email) && errors.email.message}
						fullWidth
					/>
					<TextField
						margin="dense"
						id="message"
						name="message"
						label="Your Message (optional)"
						type="text"
						multiline
						rows={4}
						variant="outlined"
						inputRef={register({
							maxLength: { value: 750, message: 'Maximum 750 characters' }
						})}
						error={Boolean(errors.message)}
						helperText={Boolean(errors.message) && errors.message.message}
						fullWidth
					/>
					<Box display="flex" justifyContent="flex-end">
						<Button
							type="submit"
							color="default"
							size="large"
							endIcon={<SendRoundedIcon />}
						>
							Submit
						</Button>
					</Box>
				</form>
			</DialogContent>
		</Dialog>
	);
}

const mapStateToProps = (state) => {
	return {
		showAdvertiseModal: state.showAdvertiseModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleAdvertiseModal: () => dispatch(actionCreators.toggleAdvertiseModal()),
		onShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData }))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Advertise);

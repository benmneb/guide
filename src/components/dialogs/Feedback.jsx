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

function Feedback({ onShowSnackbar, onToggleFeedbackModal, showFeedbackModal }) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		console.log('data', data);
		onShowSnackbar({
			snackData: {
				type: 'success',
				color: 'info',
				title: 'Feedback received',
				message: 'We appreciate and encourage all suggestions',
				emoji: '👌'
			}
		});
		onClose();
	};

	const onClose = () => {
		onToggleFeedbackModal();
	};

	return (
		<Dialog
			open={showFeedbackModal}
			onClose={onClose}
			aria-labelledby="feedback-form"
			fullScreen={fullScreen}
		>
			<DialogTitle id="feedback-form" onClose={onClose}>
				Provide Feedback
			</DialogTitle>
			<DialogContent>
				<DialogContentText component="hgroup">
					<Typography component="h2">
						<span role="img" aria-label="">
							👍
						</span>{' '}
						Help us make the Guide better for everyone.
					</Typography>
					<Typography component="h2">
						<span role="img" aria-label="">
							✏️
						</span>{' '}
						Please report bugs and request new features.
					</Typography>
					<Typography component="h2">
						<span role="img" aria-label="">
							🌱
						</span>{' '}
						Thank you for helping people find vegan products easier.
					</Typography>
				</DialogContentText>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						margin="dense"
						id="feedback"
						name="feedback"
						label="Your Feedback"
						type="text"
						variant="outlined"
						inputRef={register({ required: true, minLength: 5, maxLength: 750 })}
						error={Boolean(errors.feedback)}
						multiline
						rows={4}
						fullWidth
						autoFocus
					/>
					<TextField
						margin="dense"
						id="name"
						name="name"
						label="Your Name (optional)"
						type="text"
						variant="outlined"
						inputRef={register({ maxLength: 50 })}
						error={Boolean(errors.name)}
						fullWidth
					/>
					<TextField
						margin="dense"
						id="email"
						name="email"
						label="Contact email (optional)"
						type="email"
						variant="outlined"
						inputRef={register({ pattern: /^\S+@\S+$/i })}
						error={Boolean(errors.email)}
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
		showFeedbackModal: state.showFeedbackModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleFeedbackModal: () => dispatch(actionCreators.toggleFeedbackModal()),
		onShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData }))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

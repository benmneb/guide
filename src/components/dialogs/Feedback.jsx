import React, { useState } from 'react';
import { connect } from 'react-redux';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
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
	Snackbar,
	Box
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
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

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

function Feedback(props) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	const { register, handleSubmit, errors } = useForm();

	const [showSnack, setShowSnack] = useState(false);

	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setShowSnack(false);
	};

	const onSubmit = (data) => {
		console.log('data', data);
		setShowSnack(true);
		onClose();
	};

	const onClose = () => {
		props.onToggleFeedbackModal();
	};

	return (
		<>
			<Dialog
				open={props.showFeedbackModal}
				onClose={onClose}
				aria-labelledby="feedback-form"
				fullScreen={fullScreen}
			>
				<DialogTitle id="feedback-form" onClose={onClose}>
					Provide Feedback
				</DialogTitle>
				<DialogContent>
					<DialogContentText component="div">
						<Typography>
							<span role="img" aria-label="">
								👍
							</span>{' '}
							Help us make the Guide better for everyone.
						</Typography>
						<Typography>
							<span role="img" aria-label="">
								✏️
							</span>{' '}
							Please be specific about what you liked or disliked.
						</Typography>
						<Typography>
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
							<Button type="submit" color="default" size="large" endIcon={<SendIcon />}>
								Submit
							</Button>
						</Box>
					</form>
				</DialogContent>
			</Dialog>
			<Snackbar
				open={showSnack}
				autoHideDuration={6000}
				onClose={handleCloseSnack}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={handleCloseSnack} severity="success" color="info">
					Thank you for your feedback{' '}
					<span role="img" aria-label="">
						🙏
					</span>
				</Alert>
			</Snackbar>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		showFeedbackModal: state.showFeedbackModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleFeedbackModal: () => dispatch(actionCreators.toggleFeedbackModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

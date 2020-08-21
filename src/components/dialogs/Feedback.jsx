import React from 'react';
import { connect } from 'react-redux';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import { useTheme, withStyles } from '@material-ui/core/styles';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Button,
	TextField,
	Typography,
	IconButton,
	useMediaQuery
} from '@material-ui/core';
import * as actionCreators from '../../store/actions';

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

	const onClose = () => {
		props.onToggleFeedbackModal();
	};

	return (
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
						Your feedback allows us to make the Guide better for everyone.
					</Typography>
					<Typography>
						<span role="img" aria-label="">
							✏️
						</span>{' '}
						Please be specific to allow us the best chance for improvement.
					</Typography>
					<Typography>
						<span role="img" aria-label="">
							🌱
						</span>{' '}
						Thank you for helping people find vegan products easier.
					</Typography>
				</DialogContentText>
				<TextField
					margin="dense"
					id="message"
					label="Your Feedback"
					type="text"
					variant="outlined"
					multiline
					rows={4}
					fullWidth
					required
					autoFocus
				/>
				<TextField
					margin="dense"
					id="name"
					label="Your Name (optional)"
					type="text"
					variant="outlined"
					fullWidth
				/>
				<TextField
					margin="dense"
					id="email"
					label="Contact email (optional)"
					type="email"
					variant="outlined"
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="default" size="large" endIcon={<SendIcon />}>
					Submit
				</Button>
			</DialogActions>
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
		onToggleFeedbackModal: () => dispatch(actionCreators.toggleFeedbackModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

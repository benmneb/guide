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
	root: {
		// margin: theme.spacing,
		// padding: theme.spacing(2)
	},
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
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const Advertise = (props) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const onClose = () => {
		props.onToggleAdvertiseModal();
	};

	return (
		<Dialog
			open={props.showAdvertiseModal}
			onClose={onClose}
			aria-labelledby="form-dialog-title"
			fullScreen={fullScreen}
		>
			<DialogTitle id="form-dialog-title" onClose={onClose}>
				Advertise on The Guide
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<Typography>
						<span role="img" aria-label="">
							👀
						</span>{' '}
						Put your brand in front of a very specific audience.
					</Typography>
					<Typography>
						<span role="img" aria-label="">
							🌱
						</span>{' '}
						Help people find vegan products easier.
					</Typography>
					<Typography>
						<span role="img" aria-label="">
							🚀
						</span>{' '}
						Support an independent vegan start-up.
					</Typography>
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Your Name"
					type="text"
					variant="outlined"
					fullWidth
					required
				/>
				<TextField
					margin="dense"
					id="email"
					label="Business Email"
					type="email"
					variant="outlined"
					fullWidth
					required
				/>
				<TextField
					margin="dense"
					id="message"
					label="Your Message (optional)"
					type="text"
					variant="outlined"
					multiline
					rows={4}
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
};

const mapStateToProps = (state) => {
	return {
		showAdvertiseModal: state.showAdvertiseModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleAdvertiseModal: () => dispatch(actionCreators.toggleAdvertiseModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Advertise);

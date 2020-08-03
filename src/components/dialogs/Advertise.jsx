import React from 'react';
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

const Advertise = ({ open, onClose }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="form-dialog-title"
			fullScreen={fullScreen}
		>
			<DialogTitle id="form-dialog-title" onClose={onClose}>
				<span role="img" aria-label="">
					👀
				</span>{' '}
				Advertise on The Guide
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Put your brand in front of a very specific audience.{' '}
					<span role="img" aria-label="">
						👌
					</span>
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
					label="Your Email"
					type="email"
					variant="outlined"
					fullWidth
					required
				/>
				<TextField
					margin="dense"
					id="message"
					label="Your Message"
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

export default Advertise;

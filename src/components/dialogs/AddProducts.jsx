import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const styles = (theme) => ({
	root: {
		margin: 0
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
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const AddProducts = ({ open, onClose }) => {
	const guideTheme = useTheme();
	const fullScreen = useMediaQuery(guideTheme.breakpoints.down('xs'));

	return (
		<div>
			<Dialog
				open={open}
				onClose={onClose}
				aria-labelledby="form-dialog-title"
				fullScreen={fullScreen}
			>
				<DialogTitle id="form-dialog-title" onClose={onClose}>
					Contribute to the Guide
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please let us know of any missing vegan products!{' '}
						<span role="img" aria-label="thanks">
							🙏
						</span>
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="message"
						label="Which products are missing?"
						type="text"
						variant="outlined"
						multiline
						rows={4}
						fullWidth
						required
					/>
					<TextField
						margin="dense"
						id="email"
						label="Product link(s)"
						type="url"
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
					/>
				</DialogContent>
				<DialogActions>
					{/* <Button onClick={onClose} color="default">
						Cancel
					</Button> */}
					<Button
						onClick={onClose}
						color="default"
						size="large"
						endIcon={<SendIcon />}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddProducts;

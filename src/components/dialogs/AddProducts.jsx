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

const AddProducts = (props) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	const onClose = () => {
		props.onToggleAddProductsModal();
	};

	return (
		<Dialog
			open={props.showAddProductsModal}
			onClose={onClose}
			aria-labelledby="form-dialog-title"
			fullScreen={fullScreen}
		>
			<DialogTitle id="form-dialog-title" onClose={onClose}>
				Contribute to the Guide
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<span role="img" aria-label="thanks">
						🙏
					</span>{' '}
					Know of any vegan products that are missing from the Guide? Add them here so
					others can easily find them.
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
					label="Link(s) to the products (optional but helpful)"
					type="url"
					variant="outlined"
					fullWidth
				/>
				<TextField
					margin="dense"
					id="email"
					label="Your Email (optional)"
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
};

const mapStateToProps = (state) => {
	return {
		showAddProductsModal: state.showAddProductsModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleAddProductsModal: () => dispatch(actionCreators.toggleAddProductsModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);

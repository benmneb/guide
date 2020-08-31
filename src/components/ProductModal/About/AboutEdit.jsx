import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {
	IconButton,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	DialogTitle,
	Dialog,
	TextField,
	Button,
	Box
} from '@material-ui/core';
import {
	CloseRounded,
	RadioButtonCheckedRounded,
	RadioButtonUncheckedRounded
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	modal: {
		height: 464,
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
	}
}));

const reasons = [
	'Inaccurate product info',
	'Wrong category',
	'Broken "buy now" link(s)',
	'Wrong/bad image',
	'Wrong/missing tags',
	'Duplicate product',
	'Discontinued product',
	'Non-vegan product'
];

function AboutEdit({ onShowSnackbar, ...props }) {
	const styles = useStyles();
	const [selectedReason, setSelectedReason] = useState(null);
	const [hasSelected, setHasSelected] = useState(false);
	const [elaboration, setElaboration] = useState('');

	const handleClose = () => {
		setHasSelected(false);
		setSelectedReason(null);
		setElaboration('');
		props.onClose();
	};

	const handleListItemClick = (reason) => {
		setHasSelected(true);
		setSelectedReason(reason);
	};

	const handleSubmit = () => {
		const currentTime = new Date();
		console.log(
			`User $userId suggested to edit product ${props.productId} due to ${selectedReason} on ${currentTime}. 
      "${elaboration}".`
		);
		onShowSnackbar({
			snackData: {
				type: 'success',
				color: 'info',
				title: 'Suggestion received',
				message: 'Thank you for helping people find vegan products easier',
				emoji: '💪'
			}
		});
		handleClose();
	};

	let content = (
		<List>
			{reasons.map((reason) => (
				<ListItem button onClick={() => handleListItemClick(reason)} key={reason}>
					<ListItemIcon>
						<RadioButtonUncheckedRounded />
					</ListItemIcon>
					<ListItemText primary={reason} />
				</ListItem>
			))}
		</List>
	);
	if (hasSelected) {
		content = (
			<>
				<List>
					<ListItem button onClick={() => setHasSelected(false)}>
						<ListItemIcon>
							<RadioButtonCheckedRounded />
						</ListItemIcon>
						<ListItemText primary={selectedReason} />
					</ListItem>
				</List>
				<Box
					display="flex"
					height="100%"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					margin={2}
				>
					<TextField
						id="suggest-edit-elaboration"
						label="If you can, please elaboarate"
						multiline
						rows={11}
						variant="outlined"
						autoFocus
						className={styles.marginBtm}
						fullWidth
						value={elaboration}
						onChange={(e) => setElaboration(e.target.value)}
					/>
					<Button color="primary" variant="contained" onClick={handleSubmit}>
						Submit
					</Button>
				</Box>
			</>
		);
	}

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
				Suggest an Edit
			</DialogTitle>
			{content}
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

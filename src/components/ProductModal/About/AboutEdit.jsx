import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
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

	const { register, handleSubmit, errors } = useForm();

	const handleClose = () => {
		setHasSelected(false);
		setSelectedReason(null);
		props.onClose();
	};

	const handleListItemClick = (reason) => {
		setHasSelected(true);
		setSelectedReason(reason);
	};

	const onSubmit = (data) => {
		const currentTime = new Date();
		console.log(
			`User $userId 
suggested to edit product ${props.productId} 
due to ${selectedReason} 
on ${currentTime}.
They said: 
"${data.elaboration}".`
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
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					display="flex"
					height="100%"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					margin={2}
				>
					<TextField
						className={styles.marginBtm}
						id="suggest-edit-elaboration"
						label="Please elaborate"
						name="elaboration"
						placeholder="Eg. The correct infomation is XYZ as seen at this link [insert link here]..."
						multiline
						rows={11}
						variant="outlined"
						autoFocus
						fullWidth
						inputRef={register({
							required: 'Elaboration is required',
							minLength: {
								value: 20,
								message: 'Minimum 20 characters'
							}
						})}
						error={Boolean(errors.elaboration)}
						helperText={Boolean(errors.elaboration) && errors.elaboration.message}
					/>
					<Button type="submit" color="primary" variant="contained">
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

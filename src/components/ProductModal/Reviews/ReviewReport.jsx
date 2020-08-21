import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import {
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	DialogTitle,
	Dialog
} from '@material-ui/core';
import { ReportProblemRounded, ReportRounded } from '@material-ui/icons';
import { red, deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
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

export default function ReviewReport(props) {
	const styles = useStyles();

	const handleClose = () => {
		props.onClose();
	};

	const handleListItemClick = (reason) => {
		props.onClose();
		const currentTime = new Date();
		console.log(
			`User $userId reported review ${props.reviewId} as "${reason}" at ${currentTime}`
		);
	};

	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.show}>
			<MuiDialogTitle disableTypography className={styles.titleRoot}>
				<IconButton
					aria-label="close"
					className={styles.closeButton}
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>
			</MuiDialogTitle>
			<DialogTitle id="simple-dialog-title">Report as...</DialogTitle>
			<List>
				<ListItem
					button
					onClick={() => handleListItemClick('inappropriate or offensive')}
				>
					<ListItemIcon>
						<ReportRounded fontSize="large" style={{ color: red[500] }} />
					</ListItemIcon>
					<ListItemText primary="Inappropriate or offensive" />
				</ListItem>
				<ListItem button onClick={() => handleListItemClick('advertising or spam')}>
					<ListItemIcon>
						<ReportProblemRounded fontSize="large" style={{ color: deepOrange[400] }} />
					</ListItemIcon>
					<ListItemText primary="Advertising or spam" />
				</ListItem>
			</List>
		</Dialog>
	);
}

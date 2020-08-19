import React from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	DialogTitle,
	Dialog
} from '@material-ui/core';
import { ReportProblemRounded, ReportRounded } from '@material-ui/icons';
import { red, deepOrange } from '@material-ui/core/colors';

export default function ReviewReport(props) {
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

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, IconButton, Menu, MenuItem, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MoreVertRounded, ReportRounded, EditRounded } from '@material-ui/icons';
import { usePrepareLink, getParams, getEnums } from '../../../utils/routing';
import ReviewReport from './ReviewReport';

const useStyles = makeStyles((theme) => ({
	menuIcon: {
		marginRight: theme.spacing(1)
	}
}));

export default function ReviewMoreMenu({ review }) {
	const styles = useStyles();
	const history = useHistory();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const currentUserData = useSelector((state) => state.auth.currentUserData);
	const [showMoreMenu, setShowMoreMenu] = useState(null);
	const [showReportModal, setShowReportModal] = useState(false);

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		},
		keepOldQuery: true
	});

	const handleMoreMenuClick = (e) => {
		setShowMoreMenu(e.currentTarget);
	};

	const handleMoreMenuClose = () => {
		setShowMoreMenu(null);
	};

	const handleMoreMenuOption = (action) => {
		setShowMoreMenu(null);
		if (action === 'report') {
			if (isAuthenticated) setShowReportModal(true);
			else history.push(authLink);
		} else {
			console.log('edit review!!!!!');
		}
	};

	const handleCloseReportModal = () => {
		setShowReportModal(false);
	};

	return (
		<>
			<Box
				flexGrow="1"
				display="flex"
				alignItems="flex-start"
				justifyContent="flex-end"
				marginTop={-1}
				marginRight={-1}
			>
				<IconButton aria-label="more options" onClick={handleMoreMenuClick}>
					<MoreVertRounded />
				</IconButton>
				<Menu
					id={review.review_id}
					anchorEl={showMoreMenu}
					keepMounted
					open={Boolean(showMoreMenu)}
					onClose={handleMoreMenuClose}
				>
					{review.user_id === currentUserData.id ? (
						<MenuItem onClick={() => handleMoreMenuOption('edit')}>
							<EditRounded className={styles.menuIcon} />
							<Typography>Edit</Typography>
						</MenuItem>
					) : (
						<MenuItem onClick={() => handleMoreMenuOption('report')}>
							<ReportRounded className={styles.menuIcon} />
							<Typography>Report</Typography>
						</MenuItem>
					)}
				</Menu>
			</Box>
			<ReviewReport
				show={showReportModal}
				reviewId={review.review_id}
				onClose={handleCloseReportModal}
			/>
		</>
	);
}

import React, { useState } from 'react';
import { getTimeAgo } from '../../../assets/timeAgo';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import { ThumbUpAltRounded, MoreVertRounded, Report } from '@material-ui/icons';
import {
	Avatar,
	Typography,
	Paper,
	Tooltip,
	IconButton,
	Menu,
	MenuItem,
	Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReviewReport from './ReviewReport';

const useStyles = makeStyles((theme) => ({
	largeAvatar: {
		width: theme.spacing(9),
		height: theme.spacing(9)
	},
	reportIcon: {
		marginRight: theme.spacing(1)
	},
	author: {
		fontWeight: theme.typography.fontWeightMedium
	}
}));

export default function ReviewCard(props) {
	const styles = useStyles();
	const [showMoreMenu, setShowMoreMenu] = useState(null);
	const [showReportModal, setShowReportModal] = useState(false);

	const handleMoreMenuClick = (e) => {
		setShowMoreMenu(e.currentTarget);
	};

	const handleMoreMenuClose = () => {
		setShowMoreMenu(null);
	};

	const handleReportClick = () => {
		setShowMoreMenu(null);
		setShowReportModal(true);
	};

	const handleCloseReportModal = () => {
		setShowReportModal(false);
	};

	const handleLikeClick = () => {
		axios.put('http://localhost:3000/like/', {
			review_id: props.review.review_id
		});
	};

	return (
		<>
			<Box key={props.review.id} marginTop={2} marginBottom={2}>
				<Paper>
					<Box padding={2}>
						<Box display="flex" marginBottom={2}>
							<Box marginRight={2}>
								<Avatar
									alt={props.review.user_name}
									src={props.review.avatar}
									className={styles.largeAvatar}
								/>
							</Box>
							<Box
								display="flex"
								flexDirection="column"
								justifyContent="center"
							>
								<Typography className={styles.author}>
									{props.review.user_name}
								</Typography>
								<Typography variant="body2">
									+{props.review.authorPoints}
								</Typography>
							</Box>
							<Box
								flexGrow="1"
								display="flex"
								alignItems="flex-start"
								justifyContent="flex-end"
								marginTop={-1}
								marginRight={-1}
							>
								<IconButton
									aria-label="more options"
									onClick={handleMoreMenuClick}
								>
									<MoreVertRounded />
								</IconButton>
								<Menu
									id={props.review.review_id}
									anchorEl={showMoreMenu}
									keepMounted
									open={Boolean(showMoreMenu)}
									onClose={handleMoreMenuClose}
								>
									<MenuItem
										onClick={() => handleReportClick(props.review.review_id)}
									>
										<Report className={styles.reportIcon} />
										<Typography>Report</Typography>
									</MenuItem>
								</Menu>
							</Box>
						</Box>
						<Box marginBottom={2}>
							<Rating name="rating" value={props.review.rating} readOnly />
							<Typography>{getTimeAgo(new Date(props.review.date))}</Typography>
						</Box>
						<Box>
							<Typography>{props.review.review}</Typography>
						</Box>
						<Box display="flex" justifyContent="flex-end" marginBottom={-1}>
							<Box display="flex" alignItems="center" marginRight={1}>
								<Tooltip title="Was this review helpful?" placement="left">
									<IconButton
										onClick={handleLikeClick}
										aria-label="mark as helpful"
									>
										<ThumbUpAltRounded />
									</IconButton>
								</Tooltip>
								{props.review.likes > 0 && (
									<Typography>{props.review.likes}</Typography>
								)}
							</Box>
						</Box>
					</Box>
				</Paper>
			</Box>
			<ReviewReport
				show={showReportModal}
				reviewId={props.review.review_id}
				onClose={handleCloseReportModal}
			/>
		</>
	);
}

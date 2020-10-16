import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
	Typography,
	Paper,
	IconButton,
	Menu,
	MenuItem,
	Link,
	Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MoreVertRounded, ReportRounded } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import ReviewReport from './ReviewReport';
import LikeButton from '../LikeButton';
import { getTimeAgo } from '../../../utils/timeAgo';
import { usePrepareLink, getParams, getEnums } from '../../../utils/routing';
import UserAvatar from '../../../utils/UserAvatar';

const useStyles = makeStyles((theme) => ({
	reportIcon: {
		marginRight: theme.spacing(1)
	},
	author: {
		fontWeight: theme.typography.fontWeightMedium
	},
	link: {
		textDecoration: 'none'
	}
}));

export default function ReviewCard({ review }) {
	const styles = useStyles();
	const history = useHistory();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [showMoreMenu, setShowMoreMenu] = useState(null);
	const [showReportModal, setShowReportModal] = useState(false);

	const userProfileLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.userProfile
		},
		pushToQuery: {
			[getParams.userId]: review.user_id
		},
		keepOldQuery: true
	});
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

	const handleReportClick = () => {
		setShowMoreMenu(null);
		if (isAuthenticated) setShowReportModal(true);
		else history.push(authLink);
	};

	const handleCloseReportModal = () => {
		setShowReportModal(false);
	};

	return (
		<>
			<Box key={review.review_id} marginTop={2} marginBottom={2}>
				<Paper component="section">
					<Box component="article" padding={2}>
						<Box display="flex" marginBottom={2}>
							<Box marginRight={2}>
								<RouterLink to={userProfileLink} className={styles.link}>
									<UserAvatar userData={review} component="review" />
								</RouterLink>
							</Box>
							<Box
								component="footer"
								display="flex"
								flexDirection="column"
								justifyContent="center"
							>
								<Link
									className={clsx(styles.author, styles.link)}
									color="textPrimary"
									variant="body1"
									component={RouterLink}
									to={userProfileLink}
								>
									{review.user_name}
								</Link>
								<Typography variant="body2">+ {review.authorPoints}</Typography>
							</Box>
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
									<MenuItem onClick={() => handleReportClick(review.review_id)}>
										<ReportRounded className={styles.reportIcon} />
										<Typography>Report</Typography>
									</MenuItem>
								</Menu>
							</Box>
						</Box>
						<Box marginBottom={2}>
							<Rating name="rating" value={review.rating} readOnly />
							<Typography>{getTimeAgo(new Date(review.review_date))}</Typography>
						</Box>
						<Box component="article">
							<Typography>{review.review}</Typography>
						</Box>
						<Box display="flex" justifyContent="flex-end" marginBottom={-1}>
							<Box display="flex" alignItems="center" marginRight={1}>
								<LikeButton
									tooltip="Was this review helpful?"
									tooltipPlacement="left"
									ariaLabel="mark as helpful"
									review={review}
								/>
								{review.likes > 0 && <Typography>{review.likes}</Typography>}
							</Box>
						</Box>
					</Box>
				</Paper>
			</Box>
			<ReviewReport
				show={showReportModal}
				reviewId={review.review_id}
				onClose={handleCloseReportModal}
			/>
		</>
	);
}

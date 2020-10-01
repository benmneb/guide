import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import clsx from 'clsx';
import {
	Avatar,
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
import randomMC from 'random-material-color';
import { showSnackbar } from '../../../store/actions';
import { getTimeAgo } from '../../../utils/timeAgo';
import { usePrepareLink, getParams, getEnums } from '../../../utils/routing';

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
	},
	link: {
		textDecoration: 'none'
	}
}));

export default function ReviewCard({ isAuthenticated, ...props }) {
	const { review } = props;
	const styles = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const currentUserData = useSelector((state) => state.auth.currentUserData);
	const color = randomMC.getColor({ text: review.user_name });
	const [showMoreMenu, setShowMoreMenu] = useState(null);
	const [showReportModal, setShowReportModal] = useState(false);

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		},
		keepOldQuery: true
	});
	const userProfileLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.userProfile
		},
		pushToQuery: {
			[getParams.userId]: review.user_id
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
		setShowReportModal(true);
	};

	const handleCloseReportModal = () => {
		setShowReportModal(false);
	};

	const handleLikeClick = () => {
		if (isAuthenticated) {
			axios
				.put('https://api.vomad.guide/like/', {
					review_id: review.review_id,
					user_id: currentUserData.id
				})
				.then(() => props.updateReview())
				.catch((err) => {
					console.error(err);
					dispatch(
						showSnackbar({
							snackData: {
								type: 'error',
								title: 'Could not like review',
								message: `${err.message}. Please try again.`
							}
						})
					);
				});
		} else {
			history.push(authLink);
		}
	};

	return (
		<>
			<Box key={review.review_id} marginTop={2} marginBottom={2}>
				<Paper component="section">
					<Box component="article" padding={2}>
						<Box display="flex" marginBottom={2}>
							<Box marginRight={2}>
								<Avatar
									component={RouterLink}
									to={userProfileLink}
									alt={review.user_name}
									src={review.avatar}
									className={clsx(styles.largeAvatar, styles.link)}
									style={{ backgroundColor: color }}
								>
									{review.user_name.charAt(0).toUpperCase()}
								</Avatar>
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
									handleLike={handleLikeClick}
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

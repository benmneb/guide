import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Typography, Paper, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import LikeButton from '../LikeButton';
import { getTimeAgo } from '../../../utils/timeAgo';
import { usePrepareLink, getParams, getEnums } from '../../../utils/routing';
import UserAvatar from '../../../utils/UserAvatar';
import ReviewMoreMenu from './ReviewMoreMenu';

const useStyles = makeStyles((theme) => ({
	author: {
		fontWeight: theme.typography.fontWeightMedium
	},
	link: {
		textDecoration: 'none'
	}
}));

export default function ReviewCard({ review }) {
	const styles = useStyles();

	const userProfileLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.userProfile
		},
		pushToQuery: {
			[getParams.userId]: review.user_id
		},
		keepOldQuery: true
	});

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
								<Typography variant="subtitle2" color="textSecondary">
									{review.points ? `+${review.points}` : '0'}
								</Typography>
							</Box>
							<ReviewMoreMenu review={review} />
						</Box>
						<Box marginBottom={2}>
							<Rating name="rating" value={review.rating} readOnly />
							<Typography>
								{getTimeAgo(new Date(review.review_date))}
								{review.last_edited && (
									<Box component="span" color="text.secondary">
										{' '}
										(edited {getTimeAgo(new Date(review.last_edited)).toLowerCase()})
									</Box>
								)}
							</Typography>
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
		</>
	);
}

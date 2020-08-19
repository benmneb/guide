import React, { useState } from 'react';
import { Typography, Button, Collapse, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReviewCard from './ReviewCard';
import ReviewsAdd from './ReviewsAdd';
import MasonryLayout from '../../../assets/MasonryLayout';
import { reviews } from '../../../assets/reviews';

const useStyles = makeStyles((theme) => ({
	bold: {
		fontWeight: theme.typography.fontWeightMedium
	},
	avatarSmall: {
		display: 'inline-flex',
		width: theme.spacing(3),
		height: theme.spacing(3),
		marginRight: theme.spacing(0.5)
	}
}));

export default function ProductReviews() {
	const styles = useStyles();
	const [showAddReview, setShowAddReview] = useState(false);

	function handleAddReviewClick() {
		setShowAddReview(!showAddReview);
	}

	return (
		<>
			<Grid container alignItems="center" spacing={1}>
				<Grid item xs={12} sm={9}>
					<Typography variant="body1">
						The first review was by{' '}
						<Typography component="span" variant="body1" className={styles.bold}>
							Bonny Rebecca
						</Typography>{' '}
						🥇 the most helpful review is by{' '}
						<Typography component="span" variant="body1" className={styles.bold}>
							Hishelicious
						</Typography>{' '}
						💪 the latest review is by{' '}
						<Typography component="span" variant="body1" className={styles.bold}>
							Joey Carbstrong
						</Typography>{' '}
						⏰
					</Typography>
				</Grid>
				<Grid item container xs={12} sm={3} justify="flex-end">
					<Button
						size="large"
						variant={showAddReview ? 'outlined' : 'contained'}
						color="primary"
						disableElevation
						onClick={handleAddReviewClick}
					>
						{showAddReview ? 'Cancel Review' : 'Add Review'}
					</Button>
				</Grid>
			</Grid>
			<Collapse in={showAddReview} timeout="auto" unmountOnExit>
				<ReviewsAdd />
			</Collapse>
			<MasonryLayout>
				{reviews
					.filter((review) => review.body.length > 0)
					.map((review) => (
						<ReviewCard key={review.id} review={review} />
					))}
			</MasonryLayout>
		</>
	);
}

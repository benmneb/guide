import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import AddReviewButton from './AddReviewButton';

export default function ReviewsTitleBar() {
	const reviews = useSelector((state) => state.product.reviews);

	return (
		<Grid container alignItems="center" spacing={1}>
			<Grid item xs container justify="space-between" alignItems="center">
				{reviews ? (
					<Typography variant="h5" component="h2" color="textSecondary">
						{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
					</Typography>
				) : (
					<Skeleton width={120} height={40} />
				)}
				<AddReviewButton />
			</Grid>
		</Grid>
	);
}

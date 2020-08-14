import React from 'react';
import { Typography, Box } from '@material-ui/core';
import ReviewCard from './ReviewCard';
import MasonryLayout from '../../assets/MasonryLayout';
import { reviews } from '../../assets/reviews';

export default function ProductReviews() {
	return (
		<>
			<Box display="flex" justifyContent="center">
				<Typography variant="body1">
					The first review was by Bonny Rebecca, the most helpful review is by
					Hishelicous, the latest review is by Joey Carbstrong.
				</Typography>
			</Box>
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

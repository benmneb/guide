import { useSelector } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import ReviewCard from './ReviewCard';
import MasonryLayout from '../../../utils/MasonryLayout';

export default function ReviewsList() {
	const reviews = useSelector((state) => state.product.reviews);

	return reviews && reviews.length > 0 ? (
		<MasonryLayout>
			{reviews &&
				reviews.map((review) => <ReviewCard key={review.review_id} review={review} />)}
		</MasonryLayout>
	) : (
		reviews && (
			<Box marginTop={1}>
				<Typography variant="h6" component="h3" gutterBottom>
					Have you tried this product?
				</Typography>
				<Typography color="textSecondary" paragraph>
					Leave the first review so everyone else knows what it's like.
				</Typography>
			</Box>
		)
	);
}

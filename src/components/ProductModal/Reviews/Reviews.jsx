import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { setReviews, showAddReview, hideAddReview } from '../../../store/actions';
import { Typography, Button, Collapse, Grid, Link, Box } from '@material-ui/core';
import { CancelRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import ReviewCard from './ReviewCard';
import ReviewsAdd from './ReviewsAdd';
import MasonryLayout from '../../../utils/MasonryLayout';
import { usePrepareLink, getParams, getEnums } from '../../../utils/routing';

const useStyles = makeStyles((theme) => ({
	bold: {
		fontWeight: theme.typography.fontWeightMedium
	},
	cancelButton: {
		color: theme.palette.text.secondary
	},
	link: {
		'&:hover': {
			cursor: 'pointer'
		}
	}
}));

export default function Reviews() {
	const styles = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const reviews = useSelector((state) => state.product.reviews);
	const showAddReviewForm = useSelector((state) => state.product.showAddReview);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const selectedProductId = useSelector(
		(state) => state.product.selectedProduct.productId
	);

	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (selectedProductId) {
			axios
				.get(`https://api.vomad.guide/review/${selectedProductId}`, {
					cancelToken: source.token
				})
				.then((response) => {
					if (mounted) dispatch(setReviews(response.data));
				})
				.catch((err) => {
					if (mounted) console.error(err);
				});
		}

		return () => {
			mounted = false;
			source.cancel('Reviews fetch cancelled during clean-up');
		};
	}, [selectedProductId, dispatch]);

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		},
		keepOldQuery: true
	});

	function handleAddReviewButtonClick() {
		if (isAuthenticated) {
			if (showAddReviewForm) return dispatch(hideAddReview());
			else return dispatch(showAddReview());
		} else {
			history.push(authLink);
		}
	}

	return (
		<>
			<Grid container alignItems="center" spacing={1}>
				<Grid item xs container justify="space-between" alignItems="center">
					{reviews ? (
						<Typography variant="h5" component="h2" color="textSecondary">
							{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
						</Typography>
					) : (
						<Skeleton width={120} height={40} />
					)}
					<Button
						size="large"
						variant={showAddReviewForm ? 'outlined' : 'contained'}
						color={showAddReviewForm ? 'default' : 'primary'}
						startIcon={showAddReviewForm ? <CancelRounded color="disabled" /> : null}
						onClick={handleAddReviewButtonClick}
						classes={showAddReviewForm ? { label: styles.cancelButton } : null}
					>
						{showAddReviewForm ? 'Cancel' : 'Add Review'}
					</Button>
				</Grid>
			</Grid>
			<Collapse in={showAddReviewForm} timeout="auto" unmountOnExit>
				<ReviewsAdd />
			</Collapse>
			{reviews && reviews.length > 0 ? (
				<MasonryLayout>
					{reviews &&
						reviews.map((review) => (
							<ReviewCard key={review.review_id} review={review} />
						))}
				</MasonryLayout>
			) : (
				reviews && (
					<Box marginTop={1}>
						<Typography variant="h6" component="h3" gutterBottom>
							Have you tried this product?
						</Typography>
						<Typography color="textSecondary" paragraph>
							<Link onClick={handleAddReviewButtonClick} className={styles.link}>
								Leave the first review
							</Link>{' '}
							so everyone else knows what it's like.
						</Typography>
					</Box>
				)
			)}
		</>
	);
}

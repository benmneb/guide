import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../../../store/actions';
import { Typography, Button, Collapse, Grid, Box } from '@material-ui/core';
import { CancelRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import ReviewCard from './ReviewCard';
import ReviewsAdd from './ReviewsAdd';
import MasonryLayout from '../../../assets/MasonryLayout';

const useStyles = makeStyles((theme) => ({
	bold: {
		fontWeight: theme.typography.fontWeightMedium
	},
	avatarSmall: {
		display: 'inline-flex',
		width: theme.spacing(3),
		height: theme.spacing(3),
		marginRight: theme.spacing(0.5)
	},
	cancelButton: {
		color: theme.palette.text.secondary
	}
}));

function Reviews({
	showAddReview,
	onShowAddReview,
	onHideAddReview,
	showProductModal,
	selectedProduct,
	ratingBeforeClickedAddReviewSnackbar
}) {
	const styles = useStyles();
	const [reviews, setReviews] = useState(null);

	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (showProductModal) {
			axios
				.get(`https://api.vomad.guide/review/${selectedProduct}`, {
					cancelToken: source.token
				})
				.then((response) => {
					if (mounted) setReviews(response.data);
				})
				.catch((err) => {
					if (mounted) console.error(err);
				});
		}

		return () => {
			mounted = false;
			source.cancel('Cancelled during clean-up');
		};
	}, [selectedProduct, showProductModal]);

	function handleAddReviewButtonClick() {
		if (showAddReview) return onHideAddReview();
		else return onShowAddReview();
	}

	const updateReview = () => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (showProductModal) {
			axios
				.get(`https://api.vomad.guide/review/${selectedProduct}`, {
					cancelToken: source.token
				})
				.then((response) => {
					if (mounted) setReviews(response.data);
				})
				.catch((err) => {
					if (mounted) console.error(err);
				});
		}

		return () => {
			mounted = false;
			source.cancel('Cancelled during clean-up');
		};
	};

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
						variant={showAddReview ? 'outlined' : 'contained'}
						color={showAddReview ? 'default' : 'primary'}
						startIcon={showAddReview ? <CancelRounded color="disabled" /> : null}
						onClick={handleAddReviewButtonClick}
						classes={showAddReview ? { label: styles.cancelButton } : null}
					>
						{showAddReview ? 'Cancel' : 'Add Review'}
					</Button>
				</Grid>
			</Grid>
			<Collapse in={showAddReview} timeout="auto" unmountOnExit>
				<ReviewsAdd
					ratingBeforeClickedAddReviewSnackbar={ratingBeforeClickedAddReviewSnackbar}
					productId={selectedProduct}
					updateReviews={() => updateReview()}
					hide={onHideAddReview}
				/>
			</Collapse>
			{reviews && reviews.length > 0 ? (
				<MasonryLayout>
					{reviews &&
						reviews.map((review) => (
							<ReviewCard
								key={review.review_id}
								review={review}
								updateReview={() => updateReview()}
							/>
						))}
				</MasonryLayout>
			) : (
				reviews && (
					<Box marginTop={1}>
						<Typography variant="h6" component="h3" gutterBottom>
							Have you tried this product?
						</Typography>
						<Typography color="textSecondary" paragraph>
							Leave the first review so everyone else knows what it's like!
						</Typography>
					</Box>
				)
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		showAddReview: state.showAddReview,
		selectedProduct: state.selectedProduct,
		ratingBeforeClickedAddReviewSnackbar: state.ratingBeforeClickedAddReviewSnackbar,
		showProductModal: state.showProductModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onShowAddReview: () => dispatch(actionCreators.showAddReview()),
		onHideAddReview: () => dispatch(actionCreators.hideAddReview())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

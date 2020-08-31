import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../../../store/actions';
import { Typography, Button, Collapse, Grid } from '@material-ui/core';
import { CancelRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ReviewCard from './ReviewCard';
import ReviewsAdd from './ReviewsAdd';
import MasonryLayout from '../../../assets/MasonryLayout';
// import { reviews } from "../../../assets/reviews";

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

function Reviews(props) {
	const styles = useStyles();
	const { showAddReview, onShowAddReview, onHideAddReview } = props;
	const [reviews, setReviews] = useState(null);

	useEffect(() => {
		if (props.showProductModal) {
			axios
				.get(
					`http://GuideApiServer-env.eba-u5p3tcik.us-east-2.elasticbeanstalk.com/review/${props.selectedProduct}`
				)
				.then((response) => setReviews(response.data))
				.catch((err) => console.log(err));
		}
	}, [props.selectedProduct]);

	function handleAddReviewButtonClick() {
		if (showAddReview) return onHideAddReview();
		else return onShowAddReview();
	}

	const updateReview = () => {
		axios
			.get(
				`http://GuideApiServer-env.eba-u5p3tcik.us-east-2.elasticbeanstalk.com/review/${props.selectedProduct}`
			)
			.then((response) => setReviews(response.data))
			.catch((err) => console.log(err));
	};

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
					ratingBeforeClickedAddReviewSnackbar={
						props.ratingBeforeClickedAddReviewSnackbar
					}
					productId={props.selectedProduct}
					updateReviews={() => updateReview()}
					hide={onHideAddReview}
				/>
			</Collapse>
			<MasonryLayout>
				{reviews &&
					reviews
						.filter((review) => review.review.length > 0)
						.map((review) => (
							<ReviewCard
								key={review.review_id}
								review={review}
								updateReview={() => updateReview()}
							/>
						))}
			</MasonryLayout>
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

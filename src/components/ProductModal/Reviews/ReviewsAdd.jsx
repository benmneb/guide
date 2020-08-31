import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import { Typography, Button, TextField, Grid, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const labels = {
	1: 'Bad',
	2: 'Okay',
	3: 'Good',
	4: 'Great',
	5: 'Excellent'
};

const ReviewsAdd = (props) => {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(-1);
	const [reviewText, setReviewText] = useState('');

	const { ratingBeforeClickedAddReviewSnackbar } = props;
	useEffect(() => {
		if (
			ratingBeforeClickedAddReviewSnackbar &&
			rating !== ratingBeforeClickedAddReviewSnackbar
		) {
			setRating(ratingBeforeClickedAddReviewSnackbar);
		}
		//eslint-disable-next-line
	}, [ratingBeforeClickedAddReviewSnackbar]);

	let ratingHelperText;

	if ((rating === 0 && hover === -1) || (rating === null && hover === -1)) {
		ratingHelperText = 'Select a rating:';
	} else {
		ratingHelperText = (
			<Box component="span">Rate as "{labels[hover !== -1 ? hover : rating]}"</Box>
		);
	}

	const onTextChange = (event) => {
		setReviewText(event.target.value);
	};

	const onSubmitHandler = () => {
		axios
			.post(
				'http://GuideApiServer-env.eba-u5p3tcik.us-east-2.elasticbeanstalk.com/review/',
				{
					review: reviewText,
					product_id: props.productId,
					user_id: 9,
					rating: rating
				}
			)
			.then(() => props.onHideAddReview())
			.then(() => props.updateReviews());
	};

	return (
		<Box marginTop={1}>
			<Grid container alignItems="center" justify="center">
				<Grid item container xs={12} justify="center" alignItems="center" spacing={1}>
					<Grid item xs={12} container justify="center">
						<Typography>{ratingHelperText}</Typography>
					</Grid>
					<Grid item xs={12} container justify="center">
						<Rating
							name="other-product-rating"
							value={rating}
							precision={1}
							size="large"
							onChange={(event, newValue) => {
								setRating(newValue);
							}}
							onChangeActive={(event, newHover) => {
								setHover(newHover);
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={8} md={6} container justify="center">
						<TextField
							id="review-body"
							label="Your Review"
							multiline
							rows={4}
							fullWidth
							variant="outlined"
							size="small"
							autoFocus
							value={reviewText}
							onChange={onTextChange}
						/>
					</Grid>
					<Grid item container xs={12} justify="center">
						<Button
							onClick={onSubmitHandler}
							size="large"
							variant="contained"
							color="primary"
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};
const mapDispatchToProps = (dispatch) => {
	return {
		onHideAddReview: () => dispatch(actionCreators.hideAddReview())
	};
};

export default connect(null, mapDispatchToProps)(ReviewsAdd);

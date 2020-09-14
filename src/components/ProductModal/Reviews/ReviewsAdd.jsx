import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import clsx from 'clsx';
import { Typography, Button, TextField, Grid, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { labels } from '../../../assets/ratingLabels';

const useStyles = makeStyles((theme) => ({
	container: {
		[theme.breakpoints.up('sm')]: {
			width: 651
		}
	},
	ratingError: {
		fontWeight: theme.typography.fontWeightBold,
		color: theme.palette.error.main
	}
}));

function ReviewsAdd({
	hide,
	onShowSnackbar,
	ratingBeforeClickedAddReviewSnackbar,
	currentUserData,
	...props
}) {
	const styles = useStyles();
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(-1);
	const [ratingError, setRatingError] = useState(false);

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		if (rating > 0) {
			axios
				.post('https://api.vomad.guide/review/', {
					review: data.review,
					product_id: props.productId,
					user_id: currentUserData.id,
					rating: rating
				})
				.then(() => {
					onShowSnackbar({
						snackData: {
							type: 'success',
							title: 'Review Added',
							message: 'Thank you for helping people find vegan products easier',
							emoji: '💪'
						}
					});
				})
				.then(() => hide())
				.then(() => props.updateReviews());
		} else {
			setRatingError(true);
		}
	};

	useEffect(() => {
		if (
			ratingBeforeClickedAddReviewSnackbar &&
			rating !== ratingBeforeClickedAddReviewSnackbar
		) {
			setRating(ratingBeforeClickedAddReviewSnackbar);
		}
	}, [ratingBeforeClickedAddReviewSnackbar, rating]);

	let ratingHelperText;

	if ((rating === 0 && hover === -1) || (rating === null && hover === -1)) {
		ratingHelperText = (
			<Typography
				component="span"
				className={clsx({ [styles.ratingError]: ratingError })}
			>
				Select a rating:
			</Typography>
		);
	} else {
		ratingHelperText = (
			<Typography component="span">
				Rate as "{labels[hover !== -1 ? hover : rating]}"
			</Typography>
		);
	}

	return (
		<Box marginTop={1}>
			<Grid container alignItems="center" justify="center">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid
						item
						container
						xs={12}
						justify="center"
						alignItems="center"
						spacing={1}
						className={styles.container}
					>
						<Grid item xs={12} container justify="center">
							<Typography>{ratingHelperText}</Typography>
						</Grid>
						<Grid item xs={12} container justify="center">
							<Rating
								name="second-rating"
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
						<Grid item xs={12} sm={8} container justify="center">
							<TextField
								id="review-body"
								label="Your Review"
								name="review"
								multiline
								rows={4}
								fullWidth
								variant="outlined"
								size="small"
								inputRef={register({
									required: true,
									minLength: { value: 20, message: 'Minimum 20 characters' },
									maxLength: { value: 1000, message: 'Maximum 1000 characters' }
								})}
								error={Boolean(errors.review)}
								helperText={Boolean(errors.review) && errors.review.message}
								autoFocus
							/>
						</Grid>
						<Grid item container xs={12} justify="center">
							<Button type="submit" size="large" variant="contained" color="primary">
								Submit
							</Button>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Box>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUserData: state.currentUserData
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData }))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsAdd);

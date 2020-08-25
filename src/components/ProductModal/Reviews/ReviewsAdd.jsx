import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Typography, Button, TextField, Grid, Snackbar, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	ratingError: {
		fontWeight: theme.typography.fontWeightMedium,
		color: theme.palette.error.main
	}
}));

const labels = {
	1: 'Bad',
	2: 'Okay',
	3: 'Good',
	4: 'Great',
	5: 'Excellent'
};

export default function ReviewsAdd(props) {
	const styles = useStyles();
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(-1);
	const [ratingError, setRatingError] = useState(false);
	const [showSnack, setShowSnack] = useState(false);

	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setShowSnack(false);
	};

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		if (rating > 0) {
			setShowSnack(true);
			console.log('review', data.review, rating);
			props.hide();
		} else {
			setRatingError(true);
		}
	};

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
		<>
			<Box marginTop={1}>
				<Grid container alignItems="center" justify="center">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid item container xs={12} justify="center" alignItems="center" spacing={1}>
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
									inputRef={register({ required: true, minLength: 5, maxLength: 1000 })}
									error={Boolean(errors.review)}
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
			<Snackbar
				open={showSnack}
				autoHideDuration={6000}
				onClose={handleCloseSnack}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					onClose={handleCloseSnack}
					severity="success"
					color="info"
					variant="filled"
					elevation={6}
				>
					<AlertTitle>Review added.</AlertTitle>
					Thank you for helping people find vegan products easier{' '}
					<span role="img" aria-label="">
						💪
					</span>
				</Alert>
			</Snackbar>
		</>
	);
}

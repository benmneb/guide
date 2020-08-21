import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { Typography, Snackbar, Button, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import MuiAlert from '@material-ui/lab/Alert';

const labels = {
	1: 'Bad',
	2: 'Okay',
	3: 'Good',
	4: 'Great',
	5: 'Excellent'
};

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function StarRating(props) {
	const [newRating, setNewRating] = useState(null);
	const [hover, setHover] = useState(-1);
	const [showSnack, setShowSnack] = useState(false);

	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setShowSnack(false);
	};

	const { showAddReview } = props;

	const handleClickAddReviewAfterRating = () => {
		setShowSnack(false);
		props.onClickAddReviewSnackbarAfterRating(newRating);
	};

	let text = `from ${props.amountOfRatings} ratings`;
	let precision = 0.1;
	if (hover >= 0) {
		precision = 1;
		text = `rate as "${labels[hover]}"`;
	}

	return (
		<>
			<Box disaply="flex" justifyContent="center">
				<Box display="flex" alignItems="center" marginBottom={1} minWidth={295}>
					<Box>
						<Box display="flex" alignItems="center" justifyContent="center">
							<Rating
								name="product-rating"
								value={props.averageRating}
								precision={precision}
								size="large"
								onChange={(event, newValue) => {
									setNewRating(event.target.value);
									setShowSnack(true);
								}}
								onChangeActive={(event, newHover) => {
									setHover(Math.floor(newHover));
								}}
								readOnly={showAddReview}
							/>
						</Box>
					</Box>
					<Box marginLeft={2}>
						<Box display="flex" alignItems="center" justifyContent="center">
							<Typography display="inline">{text}</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
			<Snackbar
				open={showSnack}
				autoHideDuration={5000}
				onClose={handleCloseSnack}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					onClose={handleCloseSnack}
					severity="success"
					action={
						<Button
							onClick={handleClickAddReviewAfterRating}
							color="inherit"
							size="small"
						>
							Add a review?
						</Button>
					}
				>
					Rated as "{labels[newRating]}"
				</Alert>
			</Snackbar>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		showAddReview: state.showAddReview
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onClickAddReviewSnackbarAfterRating: (rating) =>
			dispatch(
				actionCreators.clickAddReviewAfterRating(rating),
				dispatch(actionCreators.showAddReview())
			)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StarRating);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const labels = {
	1: 'Bad',
	2: 'Okay',
	3: 'Good',
	4: 'Great',
	5: 'Excellent'
};

function StarRating({
	showAddReview,
	onHideSnackbar,
	onShowSnackbar,
	onClickAddReviewSnackbarAfterRating,
	...props
}) {
	const [hover, setHover] = useState(-1);

	const handleClickAddReviewAfterRating = (newRating) => {
		onHideSnackbar();
		onClickAddReviewSnackbarAfterRating(newRating);
	};

	let text = `from ${props.amountOfRatings} ratings`;
	let precision = 0.1;
	if (hover >= 0) {
		precision = 1;
		text = `rate as "${labels[hover]}"`;
	}

	return (
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
								const newRating = event.target.value;
								onShowSnackbar({
									snackData: {
										type: 'success',
										message: `Rated as "${labels[event.target.value]}"`,
										action: {
											text: 'Add a review?',
											clicked: () => handleClickAddReviewAfterRating(newRating)
										}
									}
								});
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
			),
		onShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData })),
		onHideSnackbar: () => dispatch(actionCreators.hideSnackbar())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StarRating);

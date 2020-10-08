import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	showSnackbar,
	hideSnackbar,
	clickAddReviewAfterRating,
	showAddReview
} from '../../store/actions';
import { Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import useWidth from '../../utils/useWidth';
import { labels } from '../../assets/ratingLabels';

export default function StarRating(props) {
	const { product } = props;
	const width = useWidth();
	const dispatch = useDispatch();
	const showAddReviewForm = useSelector((state) => state.product.showAddReview);
	const [hover, setHover] = useState(-1);

	let minWidth = 295;
	let ratingSize = 'large';

	if (width === 'xs') {
		minWidth = 265;
		ratingSize = 'medium';
	}

	const handleClickAddReviewAfterRating = (newRating) => {
		dispatch(hideSnackbar());
		dispatch(clickAddReviewAfterRating(newRating));
		dispatch(showAddReview());
	};

	let text;
	if (product && props.amountOfRatings > 1) {
		text = `from ${props.amountOfRatings} ratings`;
	} else if (product && props.amountOfRatings === 1) {
		text = 'from 1 rating';
	} else if (product && props.amountOfRatings <= 0) {
		text = 'be the first to rate';
	} else {
		text = <Skeleton width={100} />;
	}

	let precision = 0.1;
	if (hover > -1) {
		precision = 1;
		text = `rate as "${labels[hover]}"`;
	}

	return (
		<Box disaply="flex" justifyContent="center">
			<Box display="flex" alignItems="center" marginBottom={1} minWidth={minWidth}>
				<Box>
					<Box display="flex" alignItems="center" justifyContent="center">
						<Rating
							name="product-rating"
							value={props.averageRating}
							precision={precision}
							size={ratingSize}
							onChange={(event, newValue) => {
								const newRating = event.target.value;
								props.onRate(newRating);
								dispatch(
									showSnackbar({
										type: 'success',
										message: `Rated as "${labels[newRating]}"`,
										action: {
											text: 'Add a review?',
											clicked: () => handleClickAddReviewAfterRating(newRating)
										}
									})
								);
							}}
							onChangeActive={(event, newHover) => {
								setHover(Math.floor(newHover));
							}}
							readOnly={showAddReviewForm}
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

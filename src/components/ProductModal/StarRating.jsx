import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import { useConfirm } from 'material-ui-confirm';
import useWidth from '../../utils/useWidth';
import { labels } from '../../assets/ratingLabels';

export default function StarRating(props) {
	const { product } = props;
	const width = useWidth();
	const confirm = useConfirm();
	const showAddReviewForm = useSelector((state) => state.product.showAddReview);
	const [hover, setHover] = useState(-1);

	let minWidth = 295;
	let ratingSize = 'large';

	if (width === 'xs') {
		minWidth = 265;
		ratingSize = 'medium';
	}

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

	function handleRatingClick(event, newValue) {
		confirm({
			title: `Rate as ${newValue} out of 5?`,
			description: `Please confirm you want to rate this product as "${labels[newValue]}".`,
			confirmationText: 'Rate'
		})
			.then(() => props.onRate(newValue))
			.catch(() => null)
			.finally(() => setHover(-1));
	}

	function handleRatingHover(event, newHover) {
		setHover(Math.floor(newHover));
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
							onChange={handleRatingClick}
							onChangeActive={handleRatingHover}
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

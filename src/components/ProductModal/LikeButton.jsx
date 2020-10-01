import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateReviews, showSnackbar } from '../../store/actions';
import { Tooltip, IconButton } from '@material-ui/core';
import { ThumbUpAltRounded } from '@material-ui/icons';
import { usePrepareLink, getParams, getEnums } from '../../utils/routing';

export default function LikeButton({ review, ...props }) {
	const { tooltip, tooltipPlacement, ariaLabel, size } = props;
	const dispatch = useDispatch();
	const history = useHistory();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const selectedProductId = useSelector(
		(state) => state.product.selectedProduct.productId
	);
	const currentUserData = useSelector(
		(state) => state.auth.isAuthenticated && state.auth.currentUserData
	);
	const [hasBeenClicked, setHasBeenClicked] = useState(false);

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		},
		keepOldQuery: true
	});

	useEffect(() => {
		if (isAuthenticated && review.liked_by) {
			if (review.liked_by.includes(currentUserData.id)) setHasBeenClicked(true);
		}
	}, [isAuthenticated, setHasBeenClicked, review, currentUserData]);

	const handleClick = () => {
		if (isAuthenticated) {
			axios
				.put('https://api.vomad.guide/like/', {
					review_id: review.review_id,
					user_id: currentUserData.id
				})
				.then(() => {
					dispatch(updateReviews(selectedProductId));
					setHasBeenClicked(!hasBeenClicked);
				})
				.catch((err) => {
					console.error(err);
					dispatch(
						showSnackbar({
							snackData: {
								type: 'error',
								title: 'Could not like review',
								message: `${err.message}. Please try again.`
							}
						})
					);
				});
		} else {
			history.push(authLink);
		}
	};

	const color = hasBeenClicked ? 'primary' : 'inherit';

	return (
		<Tooltip title={tooltip} placement={tooltipPlacement}>
			<IconButton aria-label={ariaLabel} onClick={handleClick}>
				<ThumbUpAltRounded color={color} fontSize={size} />
			</IconButton>
		</Tooltip>
	);
}

LikeButton.propTypes = {
	tooltip: PropTypes.string.isRequired,
	tooltipPlacement: PropTypes.oneOf([
		'bottom-end',
		'bottom-start',
		'bottom',
		'left-end',
		'left-start',
		'left',
		'right-end',
		'right-start',
		'right',
		'top-end',
		'top-start',
		'top'
	]),
	ariaLabel: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['inherit', 'default', 'small', 'large'])
};

LikeButton.defaultProps = {
	tooltipPlacement: 'bottom',
	size: 'default'
};

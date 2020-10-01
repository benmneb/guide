import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setSelectedProduct = (id) => {
	return {
		type: actionTypes.SET_SELECTED_PRODUCT,
		payload: {
			id
		}
	};
};

export const clickAddReviewAfterRating = (rating) => {
	return {
		type: actionTypes.CLICK_ADD_REVIEW_AFTER_RATING,
		payload: {
			rating
		}
	};
};

export const showAddReview = () => {
	return {
		type: actionTypes.SHOW_ADD_REVIEW
	};
};

export const hideAddReview = () => {
	return {
		type: actionTypes.HIDE_ADD_REVIEW
	};
};

export const setCurrentLocation = (location) => {
	return {
		type: actionTypes.SET_CURRENT_LOCATION,
		payload: {
			location
		}
	};
};

export const setReviews = (reviews) => {
	return {
		type: actionTypes.SET_REVIEWS,
		reviews
	};
};

export const updateReviews = (selectedProductId) => (dispatch) =>
	axios
		.get(`https://api.vomad.guide/review/${selectedProductId}`)
		.then((response) =>
			dispatch({
				type: actionTypes.SET_REVIEWS,
				reviews: response.data
			})
		)
		.catch((err) => console.error(err));

import * as actionTypes from './actionTypes';

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

import * as actionTypes from './actionTypes';
import { showSnackbar } from './index';
import axios from 'axios';

export const setSelectedProduct = (id) => {
	return {
		type: actionTypes.SET_SELECTED_PRODUCT,
		id
	};
};

export const clickAddReviewAfterRating = (rating) => {
	return {
		type: actionTypes.CLICK_ADD_REVIEW_AFTER_RATING,
		rating
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
		location
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
		.catch((err) => console.error('TODO: PUT A SNACKBAR HERE BRO', err));

export const setStores = (stores) => {
	return {
		type: actionTypes.SET_STORES,
		stores
	};
};

export const updateStores = (selectedProductId, lat, lng) => (dispatch) =>
	axios
		.get(`https://api.vomad.guide/stores/${selectedProductId}?lat=${lat}&lng=${lng}`)
		.then((response) =>
			dispatch({
				type: actionTypes.SET_STORES,
				stores: response.data
			})
		)
		.catch((err) => {
			console.error('Error updating stores:', err);
			dispatch(
				showSnackbar({
					type: 'info',
					title: 'Vote received',
					message: 'Thank you for helping people find vegan products easier',
					emoji: '💪'
				})
			);
		});

export const setSelectedStore = (store) => {
	return {
		type: actionTypes.SET_SELECTED_STORE,
		store
	};
};

import * as actionTypes from '../actions/actionTypes';

const initialState = {
	selectedProduct: null,
	ratingBeforeClickedAddReviewSnackbar: null,
	showAddReview: false,
	currentLocation: null
};

export default function ProductReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_SELECTED_PRODUCT:
			return {
				...state,
				selectedProduct: action.payload.id,
				ratingBeforeClickedAddReviewSnackbar: null
			};
		case actionTypes.CLICK_ADD_REVIEW_AFTER_RATING:
			return {
				...state,
				ratingBeforeClickedAddReviewSnackbar: Number(action.payload.rating)
			};
		case actionTypes.SHOW_ADD_REVIEW:
			return {
				...state,
				showAddReview: true
			};
		case actionTypes.HIDE_ADD_REVIEW:
			return {
				...state,
				showAddReview: false
			};
		case actionTypes.SET_CURRENT_LOCATION:
			return {
				...state,
				currentLocation: action.payload.location
			};
		default:
			return state;
	}
}

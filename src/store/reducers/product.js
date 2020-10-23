import * as actionTypes from '../actions/actionTypes';

const initialState = {
	selectedProduct: null,
	tempRating: null,
	showAddReview: false,
	currentLocation: null,
	reviews: null,
	stores: null,
	selectedStore: null,
	prevReviewData: null
};

export default function ProductReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_SELECTED_PRODUCT:
			return {
				...state,
				selectedProduct: action.id
			};
		case actionTypes.SET_TEMP_RATING:
			return {
				...state,
				tempRating: Number(action.rating)
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
				currentLocation: action.location
			};
		case actionTypes.SET_REVIEWS:
			return {
				...state,
				reviews: action.reviews
			};
		case actionTypes.SET_PREV_REVIEW_DATA:
			return {
				...state,
				prevReviewData: action.data
			};
		case actionTypes.SET_STORES:
			return {
				...state,
				stores: action.stores
			};
		case actionTypes.SET_SELECTED_STORE:
			return {
				...state,
				selectedStore: action.store
			};
		default:
			return state;
	}
}

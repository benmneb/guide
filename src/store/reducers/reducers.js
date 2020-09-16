import * as actionTypes from '../actions/actionTypes';

const initialState = {
	showFiltersPanel: false,
	showSideDrawer: false,
	showProductModal: false,
	showAddProductsModal: false,
	showAdvertiseModal: false,
	showTermsModal: false,
	showPrivacyModal: false,
	showFeedbackModal: false,
	showAuthModal: false,
	showUserProfileModal: false,
	currentUserData: {},
	isAuthenticated: false,
	showSnackbar: false,
	snackData: {},
	showAddReview: false,
	ratingBeforeClickedAddReviewSnackbar: null,
	selectedProduct: null,
	currentLocation: null,
	appliedFilters: []
};

export default function Reducers(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SHOW_FILTERS_PANEL:
			return {
				...state,
				showFiltersPanel: true
			};
		case actionTypes.HIDE_FILTERS_PANEL:
			return {
				...state,
				showFiltersPanel: false
			};
		case actionTypes.SHOW_SIDE_DRAWER:
			return {
				...state,
				showSideDrawer: true
			};
		case actionTypes.HIDE_SIDE_DRAWER:
			return {
				...state,
				showSideDrawer: false
			};
		case actionTypes.TOGGLE_PRODUCT_MODAL:
			return {
				...state,
				showProductModal: !state.showProductModal,
				selectedProduct: action.payload.id,
				ratingBeforeClickedAddReviewSnackbar: null
			};
		case actionTypes.TOGGLE_ADD_PRODUCTS_MODAL:
			return {
				...state,
				showAddProductsModal: !state.showAddProductsModal
			};
		case actionTypes.TOGGLE_ADVERTISE_MODAL:
			return {
				...state,
				showAdvertiseModal: !state.showAdvertiseModal
			};
		case actionTypes.TOGGLE_TERMS_MODAL:
			return {
				...state,
				showTermsModal: !state.showTermsModal
			};
		case actionTypes.TOGGLE_PRIVACY_MODAL:
			return {
				...state,
				showPrivacyModal: !state.showPrivacyModal
			};
		case actionTypes.TOGGLE_FEEDBACK_MODAL:
			return {
				...state,
				showFeedbackModal: !state.showFeedbackModal
			};
		case actionTypes.TOGGLE_AUTH_MODAL:
			return {
				...state,
				showAuthModal: !state.showAuthModal
			};
		case actionTypes.TOGGLE_USER_PROFILE_MODAL:
			return {
				...state,
				showUserProfileModal: !state.showUserProfileModal
			};
		case actionTypes.SET_CURRENT_USER_DATA:
			return {
				...state,
				isAuthenticated: action.payload.isAuth,
				currentUserData: action.payload.user
			};
		case actionTypes.SHOW_SNACKBAR:
			return {
				...state,
				showSnackbar: true,
				snackData: action.payload.snackData
			};
		case actionTypes.HIDE_SNACKBAR:
			return {
				...state,
				showSnackbar: false
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
		case actionTypes.ADD_FILTER:
			return {
				...state,
				appliedFilters: [...state.appliedFilters, action.payload.filter]
			};
		case actionTypes.REMOVE_FILTER:
			return {
				...state,
				appliedFilters: state.appliedFilters.filter(
					(filter) => filter !== action.payload.filter
				)
			};
		case actionTypes.REMOVE_ALL_FILTERS:
			return {
				...state,
				appliedFilters: []
			};
		default:
			return state;
	}
}

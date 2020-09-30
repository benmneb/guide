import * as actionTypes from '../actions/actionTypes';

const initialState = {
	showFiltersPanel: false,
	showSideDrawer: false,
	showProductModal: false,
	currentUserData: null,
	isAuthenticated: false,
	showSnackbar: false,
	snackData: {},
	showAddReview: false,
	ratingBeforeClickedAddReviewSnackbar: null,
	selectedProduct: null,
	currentLocation: null,
	appliedFilters: [],
	isLoading: false,
	isUsingEmailAuth: false,
	isUsingEmailAuthRoute: 'login',
	sortResultsBy: 'Popularity',
	orderResultsBy: 'Descending'
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
		case actionTypes.SET_SELECTED_PRODUCT:
			return {
				...state,
				selectedProduct: action.payload.id,
				ratingBeforeClickedAddReviewSnackbar: null
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
				appliedFilters: [action.payload.filter, ...state.appliedFilters]
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
		case actionTypes.SET_LOADING:
			return {
				...state,
				isLoading: action.payload.state
			};
		case actionTypes.SET_IS_USING_EMAIL_AUTH:
			return {
				...state,
				isUsingEmailAuth: action.payload.state
			};
		case actionTypes.SET_IS_USING_EMAIL_AUTH_ROUTE:
			return {
				...state,
				isUsingEmailAuthRoute: action.payload.route
			};
		case actionTypes.SORT_RESULTS_BY:
			return {
				...state,
				sortResultsBy: action.payload.option
			};
		case actionTypes.ORDER_RESULTS_BY:
			return {
				...state,
				orderResultsBy: action.payload.option
			};
		default:
			return state;
	}
}

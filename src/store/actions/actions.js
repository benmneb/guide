import * as actionTypes from './actionTypes';

export const showFiltersPanel = () => {
	return {
		type: actionTypes.SHOW_FILTERS_PANEL
	};
};

export const hideFiltersPanel = () => {
	return {
		type: actionTypes.HIDE_FILTERS_PANEL
	};
};

export const showSideDrawer = () => {
	return {
		type: actionTypes.SHOW_SIDE_DRAWER
	};
};

export const hideSideDrawer = () => {
	return {
		type: actionTypes.HIDE_SIDE_DRAWER
	};
};

export const toggleProductModal = (id) => {
	return {
		type: actionTypes.TOGGLE_PRODUCT_MODAL,
		payload: {
			id
		}
	};
};

export const toggleAddProductsModal = () => {
	return {
		type: actionTypes.TOGGLE_ADD_PRODUCTS_MODAL
	};
};

export const toggleAdvertiseModal = () => {
	return {
		type: actionTypes.TOGGLE_ADVERTISE_MODAL
	};
};

export const toggleTermsModal = () => {
	return {
		type: actionTypes.TOGGLE_TERMS_MODAL
	};
};

export const togglePrivacyModal = () => {
	return {
		type: actionTypes.TOGGLE_PRIVACY_MODAL
	};
};

export const toggleFeedbackModal = () => {
	return {
		type: actionTypes.TOGGLE_FEEDBACK_MODAL
	};
};

export const toggleAuthModal = () => {
	return {
		type: actionTypes.TOGGLE_AUTH_MODAL
	};
};

export const toggleUserProfileModal = () => {
	return {
		type: actionTypes.TOGGLE_USER_PROFILE_MODAL
	};
};

export const setCurrentUserData = (user, isAuth) => {
	return {
		type: actionTypes.SET_CURRENT_USER_DATA,
		payload: {
			user,
			isAuth
		}
	};
};

export const showSnackbar = ({ snackData }) => {
	return {
		type: actionTypes.SHOW_SNACKBAR,
		payload: {
			snackData
		}
	};
};

export const hideSnackbar = () => {
	return {
		type: actionTypes.HIDE_SNACKBAR
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

export const addFilter = (filter) => {
	return {
		type: actionTypes.ADD_FILTER,
		payload: {
			filter
		}
	};
};

export const removeFilter = (filter) => {
	return {
		type: actionTypes.REMOVE_FILTER,
		payload: {
			filter
		}
	};
};

export const removeAllFilters = () => {
	return {
		type: actionTypes.REMOVE_ALL_FILTERS
	};
};

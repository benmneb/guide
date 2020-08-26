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

export const toggleProductModal = () => {
	return {
		type: actionTypes.TOGGLE_PRODUCT_MODAL
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

export const showSuccessSnack = ({ snackData }) => {
	return {
		type: actionTypes.SHOW_SUCCESS_SNACK,
		payload: {
			snackData
		}
	};
};

export const hideSuccessSnack = () => {
	return {
		type: actionTypes.HIDE_SUCCESS_SNACK
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

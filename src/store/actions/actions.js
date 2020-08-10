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

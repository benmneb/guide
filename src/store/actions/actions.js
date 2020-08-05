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

export const showProductModal = () => {
	return {
		type: actionTypes.SHOW_PRODUCT_MODAL
	};
};

export const hideProductModal = () => {
	return {
		type: actionTypes.HIDE_PRODUCT_MODAL
	};
};

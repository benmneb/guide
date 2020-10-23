import * as actionTypes from './actionTypes';

export const setConfirmItsVegan = (state) => {
	return {
		type: actionTypes.SET_CONFIRM_ITS_VEGAN,
		state
	};
};

export const setBrandname = (brand) => {
	return {
		type: actionTypes.SET_BRAND_NAME,
		brand
	};
};
export const setProductname = (product) => {
	return {
		type: actionTypes.SET_PRODUCT_NAME,
		product
	};
};
export const setSelectedCategory = (category) => {
	return {
		type: actionTypes.SET_SELECTED_CATEGORY,
		category
	};
};
export const setCategoryInputValue = (value) => {
	return {
		type: actionTypes.SET_CATEGORY_INPUT_VALUE,
		value
	};
};

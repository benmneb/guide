import * as actionTypes from '../actions/actionTypes';

const initialState = {
	confirmItsVegan: false,
	brandName: null,
	productName: null,
	selectedCategory: null,
	categoryInputValue: ''
};

export default function AddProductsReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_CONFIRM_ITS_VEGAN:
			return {
				...state,
				confirmItsVegan: action.state
			};
		case actionTypes.SET_BRAND_NAME:
			return {
				...state,
				brandName: action.brand
			};
		case actionTypes.SET_PRODUCT_NAME:
			return {
				...state,
				productName: action.product
			};
		case actionTypes.SET_SELECTED_CATEGORY:
			return {
				...state,
				selectedCategory: action.category
			};
		case actionTypes.SET_CATEGORY_INPUT_VALUE:
			return {
				...state,
				categoryInputValue: action.value
			};
		default:
			return state;
	}
}

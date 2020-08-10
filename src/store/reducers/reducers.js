import * as actionTypes from '../actions/actionTypes';

const initialState = {
	showFiltersPanel: false,
	showSideDrawer: false,
	showProductModal: false
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
		case actionTypes.SHOW_PRODUCT_MODAL:
			return {
				...state,
				showProductModal: true
			};
		case actionTypes.HIDE_PRODUCT_MODAL:
			return {
				...state,
				showProductModal: false
			};
		default:
			return state;
	}
}

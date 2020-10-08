import * as actionTypes from '../actions/actionTypes';

const initialState = {
	showFiltersPanel: false,
	showSideDrawer: false,
	showSnackbar: false,
	snackData: {}
};

export default function UiReducer(state = initialState, action) {
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
		case actionTypes.SHOW_SNACKBAR:
			return {
				...state,
				showSnackbar: true,
				snackData: action.snackData
			};
		case actionTypes.HIDE_SNACKBAR:
			return {
				...state,
				showSnackbar: false
			};
		default:
			return state;
	}
}

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

export const showSnackbar = (snackData) => {
	return {
		type: actionTypes.SHOW_SNACKBAR,
		snackData
	};
};

export const hideSnackbar = () => {
	return {
		type: actionTypes.HIDE_SNACKBAR
	};
};

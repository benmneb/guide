import * as actionTypes from './actionTypes';

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

export const setLoading = (state) => {
	return {
		type: actionTypes.SET_LOADING,
		payload: {
			state
		}
	};
};

export const sortResultsBy = (option) => {
	return {
		type: actionTypes.SORT_RESULTS_BY,
		payload: {
			option
		}
	};
};

export const orderResultsBy = (option) => {
	return {
		type: actionTypes.ORDER_RESULTS_BY,
		payload: {
			option
		}
	};
};

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

export const setOffset = (amount) => {
	return {
		type: actionTypes.SET_OFFSET,
		amount
	};
};

export const increaseOffset = (amount) => {
	return {
		type: actionTypes.INCREASE_OFFSET,
		amount
	};
};

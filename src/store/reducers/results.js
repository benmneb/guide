import * as actionTypes from '../actions/actionTypes';

const initialState = {
	isLoading: false,
	appliedFilters: [],
	sortResultsBy: 'Popularity',
	orderResultsBy: 'Descending'
};

export default function ResultsReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.ADD_FILTER:
			return {
				...state,
				appliedFilters: [action.payload.filter, ...state.appliedFilters]
			};
		case actionTypes.REMOVE_FILTER:
			return {
				...state,
				appliedFilters: state.appliedFilters.filter(
					(filter) => filter !== action.payload.filter
				)
			};
		case actionTypes.REMOVE_ALL_FILTERS:
			return {
				...state,
				appliedFilters: []
			};
		case actionTypes.SET_LOADING:
			return {
				...state,
				isLoading: action.payload.state
			};
		case actionTypes.SORT_RESULTS_BY:
			return {
				...state,
				sortResultsBy: action.payload.option
			};
		case actionTypes.ORDER_RESULTS_BY:
			return {
				...state,
				orderResultsBy: action.payload.option
			};
		default:
			return state;
	}
}

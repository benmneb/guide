import * as actionTypes from '../actions/actionTypes';

const initialState = {
	isLoading: false,
	appliedFilters: [],
	offset: 12
};

export default function ResultsReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.ADD_FILTER:
			return {
				...state,
				appliedFilters: [action.filter, ...state.appliedFilters]
			};
		case actionTypes.REMOVE_FILTER:
			return {
				...state,
				appliedFilters: state.appliedFilters.filter((filter) => filter !== action.filter)
			};
		case actionTypes.REMOVE_ALL_FILTERS:
			return {
				...state,
				appliedFilters: []
			};
		case actionTypes.SET_LOADING:
			return {
				...state,
				isLoading: action.state
			};
		case actionTypes.SET_OFFSET:
			return {
				...state,
				offset: action.amount
			};
		case actionTypes.INCREASE_OFFSET:
			return {
				...state,
				offset: state.offset + action.amount
			};
		default:
			return state;
	}
}

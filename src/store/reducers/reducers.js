import * as actionTypes from '../actions/actionTypes';

const initialState = {
	showFiltersPanel: false
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
		default:
			return state;
	}
}

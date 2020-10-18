import * as actionTypes from '../actions/actionTypes';

const initialState = {
	installPrompt: null
};

export default function UiReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_DEFERRED_INSTALL_PROMPT:
			return {
				...state,
				installPrompt: action.prompt
			};
		default:
			return state;
	}
}

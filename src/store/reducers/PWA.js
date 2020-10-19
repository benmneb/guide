import * as actionTypes from '../actions/actionTypes';

const initialState = {
	installPrompt: null,
	hasInstalled: false
};

export default function PwaReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_DEFERRED_INSTALL_PROMPT:
			return {
				...state,
				installPrompt: action.prompt
			};
		case actionTypes.SET_HAS_INSTALLED_PWA:
			return {
				...state,
				hasInstalled: action.status
			};
		default:
			return state;
	}
}

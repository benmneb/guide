import * as actionTypes from './actionTypes';

export const setIsUsingEmailAuth = (state) => {
	return {
		type: actionTypes.SET_IS_USING_EMAIL_AUTH,
		payload: {
			state
		}
	};
};

export const setIsUsingEmailAuthRoute = (route) => {
	return {
		type: actionTypes.SET_IS_USING_EMAIL_AUTH_ROUTE,
		payload: {
			route
		}
	};
};

export const setCurrentUserData = (user, isAuth) => {
	return {
		type: actionTypes.SET_CURRENT_USER_DATA,
		payload: {
			user,
			isAuth
		}
	};
};

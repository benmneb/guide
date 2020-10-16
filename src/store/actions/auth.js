import * as actionTypes from './actionTypes';

export const setIsUsingEmailAuth = (state) => {
	return {
		type: actionTypes.SET_IS_USING_EMAIL_AUTH,
		state
	};
};

export const setIsUsingEmailAuthRoute = (route) => {
	return {
		type: actionTypes.SET_IS_USING_EMAIL_AUTH_ROUTE,
		route
	};
};

export const setCurrentUserData = (user, isAuth) => {
	return {
		type: actionTypes.SET_CURRENT_USER_DATA,
		user,
		isAuth
	};
};

export const updateUsername = (username) => {
	return {
		type: actionTypes.UPDATE_USERNAME,
		username
	};
};

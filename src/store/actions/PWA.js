import * as actionTypes from './actionTypes';

export const setDeferredInstallPrompt = (prompt) => {
	return {
		type: actionTypes.SET_DEFERRED_INSTALL_PROMPT,
		prompt
	};
};

export const setHasInstalledPWA = (status) => {
	return {
		type: actionTypes.SET_HAS_INSTALLED_PWA,
		status
	};
};

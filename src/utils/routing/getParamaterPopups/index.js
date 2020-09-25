import React from 'react';

import { GET_ENUMS } from '../router';

import useGetPopupState from './useGetPopupState';
import Auth from '../../../components/Dialogs/Auth';
import Advertise from '../../../components/Dialogs/Advertise';
import Feedback from '../../../components/Dialogs/Feedback';
import SupportUs from '../../../components/Dialogs/SupportUs';
import AddProducts from '../../../components/Dialogs/AddProducts';
import Terms from '../../../components/Dialogs/Terms';
import Privacy from '../../../components/Dialogs/Privacy';
import UserProfile from '../../../components/Dialogs/UserProfile';
import AuthResetPassword from '../../../components/Dialogs/AuthResetPassword';

const popups = {
	[GET_ENUMS.popup.signIn]: Auth,
	[GET_ENUMS.popup.advertise]: Advertise,
	[GET_ENUMS.popup.feedback]: Feedback,
	[GET_ENUMS.popup.supportUs]: SupportUs,
	[GET_ENUMS.popup.addProducts]: AddProducts,
	[GET_ENUMS.popup.terms]: Terms,
	[GET_ENUMS.popup.privacy]: Privacy,
	[GET_ENUMS.popup.userProfile]: UserProfile,
	[GET_ENUMS.popup.resetPassword]: AuthResetPassword,
	[GET_ENUMS.action.advertise]: Advertise,
	[GET_ENUMS.action.login]: Auth
};

const GetParameterPopups = () => {
	const { mountedPopup, isOpened } = useGetPopupState();
	const Component = popups[mountedPopup];

	if (!Component) {
		return null;
	}

	return <Component isOpened={isOpened} />;
};

export default GetParameterPopups;

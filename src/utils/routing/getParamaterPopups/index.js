import React, { lazy, Suspense } from 'react';

import { GET_ENUMS } from '../router';
import useGetPopupState from './useGetPopupState';

const Auth = lazy(() => import('../../../components/Dialogs/Auth'));
const Advertise = lazy(() => import('../../../components/Dialogs/Advertise'));
const Feedback = lazy(() => import('../../../components/Dialogs/Feedback'));
const SupportUs = lazy(() => import('../../../components/Dialogs/SupportUs'));
const AddProducts = lazy(() => import('../../../components/Dialogs/AddProducts'));
const Terms = lazy(() => import('../../../components/Dialogs/Terms'));
const Privacy = lazy(() => import('../../../components/Dialogs/Privacy'));
const UserProfile = lazy(() => import('../../../components/Dialogs/UserProfile'));
const GetTheApp = lazy(() => import('../../../components/Dialogs/GetTheApp'));
const AuthResetPassword = lazy(() =>
	import('../../../components/Dialogs/AuthResetPassword')
);

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
	[GET_ENUMS.popup.getTheApp]: GetTheApp,
	[GET_ENUMS.action.advertise]: Advertise,
	[GET_ENUMS.action.login]: Auth,
	[GET_ENUMS.action.feedback]: Feedback
};

export default function GetParameterPopups() {
	const { mountedPopup, isOpened } = useGetPopupState();
	const Component = popups[mountedPopup];

	if (!Component) {
		return null;
	}

	return (
		<Suspense fallback={null}>
			<Component isOpened={isOpened} />
		</Suspense>
	);
}

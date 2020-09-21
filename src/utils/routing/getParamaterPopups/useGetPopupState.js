/* global clearTimeout */
import { useState, useEffect, useMemo } from 'react';

import { GET_PARAMS } from '../router';
import useGetParameter from '../useGetParamater';

let timeout;

export default () => {
	const popupName = useGetParameter(GET_PARAMS.popup);
	const [mountedPopup, setMountedPopup] = useState(popupName);

	useEffect(() => {
		if (popupName) {
			timeout && clearTimeout(timeout);
			setMountedPopup(popupName);
		} else {
			timeout = setTimeout(() => {
				setMountedPopup(null);
			}, 195);
		}
	}, [popupName]);

	useEffect(() => {
		return () => {
			timeout && clearTimeout(timeout);
		};
	}, []);

	const isOpened = useMemo(() => Boolean(popupName), [popupName]);

	return {
		mountedPopup,
		isOpened
	};
};

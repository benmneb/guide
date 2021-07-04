import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import ReactGA from 'react-ga';

export const usePageTracking = () => {
	let location = useLocation();
	useEffect(() => {
		ReactGA.initialize('UA-197330337-2');
		ReactGA.pageview(location.pathname + location.search);
	}, [location]);
};

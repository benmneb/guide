import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAckee from 'use-ackee';

export function useAcklytics() {
	const location = useLocation();

	useEffect(() => {
		useAckee(
			location.pathname,
			{
				server: 'https://acklytics.vercel.app',
				domainId: 'dec7aee9-90e6-4afa-b4e0-1358f3440fbd'
			},
			{
				detailed: true,
				ignoreLocalhost: true,
				ignoreOwnVisits: true
			}
		);
	}, [location.pathname]);
}

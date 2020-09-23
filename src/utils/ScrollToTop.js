import { useEffect } from 'react';

export default function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}

export function scrollToTopNow() {
	return window.scrollTo(0, 0);
}

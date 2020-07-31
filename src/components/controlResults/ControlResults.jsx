import React, { useState } from 'react';
import BackToCategories from './BackToCategories';
import ResultsInfo from './ResultsInfo';
import SortBy from './SortBy';
import Nav from '../../containers/Nav/Nav';

const customStyle = {
	height: '40px'
};

const ControlResults = () => {
	const [shadow, setShadow] = useState(false);
	const [hide, setHide] = useState(false);

	let prevScrollpos = window.pageYOffset;
	window.addEventListener('scroll', () => {
		let currentScrollPos = window.pageYOffset;
		if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
			setShadow(true);
			if (prevScrollpos > currentScrollPos) {
				setHide(false);
			} else {
				setHide(true);
			}
			prevScrollpos = currentScrollPos;
		} else {
			setShadow(false);
		}
	});

	return (
		<Nav position="sticky" shadowDark={shadow} hide={hide}>
			<BackToCategories customStyle={customStyle} />
			<ResultsInfo />
			<SortBy customStyle={customStyle} />
		</Nav>
	);
};

export default ControlResults;

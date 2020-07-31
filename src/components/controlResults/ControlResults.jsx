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

	window.addEventListener('scroll', () => {
		if (document.body.scrollTop > 230 || document.documentElement.scrollTop > 230) {
			setShadow(true);
		} else {
			setShadow(false);
		}
	});

	return (
		<Nav position="sticky" shadow={shadow}>
			<BackToCategories customStyle={customStyle} />
			<ResultsInfo />
			<SortBy customStyle={customStyle} />
		</Nav>
	);
};

export default ControlResults;

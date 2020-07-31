import React, { useState } from 'react';
import classes from './ControlResults.module.css';
import BackToCategories from './BackToCategories';
import ResultsInfo from './ResultsInfo';
import SortBy from './SortBy';

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
		<div className={`${classes.container} ${shadow && classes.shadow}`}>
			<BackToCategories customStyle={customStyle} />
			<ResultsInfo />
			<SortBy customStyle={customStyle} />
		</div>
	);
};

export default ControlResults;

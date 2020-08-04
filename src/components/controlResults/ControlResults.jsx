import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import BackToCategories from './BackToCategories';
import ResultsInfo from './ResultsInfo';
import SortBy from './SortBy';
import Nav from '../../containers/Nav/Nav';

const customStyle = {
	height: '40px'
};

const ControlResults = (props) => {
	const [shadow, setShadow] = useState(false);
	const [hide, setHide] = useState(false);

	const { showFiltersPanel } = props;
	let shadowPoint = useRef(230);
	useEffect(() => {
		if (showFiltersPanel) {
			shadowPoint.current = 5;
		} else {
			shadowPoint.current = 230;
		}
	}, [showFiltersPanel]);

	let prevScrollpos = window.pageYOffset;
	window.addEventListener('scroll', () => {
		let currentScrollPos = window.pageYOffset;
		if (
			document.body.scrollTop > shadowPoint.current ||
			document.documentElement.scrollTop > shadowPoint.current
		) {
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
		<Nav
			position="sticky"
			shadowDark={shadow}
			hide={hide}
			filtersAreOpen={props.showFiltersPanel}
		>
			<BackToCategories customStyle={customStyle} />
			<ResultsInfo />
			<SortBy customStyle={customStyle} />
		</Nav>
	);
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel
	};
};

export default connect(mapStateToProps)(ControlResults);

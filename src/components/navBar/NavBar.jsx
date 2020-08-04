import React, { useState } from 'react';
import { connect } from 'react-redux';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';
import Nav from '../../containers/Nav/Nav';

const NavBar = (props) => {
	const [shadow, setShadow] = useState(false);

	window.addEventListener('scroll', () => {
		if (document.body.scrollTop > 230 || document.documentElement.scrollTop > 230) {
			setShadow(false);
		} else {
			setShadow(true);
		}
	});

	return (
		<Nav position="fixed" displayNone={props.showFiltersPanel} shadowLight={shadow}>
			<Logo />
			<SearchBar currentScope="products" />
			<NavLinks />
		</Nav>
	);
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel
	};
};

export default connect(mapStateToProps)(NavBar);

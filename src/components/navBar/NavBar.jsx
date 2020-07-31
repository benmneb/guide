import React, { useState } from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';
import Nav from '../../containers/Nav/Nav';

const NavBar = () => {
	const [shadow, setShadow] = useState(false);

	window.addEventListener('scroll', () => {
		if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
			setShadow(false);
		} else {
			setShadow(true);
		}
	});

	return (
		<Nav position="fixed" shadowLight={shadow}>
			<Logo />
			<SearchBar currentScope="products" />
			<NavLinks />
		</Nav>
	);
};

export default NavBar;

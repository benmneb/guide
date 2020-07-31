import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';
import Nav from '../../containers/Nav/Nav';

const NavBar = () => {
	return (
		<Nav position="fixed">
			<Logo />
			<SearchBar currentScope="products" />
			<NavLinks />
		</Nav>
	);
};

export default NavBar;

import React from 'react';
import classes from './NavBar.module.css';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';

const NavBar = () => {
	return (
		<div className={classes.container}>
			<Logo />
			<SearchBar currentScope="products" />
			<NavLinks />
		</div>
	);
};

export default NavBar;

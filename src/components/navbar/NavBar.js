import React from 'react';
import './NavBar.css';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavLinks from './NavLinks';

const NavBar = () => {
  return (
    <div id='nav-div'>
      <Logo />
      <SearchBar />
      <NavLinks />
    </div>
  )
}

export default NavBar;

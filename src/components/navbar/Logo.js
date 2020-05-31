import React from 'react';
import './Logo.css'
import LogoImg from './logo.png'

const Logo = () => {
  return (
    <div id='logo-div'>
      <img
        id='logo-img'
        src={LogoImg}
        alt='Vomad Guide: All the Best Accidentally Vegan Groceries'
      />
    </div>
  )
}

export default Logo;

import React from 'react';
import classes from './Logo.module.css';
import LogoImg from '../../assets/logo.png';

const Logo = () => {
	return (
		<div className={classes.container}>
			<img
				className={classes.content}
				src={LogoImg}
				alt="Vomad Guide: Find Vegan Products Near You"
			/>
		</div>
	);
};

export default Logo;

import React from 'react';
import classes from './Hero.module.css';

const Hero = () => {
	return (
		<div className={classes.container}>
			<div className={classes.textBox}>
				<h1>Find Vegan Products Near You.</h1>
				<h4>
					The Vomad Guide is a free community-sourced database of 100% plant-based
					products.
				</h4>
				<h4>
					<em>Filter. Search. Browse. Review. Contribute.</em>
				</h4>
			</div>
		</div>
	);
};

export default Hero;

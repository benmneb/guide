import React from 'react';
import classes from './Hero.module.css';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	h1: {
		[theme.breakpoints.down('md')]: {
			fontSize: '2.4rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem'
		}
	},
	h2: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	h3: {
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	}
}));

const Hero = () => {
	const styles = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.textBox}>
				<Typography
					variant="h1"
					align="center"
					paragraph
					gutterBottom
					className={styles.h1}
				>
					Find Vegan Products Near You
				</Typography>
				<Typography
					variant="body1"
					align="center"
					component="h2"
					paragraph
					className={styles.h2}
				>
					The Vomad Guide is a free community-sourced database of 100% plant-based
					products.
				</Typography>
				<Typography variant="button" align="center" component="div" className={styles.h3}>
					Filter. Search. Browse. Review. Contribute.
				</Typography>
			</div>
		</div>
	);
};

export default Hero;

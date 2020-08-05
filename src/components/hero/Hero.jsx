import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	h1: {
		[theme.breakpoints.down('md')]: {
			fontSize: '2.6rem'
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
	},
	container: {
		height: 300,
		backgroundColor: 'white',
		position: 'relative',
		zIndex: 1
	},
	textBox: {
		position: 'relative',
		top: 'calc(50% + calc(var(--header-height) / 2))',
		transform: 'translateY(-50%)',
		zIndex: 1
	},
	displayNone: {
		display: 'none'
	}
}));

const Hero = (props) => {
	const styles = useStyles();

	return (
		<Container
			maxWidth="false"
			className={clsx(styles.container, { [styles.displayNone]: props.showFiltersPanel })}
		>
			<Container maxWidth="md" className={styles.textBox}>
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
					component="p"
					paragraph
					className={styles.h2}
				>
					The Vomad Guide is a free community-sourced database of 100% plant-based
					products.
				</Typography>
				<Typography variant="button" align="center" component="p" className={styles.h3}>
					Filter. Search. Browse. Review. Contribute.
				</Typography>
			</Container>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel
	};
};

export default connect(mapStateToProps)(Hero);

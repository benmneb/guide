import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Typography, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: 'white',
		zIndex: theme.zIndex.appBar + 1
	},
	textBox: {
		// top: 'calc(50% + calc(var(--header-height) / 2))',
		// transform: 'translateY(-50%)',
		top: theme.mixins.toolbar.minHeight / 2,
		zIndex: theme.zIndex.appBar + 1
	},
	displayNone: {
		display: 'none'
	}
}));

const Hero = (props) => {
	const styles = useStyles();

	return (
		<Box
			height={300}
			position="relative"
			display="flex"
			alignItems="center"
			className={clsx(styles.container, { [styles.displayNone]: props.showFiltersPanel })}
		>
			<Box position="relative" marginLeft={3} width={3 / 4} className={styles.textBox}>
				<Typography variant="h1" align="left" gutterBottom>
					Vegan Nut-Butters & Spreads
				</Typography>
				<Box display={{ xs: 'none', sm: 'block' }}>
					<Typography align="left" component="p" variant="h5" paragraph>
						There are 64 vegan nut-butters & spreads in Australia from brands like Kraft,
						Pics, Bega and 14 more.
					</Typography>
				</Box>
				<Box display={{ xs: 'none', md: 'block' }}>
					<Typography align="left" paragraph>
						You can{' '}
						<Link href="#" underline="hover">
							add any missing products
						</Link>
						.
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel
	};
};

export default connect(mapStateToProps)(Hero);

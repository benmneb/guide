import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Typography, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.palette.background.paper,
		zIndex: theme.zIndex.appBar + 1
	},
	content: {
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
			<Box position="relative" marginLeft={3} width={3 / 4} className={styles.content}>
				<Typography component="h1" variant="h2" align="left" gutterBottom>
					{props.heading}
				</Typography>
				<Box display={{ xs: 'none', sm: 'block' }}>
					<Typography align="left" component="p" variant="h5" paragraph>
						{props.subheading}
					</Typography>
				</Box>
				{props.showAddProductsLink && (
					<Box display={{ xs: 'none', md: 'block' }}>
						<Typography align="left" paragraph>
							You can{' '}
							<Link href="#" underline="hover">
								add any missing products
							</Link>
							.
						</Typography>
					</Box>
				)}
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

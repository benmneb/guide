import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import InfoRoundedIcon from '@material-ui/icons/Info';
import RateReviewRoundedIcon from '@material-ui/icons/RateReview';
import MapRoundedIcon from '@material-ui/icons/Map';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		left: 0,
		boxShadow: theme.shadows[24]
	},
	bottomNav: {
		...theme.mixins.toolbar,
		backgroundColor: theme.palette.background.default
	}
}));

export default function BottomNav(props) {
	const styles = useStyles();

	return (
		<Box display={{ xs: 'block', md: 'none' }} className={styles.root}>
			<BottomNavigation
				component="nav"
				value={props.currentTab}
				onChange={props.onChange}
				showLabels
				className={styles.bottomNav}
			>
				<BottomNavigationAction label="About" value="about" icon={<InfoRoundedIcon />} />
				<BottomNavigationAction
					label="Reviews"
					value="reviews"
					icon={<RateReviewRoundedIcon />}
				/>
				<BottomNavigationAction
					label="Where to Buy"
					value="where-to-buy"
					icon={<MapRoundedIcon />}
				/>
			</BottomNavigation>
		</Box>
	);
}

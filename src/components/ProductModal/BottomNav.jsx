import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import InfoIcon from '@material-ui/icons/Info';
import RateReviewIcon from '@material-ui/icons/RateReview';
import MapIcon from '@material-ui/icons/Map';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		left: 0,
		boxShadow: theme.shadows[24]
	}
}));

export default function BottomNav(props) {
	const styles = useStyles();

	return (
		<Box display={{ xs: 'block', md: 'none' }} className={styles.root}>
			<BottomNavigation value={props.currentTab} onChange={props.onChange} showLabels>
				<BottomNavigationAction label="About" icon={<InfoIcon />} />
				<BottomNavigationAction label="Reviews" icon={<RateReviewIcon />} />
				<BottomNavigationAction label="Where to Buy" icon={<MapIcon />} />
			</BottomNavigation>
		</Box>
	);
}

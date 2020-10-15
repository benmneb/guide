import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import { WhatshotRounded, FastfoodRounded, BathtubRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		position: 'fixed',
		bottom: 0,
		boxShadow: theme.shadows[24],
		zIndex: theme.zIndex.appBar
	},
	bottomNav: {
		...theme.mixins.toolbar,
		backgroundColor: theme.palette.background.default
	}
}));

export default function BottomNav(props) {
	const styles = useStyles();
	const history = useHistory();

	function handleHomeClick() {
		history.push('/');
	}

	function handleFoodDrinkClick() {
		history.push('/food-drink');
	}

	function handleHouseholdClick() {
		history.push('/household');
	}

	return (
		<Box display={{ xs: 'block', md: 'none' }} className={styles.root}>
			<BottomNavigation
				component="nav"
				value={props.currentTab}
				showLabels
				className={styles.bottomNav}
			>
				<BottomNavigationAction
					label="Popular"
					icon={<WhatshotRounded />}
					onClick={handleHomeClick}
				/>
				<BottomNavigationAction
					label="Food & Drink"
					icon={<FastfoodRounded />}
					onClick={handleFoodDrinkClick}
				/>
				<BottomNavigationAction
					label="Household"
					icon={<BathtubRounded />}
					onClick={handleHouseholdClick}
				/>
			</BottomNavigation>
		</Box>
	);
}

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import { HomeRounded, FastfoodRounded, BathtubRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		position: 'fixed',
		bottom: 0,
		boxShadow: theme.shadows[24],
		zIndex: theme.zIndex.appBar
	}
}));

export default function BottomNav() {
	const classes = useStyles();
	const history = useHistory();
	const [value, setValue] = useState(1);

	function handleHomeClick() {
		history.push('/');
	}

	function handleFoodDrinkClick() {
		history.push('/food-drink');
		setValue(1);
	}

	function handleHouseholdClick() {
		history.push('/household');
		setValue(2);
	}

	return (
		<Box display={{ xs: 'block', md: 'none' }} className={classes.root}>
			<BottomNavigation
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				showLabels
			>
				<BottomNavigationAction
					label="Home"
					icon={<HomeRounded />}
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

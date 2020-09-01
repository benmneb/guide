import React, { useState } from 'react';
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
	}
}));

export default function BottomNav() {
	const classes = useStyles();
	const history = useHistory();
	const [value, setValue] = useState(0);

	function handleHomeClick() {
		setValue(0);
		history.push('/');
	}

	function handleFoodDrinkClick() {
		setValue(1);
		history.push('/food-drink');
	}

	function handleHouseholdClick() {
		setValue(2);
		history.push('/household');
	}

	return (
		<Box display={{ xs: 'block', md: 'none' }} className={classes.root}>
			<BottomNavigation
				component="nav"
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				showLabels
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

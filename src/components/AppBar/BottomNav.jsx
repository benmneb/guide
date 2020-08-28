import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import FilterListRoundedIcon from '@material-ui/icons/FilterList';
import CategoryRoundedIcon from '@material-ui/icons/Category';
import AppsRoundedIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles({
	root: {
		width: '100vw',
		position: 'fixed',
		bottom: 0
	}
});

export default function BottomNav() {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	return (
		<Box display={{ xs: 'block', md: 'none' }} className={classes.root}>
			<BottomNavigation
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				showLabels
			>
				<BottomNavigationAction label="Categories" icon={<CategoryRoundedIcon />} />
				<BottomNavigationAction label="Results" icon={<AppsRoundedIcon />} />
				<BottomNavigationAction label="Filters" icon={<FilterListRoundedIcon />} />
			</BottomNavigation>
		</Box>
	);
}

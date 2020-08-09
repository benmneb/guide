import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import FilterListIcon from '@material-ui/icons/FilterList';
import CategoryIcon from '@material-ui/icons/Category';
import AppsIcon from '@material-ui/icons/Apps';

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
				<BottomNavigationAction label="Categories" icon={<CategoryIcon />} />
				<BottomNavigationAction label="Results" icon={<AppsIcon />} />
				<BottomNavigationAction label="Filters" icon={<FilterListIcon />} />
			</BottomNavigation>
		</Box>
	);
}

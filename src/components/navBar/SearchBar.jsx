import React from 'react';
import classes from './SearchBar.module.css';
import { TextField } from '@material-ui/core';

const SearchBar = ({ currentScope }) => {
	const label = `Search for vegan ${currentScope}...`;

	return (
		<div className={classes.container}>
			<TextField
				id="main-search"
				label={label}
				type="search"
				variant="outlined"
				size="small"
				fullWidth
			/>
		</div>
	);
};

export default SearchBar;

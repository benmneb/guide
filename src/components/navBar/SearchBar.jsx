import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {
		maxWidth: 350,
		width: 350
	}
}));

const SearchBar = ({ currentScope }) => {
	const styles = useStyles();

	const label = `Search for vegan ${currentScope}...`;

	return (
		<div className={styles.container}>
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

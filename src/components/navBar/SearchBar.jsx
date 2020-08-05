import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {
		flex: '0 1 auto',
		width: 350
	}
}));

export default function SearchBar(props) {
	const styles = useStyles();

	const label = `Search for vegan ${props.currentScope}...`;

	return (
		<Box className={styles.container}>
			<TextField
				id="main-search"
				label={label}
				type="search"
				variant="outlined"
				size="small"
				fullWidth
			/>
		</Box>
	);
}

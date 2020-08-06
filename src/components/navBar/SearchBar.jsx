import React from 'react';
import { TextField, Box } from '@material-ui/core';

export default function SearchBar(props) {
	const label = `Search for vegan ${props.currentScope}...`;

	return (
		<Box flex="0 1 auto" width={350}>
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

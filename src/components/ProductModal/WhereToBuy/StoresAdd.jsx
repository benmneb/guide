import React, { useState } from 'react';
import { Button, TextField, Box } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { stores as fakeGooglePlaces } from '../../../assets/stores';

const filter = createFilterOptions();

export default function StoresAdd() {
	const [storeName, setStoreName] = useState(null);

	return (
		<Box
			marginTop={1}
			marginBottom={2}
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<Autocomplete
				value={storeName}
				onChange={(event, newValue) => {
					if (typeof newValue === 'string') {
						setStoreName({
							name: newValue
						});
					} else {
						setStoreName(newValue);
					}
				}}
				filterOptions={(options, params) => {
					const filtered = filter(options, params);

					return filtered;
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				id="storename"
				options={fakeGooglePlaces}
				getOptionLabel={(store) => {
					// Value selected with enter, right from the input
					if (typeof store === 'string') {
						return store;
					}
					// Regular option
					return store.name;
				}}
				renderOption={(store) => store.name}
				style={{ width: 280, marginRight: 8 }}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search stores"
						variant="outlined"
						size="small"
						autoFocus
					/>
				)}
			/>
			<Button variant="contained" color="primary" disableElevation>
				Add
			</Button>
		</Box>
	);
}

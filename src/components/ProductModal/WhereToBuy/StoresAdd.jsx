import React, { useState } from 'react';
import { Button, TextField, Snackbar, Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { stores as fakeGooglePlaces } from '../../../assets/stores';
import { useForm } from 'react-hook-form';

const filter = createFilterOptions();

export default function StoresAdd(props) {
	const [storeName, setStoreName] = useState(null);
	const [showSnack, setShowSnack] = useState(false);

	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setShowSnack(false);
	};

	const { register, handleSubmit, errors } = useForm({ reValidateMode: 'onBlur' });

	const onSubmit = (data) => {
		setShowSnack(true);
		console.log('store', data);
		props.hide();
	};

	return (
		<>
			<Box
				marginTop={1}
				marginBottom={2}
				display="flex"
				alignItems="center"
				justifyContent="center"
				component="form"
				onSubmit={handleSubmit(onSubmit)}
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
							name="store"
							variant="outlined"
							size="small"
							inputRef={register({ required: true })}
							error={Boolean(errors.store)}
							autoFocus
						/>
					)}
				/>
				<Button type="submit" variant="contained" color="primary">
					Add
				</Button>
			</Box>
			<Snackbar
				open={showSnack}
				autoHideDuration={6000}
				onClose={handleCloseSnack}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					onClose={handleCloseSnack}
					severity="success"
					color="info"
					variant="filled"
					elevation={6}
				>
					<AlertTitle>Store added.</AlertTitle>
					Thank you for helping people find vegan products easier{' '}
					<span role="img" aria-label="">
						💪
					</span>
				</Alert>
			</Snackbar>
		</>
	);
}

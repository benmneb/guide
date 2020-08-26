import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import { Button, TextField, Box } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { stores as fakeGooglePlaces } from '../../../assets/stores';
import { useForm } from 'react-hook-form';

const filter = createFilterOptions();

function StoresAdd({ hide, onShowSuccessSnack }) {
	const [storeName, setStoreName] = useState(null);

	const { register, handleSubmit, errors } = useForm({ reValidateMode: 'onBlur' });

	const onSubmit = (data) => {
		onShowSuccessSnack({
			snackData: {
				type: 'success',
				title: 'Store Added',
				message: 'Thank you for helping people find vegan products easier',
				emoji: '💪'
			}
		});
		console.log('store', data);
		hide();
	};

	return (
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
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		onShowSuccessSnack: ({ snackData }) =>
			dispatch(actionCreators.showSuccessSnack({ snackData }))
	};
};

export default connect(null, mapDispatchToProps)(StoresAdd);

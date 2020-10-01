import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackbar } from '../../../store/actions';
import { Grid, TextField, Typography, Box } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOn';
import parse from 'autosuggest-highlight/parse';
import debounce from 'lodash.debounce';
import LoadingButton from '../../../utils/LoadingButton';

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
	icon: {
		color: theme.palette.text.secondary,
		marginRight: theme.spacing(2)
	}
}));

export default function StoresAdd(props) {
	const styles = useStyles();
	const dispatch = useDispatch();
	const currentUserId = useSelector((state) => state.auth.currentUserData.id);
	const [value, setValue] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState([]);
	const [placeDetails, setPlaceDetails] = useState({});
	const [pending, setPending] = useState(false);

	const { register, handleSubmit, errors } = useForm({ reValidateMode: 'onBlur' });

	// this one uses the expensive PlacesServiceGetDetails
	// const onSubmitAddStore = () => {
	// 	const request = {
	// 		placeId: placeId,
	// 		fields: ['name', 'place_id', 'geometry', 'formatted_address']
	// 	};

	// 	if (window.google) {
	// 		const service = new window.google.maps.places.PlacesService(
	// 			document.createElement('div')
	// 		);
	// 		service.getDetails(request, (place, status) => {
	// 			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
	// 				const coords =
	// 					place.geometry.location.lat() + ', ' + place.geometry.location.lng();
	// 				console.log('place:', {
	// 					name: place.name,
	// 					googlePlaceId: place.place_id,
	// 					coords: coords,
	// 					address: place.formatted_address,
	// 					addedBy: 'PUT CURRENT USER ID HERE',
	// 					addedOn: new Date()
	// 				});
	// 				onShowSnackbar({
	// 					snackData: {
	// 						type: 'success',
	// 						title: 'Store added',
	// 						message: 'Thank you for helping people find vegan products easier',
	// 						emoji: '💪'
	// 					}
	// 				});
	// 				props.hide();
	// 			} else {
	// 				console.error('something went wrong getting the place details from google :(');
	// 				onShowSnackbar({
	// 					snackData: {
	// 						type: 'error',
	// 						title: 'Something went wrong',
	// 						message: 'An error occured while adding the store, please try again soon'
	// 					}
	// 				});
	// 			}
	// 		});
	// 	}
	// };

	const onSubmitAddStore = () => {
		if (window.google) {
			setPending(true);
			new window.google.maps.Geocoder().geocode(
				{ placeId: placeDetails.id },
				(results, status) => {
					if (status === 'OK' && results[0]) {
						console.log('place:', {
							name: placeDetails.name,
							address: results[0].formatted_address,
							coords: {
								lat: results[0].geometry.location.lat(),
								lng: results[0].geometry.location.lng()
							},
							googlePlaceId: placeDetails.id,
							googlePlaceTypes: results[0].types.join(', '),
							addedBy: currentUserId,
							addedOn: new Date()
						});
						setPending(false);
						dispatch(
							showSnackbar({
								snackData: {
									type: 'success',
									title: 'Store added',
									message: 'Thank you for helping people find vegan products easier',
									emoji: '💪'
								}
							})
						);
						props.hide();
					} else {
						setPending(false);
						console.error(
							'something went wrong getting the store geocode details from google',
							status
						);
						dispatch(
							showSnackbar({
								snackData: {
									type: 'error',
									title: 'Something went wrong',
									message:
										'An error occured while adding the store, please try again soon'
								}
							})
						);
					}
				}
			);
		}
	};

	const fetch = useMemo(
		() =>
			debounce(
				(request, callback) => {
					autocompleteService.current.getPlacePredictions(request, callback);
				},
				1500,
				{
					leading: false,
					trailing: true
				}
			),
		[]
	);

	useEffect(() => {
		let active = true;

		if (!autocompleteService.current && window.google) {
			autocompleteService.current = new window.google.maps.places.AutocompleteService();
		}

		if (!autocompleteService.current) {
			return undefined;
		}

		if (inputValue === '') {
			setOptions(value ? [value] : []);
			return undefined;
		}

		fetch(
			{
				input: inputValue,
				types: ['establishment'],
				componentRestrictions: { country: 'au' }
			},
			(results) => {
				if (active) {
					let newOptions = [];

					if (value) {
						newOptions = [value];
					}

					if (results) {
						newOptions = [...newOptions, ...results];
					}
					setOptions(newOptions);
				}
			}
		);

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	return (
		<Box
			marginTop={1}
			marginBottom={2}
			display="flex"
			alignItems="center"
			justifyContent="center"
			component="form"
			onSubmit={handleSubmit(onSubmitAddStore)}
		>
			<Autocomplete
				style={{ width: 280, marginRight: 8 }}
				getOptionLabel={(option) =>
					typeof option === 'string' ? option : option.description
				}
				filterOptions={(x) => x}
				options={options}
				autoComplete
				includeInputInList
				filterSelectedOptions
				value={value}
				onChange={(event, newValue) => {
					setOptions(newValue ? [newValue, ...options] : options);
					setValue(newValue);
				}}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
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
				renderOption={(option) => {
					const matches = option.structured_formatting.main_text_matched_substrings;
					const parts = parse(
						option.structured_formatting.main_text,
						matches.map((match) => [match.offset, match.offset + match.length])
					);

					return (
						<Grid
							container
							alignItems="center"
							onClick={() =>
								setPlaceDetails({
									id: option.place_id,
									name: option.structured_formatting.main_text
								})
							}
						>
							<Grid item>
								<LocationOnRoundedIcon className={styles.icon} />
							</Grid>
							<Grid item xs>
								{parts.map((part, index) => (
									<span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
										{part.text}
									</span>
								))}
								<Typography variant="body2" color="textSecondary">
									{option.structured_formatting.secondary_text}
								</Typography>
							</Grid>
						</Grid>
					);
				}}
			/>
			<LoadingButton type="submit" variant="contained" color="primary" pending={pending}>
				Add
			</LoadingButton>
		</Box>
	);
}

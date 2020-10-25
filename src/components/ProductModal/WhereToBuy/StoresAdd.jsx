import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackbar, updateStores } from '../../../store/actions';
import { useConfirm } from 'material-ui-confirm';
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
	autocomplete: { width: 280, marginRight: 8 },
	icon: {
		color: theme.palette.text.secondary,
		marginRight: theme.spacing(2)
	}
}));

export default function StoresAdd(props) {
	const styles = useStyles();
	const confirm = useConfirm();
	const dispatch = useDispatch();
	const currentUserData = useSelector((state) => state.auth.currentUserData);
	const selectedProduct = useSelector((state) => state.product.selectedProduct);
	const currentLocation = useSelector((state) => state.product.currentLocation);
	const { register, handleSubmit, errors } = useForm({ reValidateMode: 'onBlur' });
	const [value, setValue] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState([]);
	const [placeDetails, setPlaceDetails] = useState({});
	const [pending, setPending] = useState(false);

	const onSubmitAddStore = () => {
		if (window.google) {
			confirm({
				description: `Please confirm you have seen this product in ${placeDetails.name}.`,
				confirmationText: 'Add store'
			})
				.then(() => {
					setPending(true);
					new window.google.maps.Geocoder().geocode(
						{ placeId: placeDetails.id },
						(results, status) => {
							if (status === 'OK' && results[0]) {
								axios
									.post(
										`https://api.vomad.guide/add-store/${selectedProduct.productId}`,
										{
											address: results[0].formatted_address,
											google_place_id: placeDetails.id,
											google_place_type: results[0].types.join(', '),
											lat: results[0].geometry.location.lat(),
											lng: results[0].geometry.location.lng(),
											store_name: placeDetails.name,
											user_id: currentUserData.id
										}
									)
									.then(() => {
										dispatch(
											updateStores(
												selectedProduct.productId,
												currentLocation.lat,
												currentLocation.lng
											)
										);
										setPending(false);
										dispatch(
											showSnackbar({
												type: 'success',
												title: 'Store added',
												message:
													'Thank you for helping people find vegan products easier',
												emoji: '💪'
											})
										);
										props.hide();
									})
									.catch((err) => {
										setPending(false);
										if (err.response.data === 'store already added') {
											dispatch(
												showSnackbar({
													type: 'info',
													title: 'Store already added',
													message:
														'That store has already been added for this product! Thanks anyway.'
												})
											);
										} else {
											console.error('Something went wrong adding the store', err);
											dispatch(
												showSnackbar({
													type: 'error',
													title: 'Something went wrong',
													message:
														'An error occured while adding the store, please try again soon.'
												})
											);
										}
									});
							} else {
								setPending(false);
								console.error(
									'something went wrong getting the store geocode details from google',
									status
								);
								dispatch(
									showSnackbar({
										type: 'error',
										title: 'Something went wrong',
										message:
											'An error occured while adding the store, please try again soon'
									})
								);
							}
						}
					);
				})
				.catch(() => setPending(false));
		}
	};

	const fetch = useMemo(
		() =>
			debounce(
				(request, callback) => {
					autocompleteService.current.getPlacePredictions(request, callback);
				},
				1000,
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
				className={styles.autocomplete}
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
						placeholder="Where have you seen this?"
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

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBrandname } from '../../store/actions';
import { TextField, CircularProgress, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { matchSorter } from 'match-sorter';

const useStyles = makeStyles((theme) => ({
	autocomplete: {
		width: 300
	}
}));

export default function AddProductsBrandname() {
	const styles = useStyles();
	const dispatch = useDispatch();
	const brandName = useSelector((state) => state.addProduct.brandName);
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;

	useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const response = await axios.get('/search-brand');
			const brands = await response.data;

			if (active) {
				setOptions(brands);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	function handleChange(event, newValue) {
		if (typeof newValue === 'string') {
			dispatch(
				setBrandname({
					brand_name: newValue
				})
			);
		} else if (newValue && newValue.inputValue) {
			// Create a new value from the user input
			dispatch(
				setBrandname({
					brand_name: newValue.inputValue
				})
			);
		} else {
			dispatch(setBrandname(newValue));
		}
	}

	function filterOptions(options, params) {
		const sorted = matchSorter(options, params.inputValue, { keys: ['brand_name'] });

		// Suggest the creation of a new value
		if (params.inputValue !== '') {
			sorted.push({
				inputValue: params.inputValue,
				brand_name: `Add "${params.inputValue}"`
			});
		}

		return sorted;
	}

	function getOptionLabel(brand) {
		// Value selected with enter, right from the input
		if (typeof brand === 'string') {
			return brand;
		}
		// Add "xxx" option created dynamically
		if (brand.inputValue) {
			return brand.inputValue;
		}
		// Regular option
		return brand.brand_name;
	}

	function renderInput(params) {
		return (
			<TextField
				{...params}
				label="Brand name"
				variant="outlined"
				required
				InputProps={{
					...params.InputProps,
					endAdornment: (
						<>
							{loading ? <CircularProgress color="inherit" size={20} /> : null}
							{params.InputProps.endAdornment}
						</>
					)
				}}
			/>
		);
	}

	function renderOption(brand, { inputValue }) {
		const matches = match(brand.brand_name, inputValue);
		const parts = parse(brand.brand_name, matches);

		return (
			<Grid container alignItems="center">
				<Grid item>
					{parts.map((part, index) => (
						<span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
							{part.text}
						</span>
					))}
				</Grid>
			</Grid>
		);
	}

	return (
		<Autocomplete
			className={styles.autocomplete}
			value={brandName}
			loading={loading}
			loadingText={'Loading brands...'}
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			onChange={handleChange}
			options={options}
			filterOptions={filterOptions}
			selectOnFocus
			clearOnBlur
			blurOnSelect
			handleHomeEndKeys
			autoHighlight
			getOptionLabel={getOptionLabel}
			renderOption={renderOption}
			freeSolo
			renderInput={renderInput}
		/>
	);
}

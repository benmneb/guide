import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProductname, showSnackbar, hideSnackbar } from '../../store/actions';
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

export default function AddProductsProductname() {
	const styles = useStyles();
	const dispatch = useDispatch();
	const productName = useSelector((state) => state.addProduct.productName);
	const brandName = useSelector((state) => state.addProduct.brandName);
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && brandName && brandName.brand_id && options.length === 0;

	useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}
		if (brandName.brand_id) {
			(async () => {
				const response = await axios.get(
					`/search-product/${brandName && brandName.brand_id}`
				);
				const products = await response.data;

				if (active) {
					setOptions(products);
				}
			})();
		}

		return () => {
			active = false;
		};
	}, [loading, brandName]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	function handleChange(event, newValue, reason) {
		if (typeof newValue === 'string') {
			dispatch(
				setProductname({
					product_name: newValue
				})
			);
			dispatch(hideSnackbar());
		} else if (newValue && newValue.inputValue) {
			// Create a new value from the user input
			dispatch(
				setProductname({
					product_name: newValue.inputValue
				})
			);
			dispatch(hideSnackbar());
		} else if (reason === 'select-option') {
			// if they choose an option from the dropdown...
			dispatch(setProductname(''));
			dispatch(
				showSnackbar({
					type: 'error',
					message: "You can't add a product that already exists."
				})
			);
		}
	}

	function filterOptions(options, params) {
		const sorted = matchSorter(options, params.inputValue, { keys: ['product_name'] });

		// Suggest the creation of a new value
		if (params.inputValue !== '') {
			sorted.unshift({
				inputValue: params.inputValue,
				product_name: `Add "${params.inputValue}"`
			});
		}

		return sorted;
	}

	function getOptionLabel(option) {
		// Value selected with enter, right from the input
		if (typeof option === 'string') {
			return option;
		}
		// Add "xxx" option created dynamically
		if (option.inputValue) {
			return option.inputValue;
		}
		// Regular option
		return option.product_name;
	}

	function renderInput(params) {
		return (
			<TextField
				{...params}
				label="Product name"
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

	function renderOption(product, { inputValue }) {
		const matches = match(product.product_name, inputValue);
		const parts = parse(product.product_name, matches);

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
			value={productName}
			loading={loading}
			loadingText={'Loading products...'}
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			onChange={handleChange}
			options={options}
			disabled={!brandName}
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

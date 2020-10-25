import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, setCategoryInputValue } from '../../store/actions';
import { TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { categories } from '../../assets/categories';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { matchSorter } from 'match-sorter';

const useStyles = makeStyles((theme) => ({
	autocomplete: {
		width: 300
	}
}));

export default function AddProductsCategory() {
	const styles = useStyles();
	const dispatch = useDispatch();
	const selectedCategory = useSelector((state) => state.addProduct.selectedCategory);
	const categoryInputValue = useSelector((state) => state.addProduct.categoryInputValue);

	const categoriesMapped = categories.map((category) => {
		return category.name;
	});

	function handleChange(event, chosenCategory) {
		dispatch(setSelectedCategory(chosenCategory));
	}

	function handleInputChange(event, newInputValue) {
		dispatch(setCategoryInputValue(newInputValue));
	}

	function renderInput(params) {
		return <TextField {...params} label="Category" variant="outlined" required />;
	}

	function filterOptions(options, params) {
		return matchSorter(options, params.inputValue);
	}

	function renderOption(category, { inputValue }) {
		const matches = match(category, inputValue);
		const parts = parse(category, matches);

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
			value={selectedCategory}
			onChange={handleChange}
			inputValue={categoryInputValue}
			onInputChange={handleInputChange}
			options={categoriesMapped}
			filterOptions={filterOptions}
			renderOption={renderOption}
			renderInput={renderInput}
		/>
	);
}

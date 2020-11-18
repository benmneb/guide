import { useState } from 'react';
import { useHistory } from 'react-router';
import { fade, makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputBase, Grid, Typography, Box, Popper } from '@material-ui/core';
import { BathtubRounded, FastfoodRounded, SearchRounded } from '@material-ui/icons';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { usePrepareLink } from '../../utils/routing';
import { categories } from '../../assets/categories';
import { matchSorter } from 'match-sorter';

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.black, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.black, 0.25)
		},
		backgroundBlendMode: 'darken',
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto'
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, // vertical padding + font size from searchIcon
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '15ch',
			'&:focus': {
				width: '20ch'
			}
		}
	},
	resultIcon: {
		color: theme.palette.text.secondary,
		marginRight: theme.spacing(2)
	}
}));

const popperStyle = { width: 350 };

export default function SearchBar() {
	const styles = useStyles();
	const history = useHistory();
	const [value, setValue] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const [open, setOpen] = useState(false);

	const searchLink = usePrepareLink({
		to: '/search/:term',
		isRelativePath: false
	});

	function handleOpen() {
		if (inputValue.length) setOpen(true);
	}

	function handleInputChange(event, newInputValue) {
		setInputValue(newInputValue);
		if (newInputValue.length) setOpen(true);
		else setOpen(false);
	}

	function handleChange(event, newValue) {
		if (typeof newValue === 'string') {
			const transformedQuery = newValue.trim().replace(/[ ]{1,}/g, '+');
			history.push(searchLink.pathname.replace(':term', transformedQuery));
		} else if (newValue && newValue.inputValue) {
			const transformedQuery = newValue.inputValue.trim().replace(/[ ]{1,}/g, '+');
			history.push(searchLink.pathname.replace(':term', transformedQuery));
		} else if (newValue) {
			setValue(null);
			event.target.blur();
			history.push(`/${newValue.prodType}/${newValue.url}`);
		}
	}

	function filterOptions(options, params) {
		const sorted = matchSorter(options, params.inputValue, { keys: ['name'] });

		if (params.inputValue !== '') {
			sorted.unshift({
				inputValue: params.inputValue,
				name: `Search "${params.inputValue}"`
			});
		}

		return sorted;
	}

	function getOptionLabel(option) {
		// e.g value selected with enter, right from the input
		if (typeof option === 'string') {
			return option;
		}
		if (option.inputValue) {
			return option.inputValue;
		}
		return option.name;
	}

	function renderOption(option, { inputValue }) {
		const matches = match(option.name, inputValue);
		const parts = parse(option.name, matches);

		return (
			<Grid container alignItems="center">
				<Grid item>
					{option.id ? (
						option.prodType === 'food-drink' ? (
							<FastfoodRounded className={styles.resultIcon} />
						) : (
							<BathtubRounded className={styles.resultIcon} />
						)
					) : (
						<SearchRounded className={styles.resultIcon} />
					)}
				</Grid>
				<Grid item xs>
					{parts.map((part, index) => (
						<span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
							{part.text}
						</span>
					))}
					{option.id ? (
						<Typography variant="body2" color="textSecondary">
							Browse category
						</Typography>
					) : (
						<Typography variant="body2" color="textSecondary">
							in all categories
						</Typography>
					)}
				</Grid>
			</Grid>
		);
	}

	function renderInput(params) {
		return (
			<Box ref={params.InputProps.ref}>
				<Box className={styles.searchIcon}>
					<SearchRounded />
				</Box>
				<InputBase
					{...params.inputProps}
					placeholder="Search…"
					classes={{
						root: styles.inputRoot,
						input: styles.inputInput
					}}
					inputProps={{
						'aria-label': 'search',
						autoCorrect: 'off',
						autoCapitalize: 'off',
						spellCheck: 'false'
					}}
				/>
			</Box>
		);
	}

	function CustomPopper(props) {
		return <Popper {...props} style={popperStyle} placement="bottom-start" />;
	}

	return (
		<Autocomplete
			className={styles.search}
			open={open}
			onOpen={handleOpen}
			onClose={() => setOpen(false)}
			inputValue={inputValue}
			onInputChange={handleInputChange}
			value={value}
			onChange={handleChange}
			filterOptions={filterOptions}
			options={categories}
			getOptionLabel={getOptionLabel}
			PopperComponent={CustomPopper}
			autoHighlight
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			renderOption={renderOption}
			freeSolo
			renderInput={renderInput}
		/>
	);
}

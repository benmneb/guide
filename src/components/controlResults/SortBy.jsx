import React from 'react';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import SortIcon from '@material-ui/icons/Sort';
import {
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	IconButton,
	Tooltip,
	Zoom,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Input,
	Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	}
}));

export default function SortBy(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [sortBy, setSortBy] = React.useState(1);
	const [sortOrder, setSortOrder] = React.useState(1);

	const handleSortByChange = (event) => {
		setSortBy(event.target.value);
	};

	const handleSortOrderChange = (event) => {
		setSortOrder(event.target.value);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box flex="1 0 0%" marginRight={2}>
			<Box
				display={{ xs: 'flex', md: 'none' }}
				justifyContent="flex-end"
				alignItems="center"
				name="sort-by"
			>
				<IconButton onClick={handleClickOpen}>
					<SortIcon />
				</IconButton>
				<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
					<DialogTitle>Sort results by...</DialogTitle>
					<DialogContent>
						<form className={classes.container}>
							<FormControl className={classes.formControl}>
								<InputLabel id="sort-by-label">Sort by</InputLabel>
								<Select
									labelId="sort-by-label"
									id="sort-by-select"
									value={sortBy}
									onChange={handleSortByChange}
									defaultValue={1}
									input={<Input />}
								>
									<MenuItem value={1}>Popularity</MenuItem>
									<MenuItem value={2}>Rating</MenuItem>
									<MenuItem value={3}>Alphabetical</MenuItem>
								</Select>
							</FormControl>
							<FormControl className={classes.formControl}>
								<InputLabel id="sort-order-label">Order by</InputLabel>
								<Select
									labelId="sort-order-label"
									id="sort-order-select"
									value={sortOrder}
									onChange={handleSortOrderChange}
									defaultValue={1}
									input={<Input />}
								>
									<MenuItem value={1}>Descending</MenuItem>
									<MenuItem value={2}>Ascending</MenuItem>
								</Select>
							</FormControl>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleClose}>Confirm</Button>
					</DialogActions>
				</Dialog>
			</Box>
			<Box
				display={{ xs: 'none', md: 'flex' }}
				justifyContent="flex-end"
				alignItems="center"
				name="sort-by"
			>
				<FormControl variant="outlined">
					<InputLabel id="sort-by-label">Sort by</InputLabel>
					<Select
						labelId="sort-by-label"
						id="sort-by-select"
						label="Sort by"
						autoWidth
						defaultValue={1}
						style={props.customStyle}
					>
						<MenuItem value={1}>Popularity</MenuItem>
						<MenuItem value={2}>Rating</MenuItem>
						<MenuItem value={3}>Alphabetical</MenuItem>
					</Select>
				</FormControl>
				<Tooltip title="Swap sort order" TransitionComponent={Zoom} arrow>
					<IconButton aria-label="Order by ascending or descending">
						<SwapVertIcon />
					</IconButton>
				</Tooltip>
			</Box>
		</Box>
	);
}

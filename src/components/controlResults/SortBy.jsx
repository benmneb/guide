import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import {
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	IconButton,
	Tooltip,
	Zoom
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingRight: 13
	},
	content: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center'
	}
}));

const SortBy = ({ customStyle }) => {
	const styles = useStyles();

	return (
		<div className={styles.container}>
			<div className={styles.content} name="sort-by">
				<FormControl variant="outlined">
					<InputLabel id="sort-by-label">Sort by</InputLabel>
					<Select
						labelId="sort-by-label"
						id="sort-by-select"
						label="Sort by"
						autoWidth
						defaultValue={1}
						style={customStyle}
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
			</div>
		</div>
	);
};

export default SortBy;

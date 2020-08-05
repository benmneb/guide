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
	Zoom,
	Box
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	container: {
		flex: '1 0 0%',
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
		<Box className={styles.container}>
			<Box className={styles.content} name="sort-by">
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
			</Box>
		</Box>
	);
};

export default SortBy;

import React from 'react';
import classes from './SortBy.module.css';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const SortBy = ({ customStyle }) => {
	return (
		<div className={classes.container}>
			<div className={classes.content} name="sort-by">
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
				<Tooltip title="Switch sort order" TransitionComponent={Zoom} arrow>
					<IconButton aria-label="Order by ascending or descending">
						<SwapVertIcon />
					</IconButton>
				</Tooltip>
			</div>
		</div>
		// <div id='sort-by' name='sort-by'>
		//   <label for='sort-by'>Sort by:</label>
		//   <select>
		//     <option value='popularity' selected>
		//       Popularity
		//     </option>
		//     <option value='rating'>
		//       Rating
		//     </option>
		//     <option value='alphabetical'>
		//       Alphabetical
		//     </option>
		//   </select>
		//   <div id='order-by'>
		//   <span className='helper'></span>
		//     <img src={downArrow} width='25px' alt='Sort results ascending/descending' />
		//   </div>
		// </div>}
	);
};

export default SortBy;

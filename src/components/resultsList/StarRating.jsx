import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const labels = {
	1: 'Bad',
	2: 'Okay',
	3: 'Good',
	4: 'Great',
	5: 'Epic!'
};

const StarRating = () => {
	const [value, setValue] = useState(4);
	const [hover, setHover] = useState(-1);

	return (
		<Box display="flex" alignItems="center" justifyContent="center" width="100%">
			<Rating
				name="hover-rating"
				value={value}
				precision={1}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				onChangeActive={(event, newHover) => {
					setHover(newHover);
				}}
			/>
			{value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
		</Box>
	);
};

export default StarRating;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const labels = {
	1: 'Bad',
	2: 'Okay',
	3: 'Good',
	4: 'Great',
	5: 'Excellent'
};

const useStyles = makeStyles({
	root: {
		width: '100%',
		display: 'flex',
		alignItems: 'center'
	}
});

const StarRating = () => {
	const [value, setValue] = React.useState(4);
	const [hover, setHover] = React.useState(-1);
	const classes = useStyles();

	return (
		<div className={classes.root}>
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
		</div>
	);
};

export default StarRating;

import React, { useState } from 'react';
import { Typography, Button, TextField, Grid, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const labels = {
	1: 'Bad',
	2: 'Okay',
	3: 'Good',
	4: 'Great',
	5: 'Excellent'
};

export default function ReviewsAdd() {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(-1);

	return (
		<Box marginTop={1}>
			<Grid container alignItems="center" justify="center">
				<Grid item container xs={12} justify="center" alignItems="center" spacing={1}>
					<Grid item xs={12} container justify="center">
						<Typography>
							Your rating:{' '}
							{rating !== null && (
								<Box component="span">{labels[hover !== -1 ? hover : rating]}</Box>
							)}
						</Typography>
					</Grid>
					<Grid item xs={12} container justify="center">
						<Rating
							name="other-product-rating"
							value={rating}
							precision={1}
							size="large"
							onChange={(event, newValue) => {
								setRating(newValue);
							}}
							onChangeActive={(event, newHover) => {
								setHover(newHover);
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={8} md={6} container justify="center">
						<TextField
							id="review-body"
							label="Your Review"
							multiline
							rows={4}
							fullWidth
							variant="outlined"
							size="small"
						/>
					</Grid>
					<Grid item container xs={12} justify="center">
						<Button size="large" variant="contained" color="primary">
							Submit
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import { usePrepareLink, getParams, getEnums } from '../../utils/routing';

export default function ResultsListEndMessage() {
	const addProductLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.addProducts
		}
	});

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			textAlign="center"
			minHeight={300}
		>
			<Box margin={2}>
				<Typography color="textSecondary">
					Anything missing from this category?
				</Typography>
			</Box>
			<Box margin={2}>
				<Button
					variant="contained"
					color="primary"
					startIcon={<AddCircleOutlineRounded />}
					component={Link}
					to={addProductLink}
				>
					Add Products
				</Button>
			</Box>
		</Box>
	);
}

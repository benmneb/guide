import React from 'react';
import classes from './BackToCategories.module.css';
import { Button } from '@material-ui/core';

const BackToCategories = ({ customStyle }) => {
	return (
		<div className={classes.container}>
			<Button
				variant="contained"
				color="primary"
				size="large"
				style={customStyle}
				disableElevation
			>
				Add Filters
			</Button>
		</div>
	);
};

export default BackToCategories;

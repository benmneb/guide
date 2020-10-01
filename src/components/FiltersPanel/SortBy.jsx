import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortResultsBy } from '../../store/actions';
import { Typography } from '@material-ui/core';
import { ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import TooltipToggleButton from './TooltipToggleButton';
import { sortBy as sortByOptions } from '../../assets/filters';

const useStyles = makeStyles((theme) => ({
	buttonGroup: {
		height: 37,
		margin: theme.spacing(0.5, 0)
	},
	label: {
		color: theme.palette.text.primary
	},
	toggleButtonRoot: {
		paddingTop: 0,
		paddingBottom: 0
	},
	body1: {
		fontSize: theme.typography.button.fontSize
	}
}));

export default function SortBy() {
	const styles = useStyles();
	const dispatch = useDispatch();
	const sortBy = useSelector((state) => state.results.sortResultsBy);

	const handleClick = (event, newSort) => {
		if (newSort !== null) {
			dispatch(sortResultsBy(newSort));
		}
	};

	return (
		<ToggleButtonGroup
			value={sortBy}
			exclusive
			onChange={handleClick}
			aria-label="sort results by"
			className={styles.buttonGroup}
		>
			{sortByOptions.map((option) => (
				<TooltipToggleButton
					key={option.value}
					title={option.tooltip}
					value={option.value}
					aria-label={option.value}
					disableRipple
					classes={{ label: styles.label, root: styles.toggleButtonRoot }}
				>
					<Typography variant="body1" component="span" classes={{ body1: styles.body1 }}>
						{option.name}
					</Typography>
				</TooltipToggleButton>
			))}
		</ToggleButtonGroup>
	);
}

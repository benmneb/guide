import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import TooltipToggleButton from './TooltipToggleButton';
import { orderBy as orderByOptions } from '../../assets/filters';

const useStyles = makeStyles((theme) => ({
	buttonGroup: {
		height: 37,
		margin: theme.spacing(0.5, 0)
	},
	label: {
		color: theme.palette.common.black
	},
	body1: {
		fontSize: theme.typography.button.fontSize
	}
}));

export default function OrderBy() {
	const styles = useStyles();
	const [orderBy, setOrderBy] = useState('Descending');

	const handleClick = (event, newOrder) => {
		if (newOrder !== null) {
			setOrderBy(newOrder);
		}
	};

	return (
		<ToggleButtonGroup
			size="large"
			value={orderBy}
			exclusive
			onChange={handleClick}
			aria-label="order results by"
			className={styles.buttonGroup}
		>
			{orderByOptions.map((option) => (
				<TooltipToggleButton
					key={option.value}
					title={option.tooltip}
					value={option.value}
					aria-label={option.value}
					disableRipple
					classes={{ label: styles.label }}
				>
					<Typography variant="body1" classes={{ body1: styles.body1 }}>
						{option.name}
					</Typography>
				</TooltipToggleButton>
			))}
		</ToggleButtonGroup>
	);
}

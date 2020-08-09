import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Tooltip, Zoom } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	filtersBtn: {
		width: '40%',
		margin: theme.spacing(0.5, 0),
		fontWeight: theme.typography.fontWeightRegular
	}
}));

export default function FilterButton(props) {
	const classes = useStyles();
	const [selected, setSelected] = useState(false);

	let variant = 'outlined';

	if (selected) {
		variant = 'contained';
	}

	return (
		<Tooltip title={props.tooltip} TransitionComponent={Zoom} arrow enterDelay={1000}>
			<Button
				className={classes.filtersBtn}
				variant={variant}
				color="default"
				onClick={() => setSelected(!selected)}
				disableElevation
				disableRipple
			>
				{props.name}
			</Button>
		</Tooltip>
	);
}

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Tooltip, Typography } from '@material-ui/core';
import { addFilter, removeFilter } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
	filtersBtn: {
		width: '47%',
		minWidth: 138,
		margin: theme.spacing(0.5, 0),
		fontWeight: theme.typography.fontWeightRegular,
		'& span': {
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			whiteSpace: 'nowrap'
		}
	}
}));

export default function FilterButton({ filter }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const appliedFilters = useSelector((state) => state.results.appliedFilters);
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		setSelected(appliedFilters.includes(filter));
	}, [appliedFilters, filter]);

	let variant = 'outlined';
	if (selected) variant = 'contained';

	function handleClick() {
		if (!selected) dispatch(addFilter(filter));
		else dispatch(removeFilter(filter));
	}

	return (
		<Tooltip title={filter.tooltip} arrow enterDelay={1000}>
			<Button
				className={classes.filtersBtn}
				variant={variant}
				color="default"
				onClick={handleClick}
				disableRipple
			>
				<Typography component="span" variant="inherit">
					{filter.name}
				</Typography>
			</Button>
		</Tooltip>
	);
}

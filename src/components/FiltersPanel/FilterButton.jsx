import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Tooltip, Typography } from '@material-ui/core';
import * as actionCreators from '../../store/actions';

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

function FilterButton({ setAddFilter, setRemoveFilter, appliedFilters, filter }) {
	const classes = useStyles();
	const [selected, setSelected] = useState(false);

	useEffect(() => {
		setSelected(appliedFilters.includes(filter));
	}, [appliedFilters, filter]);

	let variant = 'outlined';
	if (selected) variant = 'contained';

	function handleClick() {
		if (!selected) setAddFilter(filter);
		else setRemoveFilter(filter);
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

const mapStateToProps = (state) => {
	return {
		appliedFilters: state.appliedFilters
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setAddFilter: (filter) => dispatch(actionCreators.addFilter(filter)),
		setRemoveFilter: (filter) => dispatch(actionCreators.removeFilter(filter))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterButton);

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { hideFiltersPanel, showFiltersPanel } from '../../store/actions';

export default function BackToCategories() {
	const dispatch = useDispatch();
	const filtersPanelIsOpen = useSelector((state) => state.ui.showFiltersPanel);

	const handleClick = () => {
		if (filtersPanelIsOpen) {
			dispatch(hideFiltersPanel());
		} else {
			dispatch(showFiltersPanel());
		}
	};

	const buttonLabel = filtersPanelIsOpen ? 'Hide Filters' : 'Show Filters';

	return (
		<Button variant="contained" color="primary" size="large" onClick={handleClick}>
			{buttonLabel}
		</Button>
	);
}

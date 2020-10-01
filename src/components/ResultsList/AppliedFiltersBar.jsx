// made reduntant, keeping "just incase"

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toolbar, Box, Tooltip, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteRounded } from '@material-ui/icons';
import { removeFilter, removeAllFilters } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
	filtersToolbar: {
		display: 'flex',
		alignItems: 'baseline',
		marginLeft: theme.spacing(-0.5)
	},
	filtersChipBox: {
		display: 'flex',
		overflow: 'scroll',
		width: `calc(100% - ${theme.spacing(6)}px)`,
		position: 'absolute',
		msOverflowStyle: 'none',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			display: 'none'
		}
	},
	chip: {
		margin: theme.spacing(0, 0.5)
	}
}));

export default function AppliedFiltersBar() {
	const styles = useStyles();
	const dispatch = useDispatch();
	const appliedFilters = useSelector((state) => state.results.appliedFilters);
	const showFiltersPanel = useSelector((state) => state.ui.showFiltersPanel);

	if (appliedFilters.length <= 0 || showFiltersPanel) return null;

	if (appliedFilters.length > 0 && !showFiltersPanel)
		return (
			<Toolbar variant="dense" className={styles.filtersToolbar}>
				<Box className={styles.filtersChipBox}>
					{appliedFilters.map((filter) => (
						<Tooltip key={filter.value} title={filter.tooltip} placement="bottom" arrow>
							<Chip
								className={styles.chip}
								label={filter.value}
								onClick={() => dispatch(removeFilter(filter))}
								onDelete={() => dispatch(removeFilter(filter))}
							/>
						</Tooltip>
					))}
					<Box className={styles.chip}>
						<Chip
							label={'Remove All'}
							variant="outlined"
							deleteIcon={<DeleteRounded />}
							onClick={() => dispatch(removeAllFilters())}
							onDelete={() => dispatch(removeAllFilters())}
						/>
					</Box>
				</Box>
			</Toolbar>
		);
}

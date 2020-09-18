import React from 'react';
import { connect } from 'react-redux';
import {
	AppBar,
	Toolbar,
	Box,
	Typography,
	Breadcrumbs,
	Link,
	Tooltip,
	useScrollTrigger,
	Chip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavigateNextRounded, DeleteRounded } from '@material-ui/icons';
import ShowFiltersButton from './ShowFiltersButton';
import * as actionCreators from '../../store/actions';

const useStyles = makeStyles((theme) => ({
	zIndex: {
		zIndex: theme.zIndex.appBar - 1
	},
	breadcrumbs: {
		flexGrow: 1,
		overflow: 'scroll',
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
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

function ElevationScroll({ showFiltersPanel, children }) {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: showFiltersPanel ? -1 : 290
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0
	});
}

function FiltersBar({ appliedFilters, setRemoveFilter, setRemoveAllFilters, ...props }) {
	const styles = useStyles();

	function removeAllFilters() {
		setRemoveAllFilters();
	}

	return (
		<Box
			display={{ xs: 'none', sm: 'flex' }}
			flexGrow="1"
			top="0"
			position="sticky"
			className={styles.zIndex}
		>
			<ElevationScroll {...props}>
				<AppBar
					position="sticky"
					color="inherit"
					elevation={3}
					classes={{ root: styles.zIndex }}
				>
					<Toolbar>
						<Box className={styles.breadcrumbs}>
							<Breadcrumbs
								separator={<NavigateNextRounded fontSize="small" />}
								aria-label="breadcrumb"
								maxItems={6}
								itemsBeforeCollapse={0}
							>
								<Link color="inherit" href="#">
									Food & Drink
								</Link>
								<Link color="inherit" href="#">
									Pantry
								</Link>
								<Link color="inherit" href="#">
									Breakfasts & Spreads
								</Link>
								<Typography color="textPrimary">Nut Butters & Spreads</Typography>
							</Breadcrumbs>
						</Box>
						<Box display={{ xs: 'none', md: 'flex' }}>
							<ShowFiltersButton />
						</Box>
					</Toolbar>
					{appliedFilters.length > 0 && (
						<Toolbar variant="dense" className={styles.filtersToolbar}>
							<Box className={styles.filtersChipBox}>
								{appliedFilters.map((filter) => (
									<Tooltip
										key={filter.value}
										title={filter.tooltip}
										placement="bottom"
										arrow
									>
										<Chip
											className={styles.chip}
											label={filter.value}
											onClick={() => setRemoveFilter(filter)}
											onDelete={() => setRemoveFilter(filter)}
										/>
									</Tooltip>
								))}
								<Box className={styles.chip}>
									<Chip
										label={'Remove All'}
										variant="outlined"
										deleteIcon={<DeleteRounded />}
										onClick={removeAllFilters}
										onDelete={removeAllFilters}
									/>
								</Box>
							</Box>
						</Toolbar>
					)}
				</AppBar>
			</ElevationScroll>
		</Box>
	);
}

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel,
		appliedFilters: state.appliedFilters
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setRemoveFilter: (filter) => dispatch(actionCreators.removeFilter(filter)),
		setRemoveAllFilters: () => dispatch(actionCreators.removeAllFilters())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBar);

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	AppBar,
	Toolbar,
	Box,
	Breadcrumbs,
	useScrollTrigger,
	Tooltip,
	Chip
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteRounded } from '@material-ui/icons';
import { removeFilter, removeAllFilters } from '../../store/actions';
import ShowFiltersButton from './ShowFiltersButton';
import BreadcrumbTrail from './BreadcrumbTrail';

const useStyles = makeStyles((theme) => ({
	zIndex: {
		zIndex: theme.zIndex.appBar - 1
	},
	breadcrumbsBox: {
		overflow: 'scroll',
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	chipsBox: {
		display: 'none',
		msOverflowStyle: 'none',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			display: 'none'
		},
		[theme.breakpoints.up('sm')]: {
			margin: theme.spacing(0, 0, 0, 2),
			display: 'flex',
			flexDirection: 'row-reverse',
			flexShrink: 100000,
			overflow: 'scroll',
			whiteSpace: 'nowrap',
			maxWidth: 670,
			width: '100%'
		},
		[theme.breakpoints.up('md')]: {
			margin: theme.spacing(0, 2)
		}
	},
	removeAllChip: {
		margin: theme.spacing(0, 0.5)
	}
}));

function ElevationScroll({ children }) {
	const showFiltersPanel = useSelector((state) => state.ui.showFiltersPanel);

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: showFiltersPanel ? -1 : 290
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0
	});
}

export default function FiltersBar(props) {
	const styles = useStyles();
	const dispatch = useDispatch();
	const appliedFilters = useSelector((state) => state.results.appliedFilters);

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
					<Toolbar display="flex">
						<Box className={styles.breadcrumbsBox}>
							{props.loading ? (
								<Breadcrumbs>
									<Skeleton width={400} />
								</Breadcrumbs>
							) : (
								<BreadcrumbTrail breadcrumbs={props.breadcrumbs} />
							)}
						</Box>
						<Box flexGrow="1" justifyContent="flex-start"></Box>
						{appliedFilters.length > 0 && (
							<Box className={styles.chipsBox}>
								{appliedFilters.map((filter) => (
									<Tooltip
										key={filter.value}
										title={filter.tooltip}
										placement="bottom"
										arrow
									>
										<Chip
											className={styles.removeAllChip}
											label={filter.value}
											onClick={() => dispatch(removeFilter(filter))}
											onDelete={() => dispatch(removeFilter(filter))}
										/>
									</Tooltip>
								))}
								{appliedFilters.length > 4 && (
									<Box className={styles.chip}>
										<Chip
											label={'Remove All'}
											variant="outlined"
											deleteIcon={<DeleteRounded />}
											onClick={() => dispatch(removeAllFilters())}
											onDelete={() => dispatch(removeAllFilters())}
										/>
									</Box>
								)}
							</Box>
						)}
						<Box display={{ xs: 'none', md: 'flex' }}>
							<ShowFiltersButton />
						</Box>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
		</Box>
	);
}

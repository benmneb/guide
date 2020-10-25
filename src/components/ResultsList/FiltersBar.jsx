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
	toolbarRoot: {
		[theme.breakpoints.only('xs')]: {
			width: '100vw'
		}
	},
	breadcrumbsBox: {
		overflow: 'auto',
		display: 'block',
		msOverflowStyle: 'none',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			display: 'none'
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
			maxWidth: '75vw', // this amount seems to stop whole body horizonal scrolling
			width: '100%'
		},
		[theme.breakpoints.up('md')]: {
			margin: theme.spacing(0, 2),
			maxWidth: `calc(75vw - ${theme.mixins.sideMenu.width}px)`
		}
	},
	chip: {
		margin: theme.spacing(0, 0.5)
	}
}));

function ElevationScroll({ children }) {
	const showFiltersPanel = useSelector((state) => state.ui.showFiltersPanel);

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: showFiltersPanel ? -1 : 350
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
		<Box display="flex" flexGrow="1" top="0" position="sticky" className={styles.zIndex}>
			<ElevationScroll {...props}>
				<AppBar
					position="sticky"
					color="inherit"
					elevation={3}
					classes={{ root: styles.zIndex }}
				>
					<Toolbar display="flex" classes={{ root: styles.toolbarRoot }}>
						<Box className={styles.breadcrumbsBox}>
							{props.loading ? (
								<Breadcrumbs>
									<Skeleton width={400} />
								</Breadcrumbs>
							) : (
								<BreadcrumbTrail breadcrumbs={props.breadcrumbs} />
							)}
						</Box>
						<Box flexGrow="1" justifyContent="flex-start" />
						{appliedFilters.length > 0 && (
							<Box className={styles.chipsBox}>
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
								{appliedFilters.map((filter) => (
									<Tooltip
										key={filter.id}
										title={filter.tooltip}
										placement="bottom"
										arrow
									>
										<Chip
											className={styles.chip}
											label={filter.value}
											onClick={() => dispatch(removeFilter(filter))}
											onDelete={() => dispatch(removeFilter(filter))}
										/>
									</Tooltip>
								))}
							</Box>
						)}
						<Box display={{ xs: 'none', md: 'flex' }}>
							{props.showFilterButton && <ShowFiltersButton />}
						</Box>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
		</Box>
	);
}

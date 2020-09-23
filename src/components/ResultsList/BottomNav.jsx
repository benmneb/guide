import React, { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
	BottomNavigation,
	BottomNavigationAction,
	Badge,
	Hidden,
	Box
} from '@material-ui/core';
import { ArrowBackIosRounded, FilterListRounded, AppsRounded } from '@material-ui/icons';
import * as actionCreators from '../../store/actions';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		position: 'fixed',
		bottom: 0,
		boxShadow: theme.shadows[24],
		zIndex: theme.zIndex.appBar - 1
	},
	bottomNav: {
		...theme.mixins.toolbar
	},
	badge: {
		color: theme.palette.background.paper,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: theme.spacing(0, 0.5),
		top: 2
	}
}));

function BottomNav({
	showFiltersPanel,
	onShowFiltersPanel,
	onHideFiltersPanel,
	appliedFilters
}) {
	const styles = useStyles();
	const history = useHistory();
	const location = useLocation();
	const [value, setValue] = useState(1);

	const handleCategoriesClick = useCallback(() => {
		const releventPath = location.pathname.match(/^([^/]*\/){2}/)[0].slice(0, -1); // cuts off everything after the category
		history.push(releventPath);
	}, [history, location.pathname]);

	function handleResultsClick() {
		if (showFiltersPanel) {
			setValue(1);
			return onHideFiltersPanel();
		}
	}

	function handleFiltersClick() {
		if (showFiltersPanel) {
			setValue(1);
			return onHideFiltersPanel();
		}
		return onShowFiltersPanel();
	}

	return (
		<Box display={{ xs: 'block', md: 'none' }} className={styles.root}>
			<BottomNavigation
				component="nav"
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				showLabels
				className={styles.bottomNav}
			>
				<BottomNavigationAction
					label="Categories"
					icon={<ArrowBackIosRounded />}
					onClick={handleCategoriesClick}
				/>
				<BottomNavigationAction
					label="Results"
					icon={<AppsRounded />}
					onClick={handleResultsClick}
				/>
				<BottomNavigationAction
					label="Filters"
					icon={
						<>
							<Hidden smUp>
								<Badge
									color="primary"
									badgeContent={appliedFilters.length}
									classes={{ badge: styles.badge }}
								>
									<FilterListRounded />
								</Badge>
							</Hidden>
							<Hidden xsDown>
								<FilterListRounded />
							</Hidden>
						</>
					}
					onClick={handleFiltersClick}
				/>
			</BottomNavigation>
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
		onShowFiltersPanel: () => dispatch(actionCreators.showFiltersPanel()),
		onHideFiltersPanel: () => dispatch(actionCreators.hideFiltersPanel())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);

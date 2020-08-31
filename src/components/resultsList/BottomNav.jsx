import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import { ArrowBackIosRounded, FilterListRounded, AppsRounded } from '@material-ui/icons';
import * as actionCreators from '../../store/actions';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		position: 'fixed',
		bottom: 0,
		boxShadow: theme.shadows[24],
		zIndex: theme.zIndex.appBar - 1
	}
}));

function BottomNav({ showFiltersPanel, onShowFiltersPanel, onHideFiltersPanel }) {
	const classes = useStyles();
	const history = useHistory();
	const [value, setValue] = useState(1);

	function handleCategoriesClick() {
		history.goBack();
	}

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
		<Box display={{ xs: 'block', md: 'none' }} className={classes.root}>
			<BottomNavigation
				component="nav"
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				showLabels
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
					icon={<FilterListRounded />}
					onClick={handleFiltersClick}
				/>
			</BottomNavigation>
		</Box>
	);
}

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onShowFiltersPanel: () => dispatch(actionCreators.showFiltersPanel()),
		onHideFiltersPanel: () => dispatch(actionCreators.hideFiltersPanel())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);

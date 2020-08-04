import React from 'react';
import { connect } from 'react-redux';
import classes from './BackToCategories.module.css';
import { Button } from '@material-ui/core';
import * as actionCreators from '../../store/actions';

const BackToCategories = (props) => {
	const handleClick = () => {
		if (props.showFiltersPanel) {
			props.onHideFiltersPanel();
		} else {
			props.onShowFiltersPanel();
		}
	};

	const buttonLabel = props.showFiltersPanel ? 'Hide Filters' : 'Show Filters';

	return (
		<div className={classes.container}>
			<Button
				variant="contained"
				color="primary"
				size="large"
				style={props.customStyle}
				onClick={handleClick}
				disableElevation
			>
				{buttonLabel}
			</Button>
		</div>
	);
};

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

export default connect(mapStateToProps, mapDispatchToProps)(BackToCategories);

import React from 'react';
import { connect } from 'react-redux';
import { Button, Box } from '@material-ui/core';
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
		<Box flex="1 9999 0%" marginLeft="20px">
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
		</Box>
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

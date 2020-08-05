import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import * as actionCreators from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingLeft: 20
	}
}));

const BackToCategories = (props) => {
	const styles = useStyles();

	const handleClick = () => {
		if (props.showFiltersPanel) {
			props.onHideFiltersPanel();
		} else {
			props.onShowFiltersPanel();
		}
	};

	const buttonLabel = props.showFiltersPanel ? 'Hide Filters' : 'Show Filters';

	return (
		<div className={styles.container}>
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

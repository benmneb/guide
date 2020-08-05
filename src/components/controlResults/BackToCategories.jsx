import React from 'react';
import { connect } from 'react-redux';
import { Button, Box } from '@material-ui/core';
import * as actionCreators from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		flex: '1 9999 0%',
		marginLeft: 20
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
		<Box className={styles.container}>
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

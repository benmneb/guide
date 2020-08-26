import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import * as actionCreators from '../../store/actions';

function Snackbars({ snackData, showSnackbar, onHideSnackbar }) {
	const handleCloseSuccessSnack = (event, reason) => {
		if (reason !== 'clickaway') {
			onHideSnackbar();
		}
	};

	const snackColor = snackData.color ? snackData.color : snackData.type;
	const snackTitle = snackData.title ? <AlertTitle>{snackData.title}</AlertTitle> : null;
	const snackEmoji = snackData.emoji ? (
		<span role="img" aria-label="">
			{snackData.emoji}
		</span>
	) : null;
	const snackAction = snackData.action ? (
		<Button onClick={snackData.action.clicked} color="inherit" size="small">
			{snackData.action.text}
		</Button>
	) : null;

	return (
		<Snackbar
			open={showSnackbar}
			autoHideDuration={6000}
			onClose={handleCloseSuccessSnack}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert
				onClose={handleCloseSuccessSnack}
				severity={snackData.type}
				color={snackColor}
				variant="filled"
				elevation={6}
				action={snackAction}
			>
				{snackTitle}
				{snackData.message} {snackEmoji}
			</Alert>
		</Snackbar>
	);
}

Snackbars.propTypes = {
	snackData: PropTypes.exact({
		type: PropTypes.string,
		title: PropTypes.string,
		message: PropTypes.string,
		emoji: PropTypes.string,
		action: PropTypes.exact({
			text: PropTypes.string,
			clicked: PropTypes.func
		})
	}).isRequired,
	showSnackbar: PropTypes.bool.isRequired,
	onHideSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		showSnackbar: state.showSnackbar,
		snackData: state.snackData
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onHideSnackbar: () => dispatch(actionCreators.hideSnackbar())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Snackbars);

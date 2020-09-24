import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar, Button, IconButton } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseRoundedIcon from '@material-ui/icons/Close';
import * as actionCreators from '../../store/actions';

function Snackbars({ snackData, showSnackbar, onHideSnackbar }) {
	const handleCloseSnack = (event, reason) => {
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
		<>
			<Button onClick={snackData.action.clicked} color="inherit" size="small">
				{snackData.action.text}
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleCloseSnack}
			>
				<CloseRoundedIcon fontSize="small" />
			</IconButton>
		</>
	) : null;
	const duration = snackData.duration ? snackData.duration : 6000;

	return (
		<Snackbar
			open={showSnackbar}
			autoHideDuration={duration}
			onClose={handleCloseSnack}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert
				onClose={handleCloseSnack}
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
		type: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
		color: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
		title: PropTypes.string,
		message: PropTypes.string,
		emoji: PropTypes.string,
		duration: PropTypes.number,
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

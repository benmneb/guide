import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Button, IconButton } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseRoundedIcon from '@material-ui/icons/Close';
import { hideSnackbar } from '../store/actions';

export default function Snackbars() {
	const dispatch = useDispatch();
	const snackData = useSelector((state) => state.snackData);
	const showSnackbar = useSelector((state) => state.showSnackbar);

	const handleCloseSnack = (event, reason) => {
		if (reason !== 'clickaway') {
			dispatch(hideSnackbar());
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
	const duration = snackData.duration !== undefined ? snackData.duration : 6000;

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

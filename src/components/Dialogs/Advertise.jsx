import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import DialogTitle from '../../utils/DialogTitle';
import SendRoundedIcon from '@material-ui/icons/Send';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Button,
	TextField,
	Typography,
	useMediaQuery,
	Box
} from '@material-ui/core';
import { showSnackbar } from '../../store/actions';
import { useForm } from 'react-hook-form';
import { useConfirm } from 'material-ui-confirm';
import LoadingButton from '../../utils/LoadingButton';

export default function Advertise({ isOpened }) {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const confirm = useConfirm();
	const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
	const { register, handleSubmit, errors, getValues } = useForm();
	const [pending, setPending] = useState(false);

	const onSubmit = (data) => {
		setPending(true);
		axios
			.post('https://api.vomad.guide/email/advertise', {
				body: `<p><strong>New Advertising Request Received ${new Date()}</strong></p><p>${
					data.name
				}</p><p>${data.email}</p><p>${data.message && `${data.message}`}`
			})
			.then(() => {
				setPending(false);
				dispatch(
					showSnackbar({
						type: 'success',
						title: 'Message sent',
						message: "Thanks for your interest, we'll be in touch",
						emoji: '🤝'
					})
				);
				goBack();
			})
			.catch((err) => {
				setPending(false);
				dispatch(
					showSnackbar({
						type: 'error',
						title: 'Something went wrong',
						message: `${err.message}. Please try again soon.`
					})
				);
			});
	};

	const goBack = useCallback(() => {
		if (location.search.includes('&')) {
			history.push(location.pathname + location.search.split('&')[0]);
		} else history.push(location.pathname);
	}, [history, location.pathname, location.search]);

	const onClose = () => {
		if (getValues('name') || getValues('email') || getValues('message')) {
			confirm({
				description:
					'If you close before submitting you will lose everything you have entered in the advertising form.',
				confirmationText: 'Close'
			})
				.then(() => goBack())
				.catch(() => null);
		} else goBack();
	};

	return (
		<Dialog
			open={Boolean(isOpened)}
			onClose={onClose}
			aria-labelledby="advertise-form"
			fullScreen={fullScreen}
		>
			<DialogTitle id="advertise-form" onClose={onClose}>
				Advertise on The Guide
			</DialogTitle>
			<DialogContent>
				<DialogContentText component="hgroup">
					<Typography component="h2" variant="body1">
						<span role="img" aria-label="">
							👀
						</span>{' '}
						Put your brand in front of a very specific audience.
					</Typography>
					<Typography component="h2" variant="body1">
						<span role="img" aria-label="">
							🌱
						</span>{' '}
						Help people find vegan products easier.
					</Typography>
					<Typography component="h2" variant="body1">
						<span role="img" aria-label="">
							🚀
						</span>{' '}
						Support an independent vegan start-up.
					</Typography>
				</DialogContentText>
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						autoFocus
						margin="dense"
						name="name"
						label="Your Name"
						type="text"
						variant="outlined"
						inputRef={register({
							required: true,
							minLength: 2,
							maxLength: { value: 50, message: 'Maximum 50 characters' }
						})}
						error={Boolean(errors.name)}
						helperText={Boolean(errors.name) && errors.name.message}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="email"
						label="Business Email"
						type="email"
						variant="outlined"
						inputRef={register({
							required: true,
							pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email' }
						})}
						error={Boolean(errors.email)}
						helperText={Boolean(errors.email) && errors.email.message}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="message"
						label="Your Message (optional)"
						type="text"
						multiline
						rows={4}
						variant="outlined"
						inputRef={register({
							maxLength: { value: 750, message: 'Maximum 750 characters' }
						})}
						error={Boolean(errors.message)}
						helperText={Boolean(errors.message) && errors.message.message}
						fullWidth
					/>
					<DialogActions style={{ paddingRight: 0 }}>
						<Button onClick={onClose}>Cancel</Button>
						<LoadingButton
							type="submit"
							variant="contained"
							color="primary"
							pending={pending}
							endIcon={<SendRoundedIcon />}
						>
							Submit
						</LoadingButton>
					</DialogActions>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

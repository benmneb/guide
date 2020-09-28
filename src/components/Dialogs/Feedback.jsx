import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
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
import LoadingButton from '../../utils/LoadingButton';
import { useForm } from 'react-hook-form';
import { useConfirm } from 'material-ui-confirm';

export default function Feedback({ isOpened }) {
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
			.post('https://api.vomad.guide/email/feedback', {
				body: `<p><strong>New Feedback Received ${new Date()}</strong></p><p>${
					data.feedback
				}</p><p>${data.name && `- ${data.name}`}</p><p>${data.email && data.email}</p>`
			})
			.then(() => {
				setPending(false);
				dispatch(
					showSnackbar({
						snackData: {
							type: 'success',
							color: 'info',
							title: 'Feedback received',
							message: 'We appreciate and encourage all suggestions',
							emoji: '👌'
						}
					})
				);
				goBack();
			})
			.catch((err) => {
				setPending(false);
				dispatch(
					showSnackbar({
						snackData: {
							type: 'error',
							title: 'Could not send feedback',
							message: `${err.message}. Please try again soon.`
						}
					})
				);
			});
	};

	const goBack = useCallback(() => {
		history.push(location.pathname);
	}, [history, location.pathname]);

	const onClose = () => {
		if (getValues('feedback')) {
			confirm({
				description:
					'You have started entering feedback, if you close this modal you will lose what you have entered.',
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
			aria-labelledby="feedback-form"
			fullScreen={fullScreen}
		>
			<DialogTitle id="feedback-form" onClose={onClose}>
				Provide Feedback
			</DialogTitle>
			<DialogContent>
				<DialogContentText component="hgroup">
					<Typography component="h2">
						<span role="img" aria-label="">
							✏️
						</span>{' '}
						Please report bugs and request new features.
					</Typography>
					<Typography component="h2">
						<span role="img" aria-label="">
							👍
						</span>{' '}
						Help us make the Guide better for everyone.
					</Typography>
					<Typography component="h2">
						<span role="img" aria-label="">
							🌱
						</span>{' '}
						Thank you for helping people find vegan products easier.
					</Typography>
				</DialogContentText>
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						margin="dense"
						name="feedback"
						label="Your Feedback"
						type="text"
						variant="outlined"
						inputRef={register({
							required: true,
							minLength: { value: 20, message: 'Minimum 20 characters' },
							maxLength: { value: 750, message: 'Maximum 750 characters' }
						})}
						error={Boolean(errors.feedback)}
						helperText={Boolean(errors.feedback) && errors.feedback.message}
						multiline
						rows={4}
						fullWidth
						autoFocus
					/>
					<TextField
						margin="dense"
						name="name"
						label="Your Name (optional)"
						type="text"
						variant="outlined"
						inputRef={register({
							maxLength: { value: 50, message: 'Maximum 50 characters' }
						})}
						error={Boolean(errors.name)}
						helperText={Boolean(errors.name) && errors.name.message}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="email"
						label="Contact email (optional)"
						type="email"
						variant="outlined"
						inputRef={register({
							pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email' }
						})}
						error={Boolean(errors.email)}
						helperText={Boolean(errors.email) && errors.email.message}
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

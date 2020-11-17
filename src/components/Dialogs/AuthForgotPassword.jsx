import { useState, useEffect } from 'react';
import axios from 'axios';
import DialogTitle from '../../utils/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
	Dialog,
	Button,
	DialogContentText,
	DialogActions,
	TextField,
	Box
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../store/actions';
import LoadingButton from '../../utils/LoadingButton';

export default function AuthForgotPassword({ show, hide }) {
	const dispatch = useDispatch();
	const { register, handleSubmit, errors } = useForm();
	const [pending, setPending] = useState(false);

	function onSubmit(data) {
		setPending(true);
		axios
			.post('/auth/forgot-password', {
				email: data.email
			})
			.then((response) => {
				if (response.data === 'recovery email sent') {
					dispatch(
						showSnackbar({
							type: 'success',
							message: 'Email sent, please check your inbox.'
						})
					);
					setPending(false);
					hide();
				}
			})
			.catch((err) => {
				console.error(err);
				if (err.message === 'email not in db') {
					setPending(false);
					dispatch(
						showSnackbar({
							type: 'error',
							title: 'Email not found',
							message: 'The entered email is not in our database.',
							emoji: '🤔'
						})
					);
				} else {
					setPending(false);
					dispatch(
						showSnackbar({
							type: 'error',
							title: 'Could not process',
							message: `${err.message}. Please try again soon.`
						})
					);
				}
			});
	}

	useEffect(() => {
		return () => setPending(false);
	}, []);

	return (
		<Dialog onClose={hide} aria-labelledby="forgot-password-title" open={show}>
			<DialogTitle id="forgot-password-title" textAlign="left" onClose={hide}>
				Reset Lost Password
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Enter the email associated with your account and we will send you a link to
					reset your password.
				</DialogContentText>
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						autoFocus
						name="email"
						label="Email"
						type="text"
						inputRef={register({
							required: 'Email required',
							pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email' }
						})}
						error={Boolean(errors.email)}
						helperText={Boolean(errors.email) ? errors.email.message : ' '}
						fullWidth
					/>
					<DialogActions>
						<Button onClick={hide}>Cancel</Button>
						<LoadingButton
							type="submit"
							variant="contained"
							color="primary"
							pending={pending}
						>
							Send Link
						</LoadingButton>
					</DialogActions>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

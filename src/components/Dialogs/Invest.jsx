import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	TextField,
	Typography,
	useMediaQuery
} from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/Send';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { showSnackbar } from '../../store/actions';
import DialogTitle from '../../utils/DialogTitle';
import LoadingButton from '../../utils/LoadingButton';

const actionsStyle = { paddingRight: 0 };

export default function Invest({ isOpened }) {
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
			.post('/email/feedback', {
				body: `<p><strong>New Investing Opportunity ${new Date()}</strong></p><p>${
					data.feedback
				}</p><p>${data.name && `- ${data.name}`}</p><p>${data.email && data.email}</p>`
			})
			.then(() => {
				setPending(false);
				dispatch(
					showSnackbar({
						type: 'success',
						color: 'info',
						title: 'Email received',
						message: "Thanks, we'll be in touch",
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
						title: 'Could not send email',
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
		if (isOpened) {
			if (getValues('email') || getValues('name') || getValues('message')) {
				confirm({
					description:
						'If you close before submitting you will lose everything you have entered in the form.',
					confirmationText: 'Close'
				})
					.then(() => goBack())
					.catch(() => null);
			} else goBack();
		}
	};

	return (
		<Dialog
			open={Boolean(isOpened)}
			onClose={onClose}
			aria-labelledby="investors-form"
			fullScreen={fullScreen}
		>
			<DialogTitle id="investors-form" onClose={onClose}>
				Invest in The Guide
			</DialogTitle>
			<DialogContent>
				<DialogContentText component="hgroup">
					<Typography component="h2">
						<span role="img" aria-label="">
							📈
						</span>{' '}
						Grow with us.
					</Typography>
					<Typography component="h2">
						<span role="img" aria-label="">
							👍
						</span>{' '}
						Be at the forefront of a growing new industry.
					</Typography>
					<Typography component="h2">
						<span role="img" aria-label="">
							🌱
						</span>{' '}
						Help people find vegan products easier.
					</Typography>
				</DialogContentText>
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						margin="dense"
						name="name"
						label="Your Name"
						type="text"
						variant="outlined"
						inputRef={register({
							required: true,
							maxLength: { value: 50, message: 'Maximum 50 characters' }
						})}
						error={Boolean(errors.name)}
						helperText={Boolean(errors.name) && errors.name.message}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="email"
						label="Contact email"
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
						variant="outlined"
						inputRef={register({
							maxLength: { value: 750, message: 'Maximum 750 characters' }
						})}
						error={Boolean(errors.feedback)}
						helperText={Boolean(errors.feedback) && errors.feedback.message}
						multiline
						rows={4}
						fullWidth
					/>
					<DialogActions style={actionsStyle}>
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

import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	MailOutlineRounded,
	VisibilityOffRounded,
	VisibilityRounded
} from '@material-ui/icons';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
	setCurrentUserData,
	setIsUsingEmailAuth,
	showSnackbar
} from '../../store/actions';
import LoadingButton from '../../utils/LoadingButton';
import { getEnums, getParams, usePrepareLink } from '../../utils/routing';
import AuthForgotPassword from './AuthForgotPassword';

const useStyles = makeStyles((theme) => ({
	buttonLabel: {
		justifyContent: 'center'
	},
	email: {
		margin: theme.spacing(1, 0)
	}
}));

export default function AuthEmailLogin() {
	const styles = useStyles();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const { register, handleSubmit, errors } = useForm();
	const [showPassword, setShowPassword] = useState(false);
	const [pending, setPending] = useState(false);
	const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

	const goBack = useCallback(() => {
		history.push(location.pathname);
	}, [history, location.pathname]);

	const feedbackLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.feedback
		}
	});

	const onSubmit = (data) => {
		setPending(true);
		axios
			.post(
				'/auth/signin',
				{
					email: data.email,
					password: data.password
				},
				{
					withCredentials: true,
					crossorigin: true
				}
			)
			.then((auth) => {
				if (auth.data) {
					return axios.get('/auth/login/success', {
						withCredentials: true,
						crossorigin: true
					});
				}
			})
			.then((response) => {
				if (response.status === 200) return response.data.user;
				else throw new Error('failed to authenticate user');
			})
			.then((user) => {
				dispatch(
					setCurrentUserData(
						{ id: user.user_id, username: user.user_name, avatar: user.avatar },
						true
					)
				);
				setPending(false);
			})
			.then(() => {
				goBack();
			})
			.catch((error) => {
				dispatch(setCurrentUserData(null, false));
				setPending(false);
				if (
					error?.response?.data === 'no user found' ||
					error?.response?.data === 'incorrect password'
				) {
					dispatch(
						showSnackbar({
							type: 'error',
							title: 'Email or password incorrect',
							message: 'Please try again or use the sign up form to create an account.'
						})
					);
					// Dont use this, for security
					// } else if (error?.response?.data === 'incorrect password') {
					// 	dispatch(
					// 		showSnackbar({
					// 			type: 'error',
					// 			title: 'Incorrect password',
					// 			message: 'Please check spelling and try again.'
					// 		})
					// 	);
				} else if (error?.response?.data === 'Login with social media account') {
					dispatch(
						showSnackbar({
							type: 'error',
							title: "Couldn't login",
							message:
								'Please login with the social account connected to this email, then you may add a password if you wish.',
							duration: 12000,
							action: {
								text: 'Login with social',
								clicked: () => dispatch(setIsUsingEmailAuth(false))
							}
						})
					);
				} else {
					setPending(false);
					dispatch(
						showSnackbar({
							type: 'error',
							title: "Couldn't login",
							message: 'Please try again soon',
							duration: 12000,
							action: {
								text: 'Contact us',
								clicked: () => history.push(feedbackLink)
							}
						})
					);
					return console.error(error);
				}
			});
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const toggleForgotPasswordModal = () => {
		setForgotPasswordModal(!forgotPasswordModal);
	};

	// const handleBackToSocial = () => {
	// 	dispatch(setIsUsingEmailAuth(false));
	// };

	return (
		<>
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				display="flex"
				flexDirection="column"
				justifyContent="center"
			>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Box display="flex" flexDirection="column" justifyContent="center">
						<TextField
							margin="dense"
							id="email"
							name="email"
							label="Email"
							type="email"
							variant="outlined"
							inputRef={register({
								required: 'Email required',
								pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email' }
							})}
							error={Boolean(errors.email)}
							helperText={Boolean(errors.email) && errors.email.message}
							fullWidth
						/>
						<FormControl variant="outlined" margin="dense">
							<InputLabel htmlFor="password" variant="outlined" margin="dense">
								Password
							</InputLabel>
							<OutlinedInput
								margin="dense"
								id="password"
								name="password"
								label="Password"
								type={showPassword ? 'text' : 'password'}
								inputRef={register({
									required: 'Password required',
									minLength: { value: 6, message: 'Minimum 6 characters' },
									maxLength: { value: 20, message: 'Maximum 20 characters' }
								})}
								error={Boolean(errors.password)}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											size="small"
										>
											{showPassword ? (
												<Tooltip title="Hide password">
													<VisibilityRounded />
												</Tooltip>
											) : (
												<Tooltip title="Show password">
													<VisibilityOffRounded />
												</Tooltip>
											)}
										</IconButton>
									</InputAdornment>
								}
								fullWidth
							/>
							{errors.password && (
								<FormHelperText error>{errors.password.message}</FormHelperText>
							)}
						</FormControl>
						<LoadingButton
							type="submit"
							size="large"
							variant="contained"
							color="primary"
							pending={pending}
							pendingText="Logging in..."
							startIcon={<MailOutlineRounded />}
							className={styles.email}
							classes={{ label: styles.buttonLabel }}
						>
							Login
						</LoadingButton>
					</Box>
				</Box>
				<Button onClick={toggleForgotPasswordModal}>Reset lost password</Button>
				{/* <Button onClick={handleBackToSocial}>Use social account instead</Button> */}
			</Box>
			<AuthForgotPassword show={forgotPasswordModal} hide={toggleForgotPasswordModal} />
		</>
	);
}

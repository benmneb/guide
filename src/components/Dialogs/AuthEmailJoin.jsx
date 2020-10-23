import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setIsUsingEmailAuth,
	setCurrentUserData,
	showSnackbar
} from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import {
	Button,
	InputAdornment,
	FormControl,
	FormHelperText,
	IconButton,
	InputLabel,
	OutlinedInput,
	TextField,
	Tooltip,
	Box
} from '@material-ui/core';
import {
	MailOutlineRounded,
	VisibilityRounded,
	VisibilityOffRounded
} from '@material-ui/icons';
import LoadingButton from '../../utils/LoadingButton';

const useStyles = makeStyles((theme) => ({
	buttonLabel: {
		justifyContent: 'center'
	},
	email: {
		margin: theme.spacing(1, 0)
	}
}));

export default function AuthEmailJoin() {
	const styles = useStyles();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const { register, handleSubmit, errors, watch } = useForm();
	const [showPassword, setShowPassword] = useState(false);
	const [pending, setPending] = useState(false);

	const goBack = useCallback(() => {
		history.push(location.pathname);
	}, [history, location.pathname]);

	const onSubmit = (data) => {
		setPending(true);
		axios
			.post(
				'https://api.vomad.guide/auth/register',
				{
					user_name: data.name,
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
					return axios.get('https://api.vomad.guide/auth/login/success', {
						withCredentials: true,
						crossorigin: true
					});
				}
			})
			.then((response) => {
				if (response.status === 200) return response.data;
				else throw new Error('failed to authenticate user');
			})
			.then((data) => {
				dispatch(
					setCurrentUserData(
						{
							id: data.user.user_id,
							username: data.user.user_name,
							authState: data.authState
						},
						true
					)
				);
				setPending(false);
			})
			.then(() => {
				goBack();
			})
			.catch((error) => {
				console.error(error);
				setPending(false);
				dispatch(setCurrentUserData(null, false));
				if (error.response.data === 'email already taken') {
					dispatch(
						showSnackbar({
							type: 'error',
							title: 'Email already exists',
							message: 'Please login instead, or reset your password if you forgot it.'
						})
					);
				} else {
					dispatch(
						showSnackbar({
							type: 'error',
							title: 'Could not sign up',
							message: `${error.message}. Please try again.`
						})
					);
				}
			});
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleBackToSocial = () => {
		dispatch(setIsUsingEmailAuth(false));
	};

	return (
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
						name="name"
						label="Name or username"
						type="text"
						variant="outlined"
						inputRef={register({
							required: 'Name or username required',
							minLength: {
								value: 5,
								message: 'Minimum 5 characters'
							},
							maxLength: {
								value: 25,
								message: 'Maximum 25 characters'
							}
						})}
						error={Boolean(errors.name)}
						helperText={Boolean(errors.name) && errors.name.message}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="email"
						label="Email"
						type="email"
						variant="outlined"
						inputRef={register({
							required: 'Email required',
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: 'Please enter a valid email'
							}
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
							name="password"
							label="Password"
							type={showPassword ? 'text' : 'password'}
							inputRef={register({
								required: 'Password required',
								minLength: {
									value: 6,
									message: 'Minimum 6 characters'
								},
								maxLength: {
									value: 20,
									message: 'Maximum 20 characters'
								}
							})}
							error={Boolean(errors.password)}
							fullWidth
						/>
						{errors.password && (
							<FormHelperText error>{errors.password.message}</FormHelperText>
						)}
					</FormControl>
					<FormControl variant="outlined" margin="dense">
						<InputLabel htmlFor="confirmpassword" variant="outlined" margin="dense">
							Confirm Password
						</InputLabel>
						<OutlinedInput
							margin="dense"
							name="confirmpassword"
							label="Confirm Password"
							type={showPassword ? 'text' : 'password'}
							inputRef={register({
								required: 'Please confirm password',
								minLength: {
									value: 6,
									message: 'Minimum 6 characters'
								},
								maxLength: {
									value: 20,
									message: 'Maximum 20 characters'
								},
								validate: (value) => value === watch('password') || 'Passwords must match'
							})}
							error={Boolean(errors.confirmpassword)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										size="small"
									>
										{showPassword ? (
											<Tooltip title="Hide passwords">
												<VisibilityRounded />
											</Tooltip>
										) : (
											<Tooltip title="Show passwords">
												<VisibilityOffRounded />
											</Tooltip>
										)}
									</IconButton>
								</InputAdornment>
							}
							fullWidth
						/>
						{errors.confirmpassword && (
							<FormHelperText error>{errors.confirmpassword.message}</FormHelperText>
						)}
					</FormControl>
					<LoadingButton
						type="submit"
						size="large"
						variant="contained"
						color="primary"
						pending={pending}
						pendingText="Signing up..."
						startIcon={<MailOutlineRounded />}
						className={styles.email}
						classes={{ label: styles.buttonLabel }}
					>
						Sign up with Email
					</LoadingButton>
				</Box>
			</Box>
			<Button onClick={handleBackToSocial}>Use social account instead</Button>
		</Box>
	);
}

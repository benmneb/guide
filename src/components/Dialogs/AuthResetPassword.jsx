import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../store/actions';
import { useHistory, useLocation } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import DialogTitle from '../../utils/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
	Dialog,
	Button,
	DialogContentText,
	DialogActions,
	FormControl,
	FormHelperText,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	Tooltip,
	Box
} from '@material-ui/core';
import { VisibilityOffRounded, VisibilityRounded } from '@material-ui/icons';
import LoadingButton from '../../utils/LoadingButton';
import { usePrepareLink, getParams, getEnums } from '../../utils/routing';

export default function AuthResetPassword({ isOpened }) {
	const history = useHistory();
	const location = useLocation();
	const confirm = useConfirm();
	const dispatch = useDispatch();
	const token = location.search.split('token=')[1];
	const { register, handleSubmit, errors, watch } = useForm();
	const [pending, setPending] = useState(false);
	const [showPasswords, setShowPasswords] = useState(false);

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		}
	});

	const goBack = useCallback(() => {
		history.push(location.pathname);
	}, [history, location.pathname]);

	const handleClickShowPassword = () => {
		setShowPasswords(!showPasswords);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	function goToLoginModal() {
		history.push(authLink);
	}

	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (!token) {
			return goBack();
		}

		if (mounted) {
			axios
				.get(
					'https://api.vomad.guide/auth/reset-password',
					{
						params: {
							reset_token: token
						}
					},
					{
						cancelToken: source.token
					}
				)
				.then((response) => {
					if (response.data.message === 'password reset link a-ok') {
					}
				})
				.catch((error) => {
					if (mounted) {
						if (
							error.response &&
							error.response.data === 'password reset link is invalid or has expired'
						) {
							dispatch(
								showSnackbar({
									snackData: {
										type: 'error',
										message:
											'The password reset link you used is invalid or has expired. Please check the link or request a new one.',
										duration: 12000
									}
								})
							);
							goBack();
						} else {
							dispatch(
								showSnackbar({
									snackData: {
										type: 'error',
										title: 'Could not load password reset form',
										message: error.message
									}
								})
							);
							goBack();
						}
					}
				});
		}

		return () => {
			mounted = false;
			setPending(false);
			source.cancel('Auth reset cancelled during clean-up');
		};
	}, [dispatch, goBack, location.search, token]);

	function onSubmit(data) {
		setPending(true);

		axios
			.put('https://api.vomad.guide/auth/update-reset-password', {
				password: data.password,
				reset_token: token
			})
			.then(() => {
				dispatch(
					showSnackbar({
						snackData: {
							type: 'success',
							title: 'Password succesfully updated',
							message: 'Please login to your account to begin.'
						}
					})
				);
				setPending(false);
				goToLoginModal();
			})
			.catch((err) => {
				console.error(err);
				setPending(false);
				dispatch(
					showSnackbar({
						snackData: {
							type: 'error',
							title: 'Something went wrong',
							message: `${err.message}. Please try again soon.`
						}
					})
				);
			});
	}

	function onClose() {
		confirm({
			description:
				'Do you really want to close this modal before setting a new password?',
			confirmationText: 'Close'
		})
			.then(() => goBack())
			.catch(() => null);
	}

	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="forgot-password-title"
			open={Boolean(isOpened)}
		>
			<DialogTitle id="forgot-password-title" textAlign="left" onClose={onClose}>
				Create New Password
			</DialogTitle>
			<DialogContent>
				<DialogContentText>Please enter a secure and unique password.</DialogContentText>
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<Box display="flex" flexDirection="column">
						<FormControl margin="dense">
							<InputLabel htmlFor="password" margin="dense">
								Password
							</InputLabel>
							<Input
								autoFocus
								margin="dense"
								name="password"
								label="Password"
								type={showPasswords ? 'text' : 'password'}
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
							<FormHelperText error>
								{errors.password ? errors.password.message : ' '}
							</FormHelperText>
						</FormControl>
						<FormControl margin="dense">
							<InputLabel htmlFor="confirmpassword" margin="dense">
								Confirm Password
							</InputLabel>
							<Input
								margin="dense"
								name="confirmpassword"
								label="Confirm Password"
								type={showPasswords ? 'text' : 'password'}
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
									validate: (value) =>
										value === watch('password') || 'Passwords must match'
								})}
								error={Boolean(errors.confirmpassword)}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{showPasswords ? (
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
							<FormHelperText error>
								{errors.confirmpassword ? errors.confirmpassword.message : ' '}
							</FormHelperText>
						</FormControl>
					</Box>
					<DialogActions>
						<Button onClick={onClose}>Cancel</Button>
						<LoadingButton
							type="submit"
							variant="contained"
							color="primary"
							pending={pending}
						>
							Submit
						</LoadingButton>
					</DialogActions>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

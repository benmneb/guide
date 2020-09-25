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

export default function AuthResetPassword({ isOpened }) {
	const history = useHistory();
	const location = useLocation();
	const confirm = useConfirm();
	const dispatch = useDispatch();
	const { register, handleSubmit, errors, watch } = useForm();
	const [pending, setPending] = useState(false);
	const [showPasswords, setShowPasswords] = useState(false);

	function onSubmit(data) {
		console.log(data);
		setPending(true);

		axios
			.post('https://api.vomad.guide/reset-password', {
				password: data.password
			})
			.then(() => {
				dispatch(
					showSnackbar({
						snackData: {
							type: 'success',
							message: 'Password succesfully updated.'
						}
					})
				);
				setPending(false);
				onClose();
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

	useEffect(() => {
		return () => setPending(false);
	}, []);

	const goBack = useCallback(() => {
		history.push(location.pathname);
	}, [history, location.pathname]);

	function onClose() {
		confirm({
			description:
				'Do you really want to close this modal before setting a new password?',
			confirmationText: 'Close',
			confirmationButtonProps: { variant: 'contained', color: 'primary' },
			cancellationButtonProps: { autoFocus: true }
		})
			.then(() => goBack())
			.catch(() => null);
	}

	const handleClickShowPassword = () => {
		setShowPasswords(!showPasswords);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

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
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											size="small"
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
											size="small"
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
							Reset
						</LoadingButton>
					</DialogActions>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

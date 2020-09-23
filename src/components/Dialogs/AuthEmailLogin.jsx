import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import {
	Button,
	IconButton,
	InputAdornment,
	FormControl,
	FormHelperText,
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

const useStyles = makeStyles((theme) => ({
	buttonLabel: {
		justifyContent: 'center'
	},
	email: {
		margin: theme.spacing(1, 0)
	}
}));

function AuthEmailLogin({ setCurrentUserData, setShowSnackbar, ...props }) {
	const styles = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const { register, handleSubmit, errors } = useForm();
	const history = useHistory();
	const location = useLocation();

	const goBack = useCallback(() => {
		history.push(location.pathname);
	}, [history, location.pathname]);

	const onSubmit = (data) => {
		axios
			.post(
				'https://api.vomad.guide/auth/signin',
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
					return axios.get('https://api.vomad.guide/auth/login/success', {
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
				setCurrentUserData({ id: user.user_id, username: user.user_name }, true);
			})
			.then(() => {
				goBack();
			})
			.catch((error) => {
				setCurrentUserData(null, false);
				if (error.response.data === 'no user found') {
					setShowSnackbar({
						snackData: {
							type: 'error',
							title: "couldn't login",
							message: 'no user matching this email found'
						}
					});
				} else if (error.response.data === 'incorrect password') {
					setShowSnackbar({
						snackData: {
							type: 'error',
							title: "couldn't login",
							message: 'incorrect password'
						}
					});
				} else if (error.response.data === 'Login with social media account') {
					setShowSnackbar({
						snackData: {
							type: 'error',
							title: "couldn't login",
							message:
								'You have previously signed in with this email using a social media account, try to log in again using the correct account'
						}
					});
				} else {
					return error;
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
		props.backToSocial();
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
					<Button
						type="submit"
						size="large"
						variant="contained"
						color="primary"
						startIcon={<MailOutlineRounded />}
						className={styles.email}
						classes={{ label: styles.buttonLabel }}
					>
						Login with Email
					</Button>
				</Box>
			</Box>
			<Button>Reset password</Button>
			<Button onClick={handleBackToSocial}>Login with social account instead</Button>
		</Box>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUserData: state.currentUserData
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentUserData: (user, isAuth) =>
			dispatch(actionCreators.setCurrentUserData(user, isAuth)),
		setShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData }))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthEmailLogin);

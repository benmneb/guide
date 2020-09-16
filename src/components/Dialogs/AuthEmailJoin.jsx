import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
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

const useStyles = makeStyles((theme) => ({
	buttonLabel: {
		justifyContent: 'center'
	},
	email: {
		margin: theme.spacing(1, 0)
	}
}));

export default function AuthEmailJoin(props) {
	const styles = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const { register, handleSubmit, errors, watch } = useForm();

	const onSubmit = (data) => {
		console.log('join', data);
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
			.then((res) => console.info('register success', res))
			.catch((err) => console.error('register error', err));
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
						id="name"
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
						id="email"
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
							id="password"
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
							id="confirm-password"
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
					<Button
						type="submit"
						size="large"
						variant="contained"
						color="primary"
						startIcon={<MailOutlineRounded />}
						className={styles.email}
						classes={{ label: styles.buttonLabel }}
					>
						Sign up with Email
					</Button>
				</Box>
			</Box>

			<Button onClick={handleBackToSocial}>Sign up with social account instead</Button>
		</Box>
	);
}

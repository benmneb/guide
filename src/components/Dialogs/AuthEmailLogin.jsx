import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
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

export default function AuthEmailLogin(props) {
	const styles = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		console.log('login', data);
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
			.then((res) => console.info('login success', res))
			.catch((err) => console.error('login error', err));
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

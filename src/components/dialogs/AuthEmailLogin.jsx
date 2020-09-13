import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import {
	Button,
	IconButton,
	InputAdornment,
	FormControl,
	InputLabel,
	OutlinedInput,
	TextField,
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
	const [showPassword, setShowPassword] = useState();
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		console.log('login', data);
		axios.post('https://api.vomad.guide/auth/signin', {
			email: data.email,
			password: data.password
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
				<Box maxWidth="75%" display="flex" flexDirection="column" justifyContent="center">
					<TextField
						margin="dense"
						id="email"
						name="email"
						label="Email"
						type="email"
						variant="outlined"
						inputRef={register({ required: true, pattern: /^\S+@\S+$/i })}
						error={Boolean(errors.email)}
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
							inputRef={register({ required: true, minLength: 6, maxLength: 20 })}
							error={Boolean(errors.password)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										size="small"
									>
										{showPassword ? <VisibilityRounded /> : <VisibilityOffRounded />}
									</IconButton>
								</InputAdornment>
							}
							fullWidth
						/>
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

import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import {
	Button,
	InputAdornment,
	FormControl,
	IconButton,
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

export default function AuthEmailJoin(props) {
	const styles = useStyles();
	const [showPassword, setShowPassword] = useState();
	const { register, handleSubmit, errors, watch } = useForm();

	const onSubmit = (data) => {
		console.log('join', data);
		axios.post('https://api.vomad.guide/auth/register', {
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
						id="name"
						name="name"
						label="Name"
						type="text"
						variant="outlined"
						inputRef={register({ required: true, minLength: 2, maxLength: 20 })}
						error={Boolean(errors.name)}
						fullWidth
					/>
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
								required: true,
								minLength: 6,
								maxLength: 20,
								validate: (value) =>
									value === watch('password') || 'The passwords do not match!'
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
						Join with Email
					</Button>
				</Box>
			</Box>

			<Button onClick={handleBackToSocial}>Join with social account instead</Button>
		</Box>
	);
}

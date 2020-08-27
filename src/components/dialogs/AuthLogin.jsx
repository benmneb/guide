import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import {
	Button,
	IconButton,
	InputAdornment,
	FormControl,
	InputLabel,
	OutlinedInput,
	Link,
	Typography,
	TextField,
	Box
} from '@material-ui/core';
import {
	EmailRounded,
	VisibilityRounded,
	VisibilityOffRounded
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	buttonLabel: {
		justifyContent: 'center'
	},
	email: {
		marginBottom: theme.spacing()
	}
}));

export default function LoginLogin(props) {
	const styles = useStyles();
	const [showPassword, setShowPassword] = useState();
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		console.log('login', data);
		props.showSnack({
			snackData: {
				type: 'success',
				title: 'Welcome back!',
				message: `Succesfully logged in`,
				emoji: '👌'
			}
		});
		props.closeModal();
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
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
				</Box>
			</Box>
			<Button
				type="submit"
				size="large"
				variant="text"
				color="primary"
				startIcon={<EmailRounded />}
				className={styles.email}
				classes={{ label: styles.buttonLabel }}
			>
				Login with Email
			</Button>
			<Typography align="center" variant="body2" gutterBottom>
				Forgot password?{' '}
				<Link href="/#" color="textPrimary" underline="always">
					Reset it
				</Link>
			</Typography>
			<Typography align="center" variant="body2">
				Not a user yet?{' '}
				<Link href="#" onClick={props.join} color="textPrimary" underline="always">
					Join now
				</Link>
			</Typography>
		</Box>
	);
}

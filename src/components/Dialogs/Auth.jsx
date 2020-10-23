import React, { useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsUsingEmailAuth } from '../../store/actions';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '../../utils/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Dialog, Button, Box } from '@material-ui/core';
import { Facebook, Twitter, MailOutlineRounded } from '@material-ui/icons';
import { indigo, red, blue, grey } from '@material-ui/core/colors';
import AuthEmail from './AuthEmail';
import GoogleIcon from '../../utils/GoogleIcon';

const useStyles = makeStyles((theme) => ({
	dialogPaperWidth: {
		minWidth: 291,
		maxWidth: 300
	},
	buttonLabel: {
		justifyContent: 'flex-start'
	},
	buttonMargin: {
		margin: theme.spacing(0.5)
	},
	facebook: {
		color: theme.palette.getContrastText(indigo[500]),
		backgroundColor: indigo[500],
		'&:hover': {
			backgroundColor: indigo[700]
		}
	},
	google: {
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
		'&:hover': {
			backgroundColor: red[700]
		}
	},
	twitter: {
		color: theme.palette.getContrastText(blue[500]),
		backgroundColor: blue[500],
		'&:hover': {
			backgroundColor: blue[700]
		}
	},
	email: {
		color: theme.palette.getContrastText(grey[700]),
		backgroundColor: grey[700],
		'&:hover': {
			backgroundColor: grey[800]
		}
	},
	dialogContentRoot: {
		padding: theme.spacing(0, 2, 2, 2),
		[theme.breakpoints.up('md')]: {
			marginBottom: 0
		}
	}
}));

export default function Auth({ isOpened }) {
	const styles = useStyles();
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isUsingEmailAuth = useSelector((state) => state.auth.isUsingEmailAuth);

	function handleContinueWithEmail() {
		dispatch(setIsUsingEmailAuth(true));
	}

	const goBack = useCallback(() => {
		if (location.search.includes('&')) {
			history.push(location.pathname + location.search.split('&')[0]);
		} else history.push(location.pathname);
	}, [history, location.pathname, location.search]);

	function onClose() {
		goBack();
	}

	useEffect(() => {
		if (isAuthenticated && isOpened) goBack();
	}, [isAuthenticated, goBack, isOpened]);

	const handleSocialLogin = (website) => {
		const url = `https://api.vomad.guide/auth/${website}`;
		const name = '_blank';
		window.open(url, name);
	};

	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="login-title"
			open={Boolean(isOpened)}
			classes={{ paperWidthSm: styles.dialogPaperWidth }}
		>
			<DialogTitle id="login-title" textAlign="center" onClose={onClose}>
				Welcome!
			</DialogTitle>
			<DialogContent className={styles.dialogContentRoot}>
				{!isUsingEmailAuth ? (
					<Box display="flex" justifyContent="center">
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="center"
							width="65%"
							minWidth="260px"
						>
							<Button
								size="large"
								variant="contained"
								startIcon={<Facebook />}
								classes={{
									label: styles.buttonLabel,
									root: clsx(styles.facebook, styles.buttonMargin)
								}}
								onClick={() => handleSocialLogin('facebook')}
							>
								Continue with Facebook
							</Button>
							<Button
								size="large"
								variant="outlined"
								startIcon={<GoogleIcon />}
								classes={{
									label: styles.buttonLabel,
									root: styles.buttonMargin
								}}
								onClick={() => handleSocialLogin('google')}
							>
								Continue with Google
							</Button>
							<Button
								size="large"
								variant="contained"
								startIcon={<Twitter />}
								classes={{
									label: styles.buttonLabel,
									root: clsx(styles.twitter, styles.buttonMargin)
								}}
								onClick={() => handleSocialLogin('twitter')}
							>
								Continue with Twitter
							</Button>
							<Button
								size="large"
								variant="outlined"
								startIcon={<MailOutlineRounded />}
								classes={{
									label: styles.buttonLabel,
									root: styles.buttonMargin
								}}
								onClick={handleContinueWithEmail}
							>
								Continue with Email
							</Button>
						</Box>
					</Box>
				) : (
					<AuthEmail />
				)}
			</DialogContent>
		</Dialog>
	);
}

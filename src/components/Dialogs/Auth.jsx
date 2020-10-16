import React, { useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsUsingEmailAuth } from '../../store/actions';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '../../utils/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Dialog, Button, Icon, Box } from '@material-ui/core';
import { Facebook, Twitter, MailOutlineRounded } from '@material-ui/icons';
import { indigo, red, blue, grey } from '@material-ui/core/colors';
import AuthEmail from './AuthEmail';

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

const googleIconStyle = { fontSize: 18, margin: 2 };

export default function Auth({ isOpened }) {
	const styles = useStyles();
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isUsingEmailAuth = useSelector((state) => state.auth.isUsingEmailAuth);

	useEffect(() => {
		const node = loadCSS(
			'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
			document.querySelector('#font-awesome-css')
		);

		return () => {
			node.parentNode.removeChild(node);
		};
	}, []);

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
		setTimeout(() => {
			dispatch(setIsUsingEmailAuth(false));
		}, 300);
	}

	useEffect(() => {
		if (isAuthenticated && isOpened) goBack();
	}, [isAuthenticated, goBack, isOpened]);

	const handleFacebookLogin = () => {
		const url = 'https://api.vomad.guide/auth/facebook';
		const name = '_blank';
		window.open(url, name);
	};

	const handleGoogleLogin = () => {
		const url = 'https://api.vomad.guide/auth/google';
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
								onClick={handleFacebookLogin}
							>
								Continue with Facebook
							</Button>
							<Button
								size="large"
								variant="contained"
								startIcon={<Icon className="fab fa-google" style={googleIconStyle} />}
								classes={{
									label: styles.buttonLabel,
									root: clsx(styles.google, styles.buttonMargin)
								}}
								onClick={handleGoogleLogin}
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
							>
								Continue with Twitter
							</Button>
							<Button
								size="large"
								variant="contained"
								startIcon={<MailOutlineRounded />}
								classes={{
									label: styles.buttonLabel,
									root: clsx(styles.email, styles.buttonMargin)
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

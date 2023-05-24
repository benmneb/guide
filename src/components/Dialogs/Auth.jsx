import { Box, Button, Dialog } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { blue, indigo } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { AlternateEmailRounded, Facebook, Twitter } from '@material-ui/icons';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { rootServerUrl } from '../../assets/constants';
import { setIsUsingEmailAuth } from '../../store/actions';
import DialogTitle from '../../utils/DialogTitle';
import GoogleIcon from '../../utils/GoogleIcon';
import AuthEmail from './AuthEmail';

const useStyles = makeStyles((theme) => ({
	dialogContentRoot: {
		padding: theme.spacing(0, 2, 2, 2),
		[theme.breakpoints.up('md')]: {
			marginBottom: 0
		}
	},
	dialogPaperWidth: {
		width: 219,
		minWidth: 291,
		maxWidth: 300
	},
	buttonLabel: {
		justifyContent: 'flex-start'
	},
	buttonMargin: {
		margin: theme.spacing(0.5, 0)
	}
}));

export default function Auth({ isOpened }) {
	const styles = useStyles();
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	// const isUsingEmailAuth = useSelector((state) => state.auth.isUsingEmailAuth);
	const isUsingEmailAuth = true;

	function handleContinueWithEmail() {
		dispatch(setIsUsingEmailAuth(true));
	}

	const goBack = useCallback(() => {
		if (location.search.includes('&')) {
			history.push(location.pathname + location.search.split('&')[0]);
		} else history.push(location.pathname);
	}, [history, location.pathname, location.search]);

	function onClose() {
		if (isOpened) {
			goBack();
		}
	}

	useEffect(() => {
		if (isAuthenticated && isOpened) goBack();
	}, [isAuthenticated, goBack, isOpened]);

	function handleSocialLogin(platform) {
		const url = `${rootServerUrl}/auth/${platform}`;
		const name = '_blank';
		window.open(url, name);
	}

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
								variant="outlined"
								startIcon={<Facebook style={{ color: indigo[500] }} />}
								classes={{
									label: styles.buttonLabel,
									root: styles.buttonMargin
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
								variant="outlined"
								startIcon={<Twitter style={{ color: blue[500] }} />}
								classes={{
									label: styles.buttonLabel,
									root: styles.buttonMargin
								}}
								onClick={() => handleSocialLogin('twitter')}
							>
								Continue with Twitter
							</Button>
							<Button
								size="large"
								variant="outlined"
								startIcon={<AlternateEmailRounded color="primary" />}
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

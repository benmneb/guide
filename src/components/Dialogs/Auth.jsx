import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
	titleRoot: {
		margin: 0,
		padding: 0
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
	const [isUsingEmail, setIsUsingEmail] = useState(false);
	const history = useHistory();

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
		setIsUsingEmail(true);
	}

	function handleContinueWithSocial() {
		setIsUsingEmail(false);
	}

	function onClose() {
		history.goBack();
	}

	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="product-dialog-title"
			open={Boolean(isOpened)}
			classes={{ paperWidthSm: styles.dialogPaperWidth }}
		>
			<DialogTitle id="login-title" textAlign="center" onClose={onClose}>
				Welcome!
			</DialogTitle>
			<DialogContent className={styles.dialogContentRoot}>
				{!isUsingEmail ? (
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
								href="https://api.vomad.guide/auth/facebook/guide"
							>
								Continue with Facebook
							</Button>
							<Button
								size="large"
								variant="contained"
								startIcon={
									<Icon className="fab fa-google" style={{ fontSize: 18, margin: 2 }} />
								}
								classes={{
									label: styles.buttonLabel,
									root: clsx(styles.google, styles.buttonMargin)
								}}
								href="https://api.vomad.guide/auth/google"
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
					<AuthEmail backToSocial={handleContinueWithSocial} />
				)}
			</DialogContent>
		</Dialog>
	);
}

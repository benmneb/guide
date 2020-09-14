import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { loadCSS } from 'fg-loadcss';
import * as actionCreators from '../../store/actions';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Dialog, Button, Icon, IconButton, Typography, Box } from '@material-ui/core';
import { CloseRounded, Facebook, Twitter, MailOutlineRounded } from '@material-ui/icons';
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
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
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

const Login = ({ showAuthModal, onToggleAuthModal }) => {
	const [isUsingEmail, setIsUsingEmail] = useState(false);

	const styles = useStyles();

	const DialogTitle = withStyles(styles)((props) => {
		const { children, classes, onClose, ...other } = props;
		return (
			<MuiDialogTitle disableTypography {...other}>
				<Box component="header">
					<Typography variant="h6" component="h1" align="center">
						{children}
					</Typography>
					{onClose ? (
						<IconButton
							aria-label="close"
							className={styles.closeButton}
							onClick={onClose}
						>
							<CloseRounded />
						</IconButton>
					) : null}
				</Box>
			</MuiDialogTitle>
		);
	});

	useEffect(() => {
		const node = loadCSS(
			'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
			document.querySelector('#font-awesome-css')
		);

		return () => {
			node.parentNode.removeChild(node);
		};
	}, []);

	const onClose = () => {
		onToggleAuthModal();
		setTimeout(() => {
			setIsUsingEmail(false);
		}, 195);
	};

	function handleContinueWithEmail() {
		setIsUsingEmail(true);
	}

	function handleContinueWithSocial() {
		setIsUsingEmail(false);
	}

	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="product-dialog-title"
			open={showAuthModal}
			classes={{ paperWidthSm: styles.dialogPaperWidth }}
		>
			<DialogTitle id="login-title" onClose={onClose}>
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
};

const mapStateToProps = (state) => {
	return {
		showAuthModal: state.showAuthModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleAuthModal: () => dispatch(actionCreators.toggleAuthModal()),
		onShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData }))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

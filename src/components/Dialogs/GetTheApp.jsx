import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DialogTitle from '../../utils/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import {
	Dialog,
	DialogContent,
	DialogContentText,
	Link,
	Typography,
	useMediaQuery,
	Box
} from '@material-ui/core';
import { GetAppRounded } from '@material-ui/icons';
import {
	usePrepareLink,
	useGetParameter,
	getParams,
	getEnums
} from '../../utils/routing';
import Feedback from './Feedback';
import { setDeferredInstallPrompt } from '../../store/actions';
import LoadingButton from '../../utils/LoadingButton';

const useStyles = makeStyles((theme) => ({
	list: {
		margin: theme.spacing(0, 0, 2, 0),
		padding: 0,
		listStyle: 'none',
		display: 'grid',
		gridGap: '1rem',
		'& li': {
			display: 'grid',
			gridTemplateColumns: '0 1fr',
			gridGap: '1.75em',
			alignItems: 'start',
			fontSize: '1.5rem',
			lineHeight: '1.25'
		},
		'& li::before': {
			content: 'attr(data-icon)'
		}
	}
}));

export default function GetTheApp({ isOpened }) {
	const styles = useStyles();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
	const deferredInstallPrompt = useSelector((state) => state.pwa.installPrompt);
	const wantsFeedback = useGetParameter(getParams.action);
	const [showFeedback, setShowFeedback] = useState(false);
	const [pwaStatus, setPwaStatus] = useState('pending');
	const [pending, setPending] = useState(false);

	const goBack = useCallback(() => {
		history.push(location.pathname);
	}, [history, location.pathname]);

	function onClose() {
		goBack();
	}

	useEffect(() => {
		if (wantsFeedback) {
			setShowFeedback(wantsFeedback);
		} else setShowFeedback(false);
	}, [wantsFeedback]);

	const feedbackLink = usePrepareLink({
		query: {
			[getParams.action]: getEnums.action.feedback
		},
		keepOldQuery: true
	});

	useEffect(() => {
		if (deferredInstallPrompt) {
			setPwaStatus('installable');
			console.log('installable');
		} else if (
			typeof navigator !== 'undefined' &&
			/iPad|iPhone|iPod/.test(navigator.userAgent)
		) {
			setPwaStatus('iOS');
			console.log('iOS');
		} else {
			setPwaStatus('not installable, and not iOS');
			console.log('not installable, and not iOS');
		}
	}, [deferredInstallPrompt]);

	async function handleInstallClick() {
		console.log('handling install click');

		setPending(true);
		deferredInstallPrompt.prompt();
		const choiceResult = await deferredInstallPrompt.userChoice;

		if (choiceResult.outcome === 'accepted') {
			console.log('User accepted the PWA prompt');
			setPending(false);
		} else {
			console.log('User dismissed the PWA prompt');
			setPending(false);
		}

		dispatch(setDeferredInstallPrompt(null));
	}

	return (
		<>
			<Dialog
				open={Boolean(isOpened)}
				onClose={onClose}
				aria-labelledby="get-the-app-title"
				aria-describedby="get-the-app-description"
				fullScreen={fullScreen}
			>
				<DialogTitle id="get-the-app-title" onClose={onClose}>
					{'Get the App'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText component="article" id="get-the-app-description">
						<Typography paragraph>PWA status: {pwaStatus}</Typography>
						{pwaStatus === 'installable' && (
							<Typography paragraph>
								Hit the button below to install the Guide on your device.
								<Box marginY={2} component="span" display="flex" justifyContent="center">
									<LoadingButton
										variant="contained"
										color="primary"
										size="large"
										startIcon={<GetAppRounded />}
										disabled={!deferredInstallPrompt}
										onClick={handleInstallClick}
										pending={pending}
									>
										Install the Guide
									</LoadingButton>
								</Box>
							</Typography>
						)}

						{pwaStatus === 'iOS' && (
							<>
								<Typography paragraph>
									Add the Guide to your iOS device home screen in 3 simple steps:
								</Typography>
								<Box component="ul" className={styles.list}>
									<Box component="li" data-icon="⒈">
										<Typography>
											<Box component="span" fontWeight="fontWeightBold">
												First open the Guide in Safari browser.
											</Box>{' '}
											Currently, installing any PWA on iOS is only possible from Safari.
										</Typography>
									</Box>
									<Box component="li" data-icon="⒉">
										<Typography>
											<Box component="span" fontWeight="fontWeightBold">
												Tap the "share" button
											</Box>{' '}
											found at the bottom of the page.
										</Typography>
									</Box>
									<Box component="li" data-icon="⒊">
										<Typography>
											<Box component="span" fontWeight="fontWeightBold">
												Scroll to the "Add to Home Screen" option.
											</Box>{' '}
											Tap it. Then tap "Add" to confirm.
										</Typography>
									</Box>
								</Box>
								<Typography paragraph>
									You can now access the Guide directly from your home screen.{' '}
									<span role="img" aria-label="">
										🥳
									</span>
								</Typography>
							</>
						)}

						{pwaStatus === 'not installable, and not iOS' && (
							<>
								<Typography paragraph>
									Your device or current browser does not support installation of{' '}
									<Link
										href="https://web.dev/what-are-pwas/"
										target="_blank"
										rel="noopener"
									>
										Progressive Web-Apps
									</Link>
									.
								</Typography>
								<Typography paragraph>
									PWAs are a new technology, so the Guide is currently available for
									installation on the following devices:
								</Typography>
								<Box component="ul" className={styles.list}>
									<Box component="li" data-icon="💻">
										<Typography>
											<Box component="span" fontWeight="fontWeightBold">
												All modern desktop & laptop computers
											</Box>
											, by opening this page in an up-to-date chromium-based browser like
											Google Chrome, Brave Browser or Microsoft Edge.
										</Typography>
									</Box>
									<Box component="li" data-icon="🍏">
										<Typography>
											<Box component="span" fontWeight="fontWeightBold">
												All modern iOS mobile devices
											</Box>
											, this means all up-to-date iPhones and iPads, from Safari browser
											only.
										</Typography>
									</Box>
									<Box component="li" data-icon="📲">
										<Typography>
											<Box component="span" fontWeight="fontWeightBold">
												All Android mobile devices.
											</Box>
										</Typography>
									</Box>
								</Box>
								<Typography paragraph>
									Please open this page on one of those to install the app.
								</Typography>
								<Typography paragraph>
									If you believe there is an error and you are seeing this screen even
									though your device does support PWAs, please{' '}
									<Link component={RouterLink} to={feedbackLink}>
										let us know.
									</Link>
								</Typography>
							</>
						)}
					</DialogContentText>
				</DialogContent>
			</Dialog>
			{showFeedback && <Feedback isOpened />}
		</>
	);
}

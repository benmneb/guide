import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
import DialogTitle from '../../utils/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import {
	Dialog,
	DialogContent,
	DialogContentText,
	Link,
	Typography,
	useMediaQuery,
	Box,
	Button
} from '@material-ui/core';
import { GetAppRounded } from '@material-ui/icons';
import {
	usePrepareLink,
	useGetParameter,
	getParams,
	getEnums
} from '../../utils/routing';
import Feedback from './Feedback';

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
	const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
	const wantsFeedback = useGetParameter(getParams.action);
	const [showFeedback, setShowFeedback] = useState(false);

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
						<Typography paragraph>
							Hit the button below to install the Guide on your device.
							<Box marginY={2} component="span" display="flex" justifyContent="center">
								<Button variant="contained" color="primary" startIcon={<GetAppRounded />}>
									Install the Guide
								</Button>
							</Box>
						</Typography>
						<Typography paragraph>DETECT IF iOS AND DO INSTALL INSTRUCTIONS </Typography>
						<Typography paragraph>
							The Guide is currently available for installation on:
						</Typography>
						<Box component="ul" className={styles.list}>
							<Box component="li" data-icon="💻">
								<Typography>
									<Box component="span" fontWeight="fontWeightBold">
										All modern desktop & laptop computers
									</Box>
									, from an up-to-date chromium-based browser like Google Chrome, Brave
									Browser or Microsoft Edge.
								</Typography>
							</Box>
							<Box component="li" data-icon="🍏">
								<Typography>
									<Box component="span" fontWeight="fontWeightBold">
										All modern iOS mobile devices
									</Box>
									, this means all up-to-date iPhones and iPads, from Safari browser only.
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
							If you do not see an orange button above to "Install the Guide", it means
							your device does not allow installation of Progressive Web-Apps.
						</Typography>
						<Typography paragraph>
							If you believe this is an error, please{' '}
							<Link component={RouterLink} to={feedbackLink}>
								let us know.
							</Link>
						</Typography>
					</DialogContentText>
				</DialogContent>
			</Dialog>
			{showFeedback && <Feedback isOpened />}
		</>
	);
}

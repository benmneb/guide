import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import AuthEmailLogin from './AuthEmailLogin';
import AuthEmailJoin from './AuthEmailJoin';

const useStyles = makeStyles((theme) => ({
	toggleButtonGroup: {
		width: 200,
		marginBottom: theme.spacing(2)
	},
	toggleButton: {
		width: '50%'
	}
}));

export default function LoginLogin(props) {
	const styles = useStyles();
	const [route, setRoute] = useState('login');

	const handleChangeRoute = (event, newRoute) => {
		if (newRoute !== null) setRoute(newRoute);
	};

	function handleBackToSocial() {
		props.backToSocial();
	}

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<ToggleButtonGroup
				value={route}
				exclusive
				onChange={handleChangeRoute}
				aria-label="login method"
				size="small"
				className={styles.toggleButtonGroup}
			>
				<ToggleButton value="login" aria-label="login" className={styles.toggleButton}>
					Login
				</ToggleButton>
				<ToggleButton value="join" aria-label="join" className={styles.toggleButton}>
					Sign up
				</ToggleButton>
			</ToggleButtonGroup>
			{route === 'login' ? (
				<AuthEmailLogin backToSocial={handleBackToSocial} />
			) : (
				<AuthEmailJoin backToSocial={handleBackToSocial} />
			)}
		</Box>
	);
}

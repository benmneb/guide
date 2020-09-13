import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import AuthEmailLogin from './AuthEmailLogin';
import AuthEmailJoin from './AuthEmailJoin';

export default function LoginLogin(props) {
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
				style={{ width: 200, marginBottom: 16 }}
			>
				<ToggleButton value="login" aria-label="login" style={{ width: '50%' }}>
					Login
				</ToggleButton>
				<ToggleButton value="join" aria-label="join" style={{ width: '50%' }}>
					Join Us
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

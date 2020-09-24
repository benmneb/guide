import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingButton({
	pending,
	startIcon,
	children,
	pendingText,
	...props
}) {
	return (
		<Button
			disabled={pending}
			startIcon={pending ? <CircularProgress color="inherit" size={16} /> : startIcon}
			{...props}
		>
			{pending && pendingText ? pendingText : children}
		</Button>
	);
}

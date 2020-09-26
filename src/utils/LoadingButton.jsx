import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingButton({
	pending,
	startIcon,
	endIcon,
	children,
	pendingText,
	...props
}) {
	if (startIcon && endIcon) {
		throw new Error(
			`Can't have both start and ending icons in a Loading Button, please choose only one.`
		);
	}

	if (startIcon) {
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

	if (endIcon) {
		return (
			<Button
				disabled={pending}
				endIcon={pending ? <CircularProgress color="inherit" size={16} /> : endIcon}
				{...props}
			>
				{pending && pendingText ? pendingText : children}
			</Button>
		);
	}
}

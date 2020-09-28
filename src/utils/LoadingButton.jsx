import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
	pendingSpinner: {
		position: 'absolute',
		visibility: 'visible',
		display: 'flex',
		left: '50%',
		transform: 'translate(-50%)'
	},
	hideLabel: {
		visibility: 'hidden'
	}
});

LoadingButton.propTypes = {
	pending: PropTypes.bool.isRequired,
	pendingText: PropTypes.string
};

export default function LoadingButton({
	pending,
	startIcon,
	endIcon,
	children,
	pendingText,
	...props
}) {
	const styles = useStyles();

	if (!startIcon && !endIcon && !pendingText) {
		return (
			<Button
				disabled={pending}
				classes={{ label: clsx({ [styles.hideLabel]: pending }) }}
				{...props}
			>
				{pending && (
					<div className={styles.pendingSpinner}>
						<CircularProgress color="inherit" size={16} />
					</div>
				)}
				{children}
			</Button>
		);
	}

	if (!startIcon && !endIcon) {
		return (
			<Button disabled={pending} {...props}>
				{pending && pendingText ? pendingText : children}
			</Button>
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

	if (startIcon && endIcon) {
		throw new Error(
			`Can't have both start and ending icons in a Loading Button, please choose only one.`
		);
	}
}

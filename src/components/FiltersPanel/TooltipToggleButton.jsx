import React from 'react';
import { Tooltip } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';

export default function TooltipToggleButton({ children, title, ...props }) {
	return (
		<Tooltip title={title} arrow enterDelay={1000}>
			<ToggleButton {...props}>{children}</ToggleButton>
		</Tooltip>
	);
}

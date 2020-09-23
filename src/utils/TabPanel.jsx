import React from 'react';
import Box from '@material-ui/core/Box';

export default function TabPanel({ children, value, index, ...props }) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...props}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

export function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

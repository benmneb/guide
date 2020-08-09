import React from 'react';
import clsx from 'clsx';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	transitionBoxShadow: {
		transition: 'box-shadow 0.3s'
	},
	fixed: {
		position: 'fixed'
	},
	sticky: {
		position: 'sticky',
		top: 64
	},
	shadowDark: {
		boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14)',
		transition: 'top 0.3s'
	},
	shadowLight: {
		boxShadow:
			'0px 2px 4px -1px rgba(255, 255, 255, 0.8), 0px 4px 5px 0px rgba(255, 255, 255, 0.86)'
	},
	hide: {
		top: theme.mixins.toolbar.minHeight - 64,
		transition: 'top 0.3s'
	},
	displayNone: {
		display: 'none'
	},
	filtersAreOpen: {
		top: 64,
		transition: 'top 0ms, box-shadow 0.3s'
	}
}));

export default function NavBar(props) {
	const styles = useStyles();

	return (
		<Box
			component="nav"
			display="flex"
			alignItems="center"
			width="100%"
			height={'var(--header-height)'}
			margin={0}
			padding={0}
			zIndex="2"
			bgcolor="#fff"
			className={clsx(styles.transitionBoxShadow, {
				[styles.sticky]: props.position === 'sticky',
				[styles.fixed]: props.position === 'fixed',
				[styles.shadowDark]: props.shadowDark,
				[styles.shadowLight]: props.shadowLight,
				[styles.hide]: props.hide,
				[styles.displayNone]: props.displayNone,
				[styles.filtersAreOpen]: props.filtersAreOpen
			})}
		>
			{props.children}
		</Box>
	);
}

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100vw',
		height: 'var(--header-height)',
		margin: 0,
		padding: 0,
		zIndex: '2',
		opacity: '1',
		backgroundColor: '#fff',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		transition: 'box-shadow 0.3s'
	},
	fixed: {
		position: 'fixed'
	},
	sticky: {
		position: 'sticky',
		top: 'var(--header-height)'
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
		top: 'calc(var(--header-height) - var(--header-height))',
		transition: 'top 0.3s'
	},
	displayNone: {
		display: 'none'
	},
	top0: {
		top: '0',
		transition: 'top 0ms, box-shadow 0.3s'
	}
}));

export default function NavBar(props) {
	const styles = useStyles();

	return (
		<nav
			className={clsx(styles.container, {
				[styles.sticky]: props.position === 'sticky',
				[styles.fixed]: props.position === 'fixed',
				[styles.shadowDark]: props.shadowDark,
				[styles.shadowLight]: props.shadowLight,
				[styles.hide]: props.hide,
				[styles.displayNone]: props.displayNone,
				[styles.top0]: props.filtersAreOpen
			})}
		>
			{props.children}
		</nav>
	);
}

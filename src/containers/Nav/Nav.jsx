import React from 'react';
import classes from './Nav.module.css';

export default function NavBar(props) {
	const classList = `${classes.container} ${
		props.position === 'sticky' ? classes.sticky : ''
	} ${props.position === 'fixed' ? classes.fixed : ''} ${
		props.shadowDark ? classes.shadowDark : ''
	} ${props.shadowLight ? classes.shadowLight : ''} ${props.hide ? classes.hide : ''}`;

	return <nav className={classList}>{props.children}</nav>;
}

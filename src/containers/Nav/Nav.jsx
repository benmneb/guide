import React from 'react';
import classes from './Nav.module.css';

export default function NavBar(props) {
	const { position, shadowDark, shadowLight, hide } = props;

	const classList = `${classes.container} ${
		position === 'sticky' ? classes.sticky : ''
	} ${position === 'fixed' ? classes.fixed : ''} ${
		shadowDark ? classes.shadowDark : ''
	} ${shadowLight ? classes.shadowLight : ''} ${hide ? classes.hide : ''}`;

	return <nav className={classList}>{props.children}</nav>;
}

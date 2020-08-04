import React from 'react';
import classes from './Nav.module.css';

export default function NavBar(props) {
	const { position, shadowDark, shadowLight, hide, displayNone, filtersAreOpen } = props;

	const classList = `${classes.container} ${
		position === 'sticky' ? classes.sticky : ''
	} ${position === 'fixed' ? classes.fixed : ''} ${
		shadowDark ? classes.shadowDark : ''
	} ${shadowLight ? classes.shadowLight : ''} ${hide ? classes.hide : ''} ${
		displayNone ? classes.displayNone : ''
	} ${filtersAreOpen ? classes.top0 : ''}`;

	return <nav className={classList}>{props.children}</nav>;
}

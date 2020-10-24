import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import randomMC from 'random-material-color';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	userProfile: {
		width: 200,
		height: 200,
		fontSize: '3rem'
	},
	review: {
		width: 72,
		height: 72
	},
	topbar: {
		width: 31,
		height: 31
	}
});

function getAppropriateSize(component, src) {
	if (component === 'userProfile') return `${src}?width=400&height=400`;
	if (component === 'review') return `${src}?width=144&height=144`;
	if (component === 'topbar') return `${src}?width=58&height=58`;
}
export default function UserAvatar({ userData, component }) {
	const styles = useStyles();
	const avatarSrc = getAppropriateSize(component, userData.avatar);
	const username = userData.user_name ? userData.user_name : userData.username;
	const color = randomMC.getColor({ text: username });

	return (
		<Avatar
			src={avatarSrc}
			alt={username.toUpperCase()}
			className={clsx({
				[styles.userProfile]: component === 'userProfile',
				[styles.review]: component === 'review',
				[styles.topbar]: component === 'topbar'
			})}
			style={component !== 'topbar' ? { backgroundColor: color } : null}
		>
			{username.charAt(0).toUpperCase()}
		</Avatar>
	);
}

UserAvatar.propTypes = {
	userData: PropTypes.object.isRequired,
	component: PropTypes.oneOf(['review', 'userProfile', 'topbar']).isRequired
};

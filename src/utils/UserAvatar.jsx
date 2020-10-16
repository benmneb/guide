import React from 'react';
import PropTypes from 'prop-types';
import randomMC from 'random-material-color';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	userProfile: {
		width: 200,
		height: 200,
		fontSize: '3rem'
	},
	review: {
		width: theme.spacing(9),
		height: theme.spacing(9)
	}
}));

export default function UserAvatar({ userData, component }) {
	const styles = useStyles();
	const color = randomMC.getColor({ text: userData.user_name });

	return (
		<Avatar
			src={userData.avatar}
			alt={userData.user_name.toUpperCase()}
			className={component === 'review' ? styles.review : styles.userProfile}
			style={{ backgroundColor: color }}
		>
			{userData.user_name.charAt(0).toUpperCase()}
		</Avatar>
	);
}

UserAvatar.propTypes = {
	userData: PropTypes.object.isRequired,
	component: PropTypes.oneOf(['review', 'userProfile']).isRequired
};

import React from 'react';
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
	}
});

export default function UserAvatar({ userData, component }) {
	const styles = useStyles();
	const color = randomMC.getColor({ text: userData.user_name });
	const appropriateSize =
		component === 'review' ? '?width=144&height=144' : '?width=400&height=400';

	return (
		<Avatar
			src={userData.avatar + appropriateSize}
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

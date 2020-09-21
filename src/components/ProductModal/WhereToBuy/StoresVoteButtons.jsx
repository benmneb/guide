import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actionCreators from '../../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { ThumbUpRounded, ThumbDownRounded } from '@material-ui/icons';
import { usePrepareLink, getParams, getEnums } from '../../../utils/routing';

const useStyles = makeStyles((theme) => ({
	iconButton: {
		[theme.breakpoints.only('xs')]: {
			padding: 6
		}
	}
}));

function StoresVoteButtons({ setShowSnackbar, isAuthenticated }) {
	const styles = useStyles();
	const history = useHistory();
	const [selected, setSelected] = useState('');

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		}
	});

	function handleVote(vote) {
		if (isAuthenticated) {
			if (vote !== selected) {
				setSelected(vote);
				setShowSnackbar({
					snackData: {
						type: 'success',
						message: 'Thank you for helping people find vegan products easier',
						emoji: '💪'
					}
				});
			} else setSelected('');
		} else {
			history.push(authLink);
		}
	}

	return (
		<>
			<IconButton
				aria-label="confirm"
				className={styles.iconButton}
				onClick={() => handleVote('up')}
			>
				<ThumbUpRounded
					fontSize="small"
					color={selected === 'up' ? 'primary' : 'inherit'}
				/>
			</IconButton>
			<IconButton
				aria-label="vote down"
				className={styles.iconButton}
				edge="end"
				onClick={() => handleVote('down')}
			>
				<ThumbDownRounded
					fontSize="small"
					color={selected === 'down' ? 'primary' : 'inherit'}
				/>
			</IconButton>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.isAuthenticated
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData }))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StoresVoteButtons);

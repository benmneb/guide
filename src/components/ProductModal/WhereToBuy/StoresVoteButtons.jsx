import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { ThumbUpRounded, ThumbDownRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	iconButton: {
		[theme.breakpoints.only('xs')]: {
			padding: 6
		}
	}
}));

function StoresVoteButtons({ onShowSnackbar }) {
	const styles = useStyles();
	const [selected, setSelected] = useState('');

	function handleVote(vote) {
		if (vote !== selected) {
			setSelected(vote);
			onShowSnackbar({
				snackData: {
					type: 'success',
					message: 'Thank you for helping people find vegan products easier!'
				}
			});
		} else setSelected('');
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

const mapDispatchToProps = (dispatch) => {
	return {
		onShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData }))
	};
};

export default connect(null, mapDispatchToProps)(StoresVoteButtons);

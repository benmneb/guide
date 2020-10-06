import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showSnackbar } from '../../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { ThumbUpRounded, ThumbDownRounded } from '@material-ui/icons';
import { usePrepareLink, getParams, getEnums } from '../../../utils/routing';

const useStyles = makeStyles((theme) => ({
	iconButton: {
		[theme.breakpoints.only('xs')]: {
			padding: 6
		}
	}
}));

export default function StoresVoteButtons() {
	const styles = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [selected, setSelected] = useState('');

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		},
		keepOldQuery: true
	});

	function handleVote(vote) {
		if (isAuthenticated) {
			if (vote !== selected) {
				setSelected(vote);
				dispatch(
					showSnackbar({
						snackData: {
							type: 'success',
							message: 'Thank you for helping people find vegan products easier',
							emoji: '💪'
						}
					})
				);
			} else setSelected('');
		} else {
			history.push(authLink);
		}
	}

	return (
		<>
			<Tooltip title="Yes, I have seen this product in this store">
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
			</Tooltip>
			<Tooltip title="No, I have not seen this product in this store">
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
			</Tooltip>
		</>
	);
}

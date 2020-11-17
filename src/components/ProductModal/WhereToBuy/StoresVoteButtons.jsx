import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showSnackbar, updateStores } from '../../../store/actions';
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

export default function StoresVoteButtons(props) {
	const styles = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const currentUserData = useSelector((state) => state.auth.currentUserData);
	const selectedProduct = useSelector((state) => state.product.selectedProduct);
	const currentLocation = useSelector((state) => state.product.currentLocation);
	const [selected, setSelected] = useState(0);
	const prevSelected = useRef(0);

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		},
		keepOldQuery: true
	});

	// setSelected if they have previously voted
	useEffect(() => {
		if (isAuthenticated) {
			const { votedBy, votedDownBy } = props;
			if (votedBy && votedBy.includes(currentUserData.id)) {
				prevSelected.current = 1;
				setSelected(1);
			} else if (votedDownBy && votedDownBy.includes(currentUserData.id)) {
				prevSelected.current = -1;
				setSelected(-1);
			}
		}
	}, [currentUserData, isAuthenticated, props]);

	async function handleVote(vote) {
		if (isAuthenticated) {
			if (vote !== selected) setSelected(vote);
			else setSelected(0);

			try {
				const response = await axios.put('/vote-store', {
					prod_store_id: props.prodStoreId,
					user_id: currentUserData.id,
					voteType: vote
				});
				response.data &&
					dispatch(
						updateStores(
							selectedProduct.productId,
							currentLocation.lat,
							currentLocation.lng
						)
					);
			} catch (err) {
				setSelected(prevSelected.current);
				console.error('Error casting vote:', err.message);
				dispatch(
					showSnackbar({
						type: 'error',
						title: 'Could not cast vote',
						message: `${err.message}. Please try again.`
					})
				);
			}
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
					onClick={() => handleVote(1)}
				>
					<ThumbUpRounded
						fontSize="small"
						color={selected === 1 ? 'primary' : 'inherit'}
					/>
				</IconButton>
			</Tooltip>
			<Tooltip title="This product is not currently stocked here">
				<IconButton
					aria-label="vote down"
					className={styles.iconButton}
					edge="end"
					onClick={() => handleVote(-1)}
				>
					<ThumbDownRounded
						fontSize="small"
						color={selected === -1 ? 'primary' : 'inherit'}
					/>
				</IconButton>
			</Tooltip>
		</>
	);
}

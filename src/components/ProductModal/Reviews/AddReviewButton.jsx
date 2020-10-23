import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { CancelRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { showAddReview, hideAddReview } from '../../../store/actions';
import { usePrepareLink, getParams, getEnums } from '../../../utils/routing';

const useStyles = makeStyles((theme) => ({
	cancelButton: {
		color: theme.palette.text.secondary
	}
}));

export default function AddReviewButton() {
	const styles = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const showAddReviewForm = useSelector((state) => state.product.showAddReview);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const prevReviewData = useSelector((state) => state.product.prevReviewData);

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		},
		keepOldQuery: true
	});

	function handleAddReviewButtonClick() {
		if (isAuthenticated) {
			if (showAddReviewForm) return dispatch(hideAddReview());
			else return dispatch(showAddReview());
		} else {
			history.push(authLink);
		}
	}

	return (
		<Button
			size="large"
			variant={showAddReviewForm ? 'outlined' : 'contained'}
			color={showAddReviewForm ? 'default' : 'primary'}
			startIcon={showAddReviewForm ? <CancelRounded color="disabled" /> : null}
			onClick={handleAddReviewButtonClick}
			classes={showAddReviewForm ? { label: styles.cancelButton } : null}
		>
			{showAddReviewForm
				? 'Cancel'
				: prevReviewData && prevReviewData.review
				? 'Edit Review'
				: 'Add Review'}
		</Button>
	);
}

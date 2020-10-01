import * as actionTypes from './actionTypes';
import axios from 'axios';

export const updateReviews = (selectedProductId) => (dispatch) =>
	axios
		.get(`https://api.vomad.guide/review/${selectedProductId}`)
		.then((response) =>
			dispatch({
				type: actionTypes.SET_REVIEWS,
				payload: response.data
			})
		)
		.catch((err) => console.error(err));

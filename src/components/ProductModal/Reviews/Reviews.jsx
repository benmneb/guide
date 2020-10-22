import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setReviews } from '../../../store/actions';
import AddReviewForm from './AddReviewForm';
import ReviewsList from './ReviewsList';
import ReviewsTitleBar from './ReviewsTitleBar';

export default function Reviews() {
	const dispatch = useDispatch();
	const selectedProduct = useSelector((state) => state.product.selectedProduct);
	const alreadyFetchedReviews = useRef(false);

	// fetch reviews
	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (mounted && selectedProduct && !alreadyFetchedReviews.current) {
			axios
				.get(`https://api.vomad.guide/review/${selectedProduct.productId}`, {
					cancelToken: source.token
				})
				.then((response) => {
					if (mounted) {
						dispatch(setReviews(response.data));
						alreadyFetchedReviews.current = true;
					}
				})
				.catch((err) => {
					if (mounted) console.error(err);
				});
		}

		return () => {
			mounted = false;
			source.cancel('Reviews fetch cancelled during clean-up');
		};
	}, [selectedProduct, dispatch]);

	return (
		<>
			<ReviewsTitleBar />
			<AddReviewForm />
			<ReviewsList />
		</>
	);
}

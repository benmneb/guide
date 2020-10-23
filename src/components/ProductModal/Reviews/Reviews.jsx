import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setReviews, setPrevReviewData } from '../../../store/actions';
import ReviewsList from './ReviewsList';
import ReviewsTitleBar from './ReviewsTitleBar';
import AddReviewForm from './AddReviewForm';

export default function Reviews() {
	const dispatch = useDispatch();
	const selectedProduct = useSelector((state) => state.product.selectedProduct);
	const currentUserData = useSelector((state) => state.auth.currentUserData);
	const reviews = useSelector((state) => state.product.reviews);
	const alreadyFetchedReviews = useRef(Boolean(reviews));

	// fetch reviews
	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();
		const queryParam = currentUserData ? `?userid=${currentUserData.id}` : '';

		if (mounted && selectedProduct && !alreadyFetchedReviews.current) {
			axios
				.get(
					`https://api.vomad.guide/reviews/${selectedProduct.productId}${queryParam}`,
					{
						cancelToken: source.token
					}
				)
				.then((res) => {
					if (mounted) {
						dispatch(setReviews(res.data.reviews));
						dispatch(setPrevReviewData(res.data.userReview));
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
	}, [selectedProduct, currentUserData, dispatch]);

	return (
		<>
			<ReviewsTitleBar />
			<AddReviewForm />
			<ReviewsList />
		</>
	);
}

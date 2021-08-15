import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
	setReviews,
	setPrevReviewData,
	updateReviews,
	hideAddReview,
	showAddReview,
	setSelectedProduct,
	setStores,
	showSnackbar,
	hideSnackbar,
	setTempRating
} from '../../store/actions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DialogTitle from '../../utils/DialogTitle';
import {
	Dialog,
	DialogContent,
	Typography,
	useMediaQuery,
	Tabs,
	Tab,
	Paper,
	Grid,
	Box
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import TabPanel, { a11yProps } from '../../utils/TabPanel';
import About from './About/About';
import Reviews from './Reviews/Reviews';
import BottomNav from './BottomNav';
import StarRating from './StarRating';
import { usePrepareLink, getParams, getEnums } from '../../utils/routing';
import { labels } from '../../assets/ratingLabels';
const WhereToBuy = lazy(() => import('./WhereToBuy/WhereToBuy'));

const useStyles = makeStyles((theme) => ({
	dialogContentRoot: {
		padding: theme.spacing(2),
		marginBottom: 56, // height of bottomNav bar
		[theme.breakpoints.up('md')]: {
			marginBottom: 0
		}
	},
	brandName: {
		color: theme.palette.grey[500],
		fontWeight: theme.typography.fontWeightBold,
		fontSize: '0.9rem',
		lineHeight: '2',
		width: '100%'
	},
	modalMaxHeight: {
		[theme.breakpoints.up('md')]: {
			height: `calc(100% - ${theme.spacing(8)}px)` // always max height so there is no jump with less modal content
		}
	},
	navBox: {
		borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
	}
}));

export default function ProductModal({ show }) {
	const styles = useStyles();
	const theme = useTheme();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const { id } = useParams();
	const urlSearchParamsTab = new URLSearchParams(location.search).get('tab');
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const showingAddReview = useSelector((state) => state.product.showAddReview);
	const selectedProduct = useSelector((state) => state.product.selectedProduct);
	const prevReviewData = useSelector((state) => state.product.prevReviewData);
	const tempRating = useSelector((state) => state.product.tempRating);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const currentUserData = useSelector(
		(state) => isAuthenticated && state.auth.currentUserData
	);
	const [currentTab, setCurrentTab] = useState('about');
	const [newRating, setNewRating] = useState(null);
	const [currentUrlSearchParams, setCurrentUrlSearchParams] = useState(null);

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		},
		keepOldQuery: true
	});

	//get product info
	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (show) {
			axios
				.get(`/product/${id}`, {
					cancelToken: source.token
				})
				.then((response) => {
					if (mounted) dispatch(setSelectedProduct(response.data[0]));
				})
				.catch((err) => {
					if (mounted) console.error(err);
				});
		}

		return () => {
			mounted = false;
			source.cancel('Product modal call cancelled during clean-up');
		};
	}, [newRating, id, show, dispatch]);

	const handleStarRating = (newValue) => {
		if (!prevReviewData || Number(newValue) !== (tempRating || prevReviewData.rating)) {
			axios
				.put('/add-rating/', {
					rating: newValue,
					product_id: selectedProduct && selectedProduct.productId,
					user_id: currentUserData.id
				})
				.then((res) => {
					setNewRating(JSON.parse(res.config.data).rating);
					const message =
						res.data.message === 'rating updated' ? 'Rating updated to' : 'Rated as';
					const action = res.data.reviewFound ? 'Edit' : 'Add';
					dispatch(
						showSnackbar({
							type: 'success',
							message: `${message} "${labels[newValue]}"`,
							action: {
								text: `${action} review?`,
								clicked: () => handleClickSnackbarAfterRating(newValue, action)
							}
						})
					);
					dispatch(setTempRating(newValue));
					if (prevReviewData && prevReviewData.rating !== Number(newValue)) {
						dispatch(updateReviews(selectedProduct.productId));
					}
				})
				.catch((err) => {
					console.error(err.message);
					dispatch(
						showSnackbar({
							type: 'error',
							title: 'Could not submit rating',
							message: 'Something went wrong. Please try again.'
						})
					);
				});
		} else {
			dispatch(
				showSnackbar({
					type: 'info',
					message: 'New rating must be different from previous rating.'
				})
			);
		}
	};

	const handleClickSnackbarAfterRating = (newRating, action) => {
		if (action === 'Add') {
			if (isAuthenticated) {
				dispatch(hideSnackbar());
				dispatch(showAddReview());
			} else {
				history.push(authLink);
			}
		}

		if (action === 'Edit') {
			dispatch(hideSnackbar());
			dispatch(showAddReview());
		}
	};

	const onClose = () => {
		if (show) {
			const releventPath = location.pathname.match(/^([^/]*\/){3}/)[0].slice(0, -1); // cuts off everything after the category
			history.push(releventPath);
		}
	};

	const onExited = () => {
		if (showingAddReview) dispatch(hideAddReview());
		if (currentTab !== 'about') setCurrentTab('about');
		if (prevReviewData) dispatch(setPrevReviewData(null));
		if (tempRating) dispatch(setTempRating(null));
		dispatch(setSelectedProduct(null));
		dispatch(setReviews(null));
		dispatch(setStores(null));
	};

	const aboutLink = usePrepareLink({
		query: {
			[getParams.productTab]: getEnums.productTab.about
		},
		keepOldQuery: true
	});
	const reviewsLink = usePrepareLink({
		query: {
			[getParams.productTab]: getEnums.productTab.reviews
		},
		keepOldQuery: true
	});
	const whereToBuyLink = usePrepareLink({
		query: {
			[getParams.productTab]: getEnums.productTab.whereToBuy
		},
		keepOldQuery: true
	});

	const handleChangeCurrentTab = useCallback(
		(event, newValue) => {
			if (newValue !== 'reviews' && showingAddReview) dispatch(hideAddReview());
			setCurrentTab(newValue);
			setCurrentUrlSearchParams(newValue);
			switch (newValue) {
				case 'about':
					return history.replace(aboutLink);
				case 'reviews':
					return history.replace(reviewsLink);
				case 'where-to-buy':
					return history.replace(whereToBuyLink);
				default:
					return history.replace(aboutLink);
			}
		},
		[aboutLink, history, reviewsLink, whereToBuyLink, dispatch, showingAddReview]
	);

	// set appropriate tab from url search params
	useEffect(() => {
		if (show && urlSearchParamsTab !== currentUrlSearchParams)
			switch (urlSearchParamsTab) {
				case 'about':
					return handleChangeCurrentTab(null, 'about');
				case 'reviews':
					return handleChangeCurrentTab(null, 'reviews');
				case 'where-to-buy':
					return handleChangeCurrentTab(null, 'where-to-buy');
				default:
					return handleChangeCurrentTab(null, 'about');
			}
	}, [urlSearchParamsTab, handleChangeCurrentTab, show, currentUrlSearchParams]);

	// show reviews tab after clicking "add review" on snackbar after rating
	useEffect(() => {
		if (showingAddReview && currentTab !== 'reviews') setCurrentTab('reviews');
	}, [showingAddReview, currentTab]);

	return (
		<>
			{show && (
				<Helmet>
					<title>
						{selectedProduct
							? `Vomad Guide: ${selectedProduct.brandName} ${selectedProduct.productName}`
							: 'Vomad Guide: Find Vegan Products Near You'}
					</title>
					<meta
						name="description"
						content="View ingredients, allergens, nutritional information, reviews, stores to buy in, and more, only on Vomad Guide: The Free Vegan Product Guide."
					/>
				</Helmet>
			)}
			<Dialog
				onClose={onClose}
				onExited={onExited}
				fullScreen={fullScreen}
				aria-labelledby="product-dialog-title"
				open={show}
				maxWidth="md"
				fullWidth
				classes={{ paperScrollPaper: styles.modalMaxHeight }}
			>
				<DialogTitle noTitle id="product-dialog-title" onClose={onClose} />
				<DialogContent className={styles.dialogContentRoot}>
					<Grid
						component="header"
						container
						spacing={1}
						direction="column"
						alignItems="center"
					>
						<Grid item xs={12}>
							{selectedProduct ? (
								<Typography component="h1" variant="h4" align="center">
									<Typography
										className={styles.brandName}
										variant="overline"
										component="span"
										display="block"
									>
										{selectedProduct.brandName}
									</Typography>
									{selectedProduct.productName}
								</Typography>
							) : (
								<Box display="flex" flexDirection="column" alignItems="center">
									<Skeleton width="30%" className={styles.brandName} />
									<Typography component="h1" variant="h4" align="center">
										<Skeleton width={500} />
									</Typography>
								</Box>
							)}
						</Grid>
						<Grid item xs={12}>
							<StarRating
								product={selectedProduct}
								averageRating={selectedProduct && Number(selectedProduct.rating)}
								amountOfRatings={selectedProduct && Number(selectedProduct.ratingcount)}
								productId={selectedProduct && selectedProduct.productId}
								onRate={(newValue) => handleStarRating(newValue)}
							/>
						</Grid>
						<Box display={{ xs: 'none', md: 'inherit' }}>
							<Grid item xs={12}>
								<Paper variant="outlined" className={styles.navBox}>
									<Tabs
										component="nav"
										value={currentTab}
										onChange={selectedProduct && handleChangeCurrentTab}
										indicatorColor="primary"
										textColor="inherit"
										centered
									>
										<Tab label="About" {...a11yProps('about')} value="about" />
										<Tab label="Reviews" {...a11yProps('reviews')} value="reviews" />
										<Tab
											label="Where To Buy"
											{...a11yProps('where-to-buy')}
											value="where-to-buy"
										/>
									</Tabs>
								</Paper>
							</Grid>
						</Box>
					</Grid>
					<Box marginTop={2}>
						<TabPanel value={currentTab} index="about">
							<About />
						</TabPanel>
						<TabPanel value={currentTab} index="reviews">
							{selectedProduct && <Reviews />}
						</TabPanel>
						<TabPanel value={currentTab} index="where-to-buy">
							<Suspense fallback={null}>
								<WhereToBuy />
							</Suspense>
						</TabPanel>
					</Box>
				</DialogContent>
				<BottomNav
					currentTab={currentTab}
					onChange={selectedProduct && handleChangeCurrentTab}
				/>
			</Dialog>
		</>
	);
}

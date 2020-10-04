import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import clsx from 'clsx';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	hideFiltersPanel,
	setLoading,
	showSnackbar,
	setOffset,
	increaseOffset
} from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import ResultCard from './ResultCard';
import Hero, { Heading, SubHeading, Footer } from '../Hero/Hero';
import FiltersBar from './FiltersBar';
import FiltersPanel from '../FiltersPanel/FiltersPanel';
import BottomNav from './BottomNav';
import ResultSkeleton from './ResultSkeleton';
import HeroSkeleton from '../Hero/HeroSkeleton';
import ProductModal from '../ProductModal/ProductModal';
import { usePrepareLink } from '../../utils/routing';
import ScrollToTopOnMount, { scrollToTopNow } from '../../utils/ScrollToTop';
import { toKebabCase } from '../../utils/changeCase';
import ResultsListSpinner from './ResultsListSpinner';
import ResultsListEndMessage from './ResultsListEndMessage';

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.palette.background.paper,
		flexGrow: 1,
		padding: theme.spacing(3, 0),
		display: 'grid',
		[theme.breakpoints.up('xs')]: {
			gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
			marginBottom: theme.spacing(6)
		},
		[theme.breakpoints.up('sm')]: {
			gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
			marginBottom: theme.spacing(7)
		},
		[theme.breakpoints.up('md')]: {
			gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
			gridRowGap: theme.spacing(3),
			marginBottom: theme.spacing(0)
		},
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	containerShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginRight: theme.mixins.filtersPanel.width
	},
	fab: {
		position: 'fixed',
		right: theme.spacing(6),
		bottom: theme.spacing(4)
	},
	productLink: {
		textDecoration: 'none',
		outline: 'none'
	}
}));

export default function ResultsList() {
	const styles = useStyles();
	const dispatch = useDispatch();
	const location = useLocation();
	const showFiltersPanel = useSelector((state) => state.ui.showFiltersPanel);
	const appliedFilters = useSelector((state) => state.results.appliedFilters);
	const offset = useSelector((state) => state.results.offset);
	const [fetchedResults, setFetchedResults] = useState([]);
	const [filteredResults, setFilteredResults] = useState([]);
	const [displayedResults, setDisplayedResults] = useState([]);
	const loadingInitially = !fetchedResults.length > 0;
	const [categoryData, setCategoryData] = useState({});
	const [currentPathname, setCurrentPathname] = useState('');

	const productLink = usePrepareLink({
		to: '/:name/:id',
		isRelativePath: true
	});

	//axios call to get initial set of products
	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();
		const categoryArr = location.pathname.split('/');
		const releventPathname = `/${categoryArr[1]}/${categoryArr[2]}`;

		if (releventPathname !== currentPathname) {
			dispatch(setLoading(true));
			axios
				.get(`https://api.vomad.guide/category${releventPathname}/0`, {
					cancelToken: source.token
				})
				.then((response, rejection) => {
					if (mounted) {
						if (rejection) {
							dispatch(setLoading(false));
							dispatch(
								showSnackbar({
									snackData: {
										type: 'error',
										title: 'Could not load products',
										message: `${rejection.message}. Please try again soon.`
									}
								})
							);
							return console.warn('Loading results was rejected:', rejection.message);
						}
						const breadcrumbsArr = Array(
							String(response.data[0].breadcrumbs).split('@')
						)[0];
						setCategoryData({
							name: String(breadcrumbsArr[breadcrumbsArr.length - 1]),
							totalProducts: response.data[0].totalproducts,
							totalBrands: response.data[0].totalbrands,
							breadcrumbs: breadcrumbsArr
						});
						setCurrentPathname(releventPathname);
						setFetchedResults(response.data[0].productList);
						scrollToTopNow();
						dispatch(setOffset(12));
						dispatch(setLoading(false));
					}
				})
				.catch((err) => {
					if (mounted) {
						dispatch(setLoading(false));
						dispatch(
							showSnackbar({
								snackData: {
									type: 'error',
									title: 'Could not load products',
									message: `${err.message}. Please try again soon.`,
									duration: 12000
								}
							})
						);
						return console.error('Error loading products:', err.message);
					}
				});
		}

		return () => {
			mounted = false;
			dispatch(setLoading(false));
			source.cancel('Results list cancelled during clean-up');
		};
	}, [location.pathname, currentPathname, dispatch]);

	// fetch more products on scroll
	const fetchProducts = useCallback(() => {
		dispatch(setLoading(true));
		axios
			.get(`https://api.vomad.guide/category${currentPathname}/${offset}`)
			.then((response, rejection) => {
				if (response.data) {
					setFetchedResults((prev) => [...prev, ...response.data[0].productList]);
					dispatch(increaseOffset(12));
					dispatch(setLoading(false));
				}
				if (rejection) {
					dispatch(setLoading(false));
					dispatch(
						showSnackbar({
							snackData: {
								type: 'error',
								title: 'Could not load products',
								message: `${rejection.message}. Please try again soon.`
							}
						})
					);
					return console.warn('Loading results was rejected:', rejection.message);
				}
			})
			.catch((err) => {
				dispatch(setLoading(false));
				dispatch(
					showSnackbar({
						snackData: {
							type: 'error',
							title: 'Could not load products',
							message: `${err.message}. Please try again soon.`,
							duration: 12000
						}
					})
				);
				return console.error('Error loading products:', err.message);
			});
	}, [currentPathname, dispatch, offset]);

	// hide filters panel on unmount
	useEffect(() => {
		return () => {
			if (showFiltersPanel) dispatch(hideFiltersPanel());
		};
	}, [showFiltersPanel, dispatch]);

	//
	useEffect(() => {
		if (appliedFilters.length) setDisplayedResults(filteredResults);
		else setDisplayedResults(fetchedResults);
	}, [fetchedResults, filteredResults, appliedFilters]);

	// filter displayed results by applied filters
	useEffect(() => {
		if (appliedFilters.length > 0) {
			setFilteredResults(
				fetchedResults.filter((result) =>
					appliedFilters.every(
						(filter) => result.tags !== null && result.tags.indexOf(filter.value) >= 0
					)
				)
			);
		} else {
			setFilteredResults([]);
		}
	}, [appliedFilters, fetchedResults]);

	// keep searching for products if filters applied and no products returned...
	useEffect(() => {
		if (appliedFilters.length && displayedResults.length < 12) fetchProducts();
	}, [appliedFilters.length, displayedResults.length, fetchProducts]);

	return (
		<>
			<Helmet>
				<title>
					{!loadingInitially
						? `Vomad Guide: Vegan ${categoryData.name} Products`
						: 'Vomad Guide: Find Vegan Products Near You'}
				</title>
				<meta
					name="description"
					content="Apply up to 20 different filters to thousands of results to find the plant-based product you're looking for."
				/>
				<meta
					name="keywords"
					content="plant based,plant-based,vegetarian,flexitarian,vegan brands, local brands, no oil, no added sugar, no salt, organic, gluten free, nut free, peanut free, soy free, "
				/>
			</Helmet>
			<ScrollToTopOnMount />
			{!loadingInitially ? (
				<Hero hide={showFiltersPanel}>
					<Heading>Vegan {categoryData.name}</Heading>
					<SubHeading>
						There are {categoryData.totalProducts} vegan {categoryData.name.toLowerCase()}{' '}
						products within Australia from {categoryData.totalBrands} brands.
					</SubHeading>
					<Footer />
				</Hero>
			) : (
				<HeroSkeleton hide={showFiltersPanel} />
			)}
			<FiltersBar loading={loadingInitially} breadcrumbs={categoryData.breadcrumbs} />
			<InfiniteScroll
				className={clsx(styles.container, {
					[styles.containerShift]: showFiltersPanel
				})}
				dataLength={fetchedResults.length}
				next={fetchProducts}
				hasMore={fetchedResults.length < categoryData.totalProducts}
				scrollThreshold="300px"
				endMessage={!loadingInitially && <ResultsListEndMessage />}
			>
				{!loadingInitially
					? displayedResults.map((result) => (
							<Link
								key={Number(result.productId)}
								className={styles.productLink}
								to={productLink.pathname
									.replace(':id', result.productId)
									.replace(
										':name',
										toKebabCase(result.brandName + '-' + result.productName)
									)}
							>
								<ResultCard result={result} />
							</Link>
					  ))
					: [...Array(12)].map((_, skel) => <ResultSkeleton key={skel} />)}
			</InfiniteScroll>
			{!loadingInitially && fetchedResults.length < categoryData.totalProducts && (
				<ResultsListSpinner />
			)}
			<FiltersPanel />
			<BottomNav />
			<Route
				path={productLink.pathname}
				children={({ match }) => <ProductModal show={Boolean(match)} />}
			/>
		</>
	);
}

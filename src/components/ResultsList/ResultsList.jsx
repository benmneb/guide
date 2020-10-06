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
import debounce from 'lodash.debounce';
import { useIsFirstRender } from '../../utils/isFirstRender';
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
	const isFirstRender = useIsFirstRender();
	const showFiltersPanel = useSelector((state) => state.ui.showFiltersPanel);
	const appliedFilters = useSelector((state) => state.results.appliedFilters);
	const offset = useSelector((state) => state.results.offset);
	const [fetchedResults, setFetchedResults] = useState([]);
	const loadingInitially = !fetchedResults.length > 0 && isFirstRender;
	const [categoryData, setCategoryData] = useState({});
	const [currentPathname, setCurrentPathname] = useState('');
	const [releventFilters, setReleventFilters] = useState('');

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

			async function initialFetch() {
				if (mounted) dispatch(setLoading(true));
				try {
					const response = await axios.get(
						`https://api.vomad.guide/category${releventPathname}/0`,
						{
							cancelToken: source.token
						}
					);
					const results = await response.data[0];
					if (mounted) {
						const breadcrumbsArr = Array(String(results.breadcrumbs).split('@'))[0];
						setCategoryData({
							name: String(breadcrumbsArr[breadcrumbsArr.length - 1]),
							totalProducts: results.totalproducts,
							totalBrands: results.totalbrands,
							breadcrumbs: breadcrumbsArr,
							fullCount: Number(results.fullcount)
						});
						setCurrentPathname(releventPathname);
						setFetchedResults(results.productList);
						scrollToTopNow();
						dispatch(setOffset(12));
						dispatch(setLoading(false));
					}
				} catch (err) {
					if (mounted) {
						dispatch(setLoading(false));
						dispatch(
							showSnackbar({
								snackData: {
									type: 'error',
									title: 'Could not load products',
									message: `${err.message}. Please try again soon.`
								}
							})
						);
						console.warn('Loading results was rejected:', err.message);
					}
				}
			}

			initialFetch();
		}

		return () => {
			mounted = false;
			dispatch(setLoading(false));
			source.cancel('Results list cancelled during clean-up');
		};
	}, [location.pathname, currentPathname, dispatch]);

	// fetch more products on scroll
	const fetchMoreProducts = useCallback(async () => {
		dispatch(setLoading(true));

		try {
			const response = await axios.get(
				`https://api.vomad.guide/category${currentPathname}/${offset}/${releventFilters}`
			);
			const results = await response.data[0];
			if (results) {
				setFetchedResults((prev) => [...prev, ...results.productList]);
				dispatch(increaseOffset(12));
				dispatch(setLoading(false));
			}
		} catch (err) {
			dispatch(setLoading(false));
			dispatch(
				showSnackbar({
					snackData: {
						type: 'error',
						title: 'Could not load products',
						message: `${err.message}. Please try again soon.`
					}
				})
			);
			return console.warn('Loading results was rejected:', err.message);
		}
	}, [currentPathname, dispatch, offset, releventFilters]);

	// hide filters panel on unmount
	useEffect(() => {
		return () => {
			if (showFiltersPanel) dispatch(hideFiltersPanel());
		};
	}, [showFiltersPanel, dispatch]);

	// NEW filter dispalyd tesuls by applied filters
	useEffect(() => {
		if (appliedFilters.length) {
			let tagnames = `?tag=${appliedFilters[0].id}`;
			for (let i = 1; i < appliedFilters.length; i++) {
				tagnames += `&tag=${appliedFilters[i].id}`;
			}
			setReleventFilters(tagnames);
		} else {
			setReleventFilters('');
		}
	}, [appliedFilters, setReleventFilters]);

	// NEW set filtered results if filters applied
	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();
		const categoryArr = location.pathname.split('/');
		const releventPathname = `/${categoryArr[1]}/${categoryArr[2]}`;

		if (appliedFilters.length) {
			dispatch(setLoading(true));

			async function fetchIfFilters() {
				try {
					const response = await axios.get(
						`https://api.vomad.guide/category${releventPathname}/0/${releventFilters}`,
						{
							cancelToken: source.token
						}
					);
					const results = await response.data[0];
					if (mounted) {
						if (results === undefined) {
							setFetchedResults([]);
							setCategoryData((prev) => ({
								...prev,
								fullCount: -1
							}));
							dispatch(setLoading(false));
						} else {
							setFetchedResults(results.productList);
							setCategoryData((prev) => ({
								...prev,
								fullCount: Number(results.fullcount)
							}));
							console.info(Number(results.fullcount));
							dispatch(setOffset(12));
							dispatch(setLoading(false));
						}
					}
				} catch (err) {
					if (mounted) {
						dispatch(setLoading(false));
						dispatch(
							showSnackbar({
								snackData: {
									type: 'error',
									title: 'Could not load products',
									message: `${err.message}. Please try again soon.`
								}
							})
						);
						console.error('Error loading products:', err.message);
					}
				}
			}

			const debounceFetchIfFilters = debounce(fetchIfFilters, 1000);
			debounceFetchIfFilters();
		}

		if (appliedFilters.length === 0 && !isFirstRender) {
			dispatch(setLoading(true));

			async function fetchIfJustRemovedFilters() {
				try {
					const response = await axios.get(
						`https://api.vomad.guide/category${releventPathname}/0`,
						{
							cancelToken: source.token
						}
					);
					const results = await response.data[0];
					if (mounted && results) {
						setFetchedResults(results.productList);
						setCategoryData((prev) => ({
							...prev,
							fullCount: Number(results.fullcount)
						}));
						dispatch(setOffset(12));
						dispatch(setLoading(false));
					}
				} catch (err) {
					if (mounted) {
						dispatch(setLoading(false));
						dispatch(
							showSnackbar({
								snackData: {
									type: 'error',
									title: 'Could not load products',
									message: `${err.message}. Please try again soon.`
								}
							})
						);
						console.error('Error loading products:', err.message);
					}
				}
			}

			const debouncefetchIfJustRemovedFilters = debounce(fetchIfJustRemovedFilters, 1000);
			debouncefetchIfJustRemovedFilters();
		}

		return () => {
			mounted = false;
			dispatch(setLoading(false));
			source.cancel('Second results list cancelled during clean-up');
		};
		//eslint-disable-next-line
	}, [releventFilters]);

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
				next={fetchMoreProducts}
				hasMore={fetchedResults.length < categoryData.fullCount}
				scrollThreshold="600px"
				endMessage={!loadingInitially && <ResultsListEndMessage />}
			>
				{!loadingInitially
					? fetchedResults.map((result) => (
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
					: [...Array(12)].map((_, i) => <ResultSkeleton key={i} />)}
			</InfiniteScroll>
			{!loadingInitially && fetchedResults.length < categoryData.fullCount && (
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

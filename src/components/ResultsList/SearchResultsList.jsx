import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet';
import clsx from 'clsx';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, Route, useLocation, useParams } from 'react-router-dom';
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

export default function SearchResultsList() {
	const styles = useStyles();
	const dispatch = useDispatch();
	const location = useLocation();
	const showFiltersPanel = useSelector((state) => state.ui.showFiltersPanel);
	const appliedFilters = useSelector((state) => state.results.appliedFilters);
	const offset = useSelector((state) => state.results.offset);
	const [fetchedResults, setFetchedResults] = useState([]);
	const [loadingInitially, setLoadingInitially] = useState(true);
	const [searchResultsData, setSearchResultsData] = useState({});
	const [filtersQueryString, setFiltersQueryString] = useState('');
	const isFirstRender = useRef(true);
	const currentPathname = useRef('');
	const searchTerm = useRef('');
	const { term } = useParams();

	const productLink = usePrepareLink({
		to: '/:name/:id',
		isRelativePath: true
	});

	// set appropriate pathname for axios calls when query changes
	useEffect(() => {
		searchTerm.current = term;
	}, [term]);

	// fetch results on page load
	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (searchTerm.current !== currentPathname.current) {
			async function initialFetch() {
				if (mounted) dispatch(setLoading(true));
				try {
					const response = await axios.get(
						`https://api.vomad.guide/search/${searchTerm.current}/0`,
						{
							cancelToken: source.token
						}
					);
					const results = await response.data[0];
					if (mounted) {
						currentPathname.current = searchTerm.current;
						const queryString = searchTerm.current.replace(/[+]/g, ' ');
						scrollToTopNow();
						dispatch(setLoading(false));
						if (results) {
							setSearchResultsData({
								query: queryString,
								totalProducts: results.fullcount,
								breadcrumbs: queryString,
								fullCount: Number(results.fullcount)
							});
							setFetchedResults(results.productList);
							dispatch(setOffset(12));
						} else if (results === undefined) {
							setSearchResultsData({
								query: queryString,
								totalProducts: 0,
								breadcrumbs: queryString,
								fullCount: 0
							});
							setFetchedResults([]);
							setLoadingInitially(false);
							isFirstRender.current = false;
						}
					}
				} catch (err) {
					if (mounted) {
						dispatch(setLoading(false));
						dispatch(
							showSnackbar({
								type: 'error',
								title: 'Could not load products',
								message: `${err.message}. Please try again soon.`
							})
						);
						console.error('Loading results was rejected:', err.message);
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
	}, [location.pathname, dispatch]);

	// fetch more results on scroll
	const fetchMoreProducts = useCallback(async () => {
		dispatch(setLoading(true));

		try {
			const response = await axios.get(
				`https://api.vomad.guide/search/${searchTerm.current}/${offset}/${filtersQueryString}`
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
					type: 'error',
					title: 'Could not load products',
					message: `${err.message}. Please try again soon.`
				})
			);
			return console.error('Loading results was rejected:', err.message);
		}
	}, [dispatch, offset, filtersQueryString]);

	// fetch results after applying/removing filters
	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (filtersQueryString.length) {
			dispatch(setLoading(true));

			async function fetchIfFilters() {
				try {
					const response = await axios.get(
						`https://api.vomad.guide/search/${searchTerm.current}/0/${filtersQueryString}`,
						{
							cancelToken: source.token
						}
					);
					const results = await response.data[0];
					if (mounted) {
						if (results === undefined) {
							setFetchedResults([]);
							setSearchResultsData((prev) => ({
								...prev,
								fullCount: -1
							}));
							dispatch(setLoading(false));
						} else {
							setFetchedResults(results.productList);
							setSearchResultsData((prev) => ({
								...prev,
								fullCount: Number(results.fullcount)
							}));
							dispatch(setOffset(12));
							dispatch(setLoading(false));
						}
					}
				} catch (err) {
					if (mounted) {
						dispatch(setLoading(false));
						dispatch(
							showSnackbar({
								type: 'error',
								title: 'Could not load products',
								message: `${err.message}. Please try again soon.`
							})
						);
						console.error('Error loading products:', err.message);
					}
				}
			}

			const debounceFetchIfFilters = debounce(fetchIfFilters, 1000);
			debounceFetchIfFilters();
		}

		if (!filtersQueryString.length && !isFirstRender.current) {
			dispatch(setLoading(true));

			async function fetchIfJustRemovedFilters() {
				try {
					const response = await axios.get(
						`https://api.vomad.guide/search/${searchTerm.current}/0`,
						{
							cancelToken: source.token
						}
					);
					const results = await response.data[0];
					if (mounted) {
						setFetchedResults(results.productList);
						setSearchResultsData((prev) => ({
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
								type: 'error',
								title: 'Could not load products',
								message: `${err.message}. Please try again soon.`
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
	}, [filtersQueryString, dispatch]);

	// construct API query string to fetch results based on filters
	useEffect(() => {
		if (appliedFilters.length) {
			let tagnames = `?tag=${appliedFilters[0].id}`;
			for (let i = 1; i < appliedFilters.length; i++) {
				tagnames += `&tag=${appliedFilters[i].id}`;
			}
			setFiltersQueryString(tagnames);
		} else {
			setFiltersQueryString('');
		}
	}, [appliedFilters, setFiltersQueryString]);

	// let everything know once first page load is complete
	useEffect(() => {
		if (fetchedResults.length) {
			setLoadingInitially(false);
			isFirstRender.current = false;
		}
	}, [fetchedResults.length]);

	// hide filters panel on unmount
	useEffect(() => {
		return () => {
			if (showFiltersPanel) dispatch(hideFiltersPanel());
		};
	}, [showFiltersPanel, dispatch]);

	return (
		<>
			<Helmet>
				<title>
					{!loadingInitially
						? `Vomad Guide: Vegan ${
								searchResultsData.query.charAt(0).toUpperCase() +
								searchResultsData.query.slice(1)
						  } Products`
						: 'Vomad Guide: Find Vegan Products Near You'}
				</title>
				<meta
					name="description"
					content="Apply up to 20 different filters to thousands of results to find the plant-based product you're looking for."
				/>
				<meta
					name="keywords"
					content="plant based,plant-based,vegetarian,flexitarian,vegan brands,local brands,no oil,no added sugar,no salt,organic,gluten free,wheat free,nut free,peanut free,soy free,lupin free,sesame free,mustard free,alcohol free,phthalate free,paraben free,sls free,list,product list,shopping,grocery,shopping list,grocery list"
				/>
			</Helmet>
			<ScrollToTopOnMount />
			{!loadingInitially ? (
				<Hero hide={showFiltersPanel}>
					<Heading>Vegan {searchResultsData.query}</Heading>
					<SubHeading>
						There are {searchResultsData.totalProducts} vegan{' '}
						{searchResultsData.query.toLowerCase()} products within Australia.
					</SubHeading>
					<Footer />
				</Hero>
			) : (
				<HeroSkeleton hide={showFiltersPanel} />
			)}
			<FiltersBar
				loading={loadingInitially}
				breadcrumbs={searchResultsData.breadcrumbs}
				showFilterButton={!loadingInitially}
			/>
			<InfiniteScroll
				className={clsx(styles.container, {
					[styles.containerShift]: showFiltersPanel
				})}
				dataLength={fetchedResults.length}
				next={fetchMoreProducts}
				hasMore={fetchedResults.length < searchResultsData.fullCount}
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
										toKebabCase(`${result.brandName}-${result.productName}`)
									)}
							>
								<ResultCard result={result} />
							</Link>
					  ))
					: [...Array(12)].map((_, i) => <ResultSkeleton key={i} />)}
			</InfiniteScroll>
			{!loadingInitially && fetchedResults.length < searchResultsData.fullCount && (
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

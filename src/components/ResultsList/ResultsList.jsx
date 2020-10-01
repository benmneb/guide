import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { sortResultsBy, orderResultsBy } from '../../store/actions';
import { Link, Route, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ResultCard from './ResultCard';
import Hero, { Heading, SubHeading, Footer } from '../Hero/Hero';
import FiltersBar from './FiltersBar';
import FiltersPanel from '../FiltersPanel/FiltersPanel';
import AddProductsFab from './AddProductsFab';
import { showSnackbar } from '../../store/actions';
import BottomNav from './BottomNav';
import ResultSkeleton from './ResultSkeleton';
import HeroSkeleton from '../Hero/HeroSkeleton';
import ProductModal from '../ProductModal/ProductModal';
import { usePrepareLink } from '../../utils/routing';
import ScrollToTopOnMount, { scrollToTopNow } from '../../utils/ScrollToTop';
import { toKebabCase } from '../../utils/changeCase';

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

const ResultsList = ({
	showFiltersPanel,
	onHideFiltersPanel,
	appliedFilters,
	setLoading
}) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const location = useLocation();
	const [fetchedResults, setFetchedResults] = useState([]);
	const [filteredResults, setFilteredResults] = useState([]);
	const [displayedResults, setDisplayedResults] = useState([]);
	const [categoryData, setCategoryData] = useState({});
	const loading = !fetchedResults.length > 0;
	const [currentPathname, setCurrentPathname] = useState('');
	const [sortResultsFunc, setSortResultsFunc] = useState(null);
	const sortBy = useSelector((state) => state.results.sortResultsBy);
	const orderBy = useSelector((state) => state.results.orderResultsBy);

	const productLink = usePrepareLink({
		to: '/:name/:id',
		isRelativePath: true
	});

	useEffect(() => {
		if (appliedFilters.length) setDisplayedResults(filteredResults);
		else setDisplayedResults(fetchedResults);
	}, [fetchedResults, filteredResults, appliedFilters]);

	//axios call to get products
	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();
		const categoryArr = location.pathname.split('/');
		const releventPathname = `/${categoryArr[1]}/${categoryArr[2]}`;

		if (releventPathname !== currentPathname) {
			setLoading(true);
			axios
				.get(`https://api.vomad.guide/category${releventPathname}/0`, {
					cancelToken: source.token
				})
				.then((response, rejection) => {
					if (mounted) {
						if (rejection) {
							setLoading(false);
							dispatch(
								showSnackbar({
									snackData: {
										type: 'error',
										title: 'Could not load products',
										message: `${rejection.message}. Please try again soon.`,
										duration: 12000
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
						setLoading(false);
					}
				})
				.catch((err) => {
					if (mounted) {
						setLoading(false);
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
			setLoading(false);
			source.cancel('Results list cancelled during clean-up');
		};
	}, [location.pathname, currentPathname, setLoading, dispatch]);

	// hide filters panel on unmount
	useEffect(() => {
		return () => {
			if (showFiltersPanel) onHideFiltersPanel();
		};
	}, [showFiltersPanel, onHideFiltersPanel]);

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

	// sort/order by
	useEffect(() => {
		if (sortBy === 'Popularity' && orderBy === 'Descending') {
			setSortResultsFunc(() => (a, b) => b.averageRating - a.averageRating);
		}
		if (sortBy === 'Popularity' && orderBy === 'Ascending') {
			setSortResultsFunc(() => (a, b) => a.averageRating - b.averageRating);
		}
		if (sortBy === 'Alphabetical' && orderBy === 'Descending') {
			setSortResultsFunc(() => (a, b) => {
				const brandA = a.brandName.toUpperCase();
				const brandB = b.brandName.toUpperCase();
				const itemA = a.productName.toUpperCase();
				const itemB = b.productName.toUpperCase();

				if (brandA < brandB) return -1;
				if (brandA > brandB) return 1;

				if (brandA === brandB) {
					if (itemA < itemB) return -1;
					if (itemA > itemB) return 1;
				}
			});
		}
		if (sortBy === 'Alphabetical' && orderBy === 'Ascending') {
			setSortResultsFunc(() => (a, b) => {
				const brandA = a.brandName.toUpperCase();
				const brandB = b.brandName.toUpperCase();
				const itemA = a.productName.toUpperCase();
				const itemB = b.productName.toUpperCase();

				if (brandA > brandB) return -1;
				if (brandA < brandB) return 1;

				if (brandA === brandB) {
					if (itemA > itemB) return -1;
					if (itemA < itemB) return 1;
				}
			});
		}
	}, [orderBy, sortBy]);

	// set to default sort/order options on unmount
	useEffect(() => {
		return () => {
			dispatch(sortResultsBy('Popularity'));
			dispatch(orderResultsBy('Descending'));
		};
	}, [dispatch]);

	return (
		<>
			<ScrollToTopOnMount />
			{!loading ? (
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
			<FiltersBar loading={loading} breadcrumbs={categoryData.breadcrumbs} />
			<section
				className={clsx(styles.container, {
					[styles.containerShift]: showFiltersPanel
				})}
			>
				{!loading
					? displayedResults.sort(sortResultsFunc).map((result) => (
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
			</section>
			<AddProductsFab />
			<FiltersPanel />
			<BottomNav />
			<Route
				path={productLink.pathname}
				children={({ match }) => {
					return <ProductModal show={Boolean(match)} />;
				}}
			/>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.ui.showFiltersPanel,
		appliedFilters: state.results.appliedFilters,
		isLoading: state.results.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onHideFiltersPanel: () => dispatch(actionCreators.hideFiltersPanel()),
		setLoading: (state) => dispatch(actionCreators.setLoading(state))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Route, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ResultCard from './ResultCard';
import Hero, { Heading, SubHeading, Footer } from '../Hero/Hero';
import FiltersBar from './FiltersBar';
import FiltersPanel from '../FiltersPanel/FiltersPanel';
import AddProductsFab from './AddProductsFab';
import * as actionCreators from '../../store/actions';
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
	const location = useLocation();
	const [fetchedResults, setFetchedResults] = useState([]);
	const [filteredResults, setFilteredResults] = useState([]);
	const displayedResults = filteredResults ? filteredResults : fetchedResults;
	const [categoryData, setCategoryData] = useState({});
	const loading = !fetchedResults.length > 0;
	const [currentPathname, setCurrentPathname] = useState('');

	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();
		const categoryArr = location.pathname.split('/');
		const releventPathname = '/' + categoryArr[1] + '/' + categoryArr[2];

		if (releventPathname !== currentPathname) {
			axios
				.get('https://api.vomad.guide/category' + releventPathname, {
					cancelToken: source.token
				})
				.then(mounted && setLoading(true))
				.then((response) => {
					if (mounted) {
						const breadcrumbsArr = Array(
							String(response.data[0].breadcrumbs).split(',')
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
					if (mounted) console.error(err);
				});
		}

		return () => {
			mounted = false;
			source.cancel('Results list cancelled during clean-up');
		};
	}, [location.pathname, currentPathname, setLoading]);

	useEffect(() => {
		return () => {
			if (showFiltersPanel) onHideFiltersPanel();
		};
	}, [showFiltersPanel, onHideFiltersPanel]);

	// fucked filters :'(
	useEffect(() => {
		if (appliedFilters.length > 0) {
			setFilteredResults(
				fetchedResults.filter(
					(result) =>
						result.tags !== null && result.tags.includes(appliedFilters[0].value)
				)
			);
		} else {
			setFilteredResults(null);
		}
	}, [appliedFilters, fetchedResults]);

	const productLink = usePrepareLink({
		to: '/:name/:id',
		isRelativePath: true
	});

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
					<Footer forCategory />
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
		showFiltersPanel: state.showFiltersPanel,
		appliedFilters: state.appliedFilters,
		isLoading: state.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onHideFiltersPanel: () => dispatch(actionCreators.hideFiltersPanel()),
		setLoading: (state) => dispatch(actionCreators.setLoading(state))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);

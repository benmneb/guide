import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
	}
}));

const ResultsList = ({
	showFiltersPanel,
	onToggleProductModal,
	onHideFiltersPanel,
	appliedFilters
}) => {
	const styles = useStyles();
	const location = useLocation();
	const [fetchedResults, setFetchedResults] = useState([]);
	const [filteredResults, setFilteredResults] = useState([]);
	const [categoryName, setCategoryName] = useState('');

	const displayedResults = filteredResults ? filteredResults : fetchedResults;

	const loading = !fetchedResults.length > 0;

	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();
		const category = location.pathname;

		axios
			.get('https://api.vomad.guide/category' + category, {
				cancelToken: source.token
			})
			.then((response) => {
				if (mounted) {
					setFetchedResults(response.data[0].productList);
					setCategoryName(response.data[0].categoryName);
				}
			})
			.catch((err) => {
				if (mounted) console.error(err);
			});

		return () => {
			mounted = false;
			source.cancel('Results list cancelled during clean-up');
		};
	}, [location.pathname]);

	useEffect(() => {
		return () => {
			if (showFiltersPanel) onHideFiltersPanel();
		};
	}, [showFiltersPanel, onHideFiltersPanel]);

	// fucked filters :'(
	useEffect(() => {
		if (!loading) {
			setFilteredResults(
				fetchedResults.filter(
					(result) =>
						result.tags !== null && result.tags.includes(appliedFilters[0].value)
				)
			);
		} else {
			setFilteredResults(null);
		}
	}, [appliedFilters, fetchedResults, loading]);

	return (
		<>
			{!loading ? (
				<Hero hide={showFiltersPanel}>
					<Heading>Vegan {categoryName}</Heading>
					<SubHeading>
						There are XX vegan {categoryName.toLowerCase()} products within Australia from
						XX brands.
					</SubHeading>
					<Footer forCategory />
				</Hero>
			) : (
				<HeroSkeleton hide={showFiltersPanel} />
			)}
			<FiltersBar />
			<section
				className={clsx(styles.container, {
					[styles.containerShift]: showFiltersPanel
				})}
			>
				{!loading
					? displayedResults.map((result) => (
							<ResultCard
								key={Number(result.productId)}
								result={result}
								clicked={() => onToggleProductModal(Number(result.productId))}
							/>
					  ))
					: [1, 2, 3, 4, 5, 6, 7, 8].map((skel) => <ResultSkeleton key={skel} />)}
			</section>
			<AddProductsFab />
			<FiltersPanel />
			<BottomNav />
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel,
		appliedFilters: state.appliedFilters
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleProductModal: (id) => dispatch(actionCreators.toggleProductModal(id)),
		onHideFiltersPanel: () => dispatch(actionCreators.hideFiltersPanel())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);

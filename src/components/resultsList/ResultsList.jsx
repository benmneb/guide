import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Result from './Result';
import Hero, { Heading, SubHeading, Footer } from '../Hero/Hero';
import FiltersBar from '../AppBar/FiltersBar';
import FiltersPanel from '../FiltersPanel/FiltersPanel';
import AddProductsFab from './AddProductsFab';
import * as actionCreators from '../../store/actions';
import peanuts from '../../assets/images/peanuts.jpg';
import BottomNav from './BottomNav';
import ResultSkeleton from './ResultSkeleton';

const drawerWidth = 395;

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
		marginRight: drawerWidth
	},
	fab: {
		position: 'fixed',
		right: theme.spacing(6),
		bottom: theme.spacing(4)
	}
}));

const ResultsList = ({ showFiltersPanel, onToggleProductModal, onHideFiltersPanel }) => {
	const styles = useStyles();
	const [results, setResults] = useState([]);

	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		axios
			.get('https://api.vomad.guide/', {
				cancelToken: source.token
			})
			.then((response) => {
				if (mounted) setResults(response.data);
			})
			.catch((err) => {
				if (mounted) console.error(err);
			});

		return () => {
			mounted = false;
			source.cancel('Results list cancelled during clean-up');
		};
	}, []);

	useEffect(() => {
		return () => {
			if (showFiltersPanel) onHideFiltersPanel();
		};
	}, [showFiltersPanel, onHideFiltersPanel]);

	return (
		<>
			<Hero bgImage={peanuts} hide={showFiltersPanel}>
				<Heading>Vegan Nut Butters & Spreads</Heading>
				<SubHeading>
					There are 64 vegan nut butters & spreads within Australia from brands like
					Kraft, Pics, Bega and 14 more.
				</SubHeading>
				<Footer forCategory />
			</Hero>
			<FiltersBar />
			<section
				className={clsx(styles.container, {
					[styles.containerShift]: showFiltersPanel
				})}
			>
				{results.length > 0
					? results.map((result) => (
							<Result
								key={Number(result.product_id)}
								image={result.image_src}
								brand={result.brand_name}
								name={result.product_name}
								avgRating={Number(result.average_rating)}
								amtRatings={Number(result.rating_count)}
								productId={Number(result.product_id)}
								clicked={() => onToggleProductModal(Number(result.product_id))}
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
		showFiltersPanel: state.showFiltersPanel
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleProductModal: (id) => dispatch(actionCreators.toggleProductModal(id)),
		onHideFiltersPanel: () => dispatch(actionCreators.hideFiltersPanel())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Result from './Result';
import Hero, { Heading, SubHeading, Footer } from '../hero/Hero';
import FiltersBar from '../AppBar/FiltersBar';
import AddProductsFab from './AddProductsFab';
import * as actionCreators from '../../store/actions';
// import { results } from '../../assets/results';
import peanuts from '../../assets/images/peanuts.jpg';

const drawerWidth = 430;

const useStyles = makeStyles((theme) => ({
	container: {
		flexGrow: 1,
		padding: theme.spacing(3),
		display: 'grid',
		gridGap: 20,
		gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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

const ResultsList = (props) => {
	const styles = useStyles();
	const { showFiltersPanel, onToggleProductModal } = props;
	const [results, setResults] = useState([]);

	useEffect(() => {
		axios
			.get('http://GuideApiServer-env.eba-u5p3tcik.us-east-2.elasticbeanstalk.com/')
			.then((response) => setResults(response.data))
			.catch((err) => err);
	}, []);

	const renderedList = results.map((result) => {
		return (
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
		);
	});

	return (
		<>
			<Hero bgImage={peanuts}>
				<Heading>Vegan Nut Butters & Spreads</Heading>
				<SubHeading>
					There are 64 vegan nut butters & spreads within Australia from brands like
					Kraft, Pics, Bega and 14 more.
				</SubHeading>
				<Footer forCategory />
			</Hero>
			<FiltersBar />
			<div
				className={clsx(styles.container, {
					[styles.containerShift]: showFiltersPanel
				})}
			>
				{renderedList}
			</div>
			<AddProductsFab />
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel,
		showProductModal: state.showProductModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleProductModal: (id) => dispatch(actionCreators.toggleProductModal(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);

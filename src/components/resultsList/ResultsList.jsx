import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Result from './Result';
import Hero, { Heading, SubHeading, Footer } from '../Hero/Hero';
import FiltersBar from '../AppBar/FiltersBar';
import FiltersPanel from '../FiltersPanel/FiltersPanel';
import AddProductsFab from './AddProductsFab';
import * as actionCreators from '../../store/actions';
import { results } from '../../assets/results';
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

	function handleResultClick() {
		onToggleProductModal();
	}

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
			<div
				className={clsx(styles.container, {
					[styles.containerShift]: showFiltersPanel
				})}
			>
				{results.map((result) => (
					<Result
						key={result.id}
						image={result.image}
						brand={result.brand}
						name={result.name}
						clicked={handleResultClick}
						avgRating={result.avgRating}
						amtRatings={result.amtRatings}
					/>
				))}
			</div>
			<AddProductsFab />
			<FiltersPanel />
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
		onToggleProductModal: () => dispatch(actionCreators.toggleProductModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);

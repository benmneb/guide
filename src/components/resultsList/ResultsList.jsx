import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Result from './Result';
import Hero, { Heading, SubHeading, Footer } from '../Hero/Hero';
import FiltersBar from '../AppBar/FiltersBar';
import AddProductsFab from './AddProductsFab';
import * as actionCreators from '../../store/actions';

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

	return (
		<>
			<Hero>
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
					[styles.containerShift]: props.showFiltersPanel
				})}
			>
				<Result
					image="https://mouthsofmums.com.au/wp-content/uploads/2016/05/046731-300x300.jpg"
					brand="Kraft"
					name="Peanut Butter - Crunchy"
					clicked={() => props.onToggleProductModal()}
				/>
				<Result
					image="https://southburnett.com.au/news2/wp-content/uploads/2017/01/kraft1.jpg"
					brand="Kraft"
					name="Peanut Butter - Smooth"
					clicked={() => props.onToggleProductModal()}
				/>
				<Result
					image="https://shop.countdown.co.nz/Content/ProductImages/zoom/9421901881054.jpg/Pics-Peanut-Butter-Crunchy.jpg"
					brand="Pic's"
					name="Really Good Peanut Butter - Crunchy Freshly Roasted and Lovingly Squashed"
					clicked={() => props.onToggleProductModal()}
				/>
				<Result
					image="https://i5.walmartimages.com/asr/c7806ff6-536e-4f37-8653-95d08d630fdb_1.5d608b379a7ef87af70460cb56c02bcf.jpeg"
					brand="Tofurky"
					name="Deli Slices - Original Recipe Savoury Plant-Based"
					clicked={() => props.onToggleProductModal()}
				/>
				<Result
					image="https://mouthsofmums.com.au/wp-content/uploads/2016/05/046731-300x300.jpg"
					brand="Kraft"
					name="Peanut Butter - Crunchy"
					clicked={() => props.onToggleProductModal()}
				/>
				<Result
					image="https://southburnett.com.au/news2/wp-content/uploads/2017/01/kraft1.jpg"
					brand="Kraft"
					name="Peanut Butter - Smooth"
					clicked={() => props.onToggleProductModal()}
				/>
				<Result
					image="https://shop.countdown.co.nz/Content/ProductImages/zoom/9421901881054.jpg/Pics-Peanut-Butter-Crunchy.jpg"
					brand="Pic's"
					name="Peanut Butter - Crunchy"
					clicked={() => props.onToggleProductModal()}
				/>
				<Result
					image="https://i5.walmartimages.com/asr/c7806ff6-536e-4f37-8653-95d08d630fdb_1.5d608b379a7ef87af70460cb56c02bcf.jpeg"
					brand="Tofurky"
					name="Deli Slices - Original Recipe Savoury Plant-Based"
					clicked={() => props.onToggleProductModal()}
				/>
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
				<Result />
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
		onToggleProductModal: () => dispatch(actionCreators.toggleProductModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);

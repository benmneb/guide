import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Typography } from '@material-ui/core';

import FilterButton from './FilterButton';
import { ingredients, allergens, tags } from '../../assets/filters';

const drawerWidth = 430;

const topPosition = 70;

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		position: 'sticky'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		top: topPosition,
		height: `calc(100vh - ${topPosition}px)`,
		zIndex: 0,
		border: 'none'
	},
	filtersSection: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly'
	},
	filtersSectionFirstTitle: {
		paddingTop: 10,
		fontWeight: 'bold'
	},
	filtersSectionTitle: {
		paddingTop: 10,
		fontWeight: 'bold'
	}
}));

const FiltersPanel = (props) => {
	const styles = useStyles();

	return (
		<Drawer
			className={styles.drawer}
			variant="persistent"
			anchor="left"
			open={props.showFiltersPanel}
			classes={{
				paper: styles.drawerPaper
			}}
		>
			<Typography align="center" className={styles.filtersSectionFirstTitle}>
				Tags
			</Typography>
			<div className={styles.filtersSection}>
				{tags.map((tag) => (
					<FilterButton name={tag.name} tooltip={tag.tooltip} key={tag.name} />
				))}
			</div>
			<Typography align="center" className={styles.filtersSectionTitle}>
				Ingredients
			</Typography>
			<div className={styles.filtersSection}>
				{ingredients.map((ing) => (
					<FilterButton name={ing.name} tooltip={ing.tooltip} key={ing.name} />
				))}
			</div>
			<Typography align="center" className={styles.filtersSectionTitle}>
				Allergens
			</Typography>
			<div className={styles.filtersSection}>
				{allergens.map((allergen) => (
					<FilterButton
						name={allergen.name}
						tooltip={allergen.tooltip}
						key={allergen.name}
					/>
				))}
				<Typography variant="subtitle2" align="center">
					<p>
						Allergens are a guide only.
						<br />
						Always check the label before use.
					</p>
				</Typography>
			</div>
		</Drawer>
	);
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel
	};
};

export default connect(mapStateToProps)(FiltersPanel);

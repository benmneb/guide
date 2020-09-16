import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Typography, Grid, Box } from '@material-ui/core';
import SortBy from './SortBy';
import OrderBy from './OrderBy';
import FilterButton from './FilterButton';
import { ingredients, allergens, tags } from '../../assets/filters';

const useStyles = makeStyles((theme) => ({
	drawer: {
		flexShrink: 0
	},
	drawerPaper: {
		right: 0,
		zIndex: theme.zIndex.appBar,
		...theme.mixins.filtersPanel,
		[theme.breakpoints.only('xs')]: {
			display: 'flex',
			alignItems: 'center',
			height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`, // bottomNav height
			borderBottom: `1px solid rgba(0, 0, 0, 0.12);`
		},
		[theme.breakpoints.only('sm')]: {
			top: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
			height: `calc(100vh - ${
				theme.mixins.toolbar['@media (min-width:600px)'].minHeight * 2
			}px)`, // bottomNav height + filtersBar height
			borderTop: `1px solid rgba(0, 0, 0, 0.12);`,
			borderBottom: `1px solid rgba(0, 0, 0, 0.12);`
		},
		[theme.breakpoints.up('md')]: {
			top: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
			height: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
			borderTop: `1px solid rgba(0, 0, 0, 0.12);`
		}
	},
	filtersApplied: {
		[theme.breakpoints.only('sm')]: {
			top: theme.mixins.toolbar['@media (min-width:600px)'].minHeight + 48,
			height: `calc(100vh - ${
				theme.mixins.toolbar['@media (min-width:600px)'].minHeight * 2 + 48
			}px)` // bottomNav height * 2 + chips toolbar height
		},
		[theme.breakpoints.up('md')]: {
			top: theme.mixins.toolbar['@media (min-width:600px)'].minHeight + 48,
			height: `calc(100vh - ${
				theme.mixins.toolbar['@media (min-width:600px)'].minHeight + 48
			}px)`
		}
	},
	content: {
		maxWidth: theme.mixins.filtersPanel.width,
		[theme.breakpoints.only('xs')]: {
			margin: theme.spacing(0)
		},
		[theme.breakpoints.up('sm')]: {
			margin: theme.spacing(0, 2)
		}
	},
	filtersSectionTitle: {
		marginTop: theme.spacing(1)
	},
	subtitle1: {
		fontSize: theme.typography.subtitle2.fontSize
	}
}));

const FiltersPanel = ({ showFiltersPanel, appliedFilters }) => {
	const styles = useStyles();

	return (
		<Drawer
			className={styles.drawer}
			variant="persistent"
			anchor="right"
			open={showFiltersPanel}
			classes={{
				paper: clsx(styles.drawerPaper, {
					[styles.filtersApplied]: appliedFilters.length > 0
				})
			}}
		>
			<Box component="aside" className={styles.content}>
				<Typography align="center" className={styles.filtersSectionTitle}>
					Tags
				</Typography>
				<Grid container justify="space-evenly">
					{tags.map((tag) => (
						<FilterButton key={tag.name} filter={tag} />
					))}
				</Grid>
				<Typography align="center" className={styles.filtersSectionTitle}>
					Ingredients
				</Typography>
				<Grid container justify="space-evenly">
					{ingredients.map((ing) => (
						<FilterButton key={ing.name} filter={ing} />
					))}
				</Grid>
				<Typography align="center" className={styles.filtersSectionTitle}>
					Allergens
				</Typography>
				<Grid container justify="space-evenly">
					{allergens.map((allergen) => (
						<FilterButton key={allergen.name} filter={allergen} />
					))}
				</Grid>
				<Typography align="center" className={styles.filtersSectionTitle}>
					Sort by
				</Typography>
				<Grid container justify="space-evenly">
					<Grid item flexgrow="1">
						<SortBy />
					</Grid>
				</Grid>
				<Typography align="center" className={styles.filtersSectionTitle}>
					Order by
				</Typography>
				<Grid container justify="center">
					<OrderBy />
				</Grid>
				<Box margin={2}>
					<Typography
						component="footer"
						variant="subtitle1"
						classes={{ subtitle1: styles.subtitle1 }}
						paragraph
						align="center"
					>
						Allergens are a guide only.
						<br />
						Always check the label before use.
					</Typography>
				</Box>
			</Box>
		</Drawer>
	);
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel,
		appliedFilters: state.appliedFilters
	};
};

export default connect(mapStateToProps)(FiltersPanel);

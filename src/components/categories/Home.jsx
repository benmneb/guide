import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { GridListTile, GridListTileBar, Box } from '@material-ui/core';
import { subCat1s } from '../../assets/subCat1s';
import Hero, { Heading, SubHeading } from '../Hero/Hero';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: theme.palette.common.white,
		marginTop: theme.spacing(2),
		[theme.breakpoints.down('sm')]: {
			marginBottom: theme.spacing(8)
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: theme.spacing(7)
		}
	},
	container: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
		display: 'grid',
		[theme.breakpoints.up('xs')]: {
			gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))'
		},
		[theme.breakpoints.up('sm')]: {
			gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
		},
		[theme.breakpoints.up('md')]: {
			gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
		}
	},
	gridListTile: {
		height: 300,
		'&:hover img': {
			filter: 'brightness(100%)'
		}
	},
	image: {
		cursor: 'pointer',
		filter: 'brightness(85%)',
		transitionProperty: 'filter',
		transitionDuration: `${theme.transitions.duration.complex}ms`
	},
	titleBar: {
		position: 'absolute',
		top: '40%',
		height: '20%',
		cursor: 'pointer'
	},
	title: {
		color: theme.palette.common.white,
		fontSize: theme.typography.h6.fontSize,
		textAlign: 'center',
		lineHeight: theme.typography.body2.lineHeight
	}
}));

const SubCat1s = () => {
	const styles = useStyles();

	return (
		<>
			<Hero>
				<Heading>Find Vegan Products</Heading>
				<SubHeading>
					The Vomad Guide is a free crowd-sourced collection of 100% plant-based products.
					There are 12,815 vegan products in 212 categories in 576 stores and 54 online
					stores within Australia.
				</SubHeading>
			</Hero>
			<Box className={styles.root}>
				<Box className={styles.container}>
					{subCat1s.map((image) => (
						<GridListTile
							key={image.img}
							component="div"
							cols={1}
							className={styles.gridListTile}
						>
							<Link to="/food-drink/nut-butters-spreads">
								<img src={image.img} alt={image.title} className={styles.image} />
								<GridListTileBar
									titlePosition="top"
									title={image.title}
									className={styles.titleBar}
									classes={{
										title: styles.title
									}}
								/>
							</Link>
						</GridListTile>
					))}
				</Box>
			</Box>
		</>
	);
};

export default SubCat1s;

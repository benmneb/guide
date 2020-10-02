import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { GridListTile, GridListTileBar, Box } from '@material-ui/core';
import { subCat1s } from '../../assets/subCat1s';
import Hero, { Footer, Heading, SubHeading } from '../Hero/Hero';
import ScrollToTopOnMount from '../../utils/ScrollToTop';

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
		transitionDuration: `${theme.transitions.duration.complex}ms`,
		height: '100%',
		width: '100%',
		objectFit: 'cover',
		objectPosition: 'center'
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
			<Helmet>
				<title>Vomad Guide: Find Vegan Products Near You</title>
				<meta
					name="description"
					content="The Original Vegan Product Guide to Australia"
				/>
				<meta name="keywords" content="plant based,plant-based,vegetarian,flexitarian" />
			</Helmet>
			<ScrollToTopOnMount />
			<Hero>
				<Heading>Find Vegan Products</Heading>
				<SubHeading>
					The Vomad Guide is a free crowd-sourced collection of 100% plant-based products.
				</SubHeading>
				<Footer forPage="home">
					There are 12,815 vegan products in 212 categories from 663 brands in 576 stores
					and 54 online stores within Australia.
				</Footer>
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
							<Link to={'/' + image.prodType + '/' + image.url}>
								<Box height="100%" width="auto">
									<img src={image.img} alt={''} className={styles.image} />
								</Box>
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

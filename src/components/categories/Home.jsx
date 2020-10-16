import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { homeCats } from '../../assets/categories';
import Hero, { Footer, Heading, SubHeading } from '../Hero/Hero';
import CategoryTitleBar from './CategoryTitleBar';
import CategoryGridList from './CategoryGridList';
import ScrollToTopOnMount from '../../utils/ScrollToTop';

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(-4),
		[theme.breakpoints.down('sm')]: {
			marginBottom: theme.spacing(7)
		}
	},
	content: {
		marginTop: theme.spacing(4)
	}
}));

export default function Home() {
	const styles = useStyles();

	return (
		<>
			<Helmet>
				<title>Vomad Guide: Find Vegan Products Near You</title>
				<meta
					name="description"
					content="The original Vegan Product Guide to Australia and the best plant-based shopping list. Browse, search and find vegan products. Filter, review and find where to buy vegan groceries."
				/>
				<meta
					name="keywords"
					content="plant based,plant-based,vegetarian,flexitarian,list,product list,shopping,grocery,shopping list,grocery list"
				/>
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
			<Box className={styles.container}>
				{homeCats.map((category) => (
					<Box key={category.name} component="section" className={styles.content}>
						<CategoryTitleBar
							name={category.name}
							url={`/${category.prodType}/${category.url}`}
						/>
						<CategoryGridList category={category} />
					</Box>
				))}
			</Box>
		</>
	);
}

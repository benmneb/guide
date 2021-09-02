import { Helmet } from 'react-helmet';

import useScrollbarSize from 'react-scrollbar-size';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import { homeCats } from '../../assets/categories';
import Hero, { Footer, Heading, SubHeading } from '../Hero/Hero';
import CategoryTitleBar from './CategoryTitleBar';
import ScrollToTopOnMount from '../../utils/ScrollToTop';
import CategoryScrollMenu from './CategoryScrollMenu';

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(-4),
		[theme.breakpoints.down('sm')]: {
			marginBottom: theme.spacing(7)
		},
		width: (scrollbarWidth) => `calc(100vw - ${scrollbarWidth}px)`,
		[theme.breakpoints.up('lg')]: {
			width: (scrollbarWidth) =>
				`calc(100vw - (${theme.mixins.sideMenu.width}px + ${scrollbarWidth}px))`
		}
	},
	content: {
		marginTop: theme.spacing(4)
	}
}));

export default function Home() {
	const { width: scrollbarWidth } = useScrollbarSize();

	const styles = useStyles(scrollbarWidth);

	return (
		<>
			<Helmet>
				<title>Vomad Guide: Find Vegan Products Near You</title>
				<meta
					name="description"
					content="The vegan product guide to Australia. 13,000+ products, 200+ categories, 100% plant-based."
				/>
				<meta property="og:title" content="The Vegan Product Guide to Australia" />
				<meta
					property="og:description"
					content="13,200+ products, 200+ categories, 100% plant-based."
				/>
				<meta
					property="og:image"
					content="https://images.vomad.guide/logos/social-img.png"
				/>
				<meta property="og:url" content="https://vomad.guide" />
				<meta property="og:site_name" content="Vomad Guide" />
				<meta property="twitter:card" content="summary_large_image" />
				<meta name="twitter:image:alt" content="Find Vegan Products Near You" />
			</Helmet>
			<ScrollToTopOnMount />
			<Hero>
				<Heading>Find Vegan Products</Heading>
				<SubHeading>13,200+ products in 210+ categories from 1,370+ brands.</SubHeading>
				<Footer forPage="home">
					Apply up to 20 different filters to find products by allergens, ingredients and
					other helpful tags, then find stores near you or online to buy them in. All 100%
					plant-based, cruelty-free and found in Australia.
				</Footer>
			</Hero>
			<Box className={styles.container}>
				{homeCats.map((category) => (
					<Box key={category.name} component="section" className={styles.content}>
						<CategoryTitleBar
							name={category.name}
							url={`/${category.prodType}/${category.url}`}
						/>
						<CategoryScrollMenu category={category} />
					</Box>
				))}
			</Box>
		</>
	);
}

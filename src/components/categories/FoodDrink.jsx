import { Helmet } from 'react-helmet';

import useScrollbarSize from 'react-scrollbar-size';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import ScrollToTopOnMount from '../../utils/ScrollToTop';
import { foodDrinkCats } from '../../assets/categories';
import Hero, { Heading, SubHeading, Footer } from '../Hero/Hero';
import CategoryTitleBar from './CategoryTitleBar';
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

export default function FoodDrink() {
	const { width: scrollbarWidth } = useScrollbarSize();

	const styles = useStyles(scrollbarWidth);

	return (
		<>
			<Helmet>
				<title>Vomad Guide: Find Vegan Food & Drink Products Near You</title>
				<meta
					name="description"
					content="5,200+ food & drink products, 103 categories, 100% plant-based. Vomad Guide: The vegan product guide to Australia."
				/>
				<meta property="og:title" content="Vegan Food & Drink Products in Australia" />
				<meta
					property="og:description"
					content="5,200+ food & drink products, 103 categories, 100% plant-based."
				/>
				<meta property="og:image" content="https://images.vomad.guide/logos/social.png" />
				<meta property="og:url" content="https://vomad.guide/food-drink" />
				<meta property="og:site_name" content="Vomad Guide" />
				<meta property="twitter:card" content="summary_large_image" />
				<meta name="twitter:image:alt" content="Find Vegan Products Near You" />
			</Helmet>
			<ScrollToTopOnMount />
			<Hero>
				<Heading>Vegan Food & Drink Products</Heading>
				<SubHeading>
					5,200+ products in 103 food & drink categories in Australia.
				</SubHeading>
				<Footer forPage="prodType" />
			</Hero>
			<Box className={styles.container}>
				{foodDrinkCats.map((category) => (
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

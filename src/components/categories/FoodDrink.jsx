import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ScrollToTopOnMount from '../../utils/ScrollToTop';
import { foodDrinkCats } from '../../assets/categories';
import Hero, { Heading, SubHeading, Footer } from '../Hero/Hero';
import CategoryTitleBar from './CategoryTitleBar';
import CategoryGridList from './CategoryGridList';

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

export default function FoodDrink() {
	const styles = useStyles();

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
					There are 5,200+ vegan food & drink products in 103 categories in Australia.
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
						<CategoryGridList category={category} />
					</Box>
				))}
			</Box>
		</>
	);
}

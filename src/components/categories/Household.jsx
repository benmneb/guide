import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ScrollToTopOnMount from '../../utils/ScrollToTop';
import { householdCats } from '../../assets/categories';
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

export default function Household() {
	const styles = useStyles();

	return (
		<>
			<Helmet>
				<title>Vomad Guide: Find Vegan Household Products Near You</title>
				<meta
					name="description"
					content="Find vegan household products in over 100 categories at the Vomad Guide: The Best Online Vegan Product Guide."
				/>
				<meta
					name="keywords"
					content="bath and body,personal care,household cleaning,makeup,animal care,plant based,plant-based,vegetarian,flexitarian,list,product list,shopping,grocery,shopping list,grocery list"
				/>
			</Helmet>
			<ScrollToTopOnMount />
			<Hero>
				<Heading>Vegan Household Products</Heading>
				<SubHeading>
					There are 6,143 vegan household products in 128 categories in Australia.
				</SubHeading>
				<Footer forPage="prodType" />
			</Hero>
			<Box className={styles.container}>
				{householdCats.map((category) => (
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

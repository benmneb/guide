import { Helmet } from 'react-helmet';

import useScrollbarSize from 'react-scrollbar-size';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import ScrollToTopOnMount from '../../utils/ScrollToTop';
import { householdCats } from '../../assets/categories';
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

export default function Household() {
	const { width: scrollbarWidth } = useScrollbarSize();

	const styles = useStyles(scrollbarWidth);

	return (
		<>
			<Helmet>
				<title>Vomad Guide: Find Vegan Household Products Near You</title>
				<meta
					name="description"
					content="6,100+ household products, 128 categories, 100% plant-based. Vomad Guide: The vegan product guide to Australia."
				/>
				<meta property="og:title" content="Vegan Household Products in Australia" />
				<meta
					property="og:description"
					content="6,100+ household products, 128 categories, 100% plant-based."
				/>
				<meta
					property="og:image"
					content="https://images.vomad.guide/logos/social-img.png"
				/>
				<meta property="og:url" content="https://vomad.guide/household" />
				<meta property="og:site_name" content="Vomad Guide" />
				<meta property="twitter:card" content="summary_large_image" />
				<meta name="twitter:image:alt" content="Find Vegan Products Near You" />
			</Helmet>
			<ScrollToTopOnMount />
			<Hero>
				<Heading>Vegan Household Products</Heading>
				<SubHeading>6,100+ products in 128 household categories in Australia.</SubHeading>
				<Footer forPage="prodType" />
			</Hero>
			<Box className={styles.container}>
				{householdCats.map((category) => (
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

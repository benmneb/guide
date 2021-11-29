import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Typography, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { usePrepareLink, getParams, getEnums } from '../../utils/routing';
import Promotion from './Promotion';

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.palette.background.paper,
		zIndex: theme.zIndex.appBar + 1,
		// ...theme.mixins.hero // for responsive height
		...theme.mixins.heroWithAds // if theres ads
	},
	content: {
		top: theme.mixins.toolbar.minHeight / 2,
		zIndex: theme.zIndex.appBar + 1,
		[theme.breakpoints.only('xs')]: {
			width: '85%',
			margin: theme.spacing(0, 2)
		},
		[theme.breakpoints.up('sm')]: {
			width: '75%',
			margin: theme.spacing(0, 3)
		}
	},
	displayNone: {
		display: 'none'
	}
}));

export default function Hero({ children, hide }) {
	const styles = useStyles();

	return (
		<Box
			component="section"
			position="relative"
			display="flex"
			alignItems="center"
			justifyContent="flex-start"
			className={clsx(styles.container, {
				[styles.displayNone]: hide
			})}
		>
			<Box
				component="header"
				position="relative"
				minWidth={272}
				className={styles.content}
			>
				{children}
				<Promotion />
			</Box>
		</Box>
	);
}

Hero.propTypes = {
	children: PropTypes.node.isRequired
};

///////// HEADING

export function Heading({ children }) {
	return (
		<Typography component="h1" variant="h2" gutterBottom>
			{children}
		</Typography>
	);
}

Heading.propTypes = {
	children: PropTypes.node.isRequired
};

///////// SUB-HEADING

export function SubHeading({ children }) {
	return (
		<Typography component="h2" variant="h5" paragraph>
			{children}
		</Typography>
	);
}

SubHeading.propTypes = {
	children: PropTypes.node.isRequired
};

///////// FOOTER

export function Footer({ forPage, children }) {
	const addProductsLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.addProducts
		}
	});

	if (forPage === 'home' && children) {
		return (
			<Box display={{ xs: 'none', sm: 'block' }}>
				<Typography paragraph color="textSecondary" component="h3">
					{children}
				</Typography>
			</Box>
		);
	}

	if (forPage === 'category') {
		return (
			<Box display={{ xs: 'none', md: 'block' }}>
				<Typography paragraph color="textSecondary">
					You can{' '}
					<Link underline="hover" component={RouterLink} to={addProductsLink}>
						add any missing products
					</Link>
					.
				</Typography>
			</Box>
		);
	}

	if (forPage === 'prodType') {
		return (
			<Box display={{ xs: 'none', md: 'block' }}>
				<Typography paragraph color="textSecondary">
					Select a category from below to see products, reviews, stores and more.
				</Typography>
			</Box>
		);
	}

	if (forPage === '404') {
		return (
			<Box>
				<Typography paragraph>
					Seems like a good time to{' '}
					<Link underline="hover" component={RouterLink} to="/">
						browse vegan products
					</Link>
					.
				</Typography>
			</Box>
		);
	}
}

Footer.propTypes = {
	forPage: PropTypes.oneOf(['home', 'category', 'prodType', '404']),
	children: PropTypes.node
};

Footer.defaultProps = {
	forPage: 'category'
};

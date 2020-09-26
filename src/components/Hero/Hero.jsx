import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Typography, Link, Box } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { usePrepareLink, getParams, getEnums } from '../../utils/routing';

export default function Hero({ children, textAlign, bgImage, hide }) {
	// JSS has to be inside the function because it receives props for the bgImage
	const useStyles = makeStyles((theme) => ({
		container: {
			backgroundColor: theme.palette.background.paper,
			zIndex: theme.zIndex.appBar + 1,
			[theme.breakpoints.only('xs')]: {
				height: 350
			},
			[theme.breakpoints.up('sm')]: {
				height: 300
			}
		},
		hasBgImage: {
			[theme.breakpoints.only('xs')]: {
				background: `radial-gradient(farthest-corner at ${
					theme.breakpoints.values.sm
				}px 0px, ${fade(theme.palette.background.paper, 0)} 0%, ${fade(
					theme.palette.background.paper,
					1
				)} 70%), url(${bgImage}) center / cover no-repeat`
			},
			[theme.breakpoints.only('sm')]: {
				background: `radial-gradient(farthest-corner at ${
					theme.breakpoints.values.md
				}px 0px, ${fade(theme.palette.background.paper, 0)} 0%, ${fade(
					theme.palette.background.paper,
					1
				)} 70%), url(${bgImage}) center / cover no-repeat`
			},
			[theme.breakpoints.up('md')]: {
				background: `radial-gradient(farthest-corner at ${
					theme.breakpoints.values.lg
				}px 0px, ${fade(theme.palette.background.paper, 0)} 0%, ${fade(
					theme.palette.background.paper,
					1
				)} 70%), url(${bgImage}) center / cover no-repeat`
			},
			[theme.breakpoints.up('xl')]: {
				background: `radial-gradient(farthest-corner at ${
					theme.breakpoints.values.xl
				}px 0px, ${fade(theme.palette.background.paper, 0)} 0%, ${fade(
					theme.palette.background.paper,
					1
				)} 70%), url(${bgImage}) center / cover no-repeat`
			}
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

	const styles = useStyles();

	let justifyContent = 'flex-start';

	if (textAlign === 'center') {
		justifyContent = 'center';
	}

	const childrenWithProps = Children.map(children, (child) =>
		cloneElement(child, { textAlign })
	);

	return (
		<Box
			component="section"
			position="relative"
			display="flex"
			alignItems="center"
			justifyContent={justifyContent}
			className={clsx(styles.container, {
				[styles.displayNone]: hide,
				[styles.hasBgImage]: bgImage
			})}
		>
			<Box
				component="header"
				position="relative"
				minWidth={272}
				className={styles.content}
			>
				{childrenWithProps}
			</Box>
		</Box>
	);
}

Hero.propTypes = {
	children: PropTypes.node.isRequired,
	textAlign: PropTypes.oneOf(['left', 'center'])
};

Hero.defaultProps = {
	textAlign: 'left'
};

///////// HEADING

export function Heading({ children, textAlign }) {
	return (
		<Typography component="h1" variant="h2" align={textAlign} gutterBottom>
			{children}
		</Typography>
	);
}

Heading.propTypes = {
	children: PropTypes.node.isRequired,
	textAlign: PropTypes.oneOf(['left', 'center'])
};

Heading.defaultProps = {
	textAlign: 'left'
};

///////// SUB-HEADING

export function SubHeading({ children, textAlign }) {
	return (
		<Typography align={textAlign} component="p" variant="h5" paragraph>
			{children}
		</Typography>
	);
}

SubHeading.propTypes = {
	children: PropTypes.node.isRequired,
	textAlign: PropTypes.oneOf(['left', 'center'])
};

SubHeading.defaultProps = {
	textAlign: 'left'
};

///////// FOOTER

export function Footer({ textAlign, forPage }) {
	const addProductsLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.addProducts
		}
	});

	if (forPage === 'category') {
		return (
			<Box display={{ xs: 'none', md: 'block' }}>
				<Typography align={textAlign} paragraph>
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
				<Typography align={textAlign} paragraph color="textSecondary">
					Select a category from below to see products, reviews, stores and more.
				</Typography>
			</Box>
		);
	}

	if (forPage === '404') {
		return (
			<Box>
				<Typography align={textAlign} paragraph>
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
	forPage: PropTypes.oneOf(['category', 'prodType', '404']),
	textAlign: PropTypes.oneOf(['left', 'center'])
};

Footer.defaultProps = {
	forPage: 'category',
	textAlign: 'left'
};

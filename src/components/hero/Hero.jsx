import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Typography, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Hero(props) {
	const { children, textAlign, bgImage, hide } = props;
	// JSS has to be inside the function because it receives props for the bgImage
	const useStyles = makeStyles((theme) => ({
		container: {
			zIndex: theme.zIndex.appBar + 1
		},
		hasBgImage: {
			[theme.breakpoints.only('xs')]: {
				background: `radial-gradient(farthest-corner at ${theme.breakpoints.values.sm}px 0px, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 70%), url(${bgImage}) center / cover no-repeat`
			},
			[theme.breakpoints.only('sm')]: {
				background: `radial-gradient(farthest-corner at ${theme.breakpoints.values.md}px 0px, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 70%), url(${bgImage}) center / cover no-repeat`
			},
			[theme.breakpoints.up('md')]: {
				background: `radial-gradient(farthest-corner at ${theme.breakpoints.values.lg}px 0px, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 70%), url(${bgImage}) center / cover no-repeat`
			},
			[theme.breakpoints.up('xl')]: {
				background: `radial-gradient(farthest-corner at ${theme.breakpoints.values.xl}px 0px, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 70%), url(${bgImage}) center / cover no-repeat`
			}
		},
		content: {
			top: theme.mixins.toolbar.minHeight / 2,
			zIndex: theme.zIndex.appBar + 1
		},
		displayNone: {
			display: 'none'
		}
	}));

	const styles = useStyles();

	let marginLeft = 3;
	let justifyContent = 'flex-start';

	if (textAlign === 'center') {
		marginLeft = 0;
		justifyContent = 'center';
	}

	const childrenWithProps = Children.map(children, (child) =>
		cloneElement(child, { textAlign })
	);

	return (
		<Box
			height={300}
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
				position="relative"
				marginLeft={marginLeft}
				width={3 / 4}
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

export function Heading(props) {
	const { children, textAlign } = props;

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

export function SubHeading(props) {
	const { children, textAlign } = props;

	return (
		<Box display={{ xs: 'none', sm: 'block' }}>
			<Typography align={textAlign} component="p" variant="h5" paragraph>
				{children}
			</Typography>
		</Box>
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

export function Footer(props) {
	const { textAlign, forCategory } = props;

	let footerContent;

	if (forCategory) {
		footerContent = (
			<Typography align={textAlign} paragraph>
				You can{' '}
				<Link href="#" underline="hover">
					add any missing products
				</Link>
				.
			</Typography>
		);
	}

	return <Box display={{ xs: 'none', md: 'block' }}>{footerContent}</Box>;
}

Footer.propTypes = {
	forHome: PropTypes.bool,
	forCategory: PropTypes.bool,
	textAlign: PropTypes.oneOf(['left', 'center'])
};

Footer.defaultProps = {
	forHome: false,
	forCategory: false,
	textAlign: 'left'
};

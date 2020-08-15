import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Typography, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.palette.background.paper,
		zIndex: theme.zIndex.appBar + 1
	},
	content: {
		top: theme.mixins.toolbar.minHeight / 2,
		zIndex: theme.zIndex.appBar + 1
	},
	displayNone: {
		display: 'none'
	}
}));

function Hero(props) {
	const styles = useStyles();
	const { children, textAlign } = props;

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
			className={clsx(styles.container, { [styles.displayNone]: props.showFiltersPanel })}
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

Hero.propsTypes = {
	children: PropTypes.node.isRequired,
	textAlign: PropTypes.oneOf(['left', 'center'])
};

Hero.defaultProps = {
	textAlign: 'left'
};

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel
	};
};

export default connect(mapStateToProps)(Hero);

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
	const { textAlign, forHome, forCategory } = props;

	let footerContent;

	if (forHome) {
		footerContent = (
			<Typography align={textAlign} paragraph>
				You can{' '}
				<Link href="#" underline="hover">
					add any missing products
				</Link>
				, edit existing products and{' '}
				<Link href="#" underline="hover">
					change your location.
				</Link>
			</Typography>
		);
	}

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

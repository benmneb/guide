import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Toolbar, Button, Hidden } from '@material-ui/core';
import { ChevronRightRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	buttonText: {
		margin: theme.spacing(0, -1)
	}
}));

export default function CategoryTitleBar({ name, url }) {
	const styles = useStyles();

	return (
		<Toolbar component="header">
			<Box flexGrow="1">
				<Typography component="h2" variant="h5" align="left">
					{name}
				</Typography>
			</Box>
			<Box flexGrow="0">
				<Button
					component={Link}
					to={url}
					variant="text"
					color="default"
					endIcon={<ChevronRightRounded />}
					classes={{ text: styles.buttonText }}
				>
					See all<Hidden only="xs"> {name}</Hidden>
				</Button>
			</Box>
		</Toolbar>
	);
}

CategoryTitleBar.propTypes = {
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
};

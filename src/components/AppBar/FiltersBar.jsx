import React from 'react';
import { connect } from 'react-redux';
import { AppBar, useMediaQuery } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ShowFiltersButton from './ShowFiltersButton';

const useStyles = makeStyles((theme) => ({
	root: {
		zIndex: theme.zIndex.appBar
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	breadcrumbs: {
		flexGrow: 1,
		overflow: 'scroll',
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	}
}));

function ElevationScroll(props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: props.showFiltersPanel ? -1 : 290
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0
	});
}

function FiltersBar(props) {
	const classes = useStyles();
	const theme = useTheme();

	let maxItems = 6;
	if (useMediaQuery(theme.breakpoints.down('sm'))) {
		maxItems = 1;
	}

	return (
		<Box
			display={{ xs: 'none', sm: 'flex' }}
			flexGrow="1"
			top="0"
			position="sticky"
			zIndex="appBar"
		>
			<ElevationScroll {...props}>
				<AppBar position="sticky" color="inherit" elevation={3}>
					<Toolbar>
						<Box className={classes.breadcrumbs}>
							<Breadcrumbs
								separator={<NavigateNextIcon fontSize="small" />}
								aria-label="breadcrumb"
								maxItems={maxItems}
								itemsBeforeCollapse={0}
							>
								<Link color="inherit" href="#">
									Food & Drink
								</Link>
								<Link color="inherit" href="#">
									Pantry
								</Link>
								<Link color="inherit" href="#">
									Breakfasts & Spreads
								</Link>
								<Typography color="textPrimary">Nut Butters & Spreads</Typography>
							</Breadcrumbs>
						</Box>
						<ShowFiltersButton />
					</Toolbar>
				</AppBar>
			</ElevationScroll>
		</Box>
	);
}

const mapStateToProps = (state) => {
	return {
		showFiltersPanel: state.showFiltersPanel
	};
};

export default connect(mapStateToProps)(FiltersBar);

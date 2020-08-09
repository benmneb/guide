import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BackToCategories from '../controlResults/BackToCategories';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles((theme) => ({
	root: {
		zIndex: theme.zIndex.appBar
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
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

	return (
		<Box
			display={{ xs: 'none', md: 'flex' }}
			flexGrow="1"
			top="0"
			position="sticky"
			zIndex="appBar"
		>
			<ElevationScroll {...props}>
				<AppBar position="sticky" color="inherit" elevation={3}>
					<Toolbar>
						<Box display="flex" flexGrow="1" className={classes.title}>
							<Breadcrumbs
								separator={<NavigateNextIcon fontSize="small" />}
								aria-label="breadcrumb"
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
						<BackToCategories />
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

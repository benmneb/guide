import React from 'react';
import { connect } from 'react-redux';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNext';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ShowFiltersButton from './ShowFiltersButton';

const useStyles = makeStyles((theme) => ({
	zIndex: {
		zIndex: theme.zIndex.appBar - 1
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
	const styles = useStyles();

	return (
		<Box
			display={{ xs: 'none', sm: 'flex' }}
			flexGrow="1"
			top="0"
			position="sticky"
			className={styles.zIndex}
		>
			<ElevationScroll {...props}>
				<AppBar
					position="sticky"
					color="inherit"
					elevation={3}
					classes={{ root: styles.zIndex }}
				>
					<Toolbar>
						<Box className={styles.breadcrumbs}>
							<Breadcrumbs
								separator={<NavigateNextRoundedIcon fontSize="small" />}
								aria-label="breadcrumb"
								maxItems={6}
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
						<Box display={{ xs: 'none', md: 'flex' }}>
							<ShowFiltersButton />
						</Box>
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

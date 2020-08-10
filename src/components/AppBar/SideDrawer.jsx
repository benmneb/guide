import React, { useState } from 'react';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import BathtubIcon from '@material-ui/icons/Bathtub';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import { categories } from '../../assets/categories';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as actionCreators from '../../store/actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		[theme.breakpoints.up('lg')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	drawerPaper: {
		width: drawerWidth
	},
	toolbar: {
		height: 64,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

const SideDrawer = (props) => {
	const { window } = props;
	const styles = useStyles();
	const theme = useTheme();
	const [expandCategories, setExpandCategories] = useState(false);

	const handleExpandCategories = () => {
		setExpandCategories(!expandCategories);
	};

	const handleCloseSideDrawer = () => {
		props.onHideSideDrawer();
	};

	const openMenuItem = (clickedItem) => {
		handleCloseSideDrawer();
		switch (clickedItem) {
			case 'addProducts':
				return props.onToggleAddProductsModal();
			case 'advertise':
				return props.onToggleAdvertiseModal();
			case 'terms':
				return props.onToggleTermsModal();
			case 'privacy':
				return props.onTogglePrivacyModal();
			default:
				return;
		}
	};

	const container = window !== undefined ? () => window().document.body : undefined;

	const drawer = (
		<div>
			<div className={styles.toolbar}>
				<img
					style={{ height: 30, marginTop: 5 }}
					src={require('../../assets/logo.png')}
					alt="Vomad Guide: Find Vegan Products Near You"
				/>
			</div>
			<Divider />
			<List component="nav">
				<ListItem button>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={'Home'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<FastfoodIcon />
					</ListItemIcon>
					<ListItemText primary={'Food & Drink'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<BathtubIcon />
					</ListItemIcon>
					<ListItemText primary={'Household'} />
				</ListItem>
				<ListItem button onClick={handleExpandCategories}>
					<ListItemIcon>
						<AllInclusiveIcon />
					</ListItemIcon>
					<ListItemText primary={'All Categories'} />
				</ListItem>
				<Collapse in={expandCategories} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{categories.map((category) => (
							<ListItem button key={category.id} className={styles.nested}>
								<ListItemText primary={category.name} key={category.id} />
							</ListItem>
						))}
					</List>
				</Collapse>
				<ListItem button onClick={() => openMenuItem('addProducts')}>
					<ListItemIcon>
						<AddCircleIcon />
					</ListItemIcon>
					<ListItemText primary={'Add Products'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<FavoriteIcon />
					</ListItemIcon>
					<ListItemText primary={'Support Us'} />
				</ListItem>
				<ListItem button onClick={() => openMenuItem('advertise')}>
					<ListItemIcon>
						<VisibilityIcon />
					</ListItemIcon>
					<ListItemText primary={'Advertise'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<GetAppIcon />
					</ListItemIcon>
					<ListItemText primary={'Get the App'} />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button>
					<ListItemText primary="Provide Feedback" />
				</ListItem>
				<ListItem button onClick={() => openMenuItem('terms')}>
					<ListItemText primary="Terms of Use" />
				</ListItem>
				<ListItem button onClick={() => openMenuItem('privacy')}>
					<ListItemText primary="Privacy Policy" />
				</ListItem>
			</List>
		</div>
	);

	return (
		<nav className={styles.drawer} aria-label="main menu">
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Hidden lgUp implementation="js">
				<Drawer
					container={container}
					variant="temporary"
					anchor={theme.direction === 'rtl' ? 'right' : 'left'}
					open={props.showSideDrawer}
					onClose={handleCloseSideDrawer}
					classes={{
						paper: styles.drawerPaper
					}}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
				>
					{drawer}
				</Drawer>
			</Hidden>
			<Hidden mdDown implementation="js">
				<Drawer
					classes={{
						paper: styles.drawerPaper
					}}
					variant="permanent"
					open
				>
					{drawer}
				</Drawer>
			</Hidden>
		</nav>
	);
};

const mapStateToProps = (state) => {
	return {
		showSideDrawer: state.showSideDrawer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onHideSideDrawer: () => dispatch(actionCreators.hideSideDrawer()),
		onToggleAddProductsModal: () => dispatch(actionCreators.toggleAddProductsModal()),
		onToggleAdvertiseModal: () => dispatch(actionCreators.toggleAdvertiseModal()),
		onToggleTermsModal: () => dispatch(actionCreators.toggleTermsModal()),
		onTogglePrivacyModal: () => dispatch(actionCreators.togglePrivacyModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);

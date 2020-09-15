import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { AccountCircleRounded, HomeRounded } from '@material-ui/icons';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircle';
import FastfoodRoundedIcon from '@material-ui/icons/Fastfood';
import BathtubRoundedIcon from '@material-ui/icons/Bathtub';
import AllInclusiveRoundedIcon from '@material-ui/icons/AllInclusive';
import FavoriteRoundedIcon from '@material-ui/icons/Favorite';
import VisibilityRoundedIcon from '@material-ui/icons/Visibility';
import FeedbackRoundedIcon from '@material-ui/icons/Feedback';
import GetAppRoundedIcon from '@material-ui/icons/GetApp';
import { categories } from '../../assets/categoriesAZ';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as actionCreators from '../../store/actions';

const useStyles = makeStyles((theme) => ({
	drawer: {
		[theme.breakpoints.up('lg')]: {
			width: theme.mixins.sideMenu.width,
			flexShrink: 0
		}
	},
	drawerPaper: {
		width: theme.mixins.sideMenu.width
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		...theme.mixins.toolbar
	},
	logo: {
		height: 30,
		marginTop: 5,
		marginLeft: -5
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

const SideDrawer = (props) => {
	const { window } = props;
	const styles = useStyles();
	const history = useHistory();
	const theme = useTheme();
	const [expandCategories, setExpandCategories] = useState(false);

	const handleExpandCategories = () => {
		setExpandCategories(!expandCategories);
	};

	const handleCloseSideDrawer = () => {
		props.onHideSideDrawer();
	};

	const openMenuItem = (clickedItem) => {
		if (props.showSideDrawer) handleCloseSideDrawer();
		switch (clickedItem) {
			case 'home':
				return history.push('/');
			case 'auth':
				return props.onToggleAuthModal();
			case 'userProfile':
				return props.onToggleUserProfileModal();
			case 'foodDrink':
				return history.push('/food-drink');
			case 'addProducts':
				return props.onToggleAddProductsModal();
			case 'advertise':
				return props.onToggleAdvertiseModal();
			case 'feedback':
				return props.onToggleFeedbackModal();
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
					className={styles.logo}
					src="https://ik.imagekit.io/vomadguide/logo/logo_a_nCYxlAP.png"
					alt="Vomad Guide: Find Vegan Products Near You at The Biggest Free Vegan Product Guide"
				/>
			</div>
			<Divider />
			<List component="nav">
				<ListItem button onClick={() => openMenuItem('home')}>
					<ListItemIcon>
						<HomeRounded />
					</ListItemIcon>
					<ListItemText primary={'Home'} />
				</ListItem>
				{props.isAuthenticated ? (
					<ListItem button onClick={() => openMenuItem('userProfile')}>
						<ListItemIcon>
							<AccountCircleRounded />
						</ListItemIcon>
						<ListItemText primary={'View Profile'} />
					</ListItem>
				) : (
					<ListItem button onClick={() => openMenuItem('auth')}>
						<ListItemIcon>
							<LockOpenRoundedIcon />
						</ListItemIcon>
						<ListItemText primary={'Login / Join'} />
					</ListItem>
				)}
				<ListItem button onClick={() => openMenuItem('foodDrink')}>
					<ListItemIcon>
						<FastfoodRoundedIcon />
					</ListItemIcon>
					<ListItemText primary={'Food & Drink'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<BathtubRoundedIcon />
					</ListItemIcon>
					<ListItemText primary={'Household'} />
				</ListItem>
				<ListItem button onClick={handleExpandCategories}>
					<ListItemIcon>
						<AllInclusiveRoundedIcon />
					</ListItemIcon>
					<ListItemText primary={'All Categories'} />
				</ListItem>
				<Collapse in={expandCategories} timeout="auto" unmountOnExit>
					<List dense component="div" disablePadding>
						{categories.map((category) => (
							<ListItem
								component={Link}
								to="/food-drink/nut-butters-spreads"
								dense
								button
								key={category.id}
								className={styles.nested}
							>
								<ListItemText primary={category.name} />
							</ListItem>
						))}
					</List>
				</Collapse>
				<ListItem button onClick={() => openMenuItem('addProducts')}>
					<ListItemIcon>
						<AddCircleRoundedIcon />
					</ListItemIcon>
					<ListItemText primary={'Add Products'} />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<FavoriteRoundedIcon />
					</ListItemIcon>
					<ListItemText primary={'Support Us'} />
				</ListItem>
				<ListItem button onClick={() => openMenuItem('advertise')}>
					<ListItemIcon>
						<VisibilityRoundedIcon />
					</ListItemIcon>
					<ListItemText primary={'Advertise'} />
				</ListItem>
				<ListItem button onClick={() => openMenuItem('feedback')}>
					<ListItemIcon>
						<FeedbackRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Provide Feedback" />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<GetAppRoundedIcon />
					</ListItemIcon>
					<ListItemText primary={'Get the App'} />
				</ListItem>
			</List>
			<Divider />
			<List component="nav">
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
		showSideDrawer: state.showSideDrawer,
		isAuthenticated: state.isAuthenticated
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onHideSideDrawer: () => dispatch(actionCreators.hideSideDrawer()),
		onToggleAuthModal: () => dispatch(actionCreators.toggleAuthModal()),
		onToggleAddProductsModal: () => dispatch(actionCreators.toggleAddProductsModal()),
		onToggleAdvertiseModal: () => dispatch(actionCreators.toggleAdvertiseModal()),
		onToggleTermsModal: () => dispatch(actionCreators.toggleTermsModal()),
		onTogglePrivacyModal: () => dispatch(actionCreators.togglePrivacyModal()),
		onToggleFeedbackModal: () => dispatch(actionCreators.toggleFeedbackModal()),
		onToggleUserProfileModal: () => dispatch(actionCreators.toggleUserProfileModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);

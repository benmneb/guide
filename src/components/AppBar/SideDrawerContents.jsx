import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
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
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import FeedbackRoundedIcon from '@material-ui/icons/Feedback';
import GetAppRoundedIcon from '@material-ui/icons/GetApp';
import { categories } from '../../assets/categories';
import { makeStyles } from '@material-ui/core/styles';
import { hideSideDrawer } from '../../store/actions';
import { usePrepareLink, getParams, getEnums } from '../../utils/routing';

const useStyles = makeStyles((theme) => ({
	imageBox: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		...theme.mixins.toolbar
	},
	logo: {
		height: 30,
		marginTop: 5,
		marginLeft: -5,
		'&:hover': {
			cursor: 'pointer'
		}
	},
	nested: {
		paddingLeft: theme.spacing(4)
	},
	getTheApp: {
		'@media (display-mode: standalone)': {
			display: 'none'
		}
	}
}));

export default function SideDrawerContents() {
	const styles = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const currentUserData = useSelector((state) => state.auth.currentUserData);
	const sideDrawerIsOpen = useSelector((state) => state.ui.showSideDrawer);
	const [expandCategories, setExpandCategories] = useState(false);

	const handleExpandCategories = () => {
		setExpandCategories(!expandCategories);
	};

	const handleCloseSideDrawer = () => {
		if (sideDrawerIsOpen) dispatch(hideSideDrawer());
	};

	const openMenuItem = (clickedItem) => {
		handleCloseSideDrawer();
		switch (clickedItem) {
			case 'home':
				return history.push('/');
			case 'auth':
				return history.push(authLink);
			case 'userProfile':
				return history.push(userProfileLink);
			case 'foodDrink':
				return history.push('/food-drink');
			case 'household':
				return history.push('/household');
			case 'addProducts':
				return history.push(addProductsLink);
			case 'supportUs':
				return history.push(supportUsLink);
			case 'advertise':
				return history.push(advertiseLink);
			case 'feedback':
				return history.push(feedbackLink);
			case 'getTheApp':
				return history.push(getTheAppLink);
			case 'terms':
				return history.push(termsLink);
			case 'privacy':
				return history.push(privacyLink);
			default:
				return;
		}
	};

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		}
	});
	const addProductsLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.addProducts
		}
	});
	const advertiseLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.advertise
		}
	});
	const supportUsLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.supportUs
		}
	});
	const feedbackLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.feedback
		}
	});
	const getTheAppLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.getTheApp
		}
	});
	const termsLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.terms
		}
	});
	const privacyLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.privacy
		}
	});
	const userProfileLink = usePrepareLink(
		isAuthenticated && {
			query: {
				[getParams.popup]: getEnums.popup.userProfile
			},
			pushToQuery: {
				[getParams.userId]: currentUserData.id
			}
		}
	);

	return (
		<Box>
			<Box className={styles.imageBox}>
				<img
					className={styles.logo}
					onClick={() => openMenuItem('home')}
					src="https://ik.imagekit.io/vomadguide/logo/logo_a_nCYxlAP.png"
					alt="Vomad Guide: Find Vegan Products Near You"
				/>
			</Box>
			<Divider />
			<List component="nav">
				<ListItem button onClick={() => openMenuItem('home')}>
					<ListItemIcon>
						<HomeRounded />
					</ListItemIcon>
					<ListItemText primary={'Home'} />
				</ListItem>
				<ListItem button onClick={() => openMenuItem('foodDrink')}>
					<ListItemIcon>
						<FastfoodRoundedIcon />
					</ListItemIcon>
					<ListItemText primary={'Food & Drink'} />
				</ListItem>
				<ListItem button onClick={() => openMenuItem('household')}>
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
								to={`/${category.prodType}/${category.url}`}
								dense
								button
								key={category.id}
								className={styles.nested}
								onClick={handleCloseSideDrawer}
							>
								<ListItemText primary={category.name} />
							</ListItem>
						))}
					</List>
				</Collapse>
			</List>
			<Divider />
			<List component="nav">
				{isAuthenticated ? (
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
						<ListItemText primary={'Login / Sign up'} />
					</ListItem>
				)}
				<ListItem button onClick={() => openMenuItem('addProducts')}>
					<ListItemIcon>
						<AddCircleRoundedIcon />
					</ListItemIcon>
					<ListItemText primary={'Add Products'} />
				</ListItem>
				<ListItem button onClick={() => openMenuItem('supportUs')}>
					<ListItemIcon>
						<FavoriteRoundedIcon />
					</ListItemIcon>
					<ListItemText primary={'Support Us'} />
				</ListItem>
				<ListItem button onClick={() => openMenuItem('advertise')}>
					<ListItemIcon>
						<TrendingUpRoundedIcon />
					</ListItemIcon>
					<ListItemText primary={'Advertise'} />
				</ListItem>
				<ListItem button onClick={() => openMenuItem('feedback')}>
					<ListItemIcon>
						<FeedbackRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Provide Feedback" />
				</ListItem>
				<ListItem
					button
					onClick={() => openMenuItem('getTheApp')}
					className={styles.getTheApp}
				>
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
		</Box>
	);
}

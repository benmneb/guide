import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../../store/actions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
	Dialog,
	IconButton,
	Typography,
	useMediaQuery,
	Tabs,
	Tab,
	Paper,
	Grid,
	Box
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/Close';
import Skeleton from '@material-ui/lab/Skeleton';
import About from './About/About';
import Reviews from './Reviews/Reviews';
import WhereToBuy from './WhereToBuy/WhereToBuy';
import BottomNav from './BottomNav';
import StarRating from './StarRating';

const useStyles = makeStyles((theme) => ({
	closeBtnContainer: {
		margin: 0,
		padding: 0
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	},
	dialogContentRoot: {
		padding: theme.spacing(2),
		marginBottom: 56, // height of bottomNav bar
		[theme.breakpoints.up('md')]: {
			marginBottom: 0
		}
	},
	brandName: {
		color: theme.palette.grey[500],
		fontWeight: theme.typography.fontWeightBold,
		fontSize: '0.9rem',
		lineHeight: '2',
		width: '100%'
	},
	modalMaxHeight: {
		[theme.breakpoints.up('md')]: {
			height: `calc(100% - ${theme.spacing(8)}px)` // always max height so there is no jump with less modal content
		}
	}
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

const ProductModal = ({
	showAddReview,
	showProductModal,
	selectedProduct,
	onToggleProductModal,
	onHideAddReview
}) => {
	const styles = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [currentTab, setCurrentTab] = useState(0);
	const [item, setItem] = useState(null);
	const [newRating, setNewRating] = useState(null);

	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (showProductModal) {
			axios
				.get(`https://api.vomad.guide/product/${selectedProduct}`, {
					cancelToken: source.token
				})
				.then((response) => {
					if (mounted) setItem(response.data);
				})
				.catch((err) => {
					if (mounted) console.error(err);
				});
		}

		return () => {
			mounted = false;
			source.cancel('Product modal call cancelled during clean-up');

			setTimeout(() => {
				setItem(null);
				setCurrentTab(0);
			}, theme.transitions.duration.leavingScreen);
		};
		//eslint-disable-next-line
	}, [selectedProduct, newRating]);

	const handleStarRating = (newValue) => {
		axios
			.put('https://api.vomad.guide/rating/', {
				rating: newValue,
				product_id: item && item[0].productId,
				user_id: 1
			})
			.then((response) => {
				setNewRating(JSON.parse(response.config.data).rating);
			});
	};

	const onCloseModal = () => {
		onToggleProductModal();
		if (showAddReview) onHideAddReview();
	};

	const handleChangeCurrentTab = (event, newValue) => {
		if (newValue !== 1 && showAddReview) onHideAddReview();
		setCurrentTab(newValue);
	};

	useEffect(() => {
		if (showAddReview && currentTab !== 1) {
			setCurrentTab(1);
		}
	}, [showAddReview, currentTab]);

	return (
		<Dialog
			onClose={onCloseModal}
			fullScreen={fullScreen}
			aria-labelledby="product-dialog-title"
			open={showProductModal}
			maxWidth="md"
			fullWidth
			classes={{ paperScrollPaper: styles.modalMaxHeight }}
		>
			<MuiDialogTitle disableTypography className={styles.closeBtnContainer}>
				<IconButton
					aria-label="close"
					className={styles.closeButton}
					onClick={onCloseModal}
				>
					<CloseRoundedIcon />
				</IconButton>
			</MuiDialogTitle>
			<DialogContent className={styles.dialogContentRoot}>
				<Grid
					component="header"
					container
					spacing={1}
					direction="column"
					alignItems="center"
				>
					<Grid item xs={12}>
						{item ? (
							<Typography component="h1" variant="h4" align="center">
								<Typography
									className={styles.brandName}
									variant="overline"
									component="span"
									display="block"
								>
									{item[0].brandName}
								</Typography>
								{item[0].productName}
							</Typography>
						) : (
							<Box display="flex" flexDirection="column" alignItems="center">
								<Skeleton width="30%" className={styles.brandName} />
								<Typography component="h1" variant="h4" align="center">
									<Skeleton width={500} />
								</Typography>
							</Box>
						)}
					</Grid>
					<Grid item xs={12}>
						<StarRating
							product={item}
							averageRating={item && Number(item[0].rating)}
							amountOfRatings={item && item[0].ratingcount}
							productId={item && item[0].productId}
							onRate={(newValue) => handleStarRating(newValue)}
						/>
					</Grid>
					<Box display={{ xs: 'none', md: 'inherit' }}>
						<Grid item xs={12}>
							<Paper variant="outlined">
								<Tabs
									component="nav"
									value={currentTab}
									onChange={handleChangeCurrentTab}
									indicatorColor="primary"
									textColor="inherit"
									centered
								>
									<Tab label="About" {...a11yProps(0)} />
									<Tab label="Reviews" {...a11yProps(1)} />
									<Tab label="Where To Buy" {...a11yProps(2)} />
								</Tabs>
							</Paper>
						</Grid>
					</Box>
				</Grid>
				<Box marginTop={2}>
					<TabPanel value={currentTab} index={0}>
						<About product={item} />
					</TabPanel>
					<TabPanel value={currentTab} index={1}>
						<Reviews />
					</TabPanel>
					<TabPanel value={currentTab} index={2}>
						<WhereToBuy />
					</TabPanel>
				</Box>
				<BottomNav currentTab={currentTab} onChange={handleChangeCurrentTab} />
			</DialogContent>
		</Dialog>
	);
};

const mapStateToProps = (state) => {
	return {
		showProductModal: state.showProductModal,
		showAddReview: state.showAddReview,
		selectedProduct: state.selectedProduct
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleProductModal: () => dispatch(actionCreators.toggleProductModal()),
		onHideAddReview: () => dispatch(actionCreators.hideAddReview())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);

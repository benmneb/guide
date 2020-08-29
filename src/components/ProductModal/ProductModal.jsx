import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
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
import About from './About/About';
import Reviews from './Reviews/Reviews';
import WhereToBuy from './WhereToBuy/WhereToBuy';
import BottomNav from './BottomNav';
import StarRating from './StarRating';
import { product } from '../../assets/product';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	titleRoot: {
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
		fontWeight: theme.typography.fontWeightBold
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

const ProductModal = (props) => {
	const styles = useStyles();
	const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	const [currentTab, setCurrentTab] = useState(0);

	const onCloseModal = () => {
		props.onToggleProductModal();
		props.onHideAddReview();
	};

	const handleChangeCurrentTab = (event, newValue) => {
		if (newValue !== 1) {
			props.onHideAddReview();
		}
		setCurrentTab(newValue);
	};

	useEffect(() => {
		if (props.showAddReview && currentTab !== 1) {
			setCurrentTab(1);
		}
	}, [props.showAddReview, currentTab]);

	return (
		<Dialog
			onClose={onCloseModal}
			fullScreen={fullScreen}
			aria-labelledby="product-dialog-title"
			open={props.showProductModal}
			maxWidth="md"
			fullWidth
			classes={{ paperScrollPaper: styles.modalMaxHeight }}
		>
			<MuiDialogTitle disableTypography className={styles.titleRoot}>
				<IconButton
					aria-label="close"
					className={styles.closeButton}
					onClick={onCloseModal}
				>
					<CloseRoundedIcon />
				</IconButton>
			</MuiDialogTitle>
			<DialogContent className={styles.dialogContentRoot}>
				<Grid container spacing={1} direction="column" alignItems="center">
					<Grid item xs={12}>
						<Typography
							className={styles.brandName}
							variant="overline"
							component="h3"
							align="center"
						>
							{product.brand}
						</Typography>
						<Typography variant="h4" component="h2" align="center">
							{product.name}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<StarRating
							averageRating={product.rating}
							amountOfRatings={product.amountOfRatings}
						/>
					</Grid>
					<Box display={{ xs: 'none', md: 'inherit' }}>
						<Grid item xs={12}>
							<Paper variant="outlined">
								<Tabs
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
						<About product={product} />
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
		showAddReview: state.showAddReview
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleProductModal: () => dispatch(actionCreators.toggleProductModal()),
		onHideAddReview: () => dispatch(actionCreators.hideAddReview())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);

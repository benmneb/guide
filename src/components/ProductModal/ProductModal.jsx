import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { useTheme, makeStyles } from '@material-ui/core/styles';
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
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';
import ProductAbout from './ProductAbout';
import ProductReviews from './ProductReviews';
import ProductWhereToBuy from './ProductWhereToBuy';
import BottomNav from './BottomNav';

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
	const theme = useTheme();
	const styles = useStyles();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [currentTab, setCurrentTab] = useState(0);

	const onCloseModal = () => {
		props.onToggleProductModal();
	};

	const handleChangeCurrentTab = (event, newValue) => {
		setCurrentTab(newValue);
	};

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
					<CloseIcon />
				</IconButton>
			</MuiDialogTitle>
			<DialogContent className={styles.dialogContentRoot}>
				<Grid container spacing={1} direction="column" alignItems="center">
					<Grid item xs={12}>
						<Typography variant="h4" component="h2" align="center">
							Kraft Peanut Butter - Crunchy
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1} alignItems="center">
							<Grid item>
								<Rating name="product-rating" defaultValue={4} size="large" />
							</Grid>
							<Grid item>
								<Typography display="inline">from 12 ratings</Typography>
							</Grid>
						</Grid>
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
						<ProductAbout />
					</TabPanel>
					<TabPanel value={currentTab} index={1}>
						<ProductReviews />
					</TabPanel>
					<TabPanel value={currentTab} index={2}>
						<ProductWhereToBuy />
					</TabPanel>
				</Box>
				<BottomNav currentTab={currentTab} onChange={handleChangeCurrentTab} />
			</DialogContent>
		</Dialog>
	);
};

const mapStateToProps = (state) => {
	return {
		showProductModal: state.showProductModal
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleProductModal: () => dispatch(actionCreators.toggleProductModal())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);

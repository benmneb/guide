import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Paper, Grid, CardMedia, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import EcoIcon from '@material-ui/icons/Eco';
import Rating from '@material-ui/lab/Rating';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Grid container spacing={1} direction="column" alignItems="center">
				<Grid item xs={12}>
					<Typography variant="h4" component="h2">
						{children}
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
			</Grid>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary
	},
	heading: {
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightBold
	},
	table: {
		minWidth: 280
	}
}));

function createData(nutrition, perServe, per100g) {
	return { nutrition, perServe, per100g };
}

const rows = [
	createData('Energy', '525kj', '2630kj'),
	createData('Protein', '5.6g', '28.2g'),
	createData('Fat, total', '10.4g', '51.8g'),
	createData('- saturated', '1.5g', '7.6g'),
	createData('Carbohydrate', '2.1g', '10.4g'),
	createData('- sugars', '1.6g', '8.1g'),
	createData('Sodium', '73mg', '365mg')
];

const ProductModal = (props) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = useStyles();

	const onClose = () => {
		props.onToggleProductModal();
	};

	return (
		<Dialog
			onClose={onClose}
			fullScreen={fullScreen}
			aria-labelledby="product-dialog-title"
			open={props.showProductModal}
			maxWidth="md"
			fullWidth
		>
			<DialogTitle id="product-dialog-title" onClose={onClose}>
				Kraft Peanut Butter - Crunchy
			</DialogTitle>
			<DialogContent>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Grid container spacing={0} direction="column">
							<Container maxWidth="xs">
								<Paper className={classes.paper} elevation={0}>
									<Grid item xs={12}>
										<CardMedia
											component="img"
											alt="peanut butter"
											image="https://mouthsofmums.com.au/wp-content/uploads/2016/05/046731-300x300.jpg"
											title="Peanut Butter"
										/>
									</Grid>
								</Paper>
							</Container>
						</Grid>
						<Grid container spacing={1} direction="column" alignItems="center">
							<Grid item xs={12}>
								<Typography className={classes.heading}>Buy Now Online</Typography>
							</Grid>
							<Grid item xs={12}>
								<Button
									variant="contained"
									color="primary"
									size="large"
									disableElevation
									endIcon={<OpenInNewIcon />}
								>
									Woolworths.com.au
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Button
									variant="contained"
									color="primary"
									size="large"
									disableElevation
									startIcon={<EcoIcon />}
									endIcon={<OpenInNewIcon />}
								>
									CrueltyFreeShop.com.au
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper className={classes.paper} variant="outlined">
							<Typography gutterBottom className={classes.heading}>
								Ingredients
							</Typography>
							<Typography paragraph>
								Roasted Peanuts (85% minimum), Sugar, Vegetable Oils, Salt.
							</Typography>
							<Typography gutterBottom className={classes.heading}>
								Nutritional Info
							</Typography>
							<Typography>Servings per package: 25</Typography>
							<Typography gutterBottom>Serving size: 20g</Typography>
							<TableContainer>
								<Table
									className={classes.table}
									size="small"
									aria-label="nutrition information"
								>
									<TableHead>
										<TableRow>
											<TableCell>Nutrition</TableCell>
											<TableCell align="right">Per Serve</TableCell>
											<TableCell align="right">Per 100g</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.map((row) => (
											<TableRow key={row.nutrition}>
												<TableCell component="th" scope="row">
													{row.nutrition}
												</TableCell>
												<TableCell align="right">{row.perServe}</TableCell>
												<TableCell align="right">{row.per100g}</TableCell>
											</TableRow>
										))}
									</TableBody>
									<caption>
										Amounts are averages. Further information may be displayed on back of
										pack.
									</caption>
								</Table>
							</TableContainer>
							<Typography gutterBottom className={classes.heading}>
								Allergens
							</Typography>
							<Typography>Peanuts</Typography>
						</Paper>
					</Grid>
				</Grid>
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

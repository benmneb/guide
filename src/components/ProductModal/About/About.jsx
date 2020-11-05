import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	Button,
	Paper,
	Grid,
	CardMedia,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Tooltip,
	Box
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { EcoRounded, OpenInNewRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import AboutEdit from './AboutEdit';
import { usePrepareLink, getParams, getEnums } from '../../../utils/routing';
import ProductTags from './ProductTags';

const useStyles = makeStyles((theme) => ({
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
	},
	buttonLabel: {
		color: theme.palette.text.secondary
	},
	imageSkeleton: {
		borderRadius: theme.shape.borderRadius,
		marginTop: theme.spacing(2)
	},
	infoSkeleton: {
		margin: theme.spacing(2, 0)
	}
}));

export default function About() {
	const styles = useStyles();
	const history = useHistory();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const product = useSelector((state) => state.product.selectedProduct);
	const [showEditModal, setShowEditModal] = useState(false);

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		},
		keepOldQuery: true
	});

	function handleShowEditModal() {
		if (isAuthenticated) {
			setShowEditModal(true);
		} else {
			history.push(authLink);
		}
	}

	function handleCloseEditModal() {
		setShowEditModal(false);
	}

	function createData(nutrition, perServe, per100g) {
		return { nutrition, perServe, per100g };
	}

	const rows = product && [
		createData('Energy', product.energy1, product.energy2),
		createData('Protein', product.protein1, product.protein2),
		createData('Fat, total', product.totalfat1, product.totalfat2),
		createData('- saturated', product.satfat1, product.satfat2),
		createData('Carbohydrate', product.carb1, product.carb2),
		createData('- sugars', product.sugar1, product.sugar2),
		createData('Dietary fibre', product.fibre1, product.fibre2),
		createData('Sodium', product.sodium1, product.sodium2)
	];

	return (
		<>
			<Grid component="section" container spacing={3}>
				<Grid component="section" item xs={12} sm={6}>
					<Grid container spacing={0} direction="column">
						<Grid item xs={12}>
							{product ? (
								<Box margin={0} marginBottom={2} display="flex" flexDirection="column">
									<ProductTags product={product} />
									<Box display="flex" flexDirection="column" alignItems="center">
										<Box maxWidth={300}>
											<CardMedia
												component="img"
												alt={product.productName}
												image={`${product.imageSrc}?width=300`}
												title={product.productName}
											/>
										</Box>
									</Box>
								</Box>
							) : (
								<Box display="flex" flexDirection="column" alignItems="center">
									<Skeleton width={80} height={40} />
									<Skeleton
										variant="rect"
										height={300}
										width={300}
										className={styles.imageSkeleton}
									/>
								</Box>
							)}
						</Grid>
					</Grid>
					<Grid container spacing={1} direction="column" alignItems="center">
						{product && product.storeLinks.length > 0 && (
							<Grid item xs={12}>
								<Typography className={styles.heading}>Buy Now Online</Typography>
							</Grid>
						)}
						{product &&
							product.storeLinks.map((store) => (
								<Grid key={store.linkId} item xs={12}>
									<Button
										variant="contained"
										color="primary"
										size="large"
										onClick={() =>
											window.open(store.link + '?ref=vomadguide', '_blank', 'noopener')
										}
										startIcon={store.isVegan ? <EcoRounded /> : null}
										endIcon={<OpenInNewRounded />}
									>
										{store.website}
									</Button>
								</Grid>
							))}
					</Grid>
				</Grid>
				<Grid item xs={12} sm={6}>
					{product ? (
						<>
							<Paper component="section" className={styles.paper} variant="outlined">
								<Typography gutterBottom className={styles.heading}>
									Ingredients
								</Typography>
								<Typography paragraph>{product.ingredients}</Typography>
								<Typography gutterBottom className={styles.heading}>
									Nutritional Info
								</Typography>
								<Typography>Servings per package: {product.serve1}</Typography>
								<Typography gutterBottom>Serving size: {product.serve2}</Typography>
								<TableContainer>
									<Table
										className={styles.table}
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
											Amounts are averages. Blanks indicate no data provided. Further
											information may be displayed on back of pack.
										</caption>
									</Table>
								</TableContainer>
								<Typography gutterBottom className={styles.heading}>
									Allergens
								</Typography>
								<Typography>{product.allergens}</Typography>
							</Paper>
							<Box display="flex" justifyContent="center" marginTop={1}>
								<Tooltip title="Correct any mistakes on this page">
									<Button
										onClick={handleShowEditModal}
										classes={{ label: styles.buttonLabel }}
									>
										Suggest an Edit
									</Button>
								</Tooltip>
							</Box>
						</>
					) : (
						<Box margin={2}>
							<Skeleton variant="rect" width={150} className={styles.infoSkeleton} />
							<Skeleton variant="rect" />
							<Skeleton variant="rect" width={300} />
							<Skeleton variant="rect" width={120} className={styles.infoSkeleton} />
							<Skeleton variant="rect" width={275} />
							<Skeleton variant="rect" width={250} />
						</Box>
					)}
				</Grid>
			</Grid>
			<AboutEdit
				show={showEditModal}
				productId={product && product.productId}
				onClose={handleCloseEditModal}
			/>
		</>
	);
}

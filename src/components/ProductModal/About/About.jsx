import React, { useState } from 'react';
import {
	Button,
	Paper,
	Grid,
	CardMedia,
	Container,
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
import OpenInNewRoundedIcon from '@material-ui/icons/OpenInNew';
import EcoRoundedIcon from '@material-ui/icons/Eco';
import { makeStyles } from '@material-ui/core/styles';
import AboutEdit from './AboutEdit';

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
		color: theme.palette.text.secondary,
		textTransform: 'none'
	},
	imageSkeleton: {
		borderRadius: theme.shape.borderRadius
	}
}));

export default function ProductAbout(props) {
	const { product } = props;
	const styles = useStyles();
	const [showEditModal, setShowEditModal] = useState(false);

	function handleShowEditModal() {
		setShowEditModal(true);
	}

	function handleCloseEditModal() {
		setShowEditModal(false);
	}

	function createData(nutrition, perServe, per100g) {
		return { nutrition, perServe, per100g };
	}

	const rows = product && [
		createData('Energy', product[0].energy1, product[0].energy2),
		createData('Protein', product[0].protein1, product[0].protein2),
		createData('Fat, total', product[0].totalfat1, product[0].totalfat2),
		createData('- saturated', product[0].satfat1, product[0].satfat2),
		createData('Carbohydrate', product[0].carb1, product[0].carb2),
		createData('- sugars', product[0].sugar1, product[0].sugar2),
		createData('Dietary fibre', product[0].fibre1, product[0].fibre2),
		createData('Sodium', product[0].sodium1, product[0].sodium2)
	];

	return (
		<>
			<Grid component="section" container spacing={3}>
				<Grid component="section" item xs={12} sm={6}>
					<Grid container spacing={0} direction="column">
						<Container maxWidth="xs">
							<Box padding={2} color="text.secondary">
								<Grid item xs={12}>
									{product ? (
										<CardMedia
											component="img"
											alt={product[0].productName}
											image={product[0].imageSrc}
											title={product[0].productName}
										/>
									) : (
										<Box margin={2}>
											<Skeleton
												variant="rect"
												height={300}
												width="100%"
												className={styles.imageSkeleton}
											/>
										</Box>
									)}
								</Grid>
							</Box>
						</Container>
					</Grid>
					<Grid container spacing={1} direction="column" alignItems="center">
						{product && product[0].storeLinks.length > 0 && (
							<Grid item xs={12}>
								<Typography className={styles.heading}>Buy Now Online</Typography>
							</Grid>
						)}
						{product &&
							product[0].storeLinks.map((store) => (
								<Grid key={store.linkId} item xs={12}>
									<Button
										variant="contained"
										color="primary"
										size="large"
										onClick={() =>
											window.open(store.link + '?ref=vomadguide', '_blank', 'noopener')
										}
										startIcon={store.isVegan ? <EcoRoundedIcon /> : null}
										endIcon={<OpenInNewRoundedIcon />}
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
								<Typography paragraph>{product[0].ingredients}</Typography>
								<Typography gutterBottom className={styles.heading}>
									Nutritional Info
								</Typography>
								<Typography>Servings per package: {product[0].serve1}</Typography>
								<Typography gutterBottom>Serving size: {product[0].serve2}</Typography>
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
											Amounts are averages. Further information may be displayed on back
											of pack.
										</caption>
									</Table>
								</TableContainer>
								<Typography gutterBottom className={styles.heading}>
									Allergens
								</Typography>
								<Typography>{product[0].allergens}</Typography>
							</Paper>
							<Box display="flex" justifyContent="flex-end" marginTop={1}>
								<Tooltip title="Last edit was by Vomad on 18/08/2020" placement="left">
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
							<Skeleton variant="rect" width={150} style={{ margin: '16px 0' }} />
							<Skeleton variant="rect" />
							<Skeleton variant="rect" width={300} />
							<Skeleton variant="rect" width={120} style={{ margin: '16px 0' }} />
							<Skeleton variant="rect" width={275} />
							<Skeleton variant="rect" width={250} />
						</Box>
					)}
				</Grid>
			</Grid>
			<AboutEdit
				show={showEditModal}
				productId={product && product[0].productId}
				onClose={handleCloseEditModal}
			/>
		</>
	);
}

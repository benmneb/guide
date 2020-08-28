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
	}
}));

export default function ProductAbout(props) {
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

	const rows = [
		createData(
			'Energy',
			props.product.nutrition.energy1,
			props.product.nutrition.energy2
		),
		createData(
			'Protein',
			props.product.nutrition.protein1,
			props.product.nutrition.protein2
		),
		createData(
			'Fat, total',
			props.product.nutrition.fatTotal1,
			props.product.nutrition.fatTotal2
		),
		createData(
			'- saturated',
			props.product.nutrition.fatSat1,
			props.product.nutrition.fatSat2
		),
		createData(
			'Carbohydrate',
			props.product.nutrition.carb1,
			props.product.nutrition.carb2
		),
		createData(
			'- sugars',
			props.product.nutrition.sugar1,
			props.product.nutrition.sugar2
		),
		createData('Sodium', props.product.nutrition.sodium1, props.product.nutrition.sodium2)
	];

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<Grid container spacing={0} direction="column">
						<Container maxWidth="xs">
							<Box padding={2} color="text.secondary">
								<Grid item xs={12}>
									<CardMedia
										component="img"
										alt={props.product.name}
										image={props.product.imageSrc}
										title={props.product.name}
									/>
								</Grid>
							</Box>
						</Container>
					</Grid>
					<Grid container spacing={1} direction="column" alignItems="center">
						<Grid item xs={12}>
							<Typography className={styles.heading}>Buy Now Online</Typography>
						</Grid>
						{props.product.onlineStores.map((store) => (
							<Grid key={store.id} item xs={12}>
								<Button
									variant="contained"
									color="primary"
									size="large"
									onClick={() =>
										window.open(store.url + '?ref=vomadguide', '_blank', 'noopener')
									}
									startIcon={store.isVegan ? <EcoRoundedIcon /> : null}
									endIcon={<OpenInNewRoundedIcon />}
								>
									{store.name}
								</Button>
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Paper className={styles.paper} variant="outlined">
						<Typography gutterBottom className={styles.heading}>
							Ingredients
						</Typography>
						<Typography paragraph>{props.product.ingredients}</Typography>
						<Typography gutterBottom className={styles.heading}>
							Nutritional Info
						</Typography>
						<Typography>
							Servings per package: {props.product.nutrition.servesPerPack}
						</Typography>
						<Typography gutterBottom>
							Serving size: {props.product.nutrition.serveSize}
						</Typography>
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
									Amounts are averages. Further information may be displayed on back of
									pack.
								</caption>
							</Table>
						</TableContainer>
						<Typography gutterBottom className={styles.heading}>
							Allergens
						</Typography>
						<Typography>{props.product.allergens}</Typography>
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
				</Grid>
			</Grid>
			<AboutEdit
				show={showEditModal}
				productId={props.product.id}
				onClose={handleCloseEditModal}
			/>
		</>
	);
}

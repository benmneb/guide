import React from 'react';
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
	Typography
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import EcoIcon from '@material-ui/icons/Eco';
import { makeStyles } from '@material-ui/core/styles';

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

export default function ProductAbout() {
	const styles = useStyles();

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={6}>
				<Grid container spacing={0} direction="column">
					<Container maxWidth="xs">
						<Paper className={styles.paper} elevation={0}>
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
						<Typography className={styles.heading}>Buy Now Online</Typography>
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
				<Paper className={styles.paper} variant="outlined">
					<Typography gutterBottom className={styles.heading}>
						Ingredients
					</Typography>
					<Typography paragraph>
						Roasted Peanuts (85% minimum), Sugar, Vegetable Oils, Salt. Roasted Peanuts
						(85% minimum), Sugar, Vegetable Oils, Salt. Roasted Peanuts (85% minimum),
						Sugar, Vegetable Oils, Salt. Roasted Peanuts (85% minimum), Sugar, Vegetable
						Oils, Salt. Roasted Peanuts (85% minimum), Sugar, Vegetable Oils, Salt.
						Roasted Peanuts (85% minimum), Sugar, Vegetable Oils, Salt. Roasted Peanuts
						(85% minimum), Sugar, Vegetable Oils, Salt. Roasted Peanuts (85% minimum),
						Sugar, Vegetable Oils, Salt. Roasted Peanuts (85% minimum), Sugar, Vegetable
						Oils, Salt. Roasted Peanuts (85% minimum), Sugar, Vegetable Oils, Salt.
					</Typography>
					<Typography gutterBottom className={styles.heading}>
						Nutritional Info
					</Typography>
					<Typography>Servings per package: 25</Typography>
					<Typography gutterBottom>Serving size: 20g</Typography>
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
					<Typography>Peanuts</Typography>
				</Paper>
			</Grid>
		</Grid>
	);
}

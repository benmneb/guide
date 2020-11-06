import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	heading: {
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightBold
	},
	table: {
		minWidth: 280
	}
}));

export default function NutritionInfo({ product }) {
	const styles = useStyles();

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

	if (
		!product.energy1 &&
		!product.energy2 &&
		!product.protein1 &&
		!product.protein2 &&
		!product.totalfat1 &&
		!product.totalfat2 &&
		!product.satfat1 &&
		!product.satfat2 &&
		!product.carb1 &&
		!product.carb2 &&
		!product.sugar1 &&
		!product.sugar2 &&
		!product.fibre1 &&
		!product.fibre2 &&
		!product.sodium1 &&
		!product.sodium2
	)
		return null;

	return (
		<>
			<Typography gutterBottom className={styles.heading}>
				Nutritional Info
			</Typography>
			{product.serve1 && <Typography>Servings per package: {product.serve1}</Typography>}
			{product.serve2 && (
				<Typography gutterBottom>Serving size: {product.serve2}</Typography>
			)}
			<TableContainer>
				<Table className={styles.table} size="small" aria-label="nutrition information">
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
					<Typography component="caption">
						Amounts are averages. Blanks indicate no data provided. Further information
						may be displayed on back of pack.
					</Typography>
				</Table>
			</TableContainer>
		</>
	);
}

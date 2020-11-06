import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NutritionInfo from './NutritionInfo';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary
	},
	heading: {
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightBold
	}
}));

export default function ProductInfo({ product }) {
	const styles = useStyles();

	return (
		<Paper component="section" className={styles.paper} variant="outlined">
			{product.ingredients && (
				<>
					<Typography gutterBottom className={styles.heading}>
						Ingredients
					</Typography>
					<Typography paragraph>{product.ingredients}</Typography>
				</>
			)}
			<NutritionInfo product={product} />
			{product.allergens && (
				<>
					<Typography gutterBottom className={styles.heading}>
						Allergens
					</Typography>
					<Typography>{product.allergens}</Typography>
				</>
			)}
		</Paper>
	);
}

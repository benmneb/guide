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

function Ingredients({ product }) {
	const styles = useStyles();

	if (product.ingredients)
		return (
			<>
				<Typography gutterBottom className={styles.heading}>
					Ingredients
				</Typography>
				<Typography paragraph>{product.ingredients}</Typography>
			</>
		);

	return null;
}

function MayContain({ product }) {
	const styles = useStyles();

	if (product.mayContain)
		return (
			<>
				<Typography gutterBottom className={styles.heading}>
					May Contain
				</Typography>
				<Typography>{product.mayContain}</Typography>
			</>
		);

	return null;
}

export default function ProductInfo({ product }) {
	const styles = useStyles();

	return (
		<Paper component="section" className={styles.paper} variant="outlined">
			<Ingredients product={product} />
			<NutritionInfo product={product} />
			<MayContain product={product} />
		</Paper>
	);
}

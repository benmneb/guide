import { useEffect, useState } from 'react';
import { Button, Chip, Box } from '@material-ui/core';
import { EcoRounded, LocalOfferRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	chipBox: {
		marginBottom: theme.spacing(2),
		'& > *': {
			margin: theme.spacing(0.5)
		}
	}
}));

export default function ProductTags({ product }) {
	const styles = useStyles();
	const maxInitialTags = 7;
	const [productTags, setProductTags] = useState(null);

	useEffect(() => {
		if (product?.tags?.length > maxInitialTags) {
			setProductTags(product.tags.slice(0, maxInitialTags));
		} else {
			setProductTags(product.tags);
		}
	}, [product?.tags]);

	function DisplayTags() {
		return (
			productTags !== null &&
			productTags
				.filter((tag) => tag !== 'Men' && tag !== 'Women')
				.map((tag) => (
					<Chip key={tag} icon={<LocalOfferRounded fontSize="small" />} label={tag} />
				))
		);
	}

	function handleShowMoreTags() {
		return setProductTags(product.tags);
	}

	function ShowMoreButton() {
		const remainingTags = product?.tags?.length - maxInitialTags;

		if (productTags?.length === maxInitialTags) {
			return <Button onClick={handleShowMoreTags}>+ {remainingTags} more</Button>;
		}

		return null;
	}

	return (
		<Box
			display="flex"
			flexWrap="wrap"
			justifyContent="center"
			className={styles.chipBox}
		>
			<Chip icon={<EcoRounded fontSize="small" />} label="Vegan" />
			<DisplayTags />
			<ShowMoreButton />
		</Box>
	);
}

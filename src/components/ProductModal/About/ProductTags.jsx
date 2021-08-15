import { useEffect, useState } from 'react';
import { Button, Chip, Box, useMediaQuery } from '@material-ui/core';
import { EcoRounded, LocalOfferRounded } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	chipBox: {
		marginBottom: theme.spacing(2),
		'& > *': {
			margin: theme.spacing(0.5)
		}
	}
}));

export default function ProductTags(props) {
	const { product, loading } = props;
	const styles = useStyles();
	const onlyXs = useMediaQuery((theme) => theme.breakpoints.only('xs'));
	const maxInitialTags = 7;
	const [productTags, setProductTags] = useState(null);

	useEffect(() => {
		if (product?.tags?.length > maxInitialTags) {
			setProductTags(product?.tags.slice(0, maxInitialTags));
		} else {
			setProductTags(product?.tags);
		}
	}, [product?.tags]);

	function DisplayTags() {
		if (!productTags) return null;

		return productTags
			.filter((tag) => tag !== 'Men' && tag !== 'Women')
			.map((tag) => (
				<Chip key={tag} icon={<LocalOfferRounded fontSize="small" />} label={tag} />
			));
	}

	function handleShowMoreTags() {
		if (!productTags) return null;
		return setProductTags(product?.tags);
	}

	function ShowMoreButton() {
		if (!productTags) return null;

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
			{loading ? (
				<>
					{[...Array(onlyXs ? 5 : 7)].map((_, i) => (
						<Skeleton width={80} height={40} key={i} style={{ margin: '0 8px' }} />
					))}
				</>
			) : (
				<>
					<Chip icon={<EcoRounded fontSize="small" />} label="Vegan" />
					<DisplayTags />
					<ShowMoreButton />
				</>
			)}
		</Box>
	);
}

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Grid, CardMedia, Typography, Tooltip, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { EcoRounded, OpenInNewRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import AboutEdit from './AboutEdit';
import { usePrepareLink, getParams, getEnums } from '../../../utils/routing';
import ProductTags from './ProductTags';
import ProductInfo from './ProductInfo';

const useStyles = makeStyles((theme) => ({
	heading: {
		color: theme.palette.text.primary,
		fontWeight: theme.typography.fontWeightBold
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
											window.open(`${store.link}?ref=vomadguide`, '_blank', 'noopener')
										}
										startIcon={
											store.isVeganAffiliate ? (
												<Tooltip title="Vegan store">
													<EcoRounded />
												</Tooltip>
											) : null
										}
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
							<ProductInfo product={product} />
							<Box display="flex" justifyContent="center" marginTop={1}>
								<Tooltip title="Correct any mistakes on this page">
									<Button onClick={handleShowEditModal}>Suggest an Edit</Button>
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

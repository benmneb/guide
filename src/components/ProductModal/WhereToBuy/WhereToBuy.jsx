import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
	Grid,
	Fab,
	SwipeableDrawer,
	Box,
	Hidden,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Fade
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddRounded, ListRounded as ListIcon } from '@material-ui/icons';
import { LoadScript } from '@react-google-maps/api';
import {
	showSnackbar,
	setCurrentLocation,
	setStores,
	setSelectedStore
} from '../../../store/actions';
import StoresListSection from './StoresListSection';
import StoresMap from './StoresMap';
import StoresLoader from './StoresLoader';
import { usePrepareLink, getParams, getEnums } from '../../../utils/routing';

const useStyles = makeStyles((theme) => ({
	mapBox: {
		width: `calc(100% + ${theme.spacing(4)}px)`, // account for parent padding to make map full width
		height: `calc(100vh - ${theme.spacing(27.5)}px)`, // approx screen taken up by rest of UI
		margin: theme.spacing(0, -4) // make map full width
	},
	drawerFab: {
		position: 'fixed',
		right: theme.spacing(2),
		bottom: theme.spacing(3) + 56, // 56 is height of bottomNav bar
		color: theme.palette.common.white,
		zIndex: theme.zIndex.mobileStepper - 1
	},
	drawerFabIcon: {
		marginLeft: theme.spacing(1)
	},
	addFab: {
		position: 'fixed',
		left: theme.spacing(2),
		bottom: theme.spacing(3) + 56, // 56 is height of bottomNav bar
		color: theme.palette.common.white,
		zIndex: theme.zIndex.mobileStepper - 1
	},
	swipableDrawer: {
		maxHeight: '50%'
	},
	loader: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			height: `calc(100vh - ${theme.spacing(27.5)}px)` // approx screen taken up by rest of UI, taken from styles.mapBox
		},
		[theme.breakpoints.up('md')]: {
			height: 538
		}
	}
}));

const libraries = ['places']; // this must be outside the main function

export default function WhereToBuy() {
	const styles = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const currentLocation = useSelector((state) => state.product.currentLocation);
	const selectedProduct = useSelector((state) => state.product.selectedProduct);
	const selectedStore = useSelector((state) => state.product.selectedStore);
	const stores = useSelector((state) => state.product.stores);
	const [openBottomDrawer, setOpenBottomDrawer] = useState(false);
	const [showAddStore, setShowAddStore] = useState(false);
	const [markerMap, setMarkerMap] = useState({});
	const [infoWindowOpen, setInfoWindowOpen] = useState(false);
	const alreadyFetchedStores = useRef(Boolean(stores));

	const authLink = usePrepareLink({
		query: {
			[getParams.popup]: getEnums.popup.signIn
		},
		keepOldQuery: true
	});

	function toggleBottomDrawer(currentState) {
		setOpenBottomDrawer(currentState);
	}

	// get current location on mount
	useEffect(() => {
		let mounted = true;

		if (!currentLocation) {
			if ('geolocation' in navigator) {
				window.navigator.geolocation.getCurrentPosition(
					(position) => {
						if (mounted)
							dispatch(
								setCurrentLocation({
									lat: position.coords.latitude,
									lng: position.coords.longitude
								})
							);
					},
					(err) => {
						if (mounted) {
							console.error(err);
							if (err.code === 1) {
								dispatch(
									showSnackbar({
										snackData: {
											type: 'error',
											title: 'Location unavailable',
											message: 'You need to allow access.'
										}
									})
								);
							} else {
								dispatch(
									showSnackbar({
										snackData: {
											type: 'error',
											title: 'Location unavailable',
											message: 'Could not access your location. Please try again.'
										}
									})
								);
							}
						}
					}
				);
			} else {
				if (mounted) {
					console.error('window.navigator is not available');
					dispatch(
						showSnackbar({
							snackData: {
								type: 'error',
								title: 'Location unavailable',
								message:
									'Could not access your location. You might need to update your browser.'
							}
						})
					);
				}
			}
		}

		return () => {
			mounted = false;
		};
	}, [dispatch, currentLocation]);

	// initially fetch stores
	useEffect(() => {
		let mounted = true;
		const source = axios.CancelToken.source();

		if (currentLocation && selectedProduct && !alreadyFetchedStores.current) {
			axios
				.get(
					`https://api.vomad.guide/stores/${selectedProduct.productId}?lat=${currentLocation.lat}&lng=${currentLocation.lng}`,
					{ cancelToken: source.token }
				)
				.then((res) => {
					if (mounted) dispatch(setStores(res.data));
				})
				.catch((err) => {
					if (mounted) {
						console.error('Error fetching stores:', err);
						dispatch(
							showSnackbar({
								snackData: {
									type: 'error',
									title: 'Could not show stores',
									message: 'There was an error on our end. Please try again.'
								}
							})
						);
					}
				});
		}

		return () => {
			mounted = false;
			source.cancel('Fetching stores cancelled during clean-up');
		};
	}, [currentLocation, selectedProduct, dispatch]);

	function handleListItemClick(store) {
		if (selectedStore && selectedStore.prod_store_id === store.prod_store_id) {
			handleDeselectStore();
		} else {
			if (infoWindowOpen) setInfoWindowOpen(false);
			setTimeout(() => {
				// timeout fixes the infoWindow glitch when clicking stores in menu
				dispatch(setSelectedStore(store));
				setInfoWindowOpen(true);
			}, 1);
		}
	}

	function handleDeselectStore() {
		dispatch(setSelectedStore(null));
		setInfoWindowOpen(false);
	}

	function handleCopyAddress(address) {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(address)
				.then(
					dispatch(
						showSnackbar({
							snackData: {
								type: 'info',
								message: 'Address copied to clipboard'
							}
						})
					)
				)
				.catch((err) => {
					console.error(err);
					dispatch(
						showSnackbar({
							snackData: {
								type: 'error',
								message: 'Could not copy to clipboard'
							}
						})
					);
				});
		} else {
			dispatch(
				showSnackbar({
					snackData: {
						type: 'error',
						message: 'Could not copy to clipboard'
					}
				})
			);
		}
	}

	function handleAddStoreFabClick() {
		if (isAuthenticated) {
			setOpenBottomDrawer(true);
			setShowAddStore(true);
		} else {
			history.push(authLink);
		}
	}

	function handleSetShowAddStore() {
		if (isAuthenticated) {
			setShowAddStore(!showAddStore);
		} else {
			history.push(authLink);
		}
	}

	function handleGetDirections() {
		const origin = currentLocation.lat + ',' + currentLocation.lng;
		const destination = selectedStore.address;
		window.open(
			encodeURI(
				`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`
			),
			'_blank',
			'noopener noreferrer'
		);
	}

	const onMarkerLoad = (marker, store) => {
		// this is needed for infoWindows to appear on marker click
		return setMarkerMap((prevState) => {
			return { ...prevState, [store.prod_store_id]: marker };
		});
	};

	return (
		<LoadScript
			googleMapsApiKey="AIzaSyB_EdK1akrFvT1x2wfDHB-XfJsrraT3Fb8"
			libraries={libraries}
			loadingElement={<StoresLoader stage="maps" />}
		>
			{currentLocation ? (
				stores ? (
					<>
						<Hidden mdUp>
							<Box display="flex" justifyContent="center">
								<Box className={styles.mapBox}>
									<StoresMap
										onMarkerLoad={(marker, store) => onMarkerLoad(marker, store)}
										markerMap={markerMap}
										onMarkerClick={(store) => handleListItemClick(store)}
										deselectStore={handleDeselectStore}
										infoWindowOpen={infoWindowOpen}
										copyAddress={handleCopyAddress}
										getDirections={handleGetDirections}
									/>
								</Box>
								<Fab
									color="primary"
									variant="extended"
									aria-label="Show list"
									className={styles.drawerFab}
									onClick={() => toggleBottomDrawer(!openBottomDrawer)}
								>
									Show list
									<ListIcon className={styles.drawerFabIcon} />
								</Fab>
								<Fab
									color="primary"
									size="medium"
									aria-label="Add store to list"
									className={styles.addFab}
									onClick={handleAddStoreFabClick}
								>
									<AddRounded />
								</Fab>
								<Box>
									<SwipeableDrawer
										classes={{ paperAnchorBottom: styles.swipableDrawer }}
										anchor="bottom"
										open={openBottomDrawer}
										onOpen={() => toggleBottomDrawer(true)}
										onClose={() => toggleBottomDrawer(false)}
									>
										<StoresListSection
											showAddStore={showAddStore}
											setShowAddStore={handleSetShowAddStore}
											onListItemClick={(store) => handleListItemClick(store)}
											handleCopyAddress={handleCopyAddress}
											getDirections={handleGetDirections}
										/>
									</SwipeableDrawer>
								</Box>
							</Box>
						</Hidden>
						<Hidden smDown>
							<Grid container spacing={2}>
								<Grid item md={6}>
									<Box marginTop={1} height={538}>
										<StoresMap
											onMarkerLoad={(marker, store) => onMarkerLoad(marker, store)}
											markerMap={markerMap}
											onMarkerClick={(store) => handleListItemClick(store)}
											deselectStore={handleDeselectStore}
											infoWindowOpen={infoWindowOpen}
											copyAddress={handleCopyAddress}
											getDirections={handleGetDirections}
										/>
									</Box>
								</Grid>
								<Grid item md={6}>
									<Box marginTop={0} height={538} overflow="auto">
										<StoresListSection
											showAddStore={showAddStore}
											setShowAddStore={handleSetShowAddStore}
											onListItemClick={(store) => handleListItemClick(store)}
											handleCopyAddress={handleCopyAddress}
											getDirections={handleGetDirections}
										/>
									</Box>
								</Grid>
							</Grid>
						</Hidden>
					</>
				) : (
					<StoresLoader stage="stores" />
				)
			) : (
				<Fade in>
					<Box>
						<DialogTitle>Allow location access</DialogTitle>
						<DialogContent>
							<DialogContentText>
								To view stores near you where this product has been seen you need to allow
								location access.
							</DialogContentText>
							<DialogContentText>
								If you do not see a location prompt try adjusting your location permission
								settings.
							</DialogContentText>
						</DialogContent>
					</Box>
				</Fade>
			)}
		</LoadScript>
	);
}

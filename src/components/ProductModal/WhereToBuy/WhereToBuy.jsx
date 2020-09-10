import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	Grid,
	Fab,
	SwipeableDrawer,
	Box,
	Hidden,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddRounded, ListRounded as ListIcon } from '@material-ui/icons';
import { LoadScript } from '@react-google-maps/api';
import * as actionCreators from '../../../store/actions';
import { stores } from '../../../assets/stores';
import StoresListSection from './StoresListSection';
import StoresMap from './StoresMap';

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
	}
}));

const libraries = ['places'];

function WhereToBuy({ onShowSnackbar, currentLocation, setCurrentLocation }) {
	const styles = useStyles();
	const [selectedStore, setSelectedStore] = useState(null);
	const [errMessage, setErrMessage] = useState(null);
	const [openBottomDrawer, setOpenBottomDrawer] = useState(false);
	const [showAddStore, setShowAddStore] = useState(false);
	const [markerMap, setMarkerMap] = useState({});
	const [infoWindowOpen, setInfoWindowOpen] = useState(false);

	function toggleBottomDrawer(currentState) {
		setOpenBottomDrawer(currentState);
	}

	useEffect(() => {
		let mounted = true;

		if ('geolocation' in navigator) {
			window.navigator.geolocation.getCurrentPosition(
				(position) => {
					if (mounted) console.log('set current location');
					setCurrentLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude
					});
				},
				(err) => {
					if (mounted) {
						setErrMessage(err.message);
						console.error(err.message);
					}
				}
			);
		} else {
			console.error('window.navigator is not available');
			onShowSnackbar({
				snackData: {
					type: 'error',
					title: 'Location unavailable',
					message: 'There was an error accessing your location.'
				}
			});
		}

		return () => {
			mounted = false;
		};
	}, [setCurrentLocation, onShowSnackbar]);

	function handleListItemClick(store) {
		if (selectedStore === store) {
			handleDeselectStore();
		} else {
			if (infoWindowOpen) setInfoWindowOpen(false);
			setTimeout(() => {
				// timeout fixes the infoWindow glitch when clicking stores in menu
				setSelectedStore(store);
				setInfoWindowOpen(true);
			}, 1);
		}
	}

	function handleDeselectStore() {
		setSelectedStore(null);
		setInfoWindowOpen(false);
	}

	function handleCopyAddress(address) {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(address)
				.then(
					onShowSnackbar({
						snackData: {
							type: 'info',
							message: 'Address copied to clipboard'
						}
					})
				)
				.catch((err) => {
					console.error(err);
					onShowSnackbar({
						snackData: {
							type: 'error',
							message: 'Could not copy to clipboard'
						}
					});
				});
		} else {
			onShowSnackbar({
				snackData: {
					type: 'error',
					message: 'Could not copy to clipboard'
				}
			});
		}
	}

	function handleAddStoreFabClick() {
		setOpenBottomDrawer(true);
		setShowAddStore(true);
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
			return { ...prevState, [store.id]: marker };
		});
	};

	return (
		<LoadScript
			googleMapsApiKey="AIzaSyB_EdK1akrFvT1x2wfDHB-XfJsrraT3Fb8"
			libraries={libraries}
		>
			{currentLocation ? (
				<>
					<Hidden mdUp>
						<Box display="flex" justifyContent="center">
							<Box className={styles.mapBox}>
								<StoresMap
									stores={stores}
									selectedStore={selectedStore}
									onMarkerLoad={(marker, store) => onMarkerLoad(marker, store)}
									markerMap={markerMap}
									onMarkerClick={(store) => handleListItemClick(store)}
									deselectStore={handleDeselectStore}
									infoWindowOpen={infoWindowOpen}
									copyAddress={handleCopyAddress}
									getDirections={handleGetDirections}
									// mapPosition={currentLocation}
									errorMessage={errMessage}
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
										setShowAddStore={setShowAddStore}
										onListItemClick={(store) => handleListItemClick(store)}
										handleCopyAddress={handleCopyAddress}
										stores={stores}
										selectedStore={selectedStore && selectedStore.id}
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
										stores={stores}
										selectedStore={selectedStore}
										onMarkerLoad={(marker, store) => onMarkerLoad(marker, store)}
										markerMap={markerMap}
										onMarkerClick={(store) => handleListItemClick(store)}
										deselectStore={handleDeselectStore}
										infoWindowOpen={infoWindowOpen}
										// mapPosition={currentLocation}
										copyAddress={handleCopyAddress}
										getDirections={handleGetDirections}
										errorMessage={errMessage}
									/>
								</Box>
							</Grid>
							<Grid item md={6}>
								<Box marginTop={0} height={538} overflow="auto">
									<StoresListSection
										showAddStore={showAddStore}
										setShowAddStore={setShowAddStore}
										onListItemClick={(store) => handleListItemClick(store)}
										handleCopyAddress={handleCopyAddress}
										stores={stores}
										selectedStore={selectedStore && selectedStore.id}
										getDirections={handleGetDirections}
									/>
								</Box>
							</Grid>
						</Grid>
					</Hidden>
				</>
			) : (
				<Box>
					<DialogTitle>Allow location access</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To view stores near you where this product has been seen you need to allow
							location access. If you do not see a location prompt try refreshing the page
							or adjusting your location permission settings.
						</DialogContentText>
					</DialogContent>
				</Box>
			)}
		</LoadScript>
	);
}

const mapStateToProps = (state) => {
	return {
		currentLocation: state.currentLocation
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData })),
		setCurrentLocation: (location) =>
			dispatch(actionCreators.setCurrentLocation(location))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WhereToBuy);

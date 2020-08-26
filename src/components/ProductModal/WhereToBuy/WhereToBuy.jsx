import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import { stores } from '../../../assets/stores';
import StoresMap from './StoresMap';
import StoresListSection from './StoresListSection';
import { Grid, Fab, SwipeableDrawer, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, List as ListIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	mapBox: {
		[theme.breakpoints.down('md')]: {
			width: `calc(100% + ${theme.spacing(4)}px)`, // account for parent padding to make map full width
			height: `calc(100vh - ${theme.spacing(20.6)}px)`, // approx screen taken up by rest of UI
			margin: theme.spacing(0, -4) // make map full width
		}
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
	alert: {
		width: '100%'
	}
}));

function WhereToBuy({ onShowSnackbar }) {
	const styles = useStyles();
	const [selectedStore, setSelectedStore] = useState(null);
	const [mapPosition, setMapPosition] = useState(null);
	const [errMessage, setErrMessage] = useState(null);
	const [openBottomDrawer, setOpenBottomDrawer] = useState(false);
	const [showAddStore, setShowAddStore] = useState(false);

	function toggleBottomDrawer(currentState) {
		setOpenBottomDrawer(currentState);
	}

	useEffect(() => {
		window.navigator.geolocation.getCurrentPosition(
			(position) =>
				setMapPosition({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}),
			(err) => setErrMessage(err.message)
		);
	}, []);

	function handleListItemClick(store) {
		if (selectedStore === store.id) {
			setSelectedStore(null);
		} else {
			setSelectedStore(store.id);
			setMapPosition(store.coords);
		}
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

	return (
		<>
			<Box display={{ xs: 'flex', md: 'none' }} justifyContent="center">
				<Box className={styles.mapBox}>
					<StoresMap
						data={stores}
						selectedStore={selectedStore}
						mapPosition={mapPosition}
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
					<Add />
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
							handleListItemClick={handleListItemClick}
							handleCopyAddress={handleCopyAddress}
							stores={stores}
							selectedStore={selectedStore}
						/>
					</SwipeableDrawer>
				</Box>
			</Box>
			<Box display={{ xs: 'none', md: 'flex' }}>
				<Grid container spacing={2}>
					<Grid item md={6}>
						<Box marginTop={1} height={570}>
							<StoresMap
								data={stores}
								selectedStore={selectedStore}
								mapPosition={mapPosition}
								errorMessage={errMessage}
							/>
						</Box>
					</Grid>
					<Grid item md={6}>
						<Box marginTop={0} height={570} overflow="auto">
							<StoresListSection
								showAddStore={showAddStore}
								setShowAddStore={setShowAddStore}
								handleListItemClick={handleListItemClick}
								handleCopyAddress={handleCopyAddress}
								stores={stores}
								selectedStore={selectedStore}
							/>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		onShowSnackbar: ({ snackData }) =>
			dispatch(actionCreators.showSnackbar({ snackData }))
	};
};

export default connect(null, mapDispatchToProps)(WhereToBuy);

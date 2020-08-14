import React, { useState, useEffect } from 'react';
import { stores } from '../../assets/stores';
import StoresList from './StoresList';
import StoresMap from './StoresMap';
import {
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Snackbar,
	Fab,
	SwipeableDrawer,
	Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { AddCircle, Add, List as ListIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	storesList: {
		width: '100%',
		backgroundColor: theme.palette.background.paper
	},
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

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductWhereToBuy() {
	const styles = useStyles();
	const [selectedStore, setSelectedStore] = useState(null);
	const [mapPosition, setMapPosition] = useState(null);
	const [errMessage, setErrMessage] = useState(null);
	const [showSnack, setShowSnack] = useState(false);
	const [showErrorSnack, setShowErrorSnack] = useState(false);
	const [openBottomDrawer, setOpenBottomDrawer] = useState(false);

	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setShowSnack(false);
	};

	const handleCloseErrorSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setShowErrorSnack(false);
	};

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
				.then(setShowSnack(true))
				.catch((err) => console.error(err));
		} else {
			setShowErrorSnack(true);
		}
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
					aria-label="Show list"
					className={styles.addFab}
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
						<List
							component="div"
							aria-label="Stores near you"
							className={styles.storesList}
						>
							<StoresList
								data={stores}
								selectedStore={selectedStore}
								listItemClick={handleListItemClick}
								copyAddress={handleCopyAddress}
							/>
							<ListItem button>
								<ListItemIcon>
									<AddCircle color="primary" />
								</ListItemIcon>
								<ListItemText primary="Add a Store to the List" />
							</ListItem>
						</List>
					</SwipeableDrawer>
				</Box>
			</Box>
			<Box display={{ xs: 'none', md: 'flex' }}>
				<Grid container spacing={2}>
					<Grid item md={6}>
						<Box marginTop={2} height={570}>
							<StoresMap
								data={stores}
								selectedStore={selectedStore}
								mapPosition={mapPosition}
								errorMessage={errMessage}
							/>
						</Box>
					</Grid>
					<Grid item md={6}>
						<Box marginTop={2} height={570} overflow="auto">
							<List
								component="div"
								aria-label="Stores near you"
								className={styles.storesList}
							>
								<StoresList
									data={stores}
									selectedStore={selectedStore}
									listItemClick={handleListItemClick}
									copyAddress={handleCopyAddress}
								/>
								<ListItem button>
									<ListItemIcon>
										<AddCircle color="primary" />
									</ListItemIcon>
									<ListItemText primary="Add a Store to the List" />
								</ListItem>
							</List>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Snackbar
				open={showSnack}
				autoHideDuration={3000}
				onClose={handleCloseSnack}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={handleCloseSnack} severity="info" className={styles.alert}>
					Address copied to clipboard
				</Alert>
			</Snackbar>
			<Snackbar
				open={showErrorSnack}
				autoHideDuration={3000}
				onClose={handleCloseErrorSnack}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={handleCloseErrorSnack} severity="error" className={styles.alert}>
					Could not copy to clipboard
				</Alert>
			</Snackbar>
		</>
	);
}

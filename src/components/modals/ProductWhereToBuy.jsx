import React, { useState, useEffect, useRef } from 'react';
import { Grid, IconButton, Tooltip, Typography, Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import PlaceIcon from '@material-ui/icons/Place';
import StoreIcon from '@material-ui/icons/StoreRounded';
import EcoRoundedIcon from '@material-ui/icons/EcoRounded';
import LaunchRoundedIcon from '@material-ui/icons/LaunchRounded';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import { stores } from '../../assets/stores';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	listRoot: {
		width: '100%',
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing(4)
	},
	map: {
		height: '100%',
		borderRadius: theme.shape.borderRadius
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
	const [mapZoom, setMapZoom] = useState(13);
	const [errMessage, setErrMessage] = useState(null);
	const [showSnack, setShowSnack] = useState(false);
	const [showErrorSnack, setShowErrorSnack] = useState(false);

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

	function PointsLayer(props) {
		return props.data.map((store) => (
			<PointMarker
				key={store.id}
				content={store.name}
				position={store.coords}
				openPopup={props.selectedMarker === store.id}
			/>
		));
	}

	function PointMarker(props) {
		const markerRef = useRef(null);
		const { openPopup } = props;

		useEffect(() => {
			if (openPopup) markerRef.current.leafletElement.openPopup();
		}, [openPopup]);

		return (
			<Marker ref={markerRef} position={props.position}>
				<Popup>{props.content}</Popup>
			</Marker>
		);
	}

	let mapDiv;
	if (errMessage) {
		mapDiv = <Typography>Error: {errMessage}</Typography>;
	} else if (mapPosition) {
		mapDiv = (
			<Map
				center={mapPosition}
				zoom={mapZoom}
				animate
				duration="0.375"
				className={styles.map}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<PointsLayer selectedMarker={selectedStore} data={stores} />
			</Map>
		);
	} else {
		mapDiv = <Typography>Please accept the location request</Typography>;
	}

	const handleListItemClick = (store) => {
		if (selectedStore === store.id) {
			setSelectedStore(null);
		} else {
			setSelectedStore(store.id);
			setMapPosition(store.coords);
			setMapZoom(15);
		}
	};

	function copyAddress(address) {
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
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<Box marginTop={2} height={475}>
						{mapDiv}
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<List component="div" aria-label="Stores near you" className={styles.listRoot}>
						{stores.map((store) => (
							<div key={store.id}>
								<ListItem
									button
									onClick={() => handleListItemClick(store)}
									selected={selectedStore === store.id}
								>
									<ListItemIcon>
										{store.isVegan ? (
											<EcoRoundedIcon style={{ color: green[500] }} />
										) : (
											<PlaceIcon />
										)}
									</ListItemIcon>
									<ListItemText primary={store.name} secondary={store.address} />
									<ListItemSecondaryAction>
										<Tooltip
											title="Have you seen this product in this store?"
											placement="bottom-end"
										>
											<IconButton aria-label="confirm">
												<ThumbUpRoundedIcon fontSize="small" />
											</IconButton>
										</Tooltip>
									</ListItemSecondaryAction>
								</ListItem>
								<Collapse in={selectedStore === store.id} timeout="auto" unmountOnExit>
									<List component="div" dense style={{ paddingTop: 0 }}>
										<ListItem button className={styles.nested}>
											<ListItemIcon>
												<LaunchRoundedIcon fontSize="small" />
											</ListItemIcon>
											<ListItemText primary="Get directions in Google Maps" />
										</ListItem>
										<ListItem
											button
											onClick={() => copyAddress(store.address)}
											className={styles.nested}
										>
											<ListItemIcon>
												<FileCopyRoundedIcon fontSize="small" />
											</ListItemIcon>
											<ListItemText primary="Copy address to clipboard" />
										</ListItem>
										<ListItem button className={styles.nested}>
											<ListItemIcon>
												<StoreIcon />
											</ListItemIcon>
											<ListItemText primary="See all products in this store" />
										</ListItem>
									</List>
								</Collapse>
							</div>
						))}
					</List>
				</Grid>
			</Grid>
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

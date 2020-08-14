import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const useStyles = makeStyles((theme) => ({
	map: {
		height: '100%',
		borderRadius: theme.shape.borderRadius
	}
}));

export default function StoresMap(props) {
	const styles = useStyles();
	const mapZoom = 15;

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

	let showMap;
	if (props.errMessage) {
		showMap = <Typography>Error: {props.errMessage}</Typography>;
	} else if (props.mapPosition) {
		showMap = (
			<Map
				center={props.mapPosition}
				zoom={mapZoom}
				animate
				duration="0.375"
				className={styles.map}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<PointsLayer selectedMarker={props.selectedStore} data={props.data} />
			</Map>
		);
	} else {
		showMap = <Typography>Please accept the location request</Typography>;
	}

	return showMap;
}

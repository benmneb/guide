import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import InfoWindowContent from './InfoWindowContent';

function StoresMap(props) {
	const theme = useTheme();
	const stores = useSelector((state) => state.product.stores);
	const selectedStore = useSelector((state) => state.product.selectedStore);
	const currentLocation = useSelector((state) => state.product.currentLocation);
	const [map, setMap] = useState(null);
	const [mapCenter, setMapCenter] = useState(null);

	const containerStyle = {
		width: '100%',
		height: '100%',
		borderRadius: theme.shape.borderRadius
	};

	const options = {
		gestureHandling: 'greedy', // https://developers.google.com/maps/documentation/javascript/interaction#understand-the-terminology
		streetViewControl: false,
		mapTypeControl: false,
		fullscreenControl: false,
		rotateControl: false,
		zoomControl: false
	};

	const onLoad = useCallback(
		(map) => {
			if (stores.length > 1) {
				const bounds = new window.google.maps.LatLngBounds();
				stores.map((store) => {
					bounds.extend({ lat: store.lat, lng: store.lng });
					return store.prod_store_id;
				});
				map.fitBounds(bounds);
				setMap(map);
			} else if (stores.length === 1) {
				setMapCenter({ lat: stores[0].lat, lng: stores[0].lng });
			}
		},
		[stores]
	);

	const onUnmount = useCallback((map) => {
		setMap(null);
	}, []);

	return (
		<GoogleMap
			map={map} // i added this here to remove the error, the docs sux
			onLoad={onLoad}
			onUnmount={onUnmount}
			mapContainerStyle={containerStyle}
			center={mapCenter || currentLocation} // fallback for when there are no stores
			zoom={13}
			options={options}
			onClick={props.deselectStore}
			clickableIcons={false}
		>
			{stores.map((store) => (
				<Marker
					key={store.prod_store_id}
					onLoad={(marker) => props.onMarkerLoad(marker, store)}
					position={{ lat: store.lat, lng: store.lng }}
					onClick={() => props.onMarkerClick(store)}
				/>
			))}
			{props.infoWindowOpen && selectedStore && (
				<InfoWindow
					anchor={props.markerMap[selectedStore.prod_store_id]}
					onCloseClick={props.deselectStore}
				>
					<InfoWindowContent {...props} />
				</InfoWindow>
			)}
		</GoogleMap>
	);
}

export default React.memo(StoresMap);

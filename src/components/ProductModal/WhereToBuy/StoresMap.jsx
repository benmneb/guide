import React, { useState, useCallback } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import InfoWindowContent from './InfoWindowContent';

function StoresMap(props) {
	const theme = useTheme();
	const [map, setMap] = useState(null);

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

	const onLoad = useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds();
		props.stores.map((store) => {
			bounds.extend(store.coords);
			return store.id;
		});
		map.fitBounds(bounds);
		setMap(map);
		//eslint-disable-next-line
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	return (
		<GoogleMap
			map={map} // i added this here to remove the error, the docs sux
			onLoad={onLoad}
			onUnmount={onUnmount}
			mapContainerStyle={containerStyle}
			// center={props.mapPosition}
			zoom={13}
			options={options}
			onClick={props.deselectStore}
			clickableIcons={false}
		>
			{props.stores.map((store) => (
				<Marker
					key={store.id}
					onLoad={(marker) => props.onMarkerLoad(marker, store)}
					position={store.coords}
					onClick={() => props.onMarkerClick(store)}
				/>
			))}
			{props.infoWindowOpen && props.selectedStore && (
				<InfoWindow
					anchor={props.markerMap[props.selectedStore.id]}
					onCloseClick={props.deselectStore}
				>
					<InfoWindowContent {...props} />
				</InfoWindow>
			)}
		</GoogleMap>
	);
}

export default React.memo(StoresMap);

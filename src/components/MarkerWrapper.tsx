"use client";

import { Marker } from "react-leaflet";

import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25,41],
    iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MarkerWrapper = function(props: {position: [number, number]}) {
    return <Marker position={props.position}></Marker>
}

export default MarkerWrapper;
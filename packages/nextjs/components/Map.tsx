"use client";

import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = ({ position = [49.24539682005315, -123.1062698364258] }) => {
  if (typeof window === "undefined") return;

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

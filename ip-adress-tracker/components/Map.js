import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = ({ latAndLng }) => {
  return (
    <MapContainer
      style={{ zIndex: 0 }}
      center={latAndLng != null ? latAndLng : [16.306652, 80.436539]}
      zoom={20}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={latAndLng != null ? latAndLng : [16.306652, 80.436539]}
      />
    </MapContainer>
  )
}

export default Map

import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const TheGoogleMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: 50.76835, lng: 16.1652735 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 50.76835, lng: 16.1652735 }} />}
  </GoogleMap>
))

export default TheGoogleMap

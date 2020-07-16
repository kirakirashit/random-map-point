import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import axios from 'axios'

const API_KEY = 'AIzaSyBTCvfE3hwu_n7gzMFX2EVTpHh4TZWDDOs'

const CLOUDFLARE_TRACE = 'https://www.cloudflare.com/cdn-cgi/trace'

const GEO_IP = 'https://freegeoip.app/json/'

const mapStyles = {
  position: 'absolute',
  width: '100%',
  height: '100%',
}

const MapBox = (props) => {
  const [userLocation, setUserLocation] = useState()
  const [markerPosition, setMarkerPosition] = useState(null)

  useEffect(() => {
    const estimateLocation = async () => {
      const cloudflareResponse = await axios.get(CLOUDFLARE_TRACE)
      const IP = cloudflareResponse.data.split('\n')[2].split('=')[1]
      const geoIpResponse = await axios.get(`${GEO_IP}${IP}`)
      const { latitude, longitude } = geoIpResponse.data
      setUserLocation({ latitude, longitude })
    }
    estimateLocation()
  }, [])

  if (!userLocation) {
    return <div>Loading...</div>
  } else {
    return (
      <div
        style={{
          display: 'flex',
          // alignItems: 'bottom',
          justifyContent: 'center',
        }}
      >
        <Map
          id="map"
          name="map"
          google={props.google}
          zoom={8}
          initialCenter={{
            lat: userLocation.latitude,
            lng: userLocation.longitude,
          }}
          style={mapStyles}
          onCenterChanged={(m, a, p) => {
            setMarkerPosition(a.getCenter())
          }}
        >
          <Marker position={markerPosition} title={'Chosen point'} />
        </Map>
        <Button
          id="button-generate"
          name="button-generate"
          color="danger"
          style={{ position: 'absolute', zIndex: '1', bottom: '3%' }}
        >
          Click me
        </Button>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(MapBox)

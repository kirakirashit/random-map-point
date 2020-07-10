import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Map, GoogleApiWrapper } from 'google-maps-react'

const API_KEY = 'AIzaSyBTCvfE3hwu_n7gzMFX2EVTpHh4TZWDDOs'

const mapStyles = {
  position: 'absolute',
  width: '100%',
  height: '100%',
}

const MapBox = (props) => {
  const [position, setPosition] = useState()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Latitude is :', position.coords.latitude)
        console.log('Longitude is :', position.coords.longitude)
        setPosition(position.coords)
      },
      (error) => console.log(error)
    )
    // console.log(position)
  })

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
        style={mapStyles}
        initialCenter={
          position !== undefined
            ? { lat: position.latitude, lng: position.longitude }
            : { lat: 0, lng: 0 }
        }
      ></Map>
      <Button
        id="button-generate"
        name="button-generate"
        color="danger"
        style={{ position: 'absolute', zIndex: '1', bottom: '2%' }}
      >
        Click me {position}
      </Button>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(MapBox)

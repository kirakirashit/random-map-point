import React, { useState } from 'react'
import randomLocation from 'random-location'
import {
  Form,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Alert,
} from 'reactstrap'

const parseGoogle = (link) => {
  let parsed = link.replace('https://www.google.com/maps/@', '').split(',')
  return {
    latitude: parsed[0],
    longitude: parsed[1],
  }
}

const generatePoint = (latitude, longitude, radius, link, setPoint) => {
  let P = {}

  if (link !== '') {
    P = parseGoogle(link)
  } else {
    P = {
      latitude: latitude,
      longitude: longitude,
    }
  }
  console.log(P)

  const randomPoint = randomLocation.randomCirclePoint(P, radius)
  console.log(randomPoint)
  setPoint(randomPoint)
}

function App() {
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const [radius, setRadius] = useState(500)
  const [link, setLink] = useState('')
  const [point, setPoint] = useState({
    latitude: '',
    longitude: '',
  })

  const reset = () => {
    setLongitude('')
    setLatitude('')
    setRadius(500)
    setLink('')
    setPoint({
      latitude: 0,
      longitude: 0,
    })
  }
  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="lat">Latitude</Label>

                <Input
                  name="lat"
                  id="lat"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  disabled={link !== ''}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="lon">Longitude</Label>
                <Input
                  name="lon"
                  id="lon"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  disabled={link !== ''}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="rad">Radius</Label>
                <Input
                  name="rad"
                  id="rad"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="rad">Google Maps link</Label>
                <Input
                  name="link"
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  disabled={longitude !== '' || latitude !== ''}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button
            onClick={(e) => {
              e.preventDefault()
              reset()
              generatePoint(latitude, longitude, radius, link, setPoint)
            }}
          >
            Go!
          </Button>
        </Form>
        <Row>
          <Col sm="6">
            <Alert>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps?q=${point.latitude},${point.longitude}`}
              >
                Google Maps
              </a>
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App

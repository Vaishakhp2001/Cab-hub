import React, { useRef, useEffect, useState } from 'react';
import { ReactDOM } from 'react';
import mapboxgl from 'mapbox-gl';
import Header from '../components/Header'
import { Marker } from "react-map-gl";
import { GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Screen from './Screen'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { useSelector, useDispatch } from 'react-redux'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import { Button } from 'react-bootstrap'

import { show_direction, show_path } from '../actions/locationActions'
import polyline from '@mapbox/polyline'



mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

const HomeScreen = () => {
  const location1 = useSelector(state => state.pickUp)
  const { startCordinate } = location1;

  const location2 = useSelector(state => state.destination)  
  const { endCordinate } = location2;

  const geometry = useSelector(state => state.direction)
  const { directionInfo } = geometry

  console.log("---------: ", directionInfo)
  console.log("----s-----: ", location1)

  console.log("----e-----: ", location2)

  
  const [direction, setDirection] = useState([])
  const [status, setStatus] = useState(true)


  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('dir:', direction)
    if (direction) {
      setStatus(true)
      // console.log(status)
    }
  }, [status, direction])


  useEffect(() => {


    dispatch(show_direction(startCordinate, endCordinate))
    // setCordinates(startCordinate)
    // setDestinationCord(endCordinate)
    // console.log(direction)
   


  }, [startCordinate, endCordinate])



  const mapContainerRef = useRef(null)

  useEffect(() => {
    // if (!cordinates && !destinationCord) return
    const map = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center: startCordinate,
      zoom: 10,

    }).addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,

      },
      trackUserLocation: false,
      showUserHeading: true,
      showUserLocation: true,
      showAccuracyCircle: true

    }))

    const marker1 = new mapboxgl.Marker({
      draggable: false
    }).setLngLat(startCordinate)
      .addTo(map)

    const marker2 = new mapboxgl.Marker({
      draggable: false
    }).setLngLat(endCordinate)
      .addTo(map)

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl({
      showCompass: true
    }));



    // map.on('move',() => {   
    //   setCordinates(map.getCenter())
    //   setZoom(map.current.getZoom().toFixed(2));
    // })

    map.on('load', () => {
      console.log("loading")
      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': directionInfo,
          }
        }
      });
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8
        }
      });
    });


    <div>

      <Header />
    </div>

    // clean up on unmount
    return () => {
      setStatus(false)
      map.remove();
    }
  }, [directionInfo]); // eslint-disable-line react-hooks/exhaustive-deps 





  return (

    <div style={{ width: '100%', height: '90vh', position: 'relative', backgroundColor: 'white' }}>

      <div className="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100%', position: 'absolute' }}>

      </div>

      <Screen>
      </Screen>

    </div>

  )


};

export default HomeScreen
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { BiTime } from 'react-icons/bi';
import ScreenForm from '../components/ScreenForm';
import { useDispatch, useSelector } from 'react-redux';
import { search_pickup, select_pickup, search_destination, select_destination } from '../actions/locationActions';
import { Loader } from '../components/Loader';


const Screen = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [locations, setLocations] = useState([])
    const [destinations,setDestinations] = useState([])
    const [pickupcordinate,setPickupCordinate] = useState([])
    const [destinationcordinate,setDestinationCordinate] = useState([])
    var places;
    var dest;

    const dispatch = useDispatch()

    const location1 = useSelector(state => state.pickUp)
    const { locationInfo1 } = location1

    const location2 = useSelector(state => state.destination)
    const { locationInfo2 } = location2

    const starting = (place) => {
        setDestination([])
        setPickup(place) 
        dispatch(search_pickup(place))
        locationInfo1 ? setLocations(locationInfo1.features) : setLocations([]) 
    }
    
    const ending = (place) => { 
        setLocations([])
        setDestination(place)
        dispatch(search_destination(place))
        { locationInfo2 ? setDestinations(locationInfo2.features) : setDestinations([]) }
    }

    const startSelect = (coordinate,location) => {
        setPickupCordinate(coordinate)
        setPickup(location)
        setLocations([])
    }

    const endSelect = (coordinate,location) => {
        setDestinationCordinate(coordinate)
        setDestination(location)
        setDestinations([])
    }

    useEffect(() => {
        if(pickupcordinate.length){

            dispatch(select_pickup(pickupcordinate))
        }
       
    },[pickupcordinate]) 

    useEffect(() => {
        if(destinationcordinate.length){

            dispatch(select_destination(destinationcordinate))
        }
       
        
    },[destinationcordinate])   

    return (
        <div style={{
            width: 450, height: 520, backgroundColor: '#FFFFFF',
            margin: 30, position: 'absolute', borderRadius: '25px', textAlign: 'center'
        }}>
            <ScreenForm>
                <h3 >Where you want to go?</h3>
                <Form>
                    <Form.Group  >

                        <Form.Control
                            type='text'
                            placeholder='Enter pickup location'
                            value={pickup}
                            onChange={((e) => starting(e.target.value))}
                            className='mt-3'
                        >
                        </Form.Control>

                        <Form.Control
                            type='text'
                            placeholder='Enter destination location'
                            value={destination}
                            onChange={((e) => ending(e.target.value))}
                            className='mt-3'
                        >
                        </Form.Control>

                        {/* schedule button*/}

                        <Button
                            style={{ borderRadius: '30px', color: 'grey', backgroundColor: '#F5F5F5' }}
                            className='mt-3 m-1'

                        ><BiTime style={{ width: 30 }} /> Schedule

                        </Button>

                    </Form.Group>

                </Form>


                {  
                    
                    locations.length > 0 && pickup.length > 0 ?
                    places = locations.map((obj)=> {
                        return(

                            <p id='pickup' style={{backgroundColor: '#F5F5F5', cursor:'pointer', borderRadius: '20px', display: 'block'}} onClick={() => startSelect(obj.center,obj.text) }>{obj.text}</p>
                        )
                    }) :   <></>

                    
                }

                {
                    destinations.length > 0 && destination.length > 0 ?
                    dest = destinations.map((obj) => { 
                        return(
                            <p id='destination' style={{backgroundColor: '#F5F5F5', cursor:'pointer', borderRadius: '20px', display: 'block'}} onClick={() => endSelect(obj.center,obj.text)}>{obj.text}</p>

                        )
                    }) : <></>
                }

                

            </ScreenForm>
        </div>

    )
}

export default Screen
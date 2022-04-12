import {
    PICKUP_LOCATION_SEARCH,
    PICKUP_LOCATION_RESULT,
    DESTINATION_LOCATION_SEARCH,
    DESTINATION_LOCATION_RESULT,
    PICKUP_LOCATION_SELECT,
    DESTINATION_LOCATION_SELECT,
    DIRECTION_REQUEST,
    DIRECTION_RESULT,
    PATH_REQUEST,
    PATH_RESULT
    
} from '../constants/locationConstants';
import axios from 'axios';

export const search_pickup = ( location ) => async (dispatch) => {
    try {
        dispatch({
            type: PICKUP_LOCATION_SEARCH,
        })

        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
        const token = process.env.REACT_APP_MAPBOX_TOKEN;
        
        const { data } = await axios.get( url + location + '.json?access_token='+ token)    
        console.log(data)

       
        dispatch({
            type: PICKUP_LOCATION_RESULT,
            payload: data
        })
    }

    catch (err) {
        // console.log("error:",err)
    }
}

export const select_pickup = ( cordinates ) => async (dispatch) => {
    try {
        dispatch({
            type: PICKUP_LOCATION_SELECT,
            payload: cordinates
        })
    }
    catch (err) {
        // console.log("error:",err)
    }
}

export const search_destination = ( location ) => async (dispatch) => {
    try {
        dispatch({
            type: DESTINATION_LOCATION_SEARCH,
        })

        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
        const token = process.env.REACT_APP_MAPBOX_TOKEN;
        
        const { data } = await axios.get( url + location + '.json?access_token='+ token)
        

        dispatch({
            type: DESTINATION_LOCATION_RESULT,
            payload: data
        })
    }

    catch (err) {
        console.log("error:",err)
    }
}

export const select_destination = ( cordinates ) => async (dispatch) => {
    try {
        dispatch({
            type: DESTINATION_LOCATION_SELECT,
            payload: cordinates
        })
    }
    catch (err) {
        // console.log("error:",err)
    }
}

export const show_direction = ( latitude,longitude ) => async (dispatch) => {
    console.log('latitude',latitude,'longitude',longitude)
    try {
        dispatch({
            type: DIRECTION_REQUEST, 
            
        })

        const url = 'https://api.mapbox.com/directions/v5/mapbox/driving/'
        const token = process.env.REACT_APP_MAPBOX_TOKEN

        if( typeof(latitude) !=='undefined' && typeof(longitude) !=='undefined' ) {   

            const { data } = await axios.get( url + latitude[0] + "," + latitude[1] + ';' + longitude[0] + ',' + longitude[1] + '?steps=true&geometries=geojson&'  + 'access_token=' + token )
            
            // console.log("data of directons : ",data)
    
            dispatch({
                type: DIRECTION_RESULT,
                payload: data.routes[0].geometry.coordinates,
            })
        }
        else {
            // console.log('no result')
        }



    } catch(err) {
        console.log("error:",err)
    }
}

export const show_path = (latitude,longitude) => async(dispatch) => {
    try {
        dispatch({
            type: PATH_REQUEST
        })

        const url = 'https://api.mapbox.com/matching/v5/mapbox/driving/'
        const token = process.env.REACT_APP_MAPBOX_TOKEN

        if( typeof(latitude) !=='undefined' && typeof(longitude) !=='undefined' ) {   

            console.log("locations correct",latitude[0] + "," + latitude[1] + ';' + longitude[0] + ',' + longitude[1]  )
            const { data } = await axios.get( url + '75.3704, 11.8745;75.7804, 11.2588;76.0711, 11.0510;76.2144, 10.5276;76.2999, 9.9816;76.5222, 9.5916;76.3012,9.6136' + '?' + 'access_token=' + token )
            console.log("data of path : ",data)
    
            dispatch({
                type: PATH_RESULT,
                payload: data,
            })
        }
        else {
            console.log('no result')
        }

    } catch(err) {
        console.log(err)
    }
}

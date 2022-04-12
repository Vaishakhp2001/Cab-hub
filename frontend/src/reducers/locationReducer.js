import {
    PICKUP_LOCATION_SEARCH,
    PICKUP_LOCATION_RESULT,
    PICKUP_LOCATION_SELECT,
    DESTINATION_LOCATION_SEARCH,
    DESTINATION_LOCATION_RESULT,
    DESTINATION_LOCATION_SELECT,
    DIRECTION_REQUEST,
    DIRECTION_RESULT,
    PATH_REQUEST,
    PATH_RESULT

} from '../constants/locationConstants'

export const pickUpReducer = (state = {startCordinate:[75.35556, 11.86889]}, action) => {
    switch ( action.type ) {
        case PICKUP_LOCATION_SEARCH:
            return { ...state, loading: true}
        case PICKUP_LOCATION_RESULT:
            return {  ...state,loading: false, locationInfo1: action.payload }
        case PICKUP_LOCATION_SELECT:
            return {  ...state,loading: false, startCordinate: action.payload }
        default: 
            return state
    }   
}

export const destinationReducer = (state = {endCordinate:[75.35556, 11.86889]}, action) => {
    switch ( action.type ) {
        case DESTINATION_LOCATION_SEARCH:
            return {...state, loading: true}
        case DESTINATION_LOCATION_RESULT:
            return {...state, loading: false, locationInfo2: action.payload }
        case DESTINATION_LOCATION_SELECT:
            return {...state, loading: false, endCordinate: action.payload }
        default: 
            return state
    }   
}

export const directionReducer = (state = {}, action) => {
    switch ( action.type ) {
        case DIRECTION_REQUEST:
            return { loading: true}
        case DIRECTION_RESULT:
            return { loading: false, directionInfo: action.payload}
        default:
            return state
    }
}

export const pathReducer = (state = {}, action) => {
    switch ( action.type) {
        case PATH_REQUEST:
            return {loading: true}
        case PATH_RESULT:
            return {loading: false, pathInfo: action.payload }
        default:
            return state
    }
}





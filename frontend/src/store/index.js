import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userLoginReducer,userRegisterReducer } from '../reducers/userReducers'
import { pickUpReducer,destinationReducer,directionReducer,pathReducer } from '../reducers/locationReducer'
import { composeWithDevTools } from'redux-devtools-extension'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    pickUp: pickUpReducer,
    destination: destinationReducer,
    direction: directionReducer,
    path: pathReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))   
)

export default store;





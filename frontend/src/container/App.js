import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css'
import { Container } from 'react-bootstrap';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Header from '../components/Header'
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen'


const App = () => {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<><Header/><HomeScreen/></>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path="/signup" element={<RegisterScreen/>} />
      </Routes>
    </Router>

  )
}


export default App
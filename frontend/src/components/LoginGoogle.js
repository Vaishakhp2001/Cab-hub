import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'


const LoginGoogle = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const [showLoginButton,setShowLoginButton] = useState(true);
    const [showLogoutButton,setShowLogoutButton] = useState(false);

    const onLoginSuccess = (res) => {
        console.log("Login success",res.profileObj)
        setShowLoginButton(false);
        setShowLogoutButton(true);
    }

    const onFailureSuccess = (res) => {
        console.log("Login failed",res)
    }

    const onSignoutSuccess = () => {
        alert("Yout have been signed out successfully")
        setShowLoginButton(true)
        setShowLogoutButton(false)
    }

    return (
        <div>
            { showLoginButton ? 
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with google"
                onSuccess={onLoginSuccess}
                onFailure={onFailureSuccess}
                cookiePolicy={'single_host_origin'}
            />
            : null }

            { showLogoutButton ? 
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSignoutSuccess}
            >
            </GoogleLogout>
            : null }
        </div>
    )
}

export default LoginGoogle
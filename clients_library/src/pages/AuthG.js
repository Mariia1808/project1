import React, { useContext, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Context } from '..';
 
const clientId = "225202864346-k01k8j33vmutqn1nn0hforpo2alvv8va.apps.googleusercontent.com";
 
function AuthG() {
 
  const [loading, setLoading] = useState('Loading...');
  const [users, setUsers] = useState(null);
  const {user} = useContext(Context)
 
  const handleLoginSuccess = (response) => {
    console.log("Login Success ", response);
    setUsers(response.profileObj);
    user.setUser(users)
    user.setIsAuth(true)
    setLoading();
  }
 
  const handleLoginFailure = error => {
    console.log("Login Failure ", error);
    setLoading();
  }
 
  const handleLogoutSuccess = (response) => {
    console.log("Logout Success ", response);
    setUsers(null);
  }
 
  const handleLogoutFailure = error => {
    console.log("Logout Failure ", error);
  }
 
  const handleRequest = () => {
    setLoading("Loading...");
  }
 
  const handleAutoLoadFinished = () => {
    setLoading();
  }
 
  return (
    <div>
      
      {users ? <div>
        <div className="name">Welcome {users.name}!</div>
        <GoogleLogout
          clientId={clientId}
          onLogoutSuccess={handleLogoutSuccess}
          onFailure={handleLogoutFailure}
        />
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div> :
        <GoogleLogin
          clientId={clientId}
          buttonText={loading}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          onRequest={handleRequest}
          onAutoLoadFinished={handleAutoLoadFinished}
          isSignedIn={true}
        />}
    </div>
  );
}
 
export default AuthG;
import React, { useState } from 'react';
import axios from 'axios';
import storeCurrentUser, { storeCurrentToken, BASE } from '../auth';
import './Login.css';

export default props => {
  const {token, setToken, user, setUser} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState('');
  
  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setShowError('');
      const {data} = await axios.post(`${BASE}/users/login`, {username, password});
      if(data && data.token) {
        setUsername('');
        setPassword('');
        setToken(data.token);
        const user = data.user;

        if(user && user.username){
          setUser(user);
          storeCurrentUser(user)
          storeCurrentToken(data.token)
        }
      } else {
        setShowError(data.message);
      }
    } catch (error) {
      throw error;
      
  
    }
  }
  
  return <>
  {showError ? showError : null}
  { !token
    ? <form className="loginForm" onSubmit={handleLogin}>
      <h3 className="loginText">Please Log In</h3>
      <input name="username" type="text" placeholder="username" required value={username} onChange={(e) => {setUsername(e.target.value)}} />
      <input type="password" placeholder="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} />
      <div className="loginButtonsDiv">
          <button className="loginButton" type="submit">LOG IN</button>
          <button className="loginButton" type="submit">CANCEL</button>
      </div>
    </form>
    : <h1>Welcome back, {user && user.username}!</h1>
} 
    </>
};


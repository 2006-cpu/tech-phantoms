import React, { useEffect, useState } from 'react';
import axios from 'axios';
import storeCurrentUser, {BASE} from '../auth';


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
          storeCurrentUser(user);
        }
      } else {
        setShowError(data.message);
      }
    } catch (error) {
      console.error(error);
      
  
    }
  }
  
  return <>
  {showError ? showError : null}
  { !token
    ? <form style={{marginLeft: "90px"}} onSubmit={handleLogin}>
    <h3>Login Form</h3>
    <input name="username" type="text" required value={username} onChange={(e) => {setUsername(e.target.value)}} />
    <input type="password" type="text" required value={password} onChange={(e) => {setPassword(e.target.value)}} />
    <button type="submit">Login</button>
    </form>
    : <h1 style={{textAlign: 'center'}}>Welcome back, {user && user.username}!</h1>
} 
    </>
};


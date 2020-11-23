import React, { useState } from 'react';
import axios from 'axios';
import storeCurrentUser from '../auth';
import {BASE} from '../api';

export default props => {
    const {token, setToken, user, setUser} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showError, setShowError] = useState('');

    const handleRegister = async (event) => {
        try {
            event.preventDefault();
            setShowError('');
            const {data} = await axios.post(`${BASE}/users/register`, { firstName, lastName, email, imageUrl, username, password });

            console.log('DATA: ', data);

            if(data && data.token) {
                setUsername('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setEmail('');
                setImageUrl('');
                setToken(data.token);
                const {user} = data;

                if(user && user.username) {
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
    ? <form style={{marginLeft: "90px"}} onSubmit={handleRegister}>
    <h3>Registration Form</h3>
    <input name="imageUrl" type="text" value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} />
    <input name="firstName" type="text" required value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
    <input name="lastName" type="text" required value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
    <input name="email" type="email" required value={email} onChange={(e) => {setEmail(e.target.value)}} />
    <input name="username" type="text" required value={username} onChange={(e) => {setUsername(e.target.value)}} />
    <input type="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} />
    <button type="submit">Register</button>
    </form>
    : <h1 style={{textAlign: 'center'}}>Thank you for registering, {user && user.username}!</h1>
    }
    </>
}


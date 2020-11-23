import React, { useState } from 'react';
import axios from 'axios';
import storeCurrentUser, { storeCurrentToken, BASE } from '../auth';
import './Register.css';

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
                    storeCurrentUser(data.user)
                    storeCurrentToken(data.token)
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
    ? <form className="registerForm" onSubmit={handleRegister}>
        <h3 className="registerText">Please register</h3>
        <input name="imageUrl" type="text" placeholder="image" value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} />
        <input name="firstName" type="text" placeholder="First name" required value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
        <input name="lastName" type="text" placeholder="Last name" required value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
        <input name="email" type="email" placeholder="email" required value={email} onChange={(e) => {setEmail(e.target.value)}} />
        <input name="username" type="text" placeholder="username" required value={username} onChange={(e) => {setUsername(e.target.value)}} />
        <input type="password" placeholder="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} />
    <div className="registerButtonsDiv">
        <button className="registerButton" type="submit">REGISTER</button>
        <button className="registerButton" type="submit">CANCEL</button>
    </div>
    </form>
    : <h1>Thank you for registering, {user && user.username}!</h1>
    }
    </>
}


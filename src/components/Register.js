import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { BASE } from '../api';
import storeCurrentUser, { storeCurrentToken } from '../auth';
import './Register.css';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

export default props => {
    const {token, setToken, user, setUser} = props;
    const [imageURL, setImageURL] = useState("https://i.imgur.com/6CsuY8X.png");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState('');

    const handleRegister = async (event) => {
        try {
            event.preventDefault();
            setShowError('');

            const {data} = await axios.post(`${BASE}/users/register`, { firstName, lastName, email, imageURL, username, password });

            console.log('DATA: ', data);

            if(data && data.token) {
                setImageURL('');
                setFirstName('');
                setLastName('');
                setEmail('');
                setUsername('');
                setPassword('');
                setToken(data.token);
                const user = data.user;

                if(user && user.username) {
                    setUser(user);
                    storeCurrentUser(data.user)
                    storeCurrentToken(data.token)
                    Swal.fire({
                        position: 'absolute',
                        icon: 'success',
                        title: 'Your now Registered!!',
                        showConfirmButton: false,
                        timer: 1500
                      });
                navigateToHome();
                }
            } else {
                setShowError(data.message);
                
            }
        } catch (error) {
            swal("Username Already Exists", "Please Try and Register Again!", "warning");
            console.error(error)
          throw error;
        }
    }

    const history = useHistory();
    function navigateToHome() {
        history.push("/Home");
      }

    return <>
    {showError ? showError : null}
    { !token
    ? <form className="registerForm" onSubmit={handleRegister}>
        <h3 className="registerText">Please register</h3>
        <input name="imageURL" type="text" placeholder="image" onChange={(e) => {setImageURL(e.target.value)}} />
        <input name="firstName" type="text" placeholder="First name" required value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
        <input name="lastName" type="text" placeholder="Last name" required value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
        <input name="email" type="email" placeholder="email" required value={email} onChange={(e) => {setEmail(e.target.value)}} />
        <input name="username" type="text" placeholder="username" required value={username} onChange={(e) => {setUsername(e.target.value)}} />
        <input name="password" type="password" placeholder="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} />

    <div className="registerButtonsDiv">
        <button className="registerButton" type="submit">REGISTER</button>
        <button className="registerButton" type="submit" onClick={() => {
            navigateToHome();
        }}>CANCEL</button>
    </div>
    </form>
    : <h1>Thank you for registering, {user && user.username}!</h1>
    }
    </>
}


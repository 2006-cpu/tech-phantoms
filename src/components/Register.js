import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { BASE } from '../api';
import storeCurrentUser, { storeCurrentToken } from '../auth';
import './Register.css';
import Swal from 'sweetalert2';
import { nextTick } from 'process';

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

            if(imageURL===''){
                setImageURL("https://i.imgur.com/6CsuY8X.png")
            }
            const {data} = await axios.post(`${BASE}/users/register`, { firstName, lastName, email, imageURL, username, password });

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
                        title: "You're now Registered!!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                navigateToHome();
                }
            } else {
                throw data.message
            }
        } catch (error) {
            Swal.fire({
                position: 'absolute',
                icon: 'warning',
                title: error,
                showConfirmButton: false,
                timer: 1500
              });
              return error
        }
    }

    const history = useHistory();
    function navigateToHome() {
        history.push("/Home");
      }

    return <>
    {showError ? showError : null}
    { !token
    ?   <div className="RegisterFormDiv">
        <form className="registerForm" onSubmit={handleRegister}>
        <h3 className="registerText">Please register</h3>
        <input name="imageURL" type="text" placeholder="image (optional)" onChange={(e) => {setImageURL(e.target.value)}} />
        <input name="firstName" type="text" placeholder="First name" required value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
        <input name="lastName" type="text" placeholder="Last name" required value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
        <input name="email" type="email" placeholder="email" required value={email} onChange={(e) => {setEmail(e.target.value)}} />
        <input name="username" type="text" placeholder="username" required value={username} onChange={(e) => {setUsername(e.target.value)}} />
        <input name="password" type="password" placeholder="Password (minimum of 8 characters)" required value={password} onChange={(e) => {setPassword(e.target.value)}} />

    <div className="registerButtonsDiv">
        <button className="registerButton" type="submit">REGISTER</button>
        <button className="registerButton" type="submit" onClick={() => {
            navigateToHome();
        }}>CANCEL</button>
    </div>
    </form>
    </div>
    : <h1>Thank you for registering, {user && user.username}!</h1>
    }
    </>
}


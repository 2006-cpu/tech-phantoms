import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";
import { getUser } from '../api';
import './SingleUser.css';

const SingleUser = (props) => {
    const {user, setUser, token, setToken} = props;
    const {userId} = useParams()
    console.log('ID', userId)
    const [singleUser, setSingleUser] = useState;
    console.log('singleUSER: ', singleUser);

    useEffect(() => {
        getUser(userId)
            .then( responseUser => {
                setSingleUser(responseUser)
            console.log('responseUser: ', responseUser);
            })
    }, []);
    const {imageURL, firstName, lastName, email, username, password} = singleUser;

    const history = useHistory();
        function navigateToHome() {
            history.push("/Home");
        }

return <>
    {!token
    ? <p className="signInForAccount">Please sign in to access account.</p>
    : <div id={`singleUser${userId}`} className="singleUserCard">
        <div className="userCardData">
        <img src={imageURL} alt="userImage" className="userImage" />
        <h3 className="userFirstName">{firstName}</h3>
        <h3 className="userLastName">{lastName}</h3>
        <h2 className="userEmail">{email}</h2>
        <h2 className="username">{username}</h2>
        <h2 className="password">{password}</h2>
        </div>
        <button className="userReturnHome" type="submit" onClick={() => {
            navigateToHome();
        }}>Home</button>
    </div>
    }
</>
}
export default SingleUser;
import React from 'react';
import { NavLink } from 'react-router-dom';
import './SingleUser.css';

const SingleUser = (props) => {
    const {id, imageURL, firstName, lastName, email, username, password, isAdmin} = props.user;

return <>
<div className="singleUserCard">
   <div id={`singleUser${id}`} className="singleUserId">
        <div className="userCardData">
            <img src={imageURL} alt="userImage" className="userImage" />
            <h4 className="userFirstName">{firstName}</h4>
            <h4 className="userLastName">{lastName}</h4>
            <h4 className="userEmail">{email}</h4>
            <h4 className="username">{username}</h4>
            <h4 className="password">{password}</h4>
            <h4 className="isAdmin">{isAdmin}</h4>

                {
                id
                ?
                <NavLink to={`/allUsers/${id}`} className="singleUserId">
                <button className="singleUserEditButton">Edit</button>
                </NavLink>
                :
                <h4 className="noSingleUser">{id} not found</h4>
                }
        </div>
    </div>
</div>
</>
}
export default SingleUser;
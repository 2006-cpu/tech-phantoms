import React from 'react';
import bubble02 from './images/bubble02.png';
import './SingleUser.css';

const SingleUser = (props) => {
    const {id, imageURL, firstName, lastName, email, username, password, isAdmin} = props.user;

return <>
<div className="singleUserCard">
   <div id={`singleUser${id}`} className="singleUserId">
        <div className="userCardData">
            <h2 className="singleUserTitle">User Profile for {firstName}{' '}{lastName}</h2>
            <img src={imageURL} alt="userImage" className="userImage" />
            <h4 className="userFirstName">First name: {firstName}</h4>
            <h4 className="userLastName">Last name: {lastName}</h4>
            <h4 className="userEmail">email: {email}</h4>
            <h4 className="username">username: {username}</h4>
            <h4 className="password">{password}</h4>
            <h4 className="isAdmin">{isAdmin}</h4>

                {/* {
                id
                ?
                <NavLink to={`/allUsers/${id}`} className="singleUserId">
                <button className="singleUserEditButton">Edit</button>
                </NavLink>
                :
                <h4 className="noSingleUser">{id} not found</h4>
                } */}
        </div>
    </div>
</div>
</>
}
export default SingleUser;
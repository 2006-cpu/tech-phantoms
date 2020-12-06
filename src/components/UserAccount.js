import React from 'react';
import { NavLink } from 'react-router-dom';
import './UserAccount.css';

const UserAccount = (props) => {
    const {id, imageURL, firstName, lastName, email, username, password, isAdmin} = props.user;

    if(id==='') {
        return <div>
            <h3 className="userAccountInvalid">User Account Invalid</h3>
        </div>
    } else {
return <>
<div className="userAccountCard">
   <div id={`userAccount${id}`} className="userAccountId">
        <div className="userAccountData">
            <h2 className="userAccountTitle">Account information for {firstName}{' '}{lastName}</h2>
            <img src={imageURL} alt="userImage" className="userAccountImage" />
            <h4 className="userAccountFirstName">{firstName}</h4>
            <h4 className="userAccountLastName">{lastName}</h4>
            <h4 className="userAccountEmail">{email}</h4>
            <h4 className="userAccountUsername">{username}</h4>
            <h4 className="userAccountPassword">{password}</h4>
            <h4 className="userAccountIsAdmin">{isAdmin}</h4>

            
                <NavLink to={`/users/me${id}`} className="userAccountbuttonLink">
                <button className="userAccountEditButton">Edit</button>
                </NavLink>
           
        </div>
    </div>
</div>
</>
}
}
export default UserAccount;
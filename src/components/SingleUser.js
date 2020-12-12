import React from 'react';
import './SingleUser.css';
import {editAccountInfo} from '../api'

const SingleUser = (props) => {
    const {id, imageURL, firstName, lastName, email, username, isAdmin} = props.user;
    const {fetchUsers} = props

    const makeAdmin = async () =>{
        try {
            const newAdmin = await editAccountInfo(id, {isAdmin: true})
            await fetchUsers()
        } catch (error) {
            console.error(error)
        }
    }

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
            {
                isAdmin
                ?
                <h3>Admin</h3>
                :
                <button className="makeAdminButton" onClick={makeAdmin}>Make Admin</button>
            }
        </div>
    </div>
</div>
</>
}
export default SingleUser;
import React from 'react';
import './SingleUser.css';
import {editAccountInfo} from '../api'

const SingleUser = (props) => {
    const {id, imageURL, firstName, lastName, email, username, isAdmin} = props.user;
    const {fetchUsers} = props

    const makeAdmin = async () =>{
        try {
            console.log("MAKING ADMIN", username , id)
            const newAdmin = await editAccountInfo(id, {isAdmin: true})
            console.log('NEWADMIN', newAdmin)
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
                <button onClick={makeAdmin}>Make Admin</button>
            }

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
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './UserAccount.css';
import { editAccountInfo } from '../api';
import Swal from 'sweetalert2'

const UserAccount = (props) => {
    const {id, imageURL, firstName, lastName, email, username, isAdmin} = props.user;
    const {setUser}= props
    const [editForm, setEditForm] = useState(false)
    const [newImageURL, setNewImageURL]=useState(imageURL)
    const [newFirstName, setNewFirstName]=useState(firstName)
    const [newLastName, setNewLastName]=useState(lastName)
    const [newEmail, setNewEmail]=useState(email)
    const [newUsername, setNewUsername]=useState(username)

    const handleEditUser = async (event)=>{
        event.preventDefault()
        const newInfo = await editAccountInfo(id,{firstName: newFirstName, lastName:newLastName, email: newEmail, username: newUsername})
        console.log('UPDATED USER',newInfo)
        if(newInfo.username){
            Swal.fire({
                position: 'absolute',
                icon: 'success',
                title: 'Hi '+newInfo.username+', account information updated!',
                showConfirmButton: false,
                timer: 1500
              });
        
              setUser(newInfo)
        }

    }

    if(id==='') {
        return <div>
            <h3 className="userAccountInvalid">User Account Invalid</h3>
        </div>
    } else {
return <>
<div className="userAccountCard">
   <div id={`userAccount${id}`} className="userAccountId">
        <div className="userAccountData">
            <h2 className="userAccountTitle">Account information for {firstName} {lastName}</h2>
            <img src={imageURL} alt="userImage" className="userAccountImage" />
            <h4 className="userAccountFirstName">{firstName}</h4>
            <h4 className="userAccountLastName">{lastName}</h4>
            <h4 className="userAccountEmail">{email}</h4>
            <h4 className="userAccountUsername">{username}</h4>
            <h4 className="userAccountIsAdmin">{isAdmin}</h4>

                <button className="userAccountEditButton" onClick={()=>{setEditForm(true)}}>Edit</button>
                
           
        </div>
    </div>
</div>
{
    editForm
    ?
    <div className="editForm">
    <form className="editUser" onSubmit={handleEditUser}>

        <input name="First Name" type="text" placeholder="name" value={newFirstName} onChange={(event) => {
            setNewFirstName(event.target.value)}} />

        <input name="Last Name" type="text" placeholder="description" value={newLastName} onChange={(event) => {
            setNewLastName(event.target.value)}} /> 

        <input name="price" type="text" placeholder="price" value={newEmail} onChange={(event) => {
            setNewEmail(event.target.value)}} /> 

        <input name="imageURL" type="text" placeholder="imageURL" value={newImageURL} onChange={(event) => {
            setNewImageURL(event.target.value)}} />   

        <input name="inStock" type="text" placeholder="inStock" value={newUsername} onChange={(event) => {
            setNewUsername(event.target.value)}} /> 

            <button className="editProductButton" type="submit">
                Submit Changes
            </button>
    </form>
</div>
    :
    <></>
    }
</>
}
}
export default UserAccount;
import React, { useState, useEffect } from 'react';
import './UserAccount.css';
import { editAccountInfo, getMyOrders } from '../api';
import bubble02 from './images/bubble02.png';
import Swal from 'sweetalert2'
import SingleOrder from './SingleOrder'

const UserAccount = (props) => {
    const {id, imageURL, firstName, lastName, email, username, isAdmin} = props.user;
    const {setUser, token}= props
    const [editForm, setEditForm] = useState(false)
    const [newImageURL, setNewImageURL]=useState(imageURL)
    const [newFirstName, setNewFirstName]=useState(firstName)
    const [newLastName, setNewLastName]=useState(lastName)
    const [newEmail, setNewEmail]=useState(email)
    const [newUsername, setNewUsername]=useState(username)
    const [orders, setOrders]=useState([])

    useEffect(()=>{
        getMyOrders(token).then(response=>{setOrders(response)})
    },[])

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
              setEditForm(false);
        }

    }

    if(id==='') {
        return <div>
            <h3 className="userAccountInvalid">User Account Invalid</h3>
        </div>
    } else {
return <>
<div className="userAccountCard" style={{marginBottom: "-300px"}}>
        <div className="userAccountBubbleDivOne">
            <img src={bubble02} className="userAccountBubbleOne" alt="bubble" width="400px" height="400px" />
            <img src={bubble02} className="userAccountBubblethree" alt="bubble" width="150px" height="150px" />
    </div>

   <div id={`userAccount${id}`} className="userAccountId">
        <div className="userAccountData">
            <h2 className="userAccountTitle">User Profile for {firstName} {lastName}</h2>

                <img src={imageURL} alt="userImage" className="userAccountImage" />
                <h4 className="userAccountFirstName">First name: {firstName}</h4>
                <h4 className="userAccountLastName">Last name: {lastName}</h4>
                <h4 className="userAccountEmail">email: {email}</h4>
                <h4 className="userAccountUsername">username: {username}</h4>
                <h4 className="userAccountIsAdmin">{isAdmin}</h4>

                <button className="userAccountEditButton" onClick={()=>{setEditForm(true)}}>Edit</button>
                
        </div>
    </div>

    <div className="userAccountBubbleDivTwo">
        <img src={bubble02} className="userAccountBubbleTwo" alt="bubble" width="200px" height="200px" />
    </div>

</div>
{
    editForm
    ?
    <div className="userAccountEditDiv">
    <form className="userAccountEditUser" onSubmit={handleEditUser}>

        <div className="userAccountEditForm">
            <h2 className="editUserAccountTitle">Edit User Profile</h2>

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
        </div>
    </form>
</div>
    :
    <></>
    }
<h2 className="userAccountOrdersText">All Orders for {firstName} {lastName}</h2>
<div className="userAccountOrdersGrid">
{
    orders.map((order) => <SingleOrder key={order.id} 
    order={order} />)
}
</div>
</>
}
}
export default UserAccount;
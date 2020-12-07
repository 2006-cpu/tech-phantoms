import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getOrder } from '../api';
import './UsersOrders.css';

const UsersOrders = (props) => {
    const {id, imageURL, firstName, lastName, email, username, password, isAdmin} = props.user;
    const [usersOrder, setUsersOrder] = useState([]);

    useEffect(() => {
        getOrder(usersOrder)
            .then( responseUsersOrder => {
                setUsersOrder(responseUsersOrder)
            console.log('responseUsersOrder: ', responseUsersOrder);
            })
    }, []);
    const {userId, datePlaced, status} = usersOrder;

    const history = useHistory();
    function handleClick() {
        history.push("/Home");
    }

return <>

<div className="usersOrdersCard">
   <div id={`usersOrders${id}`} className="usersOrdersId">
        <div className="usersOrdersData">
            <h2 className="usersOrdersTitle">Orders for {firstName}{' '}{lastName}</h2>
            <img src={imageURL} alt="userImage" className="usersOrdersImage" />
            <h4 className="usersOrdersFirstName">{firstName}</h4>
            <h4 className="usersOrdersLastName">{lastName}</h4>
            <h4 className="usersOrdersEmail">{email}</h4>
            <h4 className="usersOrdersUsername">{username}</h4>
            <h4 className="usersOrdersPassword">{password}</h4>
            <h4 className="usersOrdersIsAdmin">{isAdmin}</h4>
            <h4 className="usersOrdersUserId">{userId}</h4>
            <h4 className="usersOrdersDatePlaced">{datePlaced}</h4>
            <h4 className="usersOrdersStatus">{status}</h4>
           
                <button className="usersOrdersButton" onClick={() => {
                    handleClick()
                }}>
                    See All Products
                </button>
        </div>
    </div>
</div>
</>

}
export default UsersOrders;
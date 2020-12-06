import React, {useState, useEffect} from 'react';
import SingleUser from './SingleUser.js';
import {getAllUsers} from '../api';
import './AllUsers.css';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

    const fetchUsers =() => {
        getAllUsers()
          .then( responseAllUsers => {
            setAllUsers(responseAllUsers)
          console.log('responseAllUsers: ', responseAllUsers);
          })
      }

      useEffect (() => {
        fetchUsers();
      }, [])

return <>
    <div className="allUsersGrid">
        {
        allUsers.map((singleUser) => <SingleUser key={singleUser.id} user={singleUser} />)
        }
        </div>
    </>
}

export default AllUsers;
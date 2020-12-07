import React, { Fragment, useState, useEffect } from 'react';
import {  Route } from 'react-router-dom';

import {
  getAllProducts,
} from '../api';

import { 
  AllProducts, 
  Nav, 
  Login, 
  Register, 
  AllOrders, 
  SingleOrder, 
  Cart,
  Footer, 
  SingleProduct,
  AdminTools,
  AllUsers,
  UserAccount,
  UsersOrders} from './index';

import './App.css';

const App = () => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [allProducts, setAllProducts] = useState([]);
 
  useEffect(() => {
    const currentUser = localStorage.getItem('user')
    const currentToken = localStorage.getItem('token')
    if(currentUser && currentToken){
      const loggedInUser = JSON.parse(currentUser)
      const loggedInUserToken = JSON.parse(currentToken)
      setUser(loggedInUser)
      setToken(loggedInUserToken)
    }
  }, []);

  const fetchProducts = () => {
    getAllProducts()
      .then( responseAllProducts => {
        setAllProducts(responseAllProducts)
      console.log('responseAllProducts: ', responseAllProducts);
      })
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  return <>
    <div id="App">
      <Route>
        <Nav 
          token = {token}
          setToken = {setToken}
          user = {user}
          setUser = {setUser}
        />
      </Route>

      {
      user.isAdmin ?
      <AdminTools/>:<></>
      }

    
     
      {!token
      ?
      <Fragment>
        <Route path="/Login">
          <Login
            setUser = {setUser}
            setToken = {setToken}
          />
        </Route>

        <Route path="/Register">
          <Register
            setUser = {setUser}
            setToken = {setToken}
          />
        </Route>
      </Fragment>
      :
     <div>
      <Fragment>
        <Route path="/userAccount">
          <UserAccount
            user = {user}
          />
        </Route>
      </Fragment>
     </div>
      }
      <Route path="/allUsers">
        <AllUsers />
      </Route>

  
      <Route path="/usersOrders">
        <UsersOrders token={token} user={user} />
      </Route>
   


      <Route path="/allOrders">
        <AllOrders token={token}/>
      </Route>

      <Route path="/orders/cart">
        <Cart token={token} user={user}/>
      </Route>

      <Route exact path={["/allProducts", "/Home"]}>
        <AllProducts
          allProducts = {allProducts}
          setAllProducts = {setAllProducts}
        />
      </Route>

      <Route path={`/allProducts/:productId`}>
        <SingleProduct token={token}/>
      </Route>

      <div className="backDrop"></div>

        <Footer />
      

    </div>
  </>
}

export default App;
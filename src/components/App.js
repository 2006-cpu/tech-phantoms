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
  AllReviews} from './index';

import './App.css';

const App = () => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
 
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

      <div className="welcomeDiv">Welcome to Dope Soap!<br />
        Enjoy a clean view of all our products!
      </div>
     
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

      {
      user.id
      ?
      <Fragment>
        <Route exact path="/orders">
          <AllOrders />
        </Route>
      </Fragment>
      :
          <span></span>
      }

      {
      user.isAdmin
      ?
      <>
      <Route path="/allOrders">
        <AllOrders />
      </Route>

      <Route path="/allReviews">
        <allReviews 
          allReviews = {allReviews}
          setAllReviews = {setAllReviews}
        />
      </Route>
      </>
      :
      <span></span>
      }

      <Route path="/orders/cart">
        <Cart />
      </Route>

      <Route exact path={["/allProducts", "/Home"]}>
        <AllProducts
          allProducts = {allProducts}
          setAllProducts = {setAllProducts}
        />
      </Route>

      <Route path={`/allProducts/:productId`}>
        <SingleProduct />
      </Route>

 

      <div className="backDrop"></div>

      <Footer />
      

    </div>
  </>
}

export default App;
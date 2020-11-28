import React, { Fragment, useState, useEffect } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';

import {
  getAllProducts,
  getProduct,
  getAllOrders,
  getSingleOrder
} from '../api';

import { 
  Product, 
  AllProducts, 
  Nav, 
  Login, 
  Register, 
  AllOrders, 
  SingleOrders, 
  Cart,
  Footer } from './index';

import SingleOrder from './SingleOrder';
import './App.css';

const App = (props) => {
  const {orderId, userId, cart, setCart} = props;
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [nav, setNav] = useState([]);
  const [product, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [singleOrder, setSingleOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  
  


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

  const fetchOrders =() => {
    getAllOrders()
      .then( responseAllOrders => {
        setAllOrders(responseAllOrders)
      console.log('responseAllOrders: ', responseAllOrders);
      })
  }

  useEffect(()=>{
    fetchProducts()
    fetchOrders()
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
     <div></div>
      }

      {
      orderId && userId
      ?
      <Fragment>
        <Route path="/orders">
          <SingleOrder
          singleOrder = {singleOrder}
          setSingleOrder = {setSingleOrder}
          />
        </Route>
      </Fragment>
      :
      <Fragment>
        <Route path="/orders">
        <span>There is no order.</span>
        </Route>
      </Fragment>
      }

      <Route path="/AllOrders">
        <AllOrders
        allOrders = {allOrders}
        setAllOrders = {setAllOrders}
        />
      </Route>

      <Route path="/orders/cart">
        <Cart
          cart = {cart}
          setCart = {setCart}
        />
      </Route>

      <Route exact path="/allProducts">
        <AllProducts
          allProducts = {allProducts}
          setAllProducts = {setAllProducts}
        />
      </Route>

      <Route path="/allProducts/:productId">
        {allProducts && <Product allProducts={allProducts}/>}
        <Product
          product = {product}
          setProduct = {setProduct}
        />
      </Route>

      <div className="backDrop"></div>

        <Footer />
      

    </div>
  </>
}

export default App;
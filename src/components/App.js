import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Router, useHistory } from 'react-router-dom';
import {
  getAllProducts,
  getProduct,
  getSomething
} from '../api';
import { Product, AllProducts } from './index';
import Register from './Register';
import Login from './Login';
import getCurrentUser, { getCurrentToken, clearCurrentUser, clearCurrentToken } from '../auth/index';
import './App.css';

const App = () => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setUser(getCurrentUser());
      console.log('CHECKuserLOCAL: ', user);
  
    setToken(getCurrentToken());
      console.log('CHECKtokenLOCAL: ', token);
  }, []);

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  useEffect(() => {
    getAllProducts()
      .then( responseAllProducts => {
        setAllProducts(responseAllProducts)
      console.log('responseAllProducts: ', responseAllProducts);
      })
  }, []);

  const goHome = useHistory();
  function returnToHome() {
    goHome.push("/Home");
  }

  return <>
    <div className="header">
      <h1 className="headerText">Hello, World!</h1>
      <h2 className="headerText">{ message }</h2>
    </div>

    <div className="nav">
      <NavLink to="/allProducts" className="normal" activeClassName="active">
        ALL PRODUCTS
      </NavLink>

      {!token
      ?
      <Fragment>
      <div className="pleaseLogIn">Welcome to DOPE SOAP!  Please login or register.</div>

        <NavLink to="/Login" className="login" activeClassName="active">
          Login
        </NavLink>

        <NavLink to="/Register" className="register" activeClassName="active">
          Register
        </NavLink>
      </Fragment>
      :
      <Fragment>
        <button class="logoutButton"onClick={() => {
          setToken('');
          setUser('');
          clearCurrentToken();
          clearCurrentUser();
          returnToHome();
        }}>
          LOG OUT
        </button>
      </Fragment>
      } 
    </div>
   
    <div id="App">
      <Route exact path="/allProducts">
        <AllProducts
          allProducts = {allProducts}
          setAllProducts = {setAllProducts}
        />
      </Route>

      <Route path="/allProducts/:productId">
        {allProducts && <Product allProducts={allProducts}/>}
        <Product
          product = {Product}
          setProduct = {setProduct}
        />
      </Route>

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
     <div>Customer Account Info Here</div>
      }
    </div>
  </>
}

export default App;
import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Router, useHistory } from 'react-router-dom';
import {
  getAllProducts,
  getProduct,
  getSomething
} from '../api';
import { Product, AllProducts, login, register } from './index';
import getCurrentUser, { getCurrentToken, clearCurrentUser, clearCurrentToken } from '../auth/index';
import './App.css';

const App = () => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState({});
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

  return <>
    <div className="header">
      <h1 className="headerText">Hello, World!</h1>
      <h2 className="headerText">{ message }</h2>
    </div>

  <Route>
    <div className="nav">
      <NavLink to="/allProducts" className="normal" activeClassName="active">
        ALL PRODUCTS
      </NavLink>
    </div>
  </Route>



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
    </div>
  
 

  </>
}

export default App;
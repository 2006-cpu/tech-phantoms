import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Router, useHistory } from 'react-router-dom';
import {
  getAllProducts,
  getSomething
} from '../api';
import { Product, AllProducts } from './index';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

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
        {
        allProducts.map((product) => <Product key={product.id} product={product} />)
        }
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
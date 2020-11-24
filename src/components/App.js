import React, { Fragment, useState, useEffect } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';
import {
  getAllProducts,
  getProduct,
  getSomething,
  getAllOrders,
  getSingleOrder
} from '../api';
import { Product, AllProducts, login, register, AllOrders, SingleOrders } from './index';
import getCurrentUser, { getCurrentToken, clearCurrentUser, clearCurrentToken } from '../auth/index';
import cart from './cart.png';
import './App.css';
import SingleOrder from './SingleOrder';

const App = (props) => {
  const {orderId, userId} = props;
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  // const [message, setMessage] = useState('');
  const [product, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [singleOrder, setSingleOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setUser(getCurrentUser());
      console.log('CHECKuserLOCAL: ', user);
  
    setToken(getCurrentToken());
      console.log('CHECKtokenLOCAL: ', token);
  }, []);

  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });

  useEffect(() => {
    getAllProducts()
      .then( responseAllProducts => {
        setAllProducts(responseAllProducts)
      console.log('responseAllProducts: ', responseAllProducts);
      })
  }, []);

  useEffect(() => {
    getAllOrders()
      .then( responseAllOrders => {
        setAllOrders(responseAllOrders)
      console.log('responseAllOrders: ', responseAllOrders);
      })
  }, []);

  const returnToHome = useHistory();
  function handleClick() {
    returnToHome.push("/AllProducts");
  }

  return <>
    {/* <div className="header">
      <h1 className="headerText">Hello, World!</h1>
      <h2 className="headerText">{ message }</h2>
    </div> */}

    <div className="nav">
      <NavLink to="/allProducts" className="productsNav" activeClassName="active">
        DOPE SOAPS!
      </NavLink>

      {!token
      ?
      <Fragment>
        <div className="pleaseLogIn">
      Please{' '}
        <NavLink to="/Login" className="login" activeClassName="active">
          LOG IN
        </NavLink>
      {' '}or{' '}
        <NavLink to="/Register" className="register" activeClassName="active">
          REGISTER
        </NavLink>
       </div>
      </Fragment>
      :
      <Fragment>
        <p className="welcomeUserText">Thank you for logging in!</p>
        <button className="logoutButton"onClick={() => {
          setToken('');
          setUser('');
          clearCurrentToken();
          clearCurrentUser();
          handleClick();
        }}>
          LOG OUT
        </button>
      </Fragment>
      } 

      <NavLink to="cart" className="cart" activeClassName="active">
        <img src={cart} alt="cart" width="50px" height="50px" />
      </NavLink>
    </div>

    <div className="welcomeDiv">Welcome to Dope Soap!<br />
    Enjoy a clean view of all our products!
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
          product = {product}
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

      {
      orderId && userId
      ?
      <Fragment>
        <Route path="/SingleOrder">
          <SingleOrder
          singleOrder = {singleOrder}
          setSingleOrder = {setSingleOrder}
          />
        </Route>

        <Route path="/orders/cart">
          <Cart
          cart = {cart}
          setCart = {setCart}
          />
        </Route>
      </Fragment>
      :
      <span>There is no order.</span>
      }

    <Route path="/AllOrders">
      <AllOrders
      allOrders = {allOrders}
      setAllOrders = {setAllOrders}
      />
    </Route>

    </div>
  </>
}

export default App;
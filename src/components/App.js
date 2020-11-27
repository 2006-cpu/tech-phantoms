import React, { Fragment, useState, useEffect } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';
import {
  getAllProducts,
  getProduct,
  getAllOrders,
  getSingleOrder
} from '../api';
import { Product, AllProducts, Login, Register, AllOrders, SingleOrders } from './index';
import getCurrentUser, { getCurrentToken, clearCurrentUser, clearCurrentToken } from '../auth/index';
import './App.css';
import SingleOrder from './SingleOrder';
import swal from 'sweetalert';

const App = (props) => {
  const {orderId, userId} = props;
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [product, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [singleOrder, setSingleOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
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

  const history = useHistory();
  function handleClick() {
    history.push("/AllProducts");
  }

  return <>
     <div className="header">
     

      <NavLink to="/allProducts" className="productsNav" activeClassName="active">
        <img src="https://i.imgur.com/qL1MTOH.png" alt="logo" width="300px" height="240px" />
      </NavLink>
    </div> 

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
          swal("You've Successfully Logged Out!", "Have A Clean Day!", "success");
        }}>
          LOG OUT
        </button>
      </Fragment>
      } 

      <NavLink to="/cart" className="cart" activeClassName="active">
        <img src="https://i.imgur.com/wpp02kp.png" alt="cart" width="50px" height="50px" />
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
     <div></div>
      }

      {
      orderId && userId
      ?
      <Fragment>
        <Route path="/orders/cart">
          <SingleOrder
          singleOrder = {singleOrder}
          setSingleOrder = {setSingleOrder}
          />
        </Route>
      </Fragment>
      :
      <Fragment>
        <Route path="/orders/cart">
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

    </div>
  </>
}

export default App;
import React, { Fragment } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';
import { clearCurrentUser, clearCurrentToken } from '../auth/index';
import './Nav.css';        

const Nav = (props) => {
    const {nav, setNav, user, setUser, token, setToken} = props;

    const history = useHistory();
    function handleClick() {
      setToken('');
      setUser('');
      clearCurrentToken();
      clearCurrentUser();
      history.push("/home");
    }

return <>
    <div className="header">
      <NavLink to="/allProducts" className="logoNav" activeClassName="active">
        <img src="https://i.imgur.com/qL1MTOH.png" alt="logo" width="300px" height="240px" />
      </NavLink>
    </div> 

    <div className="nav">
      <div className="clickForSoaps">
        Click{' '}
        <NavLink to="/allProducts" className="productsNav" activeClassName="active">
          here
        </NavLink>
        {' '}to see our product line!
      </div>

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
          handleClick();
        }}>
          LOG OUT
        </button>
      </Fragment>
      } 

      <NavLink to="/cart" className="cart" activeClassName="active">
        <img src="https://i.imgur.com/wpp02kp.png" alt="cart" width="50px" height="50px" onCLick={() => {
           handleClick();
        }}/>
      </NavLink>
    </div>
</>
}

export default Nav;
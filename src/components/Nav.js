import React, { Fragment } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { clearCurrentUser, clearCurrentToken } from '../auth/index';
import swal from 'sweetalert'; 
import './Nav.css';
       

const Nav = (props) => {
    const {user, setUser, token, setToken} = props;
    const {username, imageURL} = user;

    const history = useHistory();

    function handleClick() {
      setToken('');
      setUser('');
      clearCurrentToken();
      clearCurrentUser();
      history.push("/Home");
    }

    console.log('imageURL: ', imageURL);
    console.log('USER: ', user);

return <>
    <div className="header">
      <NavLink to="/allProducts" className="logoNav" activeClassName="activeLogo">
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

        <img src={imageURL} className="loginUserImage" alt="UserImage" width="auto" height="50px" />
        <p className="loginUsername">{username}</p>
        
        <button className="logoutButton"onClick={() => {
          handleClick();
          swal("You've Successfully Logged Out!", "Have A Clean Day!", "success");
        }}>
          LOG OUT
        </button>
      </Fragment>
      } 

      <NavLink to="/cart" className="cart" activeClassName="active">
        <img src="https://i.imgur.com/wpp02kp.png" alt="cart" width="50px" height="50px" onClick={() => {
           handleClick();
        }}/>
      </NavLink>
    </div>
</>
}

export default Nav;
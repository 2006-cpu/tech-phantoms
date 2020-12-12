import React, { Fragment } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { clearCurrentUser, clearCurrentToken } from '../auth/index';
import swal from 'sweetalert'; 
import bubble02 from './images/bubble02.png';
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

return <>
    <div className="header">
      <div className="bubbleSetOne">
        <img src={bubble02} className="bubbleOne" alt="bubble" width="300px" height="300px" />
        <img src={bubble02} className="bubbleTwo" alt="bubble" width="130px" height="130px" />
      </div> 

        <div className="headerFrame">
          <div className="headerBorder">
            <NavLink to="/allProducts" className="logoNav" activeClassName="activeLogo">
              <img src="https://i.imgur.com/qL1MTOH.png" alt="logo" className="logoNav" width="auto" height="240px" />
            </NavLink>
          </div>
        </div>

      <div className="bubbleSetTwo">
        <img src={bubble02} className="bubbleThree" alt="bubble" width="250px" height="250px" />
        <img src={bubble02} className="bubbleFour" alt="bubble" width="180px" height="180px" />
        <img src={bubble02} className="bubbleFive" alt="bubble" width="70px" height="70px" />
      </div>
    </div> 

    <div className="nav">
      <div className="clickForSoaps">
        Click{' '}
        <NavLink to="/allProducts" className="productsNav" activeClassName="active">
          here
        </NavLink>
        {' '}to see our product line!
        <div className="clickProdBubble">
          <img src={bubble02} className="bubbleSix" alt="bubble" width="60px" height="60px" />
          <img src={bubble02} className="bubbleSeven" alt="bubble" width="100px" height="100px" />
        </div>
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
        <div className="userDataNav">
        <p className="loginUsername">{username}</p>
        <NavLink to="/userAccount" className="userAccountLink">
          Account
        </NavLink>
        </div>
        <button className="logoutButton"onClick={() => {
          handleClick();
          swal("You've Successfully Logged Out!", "Have A Clean Day!", "success");
        }}>
          LOG OUT
        </button>
      </Fragment>
      }

      <NavLink to="/orders/cart" className="cartImage">
        <img src="https://i.imgur.com/wpp02kp.png" alt="cart" style={{border: "none"}} width="auto" height="30px" />
      </NavLink>
    </div>
</>
}

export default Nav;
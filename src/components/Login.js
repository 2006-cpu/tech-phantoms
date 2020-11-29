import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import storeCurrentUser, { storeCurrentToken, BASE } from '../auth';
import './Login.css';
import swal from 'sweetalert';

export default props => {
  const {token, setToken, user, setUser} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState('');
  
  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setShowError('');
      const {data} = await axios.post(`${BASE}/users/login`, {username, password});
      if(data && data.token) {
        setUsername('');
        setPassword('');
        setToken(data.token);
        const user = data.user;

        if(user && user.username){
          setUser(user);
          storeCurrentUser(user)
          storeCurrentToken(data.token)
          swal("You've Successfully Logged in!", "Have fun shopping", "success");
        }
      } else {
        setShowError(data.message);
      }
    } catch (error) {

      swal("Username/Password is Incorrect", "Please Try and Login Again!", "warning");
      console.error(error);

      throw error;
    }
  }
  
  const history = useHistory();
      function navigateToHome() {
        history.push("/Home");
      }

  return <>
  {showError ? showError : null}
  { !token
    ? <form className="loginForm" onSubmit={handleLogin}>
      <h3 className="loginText">Please Log In</h3>
      <input name="username" type="text" placeholder="username" required value={username} onChange={(e) => {setUsername(e.target.value)}} />
      <input type="password" placeholder="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} />
      <div className="loginButtonsDiv">
          <button className="loginButton" type="submit">LOG IN</button>
          <button className="loginButton" type="submit" onClick={() => {
            navigateToHome();
          }}>CANCEL</button>
      </div>
    </form>
    : <h1>Welcome back, {user && user.username}!</h1>
} 
    </>
};

// import React, { useState } from 'react';
// import { useHistory } from "react-router-dom";
// import axios from 'axios';
// import storeCurrentUser, { storeCurrentToken, BASE } from '../auth';
// import './Login.css';
// import swal from 'sweetalert';

// export default props => {
//   const {token, setToken, user, setUser} = props;
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showError, setShowError] = useState('');
  
//   const handleLogin = async (event) => {
//     try {
//       event.preventDefault();
//       setShowError('');
//       const {data} = await axios.post(`${BASE}/users/login`, {username, password});
//       if(data && data.token) {
//         setUsername('');
//         setPassword('');
//         setToken(data.token);
//         const user = data.user;

//         if(user && user.username){
//           setUser(user);
//           storeCurrentUser(user)
//           storeCurrentToken(data.token)
//           swal("You've Successfully Logged in!", "Have fun shopping", "success");
//         }
//       } else {
//         setShowError(data.message);
//       }
//     } catch (error) {

//       swal("Username/Password is Incorrect", "Please Try and Login Again!", "warning");
//       console.error(error);

//       throw error;
//     }
//   }
  
//   const history = useHistory();
//       function navigateToHome() {
//         history.push("/Home");
//       }

//   return <>
//   {showError ? showError : null}
//   { !token
//     ? <form className="loginForm" onSubmit={handleLogin}>
//       <h3 className="loginText">Please Log In</h3>
//       <input name="username" type="text" placeholder="username" required value={username} onChange={(e) => {setUsername(e.target.value)}} />
//       <input type="password" placeholder="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} />
//       <div className="loginButtonsDiv">
//           <button className="loginButton" type="submit">LOG IN</button>
//           <button className="loginButton" type="submit" onClick={() => {
//             navigateToHome();
//           }}>CANCEL</button>
//       </div>
//     </form>
//     : <h1>Welcome back, {user && user.username}!</h1>
// } 
//     </>
// };
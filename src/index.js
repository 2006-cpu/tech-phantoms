import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components';

const Home = () => {

  return<>
    <App />
  </>
}

ReactDOM.render(
  <Router>
    <Home />
  </Router>,
  document.getElementById('root')
);
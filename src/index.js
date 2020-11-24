import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import App from './App';
import Register from './screens/Register';
import Login from './screens/Login';
import Activate from './screens/Activate';
import Forget from './screens/Forget';
import Reset from './screens/Reset';
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/' exact render={props => <App {...props} />} />
      <Route path='/register' exact render={props => <Register {...props} />} />
      <Route path='/login' exact render={props => <Login {...props} />} />
      <Route path='/users/password/forget' exact render={props => <Forget {...props} />} />
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      <Route path='/users/password/reset/:token' exact render={props => <Reset {...props} />} />
    </Switch>
  </Router>  ,
  document.getElementById('root')
);


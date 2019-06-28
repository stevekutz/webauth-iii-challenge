import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import {Route, NavLink} from 'react-router-dom';   // ADD HERE for route fun!
import SignUp from './SignUp';
import SignIn from './SignIn';
import Users from './Users';


function App() {
  return (
    <>
      <h2> Authentication with JWT-iv >> FullStack !</h2>

      <ul>
        <li><NavLink to = "/signup">Signup</NavLink></li>
        <li><NavLink to = "/login">Login</NavLink></li>
        <li><NavLink to = "/users">Users </NavLink></li>
      
      </ul>


      <main>
        <Route path = "/signup" component = {SignUp}/>
        <Route path = "/login" component = {SignIn} />
        <Route path = "/users" component = {Users}/>
      </main>
    </>
  );
}

export default App;

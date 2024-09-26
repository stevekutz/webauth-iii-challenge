import React from 'react';
import { Fragment } from 'react';
// import logo from './logo.svg';
// import './App.css';

//import {Route, NavLink} from 'react-router-dom';   // ADD HERE for route fun!

import {Route, NavLink, withRouter} from 'react-router-dom';   // ADD HERE for route fun!
import SignUp from './SignUp';
import SignIn from './SignIn';
import Users from './Users';


//function App() {
class App extends React.Component {

  logout = () => {

    console.log(" Now Logged OUT");
    
    localStorage.removeItem('jwt')
    this.props.history.push('/login')
  }


  render() {
    return (
      <Fragment>
        <h2> Authentication with JWT-iv >> FullStack !</h2>

        <ul>
          <li><NavLink to = "/signup">Signup</NavLink></li>
          <li><NavLink to = "/login">Login</NavLink></li>
          <li><NavLink to = "/users">Users </NavLink></li>
          <li><button onClick={this.logout}>Logout</button></li>
        
        </ul>


        <main>
          <Route path = "/signup" component = {SignUp}/>
          <Route path = "/login" component = {SignIn} />
          <Route path = "/users" component = {Users}/>
        </main>
      </Fragment>
    );
  }  
}

//export default App;
export default withRouter(App);
import React from 'react';
import { Fragment } from 'react';
import axios from 'axios';

class SignIn extends React.Component {
    state = {
        username: '',
        password: '',
      };



    render() {
        return (
            <Fragment>
                <h3> SignIn</h3>

                <form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="username" />
                  <input
                    name="username"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    type="text"
                  />
                </div>
                <div>
                  <label htmlFor="password" />
                  <input
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    type="password"
                  />
                </div>
      
                <div>
                  <button type="submit">Login</button>
                </div>
              </form>



            </Fragment>


        )
    }

    handleInputChange = event => {
        console.log('inputChange');
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    
      handleSubmit = event => {
        event.preventDefault();
        console.log("submitted");
        console.log(this.state);
        // point this to the login endpoint in your API
        const endpoint = 'http://localhost:5001/api/login';
    
        axios
          .post(endpoint, this.state)
          .then(res => {
              console.log("res data >>> \n", res.data);
            // store the token to local storage
            localStorage.setItem('jwt', res.data.authToken);
          })
          .catch(error => console.error(error.response));
      };



}

export default SignIn;
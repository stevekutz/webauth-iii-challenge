import React from 'react';
import { Fragment } from 'react';
// import axios from 'axios';
import api from './helpers/api';

class Signup extends React.Component {
    state = {
        fullname: '',
        username: '',
        password: '',
      };

      handleChange = event => {
        console.log('handlingChange >> ', event.target.value);
/*
        this.setState({
            [event.target.name]: event.target.value,
        })
*/
        
        const { name, value } = event.target;
        this.setState({ [name]: value });
        
    
    };
    
    handleSubmit = async event => {
        event.preventDefault();
        console.log("submittedSignUp");
        console.log(this.state);

       try{
        const {fullname, username, password } = this.state;

        //const endpoint = "http://localhost:5000/api/auth/register"
        //const result = await axios.post(endpoint, {
            const result = await api.post('/register', {
            fullname,
            username,
            password,
        })

        console.log(result);

       }  catch (err) {
           console.log(err);
       }


    };  


    render() {
        return (
            <Fragment>
                <h3> Signup</h3>

                <form onSubmit = {this.handleSubmit}>
                    <input 
                        type = "text"
                        name = "fullname"
                        placeholder = "fullname"    
                        onChange = {this.handleChange}
                        value = {this.state.fullname}
                    />    

                    <input 
                        type = "text"
                        name = "username"
                        placeholder = "username"    
                        onChange = {this.handleChange}
                        value = {this.state.username}
                    />
                    <input 
                        type = "password"
                        name = "password"
                        placeholder = "password"
                        onChange = {this.handleChange}
                        value = {this.state.password}
                    />
                    <button type="submit">Login</button>
                </form>



            </Fragment>


        )
    }

}

export default Signup;
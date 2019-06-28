import React from 'react';
import { Fragment } from 'react';
// import axios from 'axios';
import api from './helpers/api';

class Signup extends React.Component {
    state = {
        fullname: '',
        username: '',
        password: '',
        department: '',
      };

      handleChange = event => {
/*   TK way
        this.setState({
            [event.target.name]: event.target.value,
        })
*/      
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    
    handleSubmit = async event => {
        event.preventDefault();
        console.log("submitted SignUp");
        console.log(this.state);

       try{
        const {fullname, username, password, department } = this.state;

        //const endpoint = "http://localhost:5000/api/auth/register"
        //const result = await axios.post(endpoint, {
            const result = await api.post('/register', {
            fullname,
            username,
            password,
            department,
        })

        console.log(">> This is result >> ", result);
        console.log(">> This is result.data >> ", result.data);

        // NOW we can see localStorage doing something fun!
        localStorage.setItem('jwt',  result.data.authToken);


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
                    <input 
                        type = "text"
                        name = "department"
                        placeholder = "Department"
                        onChange = {this.handleChange}
                        value = {this.state.department}
                    />
                    <button type="submit"> Sign UP - register  !!!</button>
                </form>
            </Fragment>
        )
    }
}

export default Signup;
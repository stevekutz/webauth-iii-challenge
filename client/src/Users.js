import React from 'react';
import { Fragment } from 'react';
import api from './helpers/api';
import withAuth from './helpers/auth';



class Users extends React.Component {
    state = {
        users: [],   // NEVER FORGET to initialize state !!!!!
    }
    async componentDidMount() {
        try {
            const result = await api.get('/users');
            console.log(result);

            this.setState({
                
                users: result.data,
            })

        } catch (err) {
            console.error(err);
        }

    }
    
    /*
                <ul>
                    {this.state.users.map( (user, i) => {
                        return <li key = {i}>{user.username} </li>
                    })}
                
                </ul>
    */
    
    render() {
     /*   
        if(this.state.users === null) {
            return <p>  HAPPY !!!! </p>
        }
     */   
        return (
            <Fragment>
                <h3> Users</h3>
                <ul>
                {this.state.users.map( (user, i) => {
                    
                    
                    return <li key = {i}>{user.username} </li>
                })}
            
            </ul>

            </Fragment>


        )
    }

}

export default withAuth(Users);
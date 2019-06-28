import React from 'react';
import { Fragment } from 'react';
import api from './helpers/api';

class Users extends React.Component {
    
    async componentDidMount() {
        try {
            const result = await api.get('/users');
            console.log(result);
        } catch (err) {
            console.error(err);
        }

    }
    
    
    
    render() {
        return (
            <Fragment>
                <h3> Users</h3>
            </Fragment>


        )
    }

}

export default Users;
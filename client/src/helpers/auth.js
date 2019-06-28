import React from 'react';
import { withRouter } from 'react-router-dom';

function withAuth(Component) {
	const Auth = (props) => {
		const hasToken = Boolean(localStorage.getItem('jwt'))

		if (hasToken) {
			return <Component {...props} />
		} else {
			props.history.push('/login')
			return <div>You are not JWT authorized</div>
		}
	}

	return withRouter(Auth)
}

export default withAuth
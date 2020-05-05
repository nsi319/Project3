import React from 'react';
import {Route, useHistory} from 'react-router-dom';

export const PrivateRoute = ({component, ...options}) => {
	const history = useHistory();

	const user = localStorage.getItem('token') || false;

	if (!user) {
		history.push('/login');
	} else {
		return <Route {...options} component={component} />;
	}
};

export default PrivateRoute;

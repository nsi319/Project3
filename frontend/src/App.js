import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {ToastProvider} from 'react-toast-notifications';
import {NotFound} from './pages/NotFound';
import {LoginRegister} from './pages/LoginRegister';
import {PrivateRoute} from './components/PrivateRoute';

function App() {
	return (
		<ToastProvider>
			<Router>
				<Switch>
					<Redirect exact from="/" to="/login" />
					<Route exact path="/login" component={LoginRegister} />
					<Route path="*" component={NotFound} />
				</Switch>
			</Router>
		</ToastProvider>
	);
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {ToastProvider} from 'react-toast-notifications';
import {NotFound} from './pages/NotFound';
import {LoginRegister} from './pages/LoginRegister';
import {PrivateRoute} from './components/PrivateRoute';
import {Home} from './pages/HomePage';
import {GameCanva} from './components/Game/Game';
import Socket from './components/socket';

function App() {
	return (
		<ToastProvider>
			<Router>
				<Switch>
					<Redirect exact from="/" to="/login" />
					<Route exact path="/login" component={LoginRegister} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/testsocket" component={Socket} />
					<Route path="*" component={NotFound} />
				</Switch>
			</Router>
		</ToastProvider>
	);
}

export default App;

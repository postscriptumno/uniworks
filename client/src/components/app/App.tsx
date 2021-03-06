import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Header from '../header/header';
import Main from '../main/main';
import Works from '../works/works';
import Rules from '../rules/rules';
import Form from '../form/form';
import Footer from '../footer/footer';
import About from '../about/about';
import Preloader from '../preloader/preloader';
import Account from '../account/account';

import { CLIENT_ROUTES } from '../../routes/routes';

import './App.css';
import { useAuth } from '../../hooks/auth.hook';
import store from '../../store/store';
import { ActionType } from '../../store/actions';

const storageName = 'userData';

const App: React.FC = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const { token, userId, login, logout } = useAuth();

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 3000);

		const storageData = JSON.parse(localStorage.getItem(storageName) || '{}');

		if (storageData && storageData.token) {
			login(storageData.token, storageData.userId, storageData.userName, storageData.userMail);
			store.dispatch({ type: ActionType.SWITCH_AUTH_STATUS });
			store.dispatch({ type: ActionType.REGISTER_USER, payload: storageData });
		}
	}, []);

	return (
		<div className="app">
			{isLoaded ? (
				<Router>
					<Header />
					<Switch>
						<Route path={CLIENT_ROUTES.auth.href} exact>
							<Form />
						</Route>
						<Route path={CLIENT_ROUTES.about.href} exact>
							<About />
						</Route>
						<Route path={CLIENT_ROUTES.works.href} exact>
							<Works />
						</Route>
						<Route path={CLIENT_ROUTES.rules.href} exact>
							<Rules />
						</Route>
						<Route path={CLIENT_ROUTES.account.href} exact>
							<Account />
						</Route>
						<Route path={CLIENT_ROUTES.main.href} exact>
							<Main />
						</Route>
						<Route>
							404
							<br />
							<Link to={CLIENT_ROUTES.main.href}>go to main</Link>
						</Route>
					</Switch>
					<Footer />
				</Router>
			) : (
				<Preloader />
			)}
		</div>
	);
};

export default App;

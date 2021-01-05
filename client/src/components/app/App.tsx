// Npm libs
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Footer from '../footer/footer';
import About from '../about/about';

// External components
import HeaderNavigation from '../headerNavigation/headerNavigation';
import Home from '../home/home';
import Preloader from '../preloader/preloader';

// Styles
import './App.css';
import Works from '../works/works';
import Rules from '../rules/rules';
import Form from '../form/form';

const App: React.FC = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 3000);
	}, []);

	return (
		<div className="App">
			{isLoaded ? (
				<Router>
					<HeaderNavigation />
					<Switch>
						<Route path="/auth/:formType" exact>
							<Form />
						</Route>
						<Route path="/about" exact>
							<About />
						</Route>
						<Route path="/works" exact>
							<Works />
						</Route>
						<Route path="/rules" exact>
							<Rules />
						</Route>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route>
							404
							<br />
							<Link to="/">go to main</Link>
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
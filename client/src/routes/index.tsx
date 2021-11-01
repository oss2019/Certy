import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import TemplatePage from '../components/TemplatePage';

const Routes = () => (
	<Switch>
		<Route path="/" exact component={Dashboard} />
		<Route path="/home" exact component={TemplatePage} />
	</Switch>
);

export default Routes;

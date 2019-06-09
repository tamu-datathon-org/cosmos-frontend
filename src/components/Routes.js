import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LessonsPage from './lessons/LessonsPage';
import HomePage from './home/HomePage';
import NotFound from './NotFound';
import Login from './Login';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/lessons" component={LessonsPage} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
    </Switch>
);
export default Routes;

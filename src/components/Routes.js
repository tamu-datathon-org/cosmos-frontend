import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LessonsPage from './lessons/LessonsPage';
import Signup from './Signup';
import NotFound from './NotFound';
import Login from './Login';
import AppliedRoute from './AppliedRoute';

const Routes = ({ childProps }) => (
    <Switch>
        <Redirect exact path="/" to="/login" />
        <AppliedRoute exact path="/lessons" component={LessonsPage} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute exact path="/login" component={Login} props={childProps} />
        <Route component={NotFound} />
    </Switch>
);
export default Routes;

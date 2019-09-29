import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LessonsPage from './lessons/LessonsPage';
import Signup from './Signup';
import CosmosSignIn from './SignIn';
import NotFound from './NotFound';
import Login from './Login';
import ResetPassword from "./ResetPassword";
import AppliedRoute from './AppliedRoute';
import HomePage from './HomePage';
import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';

const Routes = ({ childProps }) => (
    <Switch>
        <AppliedRoute exact path="/" component={HomePage} props={childProps} />
        <AuthenticatedRoute exact path="/lessons" component={LessonsPage} props={childProps} />
        <UnauthenticatedRoute path="/login" exact component={CosmosSignIn} props={childProps} />
        <UnauthenticatedRoute
            path="/signup"
            exact
            component={Signup}
            props={childProps}
        />
        <UnauthenticatedRoute path="/login/reset" exact component={ResetPassword} props={childProps} />
        <Route component={NotFound} />
    </Switch>
);
export default Routes;

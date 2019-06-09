import React from 'react';
import { Route } from 'react-router-dom';
import LessonsPage from './lessons/LessonsPage';
import HomePage from './home/HomePage';
import NotFound from './NotFound';

const Routes = () => (
    <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/lessons" component={LessonsPage} />
        <Route component={NotFound} />
    </div>
);
export default Routes;

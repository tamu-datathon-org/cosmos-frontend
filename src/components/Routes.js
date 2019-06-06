import React from 'react';
import { Route } from 'react-router-dom';
import LessonsPage from './lessons/LessonsPage';
import HomePage from './home/HomePage';

const Routes = () => (
    <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/lessons" component={LessonsPage} />
    </div>
);
export default Routes;

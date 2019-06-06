import React from 'react';
import { Route } from 'react-router-dom';
import LessonList from './lessons/LessonList';
import HomePage from './home/HomePage';

const Routes = () => (
    <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/lessons" component={LessonList} />
    </div>
);
export default Routes;

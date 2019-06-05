import React from 'react';
import { Route } from 'react-router-dom';
import LessonList from './LessonList';
import Home from './home/Home';

const Routes = () => (
    <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/lessons" component={LessonList} />
    </div>
);
export default Routes;

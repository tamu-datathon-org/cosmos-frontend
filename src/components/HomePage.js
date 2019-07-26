import React, { Component } from 'react';
import Splashpage from './Splashpage';
import LessonsPage from './lessons/LessonsPage';

export default class HomePage extends Component {
    render() {
        return (
            <>
                {this.props.isAuthenticated ? <LessonsPage /> : <Splashpage />}
            </>
        );
    }
}

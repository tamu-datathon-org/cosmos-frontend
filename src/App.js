import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Routes from './components/Routes';

class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Routes />
            </div>
        );
    }
}

export default App;

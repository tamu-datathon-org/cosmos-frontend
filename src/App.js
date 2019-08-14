import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import { Auth } from 'aws-amplify';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
        };
    }

    async componentDidMount() {
        try {
            await Auth.currentSession();
            this.userHasAuthenticated(true);
        } catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        this.setState({ isAuthenticating: false });
    }

    userHasAuthenticated = (isAuthenticated) => {
        this.setState({ isAuthenticated });
    };

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
        };

        return (
            // Since loading the user session is an asynchronous process,
            // we want to ensure that our app does not change states when it first loads.
            // To do this we’ll hold off rendering our app till isAuthenticating is false.
            !this.state.isAuthenticating && (
                <div>
                    <NavBar {...childProps} />
                    <Routes childProps={childProps} />
                </div>
            )
        );
    }
}

export default App;

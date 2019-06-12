import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const AVATAR_SRC =
    'http://cdn.osxdaily.com/wp-content/uploads/2014/03/cosmos-space-wallpaper-6.jpg';

class NavBar extends Component {
    constructor(props) {
        super(props);
        let value;
        switch (this.props.location.pathname) {
            case '/lessons':
            case '/login':
                value = 0;
                break;
            case '/signup':
                value = 1;
                break;
            default:
                value = 0;
                break;
        }

        this.state = { value }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleLogout = async (event) => {
        await Auth.signOut();

        this.props.userHasAuthenticated(false);

        this.props.history.push('/login');
    };

    render = () => {
        const tabsProps = {
            style: { position: 'absolute', right: '0px' },
            value: this.state.value,
            onChange: this.handleChange,
        };
        return (
            <div>
                <AppBar style={{ marginBottom: '20px' }} position="static">
                    <Toolbar variant="dense">
                        <Avatar src={AVATAR_SRC} style={{ marginRight: '20px' }} />
                        <Typography variant="h5">Cosmos</Typography>
                        {this.props.isAuthenticated ? (
                            <Tabs {...tabsProps}>
                                <Tab label="Logout" onClick={this.handleLogout} />
                            </Tabs>
                        ) : (
                                <Tabs {...tabsProps}>
                                    <Tab label="Sign In" component={Link} to="/login" />
                                    <Tab label="Sign Up" component={Link} to="/signup" />
                                </Tabs>
                            )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    };
}

export default withRouter(NavBar);

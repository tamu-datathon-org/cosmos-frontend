import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import {
    Navbar as BootstrapNav,
    Nav,
    NavbarBrand,
    NavbarToggler,
    NavbarText,
    NavItem,
    NavLink,
    Collapse
} from 'reactstrap';


// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Avatar from '@material-ui/core/Avatar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import CosmosWallpaper from '../assets/img/separator_planet.png';

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

        const avatarProps = {
            avatarImage: CosmosWallpaper,
            altText: 'Cosmos by TAMU Datathon'
        };

        const isOpen = false;

        return (
            <div>
                <BootstrapNav expand="md">
                    <NavbarBrand href="/">
                        <Avatar {...avatarProps} />
                        Cosmos
                        {/* <Avatar src={CosmosWallpaper} style={} /> */}
                    </NavbarBrand>

                    <NavbarToggler onClick={false} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar></Nav>
                        {/* the nav component pushes this to the right */}
                        <NavbarText>
                            {this.props.isAuthenticated ? (
                                <a onClick={this.handleLogout}>Logout</a>
                            ) : (
                                <NavLink tag={Link} to="/login">Sign In / Sign Up</NavLink>
                            )}
                        </NavbarText>
                    </Collapse>
                    
                </BootstrapNav>
                
                {/* <AppBar style={{ marginBottom: '20px' }} position="static">
                    <Toolbar variant="dense">
                        <Avatar src={CosmosWallpaper} style={{ marginRight: '20px' }} />
                        <Typography variant="h5">Cosmos</Typography>
                        {this.props.isAuthenticated ? (
                            <Tabs {...tabsProps}>
                                <Tab label="Logout" onClick={this.handleLogout} />
                            </Tabs>
                        ) : (
                                <Tabs {...tabsProps}>
                                    <Tab label="Sign In / Sign Up" component={Link} to="/login" />
                                </Tabs>
                            )}
                    </Toolbar>
                </AppBar> */}
            </div>
        );
    };
}

// implement custom avatar component instead of MaterialUI
function Avatar({ avatarImage, altText }) {
    const style = {
        marginRight: '20px',
        verticalAlign: 'middle',
        width: '50px',
        height: '50px',
        borderRadius: '50%'
    };
    return (
        <img src={avatarImage} alt={altText} style={style} />
    );
}

export default withRouter(NavBar);

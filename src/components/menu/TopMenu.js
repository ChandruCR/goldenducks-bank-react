import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';
import { Header, Icon, Menu, Button } from "semantic-ui-react";

// Page header and menu
const TopMenu = ({ isAuthenticated, logout }) => (
    <Menu inverted stackable>
        <Menu.Menu>
            <Menu.Item>
                <Header as='h4' color='blue' >
                    <Icon name='money' />
                    <Header.Content>
                        Golden Ducks Bank
                    </Header.Content>
                </Header>
            </Menu.Item>
        </Menu.Menu>
        {isAuthenticated &&
            <Menu.Menu position="right">
                <Menu.Item>
                    <Header as='h5' color='blue' >
                        <Header.Content>
                            <Link to='/home'>Home</Link>
                        </Header.Content>
                    </Header>
                </Menu.Item>
                <Menu.Item>
                    <Button primary onClick={() => logout()}>Logout</Button>
                </Menu.Item>
            </Menu.Menu>
        }
    </Menu>
);

TopMenu.PropTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.accountDetails
    };
}

export default connect(mapStateToProps, { logout })(TopMenu);

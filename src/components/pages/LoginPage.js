import React, { Component } from 'react';
import TopMenu from '../menu/TopMenu';
import LoginForm from '../forms/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Segment } from 'semantic-ui-react';

//login page
class LoginPage extends Component {

    // api call and navigate to home page on successful login
    submit = data =>
        this.props.login(data).then(() => this.props.history.push("/home"));

    // renders below components on login page - Menu, Login Form
    render() {
        return (
            <Segment.Group raised>
                <TopMenu />
                <LoginForm submit={this.submit} />
            </Segment.Group> 
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage);

import React, { Component } from 'react';
import TopMenu from '../menu/TopMenu';
import LoginForm from '../forms/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Segment } from 'semantic-ui-react';

class LoginPage extends Component {
    submit = data =>
        this.props.login(data).then(() => this.props.history.push("/home"));
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

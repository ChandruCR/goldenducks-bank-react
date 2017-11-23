import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

// authorized pages go through this route
const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ?
                <Component {...props} /> :
                <Redirect to="/" />} />
);

UserRoute.PropTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.accountDetails
    };
}

export default connect(mapStateToProps)(UserRoute);
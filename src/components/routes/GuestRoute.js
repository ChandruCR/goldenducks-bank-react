import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// GuestRoute - Pages which are accesible without user login go through this route
const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/home" />
                )}
    />
);

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.accountDetails
    };
}

export default connect(mapStateToProps)(GuestRoute);
import React from 'react';
import { PropTypes } from 'prop-types';
import LoginPage from "./components/pages/LoginPage"
import HomePage from "./components/pages/HomePage";
import StatementPage from "./components/pages/StatementPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import {Container} from "semantic-ui-react";

// routes are defined here. UserRoute can be accesible after login only.
const App = ({ location }) => (
    <Container fluid>
        <GuestRoute location={location} path="/" exact component={LoginPage} />
        <UserRoute location={location} path="/home" exact component={HomePage} />
        <UserRoute location={location} path="/statement/:id" component={StatementPage} />
    </Container>
);

App.PropTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
}
export default App;

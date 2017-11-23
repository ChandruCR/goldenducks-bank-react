import React from "react";
import PropTypes from "prop-types";

// inline error for login form
const InlineError = ({ text }) => (
    <span style={{ color: "#ae5856" }}>{text}</span>
);

InlineError.PropTypes = {
    text: PropTypes.string.isRequired
}
export default InlineError;
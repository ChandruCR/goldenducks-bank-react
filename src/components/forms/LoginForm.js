import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class LoginForm extends Component {
    state = {
        data: {
            accountNumber: ""
        },
        loading: false,
        errors: {}
    };

    // universal onChange handler
    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    // login form submit handler
    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: true }));
        }
    };

    // validating login form fields
    validate = (data) => {
        const errors = {};
        if (!this.validateAccountNumber(data.accountNumber)) errors.accountNumber = "Invalid Account Number";
        if (!data.accountNumber) errors.accountNumber = "Account Number can't be empty";
        return errors;
    };

    // validating account number using Regular Expression
    validateAccountNumber = (accountNumber) => {
        const accounNumberFormat = /([A-Z]{2}[0-9]{2}[ ][A-Z]{4}[ ]([0-9]{4}[ ]){2}[0-9]{2})/g;
        return accounNumberFormat.test(accountNumber);
    }

    render() {
        const { data, errors, loading } = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading ={loading}>
                {errors.global && <Message negative>
                    <Message.Header>Something went wrong</Message.Header>
                    <p>{errors.global}</p>
                </Message>}
                <Form.Field>
                    <label htmlFor="accountNumber">Account Number</label>
                    <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        placeholder="AA00 AAAA 0000 0000 00"
                        value={data.accountNumber}
                        onChange={this.onChange}
                    />
                    {errors.accountNumber && <InlineError text={errors.accountNumber} />}
                </Form.Field>
                <Button primary>Login</Button>
            </Form>

        )
    }
}

LoginForm.PropTypes = {
    submit: PropTypes.func.isRequired
}

export default LoginForm;
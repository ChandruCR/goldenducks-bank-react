import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Table, Icon } from "semantic-ui-react";

// user details are displayed using this component
const UserDetails = ({ accountNumber, firstName, lastName, currentBalance }) => {

    // formatting accountnumber
    let formatAccountNumber = (accNo) => {
        let formattedaccountNumber = accNo.slice(0, 4) + " " + accNo.slice(4, 8) + " " +
            accNo.slice(8, 12) + " " + accNo.slice(12, 16) + " " + accNo.slice(16, 18)
        return formattedaccountNumber;
    }

    // gets day for passed date
    let getDay = (date) => {
        let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekday[date.getDay()];
    }

    // formats date with / separtor
    let formatDate = (date) => {
        return date.toJSON().slice(0, 10).replace(/-/g, '/');
    }

    let fullName = firstName + " " + lastName;
    let currentDate = formatDate(new Date());
    let currentDay = getDay(new Date());
    let formattedaccountNumber = formatAccountNumber(accountNumber);

    // renders user details on screen
    return (
        <div>
            <Table color='blue' attached='top' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>Account Summary</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>
            <Table attached inverted>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell> <Icon name='user' /> {fullName}</Table.Cell>
                        <Table.Cell><Icon name='credit card' />{formattedaccountNumber}</Table.Cell>
                        <Table.Cell><Icon name='calendar' />{currentDay}, {currentDate}</Table.Cell>
                        <Table.Cell><Icon name='euro' />{currentBalance}</Table.Cell>
                    </Table.Row>

                </Table.Body>
            </Table>
        </div>
    );
}

UserDetails.PropTypes = {
    accountNumber: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    currentBalance: PropTypes.string.isRequired
}

function mapStateToProps(state) {
    return {
        accountNumber: state.user.accountDetails.accountNumber,
        firstName: state.user.accountDetails.firstName,
        lastName: state.user.accountDetails.lastName,
        currentBalance: state.user.accountDetails.statements[state.user.accountDetails.statements.length - 1].balances[1].amount
    };
}
export default connect(mapStateToProps)(UserDetails);

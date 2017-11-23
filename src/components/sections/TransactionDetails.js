import _ from 'lodash';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Table } from "semantic-ui-react";

class TransactionDetails extends Component {
    state = {
        column: null,
        data: this.props.transactions,
        direction: null,
    }

    // sorting based on row header click
    handleSort = clickedColumn => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    };

    // formatting accountnumber
    formatAccountNumber = (accNo) => {
        let formattedaccountNumber = accNo.slice(0, 4) + " " + accNo.slice(4, 8) + " " +
            accNo.slice(8, 12) + " " + accNo.slice(12, 16) + " " + accNo.slice(16, 18)
        return formattedaccountNumber;
    }

    // renders transaction details table
    render() {
        const { column, data, direction } = this.state;
        return (
            <div>
                <Table color='blue' attached='top' inverted>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={2}>
                                Transactions Summary
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table>
                <Table attached fixed singleLine sortable celled inverted>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sorted={column === 'iban' ? direction : null} onClick={this.handleSort('iban')} width={2}>
                                IBAN
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={this.handleSort('name')} width={3}>
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'amount' ? direction : null} onClick={this.handleSort('amount')} width={1}>
                                Amount
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'debit_credit' ? direction : null} onClick={this.handleSort('debit_credit')} width={1}>
                                Type
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'date' ? direction : null} onClick={this.handleSort('date')} width={2}>
                                Date
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'description' ? direction : null} onClick={this.handleSort('description')} width={6}>
                                Description
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data, ({ iban, name, amount, debit_credit, date, description }, index) => (
                            <Table.Row key={index} >
                                <Table.Cell title={[this.formatAccountNumber(iban)]}>{this.formatAccountNumber(iban)}</Table.Cell>
                                <Table.Cell title={[name]}>{name}</Table.Cell>
                                <Table.Cell title={[amount]}>{amount}</Table.Cell>
                                <Table.Cell title={[debit_credit.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ')]}>{debit_credit.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</Table.Cell>
                                <Table.Cell title={[date]}>{date}</Table.Cell>
                                <Table.Cell title={[description]}>{description}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
TransactionDetails.PropTypes = {
    transactions: PropTypes.arrayOf({
        iban: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        debit_credit: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
}

export default TransactionDetails;
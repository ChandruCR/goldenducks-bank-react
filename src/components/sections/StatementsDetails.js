import _ from 'lodash';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Table } from "semantic-ui-react";

class StatementsDetails extends Component {

    state = {
        column: null,
        data: this.props.statementSummaryDetails,
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
    }

    // selected statement id returned home page and which will navigate the statement page
    handleSelect = (id, e) =>
        this.props.select(id);

    // renders the statement summary table
    render() {
        const { column, data, direction } = this.state;
        return (
            <div>
            <Table color='blue' attached='top' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            Statements Summary
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>
            <Table attached fixed singleLine sortable celled inverted selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell sorted={column === 'date' ? direction : null} onClick={this.handleSort('date')}>
                            Statement Date
                        </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'startDate' ? direction : null} onClick={this.handleSort('startDate')}>
                            Start Date
                        </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'endDate' ? direction : null} onClick={this.handleSort('endDate')}>
                            End Date
                        </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'openingBalance' ? direction : null} onClick={this.handleSort('openingBalance')}>
                            Opening Balance
                        </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'closingBalance' ? direction : null} onClick={this.handleSort('closingBalance')}>
                            Closing Balance
                        </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'transactions' ? direction : null} onClick={this.handleSort('transactions')}>
                            Transactions
                        </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'noOfDebit' ? direction : null} onClick={this.handleSort('noOfDebit')}>
                            Debit
                        </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'noOfCredit' ? direction : null} onClick={this.handleSort('noOfCredit')}>
                            Credit
                        </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'totalDebitAmount' ? direction : null} onClick={this.handleSort('totalDebitAmount')}>
                            Debit Amount
                        </Table.HeaderCell>
                        <Table.HeaderCell sorted={column === 'totalCreditAmount' ? direction : null} onClick={this.handleSort('totalCreditAmount')}>
                            Credit Amount
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(data, ({ id, statementdate, startDate, endDate, openingBalance, closingBalance, transactions, noOfDebit, noOfCredit, totalDebitAmount, totalCreditAmount }) => (
                        <Table.Row key={id} onClick={this.handleSelect.bind(this, id)}>
                            <Table.Cell title={[statementdate]}>{statementdate}</Table.Cell>
                            <Table.Cell title={[startDate]}>{startDate}</Table.Cell>
                            <Table.Cell title={[endDate]}>{endDate}</Table.Cell>
                            <Table.Cell title={[openingBalance]}>{openingBalance}</Table.Cell>
                            <Table.Cell title={[closingBalance]}>{closingBalance}</Table.Cell>
                            <Table.Cell title={[transactions]}>{transactions}</Table.Cell>
                            <Table.Cell title={[noOfDebit]}>{noOfDebit}</Table.Cell>
                            <Table.Cell title={[noOfCredit]}>{noOfCredit}</Table.Cell>
                            <Table.Cell title={[totalDebitAmount]}>{totalDebitAmount}</Table.Cell>
                            <Table.Cell title={[totalCreditAmount]}>{totalCreditAmount}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            </div>
        );
    }

}
StatementsDetails.PropTypes = {
    statementSummaryDetails: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        statementdate: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        openingBalance: PropTypes.string.isRequired,
        closingBalance: PropTypes.string.isRequired,
        transactions: PropTypes.number.isRequired,
        noOfDebit: PropTypes.number.isRequired,
        noOfCredit: PropTypes.number.isRequired,
        totalDebitAmount: PropTypes.number.isRequired,
        totalCreditAmount: PropTypes.number.isRequired
    }).isRequired,
    select: PropTypes.func.isRequired
}

export default StatementsDetails;
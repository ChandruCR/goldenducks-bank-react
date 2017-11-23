import React, { Component } from 'react';
import TopMenu from '../menu/TopMenu';
import UserDetails from '../sections/UserDetails';
import StatementsDetails from '../sections/StatementsDetails';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import DCTransChart from '../sections/DCTransChart';

class HomePage extends Component {
    state = {
        id: null
    }

    select = data => {
        this.setState({ id : data });
        this.props.history.push(`/statement/${data}`);
    }

    render() {
        const statements = this.props.statements;
        let DCTransChartData = {
            statementTSData: [],
            transactionData: [],
            debitData: [],
            creditData: [],
            noOfDebit: [],
            noOfCredit: []
        };
        let statementSummaryDetails = statements.map(statement => {
            let statementTimestamp = statement.date.replace('Z', '').replace('T', ' ').replace(/-/g, '/').slice(0, 19);
            let totalDebitAmount = 0;
            let totalCreditAmount = 0;
            let noOfDebit = 0;
            let noOfCredit = 0;
            statement.transactions.forEach(element => {
                if (element.debit_credit === "debit") {
                    totalDebitAmount += element.amount;
                    noOfDebit++;
                }
                if (element.debit_credit === "credit") {
                    totalCreditAmount += element.amount;
                    noOfCredit++;
                }
            });

            DCTransChartData.statementTSData.push(statement.id);
            DCTransChartData.transactionData.push(statement.transactions.length);
            DCTransChartData.debitData.push(totalDebitAmount);
            DCTransChartData.creditData.push(totalCreditAmount);
            DCTransChartData.noOfDebit.push(noOfDebit);
            DCTransChartData.noOfCredit.push(noOfCredit);
            return ({
                id: statement.id,
                statementdate: statementTimestamp,
                startDate: statement.balances[0].date.replace(/-/g, '/'),
                endDate: statement.balances[1].date.replace(/-/g, '/'),
                openingBalance: statement.balances[0].amount,
                closingBalance: statement.balances[1].amount,
                transactions: statement.transactions.length,
                noOfDebit: noOfDebit,
                noOfCredit: noOfCredit,
                totalDebitAmount: totalDebitAmount,
                totalCreditAmount: totalCreditAmount
            })

        })

        return (
            <Segment.Group raised>
                <TopMenu />
                <UserDetails />
                <br/>
                <StatementsDetails statementSummaryDetails={statementSummaryDetails} select={this.select} />
                <br/>
                <DCTransChart DCTransChartData={DCTransChartData} />         
            </Segment.Group>
        );
    }
}

HomePage.PropTypes = {
    statements: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        iban: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        balances: PropTypes.arrayOf({
            amount: PropTypes.string.isRequired,
            debit_credit: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired
        }).isRequired,
        transactions: PropTypes.arrayOf({
            iban: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            debit_credit: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }).isRequired

    }).isRequired
}

function mapStateToProps(state) {
    return {
        statements: state.user.accountDetails.statements
    };
}
export default connect(mapStateToProps)(HomePage);
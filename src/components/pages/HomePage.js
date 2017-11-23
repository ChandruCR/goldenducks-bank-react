import React, { Component } from 'react';
import TopMenu from '../menu/TopMenu';
import UserDetails from '../sections/UserDetails';
import StatementsDetails from '../sections/StatementsDetails';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import DCTransChart from '../sections/DCTransChart';

// home page 
class HomePage extends Component {
    state = {
        id: null
    }

    // sets statement id to state and navigates to statement page 
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
        // iterating through all statements to generate data required to populate statement summary table
        // also to generate data for charts
        let statementSummaryDetails = statements.map(statement => {
            let statementTimestamp = statement.date.replace('Z', '').replace('T', ' ').replace(/-/g, '/').slice(0, 19);
            let totalDebitAmount = 0; // total debit amount in every statement
            let totalCreditAmount = 0; // total credit amount in every statement
            let noOfDebit = 0; // total number of debit transactions in every statement
            let noOfCredit = 0; // total number of credit transactions in every statement
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

            // data for charts
            DCTransChartData.statementTSData.push(statement.id);
            DCTransChartData.transactionData.push(statement.transactions.length);
            DCTransChartData.debitData.push(totalDebitAmount);
            DCTransChartData.creditData.push(totalCreditAmount);
            DCTransChartData.noOfDebit.push(noOfDebit);
            DCTransChartData.noOfCredit.push(noOfCredit);
            
            // data for statement summary table
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
        
        // below components are rendered on home page - Menu, Statements table and charts
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

// getting statements from state to props
function mapStateToProps(state) {
    return {
        statements: state.user.accountDetails.statements
    };
}
export default connect(mapStateToProps)(HomePage);
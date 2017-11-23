import React, { Component } from 'react';
import TopMenu from '../menu/TopMenu';
import UserDetails from '../sections/UserDetails';
import TransactionDetails from '../sections/TransactionDetails';
import TransChart from '../sections/TransChart';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';



class StatementPage extends Component {
    render() {
        let transChartData={};
        const statement = this.props.statements.filter(statement => (statement.id === this.props.match.params.id))[0];
        let totalDebitCreditAmount = [0, 0];
        let noOfDebitsCredits = [0, 0]; 
        let creditSum = {};
        let debitSum ={};

        statement.transactions.forEach(element => {
            if (element.debit_credit === "debit") {
                totalDebitCreditAmount[0] += element.amount;
                noOfDebitsCredits[0]++;
                debitSum[element.name]?debitSum[element.name]+=element.amount:debitSum[element.name]=element.amount;
            }
            if (element.debit_credit === "credit") {
                totalDebitCreditAmount[1] += element.amount;
                noOfDebitsCredits[1]++;
                creditSum[element.name]?creditSum[element.name]+=element.amount:creditSum[element.name]=element.amount;
            }
            transChartData.totalDebitCreditAmount =totalDebitCreditAmount;
            transChartData.noOfDebitsCredits =noOfDebitsCredits;
            transChartData.creditSum = creditSum;
            transChartData.debitSum = debitSum;
        });
        return (
        <Segment.Group raised>
            <TopMenu />
            <UserDetails />
            <br />
            <TransactionDetails transactions={statement.transactions}/>
            <br/>
            <TransChart transChartData={transChartData} />
        </Segment.Group>
        )
    }
}

StatementPage.PropTypes = {
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
export default connect(mapStateToProps)(StatementPage);
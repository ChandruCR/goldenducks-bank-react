import React, { Component } from 'react';
import TopMenu from '../menu/TopMenu';
import UserDetails from '../sections/UserDetails';
import TransactionDetails from '../sections/TransactionDetails';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';


class StatementPage extends Component {
    render() {
        const statement = this.props.statements.filter(statement => (statement.id === this.props.match.params.id))[0];
        console.log(statement)
        /*let statementTimestamp = statement.date.replace('Z', '').replace('T', ' ').replace(/-/g, '/').slice(0, 19);
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
        });*/
        
        
        return (
        <Segment.Group raised>
            <TopMenu />
            <UserDetails />
            <br />
            <TransactionDetails transactions={statement.transactions}/>
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
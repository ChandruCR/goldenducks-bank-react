import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { PropTypes } from 'prop-types';
import { Grid, Table } from 'semantic-ui-react';

// charts for statement page
const TransChart = ({ transChartData }) => {

    // converts hex code
    let colToHex = (c) => {
        let color = (c < 75) ? c + 75 : c
        let hex = color.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    
    // gets random rgb value
    let getRandomColor = () => {
        return rgbToHex(
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255));
    }

    // rgb to hex codes
    let rgbToHex = (r, g, b) => {
        return "#" + colToHex(r) + colToHex(g) + colToHex(b) + "";
    };

    // data for pie chart displaying no of credit/debit transactions and total amount of debit and credit transactions
    let data = {
        datasets: [{
            data: transChartData.noOfDebitsCredits,
            backgroundColor: transChartData.noOfDebitsCredits.map(getRandomColor),
            label: 'one'
        },
        {
            data: transChartData.totalDebitCreditAmount,
            backgroundColor: transChartData.totalDebitCreditAmount.map(getRandomColor),
            label: 'two'
        }],
        labels: ['Debit', 'Credit']
    };

    // legend option for pie chart
    const legendOpts = {
        display: true,
        position: 'left',
        fullWidth: false,
        reverse: true,
        labels: {
            fontColor: 'rgb(255, 99, 132)',
            fontSize: 10,
            boxWidth: 4
        }
    };
    
    // data for bar chart used to display debit amount aggregated based on name/iban
    const data_debitSum = {
        labels: Object.keys(transChartData.debitSum),
        datasets: [
            {
                label: 'Debit',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: Object.values(transChartData.debitSum)
            }
        ]
    };

    // data for bar chart used to display credit amount aggregated based on name/iban
    const data_creditSum = {
        labels: Object.keys(transChartData.creditSum),
        datasets: [
            {
                label: 'Credit',
                backgroundColor: 'rgba(100,99,255,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(155,99,255,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: Object.values(transChartData.creditSum)
            }
        ]
    };

    // renders pie chart and two bar charts
    return (
        <div>
            <Table color='blue' attached='top' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={2}>
                            Charts
					</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>
            <Grid inverted>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <h3>Total Debit/Credit Transactions, Total Debit/Credit Amount </h3>
                    <Pie data={data} legend={legendOpts} />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <h3>Debit Amount/Category </h3>
                    <Bar data={data_debitSum}  />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <h3>Credit Amount/Category </h3>
                    <Bar data={data_creditSum}  />
                </Grid.Column>
            </Grid>
        </div>
    );
};

TransChart.PropTypes = {
    transChartData: PropTypes.shape({
        totalDebitCreditAmount: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        noOfDebitsCredits: PropTypes.arrayOf(PropTypes.number.isRequired).isRequire,
        creditSum: PropTypes.any,
        debitSum: PropTypes.any
    }).isRequired
}
export default TransChart;

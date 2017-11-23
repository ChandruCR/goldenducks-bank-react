import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { PropTypes } from 'prop-types';
import { Grid , Table} from 'semantic-ui-react';


const DCTransChart = ({ DCTransChartData }) => {
	let colToHex = (c) => {
		let color = (c < 75) ? c + 75 : c
		let hex = color.toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	}
	let getRandomColor = () => {
		return rgbToHex(
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255),
			Math.floor(Math.random() * 255));
	}

	let rgbToHex = (r, g, b) => {
		return "#" + colToHex(r) + colToHex(g) + colToHex(b) + "";
	};
	let data_chartAll = DCTransChartData && {
		datasets: [{
			data: DCTransChartData.transactionData,
			backgroundColor: DCTransChartData.transactionData.map(getRandomColor),
			label: 'one'
		},
		{
			data: DCTransChartData.noOfDebit,
			backgroundColor: DCTransChartData.transactionData.map(getRandomColor),
			label: 'two'
		},
		{
			data: DCTransChartData.noOfCredit,
			backgroundColor: DCTransChartData.transactionData.map(getRandomColor),
			label: 'three'
		}],
		labels: DCTransChartData.statementTSData
	};
	let data_chartDebit = DCTransChartData && {
		datasets: [{
			data: DCTransChartData.noOfDebit,
			backgroundColor: DCTransChartData.transactionData.map(getRandomColor),
			label: 'one'
		},
		{
			data: DCTransChartData.debitData,
			backgroundColor: DCTransChartData.transactionData.map(getRandomColor),
			label: 'two'
		}],
		labels: DCTransChartData.statementTSData
	};
	let data_chartCredit = DCTransChartData && {
		datasets: [{
			data: DCTransChartData.noOfCredit,
			backgroundColor: DCTransChartData.transactionData.map(getRandomColor),
			label: 'one'
		},
		{
			data: DCTransChartData.creditData,
			backgroundColor: DCTransChartData.transactionData.map(getRandomColor),
			label: 'two'
		}],
		labels: DCTransChartData.statementTSData
	};
	console.log(data_chartDebit);
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
	return (
		<div>
			{DCTransChartData &&
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
							<h3>Transactions, Debit Transactions, Credit Transactions / Statement </h3>
							<Doughnut data={data_chartAll} legend={legendOpts} />
						</Grid.Column>
						<Grid.Column mobile={16} tablet={8} computer={8}>
							<h3>Total Debit Transaction Amount / Statement </h3>
							<Doughnut data={data_chartDebit} />
						</Grid.Column>
						<Grid.Column mobile={16} tablet={8} computer={8}>
							<h3>Total Credit Transaction Amount / Statement </h3>
							<Doughnut data={data_chartCredit} />
						</Grid.Column>
					</Grid>
				</div>
			}</div>
	);
};

DCTransChart.PropTypes = {
	DCTransChartData: PropTypes.shape({
		statementTSData: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		transactionData: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
		debitData: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
		creditData: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
		noOfDebit: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
		noOfCredit: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
	}).isRequired,
	select: PropTypes.func.isRequired
}
export default DCTransChart;

import React from 'react';

export default class TransactionsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      transactions: [],
    };
  }

  render() {
    return (
      <div>
        <a href="/transactions/new">New Transaction</a>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Property</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <TransactionItem/>
          </tbody>
        </table>
      </div>
    );
  }
}

function TransactionItem(props) {
  return (
    <tr>
      <td>01/01/19</td>
      <td>Home Depot (add notes)</td>
      <td>Expense / Cleaning Supplies</td>
      <td>123 Main St.</td>
      <td>-$10.00</td>
    </tr>
  );
}
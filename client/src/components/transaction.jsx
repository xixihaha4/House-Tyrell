import React from 'react'
import TransactionItem from './transactionItem'

export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionList: [],
    }
  }

  render() {
    return (
      <div>
        {this.state.transactionList.map((item, i) =>
          <h1>hello</h1>)}
      </div>
    )
  }
}

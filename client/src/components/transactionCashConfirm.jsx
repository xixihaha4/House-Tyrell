import React from 'react';
import { withRouter } from 'react-router';


class TransactionCashConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: 'dummy'
    };
  }

  render() {
    return (
      <div className="transactionCashConfirm animated fadeIn">
        <div>
          <h1>Total Sale</h1>
          <h1><i className="fas fa-dollar-sign" /> {this.props.location.state.total}</h1>
          <h1>Tendered: </h1>
          <h1><i className="fas fa-dollar-sign" /> {this.props.location.state.tendered}</h1>
          <h1>Change: </h1>
          <h1><i className="fas fa-dollar-sign" /> {(this.props.location.state.tendered - this.props.location.state.total).toFixed(2)}</h1>
          <h1>Thank you for your purchase</h1>
          <div>
            <button type="button" onClick={() => console.log('No Email Yet')}>Email Receipt</button>
            <button type="button" onClick={() => this.props.history.push('/salesScreen')}>Print Receipt</button>
            <button type="button" onClick={() => this.props.history.push('/salesScreen')}>No Receipt</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TransactionCashConfirm);

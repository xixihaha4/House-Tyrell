import React from 'react';
import { withRouter } from 'react-router';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';

class TransactionCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sigConfirm: false,
    };
    this.sigCanvas = {};
    this.clear = this.clear.bind(this);
    this.transactionComplete = this.transactionComplete.bind(this);
  }
  clear() {
    this.sigCanvas.clear();
  }

  transactionComplete() {
    console.log("TESTTTT", this.props.location.state.test);
    // axios.post('/completed/transaction', { transaction })
    //   .then(() => {
    //     this.props.history.push('/salesScreen');
    //   });
  }

  render() {
    return (
      <div className="transactionCredit animated fadeIn">
        {
          this.state.sigConfirm === false
          ?
            <div>
              <h1>Total Sale</h1>
              <h1><i className="fas fa-dollar-sign" /> {this.props.location.state.total}</h1>
              <SignatureCanvas
                penColor="rgb(52, 158, 255)"
                canvasProps={{ width: 500, height: 100, className: 'sigCanvas' }}
                ref={(ref) => { this.sigCanvas = ref; }}
              />
              <button type="button" onClick={this.clear}>Clear Signature</button>
              <button type="button" onClick={() => this.setState({ sigConfirm: true })}>Confirm Signature</button>
            </div>
          :
            <div className="transactionCreditConfirmed animated fadeIn">
              <h1>Thank you for your purchase.</h1>
              <button type="button" onClick={() => console.log('No Email Yet')}>Email Receipt</button>
              <button type="button" onClick={() => this.props.history.push('/salesScreen')}>Print Receipt</button>
              <button type="button" onClick={() => this.transactionComplete()}>No Receipt</button>
            </div>
        }
      </div>
    );
  }
}

export default withRouter(TransactionCredit);

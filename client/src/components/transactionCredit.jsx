import React from 'react';
import { withRouter } from 'react-router';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import Navbar from './navbar.jsx';
import sendReceipt from '../../helpers/sendEmail.js';
import socket from '../socket.js';


class TransactionCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sigConfirm: false,
    };
    this.sigCanvas = {};
    this.clear = this.clear.bind(this);
    this.finalize = this.finalize.bind(this);
  }
  clear() {
    this.sigCanvas.clear();
  }

  finalize(email) {
    if (email === 'email') {
      sendReceipt(this.props.location.state.transactionItems, this.props.location.state.total);
    }

    axios.post('/completed/transaction', {
      transactionItems: this.props.location.state.transactionItems,
      total: this.props.location.state.total,
      discount: this.props.location.state.discount,
    }).then((results) => {
      console.log('jerry results', results);
      socket.emit('madeSale',
        {
          id: results.data.id,
          employee_id: results.data.employee_id,
          total: results.data.sale_amount,
          transactionItems: results.data.item_id,
          date: results.data.sale_date,
          tendered: this.props.location.state.tendered,
          discount: results.data.sale_discount,
          type: results.data.sale_cash,
        },
      );
    })
      .then(() => {
        this.props.history.push('/salesScreen');
      });
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <Navbar />
        </div>
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
                <button type="button" onClick={() => this.finalize('email')}>Email Receipt</button>
                <button type="button" onClick={this.finalize}>Print Receipt</button>
                <button type="button" onClick={this.finalize}>No Receipt</button>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(TransactionCredit);

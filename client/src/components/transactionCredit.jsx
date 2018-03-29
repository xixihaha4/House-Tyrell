import React from 'react';
import { withRouter } from 'react-router';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import moment from 'moment';
import Navbar from './navbar.jsx';
import sendReceipt from '../../helpers/sendEmail.js';
import socket from '../socket.js';


class TransactionCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sigConfirm: false,
      employeeID: '',
    };
    this.sigCanvas = {};
    this.clear = this.clear.bind(this);
    this.finalize = this.finalize.bind(this);
    this.getEmpID = this.getEmpID.bind(this);
  }
  clear() {
    this.sigCanvas.clear();
  }

  getEmpID() {
    axios.get('/getempid')
      .then((result) => {
        this.setState({
          employeeID: result.data,
        });
      });
  }

  finalize(email) {
    if (email === 'email') {
      sendReceipt(this.props.location.state.transactionItems, this.props.location.state.total);
    }

    axios.post('/completed/transaction', {
      transactionItems: this.props.location.state.transactionItems,
      total: this.props.location.state.total,
      discount: this.props.location.state.discount,
    })
    .then(() => {
      this.getEmpID();
    })
    .then(() => {
      const itemList = [];
      const transactionItems = this.props.location.state.transactionItems;
      for (let i = 0; i < transactionItems.length; i += 1) {
        itemList.push(transactionItems[i].id);
      }
      console.log('ITEM LIST', itemList);
      console.log('employee id', this.state.employeeID)
      socket.emit('madeSale', { total: this.props.location.state.total });
      socket.emit('addSale', {
        sale_date: moment().format(),
        item_id: JSON.stringify(itemList),
        employee_id: this.state.employeeID,
        sale_amount: parseFloat(this.props.location.state.total),
        sale_cost: 50,
        sale_discount: this.props.location.state.discount,
        sale_cash: false,
      })
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

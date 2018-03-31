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
      emailReceipt: false,
      emailAddress: '',
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
    if (email) {
      sendReceipt(this.props.location.state.transactionItems, this.props.location.state.total, email);
      this.setState({
        emailAddress: '',
        emailReceipt: false,
        signConfirm: false,
      });
    }
    axios.post('/completed/transaction', {
      transactionItems: this.props.location.state.transactionItems,
      total: this.props.location.state.total,
      discount: this.props.location.state.discount,
    }).then((results) => {
      socket.emit('madeSale',
      {
        id: results.data.id,
        total: results.data.sale_amount,
        item_id: results.data.item_id,
        sale_date: results.data.sale_date,
        tendered: this.props.location.state.tendered,
        sale_discount: results.data.sale_discount,
        type: this.state.type,
      });
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

  emailReceiptClick() {
    this.setState({
      emailReceipt: true,
      sigConfirm: null,
    });
  }

  render() {
    let renderThis = <div></div>;
    if (this.state.sigConfirm === false) {
      renderThis =
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
      </div>;
    } else if (this.state.sigConfirm === true) {
      renderThis =
      <div className="transactionCreditConfirmed animated fadeIn">
        <h1>Thank you for your purchase.</h1>
        <button type="button" onClick={() => this.setState({ emailReceipt: true, sigConfirm: null })}>Email Receipt</button>
        <button type="button" onClick={this.finalize}>Print Receipt</button>
        <button type="button" onClick={this.finalize}>No Receipt</button>
      </div>;
    } else if (this.state.emailReceipt === true && this.state.sigConfirm === null) {
      renderThis =
      <div className="transactionCreditConfirmed animated fadeIn">
        <h1>Please enter your e-mail.</h1>
        <input type="text" placeholder="Enter your e-mail address" onChange={e => this.setState({ emailAddress: e.target.value })}/>
        <button type="button" onClick={() => this.finalize(this.state.emailAddress)}>Send Receipt</button>
      </div>;
    }
    return (
      <div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="transactionCredit animated fadeIn">
          {renderThis}
        </div>
      </div>
    );
  }
}

export default withRouter(TransactionCredit);

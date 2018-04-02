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
      employeeID: '',
      emailReceipt: false,
      emailAddress: '',
    };
    this.sigCanvas = {};
    this.clear = this.clear.bind(this);
    this.finalize = this.finalize.bind(this);
  }
  clear() {
    this.sigCanvas.clear();
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

    axios.get('/fetch/ingredients')
      .then((results) => {
        let saleCost = 0;
        let ingredientCost = {};
        for (let i = 0; i < results.data.length; i += 1) {
          let ingredient = results.data[i];
          if (ingredientCost[ingredient.id] === undefined) {
            ingredientCost[ingredient.id] = {
              unit_cost: parseFloat(ingredient.unit_cost),
            };
          }
        }

        let transactionItems = this.props.location.state.transactionItems;
        for (let i = 0; i < transactionItems.length; i += 1) {
          const items = JSON.parse(transactionItems[i].item_ingredients);
          for (let j = 0; j < items.length; j += 1) {
            saleCost += (ingredientCost[items[j].ingredient_id].unit_cost * items[j].ingredient_amount);
          }
        }

        return saleCost
      })
      .then((saleCost) => {
        axios.post('/completed/transaction', {
          transactionItems: this.props.location.state.transactionItems,
          total: this.props.location.state.total,
          discount: this.props.location.state.discount,
          saleCost,
        }).then((results) => {
          socket.emit('madeSale',
            {
              id: results.data.id,
              employee_id: results.data.employee_id,
              total: results.data.sale_amount,
              item_id: results.data.item_id,
              sale_date: results.data.sale_date,
              sale_discount: results.data.sale_discount,
            },
          );
          this.props.history.push('/salesScreen');
        });
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

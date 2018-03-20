import React from 'react';
import { withRouter } from 'react-router';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import Alert from 'react-s-alert';
import Pinpad from './pinpad.jsx';


class TransactionCash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sigConfirm: false,
      identification: '',
      pinpadOptions: [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        '.', 0, 'clear', 'enter',
      ],
      animation: 'wrapper noselect animated fadeIn',
      failedAttempts: 0,
      pinpadOn: false,
      tendered: 0.00,
    };

    this.clear = this.clear.bind(this);
    this.transactionComplete = this.transactionComplete.bind(this);
    this.handlePin = this.handlePin.bind(this);
    this.verifyTotal = this.verifyTotal.bind(this);
  }
  clear() {
    this.sigCanvas.clear();
  }

  verifyTotal() {

    console.log('verifyTotal being called')
    this.setState(
      { tendered: parseFloat(this.state.identification) }
      , () => this.togglePinpad()
    );
  }

  transactionComplete() {
    console.log("TESTTTT", this.props.location.state.test);
  }

  togglePinpad() {
    this.setState({pinpadOn: !this.state.pinpadOn})
  }

  handlePin(val) {
    Alert.closeAll()
    if (val === 'enter') {
      this.verifyTotal();
    } else if (val === 'clear') {
      this.setState( {identification: ''} )
    } else if (val === 'delete') {
      var temp = this.state.identification
      this.setState( {identification: temp.slice(0, temp.length-1)} )
    } else if (this.state.identification.length < 12){
      var temp = this.state.identification
      this.setState( {identification: temp + val} )
    }
  }

  render() {
    return (
      <div className="transactionCash animated fadeIn">
        <div>
          <h1>Total Sale</h1>
          <h1><i className="fas fa-dollar-sign" /> {this.props.location.state.total}</h1>
        </div>
        <div className="transactionCashConfirmed animated fadeIn">
          <h1>Thank you for your purchase.</h1>
          <button type="button" onClick={() => console.log('No Email Yet')}>Email Receipt</button>
          <button type="button" onClick={() => this.props.history.push('/salesScreen')}>Print Receipt</button>
          <button type="button" onClick={() => this.transactionComplete()}>No Receipt</button>
        </div>
        {/* <div className="pinNumber-wrapper"  onClick={() => this.togglePinpad()}><i className="fas fa-dollar-sign"></i>Tendered<i className="far fa-keyboard"></i>: <span className="pinNumber">{this.state.identification}</span></div><br /> */}
        {this.state.pinpadOn ?
          <Pinpad
            pinpadOptions={this.state.pinpadOptions}
            handlePin={this.handlePin}
            animation={this.state.animation}
          /> :
          <div>
            <div className="pinNumber-wrapper"  onClick={() => this.togglePinpad()}><i className="fas fa-dollar-sign"></i>Tendered<i className="far fa-keyboard"></i>: <span className="pinNumber">{this.state.identification}</span></div><br />
            <h1><i className="fas fa-dollar-sign" /> {this.state.tendered}</h1>
            {/* <h1>Change: </h1> */}
            <h1><i className="fas fa-dollar-sign" /> {parseFloat(this.state.tendered) - this.props.location.state.total}</h1>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(TransactionCash);

import React from 'react';
import { withRouter } from 'react-router';

class SaleControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: 'dummy',
    }
  };

  render() {
    const { total, tax, transactionItems, discount, openDiscountModal } = this.props;
    return (
      <div className="saleGrid">
        <button type="button" onClick={() => this.props.history.push('/transaction/cash', { total: ((total + tax) - ((total + tax) * (discount / 100))).toFixed(2), transactionItems, discount })}>
          Cash
        </button>
        <button type="button" onClick={() => this.props.history.push('/transaction/credit', { total: ((total + tax) - ((total + tax) * (discount / 100))).toFixed(2), transactionItems, discount })}>
          Credit
        </button>
        <button type="button" onClick={() => openDiscountModal()}>Discount</button>
        <button type="button">Options</button>
      </div>
    );
  }
}

export default withRouter(SaleControl);

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
    return (
      <div className="saleGrid">
        <button type="button" onClick={() => this.props.history.push('/transaction/cash', { total: (this.props.total + this.props.tax).toFixed(2), transactionItems: this.props.transactionItems })}>
          <i className="far fa-money-bill-alt" />
        </button>
        <button type="button" onClick={() => this.props.history.push('/transaction/credit', { total: (this.props.total + this.props.tax).toFixed(2), transactionItems: this.props.transactionItems })}>
          <i className="fab fa-cc-mastercard" /> <i className="fab fa-cc-visa" /> <i className="fab fa-cc-amex" /> <i className="fab fa-cc-discover" />
        </button>
        <button type="button">Discount</button>
        <button type="button">Options</button>
      </div>
    );
  }
}

export default withRouter(SaleControl);

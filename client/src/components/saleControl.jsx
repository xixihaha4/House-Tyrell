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
      <div className="saleGrid" id="">
        <button type="button">Cash</button>
        <button
          type="button"
          onClick={() => this.props.history.push('/transaction/credit', { total: (this.props.total + this.props.tax).toFixed(2), test: 'hi' })}
        >
        Credit
        </button>
        <button type="button">Discount</button>
        <button type="button">Options</button>
      </div>
    );
  }
}

export default withRouter(SaleControl);

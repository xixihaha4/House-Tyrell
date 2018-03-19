import React from 'react';

export default class SaleControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: 'dummy',
    }
  };

  render() {
    return (
      <div className="saleGrid">
        <button type="button">Cash</button>
        <button type="button">Credit</button>
        <button type="button">Discount</button>
        <button type="button">Options</button>
      </div>
    )
  }

}

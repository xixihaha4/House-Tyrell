import React from 'react';
import { withRouter } from 'react-router';

class SaleControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: 'dummy',
    }
    this.testingCron = this.testingCron.bind(this);
  };

  testingCron() {
  axios.post('/cronTest')
  .then((res) => {
    let currentTime = JSON.stringify(moment().format());
    currentTime = currentTime.substring(1, 11)
    let currentTimeParse = Date.parse(currentTime)
    let ingredients = res.data[1]
    let orders = res.data[0]
    let expired = [];

    for (let i = 0; i < ingredients.length; i += 1) {
      if (currentTimeParse > Date.parse(ingredients[i].ingredient_expire)) {
        expired.push(ingredients[i])
      }
    }

    console.log(currentTime, '\n', 'ingredients\n', ingredients, '\norders ',orders, '\nexpired ', expired);
  })
}

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
        <button type="button" onClick={this.testingCron}>Options</button>
      </div>
    );
  }
}

export default withRouter(SaleControl);

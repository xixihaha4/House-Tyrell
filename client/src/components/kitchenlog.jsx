import React from 'react';
import OrderKitchenView from './orderKitchenView.jsx'
import axios from 'axios';
export default class KitchenLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersPlaced: [],
    };
    this.orderUp = this.orderUp.bind(this);
    this.getOrders = this.getOrders.bind(this);
  }

  componentDidMount() {
    setInterval(this.getOrders, 5000);
  }

  getOrders() {
    axios.get('/fetch/currentOrders')
      .then((sales) => {
        this.setState({
          ordersPlaced: sales.data,
        }, () => console.log(this.state.ordersPlaced));
      });
  }

  orderUp(orderNum) {
    axios.post('/orderUp', {
      id: orderNum,
    })
      .then(() => {
        const temp = this.state.ordersPlaced;
        temp.splice(temp.indexOf(temp.find(order => order.number === orderNum)), 1)
        this.setState({ ordersPlaced: temp });
      });
  }
  render() {
    return (
      <div className="kitchenGridContainer noselect">
        {this.state.ordersPlaced.map(order =>
          (<div onClick={()=>this.orderUp(order.number)}>
            <OrderKitchenView
              number={order.id}
              foods={JSON.parse(order.item_id)}
            />
          </div>))}
      </div>
    )
  }
}

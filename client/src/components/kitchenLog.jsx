import React from 'react';
import axios from 'axios';
import OrderKitchenView from './orderKitchenView.jsx';
import socket from '../socket.js';

export default class KitchenLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersPlaced: [],
      menuItems: [],
    };
    this.orderUp = this.orderUp.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this)
  }

  componentDidMount() {
    this.initSocket();
    this.getMenuItems();
  }

  getMenuItems() {
    axios.get('/fetch/items')
      .then((results) => {
        this.setState({
          menuItems: results.data,
        });
        this.getOrders();
      });
  }

  getOrders() {
    axios.get('/fetch/currentOrders')
      .then((sales) => {
        this.setState({
          ordersPlaced: sales.data,
        });
      });
  }

  orderUp(orderNum) {
    // orderNum got clicked, set to ready in db
    axios.post('/orderUp', {
      id: orderNum,
    })
      .then((response) => {
        this.getOrders()
      });
  }

  initSocket() {
   socket.on('madeSale', (sale) => {
     let ordersPlaced = this.state.ordersPlaced;
     ordersPlaced.push({ id: sale.id, sale_date: sale.date, item_id: sale.transactionItems });
     this.setState({
       ordersPlaced,
     });
   });
 }

  render() {
    return (
      <div className="kitchenGridContainer noselect">
        {this.state.ordersPlaced.map(order =>
          (<div>
            <OrderKitchenView
              orderUp={this.orderUp}
              number={order.id}
              time={
                order.sale_date
              }
              foods={
                JSON.parse(order.item_id)
                  .map(idOrdered =>
                    this.state.menuItems
                      .find(item => item.id === idOrdered).item_name
                  )
              }
            />
          </div>))}
      </div>
    )
  }
}

import React from 'react';
import OrderKitchenView from './orderKitchenView.jsx'
import axios from 'axios';

export default class KitchenLog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ordersPlaced: []
    }
    this.orderUp = this.orderUp.bind(this)
    this.getOrders = this.getOrders.bind(this)
  }

  orderUp(orderNum) {
    axios.post('/orderup', {
      id: orderNum
    }).then(() => {
      var temp = this.state.ordersPlaced
      temp.splice(
        temp.indexOf(temp.find(order => order.number === orderNum)), 1)
        this.setState({ordersPlaced: temp})
    })
  }

  getOrders() {
    axios.get('/fetch/sales')
      .then((sales) => {
        console.log('got the sale: ', sales.data)
      })
  }

  componentDidMount() {
    /* dummy data */
    var temp = this.state.ordersPlaced
    temp.push(
      {
        number: 213,
        foods: ['hamburger', 'no pickles', 'fries'],
      }
    )/*
    temp.push(
      {
        number: 214,
        foods: ['cheeseburger', 'fries'],
      },
      {
        number: 214,
        foods: ['cheeseburger', 'fries', 'cheeseburger', 'fries'],
      },
      {
        number: 214,
        foods: ['cheeseburger', 'fries', 'no shit'],
      },
      {
        number: 213,
        foods: ['soda', 'fries', 'kimchi'],
      },
      {
        number: 214,
        foods: ['hamburger', 'hot dog', 'ramen', 'ice cream', 'bmw', 'fries'],
      },
      {
        number: 214,
        foods: ['cheeseburger', 'fries', 'cheeseburger', 'fries'],
      },
      {
        number: 214,
        foods: ['cheeseburger', 'fries', 'no shit'],
      },
      {
        number: 213,
        foods: ['soda', 'fries', 'kimchi'],
      },
      {
        number: 214,
        foods: ['hamburger', 'hot dog', 'ramen', 'ice cream', 'bmw', 'fries'],
      },
      {
        number: 214,
        foods: ['cheeseburger', 'fries', 'cheeseburger', 'fries'],
      },
      {
        number: 214,
        foods: ['cheeseburger', 'fries', 'no shit'],
      },
      {
        number: 213,
        foods: ['soda', 'fries', 'kimchi'],
      },
      {
        number: 214,
        foods: ['hamburger', 'hot dog', 'ramen', 'ice cream', 'bmw', 'fries'],
      },
      {
        number: 214,
        foods: ['cheeseburger', 'fries', 'cheeseburger', 'fries'],
      },
      {
        number: 214,
        foods: ['cheeseburger', 'fries', 'no shit'],
      },
      {
        number: 213,
        foods: ['soda', 'fries', 'kimchi'],
      },
      {
        number: 214,
        foods: ['hamburger', 'hot dog', 'ramen', 'ice cream', 'bmw', 'fries'],
      }
    )
    end of dummy data */
    this.setState({ordersPlaced: temp})

    setInterval(this.getOrders(), 5000)
  }

  render() {
    return (
      <div className="kitchenGridContainer noselect">
        {this.state.ordersPlaced.map(order =>
          <div onClick={()=>this.orderUp(order.number)}>
            <OrderKitchenView
              number={order.number}
              foods={order.foods}
            />
          </div>
        )}
        {/* {this.state.orderUp.map(order =>
          <div>
            <OrderKitchenView
              number={order.number}
              foods={order.foods}
            />
          </div>
        )} */}
      </div>
    )
  }
}

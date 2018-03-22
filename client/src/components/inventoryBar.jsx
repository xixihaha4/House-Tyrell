import React from 'react';
import axios from 'axios';

const c3 = require('c3/c3.js');

const columns = [
  ['Inventory_Current', 30, 20, 70, 6, 105, 23],
  ['Inventory_Initial', 50, 20, 100, 40, 150, 25],
];

class InventoryUsageBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: '',
      left: '',
    };
    this.updateChart = this.updateChart.bind(this);
    this.getInventory1 = this.getInventory1.bind(this);
    this.getInventory2 = this.getInventory2.bind(this);
    this.getInventoryData = this.getInventoryData.bind(this);
    this.calculateInventory1 = this.calculateInventory1.bind(this);
    this.calculateInventory2 = this.calculateInventory2.bind(this);
    this.hasExpired = this.hasExpired.bind(this);
  }
  componentWillMount() {
    this.getInventoryData();
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  getInventory1() {
    return axios.get('/fetch/currentInventory');
  }
  getInventory2() {
    return axios.get('/fetch/inventory');
  }
  getInventoryData() {
    axios.all([this.getInventory1(), this.getInventory2()])
      .then(axios.spread((data1, data2) => {
        const result1 = this.calculateInventory1(data1.data);
        const result2 = this.calculateInventory2(data2.data);
        this.setState({
          initial: result1[0] + result2[0],
          left: result1[1] + result2[1],
        }, () => { console.log(this.state); });
    }));
  }
  calculateInventory1(data) {
    // need to filter out those expired once expiration is implemented
    // use the hasExpired function below
    var initial = 0;
    var left = 0;
    data.forEach((item) => {
      initial += Number(item.order_initial);
      left += Number(item.order_left);
    })
    return [initial, left];
  }
  calculateInventory2(data) {
    var initial = 0;
    var left = 0;
    data.forEach((item) => {
      initial += Number(item.ingredient_initial);
      left += Number(item.ingredient_left);
    })
    return [initial, left];
  }
  hasExpired(date) {
    const mm = Number(date.slice(0, 2));
    const dd = Number(date.slice(3, 5));
    const yyyy = Number(date.slice(6));
    const today = new Date(Date.now()).toLocaleString();
    const month = Number(today.slice(0, 1));
    const day = Number(today.slice(2, 4));
    const year = Number(today.slice(-4));

    if (year > yyyy) {
      return true;
    }
    if (year === yyyy && month > mm) {
      return true;
    }
    if (year === yyyy && month === mm && date > dd) {
      return true;
    } else {
      return false;
    }

  }

  updateChart() {
    const chart = c3.generate({
      bindto: '#chart',
      x: 'x',
      data: {
        columns: [
          ['Inventory_Current', this.state.left], ['Inventory_Initial', this.state.initial],
        ],
        type: 'bar',
        colors: {
          Inventory_Current: '#f05b47',
          Inventory_Initial: '#349eff',
        },
      },
      axis: {
        x: {
          type: 'category',
          categories: ['Overall Inventory'],
          tick: {
            multiline: false,
          },
          height: 130,
        },
        y: {
          label: {
            text: 'Quantity (lbs.)',
            position: 'outer-middle',
          },
        },
      },
    });
  }

  render() {
    return <div id="chart"></div>;
  }
}

export default InventoryUsageBar;

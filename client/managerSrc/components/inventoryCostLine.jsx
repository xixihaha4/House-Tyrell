import React from 'react';
import axios from 'axios';

const c3 = require('c3/c3.js');

class InventoryCostLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: [],
      cost: [],
    };
    this.updateChart = this.updateChart.bind(this);
    this.getInventoryData = this.getInventoryData.bind(this);
    this.getInventory1 = this.getInventory1.bind(this);
    this.getInventory2 = this.getInventory2.bind(this);
    this.calculateCostByRecentMonth = this.calculateCostByRecentMonth.bind(this);
  }
  componentWillMount() {
    this.getInventoryData();
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  getInventory1() {
    return axios.get('/fetch/ordercost')
  }
  getInventory2() {
    return axios.get('/fetch/inventorycost')
  }
  getInventoryData() {
    axios.all([this.getInventory1(), this.getInventory2()])
    .then(axios.spread((data1, data2) => {
      var cost = this.calculateCostByRecentMonth(data1, data2).slice(0, 6);
      var dateArray = cost.map(item => item[0]);
      var costArray = cost.map(item => item[1]);
      costArray.push('Total_Inventory_Cost');

      this.setState({
        date: dateArray.reverse(),
        cost: costArray.reverse(),
      }, () => {
        console.log([this.state.date, this.state.cost]);
      });
  }));
  }
  calculateCostByRecentMonth(data1, data2) {
    var cost = {};
    data1.data.forEach(order => {
      var date = order.order_date.slice(0, 7);
      if (cost[date] === undefined) {
        cost[date] = Number(order.order_total);
      } else {
        cost[date] += Number(order.order_total);
      }
    })
    data2.data.forEach(order => {
        var date = order.order_date.slice(0, 7);
        if (cost[date] === undefined) {
          cost[date] = Number(order.ingredient_total);
        } else {
          cost[date] += Number(order.ingredient_total);
        }
      })
    var costArray = Object.keys(cost).map(function(key) {
      return [key, cost[key]];
    });
    var convertDate = (dateString) => {
      return new Date(dateString.slice(0, 4), dateString.slice(-2));
    }
    return costArray.sort((a, b) => {
      if (convertDate(a[0]) < convertDate(b[0])) {
        return 1;
      } else if (convertDate(a[0]) > convertDate(b[0])) {
        return -1;
      } else {
        return 0;
      }
    })
  }
  updateChart() {
    const chart = c3.generate({
      bindto: '#chart',
      x: 'x',
      data: {
        columns: [this.state.cost],
        type: 'line',
        colors: {
          Total_Inventory_Cost: '#349eff',
        },
      },
      axis: {
        x: {
          type: 'category',
          categories: this.state.date,
          tick: {
            rotate: 75,
            multiline: false,
          },
          height: 130,
        },
        y: {
          label: {
            text: 'Total Inventory Cost (dollars)',
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

export default InventoryCostLine;

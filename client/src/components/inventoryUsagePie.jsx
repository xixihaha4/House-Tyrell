import React from 'react';
import axios from 'axios';

const c3 = require('c3/c3.js');

class InventoryUsagePie extends React.Component {
  constructor(props) {
    super(props);
    
    this.updateChart = this.updateChart.bind(this);
    this.getInventoryData = this.getInventoryData.bind(this);
  }
  componentWillMount() {
    this.getInventoryData();
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  getInventoryData() {
    this.props.getInventoryData();
  }

  updateChart() {
    const chart = c3.generate({
      bindto: '#chart',
      x: 'x',
      data: {
        columns: [
          ['Inventory_Left', this.props.left], ['Inventory_Used', this.props.initial - this.props.left],
        ],
        type: 'pie',
        colors: {
          Inventory_Left: '#f05b47',
          Inventory_Used: '#349eff',
        },
        size: {
          height: 120,
        },
      },
      axis: {
        x: {
          type: 'category',
          categories: ['Overall Inventory'],
          tick: {
            multiline: false,
          },
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

export default InventoryUsagePie;

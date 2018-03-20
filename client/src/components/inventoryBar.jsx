import React from 'react';

const c3 = require('c3/c3.js');

const columns = [
  ['Ingredient_Left', 30, 20, 70, 6, 105, 23],
  ['Ingredients_Initial', 50, 20, 100, 40, 150, 25],
];

class InventoryBar extends React.Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
  }
  componentDidMount() {
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    const chart = c3.generate({
      bindto: '#chart',
      x: 'x',
      data: {
        columns: columns,
        type: 'bar',
        colors: {
          Ingredient_Left: '#f05b47',
          Ingredient_Initial: '#349eff',
        },
      },
      axis: {
        x: {
          type: 'category',
          categories: ['Bread', 'Lettuce', 'Ham', 'Onions', 'Potatoes', 'Tomatoes'],
          tick: {
            rotate: 75,
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

export default InventoryBar;
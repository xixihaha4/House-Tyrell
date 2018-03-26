import React from 'react';
import c3 from 'c3/c3.js';

const columns = [
  ['Sales', 3760, 2021, 7093, 6221, 4052, 2308],
];

class ManagerHomeBar extends React.Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.state = {
      items_Y: [],
      sales_X: [],
    }
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
      title: {
        text: 'Total Sales Per Item'
      },
      x: 'x',
      size: {
        height: 600
      },
      data: {
        columns: columns,
        type: 'bar',
        colors: {
          Sales: '#349eff',
        },
      },
      axis: {
        x: {
          type: 'category',
          categories: ['Brad', 'Christine', 'Harriette', 'Peter', 'Phil', 'Tam'],
          tick: {
            rotate: 75,
            multiline: false,
          },
          height: 130,
        },
        y: {
          label: {
            text: 'Total Sales (dollars)',
            position: 'outer-middle',
          },
        },
        rotated: true,
      },
    });
  }

  render() {
    return <div id="chart"></div>;
  }
}

export default ManagerHomeBar;

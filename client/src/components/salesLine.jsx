import React from 'react';

const c3 = require('c3/c3.js');

const sample = [
  ['x', '2017-04-01', '2017-05-01', '2017-06-01', '2017-07-01', '2017-08-01', '2017-09-01', '2017-10-01', '2017-11-01', '2017-12-01', '2018-01-01', '2018-02-01', '2018-03-01'],
  ['Revenue', 157, 165, 125, 112, 125, 112, 157, 165, 125, 112, 157, 165],
  ['Profit', 65, 93, 103, 79, 79, 65, 93, 103, 79, 65, 93, 103],
  ['Cost', 62, 46, 47, 64, 46, 47, 64, 62, 46, 47, 64, 62],
];

class SalesLine extends React.Component {
  componentDidMount() {
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    const chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: sample,
        // type: 'line',
        colors: {
          Revenue: '#f05b47',
          Profit: '#349eff',
          Cost: '#45d645',
        },
      },
      axis: {
        x: {
          type: 'timeseries',
        //   categories: ['2017-04-01', '2017-07-01', '2017-10-01', '2018-01-01'],
          tick: {
            format: '%Y-%m',
            rotate: 90,
            multiline: false,
          },
          height: 130,
        },
        y: {
          label: {
            text: '$ (Thousands)',
            position: 'outer-middle',
          }
        },
      }
    });
}

  render() {
    return <div id="chart"></div>;
  }
}

export default SalesLine;

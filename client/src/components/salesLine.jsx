import React from 'react';
var c3 = require('c3/c3.js');

const sample = [
  ['Revenue', 125, 112, 157, 165],
  ['Profit', 79, 65, 93, 103],
  ['Cost', 46, 47, 64, 62],
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
              columns: sample,
              type: 'line',
              colors: {
                Revenue: '#f05b47',
                Profit: '#349eff',
                Cost: '#45d645',
              },
            },
            axis: {
                x: {
                    type: 'category',
                    tick: {
                        categories: ['2017-04-01', '2017-07-01', '2017-10-01', '2018-01-01'],
                    },
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

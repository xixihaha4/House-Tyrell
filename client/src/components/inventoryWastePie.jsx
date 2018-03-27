import React from 'react';

const c3 = require('c3/c3.js');

class InventoryWastePie extends React.Component {
  constructor(props) {
    super(props);

    this.updateChart = this.updateChart.bind(this);
    this.getWaste = this.getWaste.bind(this);
  }
    componentWillMount() {
      this.getWaste();
      this.updateChart();
    }
    componentDidUpdate() {
      this.updateChart();
    }
    getWaste() {
      this.props.getWaste();
    }

    updateChart() {
      const chart = c3.generate({
        bindto: '#chart',
        x: 'x',
        data: {
          columns: [
            ['Order_Wasted', this.props.wleft], ['Order_Used', this.props.winitial - this.props.wleft],
          ],
          type: 'pie',
          colors: {
            Order_Wasted: '#f05b47',
            Order_Used: '#349eff',
          },
        },
        size: {
          height: 380,
        },
        axis: {
          x: {
            type: 'category',
            categories: ['Overall Order History'],
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

export default InventoryWastePie;

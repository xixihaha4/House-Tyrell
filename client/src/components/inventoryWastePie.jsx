import React from 'react';
import axios from 'axios';

const c3 = require('c3/c3.js');

class InventoryWastePie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: '',
      left: '',
    };
    this.updateChart = this.updateChart.bind(this);
    this.getWaste = this.getWaste.bind(this);
    this.calculateWaste = this.calculateWaste.bind(this);
  }
    componentWillMount() {
      this.getWaste();
      this.updateChart();
    }
    componentDidUpdate() {
      this.updateChart();
    }
    getWaste() {
      axios.get('/fetch/waste')
        .then(data => {
            console.log('waste data', data.data);
            var result = this.calculateWaste(data.data);
            this.setState({
                initial: result[0],
                left: result[1]
            })
        })
    }
    calculateWaste(data) {
      var initial = 0;
      var left = 0;
      data.forEach((item) => {
        if (item.order_used) {   
          initial += Number(item.order_initial);
          left += Number(item.order_left);
        }
      })
      return [initial, left];
    }
  
    updateChart() {
      const chart = c3.generate({
        bindto: '#chart',
        x: 'x',
        data: {
          columns: [
            ['Order_Wasted', this.state.left], ['Order_Used', this.state.initial - this.state.left],
          ],
          type: 'pie',
          colors: {
            Order_Wasted: '#f05b47',
            Order_Used: '#349eff',
          },
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

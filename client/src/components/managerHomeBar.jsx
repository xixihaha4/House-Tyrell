import React from 'react';
import c3 from 'c3/c3.js';
import axios from 'axios';
import moment from 'moment';

class ManagerHomeBar extends React.Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.state = {
      items_Y: [],
      sales_X: [],
    }
    this.setUpAllData = this.setUpAllData.bind(this);
  }
  componentDidMount() {
    this.setUpAllData();
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }

  setUpAllData() {
    axios.all([
      axios.get('/fetch/items'),
      axios.get('/fetch/allsales')
    ])
      .then(axios.spread((allItems, allSales) => {

        let itemLib = {};
        allItems.data.forEach((item) => {
          itemLib[item.id] = {
            name: item.item_name,
            price: JSON.parse(item.item_price),
            sold: 0,
          };
        });

        allSales.data
          .filter(sale => moment(sale.sale_date).format('MM DD YYYY') === moment().format('MM DD YYYY'))
          .forEach((sale) => {
            JSON.parse(sale.item_id).forEach((menuItemId) => {
              itemLib[menuItemId].sold++;
            });
          });

        var categories = [];
        var data = [['Sales']];
        for(var item in itemLib){
          categories.push(itemLib[item].name);
          data[0].push(itemLib[item].price * itemLib[item].sold);
        }


        this.setState({
          items_Y: categories,
          sales_X: data,
        });

      }));
  }

  updateChart() {
    const chart = c3.generate({
      bindto: '#chart',
      title: {
        text: 'Total Sales Per Item'
      },
      x: 'x',
      size: {
        height: 745,
      },
      data: {
        columns: this.state.sales_X,
        type: 'bar',
        colors: {
          Sales: '#349eff',
        },
      },
      axis: {
        x: {
          type: 'category',
          categories: this.state.items_Y,
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

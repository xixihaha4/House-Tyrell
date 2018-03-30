import React from 'react';
import c3 from 'c3/c3.js';
import axios from 'axios';
import moment from 'moment';
import socket from '../socket.js';

class ManagerHomeBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items_Y: [],
      sales_X: [],
      allItems: [],
      allSales: [],
    }
    this.setUpAllData = this.setUpAllData.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount() {
    this.initSocket();
    this.setUpAllData();
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  setUpAllData() {
    axios.all([
      axios.get('/fetch/items'),
      axios.get('/fetch/allsales'),
    ])
      .then(axios.spread((allItems, allSales) => {
        const itemLib = {};
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
              itemLib[menuItemId].sold += 1;
            });
          });

        const categories = [];
        const data = [['Sales']];
        for (const item in itemLib) {
          categories.push(itemLib[item].name);
          data[0].push(itemLib[item].price * itemLib[item].sold);
        }
        this.setState({
          allItems,
          allSales,
          items_Y: categories,
          sales_X: data,
        });
      }));
  }

  initSocket() {
    socket.on('madeSale', (newSale) => {
      const { allItems } = this.state;
      const { allSales } = this.state;
      allSales.data.push(newSale);
      console.log(allSales);
      console.log(allItems);
      const itemLib = {};
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
            itemLib[menuItemId].sold += 1;
          });
        });

      const categories = [];
      const data = [['Sales']];
      for (const item in itemLib) {
        categories.push(itemLib[item].name);
        data[0].push(itemLib[item].price * itemLib[item].sold);
      }
      this.setState({
        allItems,
        allSales,
        items_Y: categories,
        sales_X: data,
      });
    })
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

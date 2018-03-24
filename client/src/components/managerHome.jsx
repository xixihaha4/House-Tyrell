import React from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';
import moment from 'moment';
import Navigation from './managerNav.jsx';
import Navbar from './navbar.jsx';

class ManagerHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allEmployees: [],
      allSales: [],
      totalSales: 0,
    };
    this.getAllClockedIn = this.getAllClockedIn.bind(this);
    this.getAllSalesToday = this.getAllSalesToday.bind(this);
  }

  componentDidMount() {
    this.getAllClockedIn();
    this.getAllSalesToday();
  }

  getAllClockedIn() {
    axios.get('/fetch/allEmployees/clockedIn')
      .then((results) => {
        this.setState({
          allEmployees: results.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  getAllSalesToday() {
    axios.get('/fetch/allSales/today')
      .then((results) => {
        let todaySales = [];
        results.data.forEach((result) => {
          let saleDate = moment(result.saleDate).format('MM DD YYYY');
          let todayDate = moment().format('MM DD YYYY');
          if (saleDate === todayDate) {
            todaySales.push(result);
          }
        });

        let totalAmount = 0;
        todaySales.forEach((sale) => {
          totalAmount += parseFloat(sale.sale_amount);
        })
        this.setState({
          allSales: todaySales,
          totalSales: totalAmount.toFixed(2)
        });
      })
      .catch((error) => {
        throw error;
      });
  }


  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="managerScreenGrid-home">
          <div className="manager-navigation"><Navigation /></div>
          <div id="card" className="managerCard-1">
            <h1>{this.state.allEmployees.length}</h1>
            <h2>Clocked In</h2>
          </div>
          <div id="card" className="managerCard-2">
            <h1>{this.state.allSales.length}</h1>
            <h2>Total Transactions</h2>
          </div>
          <div id="card" className="managerCard-3">
            <h1><i className="fas fa-dollar-sign" /> {this.state.totalSales}</h1>
            <h2>Total Sales</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerHome;

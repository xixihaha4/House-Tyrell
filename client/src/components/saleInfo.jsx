import React from 'react';
import axios from 'axios';
import Navigation from './managerNav.jsx';
import SalesLine from './salesLine.jsx';
import SaleTable from './saleTable.jsx';
import Navbar from './navbar.jsx';

class SaleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salesData: [],
      itemsData: [],

    };
    this.getItemsData = this.getItemsData.bind(this);
    this.getSalesData = this.getSalesData.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getSalesData() {
    return axios.get('/fetch/allsales')
  }

  getItemsData() {
    return axios.get('/fetch/allitems')
  }

  getData() {
    axios.all([this.getSalesData(), this.getItemsData()])
      .then(axios.spread((salesdata, itemsdata) => {
        console.log('salesdata', salesdata.data);
        console.log('itemsdata', itemsdata.data);
        this.setState({
          salesData: salesdata.data,
          itemsData: itemsdata.data,
        });
      }));
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="managerScreenGrid">
          <div className="manager-navigation"><Navigation /></div>
          <div className="graphGrid">
            <div className="graph">
              <SalesLine />
            </div>
            <button>By Employee</button>
          </div>
          <div className="graphTable">
            <SaleTable salesData={this.state.salesData} itemsData={this.state.itemsData} />
          </div>
        </div>
      </div>

    );
  }
}

export default SaleInfo;

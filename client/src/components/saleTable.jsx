import React from 'react';
import ReactTable from 'react-table';

class SaleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsData: [],
      salesData: [],
      tableData: [],
    };
    this.generateTableData = this.generateTableData.bind(this);
    this.getItemNames = this.getItemNames.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    // console.log('nextProps.salesData', nextProps.salesData);
    // console.log('nextProps.itemsData', nextProps.itemsData);
    this.setState({
      itemsData: nextProps.itemsData,
      salesData: nextProps.salesData,
    }, () => {
      this.generateTableData(nextProps.salesData, nextProps.itemsData);
    });
  }

  generateTableData(salesData, itemsData) {
    var data = salesData.map((sale) => {
      var obj = {};
      obj.date = sale.sale_date;
      obj.items = this.getItemNames(sale.item_id);
      obj.amount = sale.sale_amount;
      obj.cost = sale.sale_cost;
      obj.discount = sale.sale_discount + '%';
      obj.type = sale.sale_cash ? 'Cash' : 'Credit';
      obj.employee = sale.employee_id;
      return obj;
    })
    this.setState({
      tableData: data
    })
  }

  getItemNames(items) {
    var itemsArray = JSON.parse(items);
    var itemsData = this.state.itemsData;
    var obj = {};
    var result = '';
    var itemnamesArray = itemsArray.map((item) => {
      for (var i = 0; i < itemsData.length; i++) {
        if (item === itemsData[i].id) {
          item = itemsData[i].item_name;
        }
      }
      return item;
    })
    itemnamesArray.forEach((item) => {
      if (obj[item] === undefined) {
        obj[item] = 1;
      } else {
        obj[item]++;
      }
    });
    for (var key in obj) {
      result += obj[key] + ' ' + key + ' '
    }
    return result;
  }

  render() {
    var columns = [{
        Header: 'Sale Date',
        accessor: 'date',
      },
      {
        Header: 'Items',
        accessor: 'items',
      },{
        Header: 'Sale Amount ($)',
        accessor: 'amount',
      },{
        Header: 'Sale Cost ($)',
        accessor: 'cost',
      },
      {
        Header: '% Sale Discount',
        accessor: 'discount',
      },
      {
        Header: 'Payment Type',
        accessor: 'type',
      },  
      {
        Header: 'Employee',
        accessor: 'employee',
      },    
      ]
    return (
      <div>
        <ReactTable
        data={this.state.tableData}
        columns={columns}
        defaultPageSize={10}
        style={{color: 'black'}}
        />
      </div>
    )
  }
}

export default SaleTable;

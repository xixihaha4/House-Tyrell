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
    this.generateTableData(nextProps.salesData, nextProps.itemsData);
    console.log('nextProps.salesData', nextProps.salesData[0].item_id);
    console.log('nextProps.itemsData', nextProps.itemsData);
    this.setState({
      itemsData: nextProps.itemsData,
      salesData: nextProps.salesData,
    }, () => {
      this.getItemNames(nextProps.salesData[0].item_id);
    });
  }

  generateTableData(salesData, itemsData) {
    
  }

  getItemNames(items) {
    var itemsArray = JSON.parse(items);
    var itemsData = this.state.itemsData;
    var itemnamesArray = itemsArray.map((item) => {
      for (var i = 0; i < itemsData.length; i++) {
        if (item === itemsData[i].id) {
          item = itemsData[i].item_name;
        }
      }
      return item;
    })
    console.log(itemnamesArray);
    
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

import React from 'react';
import ReactTable from 'react-table';

class SaleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
    this.generateTableData = this.generateTableData.bind(this);
    this.getItemList = this.getItemList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.generateTableData(nextProps.salesData, nextProps.itemsData);
  }

  generateTableData(salesData, itemsData) {
    
  }

  getItemList(items) {
    var itemsArray = JSON.parse(items);
    
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

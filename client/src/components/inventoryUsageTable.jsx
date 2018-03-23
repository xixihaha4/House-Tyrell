import React from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
// import "react-table/react-table.css";

// const ReactTable = window.ReactTable.default;
const data = [
  {
    name: 'Eric',
    age: 22,
    friend: {
      name: 'Jiening',
      age: 24,
    },
  }, {
    name: 'Manos',
    age: 26,
    friend: {
      name: 'Xixi',
      age: 43,
    },
  }];

class InventoryUsageTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
      var columns = [{
        Header: 'Name',
        accessor: 'name', // String-based value accessors!
      }, {
        Header: 'Age',
        accessor: 'age',
         // Custom cell components!
      }, {
        Header: 'Friend',
        columns: [
          {
            Header: 'Friend Name',
            accessor: 'friendName',
          },
          {
            Header: 'Friend Age',
            accessor: 'friendAge',
          }
        ]} 
      ]
    return (
      <div>
        <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={5}
        />
      </div>
    )
  }
}

export default InventoryUsageTable;

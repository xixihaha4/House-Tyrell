import React from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
// import "react-table/react-table.css";

// const ReactTable = window.ReactTable.default;
// const data = [
//   {
//     name: 'Eric',
//     age: 22,
//     friend: {
//       friendName: 'Jiening',
//       friendAge: 24,
//     },
//   }, {
//     name: 'Manos',
//     age: 26,
//     friend: {
//       friendName: 'Xixi',
//       friendAge: 43,
//     },
//   }];

class InventoryCostTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
      var columns = [{
        Header: 'Cost',
        accessor: 'name', // String-based value accessors!
      }, {
        Header: 'Cost',
        accessor: 'age',
         // Custom cell components!
      }, {
        Header: 'Cost',
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
        // data={data}
        columns={columns}
        defaultPageSize={5}
        style={{color: 'black'}}
        />
      </div>
    )
  }
}

export default InventoryCostTable;

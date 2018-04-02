import React from 'react';
import Navigation from './managerNav.jsx';
import EmployeeBar from './employeeBar.jsx';
import Navbar from './navbar.jsx';
import Select from 'react-select';
import axios from 'axios';
import { withRouter } from 'react-router';
import ReactTable from 'react-table';
import ConfirmationModal from './confirmationModal.jsx';

const columns =
[
  {
    Header: 'Date and Time',
    columns: [
      {
        Header: 'Clock In',
        accessor: 'clockIn',
      },
      {
        Header: 'Clock Out',
        accessor: 'clockOut',
      },
    ],
  },
  {
    Header: 'Total Worked',
    columns: [
      {
        Header: 'Minutes',
        accessor: 'minutes',
      },
    ],
  },
];

class EmployeeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeSelectOptions: [],
      employeeName: '',
      employeeImage: 'http://www.sherwoodchamber.net/media/com_jbusinessdirectory/pictures/companies/0/profileicon-1487694034.png',
      employeeId: '',
      newEmployeeId: '',
      newEmployeeName: '',
      newEmployeeImage: '',
      managerLevel: false,
      timeSheet: [],
      allSales: null,
      employeeSalesRate: [],
      employeeSales: [],
    };
    this.getEmployeeList = this.getEmployeeList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generateEmployeeId = this.generateEmployeeId.bind(this);
    this.submitEmployee = this.submitEmployee.bind(this);
    this.generateTimesheet = this.generateTimesheet.bind(this);
    this.getAllSales = this.getAllSales.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.closeDelete = this.closeDelete.bind(this);
    this.openConfirmation = this.openConfirmation.bind(this);
    this.deletedEmployee = this.deletedEmployee.bind(this);
  }

  componentDidMount() {
    this.getAllSales();
    this.getEmployeeList();
  }

  getAllSales() {
    axios.get('/fetch/allsales')
      .then((sales) => {
        this.setState({
          allSales: sales.data.reduce((lib, sale) => {
            if(!lib.hasOwnProperty(sale.employee_id)) lib[sale.employee_id] = [[],['Sales']]
            let idx = lib[sale.employee_id]
              .indexOf(lib[sale.employee_id]
                .find(tuple => tuple[0] === sale.sale_date))

            // lib[sale.employee_id].push([sale.sale_date, sale.sale_amount])
            let date = sale.sale_date.split('T').join(' ')
            date = date.slice(0, date.length-6)
            lib[sale.employee_id][0].push(date)
            lib.all[0].push(date)
            lib[sale.employee_id][1].push(parseInt(sale.sale_amount))
            lib.all[1].push(parseInt(sale.sale_amount))

            // if(idx === -1) {
            //   lib[sale.employee_id].push([sale.sale_date, sale.sale_amount])
            // } else {
            //   lib[sale.employee_id][idx][1] += sale.sale_amount
            // }
            return lib
          }, {all: [[], ['Sales']]}),
          // employeeSales: this.state.allSales.all[1],
          // employeeSalesRate: this.state.allSales.all[0]
        })
        this.setState({
          employeeSalesRate: this.state.allSales.all[0],
          employeeSales: this.state.allSales.all[1],
        })
        console.log('sales obj', this.state.allSales);
      })
  }

  getEmployeeList() {
    axios.get('/fetch/allEmployees')
      .then((results) => {
        const myOptions = [];
        for (let i = 0; i < results.data.length; i += 1) {
          myOptions.push({ value: results.data[i], label: results.data[i].employee_name });
        }
        this.setState({
          employeeSelectOptions: myOptions,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  handleChange(value) {
    console.log('value on change:',value);
    this.setState({
      employeeName: value.value.employee_name,
      employeeImage: value.value.employee_img,
      employeeId: value.value.employee_id,
    }, () => {
      console.log('thisstate after first setstate', this.state)
      this.generateTimesheet()
      console.log("next emp id set:", this.state.employeeId);
      if(this.state.allSales.hasOwnProperty(this.state.employeeId)){
        this.setState({
          employeeSalesRate: this.state.allSales[this.state.employeeId][0],
          employeeSales: this.state.allSales[this.state.employeeId][1]
        })
      } else {
        this.setState({
          employeeSalesRate: '',
          employeeSales: '',
        })
      }
    });
  }

  handleNameInput(e) {
    this.setState({
      newEmployeeName: e.target.value,
    });
  }

  generateEmployeeId(e) {
    e.preventDefault();
    const num = Math.floor(Math.random() * 900000) + 100000;
    this.setState({
      newEmployeeId: num,
    });
  }

  generateTimesheet() {
    axios.get('/fetch/timeSheet', {
      params: {
        employeeId: this.state.employeeId,
      },
    })
      .then((results) => {
        this.setState({
          timeSheet: results.data,
        });
      })
      .catch((error) => {
        throw error;
      })
  }

  submitEmployee() {
    const formData = new FormData();
    formData.append('newEmployeeId', this.state.newEmployeeId);
    formData.append('newEmployeeName', this.state.newEmployeeName);
    formData.append('managerLevel', this.state.managerLevel);
    formData.append('newEmployeeImage', this.state.newEmployeeImage[0]);
    axios.post('/newEmployee', formData)
      .then(() => {
        this.setState({
          newEmployeeId: '',
          newEmployeeName: '',
          newEmployeeImage: '',
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  openConfirmation(e,val) {
    e.preventDefault();
    document.getElementById(val).style.display = 'block';
  }

  closeDelete(modal) {
    document.getElementById(modal).style.display = 'none';
  }

  deletedEmployee() {
    this.getEmployeeList();
    this.getAllSales();
  }

  render() {
    let employeeImage, employeeDetails;
    if (this.state.employeeImage !== '') {
      employeeImage = <img src={this.state.employeeImage } />;
      employeeDetails =
      (<div className="profileGridDetails">
        <h2>Name: {this.state.employeeName}</h2>
        <h2>Employee Id: {this.state.employeeId}</h2>
        <h4>Hello</h4>
      </div>);
    }

    let tableData = [];
    if (this.state.timeSheet) {
      this.state.timeSheet.forEach((time) => {
        tableData.push({
          clockIn: time.check_in,
          clockOut: time.check_out,
          minutes: time.check_out !== null
            ?
            Math.floor((Math.floor(Date.parse(time.check_out) - Date.parse(time.check_in)) / 1000) / 60)
            :
            '',
        });
      });
    }
    return (
      <div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="managerScreenGrid">
          <ConfirmationModal
            closeDelete={this.closeDelete}
            employeeId={this.state.employeeId}
            employeeName={this.state.employeeName}
            deletedEmployee={this.deletedEmployee}
          />
          <div className="manager-navigation"><Navigation /></div>
          <div className="employeeGraphGrid">
            <div className="barChart">
              {this.state.employeeSales.length > 1 ?
                <EmployeeBar
                  amount={this.state.employeeSales}
                  intervals={this.state.employeeSalesRate}
                />
                :
                <h1 className="noDataNotice">no data</h1>
              }
            </div>
          </div>
          <div className="profileGrid">
            <div className="profileGridImage">
              {employeeImage}
            </div>
            {employeeDetails}
          </div>
          <div className="employeeSelect">
            <Select
              className="discountDropdown"
              options={this.state.employeeSelectOptions}
              matchProp="any"
              searchable="true"
              onChange={value => this.handleChange(value)}
              placeholder="Select an Employee"
            /> <br />
            <form>
              <label className="newEmployeeNameLabel">Add New Employee:</label>
              <Select
                options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                autosize={false}
                placeholder="Manager Level"
                onChange={value => this.setState({ managerLevel: value.value })}
              />
              <br />
              <label className="newEmployeeNameLabel">Enter Employee Name: </label>
              <input type="text" onBlur={(e) => this.handleNameInput(e)} />
              <br /><br />
              <button onClick={e => this.generateEmployeeId(e)}>Generate Employee ID</button>
              <label className="employeeIdLabel">{this.state.newEmployeeId}</label>
              <br /><br />
              <div>
                <input
                  type="file"
                  onChange={e => this.setState({ newEmployeeImage: e.target.files })}
                  placeholder="Upload a photo"
                  accept='image/*'
                />
              </div>
              <button onClick={(e) => this.submitEmployee(e)}>Submit</button>
              <button onClick={(e) => this.openConfirmation(e,'deleteEmployeeModal')}>Delete Employee</button>
            </form>
          </div>
          <div>
            <ReactTable
              columns={columns}
              data={tableData}
              defaultPageSize={7}
              className="-striped -highlight"
              style={{ color: 'black' }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(EmployeeInfo);

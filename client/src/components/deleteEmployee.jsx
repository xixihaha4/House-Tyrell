import React from 'react';
import Navigation from './managerNav.jsx';
import Navbar from './navbar.jsx';
import Select from 'react-select';
import axios from 'axios';


export default class DeleteEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees : [],
      employeeOptions: [],
      employee: '',
      employeeImage: 'http://www.sherwoodchamber.net/media/com_jbusinessdirectory/pictures/companies/0/profileicon-1487694034.png',
      employeeInfo: '',
    }
    this.fetchEmployees = this.fetchEmployees.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    axios.get('/fetch/allEmployees')
      .then((res) => {
        this.setState({employees: res.data}, () => {
          let temp = this.state.employees.slice();
          let employeeOptions = [];
          for (let i = 0; i < temp.length; i++) {
            employeeOptions.push({label: temp[i].employee_name, value: i})
          }
          this.setState({employeeOptions: employeeOptions}, () => console.log('this is employeeOptions', this.state.employeeOptions));
        })
      })
  }

  handleSelect(value) {
    console.log('this is the value', value)
    let temp = this.state.employees.slice();
    this.setState({
      employeeImage: temp[value.value].employee_img,
      employeeName: temp[value.value].employee_name,
      employeeId:temp[value.value].employee_id,
    })
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="managerScreenGrid">
          <div className="manager-navigation"><Navigation /></div>
          <div className="profileGridDelete">
            <div className="profileGridImage">
              <img src={this.state.employeeImage}/>
            </div>
            <div className="profileGridDetails">
              <h2>Name: {this.state.employeeName}</h2>
              <h2>Employee Id: {this.state.employeeId}</h2>
              {/* <h4>Hello</h4> */}
            </div>
          </div>
          <div className="delete-employee-select">
            <Select
              options={this.state.employeeOptions}
              // autosize={false}
              placeholder="Select An Employee"
              onChange={(value) => this.handleSelect(value)}
            />
          </div>
        </div>
      </div>
    )
  }
}

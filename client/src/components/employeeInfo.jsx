import React from 'react';
import Navigation from './managerNav.jsx';
import EmployeeBar from './employeeBar.jsx';
import Navbar from './navbar.jsx';
import Select from 'react-select';
import axios from 'axios';

class EmployeeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeSelectOptions: [],
      employeeName: '',
      employeeImage: '',
      employeeId: '',
      newEmployeeId: '',
      newEmployeeName: '',
      managerLevel: false,
    };
    this.getEmployeeList = this.getEmployeeList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generateEmployeeId = this.generateEmployeeId.bind(this);
    this.submitEmployee = this.submitEmployee.bind(this);
  }

  componentDidMount() {
    this.getEmployeeList();
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
    this.setState({
      employeeName: value.value.employee_name,
      employeeImage: value.value.employee_img,
      employeeId: value.value.employee_id,
    });
  }

  generateEmployeeId(e) {
    e.preventDefault();
    const num = Math.floor(Math.random() * 900000) + 100000;
    this.setState({
      newEmployeeId: num,
    });
  }

  submitEmployee() {
    axios.post('/newEmployee', {
      newEmployeeId: this.state.newEmployeeId,
      newEmployeeName: this.state.newEmployeeName,
      managerLevel: this.state.managerLevel,
    })
      .then(() => {
        this.setState({
          newEmployeeId: '',
          newEmployeeName: '',
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    let employeeImage, employeeDetails;
    if (this.state.employeeImage !== '') {
      console.log(this.state.employeeImage);
      employeeImage = <img src={this.state.employeeImage} />;
      employeeDetails =
      (<div className="profileGridDetails">
        <h2>Name: {this.state.employeeName}</h2>
        <h2>Employee Id: {this.state.employeeId}</h2>
        <h4>Hello</h4>
      </div>);
    }
    return (
      <div>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="managerScreenGrid">
          <div className="manager-navigation"><Navigation /></div>
          <div className="graphGrid">
            <div className="barChart"><EmployeeBar /></div>
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
            />
            <form>
              <h1>Add New Employee:</h1>
              <label>Enter Employee Name: </label>
              <input type="text" onChange={e => this.setState({ newEmployeeName: e.target.value })}/>
              <br />
              <button onClick={e => this.generateEmployeeId(e)}>Generate Employee ID</button>
              <label>{this.state.newEmployeeId}</label>
              <br />
              <Select
                options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                autosize={false}
                placeholder="Manager Level"
                onChange={value => this.setState({ managerLevel: value.value })}
              />
              <button onClick={(e) => this.submitEmployee(e)}>Submit</button>
            </form>
          </div>
          <div className="profileGridExtras">
            <h1>MORE STUFF GOES HERE</h1>
          </div>
          <div className="statsGrid">Employee Info Stats</div>
        </div>
      </div>
    )
  }
}

export default EmployeeInfo;

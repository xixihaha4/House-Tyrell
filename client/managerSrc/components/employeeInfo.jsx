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
      timeSheet: [],
    };
    this.getEmployeeList = this.getEmployeeList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generateEmployeeId = this.generateEmployeeId.bind(this);
    this.submitEmployee = this.submitEmployee.bind(this);
    this.generateTimesheet = this.generateTimesheet.bind(this);
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
    }, () => this.generateTimesheet());
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
          <div className="employeeGraphGrid">
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
              <input type="text" onChange={e => this.setState({ newEmployeeName: e.target.value })}/>
              <br /><br />
              <button onClick={e => this.generateEmployeeId(e)}>Generate Employee ID</button>
              <label className="employeeIdLabel">{this.state.newEmployeeId}</label>
              <br /><br />
              <button onClick={(e) => this.submitEmployee(e)}>Submit</button>
            </form>
          </div>
          <div className="profileGridTimesheet">
            <div style={{ 'gridRow': '1', 'gridColumn': '1' }}>Clock In</div>
            <div style={{ 'gridRow': '1', 'gridColumn': '2' }}>Clock Out</div>
            <div style={{ 'gridRow': '1', 'gridColumn': '3' }}>Total Time</div>
            {
              this.state.timeSheet.map((time, i) => (
                <div style={{ gridRow: `${i + 1}`, gridColumn: '1' }}>
                  <h5 className="employeeCheckIn">{time.check_in}</h5>
                </div>
              ))
            }
            {
              this.state.timeSheet.map((time, i) => (
                <div style={{ gridRow: `${i + 1}`, gridColumn: '2' }}>
                  <h5 className="employeeCheckOut">{time.check_out}</h5>
                </div>
              ))
            }
            {
              this.state.timeSheet.map((time, i) => (
                <div style={{ gridRow: `${i + 1}`, gridColumn: '3' }}>
                  <h5 className="employeeTotalWorked">
                    {
                      Math.floor((Math.floor(Date.parse(time.check_out) - Date.parse(time.check_in)) / 1000) / 60)
                    }
                    min
                  </h5>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default EmployeeInfo;

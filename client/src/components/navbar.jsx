import React from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { withRouter } from 'react-router';
import moment from 'moment';
import socket from '../socket.js'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isManager: false,
      employeeName: '',
    }
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.clockout = this.clockout.bind(this);
    this.onEmployeeLogin = this.onEmployeeLogin.bind(this);
    this.onUnload = this.onUnload.bind(this);
  }

  componentDidMount() {
    this.onEmployeeLogin();
    window.addEventListener("beforeunload", this.onUnload)
  }

  onUnload(event) {
    socket.emit('employeeLogout',{employee_name: this.state.employeeName})
    axios.post('/clockout')
  }


  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  clockout() {
    socket.emit('employeeLogout', {employee_name: this.state.employeeName})
    axios.post('/clockout')
      .then(() => {
        this.props.history.push('/');
      })
      .catch((error) => {
        throw error;
      })
  }

  onEmployeeLogin() {
    axios.get('/fetch/employeeInfo', ({}))
      .then((results) => {
        console.log('this is employee info', results.data)
        this.setState({
          employeeName: results.data.employee_name,
        }, () => socket.emit('employeeLogin', {
          employee_id: results.data.employee_id,
          employee_name: results.data.employee_name,
          check_in: moment().format('MM/DD/YYYY, hh:mm:ss a')
        }));
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    return (
      <div className="navbar">
        <span className="navbar-bars"style={{fontSize:"30px", cursor:"pointer"}} onClick={() => this.openNav()}><i className="fas fa-bars" /></span>
        <nav id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={() => this.closeNav()}>&times;</a>
          <a href="#">Alert Manager</a>
          <a onClick={() => this.clockout()}>Clock Out</a>
        </nav>
        <span className="navBack" onClick={() => this.props.history.goBack()}><i className="fas fa-chevron-circle-left" /></span>
        <span className="navbar-time"><Moment interval={1000} format={"MM/DD/YYYY hh:mm:ss a"} /></span>
        <span className="navbar-employee">{this.state.employeeName}</span>
      </div>
    );
  }
}


export default withRouter(Navbar);

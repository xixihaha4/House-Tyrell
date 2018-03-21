import React from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { withRouter } from 'react-router';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isManager: false,
    }
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.clockout = this.clockout.bind(this);
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }

  clockout() {
    axios.post('/clockout')
      .then(() => {
        this.props.history.push('/');
      })
      .catch((error) => {
        throw error;
      })
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
        <span className="navbar-time"><Moment interval={1000} format={"MM/DD/YYYY hh:mm:ss a"} /></span>
        <span className="navbar-employee">Hi, Jane Doe</span>
      </div>
    );
  }
}

export default withRouter(Navbar);

import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isManager: false,
    }
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
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

  render() {
    return (
      <div>
        <span style={{fontSize:"30px", cursor:"pointer"}} onClick={() => this.openNav()}>&#9776; Menu</span>
        <nav id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" class="closebtn" onClick={() => this.closeNav()}>&times;</a>
          <a href="#">Alert Manager</a>
          <a href="#">Logout</a>
        </nav>
        <span className="navbar-employee">Hi, Jane Doe</span>
      </div>
    );
  }
}

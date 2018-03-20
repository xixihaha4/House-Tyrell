import React from 'react';
import Alert from 'react-s-alert';
import Pinpad from './pinpad.jsx';
import axios from 'axios'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identification: '',
      pinpadOptions: [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        'delete', 0, 'clear', 'enter',
      ],
      animation: 'wrapper noselect animated fadeIn',
      failedAttempts: 0,
      pinpadOn: false
    };

    this.verifyLogin = this.verifyLogin.bind(this);
    this.handlePin = this.handlePin.bind(this);
  }

  togglePinpad() {
    this.setState({pinpadOn: !this.state.pinpadOn})
  }

  verifyLogin() {
    if(this.state.identification !== '') {
      if (this.state.identification === '1') {
        this.props.history.push('/managerHome');
      } else if (this.state.identification === '2') {
        this.props.history.push('/salesScreen');
      } else {
        axios.get(`/fetch/employee?PIN=${this.state.identification}`)
          .then(results => {
            results.data[0].manager_privilege ?
            this.props.history.push('/managerHome') :
            this.props.history.push('/salesScreen');
          })
          .catch(error => {
              if(this.state.failedAttempts < 2) {
                this.setState({failedAttempts: this.state.failedAttempts + 1})
                var str = `${this.state.failedAttempts} of 3 failed attempts`
                Alert.warning(str, {
                    position: 'top-right',
                    effect: 'slide',
                    timeout: 'none',
                    html: true,
                });
              } else {
                Alert.error('Too many attempts!', {
                  position: 'top-right',
                  effect: 'jelly'
                });
              }
          });
      }
    }
  }

  handlePin(val) {
    Alert.closeAll()
    if (val === 'enter') {
      this.verifyLogin()
    } else if (val === 'clear') {
      this.setState( {identification: ''} )
    } else if (val === 'delete') {
      var temp = this.state.identification
      this.setState( {identification: temp.slice(0, temp.length-1)} )
    } else if (this.state.identification.length < 12){
      var temp = this.state.identification
      this.setState( {identification: temp + val} )
    }
  }

  componentDidMount() {
    var hover = document.getElementById("hover");
    hover.play();
  }

  render() {
    return (
      <div>
        <audio id="hover">
          <source src="../sounds/237422_plasterbrain_hover-1.ogg" type="audio/ogg" />
          <source src="../sounds/237422_plasterbrain_hover-1.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <h1 >
          <div className="animated fadeIn">
            <div className="logo">
              <span className="logo-text">House</span><i className="fas fa-circle-notch" ></i><span className="logo-text">Tyrell</span>
            </div>
            <div className="pinNumber-wrapper"  onClick={() => this.togglePinpad()}><i className="far fa-keyboard"></i>Enter your pin <i className="fas fa-hashtag"></i>: <span className="pinNumber">{this.state.identification}</span></div><br />
            {this.state.pinpadOn &&
              <Pinpad
              pinpadOptions={this.state.pinpadOptions}
              handlePin={this.handlePin}
              animation={this.state.animation}
            />}
            <Alert stack={{limit: 3}} />
          </div>
        </h1>
      </div>
    );
  }
}

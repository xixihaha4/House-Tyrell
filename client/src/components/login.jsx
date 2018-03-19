import React from 'react';
import Alert from 'react-s-alert';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identification: '',
      pinpadOptions: [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        'delete', 0, 'clear', 'enter',
      ],
    };

    this.verifyLogin = this.verifyLogin.bind(this);
    this.handlePin = this.handlePin.bind(this);
  }

  verifyLogin() {
    if(this.state.identification !== '') {
      if (this.state.identification === '1') {
        this.props.history.push('/managerHome');
      } else if (this.state.identification === '2') {
        this.props.history.push('/salesScreen');
      } else {
        Alert.error('Invalid Pin Number!', {
          position: 'top-right',
          effect: 'scale',
          beep: false,
          timeout: 2000,
          onClose: function () {
            this.setState({
              indentification: ''
            });
          },
          offset: 100
        });
      }
    }
  }

  handlePin(val) {
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

  render() {
    return (
      <div>
        <h1 >
          <div className="animated fadeIn">
            <div className="logo">
              <span className="logo-text">House</span><i className="fas fa-circle-notch" ></i><span className="logo-text">Tyrell</span>
            </div>
            <div className="pinNumber-wrapper">Enter your pin <i className="fas fa-hashtag"></i>: <span className="pinNumber">{this.state.identification}</span></div><br />
            <div className="wrapper noselect">
              {this.state.pinpadOptions.map(option =>
                <div className="pinpad" onClick={() => this.handlePin(option)}>
                  {option}
                </div>
              )}
            </div>
            <Alert />
          </div>
        </h1>
      </div>
    );
  }
}


{/* <div>
<button class="button" onClick={() => this.verifyLogin()}>
  Log In
</button>
</div> */}

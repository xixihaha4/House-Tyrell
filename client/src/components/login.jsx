import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identification: '',
      password: '',
      level: '',
      pinpadOptions: [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        'delete', 0, 'clear', 'enter'
      ]
    };

    this.verifyLogin = this.verifyLogin.bind(this);
    this.handlePin = this.handlePin.bind(this);
  }

  verifyLogin() {
    if(this.state.level === 'employee' && this.state.password !== ''){
      //axios.login.password.confirm.shibidibi
        //.then
        //this.props.login(employee id)
    }
    // axios.
  }

  handlePin(val) {
    if (val === 'enter') {
      this.verifyLogin()
    } else if (val === 'clear') {
      this.setState({identification: ''})
    } else if (val === 'delete') {
      var temp = this.state.identification
      this.setState({identification: temp.slice(0, temp.length-1)})
    } else {
      var temp = this.state.identification
      this.setState({identification: temp + val})
    }
  }

  render() {
    return (
      <div>
        <h1>
          <form
            onSubmit={e => {
              e.preventDefault()
            }}
          >
            <button
              onClick={() => {
                this.state.level !== 'manager' ?
                this.setState({level: 'manager'}) :
                this.setState({level: ''})
              }}
            >
              Manager
            </button>
            <button
              onClick={() => {
                this.state.level !== 'employee' ?
                this.setState({level: 'employee'}) :
                this.setState({level: ''})
              }}
            >
              Employee
            </button>
            {this.state.level === 'manager' &&
              <Manager />
            }
            {this.state.level === 'employee' &&
              <div>
                Enter your pin<br />
                #:{this.state.identification}<br />
                <div class="wrapper noselect">
                  {this.state.pinpadOptions.map(option =>
                    <div onClick={() => this.handlePin(option)}>
                      {option}
                    </div>
                  )}
                </div>
              </div>
            }
            <div>
              <button class="button" onClick={() => this.verifyLogin()}>
                Log In
              </button>
            </div>
          </form>
        </h1>
      </div>
    );
  }
}

function Manager(props) {
  return (
    <div>
      hi man...ager
    </div>
  )
}


// function Employee(props) {
//   return (
//     <div>
//       yo..
//     </div>
//   )
// }

// <div>
//   <form
//     onSubmit={(e) => {
//       e.preventDefault()
//       dispatch(login(input.value))
//       input.value = ''
//     }}
//   >
//     <input ref={node => input = node}/>
//     <button type="submit">
//       Log in
//     </button>
//   </form>
// </div> */

// var pinpadOptions = [
//   {display: '1', value: 1},
//   {display: '2', value: 2},
//   {display: '3', value: 3},
//
//   {display: '4', value: 4},
//   {display: '5', value: 5},
//   {display: '6', value: 6},
//
//   {display: '7', value: 7},
//   {display: '8', value: 8},
//   {display: '9', value: 9},
//
//   {display: 'delete', value: 'delete'},
//   {display: '0', value: 0},
//   {display: 'clear', value: 'clear'},
//
//   {display: 'enter', value: 'enter'},
// ]

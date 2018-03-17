import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identification: '',
      password: '',
      level: ''
    };

    this.verifyLogin = this.verifyLogin.bind(this);
    this.handlePin = this.handlePin.bind(this);
  }

  verifyLogin() {
    // axios.
  }

  handlePin(val) {
    if (val === 'clear') {
      this.setState({identification: ''})
    } else if (val === -1) {
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
                <div onClick={() => {
                  this.setState({identification: '123'})
                }}>
                  123
                </div>
              </div>
            }
            <button>

            </button>
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

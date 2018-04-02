import React from 'react';


export default class NotificationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: ''
    }
  }

  sendNotice(i) {
    console.log(i, this.props.alerts[i])
  }

  render() {
    console.log('this is props in notificationModal', this.props)
    return (
      <div id="notificationModal" className="notificationModal animated fadeIn">
        <div className="modal-content-notification">
          <div className="modal-header-notification">
            <div className="modal-title">Alerts from Employees</div>
            <div className="modal-close" onClick={() => this.props.closeNotification('notificationModal')}><i className="fas fa-times-circle"></i></div>
          </div>
          <div className="modal-body-notification">
            <h3>These are the current alerts.</h3>
            <div className="modal-body-alerts">
              <div className="alert-employee">
                Employee ID
              </div>
              <div className="alert-employeeId">
                Employee Name
              </div>
              <div className="alert-time">
                Time
              </div>
            </div>
            {this.props.alerts.map((alert, i) => {
              return (<div className="modal-body-alerts" id={`alert_${i}`} style={{gridRow: `${i+3}`}}>
                <div className="alert-employee">
                  {alert.employee_id}
                </div>
                <div className="alert-employeeId">
                  {alert.employee_name}
                </div>
                <div className="alert-time">
                  {alert.time}
                </div>
                <div
                  onClick={() => this.props.alertEmployee(i)}
                  className="alert-button">
                  <i className="fas fa-times-circle"></i>
                </div>
              </div>)
            })}

          </div>
          <div className="modal-footer-notification">Delete Employee Information</div>

      </div>
     </div>
    )
  }
}

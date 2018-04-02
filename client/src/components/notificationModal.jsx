import React from 'react';


export default class NotificationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: ''
    }
  }

  render() {
    return (
      <div id="notificationModal" className="notificationModal animated fadeIn">
        <div className="modal-content-notification">
          <div className="modal-header-notification">
            <div className="modal-title">Alerts from Employees</div>
            <div className="modal-close" onClick={() => this.props.closeNotification('notificationModal')}><i className="fas fa-times-circle"></i></div>
          </div>
          <div className="modal-body-notification">
            <h3>Please confirm that you want to remove this employee and all of the employee's data.</h3>
            <div className="modal-body-employeeName">
              <h3>
                Employee Name: {this.props.employeeName}
              </h3>
            </div>
            <div className="modal-body-employeeId">
              <h3>
                Employee ID: {this.props.employeeId}
              </h3>
            </div>
            <div className="confirmOrCancelNotification">
              <div onClick={this.saveChanges} className="confirmConfirmNotification">Notification Employee</div>
              <div onClick={() => this.props.closeNotification('notificationModal')} className="cancelConfirmNotification">Cancel</div>
            </div>
          </div>
          <div className="modal-footer-notification">Delete Employee Information</div>

      </div>
     </div>
    )
  }
}

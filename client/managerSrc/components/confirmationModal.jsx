import React from 'react';


export default class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'dummy': 'dummy'
    }
    this.saveChanges = this.saveChanges.bind(this);
  }

  saveChanges() {
    this.props.saveChanges();
    this.props.closeModal('ConfirmationModal');
  }

  render() {
    return (
      <div id="confirmationModal" className="ConfirmationModal animated fadeIn">
        <div className="modal-content-confirmation">
          <div className="modal-header-confirmation">
            <div className="modal-title">Confirm Changes</div>
            <div className="modal-close" onClick={() => this.props.closeModal('ConfirmationModal')}><i className="fas fa-times-circle"></i></div>
          </div>
          <div className="modal-body-confirmation">
            <h3>Please confirm your changes.</h3>
            <div className="confirmOrCancel">
              <div onClick={this.saveChanges} className="confirmConfirm">Save Changes</div>
              <div onClick={() => this.props.closeModal('ConfirmationModal')} className="cancelConfirm">Cancel</div>
            </div>
          </div>
          <div className="modal-footer-confirmation">A</div>

      </div>
     </div>
    )
  }
}

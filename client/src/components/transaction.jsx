import React from 'react';
import ReactModal from 'react-modal';
import CustomModal from './customModal.jsx';
import TransactionItem from './transactionItem.jsx'



export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      itemTotal: 0,
      modalIsOpen: false,
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    console.log('hello')
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }


  render() {
    return (

      <div className='transactionGrid'>
        <div className='transactionGridHeader'>
          <div style={{ 'grid-row': '1', 'grid-column': '2' }}>Name</div>
          <div style={{ 'grid-row': '1', 'grid-column': '3' }}>Price</div>
        </div>

        <div className='transactionGridItems'>
          {this.props.transactionItems.map((item, i) =>
          (<button
            onClick={() => {this.props.transactionRemove(i)}}
            style={{ 'grid-row': `${i + 1}`, 'grid-column': '1', 'vertical-align': 'top' }}
            >X
          </button>))}
          {this.props.transactionItems.map((item, i) =>
           <div style={{ 'grid-row': `${i + 1}`, 'grid-column': '2' }}>
             <TransactionItem item={item} removeIng={this.props.removeIng} />
          </div>)}
          {this.props.transactionItems.map((item, i) =>
            <div style={{ 'grid-row': `${i + 1}`, 'grid-column': '3' }}>{item.item_price}</div>)}
        </div>

        <div className='transactionGridFooter'>
          <div style={{ 'grid-row': '1', 'grid-column': '3' }}>{this.props.tax.toFixed(2)} Tax</div>
          <div style={{ 'grid-row': '2', 'grid-column': '3' }}>{this.props.total.toFixed(2)} subTotal</div>
          <div style={{ 'grid-row': '3', 'grid-column': '3' }}>{(this.props.total + this.props.tax).toFixed(2)} Total</div>
        </div>
      </div>
    )
  }
}



// (<ReactModal
//                 isOpen={this.state.modalIsOpen}
//                 onAfterOpen={this.afterOpenModal}
//                 onRequestClose={this.closeModal}
//                 contentLabel="Example Modal"
//               >
//                 <button onClick={this.closeModal}>close</button>
//                <div>I am a modal</div>
//              </ReactModal>, )

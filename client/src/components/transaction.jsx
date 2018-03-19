import React from 'react'
// import TransactionItem from './transactionItem.jsx'

export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      itemTotal: 0,
    }
  }




  render() {
    return (

      <div className="transactionGrid">
        <div style={{"grid-row": "1", "grid-column": "2"}}>Name</div>
        <div style={{"grid-row": "1", "grid-column": "3"}}>Price</div>
        <div style={{"grid-row": "2", "grid-column": "1"}}>
          {this.props.transactionItems.map((item, i) =>
          <button
            onClick={() => {this.props.transactionRemove(i)}}
            style={{"grid-row": `${i + 2}`}}>X</button>)}
        </div>
        <div style={{"grid-row": "2", "grid-column": "2"}}>
          {this.props.transactionItems.map((item, i) =>
          <div style={{"grid-row": `${i + 2}`}}>{item.item_name}</div>)}
        </div>
        <div style={{"grid-row": "2", "grid-column": "3"}}>
          {this.props.transactionItems.map((item, i) =>
          <div style={{"grid-row": `${i + 2}`}}>{item.item_price}</div>)}
        </div>
        <div style={{"grid-row": "3",  "grid-column":"3"}}>{this.props.tax.toFixed(2)} Tax</div>
        <div style={{"grid-row": "4",  "grid-column":"3"}}>{this.props.total.toFixed(2)} subTotal</div>
        <div style={{"grid-row": "5", "grid-column":"3"}}>{(this.props.total + this.props.tax).toFixed(2)} Total</div>

      </div>
    )
  }
}

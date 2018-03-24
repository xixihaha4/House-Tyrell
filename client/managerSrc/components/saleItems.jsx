import React from 'react';

export default class SaleItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'dummy': 'dummy'
    }
  }

  render() {
    return(
      <div className="saleItemGridManager">
        <div onClick={this.props.openItemModal}>
          <h3>Add an Item</h3>
        </div>
        {
          this.props.menuItems.map((item, i) => {
            if (item.item_image === undefined || item.item_image === null) {
              return (
                <div key={i} className={`item_${i}`} onClick={() => itemClick(item)}>
                  <h3>{item.item_name}</h3>
                  {/* <button className="removeItem"><i className="fas fa-times-circle"></i></button> */}
                </div>);
            }
              return (
                <div key={i} className={`item_${i}`}>
                  <img alt={item.item_name} src={item.item_image} style={{ width: '95%', height: '95%' }} onClick={() => itemClick(item)}/>
                  {/* <button className="removeItem"><i className="fas fa-times-circle"></i></button> */}
                </div>);
          })
        }
      </div>
    )
  }
}



// const SaleItems = ({ menuItems, itemClick }) => (
//   <div>
//     <h3>Add an Item</h3>
//   </div>
// );
//
// export default SaleItems;

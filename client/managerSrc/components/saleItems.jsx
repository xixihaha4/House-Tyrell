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
      <div onClick={this.props.openItemModal}>
        <h3>Add an Item</h3>
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

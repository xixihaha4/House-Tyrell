import React from 'react';
import axios from 'axios';
import Item from './item.jsx';

class SaleItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
    };

    this.getMenuItems = this.getMenuItems.bind(this);
  }

  componentDidMount() {
    // this.getMenuItems();
  }

  getMenuItems() {
    axios.get('/fetch/items')
      .then((results) => {
        this.setState({
          menuItems: results.data,
        });
      });
  }

  render() {
    return (
      <div className="saleItemGrid">
        {
          this.props.menuItems.map((item, i) =>
            <Item className={`item_${i}`} item={item} itemClick={this.props.itemClick} />)}
      </div>
    );
  }
}

export default SaleItems;

// (<div className={`item_${i}`}>
//   <img alt="menuitem" src={item.item_image} style={{ width: '150px', height: '150px' }} />
// </div>))

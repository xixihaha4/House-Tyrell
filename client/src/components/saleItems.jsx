import React from 'react';
import axios from 'axios';

class SaleItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
    };

    this.getMenuItems = this.getMenuItems.bind(this);
  }

  componentDidMount() {
    this.getMenuItems();
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
          this.state.menuItems.map((item, i) =>
            (<div className={`item_${i}`}>
              <img alt="menuitem" src={item.item_image} style={{ width: '150px', height: '150px' }} />
            </div>))
        }
      </div>
    );
  }
}

export default SaleItems;

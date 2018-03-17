import React from 'react';
import SaleScreen from './saleScreen.jsx';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
    };
    this.itemClick = this.itemClick.bind(this);
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

  itemClick(item) {
    console.log('this is is item in app', item);
  }

  render() {
    return (
      <div>
        <SaleScreen menuItems={this.state.menuItems} itemClick={this.itemClick} />
      </div>
    );
  }
}

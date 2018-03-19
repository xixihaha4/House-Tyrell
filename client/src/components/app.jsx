import React from 'react';
import SaleScreen from './saleScreen.jsx';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      menuCategories: [],
    };
    this.itemClick = this.itemClick.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }


  componentDidMount() {
    this.getMenuItems();
    this.getCategories();
  }

  getMenuItems() {
    axios.get('/fetch/items')
      .then((results) => {
        this.setState({
          menuItems: results.data,
        });
      });
  }

  getCategories() {
    axios.get('/fetch/categories')
      .then((results) => {
        this.setState({
          menuCategories: results.data,
        });
      });
  }

  itemClick(item) {
    console.log('this is is item in app', item);
  }

  render() {
    return (
      <div>
        <SaleScreen
          menuItems={this.state.menuItems}
          itemClick={this.itemClick}
          menuCategories={this.state.menuCategories}
        />
      </div>
    );
  }
}

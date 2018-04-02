import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import VoidList from './voidList.jsx';

export default class VoidModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      menuData: [],
      orderID: '',
      employeeID: '',
      itemList: [],
      selectedList: [],
      currentOrderIndex: 0,
      lastOrderNumber: '',
    };
    this.getRecentSales = this.getRecentSales.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.getTransactionData = this.getTransactionData.bind(this);
    this.displayOrder = this.displayOrder.bind(this);
    this.getItemNames = this.getItemNames.bind(this);
    this.handleVoid = this.handleVoid.bind(this);
    this.getItemsID = this.getItemsID.bind(this);
    this.updateSelectedList = this.updateSelectedList.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
  }

  componentWillMount() {
    this.getTransactionData();
  }

  componentWillUpdate() {
    this.state.selectedList;
  }

  getRecentSales() {
    return axios.get('/fetch/recentSales');
  }
  
  getMenuItems() {
    return axios.get('/fetch/allitems');
  }

  getTransactionData() {
    axios.all([this.getRecentSales(), this.getMenuItems()])
      .then(axios.spread((salesData, menuData) => {
        console.log('RECENT 20 SALES', salesData.data);
        console.log('menuItems', menuData.data);
        this.setState({
          transactions: salesData.data,
          menuData: menuData.data,
        }, () => {
          this.displayOrder();
        });
      }));
  }

  getItemNames(items) {
    const itemsArray = JSON.parse(items);
    const menuData = this.state.menuData;
    const obj = {};
    var result = '';
    const itemNamesArray = itemsArray.map((item) => {
      for (var i = 0; i < menuData.length; i++) {
        if (item === menuData[i].id) {
          item = menuData[i].item_name;
        }
      }
      return item;
    });
    return itemNamesArray;
  }

  getItemsID(itemlist) {
    const menuitems = this.state.menuData;
    const result = itemlist.map(item => {
      for (var i = 0; i < menuitems.length; i++) {
        if(menuitems[i].item_name === item) {
          return menuitems[i].id;
        }
      }
    })
    return result;
  }

  displayOrder() {
    this.setState({
      orderID: this.state.transactions[this.state.currentOrderIndex].id,
      employeeID: this.state.transactions[this.state.currentOrderIndex].employee_id,
      itemList: this.getItemNames(this.state.transactions[this.state.currentOrderIndex].item_id)
    });
  }

  updateSelectedList(newList) {
    this.setState({
      selectedList: newList
    });
  }

  handleVoid(list) {
    console.log('selected list', this.state.selectedList);
    console.log('whole list', this.state.itemList);
    axios.post('/voidItems', { selected: this.getItemsID(list), orderNumber: this.state.orderID })
      .catch(err => console.log(err));
  }

  handleLeft() {
    if (this.state.currentOrderIndex > 0) {
      this.setState({
        currentOrderIndex: this.state.currentOrderIndex - 1,
      }, () => {
        this.displayOrder();
      });
    }
  }

  handleRight() {
    if (this.state.currentOrderIndex === this.state.transactions.length - 1) {
      console.log('need to get more transactions data');
    } else {
      this.setState({
        currentOrderIndex: this.state.currentOrderIndex + 1,
      }, () => {
        this.displayOrder();
      });
    }
  }

  render() {
    const { openModal, closeModal } = this.props;
    return (
      <div className="modal-content">
        <div className="modal-header">Void 
          <FaAngleLeft onClick={() => this.handleLeft()} />
          <FaAngleRight onClick={() => this.handleRight()} />
          <div className="discountClose" onClick={() => closeModal('voidModal')}>&times;</div>
        </div>
        <div className="modal-body">
          Order ID. {this.state.orderID}
          Employee ID. {this.state.employeeID}
          <div className="order-list">
          {this.state.itemList.map((item, i) => 
            <VoidList item={item} key={i} saleID={this.state.orderID} selectedList={this.state.selectedList} updateSelectedList={this.updateSelectedList} />
          )}
          </div>
          <div className="void-list">
            {this.state.selectedList}
          </div>
          <button onClick={() => this.handleVoid(this.state.selectedList)}>Void</button>
          <button onClick={() => this.handleVoid(this.state.itemList)}>Void Entire Order</button>
          <button onClick={() => closeModal('voidModal')}>Cancel</button>
        </div>
        <div className="modal-footer"></div>
      </div>
    );
  }
}

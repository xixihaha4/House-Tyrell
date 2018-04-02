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
      lastOrderNumber: null,
    };
    this.getRecentSales = this.getRecentSales.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.getTransactionData = this.getTransactionData.bind(this);
    this.getMoreTransactionData = this.getMoreTransactionData.bind(this);
    this.displayOrder = this.displayOrder.bind(this);
    this.getItemNames = this.getItemNames.bind(this);
    this.handleVoid = this.handleVoid.bind(this);
    this.getItemsID = this.getItemsID.bind(this);
    this.updateSelectedList = this.updateSelectedList.bind(this);
    this.transformSelectedList = this.transformSelectedList.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
  }

  // componentWillMount() {
  //   this.getTransactionData();
  // }

  componentWillUpdate() {
    this.state.selectedList;
  }

  componentDidMount() {
    this.getTransactionData();
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
          lastOrderNumber: salesData.data[salesData.data.length - 1].id,
        }, () => {
          this.displayOrder();
        });
      }));
  }

  getMoreTransactionData() {
    axios.get('/fetch/recentSales', { params: { saleID: this.state.lastOrderNumber } })
      .then((moreData) => {
        const currentData = this.state.transactions;
        const newData = currentData.concat(moreData.data);
        // console.log('current order Index', this.state.currentOrderIndex);
        // console.log('current DATA', newData);
        this.setState({
          transactions: newData,
          currentOrderIndex: this.state.currentOrderIndex + 1,
          lastOrderNumber: moreData.data[moreData.data.length - 1].id,
        }, () => {
          // console.log('THIS IS WHAT TRANSACTIONS LOOK LIKE', this.state.transactions)
          this.displayOrder();
        });
      });
  }

  getItemNames(items) {
    const itemsArray = JSON.parse(items);
    const menuData = this.state.menuData;
    const obj = {};
    const result = '';
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
    const menuItems = this.state.menuData;
    const result = itemlist.map(item => {
      for (var i = 0; i < menuItems.length; i++) {
        if(menuItems[i].item_name === item) {
          return menuItems[i].id;
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

  transformSelectedList(listNames) {
    const menuItems = this.state.menuData;
    const resultList = listNames.map((item) => {
      for (var i = 0; i < menuItems.length; i++) {
        if (item === menuItems[i].item_name) {
          item = menuItems[i];
        }
      }
      return item;
    });
    return resultList;
  }

  calculateTotal(list) {
    return list.reduce((sum, item) => sum + Number(item.item_price), 0)
  }

  handleVoid(list) {
    // console.log('selected list', this.transformSelectedList(list));
    // console.log('whole list', list);
    const selectedTransactionList = this.transformSelectedList(list);
    // console.log('total', this.calculateTotal(selectedTransactionList));
    axios.post('/completed/transaction', { 
      transactionItems: selectedTransactionList,
      orderNumber: this.state.orderID,
      total: JSON.stringify(this.calculateTotal(selectedTransactionList)),
    })
      .then(() => {
        this.props.closeModal('voidModal');
      })
      .catch(err => console.log(err));
  }

  handleLeft() {
    if (this.state.currentOrderIndex > 0) {
      this.setState({
        currentOrderIndex: this.state.currentOrderIndex - 1,
        selectedList: [],
        isSelected: false,
      }, () => {
        this.displayOrder();
      });
    }
  }

  handleRight() {
    // console.log('currentOrderIndex', this.state.currentOrderIndex);
    // console.log('transaction length', this.state.transactions.length - 1);
    if (this.state.currentOrderIndex === this.state.transactions.length - 1) {
      this.getMoreTransactionData();
    } else {
      this.setState({
        currentOrderIndex: this.state.currentOrderIndex + 1,
        selectedList: [],
        isSelected: false,
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
            {this.state.itemList.map((item, i) => (
              <VoidList
                item={item}
                key={i}
                saleID={this.state.orderID}
                selectedList={this.state.selectedList}
                updateSelectedList={this.updateSelectedList}
              />))}
          </div>
          {/* <div className="void-list">
            {this.state.selectedList}
          </div> */}
          <button onClick={() => this.handleVoid(this.state.selectedList)}>Void</button>
          <button onClick={() => this.handleVoid(this.state.itemList)}>Void Entire Order</button>
          <button onClick={() => closeModal('voidModal')}>Cancel</button>
        </div>
        <div className="modal-footer"></div>
      </div>
    );
  }
}

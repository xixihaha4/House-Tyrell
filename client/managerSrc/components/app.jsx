import React from 'react';
import SaleScreen from './saleScreen.jsx';
import axios from 'axios';
import Login from './login.jsx';
import Alert from 'react-s-alert'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      menuCategories: [],
      transactionItems: [],
      tax: 0,
      total: 0,
      discount: 0,
      discountOptions: [],
      newItems: [],
      newCategories: [],
      ingredients: [],
      categories: [],
    };
    this.itemClick = this.itemClick.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.transactionRemove = this.transactionRemove.bind(this);
    this.filterByCategory = this.filterByCategory.bind(this);
    this.removeIng = this.removeIng.bind(this);
    this.updateDiscount = this.updateDiscount.bind(this);
    this.transactionClear = this.transactionClear.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleNewCategory = this.handleNewCategory.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.discardChanges = this.discardChanges.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getStates = this.getStates.bind(this);
  }

  componentWillMount() {
    this.getStates();
  }



  getStates() {
    axios.get('/fetch/ingredients')
      .then((ing) => {
        this.setState({
          ingredients: ing.data
        }, () => {
          axios.get('/fetch/categories')
            .then((cat) => {
              this.setState({
                categories: cat.data,
                menuCategories: cat.data,
              }, () => {
                axios.get('/fetch/items')
                  .then((items) => {
                    this.setState({
                      menuItems: items.data
                    })
                  })
              })
            })
        })
      })
  }

  getCategories() {
    axios.get('/fetch/categories')
      .then((cat) => {
        this.setState({ categories: cat.data })
      })
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

  filterByCategory(category) {
    if (!category) {
      axios.get('/fetch/items')
      .then((results) => {
        this.setState({
          menuItems: results.data
        })
      })
    } else {
    axios.get('/filter/category', { params: { category: category.id } })
      .then((results) => {
        this.setState({
          menuItems: results.data,
        })
      })
      .catch((error) => {
        throw error;
      });
    }
  }

  itemClick(item) {
    const temp = this.state.transactionItems.slice();
    temp.push(item);
    let tempTotal = 0;
    for (let i = 0; i < temp.length; i += 1) {
      tempTotal = tempTotal + parseFloat(temp[i].item_price)
    }
    let tempTax = (tempTotal * 0.0875).toFixed(2)

    this.setState({
      transactionItems: temp,
      total: tempTotal,
      tax: parseFloat(tempTax),
    });
  }

  removeIng(ingredient, i, crossed) {
      console.log('this is ingredient and index of ingredient', ingredient, i, crossed);
  }

  transactionRemove(index) {
    const remove = this.state.transactionItems.slice();
    let tempTotal = this.state.total - remove[index].item_price;
    let tempTax = (tempTotal * 0.0875).toFixed(2)
    remove.splice(index, 1);
    this.setState({
      transactionItems: [],
      total: 0,
      tax: 0,
    }, () => this.setState({
      transactionItems: remove,
      total: tempTotal,
      tax: parseFloat(tempTax),
    }))
  }

  transactionClear() {
    this.setState({ transactionItems: [] })
  }



// Below are all the functions for the discount modal and also to update discount.
  openModal(modal) {
    document.getElementById(modal).style.display='block';
  }
  closeModal(modal) {
    document.getElementById(modal).style.display='none';
  }

  handleNewItem(item) {
    let temp = this.state.newItems.slice()
    temp.push(item)
    this.setState({ newItems: temp })
  }

  handleNewCategory(category) {
    let temp = this.state.newCategories.slice()
    temp.push(category)
    this.setState({ newCategories: temp })
  }

  saveChanges() {
    console.log('saving changes', this.state.newItems, this.state.newCategory)
    //loop through new items, create new item entry for each
    //loop through new categories, create new category entry for each
  }

  discardChanges() {
    this.setState({
      newItems: [],
      newCategory: [],
    })
  }


  discountModalOptions() {
    const myOptions = [];
    for (let i = 0; i <= 100; i += 1) {
      myOptions.push({ value: i, label: i });
    }
    this.setState({
      discountOptions: myOptions,
    });
  }

  updateDiscount(discount) {
    this.setState({
      discount,
    });
  }
  render() {
    return (
      <div>

        <SaleScreen
          menuItems={this.state.newItems.concat(this.state.menuItems)}
          itemClick={this.itemClick}
          menuCategories={this.state.newCategories.concat(this.state.menuCategories)}
          transactionItems={this.state.transactionItems}
          total={this.state.total}
          tax={this.state.tax}
          discount={this.state.discount}
          transactionRemove={this.transactionRemove}
          filterByCategory={this.filterByCategory}
          removeIng={this.removeIng}
          transactionComplete={this.transactionComplete}
          discountOptions={this.state.discountOptions}
          updateDiscount={this.updateDiscount}
          transactionClear={this.transactionClear}
          getMenuItems={this.getMenuItems}
          getCategories={this.getCategories}
          openModal={this.openModal}
          closeModal={this.closeModal}
          handleNewItem={this.handleNewItem}
          handleNewCategory={this.handleNewCategory}
          saveChanges={this.saveChanges}
          discardChanges={this.discardChanges}
          categories={this.state.categories}
          ingredients={this.state.ingredients}
        />

      </div>
    );
  }
}

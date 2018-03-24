import React from 'react';
import axios from 'axios';
export default class itemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_name: '',
      item_price: '',
      item_image: '',
      item_ingredients: '',
      item_category: '',
    }
    this.createItem = this.createItem.bind(this);
  }

  createItem() {
    axios.post('/create/item', {
      item_name: this.state.item_name,
      item_price: this.state.item_price,
      item_image: this.state.item_image,
      item_ingredients: '[1,2,3,4]',
      item_category: 3
    }).then(() => {
      this.props.closeItemModal();
    })

  }


  render() {
    return (
      <div id="itemModal" className="itemModal animated fadeIn">
        <div className="modal-content-manager">
          <div className="modal-header-manager">
            <div>Add an Item</div>
            <div className="discountClose" onClick={() => this.props.closeItemModal()}>HELLO</div>
          </div>
          <div className="modal-body-manager">
            <input
              type="text"
              value={this.state.item_name}
              onChange={(e) => this.setState({ item_name: e.target.value }, () => console.log(this.state.item_name))}
              placeholder="Enter new Item Name"
            />
            <input
              type="Number"
              value={this.state.item_price}
              onChange={(e) => this.setState({ item_price: e.target.value }, () => console.log(this.state.item_price))}
              placeholder="Enter Item Price"
            />
            <input
              type="Text"
              value={this.state.item_image}
              onChange={(e) => this.setState({ item_image: e.target.value }, () => console.log(this.state.item_image))}
              placeholder="Enter an Image_URL or Upload a photo"
            />
            <input
              type="Text"
              value={this.state.item_ingredients}
              onChange={(e) => this.setState({ item_ingredients: e.target.value }, () => console.log(this.state.item_ingredients))}
              placeholder="Enter the Item Ingredients"
            />
            <input
              type="Text"
              value={this.state.item_category}
              onChange={(e) => this.setState({ item_category: e.target.value }, () => console.log(this.state.item_category))}
              placeholder="Please enter the item category"
            />
            <button type="button" onClick={this.createItem}>
              <h3>Create Item</h3>
            </button>
          </div>
          <div className="modal-footer-manager">Please Pick</div>
        </div>
      </div>
    )
  }
}

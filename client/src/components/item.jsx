import React from 'react';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: '',
    }
  }
  render() {
    return (
      <img alt="menuitem" onClick={() => this.props.itemClick(this.props.item)} src={this.props.item.item_image} style={{ width: '150px', height: '150px' }} />
    )
  }
}

import React from 'react'

export default class OrderKitchenView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: 'kitchenOrder',
      age: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ classes: this.state.classes + ' kitchenOldOrder' });
    }, 3000);
    setInterval(() => {
      this.setState({ age: (this.state.age + 1) });
    }, 1000);
  }
  render() {
    return (
      <div className={this.state.classes}>
        <div>{Math.floor(this.state.age / 60)}:{this.state.age % 60 < 10 && (0)}{this.state.age % 60}</div>
        <div className="kitchenOrderNumber">{this.props.number}</div>
        {this.props.foods.map(food => <div>{food}</div>)}
      </div>
    );
  }
}

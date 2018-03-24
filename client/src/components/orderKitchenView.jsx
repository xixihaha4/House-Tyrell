import React from 'react'
// import moment from 'moment'

// const OrderKitchenView = ({ number, foods }) => (
export default class OrderKitchenView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      classes: "kitchenOrder",
      // time: 58
      // birth: moment().unix(),
      age: 0,
      // seconds: 0,
      // minutes: 0
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({classes: this.state.classes + " kitchenOldOrder"})
    }, 3000)
    setInterval(() => {
      // this.setState({age: Date.(moment().unix() - this.state.birth)})
      this.setState({age: (this.state.age + 1)})
    }, 1000)
  }

  render() {
    return (
      <div className={this.state.classes}>
        <div>{Math.floor(this.state.age / 60)}:{this.state.age % 60 < 10 && (0)}{this.state.age % 60}</div>
        <div className="kitchenOrderNumber">{this.props.number}</div>
        {this.props.foods.map(food => <div>{food}</div>)}
      </div>
    )
  }
}

// export default OrderKitchenView;

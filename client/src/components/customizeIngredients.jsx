import React from 'react';

export default class CustomizeIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crossed: false,
      masterIngredients: [],
    }
    this.crossOutItem = this.crossOutItem.bind(this);
  }

  // componentDidMount() {
  //   let masterIngredients;
  //   let temp = this.props.menuItems.slice()
  //   for (let i = 0; i < temp.length; i += 1) {
  //     if (temp[i].id === this.props.item.id) {
  //       masterIngredients = JSON.parse(temp[i].item_ingredients)
  //     }
  //   }
  //   this.setState({ masterIngredients: masterIngredients }, () => console.log('this is masterIngredients now', this.state.masterIngredients))
  // }

  crossOutItem() {
    if (!this.state.crossed) {
      this.setState({ crossed: !this.state.crossed },
        () => this.props.removeIng(this.props.ingredient, this.props.i, this.state.crossed, this.props.index),
      );
    } else {
      this.setState({ crossed: !this.state.crossed },
        () => this.props.addIng(this.props.ingredient, this.props.i, this.state.crossed, this.props.index),
      );
    }

  }

  render() {
    return (
      <div
        onClick={this.crossOutItem}
        style={this.state.crossed ? {'text-decoration' : 'line-through', 'color': 'grey'} : {'color': 'grey'}}>
        {this.props.ingredient.ingredient_name}
      </div>
    );
  }
}

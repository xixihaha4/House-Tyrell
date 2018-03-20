import React from 'react';
var c3 = require('c3/c3.js');

class InventoryBar extends React.Component {
    componentDidMount() {
        this.updateChart();
    }
    componentDidUpdate() {
        this.updateChart();
    }
    updateChart() {
        const chart = c3.generate({
            bindto: '#chart',
            x: 'x',
            data: {
              columns: this.props.columns,
              type: this.props.chartType,
              colors: {
                Ingredient_Left: '#f05b47',
                Ingredient_Initial: '#349eff',
              },
            },
            axis: {
                x: {
                    type: 'category',
                    categories: ['Bread', 'Lettuce', 'Ham', 'Onions', 'Potatoes', 'Tomatoes'],
                    tick: {
                        rotate: 75,
                        multiline: false,
                    },
                    height: 130,
                },
                y: {
                  label: {
                    text: 'Quantity (lbs.)',
                    position: 'outer-middle',
                  }
                },
              }
        });
    }

    render() {
        return <div id="chart"></div>;

    }
}

export default InventoryBar;

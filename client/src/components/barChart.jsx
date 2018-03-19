import React from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

const data = [
  {
    "id" : 1,
    "ingredient_name" : "Ground Beef",
    "order_number" : "5",
    "ingredient_left" : 6,
    "ingredient_initial" : 11,
    "ingredient_cost" : 5,
    "ingredient_expire" : "03/25/2018",
    "createdAt" : "2018-03-19 14:37:20",
    "updatedAt" : "2018-03-19 14:37:20"
  },
  {
    "id" : 2,
    "ingredient_name" : "Lettuce",
    "order_number" : "6",
    "ingredient_left" : 2,
    "ingredient_initial" : 11,
    "ingredient_cost" : 0,
    "ingredient_expire" : "03/25/2018",
    "createdAt" : "2018-03-19 14:37:20",
    "updatedAt" : "2018-03-19 14:37:20"
  },
  {
    "id" : 3,
    "ingredient_name" : "Tomatoes",
    "order_number" : "10",
    "ingredient_left" : 3,
    "ingredient_initial" : 11,
    "ingredient_cost" : 0,
    "ingredient_expire" : "03/25/2018",
    "createdAt" : "2018-03-19 14:37:20",
    "updatedAt" : "2018-03-19 14:37:20"
  },
  {
    "id" : 4,
    "ingredient_name" : "Onions",
    "order_number" : "9",
    "ingredient_left" : 7,
    "ingredient_initial" : 11,
    "ingredient_cost" : 0,
    "ingredient_expire" : "03/25/2018",
    "createdAt" : "2018-03-19 14:37:20",
    "updatedAt" : "2018-03-19 14:37:20"
  },
  {
    "id" : 5,
    "ingredient_name" : "Ketchup",
    "order_number" : "11",
    "ingredient_left" : 3,
    "ingredient_initial" : 11,
    "ingredient_cost" : 1,
    "ingredient_expire" : "03/25/2018",
    "createdAt" : "2018-03-19 14:37:20",
    "updatedAt" : "2018-03-19 14:37:20"
  },
  {
    "id" : 6,
    "ingredient_name" : "Pickles",
    "order_number" : "8",
    "ingredient_left" : 8,
    "ingredient_initial" : 11,
    "ingredient_cost" : 1,
    "ingredient_expire" : "03/25/2018",
    "createdAt" : "2018-03-19 14:37:20",
    "updatedAt" : "2018-03-19 14:37:20"
  },
  {
    "id" : 7,
    "ingredient_name" : "Coca-Cola Cans",
    "order_number" : "12",
    "ingredient_left" : 10,
    "ingredient_initial" : 100,
    "ingredient_cost" : 0,
    "ingredient_expire" : "03/23/2018",
    "createdAt" : "2018-03-19 14:37:20",
    "updatedAt" : "2018-03-19 14:37:20"
  },
];

const sampleData = data.map(item => (item.ingredient_left));

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount() {
    this.createBarChart()
  }
  componentDidUpdate() {
    this.createBarChart()
  }
  createBarChart() {
    const node = this.node
    const dataMax = max(sampleData)
    const yScale = scaleLinear()
       .domain([0, dataMax])
       .range([0, 200])
  
  select(node)
    .selectAll('rect')
    .data(sampleData)
    .enter()
    .append('rect')
 
  select(node)
    .selectAll('rect')
    .data(sampleData)
    .exit()
    .remove()
 
  select(node)
    .selectAll('rect')
    .data(sampleData)
    .style('fill', '#3e8e41')
    .attr('x', (d,i) => i * 25)
    .attr('y', d => 200 - yScale(d))
    .attr('height', d => yScale(d))
    .attr('width', 25)
  }

  render() {
    return <svg ref={node => this.node = node}
    width={250} height={250}>
    </svg>
  }
}

export default BarChart;


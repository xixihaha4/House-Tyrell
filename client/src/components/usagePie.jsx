import React from 'react';

const c3 = require('c3/c3.js');

const columns = [
    [''],
    []
]

class UsagePie extends React.Component {
    constructor(props) {
        super(props);
        this.updateChart = this.updateChart.bind(this);
    }
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
            columns: columns,
            type: 'bar',
            colors: {
            Sales: '#349eff',
            },
        },
        axis: {
            x: {
            type: 'category',
            categories: ['Brad', 'Christine', 'Harriette', 'Peter', 'Phil', 'Tam'],
            tick: {
                rotate: 75,
                multiline: false,
            },
            height: 130,
            },
            y: {
            label: {
                text: 'Total Sales (dollars)',
                position: 'outer-middle',
            },
            },
        },
        });
    }

    render() {
        return <div id="chart"></div>;
    }
}
  
export default UsagePie;
  
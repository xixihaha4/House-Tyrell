import React from 'react';

const columns = [
    ['My Numbers', 30, 200, 100, 400, 150, 250],
    ['Your Numbers', 50, 20, 10, 40, 15, 25],
];

class c3Bar extends React.Component {
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    updateChart() {
        const chart = c3.generate({
            bindto: '#chart',
            data: {
              columns: this.props.columns,
              type: this.props.chartType
            }
        });
    }

    render() {
        return <div id="chart">chart</div>;

    }
}

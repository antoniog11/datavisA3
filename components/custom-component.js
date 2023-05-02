import React from 'react';
const d3 = require('d3');



/*
class CustomComponent extends React.Component {
  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;

    const { width, height, margin, equations, domain, range } = this.props;

    const xScale = d3.scaleLinear()
      .domain(domain)
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain(range)
      .range([height, 0]);

    const lineGenerator = d3.line()
      .x((d, i) => xScale(d[0]))
      .y(d => yScale(d[1]))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${height - margin.bottom})`}>
          <g className="x-axis" ref={node => d3.select(node).call(xAxis)} />
        </g>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g className="y-axis" ref={node => d3.select(node).call(yAxis)} />
          {equations.map((equation, index) => {
            const data = d3.range(domain[0], domain[1], (domain[1]-domain[0])/500).map(d => [d, equation(d)])
            const path = lineGenerator(data);

            return (
              <path key={index} d={path} fill="none" stroke="black" strokeWidth="2" />
            );
          })}
        </g>
      </svg>
    );
  }
}
*/

class CustomComponent extends React.PureComponent {
  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;

    const { width, height, margin, equations, domain, range } = this.props;

    const xScale = d3.scaleLinear()
      .domain(domain)
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain(range)
      .range([height, 0]);

    const lineGenerators = equations.map((eq, i) => 
      d3.line()
        .x((d, i) => xScale(d[0]))
        .y(d => yScale(d[1]))
        .curve(d3.curveCatmullRom.alpha(0.5))
    );

    const paths = equations.map((eq, i) => {
      const data = d3.range(domain[0], domain[1], (domain[1]-domain[0])/500).map(d => [d, eq(d)]);
      return lineGenerators[i](data);
    });

    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    const colors = d3.schemeCategory10;

    return (
      <svg width={width} height={height}>
        {equations.map((eq, i) => (
          <g key={i} transform={`translate(${margin.left}, ${margin.top})`}>
            <g className="y-axis" ref={node => d3.select(node).call(yAxis)} />
            <path d={paths[i]} fill="none" stroke={colors[i % colors.length]} strokeWidth="2" />
          </g>
        ))}
        <g transform={`translate(${margin.left}, ${height - margin.bottom})`}>
          <g className="x-axis" ref={node => d3.select(node).call(xAxis)} />
        </g>
      </svg>
    );
  }
}


export default CustomComponent;


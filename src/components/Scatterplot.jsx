import React from 'react';
import { useD3 } from '../hooks/useD3';
import * as d3 from 'd3';
import formatData from '../helpers/formatData';

const Scatterplot = ({ data }) => {
  console.log('building graph');

  // input: data, lat, lon
  // output: [{ name, mass, year, distance } ... ]
  const formattedData = formatData(data, 50.775 , 6.08333 ); 
  console.log(formattedData);

  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 900;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const barWidth = width / data.length;

      const y = d3.scaleLinear()
        .domain([
          0,
          Math.max(
            d3.max(data),
          )
        ])
        .range([0, height - 10])
        .rangeRound([height - margin.bottom, margin.top]);

      const y1Axis = d3.axisLeft()
        .scale(y);

      svg.select('.y-axis')
        .attr("transform", `translate(${margin.left},0)`)
        .call(y1Axis);

      const x = d3.scaleLinear()
        .domain([255, 0])
        .range([255, 0])
        .rangeRound([width - margin.right, margin.left]);

      const xAxis = d3.axisBottom()
        .scale(x);

      svg.select('.x-axis')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(xAxis);

      svg
        .select('.plot')
        .attr("fill", "#ff0000")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr('x', (d, i) => x(i))
        .attr('y', (d, i) => y(d))
        .attr('height', (d) => y(0) - y(d))
        .attr('width', barWidth);
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: '100%',
        marginRight: '0px',
        marginLeft: '0px',

      }}
    >
      <g className='plot' />

      <g className='x-axis' />
      <g className='y-axis' />
    </svg>
  );
}

export default Scatterplot;
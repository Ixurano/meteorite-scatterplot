import React from 'react';
import { useD3 } from '../hooks/useD3';
import * as d3 from 'd3';


const Scatterplot = ({ data }) => {
  const ref = useD3(initiateGraph, [data.lenght]);

  console.log('building graph');
  console.log(data);

  const height = 500;
  const width = 900;
  const margin = { top: 50, right: 30, bottom: 30, left: 70 };

  const x = d3.scaleLinear()
    .domain([
      d3.max(data, function (d) { return +d.distance; }), 0
    ])
    .range([0, width - 10])
    .rangeRound([width - margin.right, margin.left]);

  const y = d3.scaleSymlog()
    .domain([
      0, d3.max(data, function (d) { return +d.mass; }) 
    ])
    .range([0, height - 10])
    .rangeRound([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom()
    .scale(x);

  const y1Axis = d3.axisLeft()
    .scale(y);


  // This function draws the graph one time at the start 
  function initiateGraph() {
    d3.select(ref.current).selectAll("circle").remove();

    d3.select(ref.current).select('.y-axis')
      .attr("transform", `translate(${margin.left},0)`)
      .call(y1Axis);

    d3.select(ref.current).select('.x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    d3.select(ref.current)
      // .append("g")
      // .attr("stroke", "blue")
      // .attr("stroke-width", 1.5)
      // .attr("fill", "none")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.distance))
      .attr("cy", d => y(d.mass ? d.mass : 0))
      .attr("id", d => d.name + ' :distance ' + d.distance + ' :mass ' + d.mass + ' :year ' + d.year)
      .attr("r", 1.5)

    // svg.call(d3.zoom()
    //   .extent([[0, 0], [width, height]])
    //   .scaleExtent([1, 10])
    //   .on("zoom", zoomed));
    // function zoomed({ transform }) {
    //   svg.attr("transform", transform);
    d3.select(ref.current).exit().remove()
  }

  // this function updates the graph when new data get loaded  
  const updateGraph = () => {
    d3.select(ref.current)
      .selectAll("circle")
      .data(data)
      .transition()
      .duration(1000)
      .attr("cx", d => x(d.distance))
      .attr("cy", d => y(d.mass ? d.mass : 0))
      .attr("id", d => d.name + ' :distance ' + d.distance + ' :mass ' + d.mass + ' :year ' + d.year)
      .attr("r", 1.5)
  }

  updateGraph();

  return (
    <svg
      ref={ref}
      style={{
        height: 600,
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
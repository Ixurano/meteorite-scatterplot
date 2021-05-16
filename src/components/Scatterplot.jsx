import React from 'react';
import { useD3 } from '../hooks/useD3';
import * as d3 from 'd3';
import { Slider } from '@material-ui/core';


const Scatterplot = ({ data }) => {
  const [value, setValue] = React.useState(d3.max(data, function (d) { return +d.year; }));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const ref = useD3(initiateGraph, [data.lenght]);
  const height = 500;
  const width = 900;
  const margin = { top: 50, right: 30, bottom: 30, left: 30 };

  console.log('building graph');
  console.log(data);

  const x = d3.scaleLinear()
    .domain([d3.max(data, function (d) { return +d.distance; }), 0])
    .range([0, width - 10])
    .rangeRound([width - margin.right, margin.left]);

  const y = d3.scaleLog()
    .domain([1, d3.max(data, function (d) { return +d.mass; })])
    .range([0, height - 10])
    .rangeRound([height - margin.bottom, margin.top]);

  const xAxis = d3.axisBottom()
    .scale(x)

  const y1Axis = d3.axisLeft()
    .scale(y)
    .ticks(20, "~s")

  const grid = g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
      .selectAll("line")
      .data(x.ticks())
      .join("line")
      .attr("x1", d => 0.5 + x(d))
      .attr("x2", d => 0.5 + x(d))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
    )
    .call(g => g.append("g")
      .selectAll("line")
      .data(y.ticks())
      .join("line")
      .attr("y1", d => 0.5 + y(d))
      .attr("y2", d => 0.5 + y(d))
      .attr("x1", margin.left)
      .attr("x2", width - margin.right));


  // This function draws the graph one time at the start 
  function initiateGraph() {
    d3.select(ref.current).select('.y-axis')
      .call(y1Axis)
      .attr("transform", `translate(${margin.left},0)`)
      .append("text")
      .attr("x", -margin.left)
      .attr("y", 30)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("massa(g)");

    d3.select(ref.current).select('.x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .append("text")
      .attr("x", width)
      .attr("y", margin.bottom - 4)
      .attr("fill", "currentColor")
      .attr("text-anchor", "end")
      .text("km");

    d3.select(ref.current)
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.distance))
      .attr("cy", d => y(d.mass ? d.mass : 0))
      .attr("id", d => d.name + ' :distance ' + d.distance + ' :mass ' + d.mass + ' :year ' + d.year)
      .attr("r", 1.5)
      .attr("fill", "#1976d2")

    d3.select(ref.current).call(grid);

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
      .attr("cy", d => y(d.mass ? d.mass : 1))
      .attr("id", d => d.name + ' :distance ' + d.distance + ' :mass ' + d.mass + ' :year ' + d.year)
      .attr("r", d => value > d.year ? 0.5 : 1.5)
      .attr("fill", d => value > d.year ? "#999" : "#1976d2");

    d3.select(ref.current).select('.x-axis')
      .transition()
      .duration(1000)
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    d3.select(ref.current).exit().remove().call(grid);
  }

  updateGraph();

  return (
    <div>
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
      <Slider
        track="inverted"
        value={value}
        onChange={handleChange}
        min={d3.min(data, function (d) { return +d.year; })}
        max={d3.max(data, function (d) { return +d.year; })}
        marks={[
          {
            value: 1000,
            label: '1000 AD',
          },
          {
            value: 1500,
            label: '1500 AD',
          },
          {
            value: 2000,
            label: '2000 AD',
          },
        ]}
        valueLabelDisplay="auto"
        aria-labelledby="continuous-slider"
      />
    </div>
  );
}

export default Scatterplot;
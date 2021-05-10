import React from 'react';
import { useD3 } from '../hooks/useD3';
import * as d3 from 'd3';

const Scatterplot = ({ data }) => {
  console.log('building graph');
  console.log(data);


  const exampleData = [
    {
      "name" : "Aachen", 
      "id" : "1", // unique identifier
      "nametype": "Valid",  // valid or relict (e.g. has it been preserved or weathered)
      "recclass": "L5", // classification based on composition, size, etc 
      "mass": "21", // mass in grams
      "fall": "Fell", // if it was seen faling or found on the ground
      "year": "1880-01-01T00:00:00.000",  // What year it fell if data is available
      "reclat": "50.775000", // differnet formats of spatial data
      "reclong": "6.083330",
      "geolocation":
      {
        "latitude": "50.775",
        "longitude": "6.08333"
      }
    },
    {
      "name": "Aarhus",
      "id": "2",
      "nametype": "Valid",
      "recclass": "H6",
      "mass": "720",
      "fall": "Fell",
      "year": "1951-01-01T00:00:00.000",
      "reclat": "56.183330",
      "reclong": "10.233330",
      "geolocation":
      {
        "latitude": "56.18333",
        "longitude": "10.23333"
      }
    }
  ];





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
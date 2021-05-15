import React from 'react';
import { useD3 } from '../hooks/useD3';
import * as d3 from 'd3';


const Scatterplot = ({ data }) => {
  console.log('building graph');
  console.log(data);



  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 900;
      const margin = { top: 50, right: 30, bottom: 30, left: 50 };

      const y = d3.scaleLinear()
        .domain([
          0,
          //4000000
          //data.reduce((data,b)=>data.mass>b.mass?data:b).mass + 10000
          //d3.max(data, function(d){return d[mass]})
          //Math.max(...data.map(o => o.mass), 0)
           console.log(  Math.max(...data.map(o => o.mass), 0))
          //console.log( Math.max(...data.map(d => d.mass)))
        ])
        .range([0,  height - 10])
        .rangeRound([height - margin.bottom, margin.top]);

      const y1Axis = d3.axisLeft()
        .scale(y);

      svg.select('.y-axis')
        .attr("transform", `translate(${margin.left},0)`)
        .call(y1Axis);

      const x = d3.scaleLinear()
        .domain([
          data.reduce((data,b)=>data.distance>b.distance?data:b).distance,
          0
        ])
        .range([0, width - 10])
        .rangeRound([width - margin.right, margin.left]);

      const xAxis = d3.axisBottom()
        .scale(x);

      svg.select('.x-axis')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(xAxis);

      svg.append("g")
        .attr("stroke", "blue")
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.distance))
        .attr("cy", d => y(d.mass ? d.mass : 0))
        .attr("id", d => d.name + ' : ' + d.distance + ' : ' + d.mass + ' : ' + d.year)
        .attr("r", 1.5);
    },
    [data.length]
  );

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
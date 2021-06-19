function drawChart(container, data){
    const chartWidth = 400;
    const chartHeight = 400;

    const xScale = d3.scaleLinear().domain(d3.extent(dataset, d => d.Time)).range([0, width])
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yScale = d3.scaleLinear().domain(d3.extent(dataset, d => d.h1)).range([height, 0])
    const yAxis = d3.axisLeft(yScale).ticks(5);

    const lineh1 = d3.line()
                   .defined(d => !isNaN(d.h1))
                   .x(d => xScale(d.Time))
                   .y(d => yScale(d.h1))

    const lineh2 = d3.line()
                   .defined(d => !isNaN(d.h2))
                   .x(d => xScale(d.Time))
                   .y(d => yScale(d.h2))

    // First and only difference, instead of creating SVG, we are appending it to container
    const svg = d3.select(container).append('svg')
                 .attr('width',chartWidth)
                 .attr('height',chartHeight)

    svg.append('g')
       .attr('class', 'x axis')
       .call(xAxis)
       .attr('transform', `translate(0,${height})`);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)

    svg.append('path')
       .datum(dataset)
       .attr('fill', 'none')
       .attr('stroke', 'steelblue')
       .attr('stroke-width', 1.5)
       .attr('stroke-linejoin', 'round')
       .attr('stroke-linecap', 'round')
       .attr('d', lineh1)

    svg.append('path')
       .datum(dataset)
       .attr('fill', 'none')
       .attr('stroke', 'orange')
       .attr('stroke-width', 1.5)
       .attr('stroke-linejoin', 'round')
       .attr('stroke-linecap', 'round')
       .attr('d', lineh2)
}
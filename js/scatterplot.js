const drawScatterplot = (data) => {
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  innerChartS = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const starExtent = d3.extent(data, d => d.star);
  const energyExtent = d3.extent(data, d => d.energyConsumption);
  xScaleS
    .domain([starExtent[0] - 0.5, starExtent[1] + 0.5])
    .range([0, innerWidth]);
  yScaleS
    .domain(energyExtent)
    .range([innerHeight, 0])
    .nice();

  const uniqueTechs = [...new Set(data.map(d => d.screenTech))];
  colorScale
    .domain(uniqueTechs)
    .range(d3.schemeCategory10);

  innerChartS.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 4)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5)
    .attr("stroke", "none");

  innerChartS.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScaleS));

  svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "end")
    .attr("x", width - 20)
    .attr("y", height - 5)
    .text("Star Rating");

  innerChartS.append("g")
    .call(d3.axisLeft(yScaleS));

  svg.append("text")
    .attr("class", "axis-label")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 20)
    .text("Labeled Energy Consumption (kWh/year)");

  const legend = innerChartS.selectAll(".legend")
    .data(uniqueTechs)
    .join("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(${innerWidth - 70},${i * 22})`);

  legend.append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", d => colorScale(d));

  legend.append("text")
    .attr("x", 18)
    .attr("y", 6)
    .attr("dominant-baseline", "middle")
    .text(d => d);
};

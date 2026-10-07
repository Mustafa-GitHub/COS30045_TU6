const populateFilters = (data) => {
	let currentTech = filters_screen.find(filter => filter.isActive).id;
	let currentSize = filters_size.find(filter => filter.isActive).id;

	const updateHistogram = () => {
		const filteredData = data.filter(d =>
			(currentTech === "all" || d.screenTech === currentTech) &&
			(currentSize === "all" || d.screenSize === currentSize)
		);
		const bins = binGenerator(filteredData);

		d3.select("#histogram")
			.selectAll("rect")
			.data(bins)
			.transition()
			.duration(500)
			.ease(d3.easeCubicInOut)
			.attr("y", d => yScale(d.length))
			.attr("height", d => innerHeight - yScale(d.length));
	};

	const techButtons = d3.select("#filters_screen")
		.selectAll("button")
		.data(filters_screen)
		.join("button")
		.attr("class", "filter")
		.classed("active", d => d.isActive)
		.text(d => d.label)
		.on("click", (event, d) => {
			if (d.isActive) return;

			currentTech = d.id;
			filters_screen.forEach(filter => {
				filter.isActive = filter.id === d.id;
			});

			techButtons.classed("active", filter => filter.isActive);
			updateHistogram();
		});

	const sizeButtons = d3.select("#filters_size")
		.selectAll("button")
		.data(filters_size)
		.join("button")
		.attr("class", "filter")
		.classed("active", d => d.isActive)
		.text(d => d.label)
		.on("click", (event, d) => {
			if (d.isActive) return;

			currentSize = d.id;
			filters_size.forEach(filter => {
				filter.isActive = filter.id === d.id;
			});

			sizeButtons.classed("active", filter => filter.isActive);
			updateHistogram();
		});
};

const createTooltip = () => {
	const tooltip = innerChartS.append("g")
		.attr("class", "tooltip")
		.style("opacity", 0)
		.style("pointer-events", "none");

	tooltip.append("rect")
		.attr("width", tooltipWidth)
		.attr("height", tooltipHeight)
		.attr("rx", 3)
		.attr("ry", 3)
		.attr("fill", barColor)
		.attr("fill-opacity", 0.75);

	tooltip.append("text")
		.text("NA")
		.attr("x", tooltipWidth / 2)
		.attr("y", tooltipHeight / 2 + 2)
		.attr("text-anchor", "middle")
		.attr("alignment-baseline", "middle")
		.attr("fill", "white")
		.attr("font-weight", 900);
};

const handleMouseEvents = () => {
	innerChartS.selectAll("circle")
		.on("mouseenter", (e, d) => {
			console.log(d);
			innerChartS.select(".tooltip text")
				.text(d.screenSize + '"');

			const cx = Number(e.target.getAttribute("cx"));
			const cy = Number(e.target.getAttribute("cy"));
			innerChartS.select(".tooltip")
				.attr("transform", `translate(${cx - 0.5 * tooltipWidth},${cy - 1.5 * tooltipHeight})`)
				.transition()
				.duration(200)
				.style("opacity", 1);
		})
		.on("mouseleave", (e, d) => {
			console.log(d);
			innerChartS.select(".tooltip")
				.style("opacity", 0)
				.attr("transform", "translate(0, 500)");
		});
};

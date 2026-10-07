const populateFilters = (data) => {
	const updateHistogram = (filterId, data) => {
		const filteredData = filterId === "all"
			? data
			: data.filter(d => d.screenTech === filterId);
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

	const buttons = d3.select("#filters_screen")
		.selectAll("button")
		.data(filters_screen)
		.join("button")
		.attr("class", "filter")
		.classed("active", d => d.isActive)
		.text(d => d.label)
		.on("click", (event, d) => {
			if (d.isActive) return;

			filters_screen.forEach(filter => {
				filter.isActive = filter.id === d.id;
			});

			buttons.classed("active", filter => filter.isActive);
			updateHistogram(d.id, data);
		});
};

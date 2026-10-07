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

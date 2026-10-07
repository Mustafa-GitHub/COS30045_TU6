function convertRow(row) {
	return {
		brand: row.brand,
		model: row.model,
		screenSize: Number(row.screenSize),
		screenTech: row.screenTech,
		energyConsumption: Number(row.energyConsumption),
		star: Number(row.star)
	};
}

d3.csv("data/Ex6_TVdata.csv", convertRow)
	.then(function (data) {
		console.log(data);
		drawHistogram(data);
		drawScatterplot(data);
		populateFilters(data);
	})
	.catch(function (error) {
		console.error("Error loading the CSV file:", error);
	});

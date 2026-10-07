// Spacing around the plot inside the SVG.
const margin = { top: 40, right: 30, bottom: 50, left: 70 };

// Width of the overall SVG in pixels.
const width = 800;
// Height of the overall SVG in pixels.
const height = 400;

// Plot width after removing the horizontal margins.
const innerWidth = width - margin.left - margin.right;
// Plot height after removing the vertical margins.
const innerHeight = height - margin.top - margin.bottom;

// Fill color used for histogram bars.
const barColor = "#606464";

// Matches the --bg page background in css/base.css.
const bodyBackgroundColor = "#fbf2e8";

// Linear scale for the histogram's horizontal axis.
const xScale = d3.scaleLinear();
// Linear scale for the histogram's vertical axis.
const yScale = d3.scaleLinear();

// Fixed energy domain and thresholds keep bins consistent across filters.
const binGenerator = d3.bin()
	.value(d => d.energyConsumption)
	.domain([0, 1800])
	.thresholds(d3.range(200, 1800, 200));

// Available screen technology filters and their initial active state.
const filters_screen = [
	{ id: "all", label: "All", isActive: true },
	{ id: "LED", label: "LED", isActive: false },
	{ id: "LCD", label: "LCD", isActive: false },
	{ id: "OLED", label: "OLED", isActive: false }
];

// Available screen-size filters and their initial active state.
const filters_size = [
	{ id: "all", label: "All Sizes", isActive: true },
	{ id: 24, label: '24"', isActive: false },
	{ id: 32, label: '32"', isActive: false },
	{ id: 55, label: '55"', isActive: false },
	{ id: 65, label: '65"', isActive: false },
	{ id: 98, label: '98"', isActive: false }
];

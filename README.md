# TV Energy Consumption – Interactive Histogram and Scatterplot (COS30045 Tutorial 6)

**Name:** Muhammad Mustafa ADIL  
**Student ID:** 104402516

## About
This page shows a histogram of TV energy consumption with screen-type filter buttons. It also has a scatterplot of energy consumption by star rating, colour-coded by screen type, with a tooltip showing screen size.

**Live site:** https://cos30045tu6.vercel.app/

## Run locally
Open this folder in VS Code and run `index.html` with the Live Server extension. `d3.csv` needs a local web server and will not load if you open the file by double-clicking it.

## Files
- `index.html` – Page structure and script loading order.
- `css/base.css` – Base page layout, typography, and button styles.
- `css/visualisations.css` – Chart container and axis-label styles.
- `data/Ex6_TVdata.csv` – Television energy rating data.
- `js/shared-constants.js` – Shared chart settings, scales, and filter options.
- `js/load-data.js` – Loads and converts the CSV data.
- `js/histogram.js` – Draws the histogram.
- `js/interactions.js` – Filter buttons and scatterplot tooltip interactions.
- `js/scatterplot.js` – Draws the scatterplot and legend.

## Data source
Energy Rating Data for household appliances – Televisions, data.gov.au. Downloaded Jan 2025.

## References
- Dufour and Meeks (2024).
- D3.js v7: https://d3js.org/d3.v7.min.js

## GenAI acknowledgement
GitHub Copilot was used to generate and review the code. I tested, edited, and checked it myself.

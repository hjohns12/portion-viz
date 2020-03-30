// import our components
// import { Table } from "./Table.js";
// import { Boxplot } from "./Boxplot.js";
import { Histogram } from "./Histogram.js";

// let table, boxplot, Histogram;
let histogram;

// global state
let state = {
  data: [],
};

function type(d) {
    if (!d.eg) return;
    d.eg = +d.eg;
    return d;
}

d3.csv("../data/sampled-plans.csv", type).then(data => {
  console.log("data", data);
  state.data = data;
//   state.domain = [
//     0, 
//     d3.max(data
//       .map(d => [d["Age < 20"], d["Age 20-65"], d["Age 65+"]])
//       .flat()
//     )]
  init();
});

function init() {
//   table = new Table(state, setGlobalState);
//   boxplot = new Boxplot(state, setGlobalState);
  histogram = new Histogram(state, setGlobalState);
  draw();
}

function draw() {
//   table.draw(state);
//   boxplot.draw(state, setGlobalState);
  histogram.draw(state, setGlobalState);
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}

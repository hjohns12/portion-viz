class Explainer {
    constructor() {


        d3.select("#explainer").append("p").text(
            `This visualization displays an ensemble of districting plans in the state of Missouri. Every dot 
            represents a possible congressional redistricting plan for the state of Missouri. I 
            generated one million maps using Markov Chain Monte Carlo sampling, first by checking that each 
            district in the plan was contiguous, and next by requiring that districts had nearly-equal population. 
            I randomly selected 1,000 plans from each ensemble for this visualization. 
            `
            ).append("p").text(` 
            The efficiency gap is a method for measuring partisan gerrymanding. Anything above or below 0.7 is 
            considered extreme. To explore the data, click on a dot from one graph to observe its corresponding value in the other.`
            )

    }
}

export { Explainer};
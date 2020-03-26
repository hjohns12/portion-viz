# portion-viz

For my Interactive Data Visualization class, I'm creating an exploratory visualization of possible district maps in the state of Missouri and their corresponding efficiency gaps. A bill was recently introduced in Missouri to raise the efficiency gap cap to 15%. I want this visualization to help citizens put that value into context. 

For the data, I will build an ensemble of districting plans using Markov chain Monte Carlo sampling. Comparing all of the possible plans and their corresponding efficiency gaps provides a visual tool for showing whether or not a certain plan is an outlier among the sampled plans. 

The main visual components will be a histogram and a series of box-and-whisker plots, and a table. The histogram will have bars of stacked dots, where each dot represents a plan from the ensemble. The dot will be colored by its partisan lean. When a user hovers over the dot, information will appear about the seat share and vote share for that plan. The box-and-whisker plots will display D/R voteshare for each congressional district in Missouri. 

I also want to highlight cases where a plan was struck down by state or federal counts because it was deemed unconstitutional. These plans will be highlighted in a different color, yellow, and when an invidual hovers over them a table with information about that case will appear. 

A user can select different parameters for the sampling plan: whether or not to preserve county boundaries when drawing plans, the range of compactness, and whether or not the equal population constraint is to be applied. When the constraint is selected, all of the data underlying the box-and-whisker plots and histogram will change. 

The user for this might be a policymaker or citizen with questions about the redistricting in Missouri. It could also be a journalist who wants help understanding these issues. 



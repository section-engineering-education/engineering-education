---
layout: engineering-education
status: publish
published: true
url: /simulating-a-simple-epidemic-spreading-process-on-graphs/
title: Simulating a Simple Epidemic Spreading Process on Graphs with Julia
description: In this tutorial the reader will learn how to create a simple epidemic spreading simulation using Julia and model the spreading using a Graph.
author: samuel-santos
date: 2022-02-07T01:00:00-15:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/simulating-a-simple-epidemic-spreading-process-on-graphs/hero.png
    alt: Simulating a Simple Epidemic Spreading Process on Graphs with Julia Hero Image
---
Graphs are structures that represent a set of objects and the relations between them. 
<!--more-->
Formally, we say the objects are the vertices or nodes and the relations are the edges or links. We can often see graphs *appearing* around us. 

For example:
- vertices are cities and edges are roads that directly connect two cities;
- vertices are pages on the Web and edges are links that connect two pages;
- vertices are people and edges are the friendships between two individuals.

Those are just some of the applications of graphs — the list is huge. 

We usually represent graphs visually drawing the vertices as circles and the edges as lines connecting two circles. 

For example:

![graph-example](/engineering-education/simulating-a-simple-epidemic-spreading-process-on-graphs/graph0.png)
Source: [Wikipedia](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)#/media/File:6n-graf.svg)

That is a graph with the vertices `{1, 2, 3, 4, 5, 6}` and the edges `{(1, 2), (1, 5), (2, 5), (2, 3), (3, 4), (4, 5), (4, 6)}`. 

In this tutorial, we are going to use a Graph to model a epidemic spreading.

### Table of Contents
- [Prerequisites](#prerequisites)
- [The Spreading Dynamics](#the-spreading-dynamics)
- [Step 1: Setting things up](#step-1-setting-things-up)
- [Step 2: Creating and Plotting a Simple Graph](#step-2-creating-and-plotting-a-simple-graph)
- [Step 3: Setting and Getting the Props](#step-3-setting-and-getting-the-props)
- [Step 4: Programming the Dynamics](#step-4-programming-the-dynamics)
- [Step 5: Generating an Animation](#step-5-generating-an-animation)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
For this tutorial, the reader will need:

- To have [Julia](https://julialang.org/) installed.
- Have [Jupyter-lab](https://julialang.org/) installed.
- [FFmpeg](https://www.ffmpeg.org/) installed and added to Path (optional — only to generate the animations).
- Basic programming knowledge.
- Notions of [Graphs](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)).

It’s good if you also have some background in Julia, but if you don’t that’s not a problem! If you have some programming knowledge, you won’t have major difficulties understanding what the code snippets are doing.

### The spreading dynamics
Thanks to the nature of graphs, that is, the representation of pairwise interactions/relations, they are good structures to model the spreading of an epidemic. We can represent the individuals (people or animals, for example) as the vertices, and the contact/exposure as the edges.

We are going to model the epidemic as follows:

- Every vertex will be in one of the following states:
  - S — Susceptible
  - I — Infected
  - R — Recovered
- At each time step:
  - Some exposed susceptible vertices (neighbors of the previously infected vertices) are going to be infected.
  - The previously infected vertices will recover and will no longer be susceptible or infectious.

That’s a simple model and it’s actually meant to be! But at the end of the tutorial, you will be able to make your own modifications and add new features or dynamics as you want.

### Step 1: Setting things up
First things first, let’s install the modules we need. For this project, we are going to need the following packages:

- [Graphs.jl](https://github.com/JuliaGraphs/Graphs.jl)
- [MetaGraphs.jl](https://github.com/JuliaGraphs/MetaGraphs.jl)
- [Plots.jl](http://docs.juliaplots.org/latest/)
- [GraphPlot.jl](https://github.com/JuliaGraphs/GraphPlot.jl)
- [StatsBase.jl](https://github.com/JuliaStats/StatsBase.jl)
- [Cairo.jl](https://github.com/JuliaGraphics/Cairo.jl)
- [Fontconfig.jl](https://github.com/JuliaGraphics/Fontconfig.jl)
- [Compose.jl](https://giovineitalia.github.io/Compose.jl/latest/)

Open your terminal and type:

```bash
> julia
> using Pkg
> Pkg.add("Graphs")
> Pkg.add("MetaGraphs")
> Pkg.add("Plots")
> Pkg.add("GraphPlot")
> Pkg.add("StatsBase")
> Pkg.add("Cairo")
> Pkg.add("Fontconfig")
> Pkg.add("Compose")
> exit()
```

After installing the packages, then open up Jupyter-lab:

```bash
> jupyter-lab
```

Create a new Julia notebook for this tutorial and let’s go to the next step!

### Step 2: Creating and plotting a simple graph
If we needed to manipulate just simple graphs, the Graphs.jl package would be enough. But, as we saw earlier, each vertex needs some meta-data: its state. So we also need the MetaGraphs.jl package. Let’s import them:

```julia
using Graphs, MetaGraphs
```

Create your first graph:

```julia
G = MetaGraph()
```

You’ll see that this graph is a `{0, 0} undirected Int64 metagraph`. That means `G` has `0` vertices and `0` edges and it’s undirected — its edges aren’t *“one-way”*. Now let’s add some vertices and some edges:

```julia
# adding 6 new vertices
add_vertices!(G, 6)
```

```julia
# creating edges
add_edge!(G, 1, 2)
add_edge!(G, 1, 3)
add_edge!(G, 2, 3)
add_edge!(G, 3, 4)
add_edge!(G, 4, 5)
add_edge!(G, 5, 6)
```

>Note the `!` in front of the functions’ names. That’s a convention. We say the functions with a `!` modify its arguments. In this case, `add_vertices!` and `add_edge!` are modifying the graph `G` by adding new vertices and new edges.

Let’s visualize our graph. Import `GraphPlot`:

```julia
using GraphPlot
```

To plot a Graph is very simple. 

Just run:

```julia
# plotting the Graph
gplot(G)
```

And you should see something *(maybe not exactly)* like that:

![Our first graph!](/engineering-education/simulating-a-simple-epidemic-spreading-process-on-graphs/graph1.png)

Our first graph!

### Step 3: Setting and getting the props
Until now, we only have a simple graph with no additional information. We add meta-data to a vertex `v` by passing a dictionary with the desired information to `set_props!`. Let’s write a function to set the state of all vertices in `G` to `S` (Susceptible).

```julia
function init_nodes_states!(G)
    for v in vertices(G)
        set_props!(G, v, Dict(:state=>"S", :color=>"yellow"))
    end
end
```

With `init_nodes_states!` we set the state of all vertices of a graph `G` to `S` (susceptible). 

>Note that we are also adding the information `color`. That’s for visualization purposes. Let’s convention this way:

- Yellow: susceptible
- Red: infected
- Blue: recovered

Let’s apply `init_nodes_states!` to `G`:

```julia
init_nodes_states!(G)
```

To check all the props for a given vertex, let’s say vertex 1, we can run:

```julia
# checking a prop for a vertex
MetaGraphs.props(G, 1)
```

This should return:

```bash
Dict{Symbol,Any} with 2 entries:
  :color => "yellow"
  :state => "S"
```

We can also get a specific prop, let’s say `color`, using `get_prop`:

```julia
get_prop(G, 1, :color)
```

This code returns the prop `:color` of the vertex `1` from the graph `G`.

Let’s plot our graph with the new colors:

```julia
function plot_graph(G)
    fillcolors = [get_prop(G, i, :color) for i in vertices(G)]
    return gplot(G, nodefillc=fillcolors, layout=spectral_layout)
end
```

```julia
plot_graph(G)
```

In `plot_graph` we are computing the `color` prop for each vertex in `G` and passing the colors to the `nodefillc` parameter of `gplot`. We are also using the `spectral_layout` now. According to [NetworkLayout.jl website](https://juliagraphs.org/NetworkLayout.jl/stable/#Spectral-Layout), this is *“an under-appreciated method of graph layouts; easier, simpler, and faster than the more common spring-based methods”*. Besides, the standard *(spring-based)* layout method generates different graphs each time, and that’s not good for our visualizations.

### Step 4: Programming the Dynamics
We now know how to create, manipulate, and plot graphs. Now we need to program the dynamics. Our dynamics will function in a steps manner. We already outlined what happens at each step (if you don’t remember, refer to The Spreading Dynamics section). So we know how our function would look like:

```julia
function update_nodes!()
    # compute the neighbors of the infected vertices that are susceptible
    # update the infected vertices (I -> R)
    # infect (S -> I) a subset of susceptible neighbors of infected vertices based on some rule
end
```

We can compute the state of the vertices (nodes) by looping through `vertices(G)`:

```julia
function get_nodes_state(G)
    S = [] # susceptible
    I = [] # infected
    R = [] # recovered
    for v in vertices(G)
        state = get_prop(G, v, :state)
        if state=="S"
            push!(S, v)
        elseif state=="I"
            push!(I, v)
        else
            push!(R, v)
        end
    end
    return S, I, R
end
```

In `get_nodes_state` we are looping through all vertices in `G`, getting their props and assigning them to a list `S`, `I` or `R` according to their `:state`.

First, `update_nodes!` will compute the susceptible neighbors of the infected nodes.

```julia
function update_nodes!(G, I)
    # looping through the infected vertices
    for v in I
        potential_infected_neighbors = []
        # looping through their neighbors
        for u in neighbors(G, v)
            if get_prop(G, u, :state)=="S"
                # a susceptible neighbor goes to potential_infected_neighbors
                push!(potential_infected_neighbors, u)
            end
        end
    end    
end
```

We pass the graph `G` and the list of infected vertices `I` we computed before to `update_nodes!`. It will loop through `I`, computing all the neighbors of the infected vertices and adding them to the list `potential_infected_neighbors` if they are susceptible.

Let’s create two functions to update the vertices state:

```julia
# (I -> R)
function set_node_recovered!(G, node)
    set_props!(G, node, Dict(:state=>"R", :color=>"blue"))
end
```

```julia
# (S -> I)
function set_node_infectious!(G, node)
    set_props!(G, node, Dict(:state=>"I", :color=>"red"))
end
```

The function `set_nodes_recoreved!` will change the props of a vertex to be recovered. In the same way, `set_node_infectious` will change the props of a vertex to infected.

As stated before, the infected nodes in the previous step recovers in the next. So, in `update_nodes!` we can already recover the infected nodes we have computed. Let’s add `set_node_recovered!(G, v)` in `update_nodes!`. This is how it should look like:

```julia
function update_nodes!(G, I)
    # looping through the infected vertices
    for v in I
        # updating the infected nodes
        set_node_recovered!(G, v)

        potential_infected_neighbors = []
        # looping through their neighbors
        for u in neighbors(G, v)
            if get_prop(G, u, :state)=="S"
                # a susceptible neighbor goes to potential_infected_neighbors
                push!(potential_infected_neighbors, u)
            end
        end
    end    
end
```

We are computing the infected nodes, recovering them and getting their susceptible neighbors.

Now we need to set a rule that will say how we should choose the neighbors that will be infected in the next step. Let’s keep it simple: each infected vertex will infect `r` random neighbors. If the vertex has less than `r` neighbors, it infects all its neighbors.

To select the `r` random neighbors, let’s use the `sample` function from `StatsBase` package. Import `StatsBase`:

```julia
using StatsBase
```

We can get a sample of size `r` using `sample(potential_infected_neighbors, r)`. Let’s create a list to store the vertices that are going to be infected and pass the parameter `r` to `update_nodes!`:

```julia
function update_nodes!(G, I, r)
    next_infected_nodes = []

    # rest of function here...
end
```

Now we can add the `potential_infected_neighbors` sample to `next_infected_nodes`. This is how `update_nodes!` should be looking:

```julia
function update_nodes!(G, I, r)
    next_infected_nodes = []

    # looping through the infected vertices
    for v in I
        # updating the infected nodes
        set_node_recovered!(G, v)

        potential_infected_neighbors = []
        # looping through their neighbors
        for u in neighbors(G, v)
            if get_prop(G, u, :state)=="S"
                # a susceptible neighbor goes to potential_infected_neighbors
                push!(potential_infected_neighbors, u)
            end
        end

        # getting the samples
        l = length(potential_infected_neighbors)
        if r <= l
            # if there are more than r neighbors, we add the sample to next_infected_nodes
            union!(next_infected_nodes, sample(potential_infected_neighbors, r))
        else
            # if there are less than r neighbors, all the neighbors will be infected
            union!(next_infected_nodes, potential_infected_neighbors)
        end
    end    
end
```

We are getting a sample of `potential_infected_neighbors` of size `r` if there are more than `r` elements in `potential_infected_neighbors`. If not, then all the vertices in `potential_infected_neighbors` are infected. When we get the sample, we perform a union with `next_infected_nodes` to prevent two repeated vertices to be infected.

Then, we have to infect the `next_infected_nodes` using:

```julia
for v in next_infected_nodes
    set_node_infectious!(G, v)
end
```

In this snippet, we are looping through `next_infected_nodes` that we just computed applying `set_node_infectious!` to each vertex in `next_infected_nodes`. Now we already have the vertices and the infected vertices of the next step.

Now, we have the following `update_nodes!`:

```julia
function update_nodes!(G, I, r)
    next_infected_nodes = []

    # looping through the infected vertices
    for v in I
        # updating the infected nodes
        set_node_recovered!(G, v)

        potential_infected_neighbors = []
        # looping through their neighbors
        for u in neighbors(G, v)
            if get_prop(G, u, :state)=="S"
                # a susceptible neighbor goes to potential_infected_neighbors
                push!(potential_infected_neighbors, u)
            end
        end

        # getting the samples
        l = length(potential_infected_neighbors)
        if r <= l
            # if there are more than r neighbors, we add the sample to next_infected_nodes
            union!(next_infected_nodes, sample(potential_infected_neighbors, r))
        else
            # if there are less than r neighbors, all the neighbors will be infected
            union!(next_infected_nodes, potential_infected_neighbors)
        end
    end    

    for v in next_infected_nodes
        set_node_infectious!(G, v)
    end
end
```

Now let’s create a function to compute the next step and plot the new graph:

```julia
function spreading_plot!(G, r)
    S, I, R = get_nodes_state(G)
    update_nodes!(G, I, r)
    return plot_graph(G)
end
```

In this function, we compute the state of the graph in the next step by running `get_nodes_state` and `update_nodes!`. Then we plot the new state using `plot_graph`.

Now you can infect some vertex, select a value for `r`, and run `spreading_plot!`! Try this:

```julia
set_node_infectious!(G, 1)
r = 1
spreading_plot!(G, r)
```

We infected the vertex `1` in `G`. We also set `r = 1`, meaning every vertex will infect 1 neighbor. Then we compute and plot the next state of the graph using `spreading_plot`.

You should be seeing something like this:

![spreading_plot](/engineering-education/simulating-a-simple-epidemic-spreading-process-on-graphs/graph2.png)

We infected the vertex 1 and ran the spreading process. It has two neighbors, but because `r = 1`, it infected only one of them: the vertex that is red in the figure. The vertex 1 also recovered because in the previous step it was infected. The rest of the vertices are still susceptible.

### Step 5: Generating an animation
It would be nice if we could see the spreading process happening step by step and in a bigger graph, right? So, let’s make this now!

Import these packages:

```julia
using Plots, Cairo, Fontconfig, Compose, Printf
```

Create the animation object:

```julia
anim = Animation()
```

Let’s define a number of steps `t`. This is how many times we are going to run `sreading_plot`.

```julia
t = 10
```

Now we generate the frames for our animation — each frame is a step:

```julia
for i in 1:t
        # getting plot
    p = spreading_plot!(G, r)
    output = compose(p, (context(), Compose.rectangle(-10,-10,20,20), fill("white"), Compose.stroke("black")))

    # saving the frames
    tmpfilename=joinpath(anim.dir, @sprintf("%06d.png",i))
    Compose.draw(PNG(tmpfilename),output)

    # adding the frames to our animation
    push!(anim.frames, tmpfilename)
end
```

We run the code inside the `for` loop `t` times. In this code, we run `spreading_plot` advancing 1 time step of the simulation at each iteration. With `compose` we are adding a white rectangle on the background of the plot. We create a temporary path for the plot file and save the plot to this path. Then we add it to the frames of our animation `anim` in the last line.

To create a gif we do this:

```julia
gif(anim, "spreading_infection.gif", fps = 1)
```

Let’s make this a function! We just have to put everything together on the function `make_anim`:

```julia
function make_anim(G, r, t)
    anim = Animation()
    for i in 1:t
        p = spreading_plot!(G, r)
        output = compose(p, (context(), Compose.rectangle(-10,-10,20,20), fill("white"), Compose.stroke("black")))
        tmpfilename=joinpath(anim.dir, @sprintf("%06d.png",i))
        Compose.draw(PNG(tmpfilename),output)
        push!(anim.frames, tmpfilename)
    end
    return gif(anim, "spreading_infection.gif", fps = 1)
end
```

Now let’s create a bigger graph and see all our work in this tutorial working! Generate a [Watts-Strogatz](https://en.wikipedia.org/wiki/Watts%E2%80%93Strogatz_model) graph with 100 vertices:

```julia
# Watts-Strogatz graph with 100 vertices, 
# expected degree 4 and edges randomized with probability 0.3
G = MetaGraph(watts_strogatz(100, 4, 0.3))
```

Init the vertices states and set the vertex 1 as infectious:

```julia
init_nodes_states!(G)
set_node_infectious!(G, 1)
```

Set `t` and `r` as you would like. For example:

```julia
t = 100
r = 2
```

Now just run:

```julia
make_anim(G, r, τ)
```

You should see something like this:

![Look at how fast the infections grow!](/engineering-education/simulating-a-simple-epidemic-spreading-process-on-graphs/spreading_infection_2.gif)

Look at how fast the infections grow!

### Conclusion
In this tutorial, we learned how to create graphs and manipulate them in Julia using the packages Graphs.jl and MetaGraphs.jl. We also viewed how graphs are a powerful tool for modelling, once it can be used to model relationships between objects or agents. 

Taking advantage of this property of graphs, we created a simple epidemic spreading model. We also learned how to create visualizations of graphs using GraphPlot.jl. Finally, we put it all together creating an animation that shows the epidemic spreading step by step.

That’s it! It’s a really simple model but please take your time to play around with it and make your own modifications. 

Here are some suggestions:
- What if the vertices stayed infectious for more than one time step?
- What happens if the `r` is bigger or smaller?
- What if the contact network changes from time to time?
- What if the infected nodes instead of recovering became susceptible again?
- What if some vertices are immune (for example vaccinated)?

Make your own questions and create your own models!

Happy coding!

### References
- [The Julia Programming Language](https://julialang.org/)
- [Graph (Discrete Mathematics) - Wikipedia](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics))
- [Spreading processes on networks](https://aaronclauset.github.io/courses/5352/csci5352_F21_L9.pdf)

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)

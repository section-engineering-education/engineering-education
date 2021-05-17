---
layout: engineering-education
status: publish
published: true
url: /data-visualization-with-d3js/
title: Data Visualization with D3.js
description: D3 (Data-Driven Documents) is a JavaScript library that allows us to manipulate documents based on data. This tutorial walks through how to visualize data using D3.js.
author: rohan-reddy
date: 2020-07-09T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/data-visualization-with-d3js/hero.jpg
    alt: data visualization example image
---
D3 (Data-Driven Documents) is a JavaScript library that allows us to manipulate documents based on data. With D3, we can bind data to a [DOM](https://www.w3schools.com/js/js_htmldom.asp) element and then apply data-driven transformations to the document. For example, we can create an HTML table from an array of numbers, or create an interactive [SVG](https://www.w3schools.com/graphics/svg_intro.asp) bar chart.
<!--more-->

![intro](/engineering-education/data-visualization-with-d3js/first.png)<br>
You don't need much background knowledge about SVG but feel free to check out the resources listed at the end of this article. To run the examples in this article or play with D3.js, you can use [blockbuilder.org](https://blockbuilder.org) or [Observable](https://observablehq.com), where you can also view others' work and get inspiration.

To use D3 in your local environment, [install](https://github.com/d3/d3/releases/) or insert this snippet:

`<script src="https://d3js.org/d3.v5.min.js"></script>
`

Let's dive in!!

### Selections

```html
<svg>
<rect />
<rect />		// Three Rectangle Elements
<rect />
</svg>
<script>
var data = [100, 250, 175];
var rectWidth = 100 //The width of the bar in a bar graph
var height =200;
d3.selectAll('rect')
	.data(data) // loops through each svg element and sets __data_ attribute
	.attr('x', (d, i) => i * rectWidth) // function is set the x coordinate of each bar, index*width of bar
	.attr('y', d => height - d) // d is the bound data
	.attr('width', rectWidth)
	.attr('height', d => d)
	.attr('fill', 'blue')
	.attr('stroke', '#fff');
</script>
```    
This produces a bar chart:

![bar chart d3 js](/engineering-education/data-visualization-with-d3js/second.png)

`d3.selectAll('rect')`  is a *selector*, which goes and selects all the "rect" elements in the document. Modifying documents using [DOM API](https://www.w3.org/DOM/DOMTR) is tedious and repetetive. With `d3.selectAll()`, we can use any CSS selector to select everything on the DOM.

Under the hood, d3.selection is an array of all the DOM elements wrapped around a powerful API which can be used to set attributes, styles, properties, data and more. This has a `.data()` function which is used to **_bind_** the data to the selections. You can pass an array of data, d3 maps the data one-to-one to the array of selections. The various attributes in the above example are x axis, y axis, width of the bar chart, color and style. d3 loops through each element and returns the value from the function based on the data you passed in.

### Enter-Exit
When joining elements to data by key, there are three possible logical outcomes:
- _Update_  - There was a matching element for a given datum.
- _Enter_  - There was no matching element for a given datum.
- _Exit_  - There was no matching datum for a given element.


In the previous example, we saw that we had to have `n` number of `<rect/>` elements for `n` number of elements of data. Using D3's *enter* and *exit*, we can create new nodes for incoming data and remove nodes that are no longer needed.

```html
<svg></svg>
<script>
var rectWidth = 100;
var height = 300;
var data = [100, 250, 175, 200, 120];

var svg = d3.select('svg');
svg.selectAll('rect')
.data(data)
.enter().append('rect')
.attr('x', (d, i) => i * rectWidth)
.attr('y', d => height - d)
.attr('width', rectWidth)
.attr('height', d => d)
.attr('fill', function(d){
	if (d === 250){
		return "blue";
	}
	else{
		return "red";
	}
})
.attr('stroke', '#fff');
</script>
```
![d3 js enter exit](/engineering-education/data-visualization-with-d3js/enter.png)<br>
We have an empty selection `svg ` to which we are creating a `rect` element and appending it to the DOM for every iteration through the data. This can be very useful if the data is changing because we can change different properties based on data by writing functions in the `.attr()` functions.

If we simply want to ***update*** a DOM element rather than adding new elements, we do this by:

```javascript
var p = d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
    .text(function(d) { return d; });
```
**Exit** selections are used when the data is less than the number of DOM elements. For example, if the number of elements in the array is less than the number of `rect` elements in the DOM, then we can perform operations on those excess elements, such as removing them.
```javascript
d3.select('#content')
	.selectAll('div')
	.data(myData)
	.exit()
	.remove();
```
### Transitions
**Without Transitions**

![d3 js without transitions](/engineering-education/data-visualization-with-d3js/without.gif)<br>
**With Transitions**

![ds js with transitions](/engineering-education/data-visualization-with-d3js/with.gif)<br>
A transition is an interface for animating changes to the DOM. Instead of applying changes instantaneously, transitions interpolate smoothly over time, from a state-A to the desired state-B.

If we want the result to be immediate then we can do :
```javascript
d3.select("body").style("color", "red");
```

To, instead, animate the change over time, derive a transition:
```javascript
d3.select("body").transition().style("color", "red");
```

We will discuss one way of doing transitions in this article.
```javascript
var t = d3.transition().duration(1000); // we can declare a constant or function anywhere
var svg = d3.select('svg');
	var bars = svg.selectAll('rect') .data(data, d => d);
	// exit
	bars.exit()
		.transition(t)
		.attr('y', height)
		.attr('height', 0)
		.remove();
// enter
	var enter = bars.enter()
				.append('rect')
				.attr('width', rectWidth)
				.attr('stroke', '#fff')
				.attr('y', height);
// enter + update
bars = enter.merge(bars)
			.attr('x', (d, i) => i * rectWidth)
			.attr('fill', d => colors(d))
			.transition(t) .attr('y', d => height - d)
			.attr('height', d => d);
```
In the example above, we see a transition is applied to `.exit()` selection. Tt returns a selection of DOM elements, to which the target state is *height = 0* it is applied in a smooth, animated way by using transitions. Everything after `.transition()` is the target state. The *from* state, or the *initial* state, is the DOM if no attributes are given. In the example above, we gave certain attributes to the `enter + update` which is the initial state. You can check out the transition API [here](https://github.com/d3/d3-transition).

D3 API offers many functionalities like [Shapes](https://github.com/d3/d3-shape), Axis, [Geo-Projection](https://github.com/d3/d3-geo-projection), [Forces](https://github.com/d3/d3-force) and many more. Check them out if you are interested.

### Resources and References
* [Frontend Masters (I used this to learn, it's good)](https://frontendmasters.com/learn/d3-js/).
* [Shirley Wu, Intro to D3.js](http://slides.com/shirleywu/fm-d3intro#/4)
* [API Reference](https://github.com/d3/d3/blob/master/API.md)
* [D3.js tutorials](https://github.com/d3/d3/wiki/Tutorials)
* [bost.ocks.org](https://bost.ocks.org/mike/selection/), [transitions](https://bost.ocks.org/mike/transition/)
* [d3indepth.com](https://www.d3indepth.com/enterexit/)
* [Transitions](https://github.com/d3/d3-transition)
* You can find the code [here](https://gist.github.com/rohanreddych/dde3a63a464f34526a9e1fbc396c02fb)

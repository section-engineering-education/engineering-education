Pygal allows us to create a range of graphs and charts. You'll learn how to construct a visualisation that shows the comparative popularity of Python works on GitHub in this tutorial. We'll create an interactive bar chart, where the height of each bar will represent the sum of stars earned by the project. By clicking a bar, you'll be sent to the project's GitHub page.

### Prerequisites

You'll need some Python skills to follow along with this tutorial. You must be in a position to work with web APIs in Python.

### Installing pygal

Consider the following command to install pygal:

```python

$ pip install pygal

```

Visit [this](http://www.pygal.org/en/stable/installing.html) if this is your first time using pip.

### The pygal gallery

Check the chart types page to explore what types of charts Pygal can generate: Select **Documentation**, finally **Chart types** in [pygal](http://www.pygal.org/). You can examine how the visualizations are created by looking at the source code for each case.

### Visualizing repositories

Since we'll want to incorporate more than one repository in our visualisation. Let's create a loop that prints specified information about each of the repositories supplied by the API call so that we can add them all to the visualization:

```python

import requests

url = 'https://api.github.com/search/repositories?q=language:python&sort=stars' # Initiate an API request.

request = requests.get(url)

print("Status code:", request.status_code)

respons_dict = request.json()  # In a variable, save the API response.

print("Total repos:", respons_dict['total_count'])

# Examine the repository's details.

repos_dicts = respons_dict['items']

print("Repos found:", len(repos_dicts))

print("\nSelected info about each repository:")

for repos_dict in repos_dicts:   #go through all the dictionaries in repos_dicts.

    print('name-:', repos_dict['name'])

    print('owner-:', repos_dict['owner']['login'])

    print('stars-:', repos_dict['stargazers_count'])

    print('repo-:', repos_dict['html_url'])

    print('Description-:', repos_dict['description'])

```

We print the owner of each project, its name, the number of stars it has, the project's description, and its GitHub URL inside the loop:

```bash

name-: public-apis

owner-: public-apis

stars-: 144910

repo-: https://github.com/public-apis/public-apis

Description-: A collective list of free APIs

name-: system-design-primer

owner-: donnemartin

stars-: 139818

repo-: https://github.com/donnemartin/system-design-primer

Description-: Learn how to design large-scale systems.

--snip--

name-: Python

owner-: TheAlgorithms

stars-: 113616

repo-: https://github.com/TheAlgorithms/Python

Description: All Algorithms implemented in Python

```

Let's construct a visual representation of the current popularity of Python works on GitHub, since we have some relevant data. We will create a bar chart: the amount of stars the project has earned will be represented by the height of each bar.

```python

import requests

import pygal

from pygal.style import LightColorizedStyle as LCSe, LightenStyle as LSe

#  Start an API request.

url = 'https://api.github.com/search/repositories?q=language:python&sort=star'

request = requests.get(url)

print("Status  code:", request.status_code)

# In a variable, save the API response.

response_dictionary = request.json()

print("Total-repos:", response_dictionary['total_count'])

# Examine the repository's details.

repos_dicts = response_dictionary['items']

names, stars = [], []

for repos_dict in repos_dicts:

    names.append(repos_dict['name'])

    stars.append(repos_dict['stargazers_count'])

# Make visualization.

mystyle = LSe('#333366', base_style=LCSe)

chart = pygal.Bar(style=mystyle, x_label_rotation=45, show_legend=False)

chart.title = 'Python Projects with the Most Stars on GitHub'

chart.x_labels = names

chart.add('', stars)

chart.render_to_file('py_repos.svg')

```

To begin, we `import pygal` as well as the `Pygal styles` we'll require for the chart. We'll keep printing the status of the API request return and the total amount of repositories detected to see if the API call was successful. We no longer print information about the specific projects that are returned, because that information will be included in the visualization.

We make two empty lists to hold the data we’ll include in the chart. We’ll use the name, and the number of stars of each project to label and determine the height of the bars respectively. In the loop, we append the name of each project and the number of stars it has to these lists.

Next, we define a style using the `LightenStyle` class (`alias LSe`) and base it on a dark shade of blue. We also pass the `base_style` argument to use the `LightColorizedStyle` class (`alias LCSe`). We then use `Bar()` to make a simple bar chart and pass it `mystyle`.We pass two more style arguments: we set the rotation of the labels along the x-axis to 45 degrees (`x_label_rotation=45`), and we hide the legend, because we’re plotting only one series on the chart (`show_legend=False`). We then give the chart a title and set the `x_labels`attribute to the list names.

Because we don’t need this data series to be labeled, we pass an empty string for the label when we add the data. The resulting chart is shown below:

![Python Projects with the Most Stars on GitHub](/engineering-education/visualizing-repositories-using-pygal/visualizing.jpeg)

### Refining Pygal Charts

Let's fine-tune the look of our graph. First, reorganize the code somewhat by establishing a configuration object that includes all of our adjustments to pass to `Bar()`:

```python

import requests

import pygal

from pygal.style import LightColorizedStyle as LCSe, LightenStyle as LSe

#  Start an API request.

url = 'https://api.github.com/search/repositories?q=language:python&sort=star'

request = requests.get(url)

print("Status  code:", request.status_code)

# In a variable, save the API response.

response_dictionary =request.json()

print("Total-repos:", response_dictionary['total_count'])

# Examine the repository's details.

repos_dicts = response_dictionary['items']

names, stars = [], []

for repos_dict in repos_dicts:

    names.append(repos_dict['name'])

    stars.append(repos_dict['stargazers_count'])

# Make visualization.

mystyle = LSe('#333366', base_style=LCSe)

myconfig = pygal.Config()   # make an instance of Pygal’s Config class

myconfig.x_label_rotation = 45    # set the  attribute x_label_rotation to 45

myconfig.show_legend = False    #set the attribute show_legend to false

myconfig.title_font_size = 23   #choose the text size for the heading of the chart

myconfig.label_font_size = 13   # choose the text size for the minor label (The minor labels are the project names along the x-axis)   

myconfig.major_label_font_size = 17 #set the text size for the major label(The major labels are just the labels on the y-axis)

myconfig.truncate_label = 15  #To reduce the length of long project names to 15 characters, employ truncate label.

myconfig.show_y_guides = False  #set show_y_guides to False hide the horizontal lines on the graph

myconfig.width = 1000   #set a custom width, so the chart will use more of the space in the browser

chart = pygal.Bar(myconfig, style=mystyle)  #make an instance of Bar, and pass myconfig and style as arguments, respectively

chart.title = 'Python Projects with the Most Stars on GitHub'

chart.x_labels = names

chart.add('', stars)

chart.render_to_file('py_repos.svg')

```

The figure below shows the restyled chart:

![The styling for the chart has been refined.](/engineering-education/visualizing-repositories-using-pygal/refining.jpeg)

### Adding Custom Tooltips

In Pygal, floating the mouse over a single bar displays the data it represents. This is known as a tooltip, and it usually displays the amount of stars that a project possesses. Let's make a custom tooltip to display the descriptions of each project.

Let's have a look at a simple example that uses the first three projects plotted singly with custom labels for each bar. Rather than passing a list of values to `add()`, we'll pass a list of dictionaries:

```python

import pygal

from pygal.style import LightColorizedStyle as LCSe, LightenStyle as LSe

mystyle = LSe('#333366', base_style=LCSe)

chart = pygal.Bar(style=mystyle, x_label_rotation=45, show_legend=False)

chart.title = 'Projects in Python '

chart.x_labels = ['public-apis', 'system-design-primer', 'Python']

plot_dictoinaries = [

 {'value': 144904, 'label': 'Description of public-apis.'},

 {'value': 139818, 'label': 'Description of system-design-primer.'},

 {'value': 113616, 'label': 'Description of Python.'},

 ]

chart.add('', plot_dictoinaries)

chart.render_to_file('bar_desc.svg')

```

We define a list called `plot_dictoinaries` that contains three dictionaries: one for the `public-apis` project, one for the `system-design-primer` project, and one for `Python`. There are two keys in every dictionary: `value` and `label`. Pygal calculates the height of each bar using the number linked with `value`, and it creates the **tooltip** for each bar using the string connected with `label`. The first dictionary, for instance, will generate a bar indicating a project with `144904` stars, with the tooltip `"Description of public-apis."`

The `add()` function requires a string and a list. We pass the list of dictionaries containing the bars (plot dictoinaries) to `add()`. Pygal has a default tooltip that contains the number of stars, besides the customized tooltip we gave it.

One of the tooltips is shown below:

![Adding Custom Tooltips.](/engineering-education/visualizing-repositories-using-pygal/Adding_Custom_Tooltips.png)

### Adding Clickable Links to Our Graphs

Pygal further enables you to utilize each bar in the chart as a link to a webpage. We simply add one line of code to our code to enable this feature, utilizing the dictionary we've built up for each project. We create a new `key-value` pair for each project’s `plot_dictionary` using the key `xlink`:

```python

import requests

import pygal

from pygal.style import LightColorizedStyle as LCSe, LightenStyle as LSe

#  Initiate an API request

url = 'https://api.github.com/search/repositories?q=language:python&sort=star'

request = requests.get(url)

print("Status-code:", request.status_code)

# In a variable, save the API response.

response_dictionary = request.json()

print("Total repos:", response_dictionary['total_count'])

# Examine the repository's details.

repository_dicts = response_dictionary['items']

names, plot_dictionaries = [], []

for repository_dict in repository_dicts:

   names.append(repository_dict['name'])

   plot_dictionary = {

   'value': repository_dict['stargazers_count'],

   'label': repository_dict['description'],

   'xlink': repository_dict['html_url'],

   }

plot_dictionaries.append( plot_dictionary)

# Make visualization.

mystyle = LSe('#333366', base_style=LCSe)

chart = pygal.Bar(style=mystyle, x_label_rotation=45, show_legend=False)

chart.title = 'Most-Starred Python Projects on GitHub'

chart.x_labels = names

chart.add('',  plot_dictionaries)

chart.render_to_file('py_rs.svg')

```

Here is the output of the above code:

![Adding Clickable Links to Our Graph.](/engineering-education/visualizing-repositories-using-pygal/Adding_Clickable_Links_to_Our_Graph.jpeg)

Pygal converts each bar into an active link by using the URL connected with `'xlink.'` Any of the bars in the chart can be clicked to view the GitHub site for that project in a separate tab in your browser.

### Conclusion

In this tutorial, we have gained an understanding on how to:

- Install Pygal

- Visualize repositories

- Refining Pygal Charts

- Add Custom Tooltips

- Add Clickable Links to Our Graphs

### Further reading

You can learn more about other concepts by [visiting this page.](https://www.pluralsight.com/guides/building-visualizations-with-pygal).



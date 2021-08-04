### Introduction
This tutorial will teach you how to create a self-contained application that generates a visualization based on the information it obtains. Instead of requesting complete pages, a web application programming interface will be used by your program (API) to get certain information from the web. We'll use data from [GitHub](https://github.com/), a website where programmers can contribute to projects. We'll request information concerning Python projects on GitHub using Github's API.

### Prerequisites
You'll need some Python skills to follow along with this tutorial.

### What you will learn
- Using an API call to request data
- Requests installation
- Keeping track of an API response
- Using the response dictionary
- Summing up the top repositories

### Requesting data using an API call 
GitHub's web API allows you to make API requests for a range of data. Type the following into your web browser URL bar and press **enter** to see how an API call appears like:

```bash
https://api.github.com/search/repositories?q=language:python&sort=stars
```

Let’s examine the parts of the call:
 1.`https://api.github.com/` - sends the request to the section of GitHub's website that handles API calls.
 2.`search/repositories` - informs the API to search across all of GitHub's repositories.
 3.`?` - indicates that an argument is about to be passed.
 4.`q=`- the character q means for "query", and then we can start working with API by specifying a query with the equal sign. 
 5.`language:python` - we specify that we only need data on repositories that use Python as their main language. 
 6.`&sort=stars` - the projects are sorted by how many stars they have received.

The response's first several lines are shown in the below snippet:

```bash
{
  "total_count": 7668509,
  "incomplete_results": false,
  "items": [
    {
      "id": 54346799,
      "node_id": "MDEwOlJlcG9zaXRvcnk1NDM0Njc5OQ==",
      "name": "public-apis",
      "full_name": "public-apis/public-apis",
      --snip--
```

In the second line of the result, you can see that GitHub detected a total of `7668509` Python projects, as of this tutorial. We know the request was successful since the value for `incomplete results` is `false`. If GitHub was unable to complete the API request, it'd have returned `true` in this case. The `items` obtained are shown in the list that follows, which includes information for the most Python-based projects on GitHub.

### Installing requests
The requests package enables requesting data from the website and evaluating the result easily for a Python program.
Consider the following command to install requests:

```python
$ pip install --user requests
```

Visit [this](https://packaging.python.org/tutorials/installing-packages/) if this is your first time using pip.

### Processing an API response
By selecting the most starred Python projects on GitHub, we'll start writing a program that will make an API call and evaluate the data.

```python
import requests

# Make an API request 
url = 'https://api.github.com/search/repositories?q=language:python&sort=stars'
j = requests.get(url)
print("Status code:", j.status_code)
# In a variable, save the API response.
respons_dict = j.json()
# Evaluate the results.
print(respons_dict.keys())

```

We begin by importing the `requests` module. Then we save the API call's `url` and make the call with `requests`. We use `get()` and provide it the `url`, and the response object is saved in the variable `j`. The `status_code` attribute of the response object indicates if the request was complete. (A complete response is denoted by a status code of `200`.) Then, to ensure that the call was complete, we print the result of `status_code`. We use the `json()` function to interpret the information from JSON to a Python dictionary since this API delivers it in JSON format. The resulting dictionary is stored in `respons_dict`. Lastly, we print the keys from `respons_dict`, which are as follows:

```bash
Status code: 200
dict_keys(['items', 'total_count', 'incomplete_results'])
```

The request was completed since the `status_code` is `200`.

### Using the response dictionary
We can interact with the data contained in the dictionary since the result from the API call has been saved. Let's make a report that sums up the information. This is a cool method to ensure we got the information we wanted and to get started looking at the information we care about:

```python
import requests

# Make an API call 
url = 'https://api.github.com/search/repositories?q=language:python&sort=stars'
j = requests.get(url)
print("Status code:", j.status_code)
# In a variable, save the API response.
respons_dict = j.json()
print("Total repositories:", respons_dict['total_count'])
# Explore information about the repositories.
repos_dicts = respons_dict['items']
print("Repositories found:", len(repos_dicts))
# Examine the first repository.
repos_dict = repos_dicts[0]
print("Keys:", len(repos_dict))
for key in sorted(repos_dict.keys()):
 print(key)
```
The value linked with `total_count`, which reflects the number of Python repositories on GitHub, is first printed.

The value of `items` is a list of dictionaries, each of which provides information about a single Python repository.

The list of dictionaries is then saved in `repos_dicts`. The length of `repos_dicts` is then printed to check the number of repositories we have information for.

We select the first item from `repos_dicts` and put it in `repos_dict` to look more closely at the information given about each repository. To see what information we have, we print the number of keys in the dictionary. Finally, we write each of the dictionary's keys to check what type of data is contained.

The output begins to paint a more detailed picture of the data.

```bash
Status code: 200
Total repositories: 7694326
Repositories found: 30
Keys: 74
archive_url
archived
assignees_url
--snip--
url
watchers
watchers_count
```

The GitHub API returns a range of data for each repository: `repos_dict` has `74` keys. You may get a sense of the type of information you can get about a project by observing these keys.

Let's look at some of the keys in `repos_dict` and see what they mean:

```python
import requests

# Make an API call 
url = 'https://api.github.com/search/repositories?q=language:python&sort=stars'
j = requests.get(url)
print("Status code:", j.status_code)
# Store API response in a variable.
respons_dict = j.json()
print("Total repositories:", respons_dict['total_count'])

# Explore information about the repositories.
repos_dicts = respons_dict['items']
print("Repositories returned:", len(repos_dicts))
# Examine the first repository.
repos_dict = repos_dicts[0]
print("\nThe following is some information regarding the first repository:")
print('Name:', repos_dict['name'])  #print the name of the project
print('Owner:', repos_dict['owner']['login'])  #use the key owner and the the key login to access the dictionary representing the owner and the owner’s login name respectively.
print('Stars:', repos_dict['stargazers_count'])  #print how many stars the project has earned
print('Repository:', repos_dict['html_url'])  #print URL for the project’s GitHub repository
print('Created:', repos_dict['created_at'])  #print when it was created
print('Updated:', repos_dict['updated_at'])  #show when it was last updated
print('Description:', repos_dict['description']) #print the repository’s description

```

The data for several keys with the dictionary of the first repository is printed here, and the result should look like this:

```bash
Status code: 200
Total repositories: 7588335
Repositories returned: 30

Selected information about first repository:
Name: public-apis
Owner: public-apis
Stars: 144904
Repository: https://github.com/public-apis/public-apis
Created: 2016-03-20T23:49:42Z
Updated: 2021-07-31T13:15:51Z
Description: A collective list of free APIs

```

You can observe that the most popular Python work on GitHub as of this tutorial is `public-apis`, its founder is user `public-apis`, and more than `140,000` GitHub subscribers have given it a star.
The project's repository `url` is displayed, as well as its construction date of `2016 March` and the information that it was just modified. Finally, `public-apis` is described as a `collective collection of open APIs` in the description.


### Summarizing the top repositories
We'll want to incorporate more than one repository in our visualisation of this data. Let's create a loop that prints specified information about each of the repositories supplied by the API call so that we can add them all in the visualization:

```python
import requests
url = 'https://api.github.com/search/repositories?q=language:python&sort=stars'
r = requests.get(url)
print("Status code:", r.status_code)
respons_dict = r.json()
print("Total repositories:", respons_dict['total_count'])

repos_dicts = respons_dict['items']
print("Repositories returned:", len(repos_dicts))
print("\nSelected information about each repository:")
for repos_dict in repos_dicts:   #loop through all the dictionaries in repo_dicts.
    print('\nName:', repos_dict['name'])
    print('Owner:', repos_dict['owner']['login'])
    print('Stars:', repos_dict['stargazers_count'])
    print('Repository:', repos_dict['html_url'])
    print('Description:', repos_dict['description'])

```

We print the name of each project, its owner, the number of stars it has, its GitHub URL, and the project's description inside the loop:

```bash

Name: public-apis
Owner: public-apis
Stars: 144910
Repository: https://github.com/public-apis/public-apis
Description: A collective list of free APIs

Name: system-design-primer
Owner: donnemartin
Stars: 139818
Repository: https://github.com/donnemartin/system-design-primer
Description: Learn how to design large-scale systems. Prep for the system design interview.  Includes Anki flashcards.
--snip--

Name: Python
Owner: TheAlgorithms
Stars: 113616
Repository: https://github.com/TheAlgorithms/Python
Description: All Algorithms implemented in Python

```

### Conclusion
In this tutorial, we have gained an understanding of the Python programming language on how to:
- Use an API call to request data
- Installing requests
- Process an API response
- Using the response dictionary
- Summing up the top repositories

Happy coding!

### Further reading
You can learn more about other concepts by [visiting this page.](https://www.techgeekbuzz.com/how-to-use-github-api-in-python/).

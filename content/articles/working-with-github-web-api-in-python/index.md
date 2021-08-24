---
layout: engineering-education
status: publish
published: true
url: /working-with-github-web-api-in-python/
title: Working with GitHub API in Python
description: This article will be an introduction to understanding GitHub API. We will build a repository summarizer using Python. We will also request information related to Python projects on GitHub using the GitHub API.
author: bonface-muriithi
date: 2021-08-24T00:00:00-14:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/working-with-github-web-api-in-python/hero.jpg
    alt: Working with GitHub API in Python
---
When fetching information from the web, we usually request for complete web pages, and extract information by parsing the HTML scripts. Similarly, an Application Programming Interface (API) performs the same operation in a more efficient way.
<!--more-->
This tutorial will teach you how to create a self-contained application that generates a summary based on the information it obtains through the API.

[GitHub](https://github.com/) is a website where programmers can contribute to various open-source projects.

In this article, we will request information related to Python projects on GitHub using the [Github API](https://api.github.com). We will also summarize information that we've obtained using the API.

### Prerequisites
As a prerequisite, you must have a little understanding of Python to follow the tutorial along.

### Objectives
In this article we will go through:
- Using an API call to request data.
- Installation of `requests` library.
- Keeping track of an API response.
- Using the response dictionary.
- Summing up the top repositories.

### Requesting data using an API call 
GitHub's web API allows you to make API requests for a range of data.

Type the following into your web browser URL bar and press **Enter** to see how an API call appears like:

```bash
https://api.github.com/search/repositories?q=language:python&sort=stars
```

Let's examine the parts of the API call:
- `https://api.github.com/` - sends the request to the GitHub web server that handles API calls.
- `search/repositories` - is the endpoint that informs the API to search across all of GitHub repositories.
- `?` - indicates that an argument is about to be passed.
- `q=`- the character `q` stands for `query`.
- `language:python` - that queries repositories that use only Python as their main language. 
- `&sort=stars` - the projects are sorted by the number of stars they have gotten.

Upon fetching the API data, the response will look like:

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

> **NOTE:** The output above shows only the first few lines of the response.

Let's examine the output:
- In the second line of the result, you can see that GitHub has detected a total of `7668509` Python projects.
- We know the request was successful if the value for `incomplete results` is `false`.
- The key `items` holds a list of objects that contains information of the Python-based projects on GitHub.

Let's try to explore more information by parsing the API's output using Python.

### Installing requests
The `requests` package enables us to request data from the website and evaluate the result easily using a Python program.

Run the following command to install `requests`:

```bash
pip install --user requests
```

Visit [this](https://packaging.python.org/tutorials/installing-packages/) link, if this is your first time using `pip` for installing packages.

### Processing an API response
To fetch the most starred Python projects on GitHub, we'll start writing a program that will make an API call and evaluate the data as shown:

```python
import requests

# Create an API request 
url = 'https://api.github.com/search/repositories?q=language:python&sort=stars'
response = requests.get(url)
print("Status code: ", response.status_code)
# In a variable, save the API response.
response_dict = response.json()
# Evaluate the results.
print(response_dict.keys())
```

Let's understand the code snippet above:
- We begin by importing the `requests` module.
- Then, we use the `requests` package to make the API call to the particular `url` using `get()`.
- The API response is saved by a variable called `response`.
- The `status_code` attribute of the `response` object indicates if the request was complete.
- A successful API call returns the `status_code` `200`, while an unsuccessful one returns `500`.
- Then, we use the `json()` function to convert the information from JSON format to a Python dictionary.
- We store the converted JSON in `response_dict`.

Then, we print the keys from `response_dict`, which are as follows:

```bash
Status code: 200
dict_keys(['items', 'total_count', 'incomplete_results'])
```

### Using the response dictionary
Now, let's make a report that sums up all the information.

Here, we will be calculating the total number of available repositories with language as `Python`, and fetch all the keys under `items` as shown:

```python
print("Total repos:", response_dict['total_count'])
# find total number of repositories
repos_dicts = response_dict['items']
print("Repos found:", len(repos_dicts))
# examine the first repository
repo_dict = repos_dicts[0]
print("Keys:", len(repo_dict))
for key in sorted(repo_dict.keys()):
 print(key)
```

Let's understand the code snippet above:
- The value linked with the `total_count` reflects the count of GitHub Python projects available.
- The value of `items` is a list of dictionaries, each providing information about a single Python repository.
- The list of dictionaries is then saved in `repos_dicts`.
- We select the first item from `repos_dicts` to look more closely at the information given about each repository.
- Finally, we print the all of keys of an `item`.

**Output:**

```bash
Status code: 200
Total repos: 7694326
Repos found: 30
Keys: 74
archive_url
archived
assignees_url
--snip--

url
watchers
watchers_count
```

The GitHub API gets back a range of data for every repository like:
- `status_code` as `200`.
- Total number of repos as `7694326`.
- Total number of repos found as `30`.
- Each repository `repo_dict` having `74` keys.

You may get a sense of the type of information you can get about a repository by observing these keys.

Let's have a look at what some of the keys in repos dict entail:

```python
# Find out more about the repositories.
repos_dicts = response_dict['items']
print("Repositories found:", len(repos_dicts))
# Examine the first repository.
repo_dict = repos_dicts[0]
print("\nThe following is some information regarding the first repository:")
print('Name:', repo_dict['name'])  #print the project's name
print('Owner:', repo_dict['owner']['login'])  #use the key owner and the the key login to get the dictionary describing the owner and the owner’s login name respectively.
print('Stars:', repo_dict['stargazers_count'])  #print how many stars the project has earned
print('Repository:', repo_dict['html_url'])  #print URL for the project’s GitHub repoitory
print('Created:', repo_dict['created_at'])  #print when it was created
print('Updated:', repo_dict['updated_at'])  #show when it was last updated
print('Description:', repo_dict['description']) #print the repository’s description
```

**Output:**

```bash
Status-code: 200
Total repos: 7588335
Repositories found: 30

The following is some information regarding the first repository:
Name: public-apis
Owner: public-apis
Stars: 144904
Repository: https://github.com/public-apis/public-apis
Created: 2016-03-20T23:49:42Z
Updated: 2021-07-31T13:15:51Z
Description: A collective list of free APIs
```

Examining the output:
- You can observe that the most popular Python repository on GitHub is `public-apis`.
- Owner of the repository is `public-apis`.
- It has been starred more than `140,000` times.
- Project was created on the date of `2016 March`.
- Project description of `public-apis` is `collective collection of open APIs`.

### Summing up the top repositories
We'll try to analyze more than one repository.

Let's create a loop that prints specified information about each of the repositories supplied by the API call:

```python
 --snip--
# Find out more about the repositories.
repos_dicts = respons_dict['items']
print("Repositories found:", len(repos_dicts))
print("\nListed details on each repository:")
for repos_dict in repos_dicts:   #loop through all the dictionaries in repos_dicts.
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
Description: Learn how to design large-scale systems.
--snip--

Name: Python
Owner: TheAlgorithms
Stars: 113616
Repository: https://github.com/TheAlgorithms/Python
Description: All Algorithms implemented in Python
```

### Conclusion
In this tutorial, we have gone over the following:
- Using an API call to request data.
- Installing requests.
- Processing an API response.
- Using the response dictionary.
- Summing up the top repositories.

You can check out the full code [here](https://github.com/Bonimum/Working-with-GitHub-s-web-API-in-Python/blob/main/index.md).

Happy coding.

### Further reading
- [How to use GitHub API in Python?](https://www.techgeekbuzz.com/how-to-use-github-api-in-python/).

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

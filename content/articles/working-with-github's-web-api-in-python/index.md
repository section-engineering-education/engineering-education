### Introduction
In this tutorial you’ll learn how to write a self-contained program to generate a visualization based on data that it retrieves.
Your program will use a web application programming interface (API) to automatically request specific information from a website rather than entire pages. We’ll base our visualization on information from [GitHub](https://github.com/), a site that allows programmers to collaborate on projects. We’ll use GitHub’s API to request information about Python projects on the site.

### Prerequisites
To follow along with this tutorial, you will require some knowledge of Python.

### What you will learn
- Requesting Data Using an API Call 
- Installing Requests
- Processing an API Response
- Working with the Response Dictionary
- Summarizing the Top Repositories

### Requesting data using an API call 
GitHub’s web API lets you request a wide range of information through API calls. To see what an API call looks like, enter the following into your browser’s address bar and press **enter**:

```
https://api.github.com/search/repositories?q=language:python&sort=stars
```

Let’s examine the parts of the call:

1.`https://api.github.com/` - directs the request to the part of GitHub’s website that responds to API calls.

2.`search/repositories` - tells the API to conduct a search through all repositories on GitHub.

3.`?` - signals that we’re about to pass an argument. 

4.`q=`- q stands for query, and the equal sign lets us begin working with APIs specifying a query `(q=)`. 

5.`language:python` - we indicate that we want information only on repositories that have Python as the primary language.

6.`&sort=stars` - sorts the projects by the number of stars they’ve been given.

The following snippet shows the first few lines of the response:

```
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

As you can see in the second line of output, GitHub found a total of `7668509` Python projects as of this tutorial. Because the value for `incomplete_results` is `false`, we know that the request was successful . If GitHub had been unable to fully process the API request, it would have returned `true` here. The `items` returned are displayed in the list that follows, which contains details about the most popular Python projects on GitHub

### Installing requests
The requests package makes it simple for a Python program to request information from a website and evaluate the response. Consider the following command to install requests:

```
$ pip install --user requests
```

Visit [this](https://packaging.python.org/tutorials/installing-packages/) if you've not used pip before.

### Processing an API response
Now we’ll begin to write a program to issue an API call and process the results by identifying the most starred Python projects on GitHub.

```python
import requests

# Make an API call and store the response.
url = 'https://api.github.com/search/repositories?q=language:python&sort=stars'
j = requests.get(url)
print("Status code:", j.status_code)
# Store API response in a variable.
respo_dict = j.json()
# Process results.
print(respo_dict.keys())

```

First we import the `requests` module. Then we store the URL of the API call, and then we use requests to make the call. We call `get()` and pass it the URL, and we store the response object in the variable `j`. The response object has an attribute called `status_code`, which tells us whether the request was successful. (A successful response is denoted by a status code of `200`.) Then, to ensure that the call was successful, we print the result of `status_code`. The API returns the information in JSON format, so we use the `json()` method to convert the information to a Python dictionary. We store the resulting dictionary in `respo_dict`. Finally, we print the keys from `respo_dict` and see this:

```python
Status code: 200
dict_keys(['items', 'total_count', 'incomplete_results'])
```

Because the `status code` is `200`, we know that the request was successful. 

### Working with the response dictionary
Now that we have the information from the API call stored as a dictionary, we can work with the data stored there. Let’s generate some output that summarizes the information. This is a good way to make sure we received the information we expected and to start examining the information we’re interested in:

```python
import requests

# Make an API call and store the response.
url = 'https://api.github.com/search/repositories?q=language:python&sort=stars'
j = requests.get(url)
print("Status code:", j.status_code)
# In a variable, save the API response.
response_dict = j.json()
print("Total repositories:", response_dict['total_count'])
# Learn more about the repositories.
repo_dicts = response_dict['items']
print("Repositories found:", len(repo_dicts))
# Examine the first repository.
repo_dict = repo_dicts[0]
print("Keys:", len(repo_dict))
for key in sorted(repo_dict.keys()):
 print(key)
```
At first we print the value associated with `total_count`, which represents the total number of Python repositories on GitHub.

The value associated with `items` is a list containing a number of dictionaries, each of which contains data about an individual Python repository. 

Then we store this list of dictionaries in `repo_dicts`. We then print the length of `repo_dicts` to see how many repositories we have information for.

To take a closer look at the information returned about each repository, we pull out the first item from `repo_dicts` and store it in `repo_dict`. We then print the number of keys in the dictionary to see how much information we have . Lastly we print all of the dictionary’s keys to see what kind of information is included.

The results start to give us a clearer picture of the actual data:

```python
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

GitHub’s API returns a lot of information about each repository: there are 74 keys in `repo_dict`. When you look through these keys, you’ll get a sense of the kind of information you can extract about a project.

Let’s pull out the values for some of the keys in `repo_dict`:

```python
import requests

# Make an API call and store the response.
url = 'https://api.github.com/search/repositories?q=language:python&sort=stars'
j = requests.get(url)
print("Status code:", j.status_code)
# Store API response in a variable.
response_dict = j.json()
print("Total repositories:", response_dict['total_count'])

# Find out more about the repositories.
repo_dicts = response_dict['items']
print("Repositories returned:", len(repo_dicts))
# Examine the first repository.
repo_dict = repo_dicts[0]
print("\nSelected information about first repository:")
print('Name:', repo_dict['name'])  #print the name of the project
print('Owner:', repo_dict['owner']['login'])  #use the key owner and the the key login to access the dictionary representing the owner and the owner’s login name respectively.
print('Stars:', repo_dict['stargazers_count'])  #print how many stars the project has earned
print('Repository:', repo_dict['html_url'])  #print URL for the project’s GitHub repository
print('Created:', repo_dict['created_at'])  #print when it was created
print('Updated:', repo_dict['updated_at'])  #show when it was last updated
print('Description:', repo_dict['description']) #print the repository’s description

```

Here we print out the values for a number of keys from the first repository’s dictionary, and the output should look something like this:

```python
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

We can see that the most-starred Python project on GitHub as of this tutorial is `public-apis`, its owner is user `public-apis`, and it has been starred by more than `140,000` GitHub users.
We can see the URL for the project’s repository, its creation date of `2016 March`, and that it was updated recently. Finally, the description tells us that `public-apis` is `A collective list of free APIs`

### Summarizing the top repositories
When we make a visualization for this data, we’ll want to include more than one repository. Let’s write a loop to print selected information about each of the repositories returned by the API call so we can include them all in the visualization:

```python
import requests
url = 'https://api.github.com/search/repositories?q=language:python&sort=stars'
r = requests.get(url)
print("Status code:", r.status_code)
response_dict = r.json()
print("Total repositories:", response_dict['total_count'])

repo_dicts = response_dict['items']
print("Repositories returned:", len(repo_dicts))
print("\nSelected information about each repository:")
for repo_dict in repo_dicts:   #loop through all the dictionaries in repo_dicts.
    print('\nName:', repo_dict['name'])
    print('Owner:', repo_dict['owner']['login'])
    print('Stars:', repo_dict['stargazers_count'])
    print('Repository:', repo_dict['html_url'])
    print('Description:', repo_dict['description'])

```

Inside the loop we print the name of each project, its owner, how many stars it has, its URL on GitHub, and the project’s 
description:

```python

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
In this tutorial, we have gained an understanding of Python programming language on how to:
- Requesting Data Using an API Call 
- Installing Requests
- Processing an API Response
- Working with the Response Dictionary
- Summarizing the Top Repositories

 
### Further reading
You can learn more about other concepts by [visiting this page.](https://www.techgeekbuzz.com/how-to-use-github-api-in-python/).


















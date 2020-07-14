[**Web scraping**](https://en.wikipedia.org/wiki/Web_scraping), also known as web harvesting or web data extraction, refers to collecting data from websites. It is the process of collecting specific data on the web, which is typically copied to a database or spreadsheet for retrieval and analysis at a later date. If a website offers visitors a way to download the content in a browser and present it in a structured way, then this content can be accessed at any time. In this article, we will talk about how to pull data from the web.

Web scraping tools have been developed specifically for extracting data from the Internet. Nowadays, many web scraping tools are available and are designed specifically for the user. In this article, we are going to explore web scraping in Python using a library called **beautifulsoup**. According to [**Pypi**](https://pypi.org/project/beautifulsoup4/),  beautifulsoup is a library that makes it easy to scrape information from web pages. It sits atop an HTML or XML parser, providing Pythonic idioms for iterating, searching, and modifying the parse tree. We are going to build a simple web scraper that can scrape questions from **google forms** and store them in an excel sheet. 
<!--more-->
### Installing dependencies
The easiest way to install the required libraries in Python is to use pip. [**pip**](https://pip.pypa.io/en/stable/) is a package manager for Python. We need to install beautifulsoup for web scraping, URLib for establishing a connection with the website and sending requests to it, and xlsxwriter to create and manage excel sheets in Python. 

The dependencies can be installed by running the following commands:

**urllib3:**
[Urllib](https://docs.python.org/3/library/urllib.html) is used to send an HTTP request to the URL of the webpage that we wish to scrape. Using urllib, the user can send a request to the server, which then responds to the request by returning the HTML content of the webpage. 

```
pip install urllib3
```

**beautifulsoup4:**
Once we have obtained the HTML content of the web page using urllib, we can use Beautifulsoup to parse the HTML document and extract the information that we require.

```
pip install beautifulsoup4
```

**XlsxWriter:** 
[XlsxWriter](https://xlsxwriter.readthedocs.io/) is a Python module that is used to write text, numbers, formulas, and hyperlinks to multiple worksheets in an Excel file. We will use this to store the contents of our scraped data in an excel sheet. 

```
pip install XlsxWriter
```

### Building the web scraper
Beautiful helps us locate the content that is stored within the HTML structure. Users can easily navigate the structure of the page by using the in-built methods in beautifulsoup.

#### Importing the dependencies

```python
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen
import xlsxwriter  
```

The urlopen function in the urllib module allows us to open web pages and takes the URL of the web page as the parameter. It lets us work directly with pages on the web. 

#### Getting the data from the web page
The sample google form that we are going to scrape can be found [**here**](https://docs.google.com/forms/d/e/1FAIpQLSeI8_vYyaJgM7SJM4Y9AWfLq-tglWZh6yt7bEXEOJr_L-hV1A/viewform?formkey=dGx0b1ZrTnoyZDgtYXItMWVBdVlQQWc6MQ)

![Google forms image](/engineering-education/web-scraping-in-python/google-forms.png)

Let us collect all the questions from this form and store them in an excel sheet. For this, we first need to understand the HTML structure of the web page so that we can use beautifulsoup to obtain only the questions. Navigate to the sample google forms website on your browser. 

Right-click on any question in the form and select inspect (If you are using Chrome) or inspect element (if you are using firefox).

![Google forms inspect](/engineering-education/web-scraping-in-python/google-forms-inspect.png)

As you can see in the above image, the inspect element allows users to view the HTML contents of the page and make changes to it. It opens a console (right half) where you can view and edit the HTML. We need to obtain the class of the element that contains the questions. Once we get the class, we can use beautifulsoup to get all the elements that have that particular class label and parse them. 

![Google forms class](/engineering-education/web-scraping-in-python/google-forms-class.png)

As you can see in the image (highlighted portion), the class we are looking for is called *"freebirdFormviewerComponentsQuestionBaseTitle"*. If we want to obtain the descriptions of the questions (the text below the question), we can use "freebirdFormviewerComponentsQuestionBaseDescription" for the descriptions. However, In this article, we will only scrape the questions. 

```python
def get_data(url):

	# opening the url
	url_client = urlopen(url)
	# getting the content of the url.
	url_content = url_client.read()
	#close the connection
	url_client.close()
	# beautiful soup parser to parse the files in html. 
	parser = soup(url_content, "html.parser")
	content = parser.findAll('div', {'class': 'freebirdFormviewerComponentsQuestionBaseTitle'})
	# print(parser.name_of_tag) to print the first element of that particular tag. 

	return content
```

The get_data function takes the URL as a parameter and returns all the elements that belong to a particular class. The urlopen() function establishes a connection to the URL and the read() function reads the contents of that page. We create an object called parser using beautifulsoup. This function takes two parameters: the contents of the page and the type of parser. In this case, we shall use the HTML parser. the findall() method finds all the HTML elements based on a given condition. In this case, we are looking for all the "div" tags that have the class "freebirdFormviewerComponentsQuestionBaseTitle". 

#### Storing the data in an excel sheet
Once the data gets fetched from the web page, the next step is to store it in a presentable format. 

```python
def store_excel(data):

	# Workbook() takes one, non-optional, argument  
	# which is the filename that we want to create. 
	workbook = xlsxwriter.Workbook('content.xlsx')   
	# The workbook object is then used to add new  
	# worksheet via the add_worksheet() method. 
	worksheet = workbook.add_worksheet()   
	# Use the worksheet object to write 
	# data via the write() method. 
	row = 0
	col = 0
	# parse the data and store it in the excel sheet. 
	for item in data:

		text = str(item.text)
		worksheet.write(row, col, text)
		row += 1
	# Finally, close the Excel file 
	# via the close() method. 
	workbook.close() 
```

The store_excel() function takes the data as a parameter and creates an excel sheet that contains the data. The Workbook() function creates a workbook with the name "content.xlsx" and add_worksheet() adds a new worksheet to our workbook. We then go through all the items in our data (all the questions) and add them to our worksheet using the write() method. The row and column integers denote the current row and column in the sheet. 

#### Putting it all together

```python
if __name__ == '__main__':

	url = input('enter the url: ')
	data = get_data(url)
	print(data)
	store_excel(data)

```

In the main function, we take the URL as input from the user. We pass this URL to the get_data function that returns the elements that belong to the questions class. We then call the store_excel function and store the questions. 

![Excel](/engineering-education/web-scraping-in-python/excel.png)
### Conclusion
The legalization of web scraping is a sensitive issue, as it can be a blessing or a curse depending on the way it is used. Web scraping is an automated threat that can be used by cybercriminals to collect sensitive information. Many companies prevent users from scraping sensitive information from their websites. Therefore, it is always a good idea to go through the company policies before scraping data from their websites.

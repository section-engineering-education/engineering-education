---
layout: engineering-education
status: publish
published: true
url: /summarize-text-with-sbert-and-flask/
title: Building a Text Summarizer With SBERT and Flask
description: This article will teach you to build a text summarizer using SBERT model. We will build a Flask web application to demonstrate the same.
author: francisca-ngodu
date: 2022-04-29T00:00:00-04:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/summarize-text-with-sbert-and-flask/hero.jpg
    alt: Building a Text Summarizer With SBERT and Flask Hero image
---
In this tutorial, we will learn to build a flask web application that summarizes text using the Sentence-BERT model.
<!--more-->
Text summarization deals with the creation of sentence embeddings that supports over 100 languages. You can read more about Sentence-BERT [here](https://arxiv.org/abs/1908.10084).

SBERT can also be used to compare the semantic similarity of words. When summarizing a lengthy text, it is critical to seek similarities between sentences to ensure that the summary is correct and does not distort the original text's meaning.

### Prerequisites
To follow along with this tutorial, the reader must have the following:
- Basic knowledge of Python programming language. Here, we will use a Python version greater than 3.
- An IDE installed, preferably [VS Code](https://code.visualstudio.com/).

### Build a flask web app
Sentence-BERT (SBERT), a siamese and triplet network-based variant of the BERT model is capable of deriving semantically meaningful sentence embeddings.

With SBERT, BERT got the additional capability to compare massive sets for semantic similarities, groups, and retrieve information via semantic search.

BERT established new benchmarks for performance on a variety of sentence categorization and pairwise regression problems.

Semantically related sentences can be identified using a similarity measure such as cosine similarity distance. Due to the high efficiency with which these similarity measures can be computed on modern technology, SBERT can be used for both semantic similarity search and clustering.

#### Create a virtual environment
Before we start, let's create a virtual environment. Open the terminal and create a virtual environment `summarizerApp` as shown:

```bash
python3 -m venv summarizerApp
```

Then we activate the environment with:

```bash
source summarizerApp/bin/activate
```

#### Install packages
##### Flask
We use Flask to make web applications, manage HTTP requests, and render templates:

```bash
pip3 install Flask
```

##### summarizer
To fetch the most relevant and valuable information out of a lengthy document, we use `summarizer`.

```bash
pip3 install summarizer
```

##### sentence-transformers
Python framework that uses state-of-the-art models for text and image embeddings creation.

```bash
pip3 install -U sentence-transformers
```

##### bert-extractive-summarizer
To do extractive summaries, we use the BERT extractive summarizer from the HuggingFace Pytorch transformers library:

```bash
pip3 install -q bert-extractive-summarizer
```

#### Build frontend
Inside the working directory, create a folder called `templates` with two files inside it:
1. `index.html`
2. `summary.html`

In the `index.html` file for the home page, we display a text field where the user can submit a textual content that is to be summarized:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Text Summarizer App</title>

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <nav class="navbar navbar-light" style="background-color: #100da1;">
      <div class="container">
        <a class="navbar-brand">Summarizer</a>
      </div>
    </nav>
    <form action="/summarize" method="post">
      <div class="form-group">
        <label for="exampleFormControlTextarea1" style="padding-top: 2em;">
          <strong>Enter Your Text Below To Be Summarized:</strong>
        </label>
        <br />
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="10"
          name="data"
        ></textarea>
      </div>
      <br />

      <button type="submit" class="btn btn-outline-primary">Summarize</button>
    </form>
  </body>
</html>
```

![Home page](/engineering-education/summarize-text-with-sbert-and-flask/result.png)

To display the text summary of the text we inputted, we create `summary.html` as shown:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Summary</title>
    <style>
      p {
        padding-top: 2em;
        text-align: center;
        line-height: 3em;
        color: black;
        word-spacing: 0.25em;
        font-family: "Times New Roman", Times, serif;
      }
    </style>

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <nav
      class="navbar navbar-light"
      style="background-color: hsl(236, 96%, 22%);"
    >
      <div class="container">
        <a class="navbar-brand">Text SUMMARY</a>
      </div>
    </nav>
    <p>{{ result }}</p>
  </body>
</html>
```

![Summary page](/engineering-education/summarize-text-with-sbert-and-flask/summarized.png)

#### Build backend
In your project folder, create a file named `app.py` with the following content:

```python
#importing flask
from flask import Flask, render_template,request
#Importing the summarizer
from summarizer import Summarizer
from summarizer.sbert import SBertSummarizer
```

The latest version of `bert-extractive-summarizer` lets you use `Sentence Bert`. You can read more about this library [here](https://www.sbert.net/).

After importing the libraries, we build a SBERT model to summarize the required content as shown below:

```python
# Using an instance of SBERT to create the model
model = SBertSummarizer('paraphrase-MiniLM-L6-v2')

app = Flask(__name__)

@app.route("/")
def msg():
    return render_template('index.html')

@app.route("/summarize", methods=['POST','GET'])
def getSummary():
    body=request.form['data']
    result = model(body, num_sentences=5)
    return render_template('summary.html',result=result)

if __name__ =="__main__":
    app.run(debug=True,port=8000)
```

In the above code:

- We use an instance of SBERT to create the model.
- `SBertSummarizer('paraphrase-MiniLM-L6-v2')` is a sentence-transformer model used for convert phrases and paragraphs into a 384-dimensional dense vector space.
- `return render_template('index.html')` displays the `index.html` contents, which is our home page.
- `return render_template('summary.html',result=result)` displays the `summary.html` data. In our case, it's the summary page.
- `app.run(debug=True,port=8000)` runs on local host in port `8000`, which communicates with the server.

Firstly, we render the `index.html` at the start of the server. Then, on accepting the input from the form using `request.form['data']`, we save it to `body` and render the `summary.html` along with the summarized results.

#### Run the application
In your project folder, we should have the following folders and files:
- The folder contains files installed during virtual environment creation.
- The `templates` folder.
- `app.py` file containing the Python script.

Finally, we run the app using the command:

```bash
python app.py
```

In your terminal, the server starts up with a warning message, which can be ignored.

![Terminal](/engineering-education/summarize-text-with-sbert-and-flask/terminal.png)

Now, you may search for the URL `http://127.0.0.1:8000` to access our frontend.

![Result](/engineering-education/summarize-text-with-sbert-and-flask/result.png)

#### Testing
Now, you may enter a text that you wish to be summarized and click on `Summarize` button.

![Before summarization](/engineering-education/summarize-text-with-sbert-and-flask/text.png)

![After summarization](/engineering-education/summarize-text-with-sbert-and-flask/summarized.png)

### Conclusion
In this blog, we learned how to effectively construct a Flask web application that utilizes SBERT to summarize a text.

To start with, we created a virtual environment, installed the packages, coded both the front-end and back-end of our web application, and finally launched it.

You can find the code for this tutorial [here](https://github.com/FranciscaNg/A-Flask-Web-App-for-Automatic-Text-Summarization-Using-SBERT).

Happy coding!

### References
- [Build, save, and deploy your first web App](https://medium.com/analytics-vidhya/build-save-and-deploy-your-first-web-app-using-flask-and-pythonanywhere-110ddd691026) using Flask.
- [Develop an NLP Model in Python & deploy it with Flask.](https://towardsdatascience.com/develop-a-nlp-model-in-python-deploy-it-with-flask-step-by-step-744f3bdd7776)
- [Automated news summarization with BERT-powered encoders](https://github.com/huydang90/News-Summarization-with-BERT)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

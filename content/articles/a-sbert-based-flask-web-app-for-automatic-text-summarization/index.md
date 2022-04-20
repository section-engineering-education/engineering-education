With the help of [Sentence-BERT](https://arxiv.org/abs/1908.10084), a modification of the BERT network, semantic embeddings can be compared using cosine similarity. We'll create a Flask web app that summarizes text automatically using BERT in this tutorial.
### Prerequisites
- Have a basic knowledge of python programming language.
- Have an IDE installed, preferably [VS Code](https://code.visualstudio.com/).

### Table of contents
- [Building the Flask web app](#building-the-flask-web-app) 
- [Conclusion](#conclusion)
- [Reference](#reference)
### Building the Flask web app 
SBERT may now be used for additional types of tasks, such as comparing the semantic similarity of words. When summarizing a lengthy piece of writing, it is critical to seek for similarities between sentences to ensure that the summary is correct and does not distort the original text's meaning. BERT output is pooled in the architecture to provide a constant-size embedding of sentences.
#### Step One: Creating a virtual environment for the project
Before we start we will have to create a virtual evironment. Open terminal and create a virtual environment name `summarizerApp` in any directory you wish.

Use the following command for **python 3**:

```bash
python3 -m venv summarizerApp
```

> For python 2 remove the number 3.

Let's go ahead and activate the environment. Follow the command below:

```bash
source summarizerApp/bin/activate
```
After executing the above command you will notice that the `summarizerApp` is within brackets. This means that the environment is now active.

#### Installing Packages
1. **Install flask**: For making web applications, HTTP request management, and template rendering.

```bash
pip3 install Flask
```

2. **Install summarizer**: For getting the most relevant and valuable information out of a lengthy document.
```bash
pip3 install summarizer
```

3. **Install sentence-transformers**: Python framework for state-of-the-art sentence, text and image embeddings.

```bash
pip3 install -U sentence-transformers
```

4. **Install bert-extractive-summarizer**: To do extractive summaries, this tool makes use of the HuggingFace Pytorch transformers library.

```bash
pip3 install -q bert-extractive-summarizer
```

#### Step Two: Front-End coding
Inside your working directory, create a folder called `templates`. Create two files in that folder by opening it in [Visual Studio Code](https://code.visualstudio.com/).

These two files should be named as:
1. `index.html`
2. `summary.html`

In the `index.html` file, i included the below html code. The code consists of a home page code that displays a text field where the user can submit a significant chunk of content that will be summarized.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text Summarizer App</title>
    
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
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
            <br>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" name="data"></textarea>
        </div>
        <br>
        
        <button type="submit" class="btn btn-outline-primary">Summarize</button>
    </form>
    
</body>
</html>
```
The page looks like this:

![Home page](/section-engineering/a-sbert-based-flask-web-app-for-automatic-text-summarization/result.png )

To display a summary of the input text from the `index.html` page, then the `summary.html` file comes in. 

The `summary.html` file contains the below html code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Summary</title>
    <style>
        p{
            padding-top: 2em;
            text-align: center;
            line-height: 3em;           
            color: black;
            word-spacing: 0.25em;            
            font-family: 'Times New Roman', Times, serif;
        }
    </style>
    
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
    <nav class="navbar navbar-light" style="background-color: hsl(236, 96%, 22%);">
        <div class="container">
            <a class="navbar-brand">Text SUMMARY</a>
        </div>
    </nav>
    <p>{{ result }}</p>    
</body>
</html>
```
The page looks like this:

![Summary page](/section-engineering/a-sbert-based-flask-web-app-for-automatic-text-summarization/summarized.png )

#### Step Three: Back-End coding
In your project folder, create a file named `app.py` and should contain the below code.

```python
#importing flask
from flask import Flask, render_template,request
#Importing the summarizer
from summarizer import Summarizer
from summarizer.sbert import SBertSummarizer
```

The latest version of `bert-extractive-summarizer` lets you use `Sentence Bert`. It's based on [this](https://arxiv.org/abs/1908.10084) paper and [this]( https://www.sbert.net/) library.

After importing libraries we create create a SBERT model. We'll use our SBERT model to summarize the required content in our next session.

```python
# Using an instance of SBERT to create the model
model = SBertSummarizer('paraphrase-MiniLM-L6-v2')

app = Flask(__name__)# If you want to know which URL should be used to call the associated method, use the route() function of Flask's class. The URL binding with the function is represented by the rule's rule argument.

@app.route("/")#In this case, mapping the URLs to a function that will handle the logic for each individual URL
def msg():
    # Giving a result
    return render_template('index.html')
    
@app.route("/summarize",methods=['POST','GET'])# If the gateway is unable to obtain the client's IP address, this information will be missing from the request.
def getSummary():
    body=request.form['data']# Sending a request
    result = model(body, num_sentences=5)# Defining instances
    return render_template('summary.html',result=result)
    
if __name__ =="__main__":# When modules are imported, it allows or deny certain code to be executed.
    app.run(debug=True,port=8000)#IP address on which a Web client can communicate with the server.
```
In the above code;
- We are using an instance of SBERT to create the model.
- `SBertSummarizer('paraphrase-MiniLM-L6-v2')`: This is a sentence-transformers model used for assignments since it converts phrases and paragraphs into a 384-dimensional dense vector space. It is faster and offers good quality.
- `return render_template('index.html')`: Display the `index.html` contents which is our home page.
- `return render_template('summary.html',result=result)`: Display the `summary.html` data. In our case it's the summary page.
- `app.run(debug=True,port=8000)`: The IP address on which a Web client can communicate with the server.

We obtain the `index.html` input by tapping into the form using `request.form[`data`]`. This data is then saved in the variable, body. SBERT's summary of the text in the body is stored in the variable`result.`

#### Step Four: Running the application
In your project folder, there should exist the following:
- The folder containing files installed during virtual environment creation.
- The templates folder.
- `app.py` file containing python code.

With the above mentioned, we can run our app from the terminal. Activate the virtual environment you created and run the following command:

```
python app.py
```
In your terminal, a warning message will be displayed.

![Terminal](/section-engineering/a-sbert-based-flask-web-app-for-automatic-text-summarization/terminal.png )

In your browser, search the given web address:
http://127.0.0.1:8000 


![Result](/section-engineering/a-sbert-based-flask-web-app-for-automatic-text-summarization/result.png )

#### Step Five:Testing 
Enter text that you wish to be summarized and press summarize.

![Before summarization](/section-engineering/a-sbert-based-flask-web-app-for-automatic-text-summarization/text.png )

![After summarization](/section-engineering/a-sbert-based-flask-web-app-for-automatic-text-summarization/summarized.png )

### Conclusion
In this blog, we demonstrated how to effectively construct a Flask web application that utilizes SBERT to summarize a given piece of material. We constructed a virtual environment, installed packages, coded both the front-end and back-end of our web application, and finally launched it.
### Reference
- Find the code for this tutorial [here](https://github.com/FranciscaNg/A-Flask-Web-App-for-Automatic-Text-Summarization-Using-SBERT).
- Build, Save and Deploy your first [Web App](https://medium.com/analytics-vidhya/build-save-and-deploy-your-first-web-app-using-flask-and-pythonanywhere-110ddd691026) using Flask.
- Develop a NLP Model in Python & [Deploy It with Flask.](https://towardsdatascience.com/develop-a-nlp-model-in-python-deploy-it-with-flask-step-by-step-744f3bdd7776)
- [Automated News Summarization with BERT-Powered Encoders](https://github.com/huydang90/News-Summarization-with-BERT)


Happy coding!

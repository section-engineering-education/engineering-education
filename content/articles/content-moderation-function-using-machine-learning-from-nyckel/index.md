### Comment moderation function using Machine Learning using Nyckel
### Introduction
Nyckel is a Machine Learning API that has proven very efficient in training automated models capable of performing different tasks. A comment function identifies and classifies messages regarding the content it holds. This article creates a comment function, trains its model using Nyckel, and integrates the Nyckel model with the function to classify messages on the likeliness of spam in a message.

### Table of Contents
- [Comment moderation function using Machine Learning using Nyckel](#comment-moderation-function-using-machine-learning-using-nyckel)
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Goal](#goal)
- [Requirements](#requirements)
- [Starting up with Nyckel](#starting-up-with-nyckel)
- [Creating the comment function](#creating-the-comment-function)
- [Training the model](#training-the-model)
- [Testing the model Accuracy](#testing-the-model-accuracy)
- [Integrating the model with a website using JavaSript](#integrating-the-model-with-a-website-using-javasript)
- [Why use Nyckel API?](#why-use-nyckel-api)
- [Why do people still prefer manual training?](#why-do-people-still-prefer-manual-training)
- [Conclusion](#conclusion)

### Goal
You should be able to do the following by the end of this article: 
- Work with Nyckel machine learning API
- Create a comment moderation function using the API
- Come up with a working model able to classify messages

### Requirements
For a successful session on creating your function, you will be required to have;
 - Prior understanding of API's
 - A dataset for training the model
 - A stable network connection since the API works online

### Starting up with Nyckel
If you are new to Nyckel, you will be required to [sign up](https://login.nyckel.com/login?state=hKFo2SA4TzFYUDJfUDF0Y1N0cllWOWZlbllHV1dSa00xMUlzX6FupWxvZ2luo3RpZNkgNFlNS0M0N3VyVFdEQ09RSXlSQ3ppTk93SHdlLWNUaDCjY2lk2SBJdnlPaktQa011YXJHMzZIb2xYb3NUU1BNVnJaT0xtOQ&client=IvyOjKPkMuarG36HolXosTSPMVrZOLm9&protocol=oauth2&redirect_uri=https%3A%2F%2Fwww.nyckel.com%2Fauthentication%2Flogin-callback&response_type=code&scope=openid%20profile%20email&code_challenge=DtoVaFWuRD2B2vYHqKfpsky4k3KlxVKp7j5W1Z9l3Pg&code_challenge_method=S256&response_mode=query) with a valid email address or your Gmail account. Creating an account with Nyckel allows you to use the services offered by Nyckel API. After you log in or signup, you will be directed to the page in the photo below.

![home](engineering-education/comment-moderation-using-machine-learning-from-nyckel/home.png)

### Creating the comment function
Once on the home page, click the 'New function' button at the bottom of the page. This will lead you to the page shown below.

![function](engineering-education/comment-moderation-using-machine-learning-from-nyckel/function.png)

This page gives you two types of data input i.e. text and image. In this case, you are classifying comments, so the text will be the preferable input. Select *text* the add the labels in the forms that follow as `spam` and `Not spam`. Once done, hit the **create function** button which will create the function named **NewFunction**. You can rename this function name to give a name like `commentFunction` for easy identification in case you have 

### Training the model
You'll need a set of data in CSV, TSV, or JSON format to train your model. If you don't have one, you can download the dataset used in this example from [here](https://www.kaggle.com/saurabhshahane/twitter-sentiment-dataset). Click on the canvas or drag to upload the file you intend to use for training and follow the upload rules provided. The CSV file is displayed with its content where you have to select the columns you want to use (use the column with more text). Select a column and click import.

Once imported, the text will be displayed as it appeared in the cells where you will be required to manually train a few lines. All you need is to select the type of text you refer to as `spam` and `not spam` as shown in the photo below.

![category](engineering-education/comment-moderation-using-machine-learning-from-nyckel/category.png)

You are required to label around fifteen inputs then the models take time to learn from that. Once the model train from the inputs, it automatically labels the rest while indicating the accuracy in percentage form. As you will note, the accuracy after training a few is low but as you train more, the accuracy consequently rises. This coincides with the AI fact that *the higher the training data, the higher the accuracy of the model*.

### Testing the model Accuracy
Having trained the model with a great amount of data, you can perform a satisfaction test to determine how accurate your model is using different data. Navigate to `invoke` at the top to move to the testing page. Once on this page, type or paste the data you want to use for testing on the canvas labeled **function input**. The results are displayed at the **function output** with the label and the percentage accuracy as shown below.

![result](engineering-education/comment-moderation-using-machine-learning-from-nyckel/result.png)

This is used to confirm that the model is well trained and ready to be used with real data. Once satisfied with the accuracy of the model, you can integrate it with your website using JavaScript as explained in the code [below](#integrating-the-model-with-a-website-using-javasript).

### Integrating the model with a website using JavaSript
Since this article is about Machine learning using Nyckel, it will not go deep into developing a website to use with the model. This section will cover how you can invoke the model from Nyckel to act as if it is inbuilt within the site. The code below creates the connection to the API.

```JavaScript
// The whole of this code send a request to the API from the website
function checkText(text)
{
    var formdata = new FrmData();
    formdata.append('file', text);
// this enables the model interpret the appended text as if it is in the web application
    $.ajax({
        url: 'https://www.nyckel.com/v1/functions/j3l3xdfs0fv4tec7/invoke',
        type: 'post',
        data: formdata,
        //contentType: false,
        //processData: false,
        dataType: 'json',
        success: function (response) // the text is checked against the model for easy classification
        {
        
            displayResult(response);    // On checking, the text is classified as either "Spam" or "Not Spam" and displayed by this function

        },
        error: function (response)
        {
        // in case of an error with the text, the resetPage function clears the page with no response to indicate an error with classification.
            alert("Error checking text", response);
            $("#title").show();
            resetPage();
        }
    });
}
```
The URL to link to the application is provided on the API. To get one for your model, navigate to the API section, you will see a URL similar to the one below. 
```
https://www.nyckel.com/v1/functions/j3l3xdfs0fv4tec7/invoke

```
With all these steps working correctly, you should have your model complete and ready for use.

### Why use Nyckel API?
With the technological advancement in the machine learning field, different people are trying to come up with easier ways for everyone to embrace Artificial Intelligence. Building APIs is one of the most effective ways so far since no programming/coding skills are required to come up with trained models.

### Why do people still prefer manual training?
Despite the simplicity provided by the APIs, developers still prefer the old way of training models. Here are some reasons for their preference;

1. **Accuracy** - training your model using other methods takes into consideration many factors, which improve the accuracy of the model
2. **Control over the model** - APIs don't give you total control over the model. Sometimes you may never know the factors considered for it to make decisions. For this reason, programmers prefer better ways where they write their code for training models.

### Conclusion
To this extent, you have been able to train a model which can be invoked in any site to classify text and detect spam messages. Although APIs are yet to be fully embraced, this tutorial expresses the simplicity behind them. This can help many web developers implement machine learning models in their applications, which is the predicted future in technology.

---
I hope you find this tutorial helpful.
---
layout: engineering-education
status: publish
published: true
url: /comment-moderation-function-using-machine-learning-from-nyckel/
title: Comment Moderation Function using Machine Learning with Nyckel
description: This tutorial will guide readers on how to create comment function and train a model using Nyckel.
author: victor-kamau
date: 2022-02-21T00:00:00-09:41
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/comment-moderation-function-using-machine-learning-from-nyckel/hero.png
   alt: Comment Moderation Function using Machine Learning with Nyckel Hero Image
---
Nyckel is a Machine Learning API that has proven effective in training automated models capable of performing different tasks. A comment function identifies and classifies messages regarding the content it holds.
<!--more-->
In this article, we will create a comment function, train its model using Nyckel, and integrate the Nyckel model with the function to classify messages on the likeliness of spam in a message.

### Table of Contents
- [Table of Contents](#table-of-contents)
- [Goal](#goal)
- [Requirements](#requirements)
- [Starting up with Nyckel](#starting-up-with-nyckel)
- [Creating the comment function](#creating-the-comment-function)
- [Training the model](#training-the-model)
- [Testing the model accuracy](#testing-the-model-accuracy)
- [Integrating the model with a website using JavaScript](#integrating-the-model-with-a-website-using-javascript)
- [Why use Nyckel API?](#why-use-nyckel-api)
- [Why do people still prefer manual training?](#why-do-people-still-prefer-manual-training)
- [Conclusion](#conclusion)

### Goal
By the end of this article, you should be able to do the following:
- Work with Nyckel machine learning API.
- Create a comment moderation function using the API.
- Come up with a working model able to classify messages.

### Requirements
For a successful session on creating your function, you will need:
- Prior understanding of API's.
- A dataset for training the model.
- A stable network connection since the API works online.

### Starting up with Nyckel
If you are new to Nyckel, you will be required to [sign up](https://login.nyckel.com/login?state=hKFo2SA4TzFYUDJfUDF0Y1N0cllWOWZlbllHV1dSa00xMUlzX6FupWxvZ2luo3RpZNkgNFlNS0M0N3VyVFdEQ09RSXlSQ3ppTk93SHdlLWNUaDCjY2lk2SBJdnlPaktQa011YXJHMzZIb2xYb3NUU1BNVnJaT0xtOQ&client=IvyOjKPkMuarG36HolXosTSPMVrZOLm9&protocol=oauth2&redirect_uri=https%3A%2F%2Fwww.nyckel.com%2Fauthentication%2Flogin-callback&response_type=code&scope=openid%20profile%20email&code_challenge=DtoVaFWuRD2B2vYHqKfpsky4k3KlxVKp7j5W1Z9l3Pg&code_challenge_method=S256&response_mode=query) with a valid email address or your Gmail account. Creating an account with Nyckel allows you to use the services offered by Nyckel API. After signing in, you will be directed to the following page:

![home](/engineering-education/comment-moderation-function-using-machine-learning-from-nyckel/home.png)

### Creating the comment function
Once you are on the home page, click the `New function` button at the bottom of the page, after which you will be directed to the page shown below:

![function](/engineering-education/comment-moderation-function-using-machine-learning-from-nyckel/function.png)

This page gives you two types of data input i.e. text and image. In this case, you are classifying comments, so the text will be the preferable input.

Select *text* then add the labels in the forms that follow as `spam` and `Not spam`. Afterwards, hit the **create function** button which will create the function named **NewFunction**.

You can rename this function name to give a preferable name, in this case, its `commentFunction` for easy identification in case you have more than a function in your account.

### Training the model
For this section, a set of data in `CSV`, `TSV`, or `JSON` format is required to train the model. If you don't have it, you can download the dataset used in this example from [here](https://www.kaggle.com/saurabhshahane/twitter-sentiment-dataset).

Click on the canvas or drag to upload the file you intend to use for training and follow the upload rules provided. 

The `CSV` file for this model is displayed with its content where you have to select the columns you want to use (use the column with more text).

Select a column, then click `import`.

After a successful import, the text will be displayed as it appeared in the cells where you will be required to manually train a few lines. All you need is to select the type of text you refer to as `spam` and `not spam` as shown in the image below:

![category](/engineering-education/comment-moderation-function-using-machine-learning-from-nyckel/category.png)

You are required to label around fifteen inputs then the models take time to learn from that. Once the model trains from the inputs, it automatically labels the rest while indicating the accuracy in percentage form.

You will notice that the accuracy after training a few is low but as you train more, the accuracy consequently rises. This coincides with the AI fact that *the higher the training data, the higher the accuracy of the model*.

### Testing the model accuracy
Having trained the model with a great amount of data, you can perform a satisfaction test to determine how accurate your model is, using different data.

To do that, navigate to `Invoke` at the top to move to the testing page. While on the page, type or paste the data you want to use for testing on the canvas labeled **function input**.

The results are displayed at the **function output** with the label and the percentage accuracy as shown below:

![result](/engineering-education/comment-moderation-function-using-machine-learning-from-nyckel/result.png)

This is used to confirm that the model is well trained and ready to be used with real data. If you are content with the accuracy of the model, you can integrate it with your website using JavaScript as explained below:

### Integrating the model with a website using JavaScript
Since this guide is about Machine learning using Nyckel, we will not go deep into developing a website to use with the model.

This section will cover how you can invoke the model from Nyckel to act as though it is built within the site.

The code below creates the connection to the API:

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

The URL to link to the application is provided on the API. To get one for your model, navigate to the API section. You will see a URL similar to this one: `https://www.nyckel.com/v1/functions/j3l3xdfs0fv4tec7/invoke`

With all these steps working correctly, you should have your model complete and ready for use.

### Why use Nyckel API?
With the technological advancement in the machine learning field, different people are trying to come up with easier ways for everyone to embrace Artificial Intelligence. 

Building APIs is one of the most effective ways so far since no programming/coding skills are required to come up with trained models.

### Why do people still prefer manual training?
Despite the simplicity provided by the APIs, developers still prefer the old way of training models. 

Here are some reasons why:
1. **Accuracy** - training your model using other methods takes into consideration many factors, which improve the accuracy of the model
2. **Control over the model** - APIs don't give you total control over the model. Sometimes you may never know the factors considered for it to make decisions. For this reason, programmers prefer better ways where they write their code for training models.

### Conclusion
Up to this point, you have learned to train a model which can be invoked in any site to classify text and detect spam messages. Although APIs are yet to be fully embraced, this tutorial expresses the simplicity behind them.

This can help many web developers implement machine learning models in their applications, which is the predicted future of technology.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)

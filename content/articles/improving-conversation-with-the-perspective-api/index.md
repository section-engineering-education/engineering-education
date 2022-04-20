### Introduction

[Perspective](https://www.perspectiveapi.com/#/) is a free API that uses machine learning to identify "toxic" comments, making it easier to host better conversations online. By reading this article you will understand what exactly is perspective API and how to work with it.

### Table of content

- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [How it works](#how-it-works)
- [Why should you use Perspective?](#why-should-you-use-perspective)
- [Language availability](#language-availability)
- [Step 1: Starting with the API](#step-1-starting-with-the-api)
- [Step 2: Getting a Score with cURL](#step-2-getting-a-score-with-curl)
- [Step 3: Send An Ajax Request](#step-3-send-an-ajax-request)
- [Alternative way - The WordPress Way](#alternative-way---the-wordpress-way)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Prerequisites

- Fundamentals of PHP and Javascript programming languages.

### How it works

Perspective uses machine learning models to identify abusive comments. The models score a phrase based on the perceived impact the text may have in a conversation. Developers and publishers can use this score to give feedback to commenters, help moderators more easily review comments, or help readers filter out "toxic" language. Perspective models provide scores for several different attributes. In addition to the flagship Toxicity attribute, here are some of the other attributes Perspective can provide scores for:

- Severe Toxicity
- Insult
- Profanity
- Identity attack
- Threat
- Sexually explicit

### Why should you use Perspective?

Perspective has been shown to increase engagement by helping platforms and publishers create safe environments for conversation, and by helping individuals make healthier contributions online.

1. Enables healthy conversations
2. Reduces toxicity and abusive behavior
3. Free, Self-Serve, Customizable.

### Language availability

Perspective API is free and available to use in Arabic, Chinese, Czech, Dutch, English, French, German, Hindi, Hinglish, Indonesian, Italian, Japanese, Korean, Polish, Portuguese, Russian, and Spanish. More models are being developed to constantly support new languages.

### Step 1: Starting with the API

To get started with using the API, you’ll need to [request API access](https://www.perspectiveapi.com/) from their website. I managed to get access within a few days. If you’re interested in playing with this yourself, know that you might need to wait it out until they email you back. Once you get the email saying you have access, you’ll need to log in to the Google Developer Console and get your API key. Create your credentials with the amount of security you’d like and then you’re ready to get going! Now you’ll need to head over to the [documentation](https://github.com/conversationai/perspectiveapi) on GitHub to learn a bit more about the project and find out how it works. The documentation includes lots of information about what features are currently available and what they’re ultimately designed to achieve. Remember: the main point of the API is to provide a score of how toxic a comment is, so to do anything extra with that information will require some work.

### Step 2: Getting a Score with cURL

Let’s use PHP’s cURL command to make the request and get the score. If you’re not used to cURL, don’t panic; it’s relatively simple to get the hang of. If you want to try it within WordPress, it’s even easier because there are native WordPress helper functions you can use. Let’s start with the standard PHP method. Whilst we walk through this, it’s a good idea to have the [PHP documentation](https://www.php.net/docs.php) open to refer to. To understand the fundamentals of cURL, we’ll go through a couple of the core options we may need to use.

- index.php

```php
$params = array(
  'comment' => array(
    'text' => 'what a stupid question...',
    'languages' => array(
      'en'
    ),
    'requestedAttributes' => array(
      'TOXICITY' => ''
    )
  )
);

$params = json_encode($params);

$req = curl_init();
curl_setpot($req, 'CURLOPT_URL', 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze');
curl_setpot($req, 'CURLOPT_POSTFIELDS', $params);
curl_setopt($req, CURLOPT_HTTPHEADER, array('Content-Type: application/json');
curl_exec($req);
curl_close($req);
```

The above seven lines simply perform different actions when you want to make a cURL request to a server. You’ll need to initialize the cURL request, set the options for the request, execute it, then close the connection. You’ll then get your comment data back from the server in the form of JSON data which is handy for several reasons.

### Step 3: Send An Ajax Request

As you get the response from the API in JSON format, you can also make an Ajax request to the API. This is handy if you don’t want to dive too much into PHP and the method of using cURL requests. An example of an Ajax request (using jQuery) would look something like this:

```javascript
$.ajax({
  data: {
    comment: {
      text: "this is such a stupid idea!!",
    },
    languages: ["en"],
    requestedAttributes: {
      TOXICITY: {},
    },
  },
  type: "post",
  url: "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=YOUR-API-KEY",
  success: function (response) {
    console.log(response);
  },
});
```

The data we get back is now logged to the console ready for us to debug it. Now we can decode the JSON data into an array and do something with it. Make sure you include your API key at the end of the URL in the Ajax request too otherwise it won’t work! Without it; you’ll get an error about your authentication is invalid. Also, you don’t have to stop here. You could also take the example above a step further and log the score in a database as soon as you’ve got the data back, or provide feedback to the user on the front-end in the form of an alert.

### Alternative way - The WordPress Way

If you’re using WordPress (which is relevant here since WordPress has comment threads you might want to moderate) and you want to make a cURL request to the Perspective API, then it’s even simpler. Using the [Toxic Comments plugin](https://wordpress.org/plugins/toxic-comments/) as an example, you can do the following instead thanks to WordPress’ exhaustive built-in functions. You won’t need to do any of the following if you use the plugin, but it’s worth explaining what the plugin does behind the scenes to achieve what we want to do here.

```php
$request = wp_remote_post($arguments, $url);
```

This will make a post request to the external resource for us without doing much leg work for it. There are other functions that you can use too, as a get request but we don’t need to think about that right now. You then need to use another function to get the requested data back from the server. Yes, you’re completely right. WordPress has a function for that:

```php
$data = wp_remote_retrieve_body($request);
```

So that’s great, but how do we use the API to get the data we want? Well, to start with if you just want to get the overall toxicity score, you’ll need to use the following URL which will ask the API to read the comment and score it. It also has your API key at the end which you need to authenticate your request. Make sure you change it to yours!

> https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=YOUR-API-KEY

It looks quite plain and if you visit it, it’ll take you to a 404 page. But if you make a cURL request to it, either through your favorite CMS or via a simple PHP script, you’ll end up getting data that might look similar to this:

```JSON
{
  "attributeScores": {
    "TOXICITY": {
      "summaryScore": {
        "value": 0.56789,
        "type": "PROBABILITY"
      }
    }
  },
  "languages": ["en"]
}
```

The score you’ll get back from the API will be a number as a decimal. So if a comment gets a score of 50% toxicity, the score you’ll get back from the API will be 0.5. You can then use this score to manipulate the way the comment is stored and shown to the end-user by marking it as spam or creating a filter to let users show fewer or more toxic comments, much like Google has done in their example.

![Image-1](/engineering-education/edit/improving-conversation-with-the-perspective-api/image.png)

There are other bits of useful data you may want to look into as well. Things such as the context of the comment can help you understand the intent of the comment without reading it firsthand. Ultimately, with this kind of data we can expect to receive, it makes it possible to filter out certain comments with a particular intent and provide a nicer comment area where trolls can often take over. Over time when the API becomes more developed, we should expect the scoring to be more robust and more accurate in the analysis of the comment we send it.

### Conclusion

The Perspective API makes a great effort to score comments based on a highly complex algorithm, but it seems that there is still a long way to go yet in the fight to maintain more civil social spaces online. Until then, play around with the API and get to know much about it. Also, remember to an error on the side of caution as the API is still in an alpha phase for now so things may break.

Happy Coding!

### Further Reading

- [Getting Started with Jigsaw](https://jigsaw.google.com/)

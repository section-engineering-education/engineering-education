#### Introduction
Toxicity Score is a numerical representation of how detrimental a piece of writing is, and the Perspective API is anticipated to provide you with that information by rating a line of text (such as a remark). When considering how many online discussions have been led, the technique is to reduce the type of debate so that individuals aren't discouraged from participating. Using this number, engineers and distributors can pass along feedback to experts and aid commentators in their evaluations. Viewpoint models have been providing scores for quite some time that indicate substantial harm, insult, disdain, character assault and danger.

### Prerequisites
> In order to follow this tutorial, users should be familiar with the PHP and Javascript programming languages.

### Objectives
- Before the end of this instructional exercise, users will be familiar with the following concepts:
1. Introduction to APIs
2. Getting a Score with Client Uniform Resource Locator(cURL)
3. Send A Request Using Ajax
4. The WordPress Method
5. Confidentiality and Censorship

### Table of content
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Table of content](#table-of-content)
- [Starting with the application programming interface (API)](#starting-with-the-application-programming-interface-api)
- [Obtaining a score with cURL](#obtaining-a-score-with-curl)
- [Make An Ajax Query](#make-an-ajax-query)
- [The WordPress Approach](#the-wordpress-approach)
- [Data Security](#data-security)
- [Conclusion](#conclusion)

### Starting with the application programming interface (API)
To get started with the API, go to the company's website and fill out the API access request form on the site. Be aware that you may need to wait for a response to your email before you can actually try it out. After getting the confirmation email, the API key can only be retrieved by going into the Google Developer Console and requesting it. In less than a few minutes, you may create your login credentials with the level of security that is appropriate for your needs. Please note that the API's primary goal is to provide a score for each comment, and that any other use of this information would necessitate extra exertion.

### Obtaining a score with cURL
To make the request and obtain the result, let's utilize PHP's cURL tool. If you're not familiar with cURL, don't be concerned; it's a reasonably straightforward concept to grasp. While we're going through this, it's actually rational to have the 'PHP documentation' open so that we can refer to it later on. Take a look at a couple of the main options we'll be using in this tutorial to get a better understanding of what cURL is about.
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
When you need to submit a cURL request to a server, the lines listed above can be used to complete a number of different activities. To complete the procedure, a cURL request must be launched, the request settings must be specified, the command must be run, and the connection must be terminated. Following that, you'll receive back from the server comment information in the form of JSON data, which can be used for a variety of purposes depending on the situation.

### Make An Ajax Query
Ajax requests to the API are supported due to the fact that the API produces results in the JSON format. The Ajax method of obtaining data is an excellent choice if you don't want to become too involved with PHP and the cURL technique of requesting data. This below code snippet demonstrates an Ajax request made using the jQuery library:
```javascript
$.ajax({

        data: {
                comment: {
                        text: "this is such a stupid idea!!"
                },
                languages: ["en"],
                requestedAttributes: {
                        TOXICITY: {}
                }
        },
        type: 'post',
        url: 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=YOUR-API-KEY',
        success: function(response) {

                console.log(response);

        }

});
```
As soon as we receive the data back, it is recorded in the control location where it will be reviewed. At some point, we'll be able to work with the JSON data to make something useful out it. If you don't include your API key in the URL's Ajax interest, it won't function. If you don't have it, you'll get an error message stating that your confirmation is invalid. As an alternative, you might take the model a step further and log the score in a database when you get the data back, or give the client a contribution toward the front as an alert.

### The WordPress Approach
Making use of the Toxic Comments WordPress extension is a fantastic strategy to ensure that the associated work is completed as efficiently as possible. The use of this module lessens the necessity for dreary errands, which is a fabulous depiction of the work that the module acts in the background to help us with achieving our goals.

```php
$request = wp_remote_post($arguments, $url);
```

A request to an external asset can be published using this manner without needing an incredible amount of effort on the part of the author. We don't need to think about it right now, but there are other capabilities that you can use, such as the ability to receive requests, that we can take advantage of in the future. To obtain the information you requested from the server, you will need to use a separate function. As it turns out, WordPress does indeed provide a tool that can assist you in accomplishing this:

```php
$data = wp_remote_retrieve_body($request);
```

How can we make use of the API to obtain the information that we require? A thorough toxicity rating can only be acquired by requesting the API to read and score the comment by using the URL provided in combination with the comment and submitting the request. You'll also receive your API key at the conclusion of the process, which you'll need in order to authenticate any queries you make. It is necessary to mention your name and address.

https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=YOUR-API-KEY

There is nothing complicated about it at first glance, but when you try to access it, you are redirected to the 404 error page instead. It will respond to a cURL request, whether made using your chosen CMS or directly through a PHP script. The data returned will be in the following format:
```JSON
{
  "attributeScores": {
    "TOXICITY": {
      "summaryScore": {
        "value": 0.567890,
        "type": "PROBABILITY"
      }
    }
  },
  "languages": [
    "en"
  ]
}
```
As a result of your request, you will receive a decimal number as the final result. The API will then return for that comment a score of 0.5, which indicates that the comment has a 50% chance of being toxic. It is possible to use this score to govern how a comment is handled and displayed to the end user by labeling it as spam or offering a channel that allows clients to show less or more negative comments, just as Google has done with their method of scoring.

![Image-1](Image-1)

In addition, there are a variety of important details that you may want to investigate further. It's possible to get a sense of the motive behind a comment by looking at the context in which it was posted rather than actually reading the comment in question. Because of the data we can expect in the future, it is possible to filter through explicit remarks with explicit aims and create a more magnificent comment area where savagery can occasionally dominate. Over time, as the API develops and improves, we should expect that the score it assigns to our comment will become more accurate and anchored in fact.

### Data Security
Whenever you move your information to Google, where it will be segregated and kept on a Google PC, it may have a detrimental impact on your ability to use your voice and to access your information. Despite the fact that I believe it to be a fantastic idea, it does not appear to be working well for everyone. This is especially evident when you consider how commonly it is utilized on well-known news websites and electronic media stages, creating the possibility of safety and control concerns.

### Conclusion
It's clear that despite the Perspective API's efforts to score comments using a convoluted computation, there is still a lot of work to be done in the effort to keep more tranquil social places on the web.

Happy coding!

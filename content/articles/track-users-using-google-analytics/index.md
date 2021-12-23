---
layout: engineering-education
status: publish
published: true
url: /track-users-using-google-analytics/
title: Track Individual Logged-In Users Using Google Analytics
description: This tutorial will be a brief introduction to Google Analytics. The reader will learn how to track individual users and generate a statistical report for any website.
author: nancy-muthoni
date: 2021-12-23T00:00:00-13:35
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/track-users-using-google-analytics/hero.png
    alt: Track Individual Logged-In Users Google Analytics Hero Image
---
[Google Analytics](https://analytics.google.com/analytics/web/) is a free web analytics service that allows you to analyze in-depth detail about the visitors to your website.
<!--more-->
In this article, we will go through an in-depth view of how we can implement Google Analytics to track the activities of our website users.

### Objectives
By the end of this article, the readers will be familiar with the following:
- Setting up a Google Analytics account.
- Creating Google Analytics property.
- Creating a view with `User Id` enabled.
- Creating custom dimensions to track user types.
- Modifying tracking code to include `User Id` and custom dimensions.
- Creating custom reports, viewing, and analyzing data
- Why should you use Google Analytics?
   
### Table of contents
- [Objectives](#objectives)
- [Table of contents](#table-of-contents)
- [Set up Google Analytics account](#set-up-google-analytics-account)
- [Create property](#create-property)
- [Create a view with user ID enabled](#create-a-view-with-user-id-enabled)
- [Create custom dimensions to track user types](#create-custom-dimensions-to-track-user-types)
- [Modify tracking code](#modify-tracking-code)
- [Create custom reports, view and analyze data](#create-custom-reports-view-and-analyze-data)
- [Why should you use Google Analytics?](#why-should-you-use-google-analytics)
  - [It's free](#its-free)
  - [Automatic collection of data](#automatic-collection-of-data)
  - [You can create customization reports](#you-can-create-customization-reports)
  - [Easy integration with other tools and platforms](#easy-integration-with-other-tools-and-platforms)
  - [Ability to measure internal site search](#ability-to-measure-internal-site-search)
  - [To understand why visitors are bouncing off your website](#to-understand-why-visitors-are-bouncing-off-your-website)
  - [To know the age, gender, interest, device, and location of your audience](#to-know-the-age-gender-interest-device-and-location-of-your-audience)
  - [To understand which social platforms to target](#to-understand-which-social-platforms-to-target)
  - [To understand what kind of content you should write](#to-understand-what-kind-of-content-you-should-write)
  - [To check if you are achieving goals](#to-check-if-you-are-achieving-goals)
- [Conclusion](#conclusion)
  
### Set up Google Analytics account
In this step, log on to the [Google Analytics](https://analytics.google.com/analytics/web/) website and create an account for tracking your website or application.

Refer to the image below for help. Then, click the `Create Account` to create a new tracking account as shown:

![google-analytics-admin](/engineering-education/track-users-using-google-analytics/google-analytics-admin.png)

### Create property
A `property` in Google Analytics can be a website, mobile application, blog, or any piece of content that has its tracking ID.

The following screen shows how you can create an account:

![account-detail](/engineering-education/track-users-using-google-analytics/account-detail.png)

Similarly, you can create a new property by clicking on `Create Property`.

### Create a view with user ID enabled
A `view` can be considered a collection of rules that Google uses to process traffic on a domain.

This is the step where we are stepping into the `User Id` tracking.

Generally, when creating a `view`, the `User Id` option is `OFF` by default. One needs to switch it `ON` to track individual users:

![analytics-view-with-user-id](/engineering-education/track-users-using-google-analytics/analytics-view-with-userid.png)

### Create custom dimensions to track user types
`Custom Dimensions` and `Custom Metrics` are set by your account's default dimensions and metrics.

You can use them to collect and analyze data that Google doesn't automatically track. So, let's create our dimension and metric.

> You can learn more about dimensions and metrics [here](https://support.google.com/analytics/answer/1033861?hl=en#zippy=%2Cin-this-article).

In simple words, dimensions are the titles of the rows in your Google Analytics reports, whereas metrics are the numbers that populate these rows.

We create custom dimensions to capture and analyze the data sent to Google about the logged-in user.

For example, consider we have different users like general users who do not log in but use the site anonymously. There are basic members, authors, and an admin who accesses the webpage.

In any case, you need to create a dimension as a `User Type` that supplies different user types as values.

![google-analytics-custom-dimension-user-type](/engineering-education/track-users-using-google-analytics/google-analytics-custom-dimension-user-type.png)

![analytics-custom-dimentions](/engineering-education/track-users-using-google-analytics/analytics-custom-dimension.png)

### Modify tracking code
In website analytics, a `tracking code` is a snippet of JavaScript code that tracks the activity of a website user by collecting data and sending it to the analytics module.

The code generated automatically is different for each website and must be installed on each page you want to track.

From the above step, we have to add the code for setting the dimension:

```javascript
ga('set', 'dimension1', dimensionValue);
```

- Here, `dimension1` represents a custom dimension that we created in the previous step. In our example, it is `User Type`.
- `dimensionValue` can be `{'Anonymous User', 'Member', 'Author', 'Admin'}` depending on the state of your application.
- Using the application login sessions, you can supply these values.

The tracking code will be as below for a non-logged-in user:

```javascript
<script>
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        },
        i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})
(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-1111112345-1', 'auto');
ga('set', 'dimension1', 'Visitor');
ga('send', 'pageview');
</script>
```

> You should substitute your `UA-id` in the above code

To understand more about the above code, it is highly recommended to go through [this](https://stackoverflow.com/questions/22716542/google-analytics-code-explanation) StackOverflow post.

You should note the line where we set the `userId` field and its value as `147`. This `147` is the ID within our application acting like a primary key that can individually identify a user.

You should not set it as email or other common information using which Google can identify a user since it violates the agreement.

The value should be strictly in the context of your application, and it should not make any sense for Google. So then, the next thing you should note is the value set for `dimension1` as `Author`.

For a logged-in user, it will be as shown below:

```javascript
<script>
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-1111112345-2', 'auto');
ga('set', 'userId', '147');
ga('set', 'dimension1', 'Author');
ga('send', 'pageview');
</script>
```

### Create custom reports, view and analyze data
A custom report is one that you produce yourself. You chose how to display the dimensions (City and Browser, for example) and metrics (Sessions, Pageviews, and Bounce Rate, for example). At least one dimension and one metric must be specified.

Now, the data is captured and sent to Google for tracking a logged-in user.

How are we going to extract that information back?

Google provides a `User Explorer` where we can create custom reports:

![google-analytics-customs-reports](/engineering-education/track-users-using-google-analytics/google-analytics-custom-report.png)

![google-analytics-custom-report-with-user-type](/engineering-education/track-users-using-google-analytics/google-analytics-custom-report-with-user-type.png)

Let us check the Google Analytics provided `User Explorer` report. You can see the user id that is passed from the application.

![google-analytics-user-explorer](/engineering-education/track-users-using-google-analytics/google-analytics-user-explorer.png)

> When you use this feature, you need to use it responsibly. You should get explicit permission from the user highlighting that you are using this user-id feature. Ensure that it is legal in your region.

### Why should you use Google Analytics?
Nowadays, almost all businesses have an online presence through a website. Therefore, it becomes very important for you to learn the inner structure of your website to see whether it is accomplishing its purpose or not.

For this, you need to know what people do when they visit your website, how long they stay, and what all pages they visit on your website.

Irrespective of whether you are an e-commerce website or an informative blog, you would want to understand and study your visitors' behaviours to deliver better results.

Given below are some reasons as to why you should use Google Analytics to get better insights into your website and visitors:

#### It's free
You must have heard the saying that, “There is no free lunch.” But, in the case of Google Analytics, it is not true.

Google does not charge you anything for using Google Analytics. You don't have to pay anything to use this product.

This way, you can invest a decent budget in some other important resources. Furthermore, it provides you with important information, numbers, and statistics that you need to maximize your website's performance for free.

#### Automatic collection of data
![automatic-data-collection](/engineering-education/track-users-using-google-analytics/automatic-data-collection.png)

Google Analytics has a feature that reduces the work required to put Google Analytics data into Google Docs, Sites, or Spreadsheets.

All you need to do is set up your Google Analytics account and copy a simple piece of code on your website. This will enable Google Analytics to collect data from your website and make reports accordingly automatically.

You have to not act to get the data. Google Analytics does all the work for you. You can even access your reports immediately without any delay. This feature of Google Analytics not only saves your work effort but also gives you immediate access to the reports. With this, you can soon implement strategies for the better performance of your website.

#### You can create customization reports
A `custom report` is a report that you create.

In Google Analytics, you can choose one of the many reports Google Creates or build your customized report using the drag and drop interface. In addition, you can pick the dimensions and metrics and decide how they should be displayed.

#### Easy integration with other tools and platforms
Another remarkable feature of Google Analytics is that it can be easily integrated with other tools and platforms.

Google Analytics presents a clear and easily usable interface like all other Google services. Not only does it work quite well on the desktop, but it also has a perfect usable Smartphone and Tablet through its app on the Google Play Store.

Google Analytics also has a powerful integration with Google AdWords. When you link the AdWords account with Analytics, you align two tools and enable them to work together. This combined work will provide you with actionable insights that will lead to the success of your AdWords Campaigns.

Hence, you can use Google Analytics with all your devices to easily implement data to other well-known Google products like Google AdWords and Google Search Console.

#### Ability to measure internal site search
![internal-site-search](/engineering-education/track-users-using-google-analytics/internal-site-search.png)

The internal site reveals what potential customers are looking for after arriving on your website. It also reveals the area of growth opportunity by uncovering the situations where certain situations may be unclear or lacking on your site.

Thankfully, Google Analytics allows you to track the internal site searches with a bit of customization. With this internal site search feature, you can better understand what people are searching for on your website. 

#### To understand why visitors are bouncing off your website
Bounce rate is one of the most important metrics, which refers to the percentage of visitors who leave your website after visiting only one page. Moreover, it is extremely important to reduce this rate as much as possible.

Many businesses witness huge traffic but insufficient conversions, which means that visitors are coming to your website but are not finding what they are looking for. This leads to a high bounce rate.

A high bounce rate calls for immediate action to identify the reason behind it. However, Google Analytics provides a detailed report of the pages experiencing a high bounce rate. For example, the reason for a high bounce rate could be that your website is not optimized properly, or maybe your landing page is not attractive enough for them to sign up.

Therefore, with the detailed report on bounce rate, you can find ways and means to reduce the bounce rate of your website.

#### To know the age, gender, interest, device, and location of your audience
With Google Analytics, you can uncover valuable data about your audience to determine which channels drive the most traffic to your website.

The Audience section provides a lot of information about the people who visit your website, like their age, gender, interests, devices, and location. It also gives you data on how the visitors were driven to your website.

- Age: It is one of the best indicators of where your audience spends most of the time. Knowing your website audience's average age can help you optimize your website accordingly.
![age](/engineering-education/track-users-using-google-analytics/age.png)
- Gender: The gender variable helps you describe your audience. Audience's gender plays an important role in how they communicate and engage online.
![gender](/engineering-education/track-users-using-google-analytics/gender.png)
Interests: With Google Analytics, you can understand your audience's interests and optimize your website by their interests.
- Device: Google Analytics also gives you views of what kind of device are they using. With this information, you can help your website be more responsive on various devices.
![device](/engineering-education/track-users-using-google-analytics/device.png)
- Not only this, with Google Analytics, you can also have a view on which kind of smartphone or tablet your audience uses.
![mobile-device-info](/engineering-education/track-users-using-google-analytics/mobile-device-info.png)
- Location: Understanding where your customers come from helps you formulate marketing strategies according to the physical location of your potential customers.
![location](/engineering-education/track-users-using-google-analytics/location.png)
- The geolocation feature of Google Analytics not only lets you know the country from where your visitors are coming from but the city from where they are and even the language they use.
![language](/engineering-education/track-users-using-google-analytics/language.png)

#### To understand which social platforms to target
![target-social-paltforms](/engineering-education/track-users-using-google-analytics/target-social-platforms.png)

Social platforms are a great way to drive traffic and engage potential customers. For example, with Google Analytics, you can view what catches the users' attention and then place the ad accordingly.

To choose the best platform to advertise to your customers, you need to set a generous budget aside for social media ads.

> For example: If you see a maximum of your customer engagement on Facebook and a substantial amount of traffic from Twitter, then according to this data, you can set more budget for Facebook and comparatively less budget on Twitter to acquire more customers.

With Google Analytics, you can gauge the performance of all the social platforms you are using. You can also check how much conversion value each social platform brings, traffic entering from social referrals, and how many users are talking about you.

#### To understand what kind of content you should write
Content is the king and, if created remarkably, can help you get more traffic and potential visitors. Good content is one of the best ways to reach out to your customers. This is why so many businesses create blogs, infographics, and slide shares to add value to their customers.

Google Analytics helps you keep track of all the content that receives views, shares, and with this data, you can enhance the top viewed blogs to appeal to the customers more productively.

Furthermore, it generates a breakdown of your blog posts' page views. You can rework the top-performed blog to generate more traffic.

#### To check if you are achieving goals
![acheving-goals](/engineering-education/track-users-using-google-analytics/achieving-goals.png)

The goals in Google Analytics help you track how much your business is moving ahead or progressing, and you can also assign several goals that will help you track the customer's journey based on their actions. There can be different goals, like making a purchase, filing a lead generation form, subscribing to newsletters, or downloading an ebook.

If a new visitor arrives at your landing page and completes the given form, including the email address, he just completed a goal decided by you.

Hence, with this information, your website just converted a visitor into a customer, thereby adding to the success of your business.

### Conclusion
In this article, we broadly looked at the following:
- Setting up Google Analytics Account up to and running.
- Creating Google Analytics Property.
- Creating a View with User-ID enabled.
- Creating Custom Dimensions to track user types.
- Modifying tracking code to include user-id and custom dimensions.
- Creating custom reports, viewing and analyzing data
- Why you should use Google Analytics?
  
Furthermore, Google Analytics can do wonders for your business in more advanced ways.

It provides you with valuable insights that can be used to improve the performance of your website and increase conversions. Even though there are so many other analytics management platforms, Google Analytics remains a free, highly relevant solution for managing your website's analytics.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

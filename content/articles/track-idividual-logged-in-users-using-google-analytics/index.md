### Introduction
Google Analytics is a popular digital analytics software that allows you to analyze in-depth details about the visitors to your website providing valuable insights that can help you shape the success strategy of your business.

### Objectives
> By the end of this article learners will be familiar with the following:
1. Setting up Google Analytics Account up and running.
2. Creating Google Analytics Property.
3. Creating a View with User-ID enabled.
4. Creating Custom Dimensions to track user types.
5. Modifying tracking code to include user-id and custom dimensions.
6. Creating custom reports, view and analyze data
7. Why should you use Google Analytics?

### Table of content
- [Introduction](#introduction)
- [Objectives](#objectives)
- [Table of content](#table-of-content)
- [Set up Google Analytics Account up an running](#set-up-google-analytics-account-up-an-running)
- [Create Property](#create-property)
- [Create View with User-ID enabled](#create-view-with-user-id-enabled)
- [Create Custom Dimensions to Track User Types](#create-custom-dimensions-to-track-user-types)
- [Modify tracking code to include logged in user-id and custom dimensions](#modify-tracking-code-to-include-logged-in-user-id-and-custom-dimensions)
- [Create custom reports, view and analyze data](#create-custom-reports-view-and-analyze-data)
- [Why should you use Google Analytics?](#why-should-you-use-google-analytics)
  - [1. It's free](#1-its-free)
  - [2. Automatic collection of data](#2-automatic-collection-of-data)
  - [3. You can create customization reports](#3-you-can-create-customization-reports)
  - [4. Easy integration with other tools and platforms](#4-easy-integration-with-other-tools-and-platforms)
  - [5. Ability to measure internal site search](#5-ability-to-measure-internal-site-search)
  - [6. To understand why visitors are bouncing off your website](#6-to-understand-why-visitors-are-bouncing-off-your-website)
  - [7. To know the age, gender, interest, device, and location of your audience.](#7-to-know-the-age-gender-interest-device-and-location-of-your-audience)
  - [8. To understand which social platforms to target](#8-to-understand-which-social-platforms-to-target)
  - [9. To understand what kind of content you should write](#9-to-understand-what-kind-of-content-you-should-write)
  - [10. To check if you are achieving goals](#10-to-check-if-you-are-achieving-goals)
- [Conclusion](#conclusion)

### Set up Google Analytics Account up an running
This step is standard and if you are not a beginner, just skip this and jump directly to step 3 to create the google analytics view. In this step, just log in to [Google Analytics](https://analytics.google.com/analytics/web/) and create an account for tracking your website or application. Refer to the image below for help. Click `Create Account` to create a new tracking account.
![google-analytics-admin](/engineering-education/track-individual-logged-in-users-using-google-analytics/google-analytics-admin.jpg)

### Create Property
A `property` in Google Analytics is a website, mobile application, blog, or another piece of content that has its tracking ID.Following this step, create a new property the same way you did with account creation. Refer to the image below for assistance.
![account-detail](/engineering-education/track-individual-logged-in-users-using-google-analytics/account-detail.jpg)

###  Create View with User-ID enabled
A `view` is a collection of rules for tracking traffic on a single domain. A `view` can be thought of as a single collection of rules that Analytics uses to process traffic on a domain. Therefore, when you create a `view` by default, the `User-id` option is usually off, and you need to switch it on to track individual users as demonstrated in the below image.
![analytics-view-with-user-id](/engineering-education/track-individual-logged-in-users-using-google-analytics/analytics-view-with-userid.jpg)

### Create Custom Dimensions to Track User Types
`Custom dimensions` and `custom metrics` are like default dimensions and metrics in your Analytics account, except you create them yourself. You can use them to collect and analyze data that Analytics doesn't automatically track. Google analytics by default has metrics and dimensions and we need to create custom dimensions to capture and send data to Google about the logged-in user. For example, consider we have different types of users like, general users who do not log in but use the site anonymously. Then we have general basic members, authors, and admin. So three types of logged-in users. This is just for example's sake.You might be having only one type ( just logged-in user). In any case, you need to create a dimension as user-type, since we are going to supply the different user types as values.
![google-analytics-custom-dimension-user-type](/engineering-education/track-individual-logged-in-users-using-google-analytics/google-analytics-custom-dimension-user-type.jpg)
![analytics-custom-dimentions](/engineering-education/track-individual-logged-in-users-using-google-analytics/analytics-custom-dimension.jpg)

###  Modify tracking code to include logged in user-id and custom dimensions
In website analytics, a `tracking code` is a snippet of JavaScript code that tracks the activity of a website user by collecting data and sending it to the analytics module. The code is generated automatically, is different for each website, and has to be installed on each page you want to track. From the above step, we have got the code for adding the dimension.
```javascript
ga('set', 'dimension1', dimensionValue);
```
This is the code that needs to be added to your Google Analytics tracking code. Here `dimension1` represents the custom dimension you have created in the previous step. In our example, it is `User Type`. `dimensionValue` can be `{‘Anonymous User’, ‘Member’, ‘Author’, ‘Admin’}` as per the state of your application. Using your application login session etc, you can supply that value.You should be using Google Universal Analytics and the tracking code will be as below for a non-logged-in user. You should substitute your `UA-id` in the below code.
```javascript
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-1111112345-1', 'auto');
ga('set', 'dimension1', 'Visitor');
ga('send', 'pageview');
</script>
```
For a logged-in user, it will be as shown below. You should note the line where we are setting the `userId` field and its value as `147`. This 147 is the ID within our application like a primary key that is used to individually identify a user.You should not set it as email or other common information using which Google can identify a user and its violation of the agreement. The value should be strictly in the context of your application and it should not make any sense for Google.
Then the next thing you should note is the value set for the `dimension1` as `Author`.
```javascript
<script>
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-1111112345-2', 'auto');
 ga('set', 'userId', '147');
 ga('set', 'dimension1', 'Author');
 ga('send', 'pageview');
 </script>
 ```
### Create custom reports, view and analyze data
A custom report is one that you produce yourself. You chose how to display the dimensions (City and Browser, for example) and metrics (Sessions, Pageviews, and Bounce Rate, for example). At least one dimension and one metric must be specified.
Now the data is captured and sent to Google for tracking a logged-in user. How are we going to extract that information back? Google provides a `User Explorer` and we can also create custom reports.
![google-analytics-customs-reports](/engineering-education/track-individual-logged-in-users-using-google-analytics/google-analytics-custom-report.jpg)
![google-analytics-custom-report-with-user-type](/engineering-education/track-individual-logged-in-users-using-google-analytics/google-analytics-custom-report-with-user-type.jpg)
Now let us check the Google Analytics provided `User Explorer` report. You can see the User id that is passed from the application.
![google-analytics-user-explorer](/engineering-education/track-individual-logged-in-users-using-google-analytics/google-analytics-user-explorer.jpg)
> When you use this feature, you need to use it responsibly. You should get explicit permission from the user highlighting that you are using this user-id feature. Ensure that it is legal in your region.

### Why should you use Google Analytics?
Since nowadays almost all businesses have an online presence through a website. Therefore, it becomes very important for you to learn the inner structure of your website to see whether it is accomplishing its purpose or not.For this, you need to know the details of what people do when they visit your website, how long they stay, and what all pages do they visit on your website. Irrespective of whether you are an e-commerce website or an informative blog, you would want to understand and study the behavior of your visitors to deliver better results.
> Given below are some reasons as to why you should use Google Analytics to get better insights into your website and visitors.

#### 1. It's free
![google-analytics-is-free](/engineering-education/track-individual-logged-in-users-using-google-analytics/google-analytics-is-free.png)
You must have heard the saying that, `There is no free lunch.` But in the case of Google Analytics, it is not true. Google does not charge you anything for using Google Analytics. You don’t have to pay anything thing to use this product.These ways you can invest a decent amount of budget in some other important resources.Furthermore, it provides you with important information, numbers, and statistics that you need to maximize your website’s performance for free.

#### 2. Automatic collection of data
![automatic-data-collection](/engineering-education/track-individual-logged-in-users-using-google-analytics/automatic-data-collection.jpeg)
Google Analytics has a feature that reduces the work that is required to put Google Analytics data into Google Docs, Sites, or Spreadsheets. All you need to do is set up your Google Analytics account and copy a simple piece of code on your website. This will enable Google Analytics to start collecting data from your website automatically and make reports accordingly.
You simply have to not act to get the data. Google Analytics does all the work for you.You can even access your reports immediately without any delay. This feature of Google Analytics not only saves your work effort but also gives you immediate access to the reports. With this, you can soon implement strategies for the better performance of your website.

#### 3. You can create customization reports
As mentioned earlier a custom report is a report that you create. In Google Analytics, you can choose one of the many reports that Google Creates or can even build your customized report using the drag and drop interface.You can pick the dimensions and metrics and decide how they should be displayed.

#### 4. Easy integration with other tools and platforms
Another remarkable feature of Google Analytics is that it can be easily integrated with other tools and platforms. Just like all other Google services, Google Analytics presents a clear and easily usable interface. Not only does it works quite well on the desktop, but it is a perfectly usable Smartphone and Tablet through its app on the Google Play Store. Google Analytics also has a powerful integration with Google AdWords. When you link the AdWords account with Analytics, you are aligning two tools and enabling them to work together.This combined work will provide you with actionable insights that will lead to the success of your AdWords Campaigns.Hence, you can use Google Analytics with all your devices to easily implement data to other well know Google products like Google AdWords and Google Search Console.

#### 5. Ability to measure internal site search
![internal-site-search](/engineering-education/track-individual-logged-in-users-using-google-analytics/internal-site-search.png)
The internal site reveals what potential customers are looking for after arriving on your website. It also reveals the area of growth opportunity by uncovering the situations where certain situations may be unclear or lacking on your site.Thankfully, Google Analytics allows you to track the internal site searches with a bit of customization.With this feature of internal site search, you can have better insights into what people are searching for on your website. With these insights, you can make necessary changes or additions accordingly to improve the performance of your website.You can further make effective changes to your website navigation and product/service offers.

#### 6. To understand why visitors are bouncing off your website
Bounce Rate is one of the most important metrics which refers to the percentage of visitors who leave your website after visiting only one page. Moreover, it is extremely important to reduce this rate as much as possible.A lot of businesses witness huge traffic but not sufficient conversions.This means that visitors are coming to your website but are not finding what they are looking for. This leads to a high bounce rate.A high bounce rate calls for immediate action to identify the reason behind it. However, Google Analytics provides a detailed report of the pages that are experiencing a high bounce rate. The reason for a high bounce rate could be that your website is not optimized properly or maybe your landing page is not attractive enough for them to sign up.Therefore, with the detailed report on bounce rate, you can find ways and means to reduce the bounce rate of your website.

#### 7. To know the age, gender, interest, device, and location of your audience.
With Google Analytics, you can uncover valuable data about your audience to determine which channels drive most of the traffic to your website. The Audience section provides a lot of information about the people who visit your website like their age, gender, interests, devices, and location. It also gives you data on how the visitors were driven to your website.
- Age: It is one of the best indicators of where your audience spends most of the time. Knowing the average age of your website audience can help you to optimize your website accordingly.
  ![age](/engineering-education/track-individual-logged-in-users-using-google-analytics/age.png)
- Gender: The gender variable helps you to describe your audience. Audience’s gender plays an important role in how they communicate and engage online.
  ![gender](/engineering-education/track-individual-logged-in-users-using-google-analytics/gender.png)
- Interests: With Google Analytics, you can very well understand the interests of your audience and can optimize your website by their interests.
- Device: Google Analytics also gives you views of what kind of device are they using. With this information, you can help your website get more responsive on various devices.
  ![device](/engineering-education/track-individual-logged-in-users-using-google-analytics/device.png)
- Not only this, with Google Analytics, you can also have a view on which kind of smartphone or tablet your audience uses.
  ![mobile-device-info](/engineering-education/track-individual-logged-in-users-using-google-analytics/mobile-device-info.png)
- Location: Understanding where your customers come from helps you to formulate marketing strategies according to the physical location of your potential customers.
  ![location](/engineering-education/track-individual-logged-in-users-using-google-analytics/location.png)
- Geolocation feature of Google Analytics not only lets you know the country from where your visitors are coming from but the city from where they are and even the language they use.
  ![language](/engineering-education/track-individual-logged-in-users-using-google-analytics/language.png)

#### 8. To understand which social platforms to target
![target-social-paltforms](/engineering-education/track-individual-logged-in-users-using-google-analytics/target-social-platforms.png)

Social platforms are a great way to drive a lot of traffic and engage potential customers. With Google Analytics, you have the access to view what catches the attention of the users and then place the ad accordingly.To choose the best platform to advertise to your customers, you need to set a generous budget aside for social media ads.For example: If you see a maximum of your customer engagement on Facebook and a substantial amount of traffic from Twitter, then according to this data, you can set more budget for Facebook and comparatively less budget on Twitter to acquire more customers.With Google Analytics, you can gauge the performance of all the social platforms that you are using. You can also check how much conversion value each of the social platforms is bringing, traffic entering from social referrals and how many users are talking about you.

#### 9. To understand what kind of content you should write
Content is the king and if created remarkably can help you to get a lot more traffic and potential visitors. Good content is one of the best ways to reach out to your customers, This is the reason why so many businesses create blogs, infographics, and slide shares that can add value to your customers.Google Analytics helps you to keep a track of all the content that receives views and shares. With this data, you can enhance the top viewed blogs so that they appeal to the customers more productively.Google Analytics generates a breakdown of the page views each of your blog posts receives.You can rework the top-performed blog to generate more traffic.

#### 10. To check if you are achieving goals
![acheving-goals](/engineering-education/track-individual-logged-in-users-using-google-analytics/achieving-goals.png)

The goals in Google Analytics help you to track how much your business is moving ahead and progressing. You can also assign several goals that will help you to track the customer’s journey based on their actions.There can be a different types of goals, like making a purchase, filing a lead generation form, subscribing to newsletters, downloading an ebook.If a new visitor arrives at your landing page and completes the given form including the email address. He just completed a goal decided by you. Hence, with this information, your website just converted a visitor into a customer thereby adding to the success of your business.

### Conclusion
In this article we broadly looked at the following:
- Setting up Google Analytics Account up to and running.
- Creating Google Analytics Property.
- Creating a View with User-ID enabled.
- Creating Custom Dimensions to track user types.
- Modifying tracking code to include user-id and custom dimensions.
- Creating custom reports, viewing and analyzing data
- Why should you use Google Analytics?
  
Furthermore, Google Analytics can do wonders for your business in more advanced ways.
It provides you with valuable insights that can be used to improve the performance of your website and increase conversions.
Even though there are so many other analytics management platforms, Google Analytics remains a free highly relevant solution for managing the analytics of your website.

Happy coding!

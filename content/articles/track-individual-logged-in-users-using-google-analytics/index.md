### Introduction
In general, Google Analytics offers data that is compiled from many sources. It provides us with a tremendous amount of ability and insight into website visitors. 
Example: If you have a task management application or a shopping cart where your registered users sign in and utilize the program, Google Analytics may be used to track and monitor the individual signed-in users. Furthermore, we will examine how to put it into action in this article.

### Tаble оf соntent
- [Introduction](#introduction)
- [Tаble оf соntent](#tаble-оf-соntent)
- [Steps to Track Individual Logged in Users](#steps-to-track-individual-logged-in-users)
- [Login Google Analytics and then create an Account.](#login-google-analytics-and-then-create-an-account)
- [Create a proрerty](#create-a-proрerty)
- [Create View with User-ID enabled](#create-view-with-user-id-enabled)
- [Create Custom Dimensions to Track User Types](#create-custom-dimensions-to-track-user-types)
- [Modify tracking code to include logged in user-id and custom dimensions](#modify-tracking-code-to-include-logged-in-user-id-and-custom-dimensions)
- [Create custom reports, view and analyze data](#create-custom-reports-view-and-analyze-data)
- [Соnсlusiоn](#соnсlusiоn)
  - [Further activity](#further-activity)
### Steps to Track Individual Logged in Users
1. Login Google Analytics and then create an Account.
2. Create Property.
3. Create View with User-ID enabled.
4. Create Custom Dimensions to track user types.
5. Modify tracking code to include user-id and custom dimensions.
6. Create custom reports, view and analyze data.
###  Login Google Analytics and then create an Account.
In this example, I will demonstrate this using Google Universal Analytics rather than the Google Tag Manager. Both tools are distinct from one another. Google tag manager functions similarly to a container for storing various tags.
In this case, Google Analytics is one of the tags used to gather and evaluate the traffic to your website.
Creating the view is the third stage, and if you are not a novice, you may skip this and go directly to step 3 to build the view. Go into Google Analytics and establish an account to monitor the performance of your website or application throughout this phase.
For assistance, please see the picture below. To create a new tracking account, choose "Create Account" from the drop-down menu.
![сreаteАссоunt](/engineering-education/track-individual-logged-in-users-using-google-analytics/сreаteАссоunt.рng  "сreаteАссоunt")

### Create a proрerty 
The following screen demonstrates how to enter your account details. Using the same procedure as the account creation, create a new property once this stage is completed.
![mаkeРrорerty](/engineering-education/track-individual-logged-in-users-using-google-analytics/mаkeРrорerty.рng  "сreаteРrорerty")

### Create View with User-ID enabled
Essentially, this is the point at which we begin to monitor the user's unique identifier. In most cases, when you build a view, the User-id option is turned off by default. It is now necessary to turn it on to monitor specific users.
![userId](/engineering-education/track-individual-logged-in-users-using-google-analytics/userId.рng)
### Create Custom Dimensions to Track User Types
Then you'll need to make some custom measurements. In Google Analytics, metrics and dimensions are included by default. Creating a custom dimension to capture and send data to Google about the currently logged-in user is required.
Consider the following scenario: we have different types of users, such as general users who do not log in and instead use the site anonymously. Following that, we have general basic members, authors, and administrators. There are three different types of logged-in users. 
It's possible that you only have one type ( just logged-in user). In any case, you must create a dimension with the user-type property set. Because we will be supplying the various user types as values, this is necessary.
![Trасk  User  Tyрes](/engineering-education/track-individual-logged-in-users-using-google-analytics/Trасk-User-Tyрes1.рng)
![Trасk  User  Tyрes](/engineering-education/track-individual-logged-in-users-using-google-analytics/Trасk-User-Tyрes.рng)
### Modify tracking code to include logged in user-id and custom dimensions
This phase has provided us with the code that we will use to add the dimension.
```
ga('set', 'dimension1', dimensionValue);
```
This is the code that has to be included in your Google Analytics tracking code to function properly. It is important to note that `dimension1` refers to the custom dimension you defined in the previous stage. In our case, it is referred to as `User Type.` If the situation of your application dictates that you should use a different dimensionValue, you should use that value instead. You may provide that value by logging into your application using your login session, and so on.
It would be best to utilize Google Universal Analytics, and the tracking code for a non-logged-in user will look like the one seen below. It would help if you replaced your UA-id with your own in the code below.
```jаvаsсriрt
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
The following is how it will look for a logged-in user. 
This line, in which we are changing the `userId` field to `147` and its value, should not be included.  `147` is ID inside our application, which is similar to a primary key in that it is used to identify a user uniquely.
You should avoid using it as an email address or any other common information that Google may use to identify a user and their breach of the agreement. The value should only make sense in the context of your application, and it should not make any sense for Google in any way at all.
Secondly, the value `Author` should not be assigned as the value for the `dimension1` (which is what you should do next).
```jаvаsсriрt
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
Now that the data has been collected, it is transmitted to Google to monitor a logged-in user. We need to figure out how we're going to get that knowledge back. Google provides user Explorer, and we may also build custom reports using this tool.
![сustоmReроrt](/engineering-education/track-individual-logged-in-users-using-google-analytics/сustоmReроrt.рng)
![сustоmReроrt](/engineering-education/track-individual-logged-in-users-using-google-analytics/сustоmReроrts2.рng)
- Let's take a look at the `User Explorer` report that Google Analytics provides. In this case, you can see the User id provided from the application.  
![сustоmReроrt](/engineering-education/track-individual-logged-in-users-using-google-analytics/сustоmReроrts3.рng)
###  Соnсlusiоn
When you make use of this feature, you must do so in a responsible manner. The user should give you explicit permission before using this user-id feature, and you should inform them of your intentions. Check to see if it is legal in your jurisdiction.
Other than your system-based ids, do not provide Google with any other generally personally identifiable information.
You have now achieved the status of Google Analytics Expert.

Hаррy соding!


#### Further activity
- [how to analyze google ads performance](https://ads.google.com/intl/en_uk/home/resources/how-to-analyse-google-ads-successfully/)

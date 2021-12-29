### Data Entry Support with HTML

### Table of contents

- [Introduction](#introduction)
- [Key Takeaways](#key-takeaways)
- [Prerequisites](#prerequisites)
- [Benefits of having an online data entry form](#benefits-of-having-an-online-data-entry-form)
- [Creating the HTML Form](#creating-the-html-form)
- [Sending form to Google Sheets](#sending-form-to-google-sheets)
- [Deploying a script as a web app](#deploying-a-script-as-a-web-app)
- [Further reading](#further-reading)
- [Conclusion](#conclusion)

### Introduction
A critical phase in the data analysis process is new data
 input. The information gathered is to be accurately input into the computer system. 
The number of human mistakes encountered during data entry may be reduced using an effective data entry form.

A well-designed data input form may speed up data entering and enhance productivity. 
By eliminating the mistakes in data input, you may achieve more accurate results. 
In this tutorial, we will discuss data entry support with HTML.

### Key Takeaways
By the end of this tutorial, the learner should be able to learn the following:
- Benefits of having an online data entry form
- Creating the HTML Form
- Sending form to Google Sheets
- Deploying a script as a web app

### Prerequisites
Before you begin learning, you should have the following:
1. Creating HTML forms.
2. Be farmiliar with google forms, google sheets and google apps script.
3. A valid google account.

### Benefits of having an online data entry form
* Creating green bureaucracy on the internet has proven to be very useful in lowering the statistics access mistakes.
Some of the shape advent advantages in statistics access include -

* Brand Building
Online data entry markets a brand because it makes use of colors, fonts, snapshots, and symbols which are aye-catching in your internet site. The background of your internet site must replicate your brand. It will similarly improve your brand's online presence, specifically if your brand is easily understandable.

* Targeted Notifications
When you have the proper and accurate information, automated alerts can be quite useful. Instead of sending every consumer with all of the communications, the forms can be sent focusing on a certain segment of the audience with a certain message. 

* Integration of Apps Helps Examine Leads
Customers' data entered in a request to receive an e-book or a newsletter can be quite beneficial to you. If your customized forms interact with other parties' programs, they will be immediately populated with information from the forms' input fields. The time saved by not manually inputting data can be used to evaluate and assist clients.

* Avoid Unnecessary Data
The majority of website guests do not want to provide companies with any extra information. They must believe that they are receiving something in exchange for the information they are sharing. Websites can utilize survey testing to identify which forms are effective and make adjustments to the forms based on the results.

* Automatic Collection of Data
 Rather than manually inputting information into databases, the operation can be simply automated by sending information from forms to databases. This greatly decreases data input errors, and you can be sure in the accuracy of your data because the formatting and spelling do not vary.

### Creating and Submitting HTML form to Google Sheets.
Below is how to create a data entry sheet with Google Apps Script.
**Step One:** Login into your [Google Drive account](https://drive.google.com/drive/my-drive).
A Google Account is a necessity to use this service, so register for one on that site if you don't have one.

**Step Two:** After logging in to Google Drive, there is a New button on the top left of the page. Click on it and choose the Google sheet alternative and Blank Spreadsheet option.

**Step Three:** Give your sheet an appropriate name. After giving it a name, a link is created in the Drive.

### Creating the HTML Form
Controls are specific components found in forms like entry boxes, checkboxes, radio buttons, pushbuttons, etc. The form is usually filled out by altering its controls, such as inputting text, choosing items, and sending it to an internet host for processing.
An HTML form is generated using the `<form>` element. Here's a sample of a basic sign up form:
```html
<form>
    <label>Name: <input type="text"></label>
    <label>Secret Code: <input type="password"></label>
    <input type="submit" value="ENTER">
</form>
```

### Sending form to Google Sheets
Google Forms may be utilized as an application by going to the responses button and reading all responses. Whenever you're gathering a bunch of data from some individuals, though, you should put it all in a spreadsheet so you can organize and evaluate it later.
It takes a long time to transfer information from Google Forms to Google Sheets manually. Alternatively, you may automate data transmission by connecting Google Forms to Google Sheets. It implies that when a respondent uploads a form, the data will display in the spreadsheet 
simultaneously. 

Follow the procedure below to send the form you created to Google Spreadsheet. It can be either a brand-new or already created spreadsheet.
1. The first step is to sign in to your google account to acces the google sheet you created
2. On the spreadsheet, click on the tools tab and choose the script editor option. This option opens the google script page.

![Script Editor option](/engineering-education/data-entry-support-with-html/image0.png)

4. Create a new function and name it.
5. On the page's menu, tap on the run option then click setup.
6. If you did not log in before to a google account, it will ask for you to log in.
7. click publish option on the menu tabs then select the deploy as a web app and choose the appropriate customizations.

![Deploying as a web app](/engineering-education/data-entry-support-with-html/image2.png)

9. After choosing the customizations click on depoly to finish the process

### Deploying a script as a web app

To convert Google scripts to web apps, **Google App Script** is used to perform this operation. The following procedures must be followed to convert a script into a web app.
1. Pick the file and manage versions by creating a new version and saving it. 
2. Choose the Publish option, then deploy it as a web app from the drop-down menu.
3. Click on the file you previously saved beneath the Project version.
4. Choose whose permission with which the app should run under, as your user account or the account of the other users accessing the web app.
5. Select who needs to be accredited to have access to the app. 
6. Tap the Deploy button for the operation to be performed.

Users may execute Google Apps Scripts straight from the browsers if they post them as a web app. For example, an already uploaded Google Form file may publish the script as an open web app, allowing individuals to submit files to your Google Drive without logging into their Google accounts.

A user may select whoever has permission to access the web app after the Google Apps Script has been deployed as a web app. The following are the kinds of permissions used. 
1. User only: The script creator is the only one who has permission to access the web.
2. Domain users: The web app is simply accessible to individuals within the Google Apps domain.
3. Everyone: Anyone has access to and can use the web app. However, the user must first sign in with their Google account.
4. The last kind of permission allows the web app to be accessed by anybody, even unknown people who do not own a Google account.

### Further reading

For your further learning you can go through:
- [HTML forms](https://www.w3schools.com/html/html_forms.asp)
- Deploying Web app scripts and [web apps](https://developers.google.com/apps-script/guides/web)
- [Google Sheets](https://support.google.com/a/users/answer/9282959?hl=en)

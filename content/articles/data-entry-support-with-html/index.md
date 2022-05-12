---
layout: engineering-education
status: publish
published: true
url: /data-entry-support-with-html/
title: Data Entry Support with HTML
description: A well-designed data input form may speed up data entering and enhance productivity. In this tutorial, we will discuss data entry support with HTML.
author: jacob-omukaga
date: 2022-01-07T00:00:00-10:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/data-entry-support-with-html/hero.jpg
   alt: Data Entry support with HTML example image
---

### Introduction
A critical phase in the data analysis process is new data input. The information gathered is to be accurately input into the computer system. An effective data entry form may reduce the number of human mistakes encountered during data entry.

<!-- more -->

A well-designed data input form will speed up data entering and enhance productivity. Furthermore, eliminating the mistakes in data input may achieve more accurate results. In this tutorial, we will discuss data entry support with HTML.

### Key Takeaways
By the end of this tutorial, the learner should be able to learn the following:
- Benefits of having an online data entry form
- Creating the HTML Form
- Sending the form to Google Sheets
- Deploying a script as a web app

### Prerequisites
To have a better understanding of this article, the reader should:
- Know how to create HTML forms.
- Be familiar with Google Forms, Google Sheets, and Google App Scripts.
- Have a valid Google account.

### Table of contents

- [Benefits of having an online data entry form](#benefits-of-having-an-online-data-entry-form)
  - [Brand Building](#brand-building)
  - [Targeted Notifications](#targeted-notifications)
  - [Integration of Apps Helps Examine Leads](#integration-of-apps-helps-examine-leads)
  - [Avoiding Unnecessary Data](#avoiding-unnecessary-data)
  - [Automatic Collection of Data](#automatic-collection-of-data)
- [Creating and Submitting HTML form to Google Sheets.](#creating-and-submitting-html-form-to-google-sheets)
- [Creating the HTML Form](#creating-the-html-form)
- [Sending form to Google Sheets](#sending-form-to-google-sheets)
- [Deploying a script as a web app](#deploying-a-script-as-a-web-app)
- [Further reading](#further-reading)

### Benefits of having an online data entry form
Online data entry allows the input and storage of information into a database of any given organization. Some of the advantages in statistics access include:

#### Brand Building
Online data entry markets your brand because it uses colors, fonts, snapshots, and symbols that are eye-catching on your website. This improves your brand's online presence.

#### Targeted Notifications
Automated alerts can be quite useful when you have proper and accurate information. For example, instead of sending notifications to every consumer with all of the communications, forms can be used to send notifications focusing on a certain audience segment with a certain message. 

#### Integration of Apps Helps Examine Leads
Customers' data entered in a request to receive an e-book or a newsletter can benefit you. For example, suppose your customized forms interact with other programs. In that case, these programs will be populated with information from the forms' input fields which can be used to evaluate and assist clients.

#### Avoiding Unnecessary Data
Most website guests do not want to provide companies with any extra information. Websites can utilize survey testing to identify effective forms and adjust the forms based on the results.

#### Automatic Collection of Data
 Rather than manually inputting information into databases, the operation can be automated by sending information from forms to databases. This dramatically decreases data input errors.
 
### Creating and Submitting HTML form to Google Sheets.
Below is how to create a data entry sheet with Google Apps Script.
**Step One:** login into your [Google Drive account](https://drive.google.com/drive/my-drive).
A Google Account is necessary to use this service, so register for one on that site if you don't have one.

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
Google Forms may be utilized by going to the responses button and reading all responses. Whenever you're gathering data, you should put them in a spreadsheet so you can organize and evaluate it later.

It takes a long time to manually transfer information from Google Forms to Google Sheets. Alternatively, you can automate data transmission by connecting Google Forms to Google Sheets. However, it implies that the data will be displayed when a respondent uploads a form in the spreadsheet. 

Follow the procedure below to send the form you created to Google Spreadsheet. It can be either a brand-new or already created spreadsheet.
1. The first step is to sign in to your Google account to access the Google sheet you created
2. On the spreadsheet, click on the Tools tab and choose the script editor option. This option opens the Google script page.

![Script Editor option](/engineering-education/data-entry-support-with-html/image1.png)

4. Create a new function and name it.
5. On the page's menu, tap on the run option, then click setup.
6. If you did not login before to a Google account, it would ask you to log in.
7. click the publish option on the menu tabs, select the deploy as a web app, and choose the appropriate customizations.

![Deploying as a web app](/engineering-education/data-entry-support-with-html/image2.png)

9. After choosing the customizations, click on deploy to finish the process

### Deploying a script as a web app

To convert Google scripts to web apps, **Google App Script** is used to perform this operation. The following procedures must be followed to convert a script into a web app.
1. Pick the file and manage versions by creating a new version and saving it. 
2. Choose the Publish option, then deploy it as a web app from the drop-down menu.
3. Click on the file you previously saved beneath the Project version.
4. Choose whose permission with which the app should run under, as your user account or the account of the other users accessing the web app.
5. Select who needs to be accredited to access the app. 
6. Tap the Deploy button for the operation to be performed.

Users may execute Google Apps Scripts straight from the browsers if they post them as a web app. For example, an already uploaded Google Form file may publish the script as an open web app, allowing individuals to submit files to your Google Drive without logging into their Google accounts.

A user may select whoever has permission to access the web app after the Google Apps Script has been deployed as a web app. The following are the kinds of permissions used. 
1. User only: The script creator is the only one who has permission to access the web.
2. Domain users: The web app is simply accessible to individuals within the Google Apps domain.
3. Everyone: Anyone has access to and can use the web app. However, the user must first sign in with their Google account.
4. The last kind of permission allows the web app to be accessed by anybody, even unknown people who do not own a Google account.

### Further reading

For your further learning, you can go through:
- [HTML forms](https://www.w3schools.com/html/html_forms.asp)
- Deploying Web app scripts and [web apps](https://developers.google.com/apps-script/guides/web)
- [Google Sheets](https://support.google.com/a/users/answer/9282959?hl=en)

---
Peer Review Contributions by: [Rabo James Bature](/engineering-education/authors/rabo-james-bature)

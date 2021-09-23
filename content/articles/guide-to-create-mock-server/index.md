---
layout: engineering-education
status: publish
published: true
url: /guide-to-create-mock-server/
title: How to Create Your First Mock Server using Postman
description: How to Create Your First Mock Server simulating APIs. It consists of all the extensive details, step-by-step instructions with images and resources links to help in the beginning of your open source deployment.
author: aman-saxena
date: 2020-07-31T00:00:00-05:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/guide-to-create-mock-server/hero.jpg
    alt: mock server computer image example

---
When contributing to open source projects, one often uses several API calls. These calls work as an important bridge between the client and the user requesting various information through GET/POST methods which require a functioning server.
<!--more-->

But what happens when you do not have full back-end support yet, or no running APIs in the development stage? You end up back at square one & hence, not able to set up a server. Here comes to your aid the magical feature of Postman to create a dummy server, aka Mock Server.

This guide includes step-by-step instructions, so that you have a comfortable experience in beginning your open source deployment. Without further ado, let's get started by answering all the why(s), what(s) & how(s)!

### What a Mock Server?

![Mock Image](/engineering-education/guide-to-create-mock-server/image00.png) *Fig 1: www.mock-server.com*

Mock Server allows you to simulate your API data. When Mock Server receives a request, it matches the request against active **expectations** that have been configured. If no matches are found, it proxies the request if appropriate; otherwise, a 404 is returned.

An expectation defines the action that is taken, i.e., a response could be returned. By saving example responses for your requests, you can create a mock server that will return your example response instead of connecting to your actual API.

###  Why are Mock Servers so useful?
Mock Servers start working against a service API even before the service is available. If an API or service is not yet fully developed they can mock the API allowing any team who is using the service to start work without being delayed.

They isolate development teams during the initial development phases when the APIs / services may be extremely unstable and volatile. Using Mock Servers allows development work to continue even when an external service fails.

![Usage Image](/engineering-education/guide-to-create-mock-server/image01.png) *Fig 2: www.mock-server.com*

Mock Servers easily recreate all types of responses for HTTP dependencies such as REST or RPC services to test applications easily and effectively. They isolate the system-under-test to ensure tests run reliably and only fail when there is a genuine bug.

These servers easily setup mock responses independently for each test to ensure test data is encapsulated with each test. They avoid sharing data between tests that are difficult to manage and maintain. This also decreases the risks of tests infecting each other.

### Mock Server: A Complete Roadmap

#### Step 1: So, I have my APIs ready. What should I do now to create a mock server?
Apart from all of the traditional ways of doing things, we're always seeking simpler and more efficient methods to do the same work with increased productivity. Technology aiding another technology has been one of the important features of the modern era. On similar lines, we'll be using the [Postman](https://www.postman.com/downloads/) tool to ease the process.

Assuming, you have a working Postman Account (which is required for contributing to private repositories) and your APIs & routers are up to date, you are ready to create your first mock server.

#### Step 2: Creating the Mock Server
After setting up the workspace successfully, open the **Postman** Window in the app. You'll be seeing a launchpad tap with a few basic options. To create your mock server, click the **New** button in the top left of the header toolbar. (See image for reference).

![New Server Image](/engineering-education/guide-to-create-mock-server/image1.png)

Once you've clicked that option, a pop-up will appear. Click **Mock Server** in the newly created pop-up.

![Mock Server Image](/engineering-education/guide-to-create-mock-server/image2.png)

#### Step 3: Setting-up the Mock Server
Now, you will be able to see a new tab asking for some basic information about the server. Choose whether you want to mock a **new API** or an **existing collection**. If you create a new API to mock, you will select a request method and enter the request path, response code, and response body or else use an existing collection to mock.

![Select Image](/engineering-education/guide-to-create-mock-server/image3.png)

When you have selected or created the request you want to mock, click **Next**.

![Set up Image](/engineering-education/guide-to-create-mock-server/image4.png)

In the **Set up the mock server** tab, you can configure your mock server:
1. Enter the name of the mock server you want to create.
2. Select an environment (optional).
3. Check the checkbox if you want to make the mock server private.
4. Check the checkbox if you want to save the mock server URL as an environment variable.
5. Click Next to continue.

In the **Next steps** tab, you will see a list of suggested next steps to maximize the effectiveness of your mock server.

![Next Step Image](/engineering-education/guide-to-create-mock-server/image5.png)

If the setting process went well without an error, you'll be able to see your Mock Server in the left corner on the **Collections** panel.

You can view and search the details of calls to your mock servers using the mock call log. Open the mock server you previously created from the Postman app by clicking it in Collections, in APIs, or by switching to Browse > Mocks and clicking the mock server name.

#### Step 4: I am all done with my server. How do I create a Router Request?

![Request Image](/engineering-education/guide-to-create-mock-server/image6.png)

In the left-hand corner, see **Setting Option(3 Dots)** in the Collections panel. On clicking that, you'll be able to see several options. Choose **Add Request**, by which a large number of Request Methods, (i.e. GET, POST) will be made available to you, choose whatever you need. Make sure you have an example saved for the request in the collection you have the mock connected to.

#### Step 5: Additional Feature of Postman Server

![Edit Delete Image](/engineering-education/guide-to-create-mock-server/image7.png)

### Voila
The Postman Web Application provides you with several efficient features to scale-up your task as and whenever required. You can also modify requests, link your APIs, and even **Edit** & **Delete** your whole Mock Server. All these options can be made available by going to the Collections panel, in APIs and choosing edit option. Save the Mock Server URL for the future usage… and Voila! You're done!

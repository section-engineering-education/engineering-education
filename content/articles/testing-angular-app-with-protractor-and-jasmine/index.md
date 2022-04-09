---
layout: engineering-education
status: publish
published: true
url: /testing-angular-app-with-protractor-and-jasmine/
title: Testing Angular Applications With Protractor and Jasmine
description: This article will be an introduction to testing an Angular application using Protractor and Jasmine
author: emmanuel-ezenagu
date: 2021-09-21T00:00:00-06:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/testing-angular-app-with-protractor-and-jasmine/hero.jpg
    alt: Protractor AngularJS example image
---
In the World of software development, testing is a way to be sure that an application with a set of stated functionalities will perform those functions without fail. It involves running your software through a series of checks either manually or using automated tools to verify its effectiveness.
<!--more-->
When developing software, errors are bound to happen. Testing makes it possible for those errors to be detected and corrected before the software is released.

A well-tested software is reliable, secured, and highly accountable. It saves cost in the long run and helps prevent wastage of manpower and resources.

In this tutorial, we will be looking at testing an AngularJS based website using Protractor and Jasmine.

### Prerequisite
To follow through this article, you must have a good understanding of:
- DOM element tree hierarchy and manipulation
- Basic JavaScript and asynchronous operations
- AngularJS framework

### Table of contents
- [Terminologies](#terminologies)
- [Why Protractor?](#why-protractor)
- [Why Jasmine?](#why-jasmine)
- [Setup and configuration](#setup-and-configuration)
- [Testing](#testing)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Terminologies
- [AngularJs](https://angularjs.org/) is an open-source javascript framework used to build front-end applications.
- [Jasmine](https://jasmine.github.io/) is an open-source, behavior-driven development framework for testing JavaScript code.
- [WebDriver Js](https://www.npmjs.com/package/webdriver-manager) is the official Javascript implementation of [Selenium](https://www.selenium.dev). It helps to interact with elements on the web.
- [Protractor](https://www.protractortest.org/#/) is a NodeJS program built on top of WebDriverJs that supports the Jasmine test framework and is used as an end-to-end test framework for testing Angular applications. Protractor extends what WebDriverJs can do by enabling automation and interactions of possible user events on the browser.
- End-to-End testing refers to the test that is carried out on operations that occur through the various modules that make up your angular application flow.

For example, testing the Registration page, to the Login page, to a Profile page, and Logout can be an end-to-end test flow. While each module here has its unit test cases.

### Why protractor
If you open a non-angular webpage, you have elements that users can interact with such as an input field, a dropdown tab, or clickable buttons. All these elements can be tested using the [Selenium](https://www.selenium.dev) web framework.

A website built using AngularJS introduces the extra DOM properties that are identifiable only to Angular applications like "ng-model", "ng-repeater", or "ng-controller".

These properties wrap the existing HTML DOM elements. These properties are not visible to Selenium for testing.

Protractor enables the ability to capture these hidden elements.

In addition, protractor provides functions such as `waitForAngular`,` by.binding`, `WebElement.evaluate`, among others, which provide a variety of options to perform your tests.

Selenium WebDriver deals with a lot of synchronization issues related to using bare selenium. On the other hand, Angular (like pure Javascript) works asynchronously making use of promises to handle the callbacks.

You can read more about the Protractor style guide [here](https://www.protractortest.org/#/style-guide).

### Why Jasmine
Jasmine is a well-documented open-source behavior-driven testing framework for JavaScript that does not rely on browsers, DOM, or any JavaScript framework.

We have several testing frameworks like Jest and Mocha.

Jasmine is recommended over the others because AngularJS CLI comes chipped by default with Jasmine as the test runner and it is relatively easy to learn.

However, you can still configure the other testing frameworks to test angular-built web applications.

#### Suites
A suite defines or describes your test cases.

A suite is identified by a description function. The `describe()` groups the specifications just like grouping a component of a system or set of actions.

We set the first parameter as a string that is used as an identifier for the test cases that are defined within the function body.

For example:

```javascript
describe("A String that specifies a suite", function () {
	it("Contains an expectation", () => {
		let value = true;
		expect(value).toBe(true);
	});
});
```

#### Specification
You can define a specification (spec) using a global function called `it()`.

`it()` is similar to `describe()` that takes a string as its first parameter and a function as its second parameter.

The string parameter determines the title of the specification and is used to identify the spec when there are multiple specs present.

On the other hand, the function defines a test.

A spec can contain multiple expectations described using the "expect" statement (which will be discussed later) that is used to test the state of the code.

An expectation of a test case with an original result can either be true or false.

#### It
`it()` in a nutshell, is a function that includes executable code to carry out the required test.

Since Jasmine is a JavaScript testing framework, the variable scope applies in the same way it does with vanilla JavaScript code.

A variable defined within a function is local and visible only with that particular function. This helps in data sharing within `it()` blocks.

If you want to share data between other test blocks, just use a global variable.

#### Expect
Expects are functions that take in the resultant and the expected value. These functions determine if a test is a success or a failure.

#### Matchers
A matcher is an implementation of a boolean outcome i.e. the result of a matcher confirms if something is either true or false.

In this case, it checks the outcome of the expectation against a given outcome/value. This determines if a test case passes or fails.

In Jasmine, you will find several matchers that help you achieve the expected test scenarios.

### Setup and configuration
Firstly, download and install [NodeJS](https://nodejs.org/en/download/).

Next, we install protractor globally:

```bash
npm install -g protractor
```

Then run the command below to update the webdriver manager:

```bash
webdriver-manager update
```

Create a `conf.js` file in the root directory of the Angular application and add the following code:

```javascript
exports.config = {
   directConnect: 'http://localhost:4444/wd/hub',
   specs: ['./*-spec.js’],
   framework: ‘jasmine’,
};
```

- The `directConnect: true` option specifies the host that interacts with the Selenium Server (seleniumAddress). It will use the default configurations unless specified. Chrome will be used as the default browser.
- The option for the `specs` should be the path to the specification JavaScript file that runs while testing.
- The `framework` property specifies the test framework that we use. Here, it's Jasmine.
- The value for the specs in the above code tells protractor to check the current directory and execute all files that have the letters `-spec.js` as their ending characters.

Create a `test-spec.js` file in the root directory.

Here, we specify the test cases.

Install Jasmine as a dependency, if it is not already installed:

```bash
npm install --save-dev jasmine
```

On the terminal, navigate to the directory where the `conf.js` file is located and run the command below to begin your testing:

```bash
protractor conf.js
```

### Testing
For this tutorial, we will be testing a popular website called [Blender](www.video.blender.org.); built using AngularJS.

Since this website is built using AngularJS, we will make use of Protractor to capture the elements we need to manipulate.

Here, we will capture a "search input" element located at the top right corner of the page.

We will then proceed to search requests for "free" videos by using the protractor API.

Finally, we will verify the DOM interaction. It is expected that video-blender will have available free videos that list those free videos in the DOM page layout while replacing the initial webpage.

Performing another search for a non-existing word should also produce a change to display the result of the search.

First, we will create the `describe()` function that will house our test. The string specifies the name of this block of tests we will be writing. The second parameter is a function that our specs will be written within.

```javascript
describe("Testing exercise for protractor and Javascript application", function () {});
```

> Note that the function is an asynchronous function with the parameter as "done".

This specifies that some operations within this function will not occur at the very first instance, rather it may occur later in the future by halting the flow of operations. Such operations are marked with the `await` keyword.

The `done()` method is a function caller for the argument passed into the function that is called at the end of all tests to mark the end of testing the spec.

```javascript
describe("Testing exercise for protractor and Javascript application", function () {
	it("Navigate to Blender Video search for videos", async function (done) {
		done();
	});
});
```

In the code below, we first save a string (website URL) into the variable "url". We are making use of a protractor API method `browser.get()` to request to the link specified.

We specify this function as `await` to process it asynchronously.

```javascript
describe("Testing exercise for protractor and Javascript application", function () {
	it("Navigate to Blender Video search for videos", async function (done) {
		let url = "https://video.blender.org/";
		await browser.get(url);
		done();
	});
});
```

Here, we have written our first test case.

We are expecting the website's home page to be loaded. For this, we also make use of the protractor API method `browser.getCurrentUrl()`.

Now, we grab elements that we need to perform further tests from the DOM using the browser inspection tool.

Based on the element, you can fetch information using:
- `id`
- `class`
- `xPath`
- CSS selector
- Tag

We are grabbing the search input element `searchBar`, the search button click `searchButton`, and the result element `searchResult`.

```javascript
describe("Testing exercise for protractor and Javascript application", function () {
	it("Navigate to Blender Video search for videos", async function (done) {
		let url = "https://video.blender.org/";
		await browser.get(url);

		expect(await browser.getCurrentUrl()).toBe(url);

		let searchBar = element(by.css("#search-video"));
		let searchButton = element(by.css(".icon-search"));
		let searchResult = element(by.css(".search-result"));

		done();
	});
});
```

For the "searchBar", we input a string value to be `free`. If so, make a click action on the "searchButton" variable.

We expect the 'searchResult' element to be visible on the page after the search has been made, hence we test for the presence of the css style `"display":"block"`.

```javascript
describe("Testing exercise for protractor and Javascript application", function () {
	it("Navigate to Blender Video search for videos", async function (done) {
		let url = "https://video.blender.org/";
		await browser.get(url);

		expect(await browser.getCurrentUrl()).toBe(url);

		let searchBar = element(by.css("#search-video"));
		let searchButton = element(by.css(".icon-search"));
		let searchResult = element(by.css(".search-result"));

		searchBar.sendKeys("free");
		searchButton.click();

		expect(searchResult.getCssValue("display")).toBe("block");

		done();
	});
});
```

We then make further tests for a non-existing search result "random".

We do not clear the text in the search bar, so our search gets appended to the existing "free" text in the search bar.

If you want to clear the search bar, before searching for a new keyword, we have do the following:

```javascript
searchBar.clear().then(function () {
	searchBar.sendKeys("random");
});
```

The result would be an empty page, since we don't find elements based on that search.

```javascript
describe("Testing exercise for protractor and Javascript application", function () {
	it("Navigate to Blender Video search for videos", async function (done) {
		let url = "https://video.blender.org/";
		await browser.get(url);
		expect(await browser.getCurrentUrl()).toBe(url);
		let searchBar = element(by.css("#search-video"));
		let searchButton = element(by.css(".icon-search"));
		let searchResult = element(by.css(".search-result"));

		searchBar.sendKeys("free");
		searchButton.click();

		expect(searchResult.getCssValue("display")).toBe("block");

		searchBar.sendKeys("random");
		searchButton.click();

		expect(searchResult.getCssValue("display")).toBe("block");

		done();
	});
});
```

On running the code, you should see a Chrome browser window open up. Navigate to the webpage specified, perform a search and carry out the test.

The test output should be:

```bash
1 test, 1 assertion, 0 failures
```

Congratulations on your first test using Protractor!

### Conclusion
In this tutorial, you have learned what testing is, why testing is important, and the various definitions for terms used in testing.

Also, we understood basic codes that pull elements from the DOM and test their outcome.

There are several options to capture the DOM elements for testing. Protractor is one such framework for testing Angular applications.

### Further reading
For more reference check out the jasmine docs:
- [Jasmine Your_first_suite](https://jasmine.github.io/tutorials/your_first_suite)
- [Protractor](https://www.protractortest.org/#/)
- [Protractor API](https://www.protractortest.org/#/api)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

In the World of software development, testing is a way to be sure that an application with a set of stated functionalities will perform those functions without fail. It involves running your software through a series of checks either manually or using automated tools to verify its effectiveness.

When developing softwares, errors are bound to happen and testing makes it possible for those errors to be detected and corrected before the software is released.

A well-tested software is reliable, secured, and highly accountable. It saves cost in the long run and helps prevent wastage of manpower and resources.

In this tutorial, we will be looking at testing an AngularJS based website using Protractor and Jasmine.

---
We will navigate to www.video.blender.org.

Then we will first grab the angular enabled search input DOM elements using protractor API methods, then search for "free" videos by programmatically inputting the text we wish to search, then we will check the DOM interaction it causes. Based on our expectations we are bound to get one or more free videos available. The result causes an interactive change which will be our action to test for in our test case using jasmine.


### Prerequisite
As a prerequisite, the reader must have a good understanding of:
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

For example, we start testing a simple flow of a web page, by testing Registration page, to Login page, to Profile page, and to Logout can be an end-to-end test flow. While each module here, have their own unit test cases.

### Why protractor
If you open a non-angular webpage, you have elements that users can interact with such as an input field, a dropdown tab, or a clickable buttons. All these elements can be tested using [Selenium](https://www.selenium.dev) web framework.

A website built using AngularJS introduces to the extra DOM properties that are identifiable only to Angular applications like "ng-model", "ng-repeater", or "ng-controller".

These properties wraps the existing HTML DOM elements. These properties are not visible to Selenium for testing.

Using protractor, enables the ability to capture these hidden elements.

In addition, protractor provides functions like `waitForAngular`,` by.binding`, `WebElement.evaluate`, and others, provides a variety of options to perform your tests.

Selenium WebDriver deals with a lot of synchronization issues related to using bare selenium. On the other hand, Angular (like pure Javascript) works asynchronously making use of promises to handle the callbacks.

You can read more about the Protractor style guide [here](https://www.protractortest.org/#/style-guide).

### Why Jasmine
Jasmine is a well-documented open-source behavior-driven testing framework for JavaScript that does not rely on browsers, DOM, or any JavaScript framework.

We have several testing frameworks like Jest and Mocha.

Jasmine is recommended over the others because AngularJS CLI comes chipped by default with Jasmine as the test runner and it is relatively easy to learn.

But, you can still configure the other testing frameworks to test angular-built web applications.

#### Suites
A suite defines or describes your test cases.

A suite is identified by a description function. The `describe()` groups the specifications just like grouping a component of a system or set of actions.

We set the first parameter as a string that is used as an identifier for the test cases that are defined within the function body.

For example:

```javascript
describe("A String that specifies a suite", function() {
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

An expectation of a test case with original result can either be true or false.

#### It
`it()` in a nutshell is a function that includes executable code to carry out the required test.

Since jasmine is a JavaScript testing framework, the variable scope applies in the same way it does with vanilla JavaScript codes.

A variable defined within a function is local and visible only with that particular function. This helps in data sharing within the `it()` blocks.

If you want to share data between other test blocks just use a global variable.

#### Expect
They are functions that takes in resultant and the expected value. These functions determine if a test if successful or a failure.

#### Matchers
A matcher is an implementation of a boolean outcome i.e., the result of a matcher confirms if something is either true or it is false.

In this case, it checks the outcome of the expectation against a given outcome/value. This determines if a test case passes or fails.

In Jasmine, you will find several matchers that helps you achieve the expected test scenarios.

### Setup and configuration
Firstly, download and install [NodeJS](https://nodejs.org/en/download/).

Next, we install protractor globally.

`npm install -g protractor`

Then, run the command the update the webdriver manager.

`webdriver-manager update`

Create a `conf.js` file in the root directory of the Angular application and input the following:

```javascript
exports.config = {
   directConnect: 'http://localhost:4444/wd/hub',
   specs: ['./*-spec.js’],
   framework: ‘jasmine’,
};
```

- The "directConnect: true" option specifies the host that interacts with the Selenium Server (seleniumAddress). It will use the default configurations unless specified. Chrome will be used as the default browser.
- The option for the "specs" should be the path to the specification JavaScript file that runs while testing.
- The "framework" property specifies the test framework that we use. Here, it's Jasmine.
- The value for the specs in the above code tells protractor to check the current directory and execute all files that have the letters "-spec.js" as their ending characters.

Create a `test-spec.js` file in the root directory.

Here, we specify the testcases.

Install Jasmine as a dependency, if it is not already installed.

`npm install --save-dev jasmine`

On the terminal, navigate to the directory where the `conf.js` file is located and run the command to begin your testing:

`protractor conf.js`

### Testing
For this tutorial, we will be testing a popular website called [Blender](www.video.blender.org.), built using AngularJS.

Since this website is built using AngularJS, we will make use of Protractor to capture the elements we need to manipulate.

Here, we will capture a "search input" element located at the top right corner of the page.

Then, we will proceed to search requests for "free" videos by using the protractor API. 

Finally, we will verify the DOM interaction. It is expected that video-blender will have available free videos thats lists those free videos in the DOM page layout, while replacing the initial webpage.

Performing another search for a non-existing word should also produce a change to display the result of the search.

- First we will create the `describe()` function that will house our test. The string specifies the name of this block of tests we will be writing. The second parameter is a function that our specs will be written within.

```javascript
describe("Testing exercise for protractor and Javascript application", function() {
})
```

> Note that the function is an asynchronous function with the parameter as "done".

This specifies that some operations within this function will not occur at the very first instance, rather it may occur later in the future by halting the flow of operations. Such operations are marked with the `await` keyphrase.

The `done()` method is a function caller for the argument passed into the function that is called at the end of all tests, to mark the end of testing the spec.

```javascript
describe("Testing exercise for protractor and Javascript application", function() {
  it("Navigate to Blender Video search for videos",  async function(done){
    done();
  })
})
```

In the code below, we first save a string (website URL) into the variable "url". We are making use of a protractor API method `browser.get()` to make a request to the link specified.

We specify this function as `await` to process it asynchronously.

```javascript
describe("Testing exercise for protractor and Javascript application", function(){
  it("Navigate to Blender Video search for videos",  async function(done) {
      let url = "https://video.blender.org/"
      await browser.get(url);
      done();
  })
})
```

Here, we have written our first testcase.

We are expecting the the website's home page to be loaded. For this, we also make use of the protractor API method `browser.getCurrentUrl()`.

Now, we go ahead to grab elements that we need to perform further tests from the DOM using the browser inspection tool.

Based on the element, you can fetch information using:
- `id`
- `class`
- `xPath`
- CSS selector
- Tag

We are grabbing the search input element `searchBar`, the search button click `searchButton`, and the result element `searchResult`.

```javascript
describe("Testing exercise for protractor and Javascript application", function(){
  it("Navigate to Blender Video search for videos",  async function(done) {
      let url = "https://video.blender.org/"
      await browser.get(url);

      expect(await browser.getCurrentUrl()).toBe(url);

      let searchBar = element(by.css('#search-video'));
      let searchButton = element(by.css('.icon-search'));
      let searchResult = element(by.css('.search-result'));

      done();
  })
})
```

For the "searchBar", we input a string value to be `free`. If so, make a click action on the "searchButton" variable.

We expect the 'searchResult' element to be visible on the page after the search has been made, hence we test for the presence of the css style `"display":"block"`.

```javascript
describe("Testing exercise for protractor and Javascript application", function(){
  it("Navigate to Blender Video search for videos",  async function(done){
      let url = "https://video.blender.org/"
      await browser.get(url);

      expect(await browser.getCurrentUrl()).toBe(url);

      let searchBar = element(by.css('#search-video'));
      let searchButton = element(by.css('.icon-search'));
      let searchResult = element(by.css('.search-result'));
    
      searchBar.sendKeys("free");
      searchButton.click();
    
      expect(searchResult.getCssValue('display')).toBe('block');

      done();
  })
})
```

We then make a further tests for an non-existing search result "random".

We do not clear the text in the search bar, so our search gets appended to the existing "free" text in the search bar.

If you want to clear the search bar, before searching for a new keyword, we have do the following:

```javascript
searchBar.clear().then(function() {
  searchBar.sendKeys('random');
  })
```

So, the result would be an empty page, since we don't find elements based on that search.

```javascript
describe("Testing exercise for protractor and Javascript application", function(){
  it("Navigate to Blender Video search for videos",  async function(done){
      let url = "https://video.blender.org/"
      await browser.get(url);
      expect(await browser.getCurrentUrl()).toBe(url);
      let searchBar = element(by.css('#search-video'));
      let searchButton = element(by.css('.icon-search'));
      let searchResult = element(by.css('.search-result'));
    
      searchBar.sendKeys("free");
      searchButton.click();
    
      expect(searchResult.getCssValue('display')).toBe('block');
    
      searchBar.sendKeys('random');
      searchButton.click();
    
      expect(searchResult.getCssValue('display')).toBe('block');

      done();
  })
})
```

On running the code, you should see a Chrome browser window open up and navigate to the webpage specified, perform a search and carry out the test.

The test output should be:

`1 test, 1 assertion, 0 failures`

Congratulations on your first test using Protractor!

### Conclusion
In this tutorial you have learnt what testing is, why testing is important and the various definitions for terms used in testing. 

Also, we understood basic codes that pull elements from the DOM and test their outcome.

There are several options to capture the DOM elements for testing. Protractor is one such framework for testing Angular applications.

### Further reading
For more reference check out the jasmine docs
- [Jasmine Your_first_suite](https://jasmine.github.io/tutorials/your_first_suite)
- [Protractor](https://www.protractortest.org/#/)
- [Protractor API](https://www.protractortest.org/#/api)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

# Testing Angular applications using Protractor and Jasmine
 
 
![protractor](./protractor.jpg "protractor")
 
 
If you are into the tech world, you must have heard of testing and the various types of testing and how testing helps create better resilient applications. In this tutorial, we will be looking at testing Angular applications using protractor and jasmine.
 
 
#### First Lets get Familiar with some terms
 
**Protractor** is a NodeJs program built on top of WebDriverJs that supports the Jasmine test framework and is used as an end-to-end test framework for Angular applications.
This means that the protractor cannot be used to test react or due but angular applications.
 
**AngularJs** is an open-source javascript framework used to build front-end applications.
 
**End-to-End** this refers to the test that is being carried out for operations that flow through the various modules that make up your angular application flow. e.g Registration to Login to Profile to Logout can be an end to end test flow. While each module here, Registration or Login can have unit test operate on them.
 
**Jasmine** is a behavior-driven development framework for testing JavaScript code.
 
**WebDriver** Js is the official Javascript implementation of selenium. It helps to interact with elements on the web. Protractor extends what WebDriverJs can do and enables automation and interactions of possible user events that may occur on the browser application.
 
 
#### Why we need Protractor Jasmine Testing
 
Take for example on the browser you have an element that users can interact with, say input fields, or dropdown tabs, or clickable buttons, all these elements can be tested for using selenium testing tool, which can handle the automation of the tests for the individual elements, but when you build your application using angularJs you introduce to the DOM extra properties which are specific to Angular applications like ng-model, ng-repeater or ng-controller e.t.c. all of which are not visible to selenium. So with protractor, you can capture these specific elements. In addition, Angular also gives you specific locator strategies and functions like waitForAngular, By.binding, webElement.evaluate e.t.c
 
Also with selenium WebDriver there are a lot of synchronization issues related to using bare selenium. Angular (like pure Javascript) is mostly asynchronous throughout and makes use of promises to handle async calls and callbacks.
 
A lot of applications are created using angular and angular js and so a tool is needed to carry out automation of these kinds of applications.
 
Here is a reference to best style guides for protractor testing [ Protractor style guide ](https://www.protractortest.org/#/style-guide)
 
 
#### Why use Jasmine
 
Jasmine is a well documented
It is supported by Protractor out of the box
You can use beforeAll and afterAll
       
 
#### Setting Up Protractor test
 
- Download and install [nodeJs](https://nodejs.org/en/download/)
 
Next, you install protractor globally so it can be accessible anywhere
 
```npm install -g protractor```
 
 
 
Next Run command
 
```webdriver-manager update```
 
 
 
 
Create a conf.js file in the root directory of your angular application and input the following.
 
```javascript
   exports.config = {
       directConnect: true,
       specs: ['./**-spec.js’],  // Specifies the link to test file(s)
  
       framework: ‘jasmine’,
  
       capabilities: {
           ‘browserName’: ‘chrome’
       }
   };
```
 
For now, these basic configurations will get your test up and running. Feeling unsatisfied, check out this link provided. [ Protractor API ](https://www.protractortest.org/#/api-overview) for any specific issues.
 
The value for the specs in the above code tells protractor to check the current directory and execute all files that have the letters "-spec.js" as their ending characters. This makes use of relative paths to files
 
Create a test-spec.js file anywhere you see fit in the root directory. Here you will write your tests. For now, test using the code below in your test
 
 
 
 
Install Jasmine as a dependency if it is not already installed
 
``` npm install —save-dev jasmine ```
 
On your terminal navigate to the directory where the conf.js  file is located and run the command to begin your testing
 
``` protractor conf.js ```
 
Congratulations you have written your first test case in protractor.
 
### Jasmine syntax
 
Suites: A Suite defines/describes your tests
A suite is identified by a description function. The describe function is used to group specs that serve the same meaning. Just like in a component of a system or set of actions that can be grouped. The first parameter is a string value that is used as an identifier for a set of tests defined within the function body.
 
```javascript
   describe("A String that specifies a suite", function() {
       it("Contains an expectation", () => {
           let value = true;
           expect(value).toBe(true);
       });
   });
```
 
 
 
### Specs
You can define a spec by using a global function called "it". "it", is similar in syntax to describe in that it takes a string as its first parameter and as its second parameter a function. The string parameter determines the title of the spec and is used to identify the spec when they are multiple specs present. The "function" on the other hand defines the spec or test. A spec can contain multiple expectations described using the "expect" statement ( which will be discussed later ) and is used to test the state of the code.
An expectation on its own can amount to either one of the following.
Either it amounts to true and the expectation passes or false it amounts to false and the expectation fails. If all the expectations in a test pass it means the test itself passes but if an expectation fails then the test in turn will be a failed test.
 
 
### It
It in a nutshell is a function. They can include executable code required to tcarry out the test needed. Since jasmine is a javascript testing framework, javascript variable scope applies in the same way it does with normal javascript codes. a variable defined within a function is a local variable and is visible only with that particular function. This helps you plan out you data sharing between "It" blocks. If you want to share data between test blocks just use a global variable.
 
 
### Expect
These are already describe before. They are created using the functions and takes in a value called actual. "it" is being appended with a Matcher function. This can take in an argument that is the expected value.
 
 
### Matchers
A matcher is an implementation of a boolean outcome. i.e The result of a matcher checks to confirm if something is either true or it is false. In this case, it checks the outcome of the expectation against a given outcome/value. If there is a match or there is none ( depending on the test case ), will determine if the test passes or if the test fails. In
Jasmine, you will find a huge set of matchers that can help you achieve the expectation you want to test for. These can be found in the API docs
 
 
### Exercise
For this exercise, we will be carrying out a test on a popular website. We will test first on google search. We will then navigate to www.video.blender.org. Then we will proceed to make a search for free videos and check the DOM interaction it causes.
 


```javascript
describe("Testing exercise for protractor and Javascript application", function(){
  /**
   *  Because some of the request to be made will not happen in order but asynchronously 
   *  we need to use an async and await.  
   */

  it("Navigate to Blender Video search for videos",  async function(done){
    
    // Awaiting browser navigation to the specific webpage specified as a string parameter
    let url = "https://video.blender.org/"
    await browser.get(url);
    // Expecting the browser to have navigated to the page.
    expect(await browser.getCurrentUrl()).toBe(url);

    // Getting elements from the page that we will be using
    let searchBar = element(by.css('#search-video'));
    let searchButton = element(by.css('.icon-search'));
    let searchResult = element(by.css('.search-result'));

    // Using protractor API method to insert values into elements on the page
    searchBar.sendKeys("free");

    // Using protractor API method to perform click event on the page
    searchButton.click();

    // Expecting a list of reuslt which will be contained within a class.
    // We use that class to test that theres an outcome to the search operation.
    // We are not sure of the consistency of the type of data stored in their database so we only perform an interactive test.
    expect(searchResult.getCssValue('display')).toBe('block');

    // This appends to browser input elemet.
    searchBar.sendKeys('neverdwelt');
    searchButton.click();
    
    // Also expecting an interactive change whan we search for no value.
    expect(searchResult.getCssValue('display')).toBe('block');

    // This tells the test that we are done with our expectations.
    // Once this is called out testing ends. The done() is that which is passed in as a variable to the "it" function.
    done();

  })
})
```

There are a lot of options present which we can use to capture DOM elements so we can use and manipulate. 
Also available are methods which can be used to provide interaction with the elements on the page.

For more reference check out the jasmine docs
[Your_first_suite](https://jasmine.github.io/tutorials/your_first_suite)

References
[Protractor](https://www.protractortest.org/#/)

[Protractor API](https://www.protractortest.org/#/api)


    


 

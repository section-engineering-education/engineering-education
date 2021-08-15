
## Testing Angular applications using Protractor and Jasmine


![protractor](./protractor.jpg "protractor")


If you are into the tech world, you must have heard of testing and the various types of testing and how testing helps create better resilient applications. In this tutorial, we will be looking at testing Angular applications using protractor and jasmine.


#### First Lets get Familiar with some terms

**Protractor** is a NodeJs program built on top of WebDriverJs that supports the Jasmine test framework and is used as an end-to-end test framework for Angular applications.
This means that the protractor cannot be used to test react or due but angular applications.

**AngularJs** is an open-source javascript framework used to build front-end applications.

**End-to-End** simply refers to the test that are being carried out for operations that flow through the various modules that make up your angular application flow. e.g Registration to Login to Profile to Logout can be an end to end test flow. While each individual module here, Registration or Login can have unit test operate on them.

**Jasmine** is a behaviour-driven development framework for testing JavaScript code. 

**WebDriver** Js is the official Javascript implementation of selenium. It helps to interact with elements on the web. Protractor extends what WebDriverJs can do and enables automation and interactions of possible user events that may occur on the browser application.


#### Why we need Protractor Jasmine Testing

Take for example on the browser you have element that users can interact with, say input fields, or dropdown tabs, or clickable buttons, all these elements can be tested for using selenium testing tool, which can handle the automation of the tests for the individual elements, but when you build your application using angularJs you introduce to the DOM extra properties which are specific to Angular applications like ng-model, ng-repeater or ng-controller e.t.c. all of which are not visible to selenium. So with protractor you can capture these specific elements. In addition, Angular also gives you specific locator strategies and functions like waitForAngular, By.binding, webElement.evaluate e.t.c

Also with selenium WebDriver there are a lot of synchronisation issues related to using bare selenium. Angular (like pure Javascript) is mostly asynchronous throughout, and makes use of promises to handle async calls and callbacks.

A lot of applications are created using angular and angular js and so a tool is needed to carry out automation of these kind of application.

Heres a reference to best style guides for protractor testing [ Protractor style guide ](https://www.protractortest.org/#/style-guide)


#### Why use Jasmine

Jasmine is well documented
It is supported by Protractor out of the box
You can use beforeAll and afterAll
         

#### Setting Up Protractor test

``` Download and install nodeJs https://nodejs.org/en/download/```

Next install protractor globally so it can be accessible anywhere

```npm install -g protractor```





Next Run command 

```webdriver-manager update```




Create a conf.js file in your root directory of your angular application and input the following.

```javascript
    exports.config = {
        directConnect: true,
        specs: ['./**/tests/**-spec.js’],  //Specifies the link to test file(s)
    
        framework: ‘jasmine’,
    
        capabilities: {
            ‘browserName’: ‘chrome’
        }
    };
```

For now these basic configuration will get your test up and running. Feeling unsatisfied, checkout this link provided. [ Protractor API ](https://www.protractortest.org/#/api-overview) for much specific issues.



Create a test-spec.js file anywhere you see fit in your directory. Here you will write your tests. For now test using the code below in your test

```javascript
    describe('angularjs list app’, function() {
        it(‘A’dd a list, function() {
            browser.get('https://angularjs.org');

            element(by.model('todoList.todoText')).sendKeys('write first protractor test');
            element(by.css('[value="add"]')).click();

            let todoList = element.all(by.repeater('todo in todoList.todos'));
            expect(todoList.count()).toEqual(3);
            expect(todoList.get(2).getText()).toEqual('write first protractor test');

            // You wrote your first test, cross it off the list
            todoList.get(2).element(by.css('input')).click();
            let completedAmount = element.all(by.css('.done-true'));
            expect(completedAmount.count()).toEqual(2);
        });
    });
```

The describe and it syntax  used in the code is gotten from the Jasmine framework. browser is a global created by Protractor, which is used for browser-level commands such as navigation with browser.get.




Install Jasmine as a dependency if it is not already installed

``` npm install —save-dev jasmine ```

On your terminal navigate to the directory where the conf.js  file is located and run the command to begin your testing

``` protractor conf.js ```

Congratulations you have written your first test case in protractor.

##### Jasmine syntax

Suites: describe Your Tests
The describe function is for grouping related specs, typically each test file has one at the top level. The string parameter is for naming the collection of specs, and will be concatenated with specs to make a spec's full name. This aids in finding specs in a large suite. If you name them well, your specs read as full sentences in traditional BDD style.


```javascript
    describe("A suite", function() {
        it("contains spec with an expectation", function() {
        expect(true).toBe(true);
        }); 
    });
```



Specs
Specs are defined by calling the global Jasmine function it, which, like describe takes a string and a function. The string is the title of the spec and the function is the spec, or test. A spec contains one or more expectations that test the state of the code. An expectation in Jasmine is an assertion that is either true or false. A spec with all true expectations is a passing spec. A spec with one or more false expectations is a failing spec.


It's Just Functions
Since describe and it blocks are functions, they can contain any executable code necessary to implement the test. JavaScript scoping rules apply, so variables declared in a describe are available to any it block inside the suite.

```javascript
    describe("A suite is just a function", function() {
        var a;
        it("and so is a spec", function() {
        a = true;

        expect(a).toBe(true);
        });
    });
```


Expectations
Expectations are built with the function expect which takes a value, called the actual. It is chained with a Matcher function, which takes the expected value.


Matchers
Each matcher implements a true or false comparison between the actual and the expected value. It reports to Jasmine if the expectation is true or false. Jasmine will then pass or fail the spec.
Any matcher can evaluate to a negative assertion by chaining the call to expect with a not before calling the matcher.
Jasmine has a rich set of matchers included, you can find the full list in the API docs There is also the ability to write custom matchers for when a project's domain calls for specific assertions that are not included in Jasmine.

```javascript
    describe("The 'toBe' matcher compares with ===", function() {
	    it("and has a positive case", function() {
  	        expect(true).toBe(true);
	    });
	    it("and can have a negative case", function() {
  	        expect(false).not.toBe(true);
	    });
    });
```

For more reference check out the jasmine docs
[Your_first_suite](https://jasmine.github.io/tutorials/your_first_suite)

References
[Protractor](https://www.protractortest.org/#/)

[Protractor API](https://www.protractortest.org/#/api)







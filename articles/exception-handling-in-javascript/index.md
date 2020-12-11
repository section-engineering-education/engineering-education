### Introduction

Developers face problems and obstacles while coding. With the use of exceptions, you can responsibly manage these problems. Exception handling is the process of converting a code error message into a user-friendly error message. In this article, we will go through exception handling in JavaScript. Exception handling is a necessary step in the development process.

### Table of Contents

[What is Exception Handling](#what-is-exception-handling)

[JavaScript Error Types](#javascript-error-types)

[How to Handle Exceptions in JavaScript](#how-to-handle-exceptions-in-javascript)

### Prerequisites

Exception Handling in JavaScript is an exciting and interactive topic. Therefore, I recommend the reader to have a basic understanding of HTML, CSS, and JavaScript.

### What is Exception Handling

An exception is an object with a description of what went wrong. Also, it discovers where the problem occurred.
Errors occur due to mistakes made by developers, wrong input, and unforeseeable things. When JavaScript encounters an error in the process of running a code. It immediately stops the execution and raises an exception. In a programming environment, exceptions can be handled, but errors cannot.

If a software engineer fails to plan for failure, then whatever project or code they are working on will not be successful. That is where [exception handling](https://en.wikipedia.org/wiki/Exception_handling) comes in. When JavaScript encounters an error and raises an exception. The JavaScript translator looks for an exception handling code instead of proceeding to the next statement.

Exception handling is a powerful JavaScript feature to handle errors and maintain a regular JavaScript code/program flow.

Some of the reasons why exceptions occur are:

- Dividing a number by zero: This results into infinity, thus throwing an exception.
- When a file that is requested does not exist in the system.
- When the user provides the wrong input.
- When the network drops during communication.

### JavaScript Error Types

Different errors may occur while executing a JavaScript code. There are three types of errors.

1. [**Syntax Errors:**](https://developer.mozilla.org/en-US/docs/Glossary/Syntax_error#:~:text=An%20exception%20caused%20by%20the,you%20trigger%20a%20syntax%20error.) Errors that cannot be interpreted by the computer. Besides, these errors stop the program from working. In JavaScript, these errors are:

- Spelling errors(wrong spelling such as fiction instead of function)
- The omission of important characters(such as not using a semicolon to end a statement)
- Use of the wrong indentation

2. [**Runtime Errors:**](https://www.geeksforgeeks.org/javascript-error-and-exceptional-handling-with-examples/#:~:text=Runtime%20Error%3A%20A%20runtime%20error,also%20known%20as%20the%20exceptions.&amp;text=try%20___%20catch%20method%3A%20JavaScript,operator%20to%20handle%20the%20exception.)These errors take place during execution. With these errors, your program runs, and you could think it's working. The errors are detected when your program runs. It crushes or raises an exception. Thus, exception handlers handle exception errors.

These errors are often caused by:

- The program cannot find data because it does not exist.
- It cannot act on the data because it is an invalid type of data.

3. [**Logical Errors:**](https://study.com/academy/lesson/errors-in-javascript-types-methods-prevention.html) These are errors that take place due to logical mistakes. These types of errors do not throw an error or an exception at all. But do not do what the developer intends the code to do. It is challenging to find logical errors. They can only be found through extensive testing.

### Error Objects

When a runtime error occurs, it stops the code and raises an error object. The error object has two properties:

- Name: It gives the error name.
- Message: It sets or returns the error message in the form of a string.

JavaScript uses six types of error objects. These error objects are the foundation of exception handling.

#### EvalError

The EvalError function indicates the error that occurred in the [```eval()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) function. It is a global function that evaluates the JavaScript string. This exception is not thrown anymore by JavaScript. It is used for compatibility.

#### RangeError

A RangeError is raised when a numeric value is outside the specified range.

#### ReferenceError

A ReferenceError exception is raised if a variable that is not declared is used. These exceptions commonly occur due to spelling errors on variables.

#### Syntax Error

A Syntax Error exception is raised while compiling a code with syntax errors.

#### TypeError

A TypeError exception is raised when a value is different from the one expected.

#### URIError

A URIError exception is raised by ```encodeURI()``` and ```decodeURI()``` methods.

### How to Handle Exceptions in JavaScript

We now know what exceptions are. It's now time to understand how to handle them to prevent our programs from crashing. JavaScript handles exceptions in ```try-catch-finally``` statements; and ```throw``` statements.

#### Key Terms

**```try-catch-finally```** statement is a code or program that handles exceptions.

**```try```** clause identifies the code that generates exceptions.

**```catch```** clause catch exceptions that are thrown.

**```finally```** clause gets executed always.

**```throw```** statement generates exceptions.

#### Throw Statements

The ```throw statement``` is used to raise your built-in exceptions.
Here is an example of a ```throw``` statement.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exception Handling</title>
</head>
<body>
    <script type="text/JavaScript">
       <!--
       function myFunction() {
           var x = 50;
           var y = 0;
           try{
               if (y == 0) {
                   throw("This is division by zero error");   
               }else{
                   var z = x / y;
               }
           }catch(error){
               alert("Error: " + error);
           }
       }
       -->
    </script>
    <p>See the result by clicking the button below</p>
    <button type="button" onclick="myFunction()">Click Here</button>
</body>
</html>
```

#### Try Catch Statements

The ```try``` clause has the main code that may generate exceptions. In case an exception is thrown, the ```catch``` clause is executed.

Here is an example of a ```try-catch``` statement. In the example given below, the ```try``` clause calls an alert() function. The alert() function is not declared. It's given that an exception will be raised. The exception is placed in the ```error``` at the ```catch``` clause and gets executed.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Throw Catch Statement</title>
</head>
<body>
    <script type="text/Javascript">
    <!--
    function myFunction() {
        var j = 70;
        try {
            alert("The value of j is : " + j);
        } catch (error) {
            alert("Error: "+ error.message);
        }  
    }
    -->
    </script>
    <p>Click the button to see the output</p>
    <button type="button" onclick="myFunction()">Click Here</button>
</body>
</html>
```

#### Try Catch Finally Statements

The ```finally``` statement is the last block to be executed. It executes after ```try``` and ```catch``` clauses.

Here is an example of ```try-catch-finally``` statements.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Try-Catch-Finally Statement</title>
</head>
<body>
    <script type="text/JavaScript">
    <!--
    function myFunction() {
        var j = 70;
        try {
            alert("The value of j is : " + j);
        } catch (error) {
            alert("Error: "+ error.message);     
        } finally {
            alert("Finally")
        }  
    }
    -->
    </script>
     <p>Click the button to see the output</p>
     <button type="button" onclick="myFunction()">Click Here</button>
</body>
</html>
```

### Wrapping up

That's all there is for this article. We have learned what exception handling is, the different types of errors, and the error objects in JavaScript. We have also learned how to handle exceptions in JavaScript. I hope this article has helped you understand the concept of handling exceptions in JavaScript. Good luck!
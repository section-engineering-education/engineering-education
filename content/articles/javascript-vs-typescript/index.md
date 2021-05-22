---
layout: engineering-education
status: publish
published: true
url: /javascript-vs-typescript/
title: JavaScript vs. TypeScript
description: This article discusses the key differences and similarities between TypeScript and JavaScript. It also provides code snippets to show the distinct syntax in these two languages.
author: catherine-macharia
date: 2021-04-08T00:00:00-10:30
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/javascript-vs-typescript/hero.jpg
    alt: JavaScript Vs Typescript
---
[TypeScript](https://www.typeScriptlang.org/docs/) is a trendy programming language and a superset of JavaScript. In other words, TypeScript is an improved version of JavaScript. It inherits the functionalities and features of native JavaScript. Furthermore, it adds new components and syntax. This means that JavaScript code is effectively TypeScript code.
<!--more-->
JavaScript is an object-based scripting language used for creating interactive web pages. It is a well-established programming language. A survey conducted by [Stack Overflow](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-professional-developers) shows that JavaScript is the most popular programming language in the world.

![Most popular language stack overflow](/engineering-education/javascript-vs-typescript/most-popular-language-stack-overflow.jpg)

[***Image Source***](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-professional-developers)

These two languages have been used to develop superb web applications both for server-side and client-side.

### History: The beginning
[Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich) and [Netscape](https://whatis.techtarget.com/definition/Netscape) developed JavaScript. It was launched in [September 1995](https://www.learnacademy.org/blog/who-introduced-javascript-originally-called-why-created/) and was initially called Mocha. 

JavaScript was created to ease web interactivity with Java-like syntax (object-oriented). It became a popular scripting tool and was later named JavaScript. This naming was adopted to reflect Java-like code in the Netscape's browser. JavaScript became more popular forcing Netscape to submit it to [ECMA](https://www.ecma-international.org/) (European Computer Manufacturers Association) to attract more corporations. 

JavaScript now complies with [ECMAScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources) (ES) standard. [ES5](https://www.w3schools.com/js/js_es5.asp) and [ES6](https://www.w3schools.com/js/js_es6.asp) are the most used ES standards that are applied alongside JavaScript.

JavaScript has now become the most popular programing language. About 96% of today's web pages use JavaScript to run client-side and back-end services. This includes large corporations such as Google and Facebook. JavaScript has matured into a competent scripting language. This is due to the numerous open-source libraries and frameworks with ready-made codes that you can import and use in your projects.

TypeScript, an open-source programming language, was developed by [Anders Hejlsberg](https://en.wikipedia.org/wiki/Anders_Hejlsberg) and released to the public in [October 2012](https://www.tutorialsteacher.com/typeScript/typeScript-overview). Microsoft Corporation adopted TypeScript and launched TypeScript version 1.0 in [July 2014](https://devblogs.microsoft.com/typeScript/announcing-typeScript-1-0/).

Let's compare and contrast the two.

### Execution and compilation
TypeScript is denoted by `.ts` while JavaScript files have a `.js` extension. Note that you cannot run TypeScript on the browser directly. This is because TypeScript takes a longer time to compile as compared to JavaScript. 

In other words, if you run a TypeScript application in the browser, a compilation step is needed to transpile TypeScript into JavaScript. TypeScript is converted into Plain JavaScript because Browsers cannot understand the TypeScript code. 

On the other hand, JavaScript runs on the browser directly. JavaScript is executed as plaintext. Therefore, you do not need any special preparation or compilation to run a `.js` program.

### Dynamic vs. static typing
One of the major differences between TypeScript and JavaScript can be noted when writing scripts. TypeScript is a static language. It supports checking of static-type features. 

TypeScript has a fast feedback loop that detects errors while writing your scripts. This helps you to produce a robust codebase within a short period. Furthermore, this feature enables you to identify any errors during the compilation process.

On the other hand, JavaScript is a dynamic language. Any code error is detected during runtime. The software (IDE or a Text Editor) will not detect issues until runtime. 

A lot of errors should be detected manually.

Let have a simple example to demonstrate this.

```ts
function sum (a,b){
    return a + c;
}
sum(4,4)
```

This code adds `a` to `b`. However, `c` is not a parameter of function `sum`. If you save this code with a `.ts` extension, the IDE will highlight errors at compilation time, as shown below.

![TypeScript error](/engineering-education/javascript-vs-typescript/function-error.jpg)

![TypeScript function error detected](/engineering-education/javascript-vs-typescript/function-error-detected.jpg)

Here is another example.

```ts
function sum (a:number ,b:number){
    return a + b;
}
```

In the example above, the function `sum` has a number annotation for both parameters. If you start adding a different type, for example, pass in a string as a parameter, TypeScript will tell you passed in a string, and this needs to be a number.

```ts
function sum (a:number, b:number){
    return a + b;
}
sum("hello",4)
```

![TypeScript static typing](/engineering-education/javascript-vs-typescript/static-typing.jpg)

![TypeScript static typing error](/engineering-education/javascript-vs-typescript/static-typing-error.jpg)

Though these might seem like simple examples, it pays off when you work on more functions. This feature is not available in JavaScript. If your code has an error, you won't catch it until runtime. This can be annoying, especially for beginners.

### Type annotations
Annotating your types makes the source code more readable and error-free. Type annotations allow you to declare the value type. However, JavaScript does not natively support this feature. 

Here is an example.

```js
function getName(i){
    const names = ['John', 'Conor', 'Mike', 'Jessica'];
    return names[i];
}
const sayName = getName(2)
```

The function requires a parameter `(i)` which is an index of `names` array. `sayName` is equal to the function's return value at a given index.

As a JavaScript developer, you might already know that the function `getName` returns a string type of the `names` array. However, you can annotate this function within TypeScript, as shown below.

```ts
function getName(i):string{
    const names = ['John', 'Conor', 'Mike', 'Jessica'];
    return names[i];
}
const sayName = getName(2)
```

Once the annotation is declared, the function return value doesn't change its type and only takes specific values. The compiler alerts developers to type-related mistakes. This helps you avoid simple errors, as you already know the value's type.

Since the above method returns a string, you can manipulate it with any string objects or string methods. For example, if you want to return the names as uppercase, you add the uppercase method, which is part of the string object, as shown below.

```ts
function getName(i):string{
    const names = ['John', 'Conor', 'Mike', 'Jessica'];
    return names[i];
}
const sayName = getName(2).toUpperCase
```

You avoid errors such as `Type 'abc' is not assignable to type 'string'` because you already know you are manipulating string values with a string method. 

Moreover, TypeScript is statically typed; any non-string value assigned to this function's return value will notify you of a possible error. In JavaScript, string types can be assigned to other types. 

For instance, a number can be changed to a string. 

Type annotations can be applied to anything, including:

- Functions parameters and return values

```ts
function sum (a:number ,b:number):number{
    return a + b;
}
```

- Variables

```ts
let myString: string;
let myNum: number;
let MyBool: Boolean;
```

- Object properties

```ts
interface Car{
    year: number;
    model: string;
    electric: Boolean;
}
```

### Browser support
TypeScript supports almost all browsers. The TypeScript compiler compiles the `.ts` to any JavaScript flavor such as ES3, ES4, ES5, and ES6. Therefore, you write the code once, and the target browser compiles it behind the scenes.

### Community and popularity
JavaScript is an old language and has an extensive community support over TypeScript. JavaScript has remained the most popular language for several years, as surveyed by both [stack overflow](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-professional-developers) and [Red Monk](https://redmonk.com/sogrady/2021/03/01/language-rankings-1-21/).

![Most popular language red monk](/engineering-education/javascript-vs-typescript/most-popular-language-red-monk.jpg)

[***Image Source***](https://redmonk.com/sogrady/2021/03/01/language-rankings-1-21/)

However, TypeScript's popularity is rising which indicates rapid growth. Currently, it is ranked the eighth most popular language.

![Most loved language stack overflow](/engineering-education/javascript-vs-typescript/typescript-trend.jpg)

[***Image Source***](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-professional-developers)

It has even emerged among the most loved programming languages among developers.

![Most loved language stack overflow](/engineering-education/javascript-vs-typescript/most-loved-language.jpg)

[***Image Source***](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages-loved)

### Ecosystem
JavaScript has a vast ecosystem when compared to TypeScript. NPM helps to manage JavaScript dependencies. TypeScript only works with NPM for the back end. It is also clear that JavaScript has a richer framework and APIs network than TypeScript. 

### Advantages of TypeScript over JavaScript
- TypeScript's static reading enhances code optimization, early bug detection, stable code, and defined types.

- TypeScript offers explicit category declarations. This provides a more informative version of a codebase.

Take a look at this identical JavaScript code and TypeScript code.

***JavaScript***

```js
const ISelectProps = {
    defaultValue: '',
    id: '',
    inline: true,
    name: 'default name',
    onChange: function onChange() { },
    onSearch: function onSearch() { },
    options: [],
    placeholder: '',
    value: 'default',
    style: {},
    className: '',
    propTypes: {}
};
```

***TypeScript***

```ts
export interface ISelectProps {
    defaultValue?: ISelectProps | string;
    id?: string;
    inline?: boolean;
    name?: string;
    onChange?: ({target, option, value}) => void;
    onSearch?: (event) => void;
    options?: Array<ISelectProps | string>;
    placeholder?: string;
    value?: ISelectProps | string;
    style?: React.HTMLProps<HTMLStyleElement>;
    className?: string;
    propTypes?:any;
}
```

The above shows the quality of the code information between the two.

- TypeScript supports [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense#:~:text=IntelliSense%20is%20a%20general%20term,%2C%20and%20%22code%20hinting.%22) tools that increase the development speed. Microsoft developed this navigation tool to offer the `auto complete` feature. It also provides active hints as the code is added. You can also set up hotkeys to access detailed descriptions.

![TypeScript hotkeys](/engineering-education/javascript-vs-typescript/typescript-hotkeys.jpg)

- TypeScript has more features than JavaScript because it is inspired by other languages. 

Some of these features include:
1. Type annotation - the value for each static type is checked automatically by TypeScript.
2. Generics - lets you write generalized methods.
3. Improved API documentation - TypeScript has tools like Visual Studio Code navigation that automatically allows developers to see parameter types, track variables, and functions that belong to external libraries and APIs.

![TypeScript api documentation highlights](/engineering-education/javascript-vs-typescript/typescript-api-documentation-highlights.png)

### Use cases
When you have a large codebase, TypeScript will help you bring your code to a single standard. Static typing speeds up the development process by detecting bugs in real-time. 

TypeScript also provides interfaces and access modifiers that enable different developers to communicate and work together towards a single codebase.

JavaScript runs directly in a browser. Unlike TypeScript, it is flexible. It offers dynamic typing which supports the creation of new functionality without sticking to the same rules. 

It, therefore, fits well in small projects. TypeScript does not support frameworks such as [Ember.js](https://emberjs.com/) and [Glimmer.js](https://glimmerjs.com/). Therefore, JavaScript is the language of choice for such a framework. 

### Conclusion
JavaScript and TypeScript fit in the modern web environment perfectly. JavaScript is preferred in small applications while TypeScript is mainly used in large enterprise applications. 

Frameworks like Angular2 use TypeScript as the main building block. TypeScript Traces can also be observed in popular frameworks such as React.js and Vue.js. 

I hope this guide helps you figure out the main differences between JavaScript and TypeScript to make a wise choice for your projects.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)

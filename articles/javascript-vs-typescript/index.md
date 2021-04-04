[Typescript](https://www.typescriptlang.org/docs/) is a trendy programming language. It is a superset of JavaScript. Typescript can be described as an improved version of JavaScript. It inherits the functionalities and features of native JavaScript as well as adding more additional features and syntax. This means that JavaScript code is effectively Typescript code.

On the other hand, JavaScript is an objected based scripting language used for creating interactive web pages. It is a well-established programming language. It is even the most popular programming language in the world of development, a survey conducted by [stack overflow](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-professional-developers)
.

![Most popular language stack overflow](/engineering-education/javascript-vs-typescript/most-popular-language-stack-overflow.jpg)

[***Image Source***](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-professional-developers)

The two languages have been remarkably used to develop superb web applications for server-side and client-side.

### History: The beginning
[Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich), [Netscape](https://whatis.techtarget.com/definition/Netscape) Communications Corporation programmer, developed JavaScript. JavaScript was launched in [September 1995](https://www.learnacademy.org/blog/who-introduced-javascript-originally-called-why-created/), initially called Mocha. It was created to ease web interactivity with Java-like syntax (object-oriented). JavaScript became a popular scripting tool and was later named JavaScript. This naming was adopted to reflect Java-like code in the Netscape's browser (Mozilla's ancestor). This scripting language becomes even more popular, and Netscape submitted it to [ECMA](https://www.ecma-international.org/) (European Computer Manufacturers Association) to attract more corporations. JavaScript now complies with [ECMAScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources) (ES) standard. [ES5](https://www.w3schools.com/js/js_es5.asp) and [ES6](https://www.w3schools.com/js/js_es6.asp) are the most used ES standards applied alongside JavaScript.

JavaScript has now become the most popular programing language. About 96% of today's web pages currently use JavaScript to run client-side and back-end services. This includes popular website corporations such as Google and Facebook. JavaScript has matured into a competent scripting language. This goes hand in hand with a tone of open source libraries and frameworks with ready-made codes that you can run in your projects as built-ins.

On the other hand, [Anders Hejlsberg](https://en.wikipedia.org/wiki/Anders_Hejlsberg) developed [Typescript](https://www.npmjs.com/package/typescript), an open-source programing language. The Typescript was released to the public in [October 2012](https://www.tutorialsteacher.com/typescript/typescript-overview) at version 0.8 and version 0.9 in 2013. Microsoft Corporation added support to Typescript and launched Typescript version 1.0 in [July 2014](https://devblogs.microsoft.com/typescript/announcing-typescript-1-0/).

Lately, Typescript has gained rapid popularism among web developers. Due to its adoption by big corporations such as Microsoft. One of the main reasons Microsoft released Typescript was to bring a solution for writing large-scale web applications quickly.

Let's compare and contrast the two.

### Execution and compilation
Typescript is denoted by extension `.ts` while JavaScript is denoted by `.js`. You can't directly run Typescript on the browser. Usually, Typescript takes a longer time to compile the code as compared to JavaScript. If you run the Typescript application in the browser, a compilation step is needed to transpile Typescript into JavaScript.

Typescript gets converted into Plain JavaScript as Browsers can't understand the Typescript code. Therefore, if the code is written in Typescript, then the code is compiled and converted, i.e., translated into JavaScript. And by the help of JavaScript code, browsers can read and display the outputs. This process is known as Trans-pile.

On the other hand, JavaScript directly runs on the browser. JavaScript is executed as plaintext, and you don't need any special preparation or compilation to run a `.js` program. It is compiled directly into machine language.

### Dynamic vs. static typing
One of the huge differences between the two can be noted when typing down a `.js` or a `.ts`. Typescript is a static language. It supports static type checking features. Typescript has a tight and fast feedback loop that detects errors while typing down your scripts. This helps you to write a robust codebase within a short period. This feature's major benefit is that it gives you hints to catch and detect any code error during the compilation process. Thus resulting in early bug catching and cleaner structured code.

On the other hand, JavaScript is a dynamic language. Any code error is detected during runtime. The software(IDE or a Text Editor) will not detect types differences as errors up until runtime. A lot of errors need to be detected manually.

Let have a simple example to demonstrate this.

```ts
function sum (a,b){
    return a + c;
}
sum(4,4)
```

This code adds `a` to `b`. However, `c` is not a parameter of function `sum`. If you save this code with a `.ts` extension, The IDE (Text Editor) will highlights errors at compilation time, as shown below.

![Typescript error](/engineering-education/javascript-vs-typescript/function-error.jpg)

![Typescript function error detected](/engineering-education/javascript-vs-typescript/function-error-detected.jpg)

Here is another example

```ts
function sum (a:number ,b:number){
    return a + b;
}
```

In the above example, the function `sum` has a number annotation for both parameters. If you start adding a different type, for example, pass in a string as a parameter, Typescript will tell you passed in a string, and this needs to be a number.

```ts
function sum (a:number ,b:number){
    return a + b;
}
sum("hello",4)
```

![Typescript static typing](/engineering-education/javascript-vs-typescript/static-typing.jpg)

![Typescript static typing error](/engineering-education/javascript-vs-typescript/static-typing-error.jpg)

This might seem like simple examples, but it pays off when you start adding more functions or more code to your codebase.

This feature is not available in JavaScript. If your code has an error, you won't catch it until runtime. This can be annoying, especially for those unfamiliar with JavaScript intricacies.

### Type annotations
Annotating your types makes our source code a lot more readable and error-free. Type annotations allow you to declare/annotate the type of a value. Annotations can be applied to variable declarations, constants, function parameters, or even function return values. JavaScript does not natively support this feature. That's why Typescript is here to provide the annotations functionality.

Here is an example

```js
function getName(i){
    const names = ['John', 'Conor', 'Mike', 'Jessica'];
    return names[i];
}
const sayName = getName(2)
```

The function takes on the parameter `(i)`, an index of `names` array. `sayName` is equal to the function's return value at a given index.

As a JavaScript developer, you might already know that the function `getName` returns a string type of this array names. However, you can annotate this function within Typescript, as shown below.

```ts
function getName(i):string{
    const names = ['John', 'Conor', 'Mike', 'Jessica'];
    return names[i];
}
const sayName = getName(2)
```

Once the annotation is declared, the function return value doesn't change its type and only takes specific values. The compiler alerts developers to type-related mistakes. This helps you avoid simple errors, as you already know the value's type.

Since the above returns a string, you can even manipulate it with any string objects or string methods. For example, if you want to return the names as uppercase, you add the uppercase method, which is part of the string object, as shown below.

```ts
function getName(i):string{
    const names = ['John', 'Conor', 'Mike', 'Jessica'];
    return names[i];
}
const sayName = getName(2).toUpperCase
```

You avoid errors such as `Type 'abc' is not assignable to type 'string'` because you already know you are manipulating string values with a string method.

Moreover, Typescript is statically typed; any non-string value assigned to this function's return value will nudge you of a possible error. Nothing will prevent your string types from being assigned to other types in JavaScript, such as a number to a string. So this is a huge Typescript advantage to eliminate common silent type errors during compilations.

Type annotations can be applied to anything, including

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

#### Browser support
Typescript support almost every target browser. This means you don't need to use Webpack and Gulp tools as you would using JavaScript. Your target browser may not support JavaScript. However, the Typescript compiler compiles the `.ts` to any JavaScript flavor such as ES3, ES4, ES5, and ES6. Thus, you write the code once, and the target browser is taken care of by the compiler behind the scenes.

### Community and popularity
JavaScript is an old language and has extensive community support compared to Typescript. JavaScript is the most popular language for several years, as surveyed by both [stack overflow](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-professional-developers) and [Red Monk](https://redmonk.com/sogrady/2021/03/01/language-rankings-1-21/).

![Most popular language stack overflow](/engineering-education/javascript-vs-typescript/most-popular-language-stack-overflow.jpg)

[***Image Source***](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-professional-developers)

![Most popular language red monk](/engineering-education/javascript-vs-typescript/most-popular-language-red-monk.jpg)

[***Image Source***](https://redmonk.com/sogrady/2021/03/01/language-rankings-1-21/)

However, Typescript popularity is rising, and it is gaining momentum, indicating rapid growth. It is ranked the eighth most popular language.

![Most loved language stack overflow](/engineering-education/javascript-vs-typescript/typescript-trend.jpg)

[***Image Source***](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages-professional-developers)

It has even emerged as one of the most currently loved languages among developers.

![Most loved language stack overflow](/engineering-education/javascript-vs-typescript/most-loved-language.jpg)

[***Image Source***](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages-loved)

### Ecosystem
JavaScript ecosystem outweighs the number of tools that support Typescripts such as NPM. However, you can integrate Typescript with NPM but only for the back end. JavaScript has a richer framework and APIs network than Typescript. If your framework doesn't support Typescript, you won't be able to take advantage of its features.

### Advantages of Typescript over JavaScript
- Typescript static reading is a huge step towards increased code optimization, early bug detection, stable code, and defined types.

- Typescript offers explicit category declarations. This provides a more informative version of a codebase.

Take a look at this identical JavaScript code and Typescript code.

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

***Typescript***

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

- Typescript support [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense#:~:text=IntelliSense%20is%20a%20general%20term,%2C%20and%20%22code%20hinting.%22) tools that increase the development speed. Microsoft developed this [Visual Studio Code](https://code.visualstudio.com/) navigation tool to offers auto code completion. This provides active hints as the code is added. You can also set up hotkeys to access detailed descriptions of an instrument.

![Typescript hotkeys](/engineering-education/javascript-vs-typescript/typescript-hotkeys.jpg)

- Typescript adds more features than JavaScript does have. It took inspiration from other languages to deliver improved features such as;

1. Type annotation - the value for each static type is checked automatically by Typescript.
2. Generics - lets you write a generalized form of method.
3. Improved API documentation - Typescript has tools like visual studio code navigation that automatically allows developers to see parameter types, track variables, and functions that belong to external libraries and APIs.

![Typescript api documentation highlights](/engineering-education/javascript-vs-typescript/typescript-api-documentation-highlights.png)

### Use cases
When you have a large codebase, Typescript isn't a priority. Typescript will help you bring your code to a single standard. You need static typing to speeds up the development process by catching bugs in real-time. It also provides interfaces and access modifiers that enable different developers to communicate and work together towards one codebase.

JavaScript runs directly in a browser. Unlike Typescript, it is flexible. It offers dynamic typing. This allows creating new functionality without sticking to the same rules. This fits well in small projects that need small code surface area. Typescript doesn't support all frameworks such as [Emmber.JS](https://emberjs.com/) and [Glimmer.JS](https://glimmerjs.com/). JavaScript is the language of choice for such a framework. You can use JavaScript to take full advantage of the features provided by such frameworks.

### Conclusion
These two languages are coded and shaped to fit into modern web development. JavaScript is considered a design tool for small applications, which has a few lines of code, i.e., small scripts. Typescript is mainly used to replace JavaScript in large enterprise-level and robust applications. Frameworks like Angular2 also use Typescript as the main building block. Typescript Traces can be noted in popular frameworks such as React.JS and Vue.JS.

Typescript adds a robust type system to JavaScript. If you are writing a JavaScript code, it is a valid Typescript code; if you want, you can add a few Typescript features, and still, it will be a valid JavaScript. Even if you are writing complete Typescript code, you can convert the types into plain JavaScript Code.

I hope this guide helps you figure out the main differences between JavaScript and Typescript to make a wise choice for your projects.

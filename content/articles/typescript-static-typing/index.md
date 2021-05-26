---
layout: engineering-education
status: publish
published: true
url: /typescript-static-typing/
title: Why Static Typing & Why is TypeScript so popular?
description: TypeScript was ranked higher than JavaScript according to the GitHub Developer Survey. Why? What does TypeScript add that's so much better? TypeScript is much like JavaScript. In fact, all JavaScript is valid as TypeScript code.
author: mike-white
date: 2020-08-24T00:00:00-10:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/typescript-static-typing/hero.jpg
    alt: typescript image example
---
According to the [Stack Overflow Developer Survey 2020](https://insights.stackoverflow.com/survey/2020#most-loved-dreaded-and-wanted), 67.1% of TypeScript users loved it. This makes it the second most loved language, behind Rust, and narrowly beating out Python. JavaScript was number 10, with 58.3% of users interested in continuing to use it. That is still pretty good. It sure beats Visual Basic. But why is TypeScript so much more popular?

<!--more-->
[TypeScript 4.0](https://github.com/microsoft/TypeScript/issues/38510) will probably be released before this article is published. Now is a good time to talk about it.

## What's a TypeScript?
TypeScript is much like JavaScript. In fact, all JavaScript is valid as TypeScript code. TypeScript [was developed by Microsoft](https://devblogs.microsoft.com/typescript/announcing-typescript-1-0/) to make it [easier to write large code bases](https://www.infoworld.com/article/2614863/microsoft-augments-javascript-for-large-scale-development.html). Essentially, it's just JavaScript, with static typing. The TypeScript compiler does nothing but convert all the TypeScript code into JavaScript. The resulting JavaScript code can be run in any browser.

### What's Static Typing?
If you don't know, static typing is when the compiler enforces that values use the same type. Here's an example. This is valid in JavaScript:

```JavaScript
let value = 5;
value = "hello";
```

Here, the type of `value` changes from a number to a string. In TypeScript, this is forbidden.

```typescript
let value = 5;
value = "hello"; // error: Type '"hello"' is not assignable to type 'number'.
```

## Why TypeScript?
Why would you use static typing? Most of the time, it's for performance reasons. As explained in the [low level JavaScript](https://www.section.io/engineering-education/low-level-javascript/) article, there is a performance benefit to letting the compiler know what type the value is, without having to check it.

This isn't the reason to use TypeScript though. Alas, TypeScript doesn't take advantage of this. The real benefit to using TypeScript is to prevent certain glitches.

There's one famous example of JavaScript being weird. If a program inputs a number, and the user inputs a string, you might try to do some arithmetic on it.

```JavaScript
// userInput = "2"
console.log(userInput + 2);
```

You may expect the console to print "4", but JavaScript doesn't do this. Instead, it gives you, "22". Because `userInput` is a string, adding a number to it will convert the number to a string. JavaScript politely concatenates the two strings together, and the result is "22".

If you use JavaScript, you're not likely to know what the type for some object is. It's possible you won't realize what methods a certain object has, or even what fields it has.  It will run just fine, until you need to use the result of that property, causing a [semantic error](https://runestone.academy/runestone/books/published/thinkcspy/GeneralIntro/SemanticErrors.html).

```JavaScript
class ExampleClass {

    private value;

    constructor(value) {
        this.value = value;
    }

    getNumber() {
        return this.value;
    }
}

let object = new ExampleClass(5);
console.log(object.number); // prints "undefined"
```

TypeScript knows better. It will give you a compiler error. That means you'll know the error is there before you even run the program. The compiler tells you what the problem is, so you don't need to try to hunt it down. A few seconds of specifying types will save you from an hour of debugging.

```typescript
class ExampleClass {

    private value: number;

    constructor(value: number) {
        this.value = value;
    }

    getNumber(): number {
        return this.value;
    }
}

let object = new ExampleClass(5);
console.log(object.number); // compiler error: Property 'number' does not exist on type 'ExampleClass'
```

There are other, [hilarious examples of JavaScript being weird (and also Ruby)](https://www.destroyallsoftware.com/talks/wat).

### Other Features of TypeScript

#### Enums

Yes, [JavaScript can do it too](https://stijndewitt.com/2014/01/26/enums-in-javascript/), but it's a weird workaround. TypeScript uses syntactical sugar to make it work much better.

```typescript
// typescript version
enum Color {
  Red,
  Green,
  Blue,
}

let c: Color = Color.Green;

// javascript version

var Color = {
    Red: 0,
    Green: 1,
    Blue: 2,
}

var c = Color.Green;
c = 6839; // this is completely valid, which kinda defeats the purpose
```

#### Interfaces
You can enforce that a class has certain functions (or properties) by using [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html).

```typescript
interface Animal {
    speak(): void;
}

class Dog implements Animal {
    speak(): void {
        console.log("woof");
    }
}

// lots of other things can implement interfaces too, including functions

interface SearchFunction<T> {
    (list: Array<T>, value: T): number;
}

let linearSearchForNumber: SearchFunction<number> = function(list, value): number {
    for (let i = 0; i < list.length; i++) {
        if (list[i] == value) {
            return i;
        }
    }
    return -1;
};
```

#### Literal Types
These are like enums, but slightly cooler.

```typescript
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6; // this is a type alias, set to a literal type

function rollDice(): DiceRoll {
    return (Math.floor(Math.random() * 5)) + 1 as DiceRoll;
}
```

There are more advanced features too. The [TypeScript Handbook Reference](https://www.typescriptlang.org/docs/handbook/advanced-types.html) can be a fun read.

## Cons of TypeScript
TypeScript isn't exactly plug-and-play. Node.js doesn't support it, nor do any Internet browsers. To use it, you'll need to compile it to JavaScript. To compile it, you can use the program, [tsc](https://www.typescriptlang.org/download/). If you forget to compile it, then nothing will change and you'll be very confused.

There are solutions to this. You can use the `--watch` option on tsc to have your code compile automatically. You can also use [Deno](https://deno.land/). Deno is an alternative to Node.js, created by [the same person who created Node.js](https://www.infoq.com/news/2018/12/deno-v8-typescript/). Deno can run Typescript natively, so there's no need to compile it. Deno also has other features, such as security.

The downside of Deno is that Node.js has more support. Node.js has tons and tons of libraries (to the point of [insanity](https://external-preview.redd.it/R8LNCy-V4bFxoaWIB1dZ4UJJalpg8yj27ly9YtF1Gu0.png?s=c59b24a48576a27fe1848f7c23dadb7523897ded)), and used much more often. Deno is cool, but you should definitely also know Node.js before going into a job interview.

A lot of jobs also like to use TypeScript, so it's good to learn it anyway.

Speaking of which...

## Get Started with TypeScript
A TypeScript cheat sheet is outside the scope of this article. There are already some [really good cheatsheets](https://rmolinamir.github.io/typescript-cheatsheet/). To prevent this from becoming a master's thesis, the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) is a recommended reading. TypeScript can be super useful for preventing type errors. Give it a try, and hopefully you'll come to enjoy it.

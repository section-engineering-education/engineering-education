---
layout: engineering-education
status: publish
published: true
url: /a-friendly-beginner-guide-to-typescript/
title: A Friendly Beginner's Guide to TypeScript
description: This article gives the reader a friendly beginners guide to TypeScript, which is a language that extends JavaScript by adding types.
author: idris-olubisi
date: 2021-02-21T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/a-friendly-beginner-guide-to-typescript/hero.png
    alt: Guide to TypeScript image example
---
TypeScript is a programming language that extends JavaScript by adding types. It saves time by catching errors and provides fixes before you run the code. TypeScript is a commonly used tool for adding static types.
<!--more-->
Code written in TypeScript can be easily transformed into JavaScript using a TypeScript compiler or babel. The compiled JavaScript code is always cleaner with no bugs and it runs in a browsers or Node.js application.

### Table of contents
- TypeScript Basics
- Compiler Configurations
- Classes & Interfaces
- Typescript Features
- Namespaces and Module
- Resources
- Conclusion

### Prerequisites
Before we continue it is recommended to have the following.
- A basic knowledge of JavaScript.

In this article, I will show you some important guidelines to follow as you learn Typescript. But it is also key to remember that practicing is the best way to learn. 

Let's get started!

### TypeScript types
#### Boolean
This data type is simply a true/false value. The example below shows how you can assign a Boolean value to a variable in TypeScript.

```TypeScript
let isOpen: Boolean = true;
```

#### Number
TypeScripts supports floating-point values, this type is known as a `number`. In ECMAScript 2015, octal literals and binary were introduced which is also supported in TypeScript.

```TypeScript
let decimalExample: number = 6;
let hexExample: number = 0xf00d;
let octalExample: number = 0o744;
let bigExample: bigint = 100n;
let binaryExample: number = 0b1010;
```

#### String
TypeScript uses single (') or double(") quote similar to JavaScript. Textual datatypes are refer to as a type `string` as in other languages.

```TypeScript
let colour: string = "yellow";
colour = 'white';
```

Template strings are also valid in TypeScript and can be used without limitations. This is represented using backtick (\`) , it can also be used for embedded expressions as shown below:

```TypeScript
let fullName: string = `Idris Olubisi`;
let age: number = 47;
let text: string = `Hello, my name is ${fullName}.`
```

#### Enum
Enum in TypeScript is a special class that contains constant values, by default enum numbering start from the index zero. This type is classified as a means of giving awesome names to a set of numeric values.

```TypeScript
enum Fruits {
  Orange,
  Apple,
  Banana,
}
// can be accessed by
let c: Fruits = Fruits.Apple;
```

You can manually set the number of an enum by setting its values as shown below:

```TypeScript
enum Fruits {
  Orange = 1,
  Apple = 4,
  Banana = 7
}
// can be accessed by
let c: Fruits = Fruits.Banana;
```

#### Array
TypeScript also supports arrays. An array is a data structure consisting of a set of elements. Each element is defined by an index or key and is stored in such a way that a mathematical formula can compute its position from its index tuple.

##### Tips about an Array
- Once an array is initialized it can't be resized because it's static. This can be useful in many scenarios.
- Sequential memory blocks are allocated when an array is declared.
- An array requires declaration before use.

```TypeScript
let listOfNumbers: number[] = [1, 2, 3, 4, 5, 6];
```

Using the generic array type declaration.

```TypeScript
let listOfNumbers: Array<number> = [1, 2, 3, 4, 5, 6];
```

#### Object
An object is an instance that contains a set of key-value pairs. The type `object` is a non-primitive type. 

An example is shown below:

```TypeScript
var person = {
   firstName:"Idris",
   lastName:"Olubisi"
};
```

#### Any
The type `Any` allows us to assign “any” particular value to a variable, similar to what we have in JavaScript. The `any` type allows you to gradually control the opt-in and opt-out of checking types during compilation. 

An example of the type `Any` is shown below:

```TypeScript
let amount: any;
amount = 26;
amount = true;
amount = "Hello World";
amount = [];
amount = {};
amount = null;
amount = undefined;
```

#### Unknown
This works similar to `Any`, but, it gives an error when you try to reassign a value that has been initialized. This means anything can be assigned to unknown itself and also `any` types in TypeScript.

```TypeScript
let amount: unknown;
// Error
let newAmount: number = amount;
```

A more advanced type guide can be used for something more specific to check types.

```TypeScript
const maybeItsUnknown: unknown;

// Check if its true
if (maybeItsUnknown ===  true) {

  // maybeItsUnknown is a boolean
  const booleanExample: boolean = maybeItsUnknown;

  // It cannot be a string
  const stringExample: string = maybeItsUnknown;
}

// Check if its true
if (typeof maybeItsUnknown === "string") {

  // maybeItsUnknown is a string
  const anotherBoolean: string = maybeItsUnknown;

  // It cannot be a boolean
  const anotherString: boolean = maybeItsUnknown;
```

#### Void
A `void` type in TypeScript is seen as a return type for a function that does not return a value. 

An example is shown below:

```TypeScript
function greetings(): void {
  console.log("Hi everyone ????");
}
```

You can also check out the [TypeScript Docs](https://www.typescriptlang.org/docs) to learn more about the types and basics in TypeScript.

### Compiler Configurations
`tsconfig.json` specifies the root files in typescript and the compiler options that are required to compile the project whenever `tsc` is run locally. 

For example:

```TypeScript
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
     "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
    // "noUncheckedIndexedAccess": true,      /* Include 'undefined' in index signature results */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just type checking. */
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
    "noEmitOnError": true,
    /* Advanced Options */
    "skipLibCheck": true /* Skip type checking of declaration files. */,
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  }
  // "exclude": [
  //   "node_modules" exclude by default
  // ]
}
```

Most of the configurations are commented out but you can uncomment where necessary after reading the description attached to it on the right-hand side.

#### To run your TypeScript file
- Configure typescript using the `tsconfig.json` file.
- Run `tsc --watch`, so that every time you change a `.ts` file, tsc will compile it and produce the output in any folder configured such as a dist folder.
- Nodemon can be used to watch files changed in dist folder, then reload happens automatically.

Configure your script in `package.json` to look like this:

```TypeScript
"scripts": {
    "clean": "rimraf dist",
    "build": "tsc",
    "watch:build": "tsc --watch",
    "watch:server": "nodemon './dist/index.js' --watch './dist'",
    "start": "npm-run-all clean build --parallel watch:build watch:server --print-label"
  },
```

### Classes & Interfaces
An Interface is a structured group of properties that describe an object.

A Class is a blueprint so objects can be created and configured using the same properties and methods.

In addition to the class definition:

Fields − Fields in class represent data pertaining to objects.

Constructors − They are responsible for allocating memory for the objects of the class.

Functions − Functions are also referred to as methods and they represent actions an object can take.

#### Interface
```TypeScript
interface IStudent {
    studentCode: number;
    studentName: string;
    getIncome: (number) => number; // arrow function
    getStudentAdvisor(number): string;
}
```

#### Class
```TypeScript
class WelcomeMessage {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Welcome, " + this.greeting;
  }
}

let welcomeUser = new WelcomeMessage("Idris"); // Welcome Idris
```

### Typescript features
JavaScript uses "dynamic types"(resolved at runtime), Typescript uses "static types"(set during development).

![typescript feature](/engineering-education/a-friendly-beginner-guide-to-typescript/typescript-feature-img.jpg)

[Image Source](https://www.tutorialspoint.com/)

### Namespaces and Module
#### Namespaces
Namespaces are used for logical grouping and can include functions, classes, and interfaces to support a group of related functionalities.

Namespaces structures codes in a web application in such a way that all dependencies can be included in a `script` tag.

##### Module
Modules in TypeScript can contain declarations, code, and dependency on a module loader or a runtime that supports ES Modules. They provide strong isolation/separation of concern, reusable code, and provide great support for bundling. 

Modules are recommended for code organization mechanisms to suit any proper business logic.

### Conclusion
> Practice makes perfect, you will learn and find solutions in ways you never imagined possible. "Jo Bradford"

I hope you found this tutorial useful.

Thank you for reading.

### Resources
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

- [Awesome TypeScript](https://github.com/dzharii/awesome-typescript)

- [Why Static Typing & Why is TypeScript so popular?](https://www.section.io/engineering-education/typescript-static-typing/)


---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)

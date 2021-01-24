### What is TypeScript?
TypeScript is a programming language that extends JavaScript by adding types. It saves time catching errors and providing fixes before you run code. So, by understanding JavaScript, everything comes in handy.

### Table of contents
- [TypeScript Basics](#typescript-basics)
- [Compiler Configurations](#compiler-configurations)
- [Classes & Interfaces](#classes-&-interfaces)
- [Typescript Features](#typescript-features)
- [Namespaces and Module](#namespaces-and-module)
- [Resources](#resources)
- [Conclusion](#conclusion)

### Prerequisite
- Basic knowledge of JavaScript

In this article, I will show you some important guidelines to learn typescript. But, have in mind that practicing is the best way to learn. Let's get started 😊

### TypeScript Basics
#### Boolean
This data type is simply a true/false

```TypeScript
let isOpen: Boolean = true;
```

#### Number
TypeScript Supports floating-point values or BigIntegers

```TypeScript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

#### String
TypeScript uses single (') or double(") quote similar to JavaScript.

```TypeScript
let colour: string = "yellow";
color = 'white';
```

Template Strings are also valid in TypeScript and can be used without limitations.

```TypeScript
let fullName: string = `Idris Olubisi`;
let age: number = 47;
let text: string = `Hello, my name is ${fullName}.`
```

#### Enum
Enum in TypeScript is a special class that contains constant values. By default enum numbering start from the index zero.

```TypeScript
enum Fruits {
  Orange,
  Apple,
  Banana,
}
// can be accessed by
let c: Fruits = Fruits.Apple;
```

You can manually access set the number of an enum.

```TypeScript
enum Fruits {
  Orange = 1,
  Apple = 4,
  Banana= 7
}
// can be accessed by
let c: Fruits = Fruits.Banana;
```

#### Array
TypeScript also supports arrays. They are represented as;

```TypeScript
let listOfNumbers: number[] = [1, 2, 3, 4, 5, 6];
```

#### Object
An object in TypeScript is an instance that contains a set of key-value pairs. It gives a compilation error whenever you try to access a value that does not exist in a given object.

```TypeScript
var person = {
   firstName:"Idris",
   lastName:"Olubisi"
};
```

#### Any
The type `Any` allows us to assign “any” particular value to a variable, similar to what we have in JavaScript.

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

##### Unknown

This works similar to `Any` core types in typescript but when you try to reassign a value that has been initialized to a new variable then you will get an error, Which means anything is assignable to unknown itself and `any`core types.

```TypeScript
let amount: unknown;
// Error
let newAmount: number = amount;
```

#### Void
A void in TypeScript is set when it's certain that a function is not returning a value.

```TypeScript
function greetings(): void {
  console.log("Hi everyone 😊");
}
```

You can also check out the [TypeScript Doc](https://www.typescriptlang.org/docs) to learn more about the types and basics in TypeScript.

### Compiler Configurations
`tsconfig.json` is used to specify the root files and the compiler options required to compile the project whenever `tsc` is run locally. e.g.

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

##### To run your TypeScript File

- Configure typescript using the ` tsconfig.json` file.
- Run `tsc --watch`, so that every time you change a `.ts` file, tsc will compile it and produce the output in any folder configured e.g a dist folder.
- Use nodemon to watch if files in ./dist have changed and if needed to relaunch the server.

configure your script in `package.json` to look like this

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

A Class is a blueprint from which we can create objects that share the same configuration or properties and methods.

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

### Typescript Features
JavaScript uses "dynamic types"(resolved at runtime), Typescript uses "static types"(set during development)

![typescript feature](/engineering-education/a-friendly-beginner-guide-to-typescript/typescript-feature-img.jpg)
[image credit](https://www.tutorialspoint.com/)

#### Namespaces and Module

##### Namespaces
Namespaces are used for logical grouping and can include functions, classes, interfaces to support a group of related functionalities.
Namespaces structures codes in a web application in such a way that all dependencies can be included in a `script` tag.

##### Module
Modules in TypeScript can contain declarations, code, and dependency on a module loader or a runtime that supports ES Modules. They provide strong isolation and separation of concern, reusable code, and great support for bundling. Modules are recommended for code organization mechanisms to suit proper business logic.

### Resources
[TypeScript Docs](https://www.typescriptlang.org/docs/)

[Awesome TypeScript](https://github.com/dzharii/awesome-typescript)

[Why Static Typing & Why is TypeScript so popular?](https://www.section.io/engineering-education/typescript-static-typing/)

### Conclusion

> Practice makes perfect, you will learn and find solutions in ways you never imagined possible. "Jo Bradford"

I hope you find this useful.

Thank you for reading.

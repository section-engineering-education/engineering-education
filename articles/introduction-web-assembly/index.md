---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-web-assembly/
title: An Introduction to WebAssembly - Part 1
description: WebAssembly is designed as an open standard that defines a portable binary-code format for programming languages, and a corresponding textual assembly language. Enabling deployment on the web for client and server applications.
author: lucas-gompou
date: 2020-07-03T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-web-assembly/hero.jpg
    alt: WebAssembly example image
---
According [webassembly.org](https://webassembly.org/), *WebAssembly (abbreviated _Wasm_) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable target for compilation of high-level languages like C/C++/Rust, enabling deployment on the web for client and server applications.*
<!--more-->

Don't get bogged down by the term "stack machine". In this context, a stack machine is the paradigm behind how WebAssembly code works. It's mainly a virtual machine that sits in the browser, letting you run C/C++ and Rust in a web environment.

More generally, WebAssembly provides a way to run code written in multiple languages on the web at near-native speed. Another way to think of WebAssembly is as a compilation target for your existing projects written in C/C++ or Rust in order to run them inside a web browser.

Web assembly code defines an [Abstract Syntax Tree](https://medium.com/@dinis.cruz/ast-abstract-syntax-tree-538aa146c53b) stored in binary format with a .wasm file extension. This code does have a human-readable text format (the specification for which is still being finalized) that allows it to be written, viewed, and debugged by hand. Also, the binary format will result in a much smaller bundle than that of JavaScript, which means a faster payload delivery.

### How is WebAssembly different from JavaScript?
Well, Javascript is in a text format, while WebAssembly is represented in a binary format, which makes it is well-suited for low-level computation. With that in mind, we now have the power to come up with crazy functionalities we only dreamed of to be available on the web. That's why I like to think of WebAssembly as JavaScript on steroids.

It is also important to note that WebAssembly is not intended to be a replacement for JavaScript. Instead, it is designed to complement and work alongside JavaScript, allowing developers to take advantage of both languages' strong points. For example, I would definitely not advise anyone to write web components using WebAssembly. Similarly, features involving raw bits manipulation might be hard, if not awkward, to express in JavaScript. Besides, JavaScript has become very popular in the web development scene with a huge ecosystem that provides numerous frameworks, libraries, and tools.

Performance-wise, WebAssembly is not necessarily faster than JavaScript. However, when WebAssembly is able to ship parallel processing pipelines like threads and SIMD (Single Instruction, Multiple Data), it will be a complete game-changer in terms of performance.

### What can WebAssembly be used for?
WebAssembly is a great fit for applications such as 3D games, virtual and augmented reality, computer vision, image/video editing, and many other domains that demand native performance. Web Assembly will essentially fill the gap for the features that weren't previously available on a browser or even extend its capabilities. Moreover, WebAssembly will make it easier to stream big chunks of data through a network of processing functions, which was the case on a project I worked on during a Hackathon. We built most of the backend using WebAssembly, which added a serverless-ish feature to our web application.

As a web developer, I often hear the question, "Do I have to learn C/C++, or Rust to use WebAssembly?" Let's say you want to use a compression library written in C in your web application. Your first move might be to port the entire library to JavaScript then import it into your web application.

Well, that's a very tough thing to do, and personally, I wouldn't feel confident to involve novice readers in such endeavors. This is where WebAssembly comes in handy. Now, you just have to compile the library to WebAssembly and voilà! With little effort, you have the entire library (WebAssembly modules) available for your web application JavaScript code.

### How can I use WebAssembly?
There are four main ways to use WebAssembly modules in your application:

- Porting a C/C++ application with Emscripten.
- Writing or generating WebAssembly code by hand.
- Writing Rust code and targeting WebAssembly as its output.
- Writing [AssemblyScript](https://www.assemblyscript.org/) which is pretty similar to TypeScript syntax and easily compiles to WebAssembly.

This article will only cover the first option.

### Porting C code to WebAssembly
Let’s say you want to compile your C program into WebAssembly. You can either use online tools or do it on your local machine using [Emscripten](https://emscripten.org/index.html).

Emscripten is a toolchain built using LLVM that will compile your C source code into a .wasm module along with the accompanying JavaScript “glue” code to load and run that module using the [WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly). It also generates an HTML file that loads the JavaScript “glue” code to display its result.

Here is an overview of the toolchain:

![Emcripten compiler toochain](/engineering-education/introduction-web-assembly/diagram.png)<br>
1. Using Clang, your C source code gets compiled into LLVM's [intermediate representation](https://en.wikipedia.org/wiki/Intermediate_representation)
2. LLVM performs some optimization on that intermediate representation.
3. Using a backend tool called asm2wasm, Emscripten converts the LLVM's IR to a .wasm module.

Emscripten ships with several tools that allow large C/C++ codebases to be fully ported to WebAssembly. In fact, it implements libraries such as SDL, OpenAL, and mimics a file system using IndexedDB. We could say Emscripten is a full-fledged SDK, rather than a compiler.

### Practical Example
Let's get our hands dirty by building a small web application that generates the Fibonacci sequence with WebAssembly as our backend.

![Web browser screenshot](/engineering-education/introduction-web-assembly/example.png)<br>
First, let's set up our development environment by downloading and installing the [Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html)

Create a new directory for the project, and create a new for file `fibonacci.c` in that directory with the following code:

```c
#include<stdio.h>
int fib(int *f, int n)  {
    for (int i = 0; i < n; i++) {
        if(i == 0) {
          f[0] = 0;
        } else if(i == 1) {
          f[1] = 1;
        } else {
          f[i] = f[i-1] + f[i-2];
        }
    }
    return 0;
}
```

This is the source code to be compiled. It contains a function taking as parameters a pointer referencing an array of numbers and the number of terms `n` in the sequence to store in that array. This implies that from our JavaScript code, we would have to somehow pass down the address of an array to the WebAssembly module.

To build the corresponding WebAssembly module of this code, open up the terminal in your current directory, and run the following command:

```bash
emcc fibonacci.c -o output.js  -s WASM=1 \
-s EXPORTED_FUNCTIONS='["_fib"]' \
-s EXPORTED_RUNTIME_METHODS='["cwrap", "ccall"]' \
-s MODULARIZE=1 -s 'EXPORT_NAME="createModule"'
```

Let's break it down:

- `-s WASM=1` - This option tells Emscripten to output a .wasm module instead of [asm.js](asm.js) which is set by default.
- `-o output.js` - In addition to the .wasm module, a javascript "glue" glue code will be an output as well. As stated before, it is responsible for loading and instantiating the wasm module so it can be used in our application. In this example, we won't be using the generated HTML file (enabled by appending the name of the file as another param to the option), we'll write a custom one from scratch instead.
- `-s EXPORTED_FUNCTIONS='["_fib"]'` - Generally, options of this type `-s OPTION[=VALUE]` tells the compiler how the JavaScript code should be generated. In this specific case, it specifies what should be accessible from the compiled code (i.e the `fib` function); otherwise everything else might be ignored beside the `main` function which is called by default.
- `-s EXPORTED_RUNTIME_METHODS='["cwrap", "ccall"]'` - Tells the compiler to include runtime functions `cwrap()` and `ccall()`. These methods provide a way to call the compiled C function from our JavaScript code. `ccall()` calls directly the compiled C function passing down the parameters and returns the result, while `cwrap()` returns a wrapper JavaScript function that you can store in a variable.
- `-s MODULARIZE=1 -s 'EXPORT_NAME="createModule"'` -  Since the .wasm module is loaded asynchronously, calling the compile C code before the page is fully loaded might result in an error. To solve this, the `MODULARIZE` option puts all the generated JavaScript code into a factory function (i.e `createModule`) which returns a Promise that resolves with the module instance. That Promise will be an indicator of whether it is safe to call the compiled code.

Now, let's create our custom HTML template and save it the same directory:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-Int32Array.BYTES_PER_ELEMENT">
    <meta name="viewport" content="width=`, initial-scale=1.0">
    <title>Fibonacci sequence</title>
</head>
<body>
    <div>
        <h1>Fibonacci series generator</h1>
        <div>
            Enter the number of terms:
            <input id="input" type="text">
            <button class="mybutton">Generate</button>
        </div>
        <p id="display"></p>
    </div>
</body>
<script type="text/javascript" src="./output.js"></script>
{{{ SCRIPT }}}
</html>
```

This is a simple HTML template with an input form for the number of terms and a button to generate the series. There is also a script tag that loads the JavaScript "glue" code so the module can be utilized in the placeholder (`{{{ SCRIPT }}}`) where the JavaScript code logic of our application will go.

In the placeholder, add another script tag with the following code:

```javascript
createModule().then((module) => {
    function cArray(size) {
        const nBytes = Int32Array.BYTES_PER_ELEMENT;
        const offset = module._malloc(size * nBytes);
        return {
            "data": module.HEAP32.subarray(
                offset / nBytes,
                offset / nBytes + size
            ),
            "offset": offset
        }
    }
    document.querySelector('.mybutton')
    .addEventListener('click', function() {
        let out = "";
        const nTerms = +document.getElementById('input').value
        const series = cArray(nTerms)
        const fib = module.cwrap('fib','number',['number', 'number'])
        fib(series.offset, nTerms)
        for (let i = 0; i < nTerms; i++) {
            out += series.data[i] + " "
        }
        document.getElementById("display").innerHTML = out;
        module._free(series.offset);
    });
});
```

This is where things get a bit interesting. Let's walk through this code to see how it works.

First, we call our factory function `createModule`, which returns a promise that resolves with an instance of the module when everything is ready to call our compiled code.

Second, we declare a function `cArray` that takes as parameter the size of the array (i.e the number of terms in the sequence) and returns an object. To understand what this function does, we need to go through the mechanics of interacting with the compiled code. Remember, one of the parameters of our Fibonacci function is a pointer referencing an array of numbers. How do we handle passing an array pointer to the compiled code?

The way WebAssembly modules work is very different from JavaScript modules. Functions in WebAssembly only use numbers as parameters or return values. So if you want to use other data types like strings or arrays, you'll have to use WebAssembly module's memory.

If you come from a JavaScript background, memory management is something you don't even think about. However, with programming languages like C/C++ and Rust, it is possible to have direct access to memory (the heap) and WebAssembly module's memory simulates that feature. To accomplish it, it uses a feature of JavaScript called arrayBuffer which is an array of bytes whose indexes can be used as memory addresses.

Hence, to pass an array from JavaScript to  WebAssembly, we need to write that array into an array buffer, then use the index of its first element, which is an integer, as a pointer that we can pass to the WebAssembly function.

Let's take a look at the first two lines:

```javascript
const nBytes = Int32Array.BYTES_PER_ELEMENT;
const offset = module._malloc(size * nBytes);
```

Since the WebAssembly code can only access memory that has been allocated within its Heap (`Module.HEAP*`), we need to call the `_malloc` method from the wasm module. This will allocate the necessary bytes in the wasm heap needed for our `n * 4-bytes` integer array, and return a number offset (a number representing a memory address to our allocated buffer) in the wasm heap denoting the `Int32Array` typed array reserved for the terms of our sequence. This offset will act as a pointer that we can pass down to our compiled code.

In the end, the function returns an object containing the offset and a subarray, pulled from wasm heap memory, and referencing the 32-bit integer array we allocated earlier. This way, we can easily read the values once our Fibonacci function has finished executing.

Finally, we register a click event handler which gets the number of the terms from the input, allocates an `int32` array accordingly, and calls the `cwrap` function. The first parameter of this function is the name of the function to be wrapped, the second is the return type of the function, and the third is an array listing the parameters' types. We call our compiled C function, then display its results on the page. Also, we don't forget to free the buffer by calling `module._free`.

Now, all we have to do is run the `fibonacci.html` file in a browser. If we try to load the file directly from our local hard drive (`file://path_to_file/hello.html`), it will results in an error because the .wasm module is loaded asynchronously. We need to load the HTML file through an [HTTP server](https://github.com/http-party/http-server#readme) to prevent this error.

Congratulations! You have successfully ported a C function to WebAssembly and run it inside a web browser.

### Conclusion
This article is high-level overview of WebAssembly. Feel free to go down the rabbit hole of this amazing technology, and I hope my article covered just enough to get you started experimenting and using WebAssembly in your personal projects. Stay tuned for the follow-up of this article where will be using WebAssembly in a ReactJS application.

# An Introduction to WebAssembly - Part 1

According webassembly.org: 
*WebAssembly (abbreviated _Wasm_) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable target for compilation of high-level languages like C/C++/Rust, enabling deployment on the web for client and server applications.*

Don't get bogue down by the term "stack machine." In this context, a stack machine is the paradigm behinds how a WebAsssembly code works. It's mainly a virtual machine that sits in the browser that lets you run C/C++ and Rust in a web environment. More generally, WebAssembly provides a way to run code written in multiple languages on the web at near-native speed. Another way to think of WebAssembly is as a compilation target for your existing projects written in C/C++ or Rust in other to run them inside a web browser.

Web assembly code defines an [Abstract Syntax Tree](https://medium.com/@dinis.cruz/ast-abstract-syntax-tree-538aa146c53b) stored in binary format with a .wasm file extension. This code does have a human-readable text format (the specification for which is still being finalized) that allows it to be written, viewed, and debugged by hand. Also, the binary format will result in a much smaller bundle than that of Javascript, which means a faster payload delivery.

## Where does javascript fit in all this?  How is WebAssembly different from javascript?

Well, Javascript is in a text format, while WebAssembly is represented in a binary format, which makes it is well suited for low-level computation. With that in mind, we now have the power to come up with crazy functionalities we ever dreamed of to be available on the web. That's why I like to think of WebAssembly as Javascript on steroids.

It is also important to note that WebAssembly is not intended to be a replacement for Javascript. Instead, it is designed to complement and work alongside JavaScript, allowing developers to take advantage of both languages' strong points. For example,  I would definitely not advise to write your web components using WebAssembly. Similarly, features involving raw bits manipulation might be hard, if not awkward, to express in javascript. Besides, Javascript has become very popular in the web development scene with a huge eco-system that provides numerous frameworks, libraries, and tools.
Performance-wise, WebAssembly is not necessarily faster than javascript.
However, when WebAssembly will be able to ship parallel processing pipelines like threads and SIMD (Single Instruction, Multiple Data), it will be a complete game-changer in terms of performance.

## What can WebAssembly be used for?

WebAssembly will be a great fit for applications such as 3D games, Virtual and Augmented Reality, computer vision, image/video editing, and many other domains that demand native performance. Web Assembly will essentially fill the gap for the features that weren't previously available on the browser or even extend its capabilities. Moreover, WebAssembly will make it easier to streams big chunk of data through a network of processing functions, which was the case for my project during a Hackathon. We built most of the backend using WebAssembly, which added a serverless-ish feature to our web application.

As a web developer, do I have to learn C/C++, or Rust to use WebAssembly? Let's say you want to use a compression library written in C in your web application. Your first move might be to port the entire library to Javascript then import it into your web application. Well, that's a very though thing to do, and personally, I wouldn't feel confident to involve in such endeavors. This is where WebAssembly comes in handy. Now, you just have to compile the library to WebAssembly and voilà! With little effort, you have the entire library (WebAssembly modules) available for your web application javascript code.

## How can I use WebAssembly?

There are mainly four ways to use WebAssembly modules in your application:

- Porting a C/C++ application with Emscripten.
- Writing or generating  WebAssembly code by hand.
- Writing Rust code and target WebAssembly as its output.
- Writing [AssemblyScript](https://www.assemblyscript.org/) which is  pretty similar to TypeScript syntax  and easily compiles to WebAssembly.

This article will only cover the first option.

### Porting C code to WebAssembly

Let’s say you want to compile your C program into WebAssembly. You can either use online tools or do it on your local machine using [Emscripten](https://emscripten.org/index.html).

Emscripten is a toolchain built using LLVM that will compile you C source code into a .wasm module along with the accompanying javascript “glue” code to load and run that module using the [WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly). It also generates an HTML file that loads the Javascript “glue” code to display its result.

Here is an overview of the toolchain:

![Diagram](diagram.png "Emcripten compiler toochain")

 1. Using Clang, your C source code gets compiled into LLVM's [intermediate representation](https://en.wikipedia.org/wiki/Intermediate_representation)
 2. LLVM performs some optimization on that intermediate representation.
 3. Using a backend tool called asm2wasm, Emscripten converts the LLVM's IR to a .wasm module.

Emscripten ships with several tools that allow large C/C++ codebases to be fully ported to WebAssembly. In fact, it implements libraries such as SDL, OpenAL, and mimics a file system using IndexedDB. We could say Emscripten is rather a full-fledged SDK than a compiler.

### Practical Example

Let's get our hand dirty by building a small web application that generates the fibonacci sequence with WebAssembly as our backend.

![Web browser screenshot](example.png "")

First, let's set up our developement environment by downloading and installing the [Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html)

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

This is the source code to be compiled, and it contains a function taking as parameters a pointer referencing an array of numbers and the number of terms `n` in the sequence to store in that array. This implies that from our javascript code, we would have to somehow pass down the address of an array to the WebAssembly module.

To build the corresponding WebAssembly module of the this code, open up the terminal in your current directory, and run the following command:

```console
emcc fibonacci.c -o output.js  -s WASM=1 \
-s EXPORTED_FUNCTIONS='["_fib"]' \
-s EXPORTED_RUNTIME_METHODS='["cwrap", "ccall"]' \
-s MODULARIZE=1 -s 'EXPORT_NAME="createModule"'
```

Let's break it down:

- `-s WASM=1` - This option tells Emscripten to output a .wasn module instead of [asm.js](asm.js) which is set by default.
- `-o output.js` - In addition to the .wasm module, a javascript "glue" glue code will be outputed as well. As stated before, it is responsible for loading and instanciating the wasm module so it can be used in our application. In this example, we won't be using the generated html file (enabled by appending the name of the file as another param. to the option), we'll write a custom one from scratch intead.
- `-s EXPORTED_FUNCTIONS='["_fib"]'` - Generally, options of this type `-s OPTION[=VALUE]` tells the compiler how the javascript code should be generated. In this specific case, it specifies what should be accessible from the compiled code (i.e the `fib` function) otherwise everything else might be ignored besides the `main` function which is called by default.
- `-s EXPORTED_RUNTIME_METHODS='["cwrap", "ccall"]'` - Tells the compiler to include runtime functions `cwrap()` and `ccall()`. Thoses methods provide a way to call the compiled C function from our javascript code. `ccall()` calls directly the compiled C function passing down the parameters and returns the result, while `cwrap()` returns a wrapper javacript function that you can store in a variable.
- `-s MODULARIZE=1 -s 'EXPORT_NAME="createModule"'` -  Since the .wasm module is loaded asynchronously, calling the compile C code before  the page is fully loaded might result in an error. To solve this, the `MODULARIZE` option puts all the generated javacript code into a factory function (i.e `createModule`) which returns a Promise that resolves with the module instance. That Promise will be an indicator of whether it is safe to call the compiled code.

Now, let's create our custom html template and save it the same directory:

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

This is a simple html template with an input form for the number of terms and a button to generate the series. There is also a script tag that loads the javascript "glue" code so the module can be utilized in the placeholder (`{{{ SCRIPT }}}`) where the javascript code logic of our application will go.

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

This is where things get a bit interesting. Let's walkthrough this code to see how it works. First, we call our factory function `createModule` which returns a promise that resolves with an instance of the module when everything is ready to call our compiled code. Second, we declare a function `cArray` that takes as parameter the size of the array (i.e the number of terms in the sequence) and returns an object. To understand what this function does, we need to go through the mechanics of interacting with the compiled code. Remember, one of the parameters our fibonnacci function is pointer referecing an array of numbers. How do we handle passing an array pointer to the compiled code?

The way WebAssembly modules work is very different from Javascript modules. Functions in WebAssembly only use numbers as parameters or return values. So if you want to use other data types like strings or arrays, you'll have to use WebAssembly module's memory. If you come from a javascript background, memory management is something you don't even think about. However, with programming langues like C/C++ and Rust it is possible to have direct access to memory (the heap) and WebAssembly module's memory simulates that feature. To accomplish it, it uses a feature of Javascript called arrayBuffer which is an array of bytes which indexes can be used as memory addresses. Hence to pass an array from javascript to  WebAssembly, we need to write that array into an array buffer, then use the index of its first element, which is an integer, as pointer that we can pass to the WebAssembly function.

To get back at function, let's take a look the first two lines:

```javascript
const nBytes = Int32Array.BYTES_PER_ELEMENT;
const offset = module._malloc(size * nBytes);
```

Since, the WebAssembly code can only access memory that has been allocated within its Heap (`Module.HEAP*`), we need to call the `_malloc` method from the wasm module. This will allocate the necessary bytes in the wasm heap needed for our `n * 4-bytes` integer array, and returns a number offset (a number representing a memory address to our allocated buffer) in the wasm heap denoting the `Int32Array` typed array reserved for the terms of our sequence. This offset will act as a pionter that we can pass down to our compiled code. At the end, the function returns an object containing the offset and a subarray, pulled from wasm heap memory and referencing the 32-bit integer array we allocated earlier. This way, we can easily read the values once the our fibonacci function has finished excuting.

Finally, we register a click event handler which gets the number of the terms from the input, allocates an `int32` array accordingly, and calls the `cwrap` function. The first parameter of this function is the name of the function to be wrapped, the second is the return type of the function and the third is an array listing the parameters' types. We call our compiled C function, then display its results on the page. Also, we don't forget to free the buffer by calling `module._free`.

Now all we have to do is to run the `fibonacci.html` html file in a browser. If we try to load directly the file from our local hard drive (`file://path_to_file/hello.html`), it will results in an error because the .wasm module  is loaded asynchronously. We need to load the html file through an [HTTP server](https://github.com/http-party/http-server#readme) to prevent this error.

Congratulations! you successfully ported a C function to WebAssembly and run it inside a web browser.

## Conclusion

This article is high-level overview of WebAssembly, feel free to go down the rabbit hole of this amazing technology, and I hope my article covered just enough about it to get you started experimenting and using WebAssembly in your personal projects. Stay tuned for the follow-up of this article where will be using WebAssembly in a ReactJS application.
Functions are a vital building block for any functional programming languages such as JavaScript. As a developer, you will continuously use functions in your project. One great aspect of a function is that they are reusable. You can call them anywhere within your program. A function can return other functions or take them as its argument.

This concept is continuously applied in any functional programming. When you have an extensive program, chances are a function will be reused more than one time.

This way, a program computation may depend on executing the results of another function. This means that every time the program is executed, it will run and call these functions repeatedly, return the results, and pass them to the respective computations.

Executing such a function is inefficient, especially for an extensive system that needs to do long and heavy computations. The concept of Memoization comes to rescue such expensive computations.

### What is Memoization?

It is a concept of top-down, depth-first optimization technique of storing previously executed computations. Whenever the program needs the result of these computations, the program will not have to execute that computation again. Instead, it will reuse the result of the previously executed computation. The program will not have to repeat expensive computation. It will just return the results returned when the computation was first completed.

This concept is relative to the application of functional programming. In many instances, you will reuses functions within a program. With the concept of Memoization, when a function is called, its result will temporarily be stored. Any computation that needs the result of this function will not have to execute that function again. Instead, it will reuse results when the function was previously executed.

In this case, we can say that Memoization is a technique of caching results of expensive function calls to speed up computer programs by returning the cached result when the same input occurs again. This way, Memoization will remember and retrieve these results without recalculating these values every time. An expensive function is a function that takes some time to execute.

### Importance of Memoization

- It is an optimization technique when applied hand in hand with functional programming. It increases functions by caching its results. It stores the previous results. It then retrieves the results whenever needed in your program. This reduces execution time and increases CPU performance.
- A memoized function is a pure function. This means the function execution does not mutate. When called, it always returns the original values, regardless of how many times the function will be called.

- Assuming you have a function that executes not one, not two-times but several times, why not memorize the result of that function. This way, you only execute this function once. This makes your program more performance efficient.

### How Memoization works

Let’s take a real-life situation. Assume you are reading a novel with a cozy and fancy, attractive cover. A stranger passes and asks you what is the title and the author of the book. Chances are you'll flip the book, read the title and the author's name, and reply to that stranger.

The book is attractive, and chances are more people will like to know about the book. When another person passes by and asks you the details of that book, chances are you will not relook at the book's author and title again. Moreover, if you don’t really remember, you will look and reread those details. At this point, you must now be having the book details in your memory. And if a third person asks you about the book details, you will receive the information from your memory. The book details don’t change even if 100 people asked you about it.

The same applies to the concept of Memoization. When a function is called, memoization stores the function results before it returns the result to the function caller. This way, when another caller point to the results of this function, Memoization will return the result stored (cached) in the memory, and the function will not be executed over and over again. Memorizing reduces redundant function calls by caching the results based on its inputs.

The concept of Memoization is backed by two main sub-concepts, namely;

- [Closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) - Closure is a combination of a function wrapped together (enclosed) with references to the corresponding state (the lexical environment). In other terms, the Closure allows you access to the domain of the outer function from the inner function. In JavaScript, closures are generated every time a function is created, at the time of a function is created.
- [High order function](/engineering-education/javascript-higher-order-functions/) - A high order function accepts another function as an argument or returns a function as its output.

### Caching functions values using Memoization technique

To understand how the concept of Memoization can be applied in JavaScript, let's dive into some examples.

Here is an example of a function that takes a number as an argument and returns the provided number's square.

```js
const clumsysquare = num =>{
  let result = 0;
  for (let i = 1; i <= num; i++) {
    for (let j = 1; j <= num; j++) {
      result ++;
    }
  }
  return result;
}
console.log(clumsysquare(4));
console.log(clumsysquare(10));
console.log(clumsysquare(12));
console.log(clumsysquare(17));
console.log(clumsysquare(20));
```

You will realize that it will re-execute the function whenever you call it and then return a squared value.

The execution is straightforward and fast. The computation is straightforward. The real problem occurs when you want to perform heavy (expensive) computation.

```js
const clumsysquare = num =>{
  let result = 0;
  for (let i = 1; i <= num; i++) {
    for (let j = 1; j <= num; j++) {
      result ++;
    }
  }
  return result;
}
console.log(clumsysquare(190));
console.log(clumsysquare(799));
console.log(clumsysquare(4000));
console.log(clumsysquare(7467));
console.log(clumsysquare(9666));
```

This is not efficient. Instead, we can apply the concept of Memoization to store the result of `clumsysquare()` when first called. Whenever we call this function, the program will not have to re-execute it repeatedly.

The concept of Memoization will store the result of the previous execution. That way, when you call the function multiple times, the function will be called once and return the other function callers instantaneously based on the inputs.

Let's implement Memoization in our JavaScript program. To do that, the program executes the first instance `clumsysquare()` we’ll store its value then reuse it several times within the program.

```js
// a function that take a function and return a function
const memoize = (func) => {
  // a cache of results
  const results = {};
  // return a function for the cache of results
  return (...args) => {
    // a JSON key to save the results cache
    const argsKey = JSON.stringify(args);
    // execute `func` only if there is no cached value of clumsysquare()
    if (!results[argsKey]) {
      // store the return value of clumsysquare()
      results[argsKey] = func(...args);
    }
    // return the cached results
    return results[argsKey];
  };
};

// wrap clumsysquare() in memoize()
const clumsysquare = memoize(num => {
    let result = 0;
    for (let i = 1; i <= num; i++) {
        for (let j = 1; j <= num; j++) {
            result++;
        }
    }
    return result;
});

console.log(clumsysquare(190));
console.log(clumsysquare(799));
console.log(clumsysquare(4000));
console.log(clumsysquare(7467));
console.log(clumsysquare(9666));
```

The example above executes faster compared to when not using the concept of Memoization. You can choose to the cached using another function like shown above. Alternatively, you chose to store the results in a variable. Check this example.

```js
const memoizedValue = [];

const clumsysquare = (num) => {
    if ((memoizedValue[num] = !null)) {
        return memoizedValue[num];
    }

    let result = 0;
    for (let i = 1; i <= num; i++) {
        for (let j = 1; j <= num; j++) {
            result++;
        }
    }

    memoizedValue[num] = result;
    return result;
};
```

### Test Memoization by Performance

Let's test the function execution time using the normal function flow comparing to a memoized function.

The example below will calculate the time to take whenever a function is called.

#### Using the default function flow.

```js
const clumsysquare = (num) => {
  let result = 0;
  for (let i = 1; i <= num; i++) {
    for (let j = 1; j <= num; j++) {
      result++;
    }
  }
  return result;
};

console.time("First call");
console.log(clumsysquare(9467));
console.timeEnd("First call");

// use the same value two times
console.time("Second call");
console.log(clumsysquare(9467));
console.timeEnd("Second call");

console.time("Third call");
console.log(clumsysquare(9467));
console.timeEnd("Third call");
```

**Output**

```bash
89624089
First call: 130.173ms
89624089
Second call: 145.090ms
89624089
Third call: 166.594ms
```

The time it takes to execute each function increases. Every function call restarts the execution process, even though they are referring to the same results.

#### Using a memoized function

```js
const memoize = (func) => {
  const results = {};
  return (...args) => {
    const argsKey = JSON.stringify(args);
    if (!results[argsKey]) {
      results[argsKey] = func(...args);
    }
    return results[argsKey];
  };
};

const clumsysquare = memoize((num) => {
  let result = 0;
  for (let i = 1; i <= num; i++) {
    for (let j = 1; j <= num; j++) {
      result++;
    }
  }
  return result;
});

console.time("First call");
console.log(clumsysquare(9467));
console.timeEnd("First call");

// use the same value two times
console.time("Second call");
console.log(clumsysquare(9467));
console.timeEnd("Second call");

console.time("Third call");
console.log(clumsysquare(9467));
console.timeEnd("Third call");
```

Notice how time execution time drastically reduces when the function is called for the second time. This is because we have already cached `clumsysquare()` during `return result`.

**Output**

```bash
89624089
First call: 132.389ms
89624089
Second call: 0.091ms
89624089
Third call: 0.085ms
```

### Recursive functions: A memoization use case

Recursion is a programming concept applied when a function calls itself several times. A function will have a definite break condition that indicates when it should stop calling itself. Recursion employs the concept of looping. A loop occurs when a number iterates several times until a specified condition is met.

A great recursion use case is a Fibonacci sequence. A Fibonacci takes two previous numbers in series, adds them to predict the next Fibonacci term in the sequence.

The first terms of a Fibonacci sequence are

![Fibonacci sequence](/engineering-education/an-introduction-to-memoization-in-javascript/fib1.png)

[Image Source](https://www.forex.com/en/education/education-themes/technical-analysis/fibonacci-theory/)

Each number is the sum of the previous two numbers. Here is how the sequence is constructed.

![Fibonacci sequence](/engineering-education/an-introduction-to-memoization-in-javascript/graphic-1-3-1.png)

[Image Source](https://www.sportsbettingdime.com/guides/strategy/fibonacci-sequence-betting/)

A Fibonacci calculate the same numbers repeatedly. This becomes a redundant computation. In addition, as you generate more Fibonacci terms, the program might slow down.

Here is a Fibonacci example that generates the nth Fibonacci terms in the Fibonacci sequence. Putting in mind that the function execution should be fast, well written, and stable, and reliable.

```js
const fibonacci = (n) => {
    // if n is equal to 1 return the first term 1
    if (n == 1) {
      return 1;
    }
    // if n is equal 2 return the second term 1
    else if (n == 2) {
      return 1;
    }

    // else n is greater than two, return the sum of the previous two terms
    else 
      return fibonacci(n - 1) + fibonacci(n - 2);
};
// print the fifth term in the sequence
console.log(fibonacci(5));
```

The program is straightforward. Here we log the fifth term, which is 5.

However, when we want to generate a higher nth Fibonacci term, the program becomes slower and slower.

```js
const fibonacci = (n) => {
    // if n is equal to 1 return the first term 1
    if (n == 1) {
      return 1;
    }
    // if n is equal 2 1 return the second term 1
    else if (n == 2) {
      return 1;
    }

    // else n is larger than two, return the sum of the previous two terms
    else 
      return fibonacci(n - 1) + fibonacci(n - 2);
};
// print the fiftieth term in the sequence
console.log(fibonacci(50));
```

The computation is long and takes around 133315.439ms.

This is how the recursive function works behind the scene. Take the fifth term. This is how the fifth term is calculated, `fibonacci(5) = fibonacci(4) + fibonacci(3)`.

But `fibonacci(4)` have to return `fibonacci(3) + fibonacci(2)`.

The program needs to compute `Fibonacci(3)`. It makes another call `Fibonacci(2) + Fibonacci(1)` to return `Fibonacci(3)`.

![Recursive fibonacci sequence](/engineering-education/an-introduction-to-memoization-in-javascript/recursive-fib.jpg)

You get the idea. The function calls itself over and over until the fifth computation term is met. This is a lot of computations. The program will be repeating the Fibonacci calls which were previously called when returning the previous Fibonacci terms.

You can imagine the number of computations that will have been taken place to generate the 50th term. In this case, it will be recursive because the function repeats itself until the condition of the 50th term is met.

Instead, we can memoize the function's results.

```js
const memoize = (func) => {
  const results = {};
  return (...args) => {
    const argsKey = JSON.stringify(args);
    if (!results[argsKey]) {
      results[argsKey] = func(...args);
    }
    return results[argsKey];
  };
};

const fibonacci = memoize((n) => {
  // if n is equal to 1 return the first term 1
  if (n == 1) {
    return 1;
  }
  // if n is equal 2 1 return the second term 1
  else if (n == 2) {
    return 1;
  }

  // else n is larger than two, return the sum of the previous two terms
  else 
  return fibonacci(n - 1) + fibonacci(n - 2);
});
// print the fifth term in the sequence
console.log(fibonacci(50));
```

With a memoized function, this takes about 8.079ms to return the 50th term, which is relatively faster than the example above.

Every function call will be a cache. For example, in this case, `Fibonacci(5)` will only compute `Fibonacci(4) + Fibonacci(3)` since other terms have already been called and cached. Any future calls do not have to repeat any previous computations.

### When to use Memoization

- When a function is pure. A pure function always returns the same value when called. If a function is impure, it returns different values whenever executed. Caching such values may result in unexpected return values.

- Heavy computing functions. Whenever a program has expensive computation, caching the results will significantly increase your program performance. With Memoization, the function doesn’t have to recalculate its values, yet it returns the same results whenever called.

- Remote API calls. When making an API call repeatedly, using Memoization will save you from making repetitive calls to the server. You already know the result when you made the first call, and thus no need to make the same call to get the same results.

- A function that recalls itself with recurring input values, i.e., recursive functions.

### Conclusion

Memoization is a programming concept and can be applied to any programming language. Its fundamental goal is to optimize your program. This is mainly seen if a program is performing heavy computations. Memoization will cache computation results so that it will not have to strain while executing a heavy operation that requires a previously executed computation.

This concept has been applied to several JavaScript libraries such as

- [Async.js]( https://caolan.github.io/async/v3/docs.html#memoize)
- [Lodash](https://lodash.com/docs/4.17.15#memoize)
- [Memoizee](https://www.npmjs.com/package/memoizee)
- [Moize]( https://www.npmjs.com/package/moize)
- [Fast-memoize]( https://www.npmjs.com/package/fast-memoize)

I hope this guide helps you understand the concept of Memoization and implement it with your heavy JavaScript computations.
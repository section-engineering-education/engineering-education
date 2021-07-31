---
layout: engineering-education
status: publish
published: true
url: /introduction-to-dynamic-programming/
title: Introduction to Dynamic Programming
description: This article will go over dynamic programming (popularly referred to as DP) operates, with a few coding examples as examples. Dynamic Programming (DP) is an algorithmic technique used when solving an optimization problem by breaking it down into simpler subproblems.
author: adith-bharadwaj
date: 2021-01-17T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-dynamic-programming/hero.jpg
    alt: Introduction to Dynamic Programming example Image
---
In our previous [article on recursion](/introduction-to-recursion/), we explored how we can break a problem into smaller sub-problems and solve them individually. However, recursion is not the most optimal technique and has its share of obstacles. Fortunately, there is a powerful algorithmic technique called dynamic programming that helps us overcome the hurdles posed by recursion and solve problems optimally. 
<!--more-->
In this article, we will understand how dynamic programming (popularly referred to as DP) works by solving coding questions.
### Table of contents
[Prerequisites](#prerequisites)

[Understanding DP](#understanding-dp)

[Fibonacci Numbers](#fibonacci-numbers)

[Conclusion](#conclusion)

### Prerequisites
1. Basic understanding of [Programming](https://www.tutorialspoint.com/computer_programming/computer_programming_basics.htm) and [time complexities](https://www.freecodecamp.org/news/time-complexity-of-algorithms/).

2. Basic knowledge of [Python](https://www.python.org/about/gettingstarted/).

3. A basic understanding of [Recursion](https://www.section.io/engineering-education/introduction-to-recursion).

### Understanding DP
Dynamic Programming (DP) is an algorithmic technique used when solving an optimization problem by breaking it down into simpler subproblems and utilizing the fact that the optimal solution to the overall problem depends upon the optimal solution to its subproblems. 

[Educative](https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/m2G1pAq0OO0) has a great article on DP and how it works. It sounds similar to recursion. That's because DP is just an optimized version of recursion. Before we delve into DP, let us look at the drawbacks of recursion:

**It is not efficient in terms of memory:** Since recursion involves function calls, each recursive call creates an entry for all the variables and constants in the function stack. These values are kept there until the function returns. Therefore, recursion is always limited by the stack space in the system. 

If a recursive function requires more memory than what is available in the stack, a common and prevalent error called [stack overflow](https://stackoverflow.com/questions/214741/what-is-a-stackoverflowerror) occurs. Check [this](https://benpfaff.org/writings/clc/recursion-vs-iteration.html) article for more details.

**It is not fast:** Iteration (using loops) is faster than recursion because every time a function is called, there is an overhead of allocating space for the function and all its data in the function stack. This causes a slight delay in recursive functions when compared to iteration. [This](https://stackoverflow.com/questions/10057443/explain-the-concept-of-a-stack-frame-in-a-nutshell) is a good read on the function call stack and how it works.

In recursion, the same function can be called multiple times with the same arguments. In other words, the same result is calculated multiple times instead of just once. In dynamic programming, a recursive function is optimized by storing the intermediate results in a data structure. 

We store these results so that they are only calculated once. In other words, any recursive function in which the same results are calculated multiple times can be converted into DP. Let us look at the Fibonacci number example (covered in the previous article) to get a better idea.

### Fibonacci numbers
```py
def fibonacci(n):
	if(n == 1 or n == 2):
		return 1
	return fibonacci(n - 1) + fibonacci(n - 2)
n = int(input('Enter the nth term: '))
print(fibonacci(n))
```

The above code is the recursive implementation of Fibonacci numbers covered in the previous article. The `fibonacci()` function is called twice: once to calculate `(n - 1)` and once to calculate `(n - 2)`. Therefore, the time complexity of this function is 2 raised to the power 'n'. $O(2^n)$. [This](https://www.geeksforgeeks.org/time-complexity-recursive-fibonacci-program/) is a good article on the time complexity of the recursive Fibonacci function.

For example:

Consider the case when n = 5.

1. We call fibonacci(5), which inturn calls fibonacci(4) and fibonacci(3)

2. fibonacci(4) inturn calls fibonacci(3) and fibonacci(2)

3. fibonacci(3) inturn calls fibonacci(2) and fibonacci(1)

4. fibonacci(2) and fibonacci(1) return 1, and the program terminates.

As you can observe, fibonacci(4), fibonacci(3), fibonacci(2) are called multiple times. Take a look at the image below to get a better idea:

![Fibonacci](/engineering-education/introduction-to-dynamic-programming/fibonacci.png)

[Image source](https://www.slitherintopython.com/assets/img/fibtree.png)

A better way to solve this would be to store all the intermediate results to calculate them once. There are two ways to do this, but in this article, we will explore one method called tabulation. The other method is called memoization, in which we store the intermediate results and return them within the function itself. 

To accomplish this, we can use any data structure such as a dictionary or an array. To understand more about the other method, check out [this](https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/m2G1pAq0OO0) article. 

In the tabulation method, we store the results of each function call in a data structure. Whenever an already stored value is needed, we fetch the value from the data structure instead of computing it repeatedly. For the Fibonacci example, we can use an array to store all the intermediate numbers.

**Code:**  
```py
def dynamic_fibonacci(n):
	# the first two values are 1 since the first
	# two terms of the series are also 1.
	array = [1, 1]
	  
	# Since we already know the first two terms,
	# we start the loop from 2(corresponds to term 3)
	for i in range(2, n):
		term = array[i - 1] + array[i - 2]
		array.append(term)
	# return the nth term of the array
	return array[n - 1]
n = int(input('Enter the number: '))
print(dynamic_fibonacci(n))
```

As you can see in the code above, we use an array to store all the terms in the series and calculate all the upcoming terms. The above code calculates all the Fibonacci numbers up to 'n'. However, we can do better and use two variables instead of an array (to save space) since we only require the 'nth' term.

**Optimized version:**
```py
def dynamic_fibonacci(n):
	# the first two values are 1 since the first
	# two terms of the series are also 1.
	# we have two variables for the same
	first = 1
	second = 1
	
	# Since we already know the first two terms,
	# we start the loop from 2(corresponds to term 3)
	for i in range(2, n):
		# the current term is the sum of the previous two terms
		term = first + second
		
		# now, we need to change the first and second term so that
		# they are updated to the new values. The first term becomes the
		# second term and the second term becomes the current term.
		first = second
		second = term
  
	# return the second term that contains the nth value
	return second
n = int(input('Enter the number: '))
print(dynamic_fibonacci(n))
```

This is how we can convert a recursive function into an optimized DP solution. The time complexity of the above function is linear or `O(n)` since we only have one for loop that runs till 'n'.


### Conclusion
In conclusion, dynamic programming is an exceptional variant of recursion that compensates for its drawbacks. However, DP can sometimes be hard to understand and grasp, making it a popular candidate for coding interviews. 

Whether you are a student preparing for a job or a professional, understanding how DP works can benefit you. Head over to these websites and resources to better understand DP and solve problems on your own because that is the best way to learn something new.

### Resources
[Hackerrank](https://www.hackerrank.com): Hackerrank allows you to select the problems' type and difficulty, making it perfect for beginners.

[Hackerearth](https://www.hackerearth.com/)

[GeeksforGeeks](https://www.geeksforgeeks.org/dynamic-programming/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)


<!-- MathJax script -->
<script type="text/javascript" async
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['$$','$$']],
      processEscapes: true,
      processEnvironments: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      TeX: { equationNumbers: { autoNumber: "AMS" },
           extensions: ["AMSmath.js", "AMSsymbols.js"] }
    }
    });
    MathJax.Hub.Queue(function() {
      // Fix <code> tags after MathJax finishes running. This is a
      // hack to overcome a shortcoming of Markdown. Discussion at
      // https://github.com/mojombo/jekyll/issues/199
      var all = MathJax.Hub.getAllJax(), i;
      for(i = 0; i < all.length; i += 1) {
          all[i].SourceElement().parentNode.className += ' has-jax';
      }
    });
    MathJax.Hub.Config({
    // Autonumbering by mathjax
    TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
  </script>

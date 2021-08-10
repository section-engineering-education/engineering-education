---
layout: engineering-education
status: publish
published: true
url: /semantic-html-for-beginners/
title: Getting started with Semantic HTML
description: The new HTML5 version comes with new feature like semantic HTML. In this tutorial, you will learn why you should use semantic HTML in your next project, the cons of not using semantic HTML, and much more.
author: tella-joshua
date: 2021-08-04T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

    - url: /engineering-education/semantic-html-for-beginners/hero.jpg
      alt: Semantic HTML for Beginners Hero image
---

The new version of HTML (HTML5) comes with some added features. One of these features is semantic HTML.
<!--more-->
A beginner learning about web development does not have the basic idea of semantic elements or might not see why they should use semantic HTML when structuring their web pages. It suffices to say that using semantic HTML has become necessary in recent times.

This article will cover why you should use semantic HTML in your next project, the cons of not using semantic HTML, and many more.

### Table of contents
- [Prerequisites](#prerequisites)
- [Understanding Semantic HTML](#understanding-semantic-html)
- [HTML layout without semantics](#html-layout-without-semantics)
- [HTML layout with semantics](#html-layout-with-semantics)
### Prerequisites
Before we get started, it is advisable to have:
- Basic knowledge and understanding of HTML.
- A modern web browser.
- An IDE installed, preferably [VS Code](https://code.visualstudio.com/).

### Understanding Semantic HTML
HTML semantic elements are those elements that have essential meaning and convey that meaning to both the browser and the developer. Through the semantic element, one can tell or describe what they want on a web page.

Semantic elements help structure the code we create, making it readable and easier to maintain. They also helps us think about the structure of our data in web design.

Some examples of semantic HTML tags are:
`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` etc.

#### HTML layout without semantics
Before we look at the HTML layout with semantics, let us build a simple layout without using semantic HTML.

**Note: The CSS can be ignored, it's just for aesthetic purposes.**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Semantic HTML</title>
    <style>
        * {
            margin: 0px;
            padding: 0px;
        }
        body {
            background-color: white;
            font-family: Arial, Helvetica, sans-serif;
        }
        .header {
            background-color: brown;
            border-bottom: 5px solid black;
            padding: 10px;
        }
        .main {
            display: flex;
        }
        .section {
            margin: 30px;
        }
        .aside {
            margin: 7px;
            margin-top: 30px;

        }
        ul {
            list-style-type: none;
            background-color: goldenrod;
            display: flex;
            justify-content: space-around;
            padding: 10px;
        }
        h1 {
        text-align: center;
        background-color: brown;
        padding: 10px;
        }
        h3 {
            background-color: brown;
            padding: 10px;
        }
        p {
            padding: 20px;
        }
        input {
            width: 98%;
            height: 30px;
            padding: 2px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            background-color: brown;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Welcome to Saxophone Shop</h1>
    </div>
    <div class="nav">
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
        </ul>
    </div>
  
    <div class="main">
        <div class="section">
            <div class="article">
                <h3>About Saxophone Shop</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis cumque excepturi quidem natus, eum obcaecati iste culpa vitae ex?
                    Labore voluptatum beatae perspiciatis iusto distinctio quis et, delectus voluptatem.
                     Quod ipsum ratione incidunt nostrum, ullam odio adipisci velit repellendus eveniet,
                     laudantium reprehenderit, fugiat architecto nulla nam rerum soluta molestias eaque ut minima
                     veritatis vitae blanditiis odit maxime. Perspiciatis sit nobis fuga laboriosam adipisci tenetur
                     pariatur similique quia quibusdam excepturi, eveniet nihil corporis odit eum quas ad rem incidunt
                      laudantium. Corrupti quam voluptatum, repellat vero quo eos nemo qui obcaecati quisquam sint
                    uos quae facilis sed, ea consequatur fugiat enim.
                </p>
            </div>
            <div>
                <h3>Why Choose Us</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias nostrum aspernatur tenetur modi? Suscipit iure consequuntur
                    impedit minus tempore. Consectetur porro nemo animi minus illo autem
                     ullam odio inventore vitae ab in, itaque possimus rerum sapiente doloribus
                      vel reiciendis soluta temporibus dicta. Maiores dignissimos nihil quod ex
                       eveniet, voluptatem necessitatibus dolorum, ipsum excepturi inventore omnis
                       suscipit dolorem pariatur? Minima voluptatibus rerum error laboriosam.
                       Repellendus, quae eligendi. Sed neque hic cupiditate quam quia eius animi
                        delectus accusantium iusto asperiores alias quibusdam, qui recusandae
                        necessitatibus maxime cum? Voluptas, consequatur. Nisi est corporis
                         quasi vero, nam esse magnam. Dolores iusto debitis nostrum magnam.
                </p>
            </div>
        </div>

        <div class="aside">
            <div>
                <h3>Join Our newsletter</h3>
                <br>
            <input type="text" placeholder="Your email">

            </div>
            <br>
            <hr>
            <br>

            <div class="article">
                <h3>Contact Us</h3>
                <p>
                </p>
                Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Voluptatem minima dolor
                rem, perferendis tempore laborum mollitia
                voluptatum maxime quos ducimus, iure adipisci
                labore magnam atque quis tenetur quae, omnis voluptas?
            </p>


        </div>
    </div>
</div>
  
    <div class="footer">
        &copy; <b>2021 Saxophone Shop</b>
    </div>

</body>
</html>
```

This our basic layout structure:

![Simple HTML Layout](/engineering-education/semantic-html-for-beginners/html-layout.jpg)

One of the major problems of not using semantic HTML is the `naming convention` from the above code. This issue becomes paramount when it's not a single developer working on the code and when the code becomes larger. 

From the example, we had to come up with an individual naming style. There was no set of structures to follow. Handling this code for developers, especially new ones joining the team, can quickly become confusing and difficult to understand. 

#### HTML layout with semantics
The example below is about showcasing a simple layout with semantic HTML.

It should be noted that semantic HTML is a feature of HTML5 so declaring `doctype html` should be a given.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Semantic HTML</title>
  
    <style>
        * {
            margin: 0px;
            padding: 0px;
        }
        body {
            background-color: white;
            font-family: Arial, Helvetica, sans-serif;
        }
        header {
            background-color: brown;
            border-bottom: 5px solid black;
            padding: 10px;
        }
        main {
            display: flex;
        }
        section {
            margin: 30px;
        }
        aside {
            margin: 7px;
            margin-top: 30px;

        }
        ul {
            list-style-type: none;
            background-color: goldenrod;
            display: flex;
            justify-content: space-around;
            padding: 10px;
        }
        h1 {
        text-align: center;
        background-color: brown;
        padding: 10px;
        }
        h3 {
            background-color: brown;
            padding: 10px;
        }
        p {
            padding: 20px;
        }
        input {
            width: 98%;
            height: 30px;
            padding: 2px;
        }
        footer {
            text-align: center;
            margin-top: 20px;
            background-color: brown;
            padding: 20px;
        }


    </style>

</head>
<body>

    <header>
        <h1>Welcome to Saxophone Shop</h1>
    </header>

    <nav>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
        </ul>
    </nav>

    <main>
        <section>
            <article>
                <h3>About Saxophone Shop</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis cumque excepturi quidem natus, eum obcaecati iste culpa vitae ex?
                    Labore voluptatum beatae perspiciatis iusto distinctio quis et, delectus voluptatem.
                     Quod ipsum ratione incidunt nostrum, ullam odio adipisci velit repellendus eveniet,
                     laudantium reprehenderit, fugiat architecto nulla nam rerum soluta molestias eaque ut minima
                     veritatis vitae blanditiis odit maxime. Perspiciatis sit nobis fuga laboriosam adipisci tenetur
                     pariatur similique quia quibusdam excepturi, eveniet nihil corporis odit eum quas ad rem incidunt
                      laudantium. Corrupti quam voluptatum, repellat vero quo eos nemo qui obcaecati quisquam sint
                    uos quae facilis sed, ea consequatur fugiat enim.
                </p>
            </article>
            <article>
                <h3>Why Choose Us</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias nostrum aspernatur tenetur modi? Suscipit iure consequuntur
                    impedit minus tempore. Consectetur porro nemo animi minus illo autem
                     ullam odio inventore vitae ab in, itaque possimus rerum sapiente doloribus
                      vel reiciendis soluta temporibus dicta. Maiores dignissimos nihil quod ex
                       eveniet, voluptatem necessitatibus dolorum, ipsum excepturi inventore omnis
                       suscipit dolorem pariatur? Minima voluptatibus rerum error laboriosam.
                       Repellendus, quae eligendi. Sed neque hic cupiditate quam quia eius animi
                        delectus accusantium iusto asperiores alias quibusdam, qui recusandae
                        necessitatibus maxime cum? Voluptas, consequatur. Nisi est corporis
                         quasi vero, nam esse magnam. Dolores iusto debitis nostrum magnam.
                </p>
            </article>

        </section>

        <aside>
            <article>
                <h3>Join Our newsletter</h3>
                <br>
            <input type="text" placeholder="Your email">

            </article>
            <br>
            <hr>
            <br>

            <article>
                <h3>Contact Us</h3>
                <p>
                </p>
                Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Voluptatem minima dolor
                rem, perferendis tempore laborum mollitia
                voluptatum maxime quos ducimus, iure adipisci
                labore magnam atque quis tenetur quae, omnis voluptas?
            </p>

               </article>
        </aside>

    </main>

    <footer>
        &copy; <b>2021 Saxophone Shop</b>
    </footer>

</body>
</html>
```

**What you should know:**

1. Semantic HTML is just about given meaningful names to your HTML structure.
1. The semantic tag names cannot be edited.

For instance:

`<header>` will always be `<header>`

#### In the section above, we have:
- We used up to five semantic tags to drive the importance of using semantics.
- The `header` tag is for the name of the project or website.
- The `nav` tag will guide the new developer to know that the nav stands for navigation (where all the valuable links reside).
- We have the middle area, which is called the `main` tag in HTML5.
- We have the `footer` tag showcasing the closing section of the web page.
- The `section` area showcases different sections of our web page. 
- The `aside` area showcases the area of our web page not too relevant. It can also serve as the sidebar.

Finally, these are the basic semantic HTML5 tags, making our HTML more readable and easier to understand. However, it does not affect the view of the web page.

### Conclusion
To wrap up, we have learned about semantic elements in HTML. I encourage you to use the concepts you have learned within your next project.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)

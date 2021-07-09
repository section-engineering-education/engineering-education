---
layout: engineering-education
status: unpublish
published: false
url: /semantic-html-for-beginners/
title: Semantic HTML for Beginners
description: This tutorial provides the reader with a detailed explanation and example on semantic vs non-semantic HTML for beginner developers.
author: tella-joshua
date: 2021-02-03T00:00:00-16:00
topics: [HTML]
excerpt_separator: <!--more-->
images:
    - url: /engineering-education/semantic-html-for-beginners/hero.jpg
      alt: Semantic HTML for Beginners
---

In the new version of HTML, we have HTML5 which comes with some added features. One of these features that we will be learning about is semantic HTML.

<!--more-->

In this tutorial, you will learn why you should use semantic HTML in your next project, the cons of not using semantic HTML and many more.

### Table of contents

-   [Introduction](#introduction)
-   [Understanding Semantic HTML](#understanding-semantic-html)
-   [HTML layout without semantics](#html-layout-without-semantics)
-   [HTML layout with semantics](#html-layout-with-semantics)

### Introduction

A beginner learning about web development do not have the basic idea of semantic elements or might not see the reasons to use semantic HTML when structuring their web pages. It suffices to say that using semantic HTML has become important in recent times. In the next section, we would learn about semantic HTML and the reasons why you should use it.

#### Understanding Semantic HTML

The idea of using semantic elements is to indicate what they actually are rather than how it is on the browser which is referred to as HTML elements. Semantic elements explain the meaning to both the programmer and the browser, through the semantic element you can be able to tell or describe what you want on your web page.

HTML semantic elements are those elements that have essential meaning and convey that meaning to both the browser and the developer. The semantic element help structure the code we create, making it readable and easier to maintain. Finally, it also helps us to think about the structure of our data in web design.

Next, let's take a look at some semantic HTML tags:

`header`
`nav`
`main`
`article`
`section`
`aside`
`footer`

In the next section, we will be using these HTML tags and explain them in detail while building a simple layout with them.

#### HTML layout without semantics

Before we take a look at the HTML layout with semantics, let's take a step back and build a simple layout without using semantic HTML.

The CSS can be ignored, it's just for aesthetic purposes.

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

From the above code, one of the major problems of not using semantic HTML is the `naming convention`. This issue becomes paramount when it is not a single developer working on the code and also when the code start to become larger. From the example, we had to come up with my own naming style, there was no set of structures to follow. Handling this piece of code to other developers especially new ones joining the team can quickly become confusing for them to understand. Enter semantic HTML which we will be taking a look at in the following section.

#### HTML layout with semantics

The example below is about showcasing a simple layout with semantic HTML. It should be noted that semantic HTML is a feature of HTML5 so declaring `doctype html` should be a given.

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

What you should know:

1. Semantic HTML is just about given meaningful names to your HTML structure.
1. The semantic tag names cannot be edited.

For instance:

`<header>` will always be `<header>`

What's happen here?

1. we used up to five semantic tags to drive the importance of using semantics.
1. the `header` tag is for the name of the project or website.
1. the `nav` tag will guide the new developer to know that the nav stands for navigation (where all the useful links reside).
1. we have the middle area which is called the `main` tag in HTML5.
1. we have the `footer` tag showcasing the closing section of the web page.
1. in the `main` area we can have a lot of things inside. Semantic HTML comes baked with its special tag some of them include `section`, `article`, and `aside` tags.
1. the `section` area showcase different sections of our web page. Multiple sections can be created. the `section` can be in the `header`, `footer`.
1. the `aside` area showcase the area of our web page not too relevant. It can also serve as the sidebar.

Finally, these are the basic semantic HTML5 tags, which can make our HTML more readable and easier to understand. However, it does not affect the view of the web page.

### Conclusion

I am glad that you have reached the end of this tutorial, I encourage you to use the concepts you have been introduced within your next project.

Happy coding!

---

Peer Review Contributions by

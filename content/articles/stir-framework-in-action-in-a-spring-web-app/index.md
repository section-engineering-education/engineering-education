---
layout: engineering-education
status: publish
published: true
url: /stir-framework-in-action-in-a-spring-web-app/
title: Stir Framework in Action in a Spring Web App
description: This article helps you implement the Stir framework in a Spring web application.
author: john-amiscaray
date: 2023-03-21T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images: 

  - url: /engineering-education/stir-framework-in-action-in-a-spring-web-app/hero.png
    alt: Stir Framework hero image
---
In this tutorial, I will show Stir in action by creating a simple to-do application with Spring. In the process, we will see the features of Stir, the advantages of using it, and the proper usage of it for your next project.
<!--more-->
January 26th, 2023 saw the release of Stir version 1.0.0 to Maven central, an open-source Java framework I’ve developed over the past two months. Stir is a feature-rich server-side rendering framework that allows you to generate HTML on the fly. With its developer-friendly API and extensive documentation, you can get started with it right away and use it as the templating solution for your next backend project.

In this tutorial, I’ll show Stir in action by creating a simple to-do application with Spring. In the process, we’ll see the significant features of Stir, the advantages of using it, and the proper usage of it for your next project. By the end of this guide, you will have everything you need to know to use Stir for server-side development.

### Prerequisites

To fully follow along with this tutorial, I’ll assume that you:

- are fairly knowledgeable of core Java
- know how to install Maven dependencies
- understand the core features of Spring such as dependency injection, Spring Web, Hibernate integration, and Spring Data JPA
- understand Lombok
- know the theory behind REST APIs
- know HTML, CSS, and Javascript

However, the focus of this guide is on Stir itself so don’t worry if you don’t fully understand what’s going on outside of it.

### What is Stir Framework

Stir is a server-side rendering solution that gives developers a clean API over the generation of HTML content from Java objects. The way Stir works is that it provides various classes each representing a different HTML element. Using instances of these objects, Stir can generate HTML elements based on multiple fields representing inner content and attributes.

For example, take the following code:

```java
import io.john.amiscaray.stir.util.ElementProcessor;

public class Main {

	private final ElementProcessor processor = ElementProcessor.getInstance();
	
	public static void main(String[] args) {

		Input in = Input.builder()
                .id("my-in")
                .cssClasses(List.of("red", "blue"))
                .cssClass("green")
                .type("text")
                .name("username")
                .style("color: red;")
                .hidden(true)
                .autoFocus(true)
                .disabled(true)
                .form("my-form")
                .build();

		System.out.println(processor.getMarkup(in));
		
	}

}
```

This would print out the following markup:

```html
<input id="my-in" class="red blue green" style="color: red; display: none;" autofocus disabled form="my-form" name="username" type="text">
```

While this example is visibly a silly use case (why would I need to build the input this way when I could do it faster by directly using HTML), the use of objects to represent HTML elements is the core foundation of Stir and how you would interpolate data into your views. Later on, we’ll see some extra features of Stir which allow you to greatly reduce this verbosity through *element descriptors* and *document templating*.

As we’ll see throughout this guide, Stir is a templating engine perfect for server-side rendering in a Spring project and provides:

1. Representation of HTML elements as objects
2. Document templating
3. Element descriptors (a shortcut to instantiating HTML element objects)
4. Flexibility to build custom components as a class

and more. As we begin to build our to-do application, we’ll start to see most (if not all) of these features in action in a fairly realistic scenario.

### Initializing our To-do Application

To start our application, go to the [Spring initializr](http://start.spring.io). For this project, I selected the following:

- Maven as the build tool
- Java as the language
- The default Spring Boot version
- The project metadata of my choice (i.e., the group id, artifact id, description, and package name)
- Jar as the packaging
- Java version 17

Along with the following dependencies:

- Lombok
- Spring Web
- Rest Repositories
- Spring Data JPA
- H2 Database
- Spring Reactive Web (for the `WebClient` class)

> Note that Stir is built off of Java version 15 so any version lower than that will likely not be compatible.

Then, once the project is built and you set up your preferred coding environment, we need to add the following Maven dependency to integrate Stir into our application:

```xml
<dependency>
    <groupId>io.john-amiscaray.stir</groupId>
    <artifactId>stir</artifactId>
    <version>2.0.0</version>
</dependency>
```

### Project Architecture

To keep things simple and keep the focus on Stir, we’ll try to keep the backend logic as simple as possible. We’ll skip user authentication and user ownership of individual to-dos and model them as a simple REST resource. Thus, we’ll have REST endpoints for our basic CRUD operations like:

1. A `GET /todos` endpoint to retrieve all the to-dos
2. A `GET /todos/{id}` endpoint to retrieve a to-do by id
3. A `DELETE /todos/{id}` endpoint to delete a to-do by id
4. A `POST /todos` endpoint to add a new to-do

and more, all following the REST conventions you’ll see in a typical API. Then, we’ll have view endpoints that consume this REST API and show the appropriate view that we’ll generate via Stir. For this guide, we’ll only implement the views necessary for listing the to-dos, posting new ones, and making minor updates for the sake of time and brevity.

### Building our To-do Database

To begin, we’ll start by creating the to-do hibernate entity:

```java
package io.johnamiscaray.stirtodoapp.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
    private Date dueDate;
    private Boolean isComplete;

    public Todo(String title, String description, Date dueDate, Boolean isComplete) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isComplete = isComplete;
    }

}
```

Then, we'll create our corresponding to-do repository:

```java
package io.johnamiscaray.stirtodoapp.repository;

import io.johnamiscaray.stirtodoapp.entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

}
```

One cool part about Spring (which I honestly just figured out while making this tutorial) is that by adding the rest repositories dependency (which appears in our maven dependencies as `spring-boot-starter-data-rest`), the standard REST endpoints we talked about above get generated for us! You can try it yourself by running the application and using a tool like [Postman]([https://www.postman.com/](https://www.postman.com/)) to send a request to `GET [http://localhost:8080/todos](http://localhost:8080/todos)`, `POST [http://localhost:8080/todos](http://localhost:8080/todos)`, `GET [http://localhost:8080/todos/1](http://localhost:8080/todos/1)`, etc. For this project, however, we need to add some extra configuration for the response payload that gets generated for us. If you try sending the request to `GET [http://localhost:8080/todos](http://localhost:8080/todos)`, you’ll notice a weird format for the response content which will be difficult for us to parse later on. To change the format to something easier for us, we need to create this configuration class:

```java
package io.johnamiscaray.stirtodoapp.config;

import io.johnamiscaray.stirtodoapp.entities.Todo;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class SpringRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.setDefaultMediaType(MediaType.APPLICATION_JSON);
        config.useHalAsDefaultJsonMediaType(false);
        config.exposeIdsFor(Todo.class);
    }

}
```

With that, we’ll end up with a JSON structure for fetching all our to-dos that looks like so:

```json
{
    "links": [
        {
            "rel": "self",
            "href": "http://localhost:8080/todos"
        },
        {
            "rel": "profile",
            "href": "http://localhost:8080/profile/todos"
        }
    ],
    "content": [
        {
            "id": 1,
            "title": "Do homework",
            "description": "AAA midterms",
            "dueDate": "2023-02-27",
            "isComplete": false,
            "content": [],
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/todos/1"
                },
                {
                    "rel": "todo",
                    "href": "http://localhost:8080/todos/1"
                }
            ]
        },
        {
            "id": 2,
            "title": "This is a complete task",
            "description": "Nicely done",
            "dueDate": "2023-05-03",
            "isComplete": true,
            "content": [],
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/todos/2"
                },
                {
                    "rel": "todo",
                    "href": "http://localhost:8080/todos/2"
                }
            ]
        }
    ],
    "page": {
        "size": 20,
        "totalElements": 2,
        "totalPages": 1,
        "number": 0
    }
}
```

### Building our View Controller

Now that we have our REST API created for managing our to-do database, let’s start making a controller for the to-do views. To begin, we’ll build a page for submitting new to-dos so we can build up our database before we can start viewing them. 

The approach I’ll take to building this view is to start with a less ideal solution just to show you some of the foundations of Stir and start to improve upon it incrementally. This way, you’ll get a more holistic understanding of what Stir is capable of and see how I’d recommend you use the framework.

To start, let’s set up the controller class for our views:

```java
package io.johnamiscaray.stirtodoapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequestMapping("/views/todo")
public class ViewController {

    private WebClient client = WebClient.create("http://localhost:8080");

}
```

In the class declaration, we specified the root URL for this controller as `/views/todo`. You’ll also notice that we annotated the class with `@RestController` instead of the usual `@Controller` you see when creating view endpoints. 

Instead of returning the name of a page in our resources folder as you would traditionally do with Spring, Stir will generate a raw HTML string for us that we need to return in our endpoints. Thus, with `@RestController`, we’re specifying that our request mapping methods will return a response body rather than a page name. Finally, we created a `WebClient` instance for sending HTTP requests to our API at `localhost:8080`.  

With that, I’ll jump straight in and show you how we could build this endpoint and generate the view using Stir:

```java
package io.johnamiscaray.stirtodoapp.controllers;

import io.john.amiscaray.stir.domain.HTMLDocument;
import io.john.amiscaray.stir.domain.elements.*;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequestMapping("/views/todo")
public class ViewController {

    private WebClient client = WebClient.create("http://localhost:8080");

    @GetMapping(value="/new", produces= MediaType.TEXT_HTML_VALUE)
    public String postTodoPage(){

        HTMLDocument doc = HTMLDocument.builder()
                .element(Header.builder()
                        .child(new Heading(1, "Create New Todo"))
                        .build())
                .element(Form.builder()
                        .id("todo-form")
                        .field(Input.builder()
                                .name("title")
                                .type("text")
                                .build())
                        .field(Input.builder()
                                .name("description")
                                .type("text")
                                .build())
                        .field(Input.builder()
                                .type("date")
                                .name("dueDate")
                                .build())
                        .field(Input.builder()
                                .type("submit")
                                .value("Save To-do")
                                .build())
                        .build())
                .headerScript(Script.builder()
                        .src("https://code.jquery.com/jquery-3.6.3.min.js")
                        .integrity("sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=")
                        .crossOrigin("anonymous")
                        .build())
                .footerScript(new Script("/post-todo.js"))
                .withBootStrap(true)
                .linkedStyle(new LinkedStyle("/styles.css"))
                .build();

        return doc.generateDocumentString();

    }

}
```

Let’s first break down the annotations on our method. With the `@GetMapping` annotation, our value parameter maps the URL this method corresponds to (i.e., `"/new"`). But since we have the `@RequestMapping("/views/todo)` line on our controller, the `"/new"` route will be under the `"/views/todo"` route for a URL of `"http://localhost:8080/views/todo/new"`. We also have the `produces` argument to specify that our endpoint is returning raw HTML.

Regarding the HTML generation itself using Stir, we’re just building a ton of simple objects using [builders](https://refactoring.guru/design-patterns/builder) or constructors. Stir defines a ton of simple classes each representing different HTML elements that it will convert to HTML code. The classes hold fields that represent things like HTML attributes, inner text content, and child elements. Using instances of these classes, we can add them to an HTML document using the `HTMLDocument` builder’s `element` method. Elements passed to this method are added within the HTML body in a first-in-first-out order. 

In the above code, we pass a `Header` object and then a `Form` object to the `element` function. Thus, because we ordered it in this way, the header object appears first in the HTML body. You’ll also notice that we called a `child` method of the `Header` builder with a `Heading` instance. Here, we’re instantiating a heading of level 1 (h1) with the content *”Create New Todo”* and adding it as a child element of the `Header` instance. Similarly, with the `Form` builder, we added child `Input` instances using our call to the `field` method.

You’ll also see in the code calls to other functions like `headerScript`, `footerScript`, `linkedStyle`, etc. With the `headerScript` function, we’re adding a script tag to the `head` tag of the HTML document. Similarly, the `footerScript` function adds a script tag to the bottom of the HTML’s `body` tag, and the `linkedStyle` function adds a `link` tag to link a stylesheet. In our example, we’re linking to the following `post-todo.js` file located in the `/resources/static` folder:

```javascript
// Get our form element
let form = $('#todo-form');

// On submit...
form.submit(e => {
    e.preventDefault();
		// Extract the form input into an object called "body"
    let body = {};
    let nameValueArray = form.serializeArray();
    for(let nameValue of nameValueArray){
        body[nameValue.name] = nameValue.value;
    }
    body['isComplete'] = false;
		// Send a POST request to /todos to save the new to-do
    fetch('/todos', {
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(_ => {
        alert("Successfully saved the to-do");
    });
});
```

As well as this `styles.css` file in the same folder:

```css
:root {

    text-align: center;

}

form {

    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 50px auto;
    width: 250px;

}
```

Lastly, you’ll notice a call to `withBootStrap` with an argument of `true`. This adds the necessary style and script to integrate bootstrap on our page.

### Simplifying using Document Templating

With that, let’s see how we can simplify this solution further using Stir’s document templating:

```java
package io.johnamiscaray.stirtodoapp.controllers;

import io.john.amiscaray.stir.domain.HTMLDocument;
import io.john.amiscaray.stir.domain.elements.*;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequestMapping("/views/todo")
public class ViewController {

    private WebClient client = WebClient.create("http://localhost:8080");

    @GetMapping(value="/new", produces= MediaType.TEXT_HTML_VALUE)
    public String postTodoPage(){
        
        HTMLDocument doc = HTMLDocument.builder()
                .title("Create New Todo")
                .format("""
                        <h1><& str_title &></h1>
                        <form id="todo-form">
                            <input name="title" type="text">
                            <input name="description" type="text">
                            <input name="dueDate" type="date">
                            <input type="submit" value="Save To-do">
                        </form>
                        """)
                .headerScript(Script.builder()
                        .src("https://code.jquery.com/jquery-3.6.3.min.js")
                        .integrity("sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=")
                        .crossOrigin("anonymous")
                        .build())
                .footerScript(new Script("/post-todo.js"))
                .isFormatForBody(true)
                .withBootStrap(true)
                .linkedStyle(new LinkedStyle("/styles.css"))
                .build();
        
        return doc.generateDocumentString();

    }

}
```

Here, we’re using our own template for the HTML body using custom markup within a [text block](https://www.baeldung.com/java-multiline-string) (delimited with `"""`). You’ll also see further down we have a call to `isFormatForBody` with an argument of true. This specifies that the format we pass to the `format` method is for the inner content of the HTML body. Otherwise, Stir will assume the format is for the entire HTML page. The content surrounding the HTML body will then be handled by Stir. Within the HTML body, you’ll notice a peculiar syntax within the `h1` element: `<& str_title &>`. 

In Stir’s document templating, content surrounded by `<&` and `&>` is read by the templating engine as particular keywords representing content passed in the builder, or element descriptors (something we’ll cover soon). These are known as *templating blocks*. **In our example, we use the keyword `str_title` to denote the title we passed in the `title` method. This title will also be used as the title in the HTML meta in the header. For a complete list of all the Stir keywords for use in a templating block, refer to [this section of the documentation](https://www.baeldung.com/java-multiline-string).

### Simplifying Further With Element Descriptors

From here, we have the option to simplify this code even further with element descriptors:

```java
package io.johnamiscaray.stirtodoapp.controllers;

import io.john.amiscaray.stir.domain.HTMLDocument;
import io.john.amiscaray.stir.domain.elements.*;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import static io.john.amiscaray.stir.util.ElementDescriptorProcessor.element;

@RestController
@RequestMapping("/views/todo")
public class ViewController {

    private WebClient client = WebClient.create("http://localhost:8080");

		@GetMapping(value="/new", produces= MediaType.TEXT_HTML_VALUE)
        public String postTodoPage(){

        HTMLDocument doc = HTMLDocument.builder()
                .title("Create New Todo")
                .format("""
                        <h1><& str_title &></h1>
                        <&
                            element(form#todo-form{input[name='title',type='text'],input[name='description',type='text'],input[name='dueDate',type='date'],input[type='submit',value='Save To-do']})
                        &>
                        """)
                .headerScript((Script) element("script[src='https://code.jquery.com/jquery-3.6.3.min.js',integrity='sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=',crossOrigin='anonymous']"))
                .footerScript((Script) element("script[src='/post-todo.js']"))
                .isFormatForBody(true)
                .withBootStrap(true)
                .linkedStyle(new LinkedStyle("/styles.css"))
                .build();

        return doc.generateDocumentString();

    }

}
```

Stir provides a simple language called *element descriptors* which is used to generate markup using a syntax similar to CSS selectors. Behind the scenes, Stir uses some string processing and [Java reflection](https://www.oracle.com/technical-resources/articles/java/javareflection.html) magic to interpret your element descriptor and instantiate the appropriate element your descriptor describes. This can be done using the static `element` function in the `ElementDescriptorProcessor` class. 

Syntactically, you’ll notice that element descriptors look similar to CSS selectors in a way. It starts with the tag name, followed by an optional id starting with a `#`, and zero or more CSS classes each starting with a `.`. Following that, you can optionally include an *attribute selector* enclosed in square brackets. This describes the HTML attributes of the element as comma-separated key-value pairs following this syntax: `key='value'`. Following that, you may have an *inner content descriptor* enclosed in brackets followed by single quotes. This allows you to set the inner text content of applicable elements. From there, we can have a *child descriptor* (enclosed in curly braces) which is a comma-separated list of nested element descriptors representing the inner children of the HTML element you’re instantiating. For more details on the element descriptor syntax, check out the [v0.5.0 release notes](https://github.com/john-amiscaray/Stir/releases/tag/v0.5.0).

You’ll also notice that we use the element descriptor syntax within a templating block in our document template. As you might expect, Stir processes the element descriptor in the templating block, instantiating the corresponding object, then placing its corresponding markup in the template. Thus, with element descriptors, we can simplify writing a good amount of HTML markup.

### Building Our To-do List View

Now that we have a view to add to-do items, let’s go ahead and create a view to list out our to-dos in a table:

```java
@GetMapping(value="/all", produces=MediaType.TEXT_HTML_VALUE)
public String getAllTodos(){

	// Sends a GET request to retrieve all our todos
    PagedModel<Todo> todoPagedModel = client.get()
            .uri("todos")
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<PagedModel<Todo>>(){}).block();

    Collection<Todo> todos = todoPagedModel != null ? todoPagedModel.getContent() : List.of();

    HTMLDocument document = HTMLDocument.builder()
            .element(new Table(todos, Todo.class))
            .build();

    return document.generateDocumentString();

}
```

With that, we’ll generate a simple HTML page with a table that looks like this:

![Stir Generated Table](/engineering-education/stir-framework-in-action-in-a-spring-web-app/stir-table.png)

As you can see, Stir can look through the fields of our `Todo` class, extract the names as table headers, then put the values of the fields of each object in the cells of the table. The question you may be asking at this point is: how can I change the names of the table headers to a nicer format? Stir provides annotations to fix this exact problem. Let’s go back and annotate our `Todo` entity with these annotations:

```java
package io.johnamiscaray.stirtodoapp.entities;

import io.john.amiscaray.stir.annotation.TableData;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @TableData(columnName = "ID")
    private Long id;
    @TableData(columnName = "Title")
    private String title;
    @TableData(columnName = "Description")
    private String description;
    @TableData(columnName = "Due Date")
    private Date dueDate;
	@TableData(columnName = "Is Complete")
	private Boolean isComplete;

    public Todo(String title, String description, Date dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }

}
```

With that, it should now title our table columns more nicely:

![Stir Table With Custom Column Names](/engineering-education/stir-framework-in-action-in-a-spring-web-app/stir-table-pretty.png)

If we wanted to remove the `id` attribute from the table display, we would use the `@TableIgnore` annotation added to version 1.2.0:

```java
package io.johnamiscaray.stirtodoapp.entities;

import io.john.amiscaray.stir.annotation.TableData;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @TableIgnore
    private Long id;
    @TableData(columnName = "Title")
    private String title;
    @TableData(columnName = "Description")
    private String description;
    @TableData(columnName = "Due Date")
    private Date dueDate;
	@TableData(columnName = "Is Complete")
	private Boolean isComplete;

    public Todo(String title, String description, Date dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }

}
```

Keep in mind however that it would be best practice to make a separate class for how we represent to-do items in a view. This way, we can separate it from how we represent it in the database. Using this `Todo` class for both database operations and the views can be messy and potentially lead to problems in the future. We’ll address this problem in the next section…

### Building a To-do Component

Displaying our to-do items on a table like this isn’t the best if you ask me. Let’s try to change it up a bit while showing you how you could make a class for a reusable UI component. Let’s start by removing the `@TableData` annotations from our `Todo` class above. We won’t need that at this point because we’ll be creating a separate class to represent an HTML component for our to-dos. 

To build our class, first, we need to understand how Stir recognizes a class as an HTML element. Any class that represents an HTML element to Stir must inherit from the `AbstractUIElement` class. This adds fields for HTML IDs, CSS classes, and inline styles. Additionally, it gives us a `hidden` field to hide a given element and inherits from a class that implements caching features if we need them. In our case, however, the caching isn’t necessary since we are building the `AbstractUIElement` for every request and won’t reuse the objects afterward. The caching is only useful when we need to use the markup from an object multiple times (you can read more about Stir’s caching [here](https://github.com/john-amiscaray/Stir#caching-support)). Outside of that, we also need to add an `HTMLElement` annotation to pass info regarding the HTML element’s tag name or if the element needs a closing tag. By default, it will assume the element needs a closing tag so the only argument we need to pass to it is a tag name. Thus, our bare-bones class without any fields or methods would look like this:

```java
package io.johnamiscaray.stirtodoapp.views;

import io.john.amiscaray.stir.annotation.HTMLElement;
import io.john.amiscaray.stir.domain.elements.AbstractUIElement;

@HTMLElement(tagName = "div")
public class TodoView extends AbstractUIElement {

}
```

Here, our `TodoView` class will represent a div element that contains info on a given to-do item. Within the div, we can add an inner header element and a paragraph element that will display the info about our to-dos:

```java
package io.johnamiscaray.stirtodoapp.views;

import io.john.amiscaray.stir.annotation.HTMLElement;
import io.john.amiscaray.stir.annotation.Nested;
import io.john.amiscaray.stir.domain.elements.AbstractUIElement;
import io.john.amiscaray.stir.domain.elements.Header;
import io.john.amiscaray.stir.domain.elements.Paragraph;

@HTMLElement(tagName = "div")
public class TodoView extends AbstractUIElement {

		// @Nested specifies that the field is a nested HTML element in the element that the class represents
    @Nested
    private Header header;

    @Nested
    private Paragraph textContent;

}
```

From there, we can add a constructor to populate the nested elements and style them:

```java
package io.johnamiscaray.stirtodoapp.views;

import io.john.amiscaray.stir.annotation.HTMLElement;
import io.john.amiscaray.stir.annotation.Nested;
import io.john.amiscaray.stir.domain.elements.AbstractUIElement;
import io.john.amiscaray.stir.domain.elements.Header;
import io.john.amiscaray.stir.domain.elements.Heading;
import io.john.amiscaray.stir.domain.elements.Paragraph;
import io.johnamiscaray.stirtodoapp.entities.Todo;

import java.util.List;

@HTMLElement(tagName = "div")
public class TodoView extends AbstractUIElement {

    // @Nested specifies that the field is a nested HTML element in the element that the class represents
    @Nested
    private Header header;

    @Nested
    private Paragraph innerContent;

    public TodoView(Todo todo) {
        // Adds a CSS class
        addClass("todo-component");
        header = Header.builder()
                .child(new Heading(1, todo.getTitle()))
                .child(new Paragraph(todo.getDescription()))
                .cssClass("todo-header")
                .build();
        innerContent = new Paragraph("Due: " + todo.getDueDate().toLocalDate().toString());
				// If the to-do is complete, add the todo-complete class
        if(todo.getIsComplete()){
            addClass("todo-complete");
        }
    }

}
```

From there, we’ll update our `styles.css` by adding these styles:

```css
:root {

    text-align: center;

}

form {

    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 50px auto;
    width: 250px;

}

.todo-component {
    width: 50%;
    text-align: center;
    margin: 0 auto 20px;
    border-radius: 2px;
    background-color: lightblue;
    padding: 10px;
    font-family: Tahoma, 'sans-serif';
}

.todo-header h1 {

    margin: 0;

}

.todo-complete {

    text-decoration: line-through;
    opacity: 0.4;

}
```

and update the code for our endpoint appropriately:

```java
@GetMapping(value="/all", produces=MediaType.TEXT_HTML_VALUE)
public String getAllTodos(){

    PagedModel<Todo> todoPagedModel = client.get()
            .uri("todos")
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<PagedModel<Todo>>(){}).block();

    Collection<Todo> todos = todoPagedModel != null ? todoPagedModel.getContent() : List.of();

		// Pass each Todo to the constructor of TodoView (if the id is not null), collecting each into a new List
    List<TodoView> todoViews = todos.stream()
            .filter(todo -> todo.getId() != null)
            .map(TodoView::new)
            .collect(Collectors.toList());

    HTMLDocument document = HTMLDocument.builder()
            .elements(todoViews)
            .linkedStyle(new LinkedStyle("/styles.css"))
            .headerScript((Script) element("script[src='https://code.jquery.com/jquery-3.6.3.min.js',integrity='sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=',crossOrigin='anonymous']"))
            .footerScript(new Script("/todo-view.js"))
            .build();

    return document.generateDocumentString();

}
```

After adding a couple of to-do items (whether you’re using our view or an API call with Postman), we’ll see a page that looks like this:

![Stir To-do List](/engineering-education/stir-framework-in-action-in-a-spring-web-app/todo-items.png)

While this may not look much nicer than the table (excuse my lack of design skills) we were able to leverage Stir to dynamically generate this content on the server. 

To recap, we added the title of the given to-do and its description in the component’s header, the due date in a paragraph below, custom styling for if it’s completed, and generated one component per to-do item.

### Updating the Completion Of Our To-dos

Now, let’s add some functionality to update the completion status of our to-dos. Within our `TodoView`, we’ll add a checkbox field to toggle the completion status of our to-dos:

```java
package io.johnamiscaray.stirtodoapp.views;

import io.john.amiscaray.stir.annotation.HTMLElement;
import io.john.amiscaray.stir.annotation.Nested;
import io.john.amiscaray.stir.domain.elements.*;
import io.johnamiscaray.stirtodoapp.entities.Todo;

@HTMLElement(tagName = "div")
public class TodoView extends AbstractUIElement {

    // @Nested specifies that the field is a nested HTML element in the element that the class represents
    @Nested
    private Header header;

    @Nested
    private Paragraph innerContent;

    @Nested
    private final Input completedInput;

    public TodoView(Todo todo) {
        // Set the HTML ID
        id = "todo-" + todo.getId();
        // Adds a CSS class
        addClass("todo-component");
        header = Header.builder()
                .child(new Heading(1, todo.getTitle()))
                .child(new Paragraph(todo.getDescription()))
                .cssClass("todo-header")
                .build();

        Input.InputBuilder builder = Input.builder()
                .type("checkbox")
                .label("Complete")
                .id("complete-" + todo.getId())
                .cssClass("toggle-complete")
                .customAttribute("data-todo-id", todo.getId().toString());

        if(todo.getIsComplete()){
            builder.customAttribute("checked", "true");
        }

        completedInput = builder.build();

        innerContent = new Paragraph("Due: " + todo.getDueDate().toLocalDate().toString());
        // If the to-do is complete, add the todo-complete class
        if(todo.getIsComplete()){
            addClass("todo-complete");
        }
    }

}
```

Here, we’re making use of the `Input.Builder.customAttribute` method by passing in an attribute name (`data-todo-id`) and an attribute value of the id of the to-do. We’ll go ahead and make use of it in a new `todo-view.js` file:

```javascript
$('.toggle-complete').on('change', function (e) {
    let todoId = $(this).data("todo-id");
    let checked = $(this).prop("checked");
    if(checked){
        $(`#todo-${todoId}`).addClass("todo-complete");
    }else {
        $(`#todo-${todoId}`).removeClass("todo-complete");
    }
    // Send a request to our API at PATCH /todos/todoId to update the completion status
    fetch(`/todos/${todoId}`, {
        method: 'PATCH',
        mode: 'same-origin',
        body: JSON.stringify({
            isComplete: checked
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => console.log(response));
});
```

Here, we’re leveraging jquery’s `data` method to extract the value of our custom `data-todo-id` attribute using the call to `$(this).data("todo-id")` (here the `this` keyword refers to the element we queried for). From there, we check the completion status of the to-do based on whether the HTML checked property on our checkbox is true. Using this info, we query for the to-do component (whose id we set in the form of `#todo-{todoId}`) and toggle the `todo-complete` CSS class.

### Conclusion
In this tutorial, we covered all the functionality of a simple Stir to-do app that I wanted to cover in this guide. In the process, we learned about Stir’s representation of HTML elements as objects, document templating, element descriptors, table generation, and custom components. 

With that, you should now be ready to use Stir in your next backend project! As an exercise to deepen your understanding, try fully fleshing out the project yourself from [the final code](https://github.com/john-amiscaray/StirExamples). Also, feel free to request new features or file bug reports in [Stir's GitHub repository](https://github.com/john-amiscaray/Stir) which I will be maintaining.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
---
layout: engineering-education
status: publish
published: true
url: /working-with-images-in-spring-boot/
title: Working with Images in a Spring Boot Backend (Kotlin)
description: A beginner's guide on how to save and transfer images via a Spring Boot backend. This tutorial goes through saving images to a database, transferring them via REST, and configuring CORS.
author: john-amiscaray
date: 2021-06-26T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/working-with-images-in-spring-boot/hero.png
    alt: Working with Images in Springboot example image
---
Image files are a pretty important part of the web. Imagine a world without profile pictures, posts on social media, or most importantly, cat gifs. Being able to dynamically save and place images is a pretty big deal yet something a lot of us take for granted.
<!--more-->
### Introduction
Spring Boot makes it easy to save images and transfer them via REST endpoints. In this guide, we will go over how to do this in Kotlin. By the end of this tutorial, you will be able to do so on your own and understand the theory behind this.

### Prerequisites
For this guide, it would be best to start with some of the fundamentals of Spring Boot. This includes [creating simple REST APIs](https://spring.io/guides/gs/rest-service/), [Spring Data](https://www.section.io/engineering-education/introduction-spring-data/), and common design patterns. I’m also trying something different using Kotlin as example code for this guide. It will help to have a basic understanding of Kotlin but you should still be able to follow along as a pure Java developer.

Client-side, you should know basic JavaScript, the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), and [arrow functions](https://www.w3schools.com/js/js_arrow_function.asp). Of course, the fetch API also makes use of [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) but you will be fine if you don't know much about them. Additionally, you should understand the typical flow between web clients and servers through HTTP.

### Setting up our project
To start our project, we of course begin from the [Spring Initializer](https://start.spring.io/). For my project, I selected Java 11 although I don’t believe that the Java version should matter here. I set the language to Kotlin, the dependency manager to Maven, and the packaging to _jar_. Then of course you need to configure your package name, [group and artifact ids](https://www.baeldung.com/maven#introduction-3), the name and description of your project.

From there, we select the _spring-boot-starter-web_ and _spring-boot-starter-data-jpa_ dependencies. Along with this, you will need the dependency for your database of choice. We won’t go over configuring your database in the `application.properties` file to allow you to use whatever database you want. Just make sure you have set the following properties in your `application.properties` file and that they match with your database:

- spring.datasource.username
- spring.datasource.password
- spring.datasource.driver-class-name
- spring.datasource.url

In our case, however, we will be using a SQL database. Using a no-SQL database would change things here since we are making use of the hibernate annotations for SQL databases. In case you don’t know, hibernate is included in Spring Data and allows you to generate database tables from classes.

For the client, we will be using vanilla JavaScript. The same concepts should also apply if you want to use a framework.

### Step 1: Creating a database entity
First, let’s create an entity that will store images. As an example, we will be creating a dummy `User` entity that will have a profile picture property. For this guide, we will just save a sample user into the table and update that user’s profile picture.The code for the entity should look like this:

```kotlin
import javax.persistence.*

@Entity
data class User(
    // auto-generate the user’s id
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long,

    // the database column is not nullable, has a max length of 30 characters, is called “username”, and must be unique across all entries
    @Column(nullable = false, length = 30, name = "username", unique = true)
    var username: String,
    // the database column is not nullable and has a name of “password”
    @Column(nullable = false, name = "password")
    var password: String,

    // the database column is called "profile_picture" and it has a type of BLOB
    @Lob
    @Column(name="profile_picture")
    var profilePicture: ByteArray

)
```

Notice that we save the profile picture as a `ByteArray` and it is annotated with `@Lob`. This is how we tell hibernate to have our table store this field as a Binary Large Object (BLOB). This byte data would be for an image and could be converted back to an actual image file. Next up, you need to create a matching JpaRepository to query this table:

```kotlin
@Repository
interface UserRepo : JpaRepository<User, Long>
```

### Step 2: Creating a service and REST endpoints
Now, let’s create a simple service to retrieve and update a user’s profile picture:

```kotlin
@Service
class UserService(private val userRepo: UserRepo) {

    fun setProfilePicture(id: Long, file: MultipartFile){
        val user : User = userRepo.findById(id).orElseThrow()
        user.profilePicture = file.bytes
        userRepo.save(user)
    }

    fun getProfilePicture(id: Long): ByteArray{
        val user: User = userRepo.findById(id).orElseThrow()
        return user.profilePicture
    }

}
```

Notice how the `setProfilePicture` method takes in a `MultipartFile` object. This is how Spring will represent the image data sent from the client via our REST controller. Using that object we take its byte data through the bytes property.

Now that we have that service created, we can start making REST endpoints to expose it. Let’s start with an endpoint for setting the profile picture:

```kotlin
@RestController
class UserController(private val userService: UserService) {

    @PostMapping(value= ["/api/user/{userId}/profile-picture"], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun setProfilePicture(@PathVariable("userId") id: Long, @RequestParam file: MultipartFile): ResponseEntity<Void>{
        return try {
                userService.setProfilePicture(id, file)
                ResponseEntity
                    .created(URI("/api/user/${id}/profile-picture"))
                    .build()
            } catch(error: NoSuchElementException){
                ResponseEntity
                    .notFound()
                    .build()
            }
    }

}
```

For our URL, we have a [path variable](https://www.baeldung.com/spring-pathvariable) which we use to get the user’s id to retrieve their database entry. This path variable is labeled as _userId_ in the URL and is passed as a `Long` argument. For this guide, I hardcoded a user into our database with an id of 1 whose profile picture we will change.

The _consumes_ argument for the `@PostMapping` annotation defines the type of data our endpoint will take. In this case, we are consuming a media type of _multipart form data_. With multipart form data, the client sends byte data representing a form. Each field in the form is separated by a special delimiter that is specified in the request’s _content-type_ header. So in our case, the client will send the file as form data and our server will parse it as a `MultipartFile` object. As the `@RequestParam` annotation suggests, we retrieve it from the request as a request parameter.

In the body of the method, we first try to return a `ResponseEntity` containing the URL where the client can access the profile picture from our server. If a `NoSuchElementException` was thrown by our service (if we could not find the user with that id), then we give back a 404 response.

Now let’s make that REST endpoint where the client can access their profile picture:

```kotlin
@GetMapping("/api/user/{userId}/profile-picture")
fun getProfilePicture(@PathVariable("userId") id: Long): ResponseEntity<Any>{

  return try {
      val image: ByteArray = userService.getProfilePicture(id)

      ResponseEntity.ok()
        .contentType(MediaType.parseMediaType(MediaType.IMAGE_JPEG_VALUE))
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"${System.currentTimeMillis()}\"")
        .body(image)

      } catch(error: NoSuchElementException){
          ResponseEntity
            .notFound()
            .build()
      }

}
```

Here, we retrieve the user based on their id within the URL like last time. If the user does not exist, i.e, the service throws a `NoSuchElementException`, then we return a 404 response. Otherwise, we get the bytes representing the profile picture and try to return it to the client as a JPEG image. We do this by creating a new `ResponseEntity` with a status of _ok_ and a content type of image/jpeg. The body of this `ResponseEntity` is the byte array of our image.

Finally, we set the content-disposition header to tell the client that our response is an attachment. We also specify in that header the name of the attachment which in this case is the current time.

### Step 3: Creating a Client
Now let’s start creating a client to test this Spring Boot application out. Begin by creating a simple HTML page where a user can select an image to save:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <img alt="your-image" id="your-image">
    <input id="image-to-save" type="file" accept="image/*">
    <script src="main.js"></script>
</body>
</html>
```

Note, we have an image tag on the page which we will later use to display the image from our backend. This is why it doesn’t have an `src` attribute; it will be added dynamically within our `main.js` file.

Let’s have a look at what we will do in the `main.js` file to retrieve and save an image. Inside the JavaScript file, we will create an event listener for when the file input’s value changes. This will send a POST request to the server with the image so we can save it. When the response comes back with the image URL, we will display the image on our image element:

```JavaScript
document.getElementById('image-to-save').addEventListener('change', saveImage);

function saveImage(e){

  let file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);

  fetch("http://localhost:8080/api/user/1/profile-picture", {
      method: 'POST',
      body: formData
  }).then(data => {
      document.getElementById("your-image").src = data.url + '?t=' + new Date().getTime();
  });

}
```

First, we take the file from our event object and store it in a `FormData` object. Then, using the fetch API, we send a post request to the appropriate endpoint with our form data. Using the promise the method returns, we give a callback for when our response arrives. This callback sets the `src` attribute for our image so that we can display it on the screen. Recall that our endpoint for setting profile pictures sends back the URL where the client can access the image.

One point of interest here is that we do not manually set the content-type header. This is because the browser will handle converting our `FormData` object into multipart form data with a random delimiter. After doing so, the browser will set the header for us with the appropriate value.

Note that we add a [query parameter](https://branch.io/glossary/query-parameters/) at the end of the URL for the current time. The reason we do this is to force the browser to refresh every time the response comes back. This is because the images are always from the same endpoint _http://localhost:8080/api/user/1/profile-picture_. The browser won’t know that the resource from that URL changes after we send a request to do so. Adding the query parameter at the end changes the URL whenever the response comes back forcing the browser to refresh the image. It’s perfectly valid to place this query parameter at the end of the URL even though we never parse nor mention it server-side.

### Step 4: Configuring CORS

If you were to run this example with the code so far, you should have seen an error that looks like this:

![sample cors error](/engineering-education/working-with-images-in-spring-boot/sample-cors-error.png)

This is a common problem that many, including myself, have faced as a new developer. This is because we haven’t configured the proper CORS (cross-origin resource sharing) settings. By default, our browser doesn’t allow us to take resources (i.e. images) from another origin (webserver). This is what is meant by the _Same Origin Policy_ above. Thankfully, Spring makes it fairly straightforward to configure CORS. We only need to configure a bean of type `WebMvcConfigurer`. This bean will contain a method that configures the CORS settings:

```kotlin
@Bean
fun cors(): WebMvcConfigurer{

  return object : WebMvcConfigurer{
      override fun addCorsMappings(registry: CorsRegistry) {
        // Allow our client (on localhost:63343) to take resources from our backend
        registry.addMapping("/**").allowedOrigins("http://localhost:63343")
      }
  }

}
```

What this override does is it configures our server to allow our client to take any resources from any URL from our back-end. This should set the ‘Access-Control-Allow-Origin’ response header as mentioned in the image above. The header should have a value with the URL of the client to signify that they are allowed to take resources from our server. With that small change, our simple application should work now.

### Conclusion

In this guide, we went through the basics of working with images in a Spring Boot application. We first learned how to save an image to a SQL database and how to transfer them via REST endpoints. Then we configured a client to consume our REST endpoints and CORS settings to allow for resource sharing. With this knowledge, you should be able to start doing some cool things with images in a full-stack application. As a final note: refer to [this GitHub repository](https://github.com/john-amiscaray/working-with-images-in-spring-boot-kotlin) for all the code written in this guide.

---

Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)

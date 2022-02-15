In most cases, when building APIs with languages such as Typescript, developers use open-source libraries and frameworks such as Express.js, CORS, etc. These libraries are readily available in the NPM registry.

Whenever you use such packages, there is a lot of abstraction as you don't utilize the core functionalities of Typescript code. Your application's low-level logic Typescript code is hidden from you as these packages process and execute vanilla Typescript behind the scenes of your application. This guide will help the reader build RESTful APIs with Typescript without any frameworks (only using the native modules).

### Requirements

- Node.js installed on our computer.
- Fundamental knowledge of how to [write Typescript code](/engineering-education/a-friendly-beginner-guide-to-typescript/).
- How to use [Typescript with Node.js](/engineering-education/how-to-use-typescript-with-nodejs/).

### Running Typescript with Node.js

To run Typescript on a server, you need to have a working Node.js setup. Go ahead and start your project using `npm init -y` to start a Node.js project. Once that's done, Proceed and install the Typescript package using `npm i typescript` and Typescript runtime package using `npm i ts-node`. To initialize Typescript within your Node.js project, run `tsc --init`. This will create `tsconfig.json` that allows your application to execute Typescript code.

Your Typescript is set and ready. Let's build an API using this setup. Let's create a basic movie API example.

### Create a movie interface

Typescript uses [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) to define classes. A class acts as a blueprint for an object. A Typescript interface act as a blueprint for creating classes. An interface lets you define the data structures of your application. This describes the shape of your data object structures. For example, using the movie's scenario, a single movie will have a title that describes that movie. This will also require you to specify the type of data the title takes, such as number, string, etc.

Head over to your project directory and create an `IMovie.ts` file to create an interface. Then use the keyword `interface` followed by your interface name, as shown below.

```ts
interface MovieInterface {
}
```

The add properties that define the shape of the object as shown below;

```ts
interface MovieInterface {
  movie_title: string;
  year_of_release: number;
  genre: string;
  rating: number;
  getMovie();
}

export { MovieInterface }
```

The above code block also defines the `getMovie()` that you will use to fetch the movies data associated with these defined properties. Also, export the interface `MovieInterface` to access it within your project.

Any object that doesn't have this described structure is rendered incompatible. The consumers of this interface must implement these properties.

This becomes quite useful when you have multiple teams working on a very large project. If someone decides to name things differently or forget something, the application will adhere to the set properties. The properties named differently will automatically become incompatible with the set object. This helps you avoid some code errors around your teams.

Therefore, it makes sense to have a common description of the specific properties of a movie.

### Create a movie class

As described above, a class acts as a blueprint for an object. The object is now created in the above step. Let's now set up a class that describes its blueprint.

First, create a new file and call it `movie.ts`, then follow the following steps;

- Create a `Movie` class;

One of the important use cases where an interface is really useful is when setting up a class. This sets the compatibility of your data. A class basically has the same properties as the `interface` at any given time. If all the required properties are not set, the whole data set becomes incompatible. Below is how the class `Movie` will be set based on the interface `MovieInterface`.

```ts
class Movie {
  movie_title: string;
  year_of_release: number;
  genre: string;
  rating: number;
```

- Create a constructor;

A class goes hand in hand with a constructor. A constructor is commonly referred to as a special method that has the same name as the class. In Typescript, a constructor is a special function with the keyword `constructor`. It constructs/initializes the object before it gets assigned to its methods. Below is the constructor function that will apply to set objects.

```ts
constructor(movie_title: string, year_of_release: number, genre: string, rating: number) {
    this.movie_title = movie_title;
    this.year_of_release = year_of_release;
    this.genre = genre;
    this.rating = rating;
}
```

- Create a method;

A method gets assigned to the initialized constructor. Here you will create a method `getMovie()` that gets a movie. The methods body specifies the properties you want to want access. These are the properties of the class on which you're running this method. In simple terms, the `getMovie()` method runs an instance of the class `Movie`. Below is how to set up this method.

```ts
getMovie() {
    return {
        title: this.movie_title,
        year_of_release: this.year_of_release,
        genre: this.genre,
        rating: this.rating
    }
}
}
```

Finally, export your class to access it within your application.

```ts
export { Movie }
```

### Setting up the movie server

Let's now set up a server that will consume the information set above. The server runs on the barebones of the HHTP module. Thus, you won't have any third-party libraries such as Express. Follow these steps to create the movie API.

Create an `index.ts` file at the root directory of your project.

- import the `MovieInterface` and the class `Movie`;

```ts
import { Movie } from "./Movie"
import { MovieInterface } from "./MovieInterface"
```

To use the interface and the class you have set, import them so that you can use them in your `index.ts` file. To import a file, you must have specified the `export` as you did inside the `IMovie.ts` and `Movie.ts` files.

- Add the HTTP module and a port number

```ts
const http = require("http");
const port = 4000;
```

This will make the necessary functions available to set up a server. Th port number will define the port where the server will run on the localhost.

- Set a movie service

```ts
class MovieService {
  returnMovieAsJsonStringify() {
    const movie: MovieInterface = new Movie(
      "The Guilty", 2021, "Thriller", 7.8
    );
    return JSON.stringify(movie.getMovie());
  }
}
```

The class `MovieService` will access the `MovieInterface` and set the details of a new movie based on the properties that the class `Movie` defined.

- Set up the server route
  
This server exposes this details movie. Thus go ahead a create a route that will be executed on the server.

```ts
const requestListener = (req: any, res: any) => {
  res.setHeader("Content-Type", "application/json");
  switch (req.url) {
    case "/movies":
      res.writeHead(200);
      const movieService = new MovieService();
      res.end(movieService.returnMovieAsJsonStringify());
      break;
    default: res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
};
```

This creates a basic route that will get the response on the new movie on the browser. The API will expose the set movies and return the JSON format of the exposed details. Also, if you execute a non-defined route, let the server return an error message to the executed endpoint.

- Expose the server

To run the server, expose it to the set route and run it on the localhost.

```ts
const server = http.createServer(requestListener);
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

### Testing the API

The API is ready and can be tested to verify if everything works correctly. This server runs on Typescript. To execute its code, use the installed `ts-node` library. To set it up. Head over to your `package.json` file and edit the script tags as shown below;

```bash
"scripts": {
    "start": "ts-node ./index.ts"
},
```

Now run the following NPM command to start your Typescript server.

```bash
npm start.
```

Once the server is up and running, open `http://localhost:4000/movies` on the browser and your movie will be served by the API.

### Conclusion

This guide helped you create a basic web based API. It runs with Typescript only using the HTTP native module. This helps you execute the raw code Typescript code without any obstruction from third-party libraries. I hope you found it helpful.

### Further readings

- [Why Static Typing & Why is TypeScript so popular?](/engineering-education/typescript-static-typing/)
- [How to use TypeScript with Node.js](/engineering-education/how-to-use-typescript-with-nodejs/)
- [A Friendly Beginner's Guide to TypeScript](/engineering-education/a-friendly-beginner-guide-to-typescript/)
- [JavaScript vs. TypeScript](/engineering-education/javascript-vs-typescript/)

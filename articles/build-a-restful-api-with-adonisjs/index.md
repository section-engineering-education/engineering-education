## Build A RESTful API With AdonisJS

### Outline

Introduction
Setting up AdonisJS
Creating Databases
Setting up Authorization and Authentication
Creating Models
Creating Controllers
Creating Endpoint Routes
Testing the Forum API
Conclusion

### Introduction

In today’s ever-changing and rapid world of frameworks including frontend and backend frameworks, learning and building RESTful APIs to bridge the gap between clients and data is a demanding skill for any software engineer.

A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data exchange data between parties using endpoints (routes).

In this tutorial, we will be showing you how to build a RESTful API with AdonisJS 5. we will build an API for a forum. we are going to look at things like authentication, authorization, etc. we will also cover best practices in structuring and building out your HTTPS endpoint and also industry standard responses.

AdonisJS is the Laravel of JavaScript and a good grasp of it is a high-demand skill, therefore learning a build your first REST API with it is a game-changer. You can read through the [Ultimate Guide to AdonisJS 5](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide) to learn more.

### Setting up AdonisJS 5

If you’ve been working with JavaScript frameworks before now, you should already have Node.js installed in your system if not, you can install Node.js latest version by going through the steps [here](https://nodejs.org/en/).

_AdonisJS requires Node.js 12.x.x and NPM 6.x.x, so you should check the version of your Node.js to make sure it corresponds with the requirement._

Make sure to install the version corresponding to the requirements.

If you’ve the necessary requirements installed, now you can create a new AdonisJS 5 project by simply running this command.

```bash
    npm init adonis-ts-app adonisjs-forum-api
```

While you run the command, if you are asked to choose a project structure, select `API Server` and continue by leaving the other options default.

After installing successfully, open the folder with your favorite Text Editor and run the following commands in your terminal.

```bash
    cd <PROJECT_NAME>
    node ace serve --watch
```

Open your browser and visit the URL presented, if you see `hello world`.

Congratulations.

### Creating Databases

Now that we have our first `Hello World` API created, our Forum API cannot be completed with having a database for storing, reading and updating data from it.

Let’s set up our database right away:

First, you need to create a database with MySQL using any of these [Database Clients](https://masteringbackend.com/posts/top-10-database-clients-for-developers) of your choice.

Next, you need to install a package called Lucid, which is a powerful ORM used by AdonisJS with this command.

```bash
    npm i @adonisjs/lucid@alpha
```

Then you need to configure it with the database you just created by running the `invoke` command and following the instructions.

```bash
    node ace invoke @adonisjs/lucid
```

When you run the command, you will be presented with different database options, in this tutorial, we will go with MySQL/MariaDB and then select `In the Terminal` for the instructions.

Read through the instructions and update your `.env` file with your database credentials as follows.

```bash
    DB_CONNECTION=mysql
    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_USER= //DB_USER
    MYSQL_PASSWORD= //DB_PASSWORD
    MYSQL_DB_NAME= //DB_NAME
```

You can always go to `config/database.ts` to configure some credentials, for this article, we will stick with the defaults.

If you encounter this error `Client does not support authentication protocol requested by server;` while testing your Forum API, follow these steps to solve it.

```bash
    npm install mysql2
```

Then open `config/database.ts` and update the `client` field to `mysql2`.

That’s all.

### Setting up Authorization and Authentication

In AdonisJS 5, authentication and authorization is very easy to set up, all you need to do is to install the Auth package and every other complicated authentication logic is built in for you already.

Let’s get started:

Install the Auth package with this command.

```bash
    npm i @adonisjs/auth@alpha
```

As always, invoke the Auth package with the `invoke` command to configure it.

```bash
    node ace invoke @adonisjs/auth
```

First, it will ask you to select the provider, In this case, I chose Lucid and API Token next since we are building an API.

1. Next, type in the `User` Model for your authentication,
2. Then press `Y` key to create a migration for it.
3. Next, choose `Database` as your provider
4. Lastly, press `Y` again to create a `api_tokens` migration.

Now, you should have 2 migrations in your `database/migrations` folder, update the `xxxxx_users.ts` file to include a `name` and any other columns of your choice.

Lastly, add the `auth` middleware to the `kernel.ts` file inside `start/kernel.ts`:

```ts
Server.middleware.registerNamed({
  auth: "App/Middleware/Auth",
});
```

#### Creating migrations

Next step is to create the remaining migrations for the Post and Forum models we will be creating later.

Let’s get started:

Create new migration using this command:

```bash
    node ace make:migration posts
```

After running the command, open the new file in `database/migrations/xxxx_posts.ts` and paste in the following code.

```ts
import BaseSchema from "@ioc:Adonis/Lucid/Schema";
export default class Posts extends BaseSchema {
  protected tableName = "posts";
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title", 255).notNullable();
      table.string("content", 255).notNullable();
      table.integer("user_id", 180).notNullable();
      table.integer("forum_id").nullable();
      table.timestamps(true);
    });
  }
  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
```

For now, we are keeping it simple without defining any database constraints.

Next, we will create the `Forum` schema and paste in the following codes too.

    node ace make:migration forums

And the following codes.

```ts
import BaseSchema from "@ioc:Adonis/Lucid/Schema";
export default class Forums extends BaseSchema {
  protected tableName = "forums";
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title", 255).notNullable();
      table.string("description", 255).notNullable();
      table.integer("user_id", 180).notNullable();
      table.timestamps(true);
    });
  }
  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
```

Lastly, we will run the migrations to generate and create the database tables as specified in the migrations.

Now, stop the server and start it again before running the migration:

```bash
    node ace serve --watch
    // Then
    node ace migration:run
```

You can set up database seeders to generate fake data or [clone my repository](https://github.com/Kaperskyguru/adonisjs-forum-api) since we have configured that already.

Cheers!

### Creating Models

Now, we will create all the models we need this API and configure them properly to interact with our database.

```bash
    node ace make:model Forum
    node ace make:model Post
```

You can [clone my repository](https://github.com/Kaperskyguru/adonisjs-forum-api) to see how we map the columns and configure the relationships too.

This is a preview of how the Model looks like for a `User` model:

```ts
import { DateTime } from "luxon";
import Post from "App/Models/Post";
import Forum from "App/Models/Forum";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public email: string;
  @column()
  public name: string;
  @column({ serializeAs: null })
  public password: string;
  @column()
  public rememberMeToken?: string;
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  @hasMany(() => Post)
  public posts: HasMany<typeof Post>;
  @hasMany(() => Forum)
  public forums: HasMany<typeof Forum>;
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
```

### Creating Controllers

Next, we are going to create the individual controllers for each Model that we have created above but before that, let’s create an AuthController for the authentication.

```bash
    node ace make:controller Auth
```

Open the file in `app/Controllers/Http/AuthController.ts` and paste in the following codes.

```ts
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }
  public async register({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const name = request.input("name");
    /**
     * Create a new user
     */
    const user = new User();
    user.email = email;
    user.password = password;
    user.name = name;
    await user.save();
    const token = await auth.use("api").login(user, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }
}
```

The code above simply registers and login a user with any complex validations and error handling, so it can be easy to understand.

Next, let’s create all the controllers for our API at once:

```bash
    node ace make:controller Post
    node ace make:controller Forum
```

Open the `PostsController.ts` file inside `app/Controllers/Http` folder and add the following code.

```ts
    import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
    import Post from "App/Models/Post";
    export default class PostsController {
         public async index({ request}: HttpContextContract)
        {
            const posts = await Post.query().preload('user').preload('forum');
            return posts
        }
        public async show({ request, params}: HttpContextContract)
        {
            try {
                const post = await Post.find(params.id);
                if(post){
                    await post.preload('user')
                    await post.preload('forum');
                    return post
                }
            } catch (error) {
                console.log(error)
            }

        }

        public async update({ auth, request, params}: HttpContextContract)
        {
            const post = await Post.find(params.id);
            if (post) {
                post.title = request.input('title');
                post.content = request.input('content');
                if (await post.save()) {
                    await post.preload('user')
                    await post.preload('forum')
                    return post
                }
                return; // 422
            }
            return; // 401
        }

        public async store({ auth request, response}: HttpContextContract)
        {
            const user = await auth.authenticate();
            const post = new Post();
            post.title = request.input('title');
            post.content = request.input('content');
            post.forumId = request.input('forum');
            await user.related('posts').save(post)
            return post
        }
        public async destroy({response, auth, request, params}: HttpContextContract)
        {
           const user = await auth.authenticate();
           const post = await Post.query().where('user_id', user.id).where('id', params.id).delete();
           return response.redirect('/dashboard');
        }
    }
```

You can [Clone the repository](https://github.com/Kaperskyguru/adonisjs-forum-api) to review the other controllers that I have created.

### Creating Endpoint Routes

Next step is to create the endpoints for our frontend or mobile App to consume.

To to that, open the `route.ts` file inside `start` folder and add the following code.

```ts
//......
Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.group(() => {
    Route.resource("posts", "PostsController").apiOnly();
    Route.resource("forums", "ForumsController").apiOnly();
    Route.get("users/forums", "UsersController.forumsByUser");
    Route.get("users/posts", "UsersController.postsByUser");
  }).middleware("auth:api");
}).prefix("api");

//......
```

So far, we have created different endpoints for our Forum API.

Note that the `resource` method will create all the CRUD endpoints we need for our Forum API once. You can review more about it [here](https://preview.adonisjs.com/guides/http/routing#crud-actions).

### Testing the Forum API

When testing your endpoint using any HTTP clients e.g. [Postwoman](http://postwoman.io/), If you encounter any error saying `Cannot find module 'phc-argon2'` please run the following command to install the package.

```bash
    npm install phc-argon2
```

If we test the `posts` endpoint without authentication, we will be faced with the error below.

![Test API Error](/engineering-education/build-a-restful-api-with-adonisjs/test-api-error.png)

But if we login using the `/api/login` or register using the `/api/register` endpoint to retrieve our API Token:

![Test API Auth](/engineering-education/build-a-restful-api-with-adonisjs/test-api-auth.png)

We can access the protected endpoints after inserting the token as the Authorization header value.

![Test API Header](/engineering-education/build-a-restful-api-with-adonisjs/test-api-header.png)

Now, we can access our protected endpoints:

![Test API](/engineering-education/build-a-restful-api-with-adonisjs/test-api.gif)

### Conclusion

In this article, we covered the how to build a RESTful API in AdonisJS 5, we created a simple Forum API with authentication and authorization.

[You can clone the repository here](https://github.com/Kaperskyguru/adonisjs-forum-api).

Now, it is your turn, what will you be building and what is missing in the article that you will be including in your API.

Let us know in the comment section below.

Happy coding!

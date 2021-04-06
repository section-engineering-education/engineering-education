# Build a Ticketing App with AdonisJS and VueJS

### Outline

- Introduction
- prerequisites
- Goals of the Tutorial
- Step 1 — Setting up AdonisJS
- Step 2 — Building the Frontend
- Step 3 — Testing the Project
- Conclusion

### Introduction

[Adonis.js](https://preview.adonisjs.com/) is written from the ground up with a strong principle and goals in mind to be a strong integrated system having developer ergonomics, stability and speed.

To show the capabilities of the AdonisJS JavaScript framework and how it can be combined with the [Vue](https://v3.vuejs.org/) web framework, this tutorial will lead you through building a Ticketing System App.

This app will create events, generate tickets for the event, allow users to view the event and the tickets, also how them to make purchases and redeem the event tickets.

Once you finish the tutorial, you will have a functioning Ticketing application like the following:

<iframe width="560" height="315" src="https://www.youtube.com/embed/qf7vvjNjjIU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Prerequisites

Before continuing with this article, you should have previous experiences with the following:

1. Basic understanding of TypeScript and Node.js
2. Basic [understanding of AdonisJS](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide)
3. Basic understanding of VueJS

### Goals of the Tutorial

I will be showing you how to build a Ticketing App with AdonisJS 5 and VueJS. I will build a Ticketing Website that users can find events around you, register for a free event, buy tickets, sell tickets online and promote their event worldwide.

I will also cover best practices in structuring and building your frontend with VueJS when using AdonisJS as your backend.

Students will learn how to build a real-world app with AdonisJS and VueJS
Students will learn how to handle authentication and authorization with AdonisJS and VueJS
Students will learn how to integrate AdonisJS with VueJS.
Students will learn how to build and structure a Ticketing System in AdonisJS and VueJS
Students will learn best practices in building performance-oriented Web apps with AdonisJS.

### Step 1 — Setting up Adonis.js 5

Setting up AdonisJS 5 is very easy as it requires a simple NPM command below, if you want to learn more about installing and setting up AdonisJS 5, check out [Building a RESTful API with Adonis.js](https://www.section.io/engineering-education/build-a-restful-api-with-adonisjs/)

```bash
npm init adonis-ts-app adonisjs-ticketing-system-api
```

After creating the AdonisJS application, move inside the project directory and install the following packages to set up the API.

```bash
cd adonisjs-ticketing-system-api
```

Now, we need to set up our database to connect with the new Adonisjs application.

#### Creating the database

Our ticketing system application needs a database for storing, retrieving, updating and deleting data.

To install the database, we need to first create the database by using any of these [database clients](https://masteringbackend.com/posts/top-10-database-clients-for-developers) and install the `Lucid` ORM.

```bash
npm i @adonisjs/lucid@alpha
```

After installing the ORM, set it up by running the following command.

```bash
node ace invoke @adonisjs/lucid
```

After running the above command, follow the instructions and update your `.env` file.

```bash
DB_CONNECTION=mysql
MYSQL_USER= //DB_USER
MYSQL_HOST=localhost
MYSQL_DB_NAME= //DB_NAME
MYSQL_PORT=3306
MYSQL_PASSWORD= //DB_PASSWORD
```

If you encounter this error `Client does not support the authentication protocol requested by the server;` while testing your API, follow these steps to solve it.

```bash
npm install mysql2
```

To set up authentication in Adonisjs is done by installing a package and setting it up, you can read through how to set up authentication [here](https://www.section.io/engineering-education/build-a-restful-api-with-adonisjs/).

Install the Auth package with this command:

```bash
npm i @adonisjs/auth@alpha
```

#### Creating Migrations and Models

Our project will be using a total of 3 migrations and models excluding the User model and migration.

So let’s create our migrations:

```bash
node ace make:migration tickets
node ace make:migration events
node ace make:migration user_events
```

After running the commands, open the `database/migrations/xxxx_tickets.ts` migration and add the following codes:

```js
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
export default class Tickets extends BaseSchema {
  protected tableName = 'tickets'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('code')
      table.double('amount')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('event_id').unsigned().references('id').inTable('tickets').onDelete('CASCADE')
      table.boolean('is_used').defaultTo(false)
      table.dateTime('used_date').nullable()
      table.timestamps(true)
    })
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

Repeat the same for the other migrations from our repository. After completing the migrations, you can run the migration with this command.

```bash
node ace serve --watch
// Then
node ace migration:run
```

We will also create the models and map the columns.

```bash
node ace make:model Event
```

You can clone my repository to see how we map the columns, but here is an example of how to map the events model.

```ts
import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Ticket from "./Ticket";
import User from "./User";
export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public title: string;
  @column()
  public description: string;
  @column()
  public date: string;
  @column()
  public ticket_price: number;
  @column()
  public userId: number;
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  @hasMany(() => Ticket)
  public tickets: HasMany<typeof Ticket>;
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
```

We have mapped the columns in our migration to the Event models, and also defined the different relationships with `hasMany` and `belongsTo` methods.

#### Creating Controllers

In this step, we will be creating our controllers and also the business logic associated with our ticketing system.

We will start by creating the `AuthController` and setting up the login and registration processes.

```bash
node ace make:controller Auth
```

Open the file in `app/Controllers/Http/AuthController.ts` and paste the code below.

```js
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }
  public async register({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const name = request.input('name')
    const user = new User()
    user.email = email
    user.password = password
    user.name = name
    await user.save()
    const token = await auth.use('api').login(user, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }
}
```

The controller above defines the authentication process for the backend API.

Next, we will create the `EventsController` and paste in the following code while other controllers can be found in the repository.

```js
    import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
    import Event from 'App/Models/Event'
    import User from 'App/Models/User'
    import Ticket from 'App/Models/Ticket'
    import UserEvent from 'App/Models/UserEvent'
    import { DateTime } from 'luxon'
    const Keygen = require('keygen')
    export default class EventsController {
      public async index({}: HttpContextContract) {
        const events = await Event.query().preload('user').preload('tickets')
        return events
      }
      public async show({ params }: HttpContextContract) {
        try {
          const event = await Event.find(params.id)
          if (event) {
            await event.preload('user')
            await event.preload('tickets')
            return event
          }
        } catch (error) {
          console.log(error)
        }
      }
      public async update({ request, params }: HttpContextContract) {
        const event = await Event.find(params.id)
        if (event) {
          event.title = request.input('title')
          event.description = request.input('description')
          event.date = request.input('date')
          event.ticket_price = request.input('ticket_price')
          if (await event.save()) {
            await event.preload('user')
            await event.preload('tickets')
            return event
          }
          return // 422
        }
        return // 401
      }
      public async store({ auth, request }: HttpContextContract) {
        const user = await auth.authenticate()
        const event = new Event()
        event.title = request.input('title')
        event.description = request.input('description')
        event.date = DateTime.fromISO(request.input('date')).toSQL()
        event.ticket_price = request.input('ticket_price')
        await user.related('events').save(event)
        return event
      }
      public async destroy({ response, auth, params }: HttpContextContract) {
        const user = await auth.authenticate()
        await Event.query().where('user_id', user.id).where('id', params.id).delete()
        return response.redirect('/dashboard')
      }
      public async join({ params, auth, response, request }: HttpContextContract) {
        // Check if user already join event
        const user = await auth.authenticate()
        const ticket = await Ticket.query()
          .where('user_id', user.id)
          .where('code', request.input('code'))
          .where('event_id', params.id)
          .first()
        if (!ticket) {
          // Throw Ticket not found exception
          return response.json({ message: 'Ticket code not valid' })
        }
        if (
          ticket &&
          ticket.is_used &&
          ticket.used_date <= DateTime.fromSQL(ticket.used_date).toSQL()
        ) {
          // throw Used_ticket_Error
          return response.json({ message: 'Ticket already used' })
        }
        const joinEvent = new UserEvent()
        joinEvent.user_id = user.id
        joinEvent.event_id = params.id
        ticket.is_used = true
        ticket.used_date = DateTime.now().toSQL()
        if ((await joinEvent.save()) && (await ticket.save())) {
          // Send Success Response
          return response
            .status(200)
            .json({ message: "You've joined event with id: " + params.id + ' successfully' })
        }
        return response.status(500).json({ message: 'Internal Server Error, Please try again' })
      }
      public async buy({ request, params, response, auth }: HttpContextContract) {
        // Find Event
        const event = await this.findEvent(params.id)
        if (event === null) {
          return response.status(404).json({ message: 'Event is not valid' })
        }
        const user = await auth.authenticate()
        // Check if price matches
        if (event.ticket_price != request.input('amount')) {
          const message =
            'Ticket with id: ' +
            event.id +
            ' with amount: ' +
            event.ticket_price +
            ' does not equal to User amount: ' +
            request.input('amount')
          return response.status(422).json({ message })
        }
        const ticket = new Ticket()
        ticket.userId = user.id
        ticket.eventId = event.id
        ticket.amount = request.input('amount')
        ticket.code = Keygen.hex(5)
        if (ticket.save()) {
          // Send User Email, Send Code
          await User.find(user.id)
          // user.notifyNow(new TicketNotification(ticket, event));
          return response
            .status(200)
            .json({ message: 'Payment for event with id: ' + event.id + ' was successful' })
        }
        return response.status(500).json({ message: 'Internal Server Error, Please try again' })
      }
      private async findEvent(id: number): Promise<Event | null> {
        try {
          const event = await Event.find(id)
          if (event) {
            await event.preload('user')
            await event.preload('tickets')
            return event
          }
        } catch (error) {
          console.log(error)
        }
        return null
      }
    }
```

The controller includes all the possible CRUD functionalities such as retrieving, storing, updating and deleting the event. It also includes `buy` and `join` method which is use to order and join the ticket for an event.

#### Creating endpoint routes

In this step, we will create all the routes for this project once by adding the following code to our `start/routes.ts` file.

```js
Route.group(() => {
  Route.group(() => {
    Route.post("register", "AuthController.register");
    Route.post("login", "AuthController.login");
  }).prefix("auth");
  Route.group(() => {
    Route.resource("events", "EventsController").apiOnly();
    Route.resource("tickets", "TicketsController").apiOnly();
    Route.post("events/buy/:id", "EventsController.buy");
    Route.post("events/join/:id", "EventsController.join");
  }).middleware("auth:api");
}).prefix("api/v1");
```

We created three different route groups with a different prefix assigned to each while the last group has the `auth` middleware applied to make sure the request is authenticated before it can access those endpoints.

You can test out your API immediately by using either [Postman](https://www.postman.com/) client or [Hoppscotch](https://hoppscotch.io/) on your browser before developing the frontend.

![Test the API](/engineering-education/build-a-ticketing-app-with-adonisjs-and-vuejs/buildpreview.png)

### Step 2 — Building the Frontend

In setting up the Frontend, we will use the recommended Vite web development build tool to create our Vue 3 project.

Run the following command to install using Vite:

```bash
  npm init @vitejs/app ticketing-system-vue
  cd ticketing-system-vue
  npm install
  npm run dev
```

You can read through the installation process in the [official documentations](https://v3.vuejs.org/guide/installation.html###cli).

#### Creating Routes

Next, we will create all the routes that will be used in this project at once by defining a new `route.js` file inside the `src` folder and adding the following codes.

```js
//src/routes.js

import { createRouter, createWebHistory } from "vue-router";

import store from "./store";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Ticket from "./views/Ticket.vue";
import User from "./views/dashboard/User.vue";
import Admin from "./layouts/Admin.vue";
import Add from "./views/dashboard/Add.vue";
import AdminHome from "./views/dashboard/Admin.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/events/:id",
    name: "event",
    component: Ticket,
  },
  {
    path: "/user/:id",
    name: "user",
    component: User,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      if (
        store.getters["isUser"] &&
        parseInt(store.state.user.id) === parseInt(to.params.id)
      ) {
        next();
      } else {
        next({
          name: "login",
        });
      }
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "add",
        component: Add,
      },
      {
        path: "/",
        component: AdminHome,
      },
    ],
    beforeEnter(to, from, next) {
      if (store.getters["isAdmin"]) {
        next();
      } else {
        next({
          name: "login",
        });
      }
    },
  },
];
const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  to.matched.some((record) => {
    console.log(record);
    return record.meta.requiresAuth;
  });
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.loggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
```

In the code above, we created different routes for `login`, `register`, `index` and protected routes such as `admin` and `user`.

The `beforeEach` route hook checks each route for any authentication metadata and if found, checks if the user navigating that route has logged in or not then redirects.

To get the routes to work, we added the new route package and register this file inside the `main.js` file so we can use it as Vue 3 plugin.

```bash
npm install vue-router@4
```

Inside the `main.js`, we added it as below:

```js
import { createApp } from "vue";
import router from "./routes";
//........

createApp(App).use(router).use(store).mount("#app");
```

#### Set up user authentication

We will start by creating the login and register views in the `src/views` folder, run the following commands to create these files.

```bash
touch login.vue
touch register.vue
```

Next, we add the following code to create in the `login.vue` to create the login form and also the login process with error handling.

```js
    <template>
      <div class="text-center banner p-3">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="card card-custom p-5">
                <div class="container p-5">
                  <div class="pb-5">
                    <div class="text-center pb-3">
                      <h5 class="authBtn">Login</h5>
                      <small class="authBtnInner">
                        Equipped with the cutting edge features that make a 21st
                        Century Ticketing Platform,
                      </small>
                      <hr />
                    </div>
                    <form @submit.prevent="login">
                      <div class="form-group">
                        <input
                          name="email"
                          type="email"
                          v-model="email"
                          class="form-control"
                          placeholder="Email"
                        />
                        <span class="text-danger">
                          {{ emailError }}
                        </span>
                      </div>
                      <div class="form-group">
                        <input
                          name="password"
                          type="password"
                          v-model="password"
                          class="form-control"
                          placeholder="Password"
                        />
                        <span class="text-danger">
                          {{ passwordError }}
                        </span>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg btn-block customBtn"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                  <p>
                    New members? <router-link to="/register">Register</router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <script>
    import { ref, reactive } from "vue";
    import { useForm, useField } from "vee-validate";
    import { object, string } from "yup";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    export default {
      setup() {
        const store = useStore();
        const router = useRouter();
        const schema = object({
          email: string().required().email(),
          password: string().required().min(8),
        });
        useForm({
          validationSchema: schema,
        });
        // No need to define rules for fields
        const { value: email, errorMessage: emailError } = useField("email");
        const { value: password, errorMessage: passwordError } = useField(
          "password"
        );
        const user = ref({});
        const login = async () => {
          try {
            await store.dispatch("login", {
              email: email.value,
              password: password.value,
            });
            if (store.state.loggedIn && store.getters["isAdmin"])
              return router.push("/admin/");
            else {
              return router.push({
                name: "user",
                params: { id: store.state.user.id },
              });
            }
          } catch (err) {
            console.log(err);
          }
        };
        return {
          login,
          user,
          emailError,
          passwordError,
          email,
          password,
        };
      },
    };
    </script>
```

In the code above, the HTML mockup generates a Login form with a submit button, we also handle possible errors using the `vee-validate` library and then, we dispatch the `login` action in our Vuex store when the submit button is click.

The registration process is almost the same as the Login process, you can take a quick glance at the code [here](https://github.com/Kaperskyguru/ticketing-system-vuejs3/blob/main/src/views/Register.vue).

#### Creating the store

Next, we will create our Vuex store, create a new `store.js` file inside the `src` folder and add the following codes.

```bash
touch store.js
```

You can review the complete store codebase [here](https://github.com/Kaperskyguru/ticketing-system-vuejs3/blob/main/src/store.js), but below is a quick glance at our Vuex store.

```js
import { createStore } from "vuex";
import Repository from "./repositories/RepositoryFactory";
const EventRepository = Repository.get("events");
const AuthRepository = Repository.get("auth");
const store = createStore({
  state: {
    events: [],
    user: [],
    userevents: [],
    loggedIn: false,
  },
  actions: {
    async getEvents({ commit }) {
      commit("STORE_EVENTS", await EventRepository.get());
    },
    async login({ commit }, payload) {
      commit("STORE_LOGGED_IN_USER", await AuthRepository.login(payload));
    },
    async logout({ commit }) {
      try {
        await AuthRepository.logout();
        commit("STORE_LOGGED_OUT_USER", true);
        return true;
      } catch (error) {
        console.log(error);
      }
      return false;
    },
    async register({ commit }, payload) {
      return await AuthRepository.register(payload);
    },
  },
  mutations: {
    STORE_LOGGED_IN_USER: (state, response) => {
      const { data } = response;
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        state.user = data.user;
        state.token = data.token;
        state.loggedIn = true;
      }
    },
    STORE_EVENTS: (state, response) => {
      const { data } = response;
      state.events = data;
    },

    STORE_LOGGED_OUT_USER: (state, response) => {
      if (response) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        state.user = {};
        state.token = null;
        state.insights = null;
        state.loggedIn = false;
      }
    },
  },
  getters: {
    getEvent: (state) => (id) => {
      return state.events.find((event) => event.id == id);
    },
  },
});
export default store;
```

The store is where will manipulate all our data, we retrieved them from the API, store them to state, delete or update them from the store too.

In the store, we used the repository pattern to separate concerns, loose coupling in communicating with the API, you can have a sneak peek of the repository pattern [here](https://github.com/Kaperskyguru/ticketing-system-vuejs3/tree/main/src/repositories) and how to implement it [here](https://medium.com/backenders-club/consuming-apis-using-the-repository-pattern-in-vue-js-e64671b27b09).

#### Creating the Homepage

Next, we will create the homepage where are the events from being displayed from the state, create a file in `src/views` folder called `Home.vue` and add the following code.

```js
// Home.vue


<template>
  <div class="text-center banner">
    <div class="container p-5">
      <div class="p-5">
        <h1>Welcome to Ticketing System</h1>
        <p>
          Find events around you, register for free event, buy tickets, sell
          tickets online and promote your event worldwide.
        </p>
      </div>
    </div>
    <div class="container pb-5">
      <Events />
    </div>
  </div>
</template>

<script>
import Events from "../components/Events.vue";
export default {
  components: {
    Events,
  },
};
</script>
```

The scripts display all the events by calling out the `Events` component. The `Events` component is created as below:

```js
<template>
  <div class="row pb-5">
    <Event v-for="(event, i) in events" :key="i" :event="event" />
  </div>
</template>
<script>
import Event from "./Event.vue";
import { computed } from "vue";
import { mapState, useStore } from "vuex";
export default {
  name: "Events",
  components: { Event },
  setup() {
    const store = useStore();
    return {
      events: computed(() => store.state.events),
    };
  },
};
</script>
```

#### Displaying a single Event

To view a single event, we created a route in the `routes.js` file and linked it with each event. The route is defined as below:

```js
.......
import Ticket from "./views/Ticket.vue";

......
{
    path: "/events/:id",
    name: "event",
    component: Ticket,
  },
......
```

The route is pointing to a `Ticket` view and we have already created that inside the `src/views` folders.

```js
    // src/views/Ticket.vue

    <template>
      <div class="text-center banner p-3 pb-5">
        <div class="container pb-5">
          <div class="row pb-5">
            <div class="col-md-8 col-12 pb-5">
              <div class="card card-custom p-5">
                <h5 class="authBtn">{{ event.title }}</h5>
                <hr />
                <div class="container">
                  <small class="authBtnInner pb-3">{{ event.description }}</small>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-12">
              <div class="card card-custom p-5">
                <h5 class="authBtn">Event Ticket</h5>
                <hr />
                <span>Event Date:</span>
                <small class="authBtnInner pb-3">
                  {{ event.date }}
                </small>
                <hr />
                <span>Event Price:</span>
                <small class="authBtnInner pb-3">${{ event.ticket_price }}</small>
                <router-link to="/" class="btn btn-primary customBtn"
                  >Buy Ticket</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <script>
    import { computed } from "vue";
    import { useStore } from "vuex";
    import { useRoute } from "vue-router";
    export default {
      name: "Ticket",
      setup() {
        const store = useStore();
        const route = useRoute();
        const event = computed(() => store.getters.getEvent(route.params.id));
        return { event };
      },
    };
    </script>
```

The Ticket component displays the events information including the Ticket price and a Buy button, which after purchasing an email will be sent to the purchaser including the ticket’s code.

### Testing the project

Here is a preview of what we have developed so far.

<iframe width="560" height="315" src="https://www.youtube.com/embed/qf7vvjNjjIU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This is a high-level abstraction of the entire codebase, you can clone the different repositories for this project and take a closer look at each of them in details.

AdonisJS Backend Repository [here](https://github.com/Kaperskyguru/ticketing-system-adonisjs).
<br />Vuejs 3 Frontend Repository [here](https://github.com/Kaperskyguru/ticketing-system-vuejs3).

### Conclusion

In this tutorial, we developed a ticketing system application using AdonisJS as the backend and VueJs 3 for the frontend

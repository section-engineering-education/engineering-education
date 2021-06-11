---
layout: engineering-education
status: publish
published: true
url: /how-to-setup-user-authentication-from-scratch-with-rails-6/
title: How to Setup User Authentication from Scratch with Rails 6
description: In this tutorial, we will build the authentication system for a Ruby on Rails 6 application from scratch.
author: njunu-simon
date: 2021-06-04T00:00:00-16:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-progressive-web-application/hero.jpg
    alt: React Progressive Web Application example Image
---
User authentication is a fundamental feature in the security of web resources. While setting up user authentication in a `rails` program, the [devise gem](https://rubygems.org/gems/devise) is a popular tool. However, at times it can be too large and complicated to customize especially when building a simple application.
<!--more-->
In this tutorial, we will set up user authentication from scratch in Rails 6.

### Prerequisites
To follow along in this article, it is helpful to have the following:
- [Ruby](https://www.ruby-lang.org/en/)
- [SQLite3](https://www.sqlite.org/)
- [Node](https://nodejs.org)
- [yarn](https://classic.yarnpkg.com/en/docs/install)
- [Rails](https://rubygems.org/gems/rails) framework configured.
- Basic knowledge of Ruby programming language.
- A good understanding of the Rails framework. 
- Basic understanding of Object Oriented Programming (OOP) paradigm.
- Text editor installed. Preferrably [VS Code](https://code.visualstudio.com/)

### Overview
- [Project Setup](#project-setup)
- [Basic understanding of MVC](#basic-understanding-of-MVC)
- [Configuring routes](#configuring-routes)
- [Adding Controllers](#adding-controllers)
- [Configuring views](#configuring-views)
- [Resetting the password](#resetting-the-password)
- [Setting up mailers](#setting-up-mailers)

### Project setup
Generate a new rails application by running:

```bash
rails new auth -T
```

We are using the `-T` argument to exclude the default testing framework.

Navigate to the newly created `auth` folder. In the app folder, `Rails` maintains the files for the controllers, models, and views.

### Basic understanding of MVC
Model View Controller is a design pattern that divides related programming logic, making it easier to reason about. Rails follow this design pattern. I'd higly recommend going through the [Understanding the MVC in Rails](https://www.sitepoint.com/model-view-controller-mvc-architecture-rails/) article to familiarize yourself with the Architecture.

- Create a route. In `config/routes.rb`.

```rb
  Rails.application.routes.draw do
    root 'welcome#index'
  end
```

In the snippet above, we are instructing `Rails` to set the root route (`/`) to `index` action in `WelcomeController`. So, the index action will be triggered when the user visits the root route.

- We will run the following command to create the controller:

```bash
  rails generate controller Welcome index --skip-routes
```

We added the `--skip-routes`, meaning we have defined the routes and to skip.

The generator will create files but the most important file is the controller file located in, `app/controllers/welcome_controller.rb`

```rb
  class WelcomeController < ApplicationController
    def index
    end
  end
```

This generator also creates a file in `app/views/welcome/` named `index.html.erb`. By default, Rails renders a view that corresponds to the name of a controller action.

Replace the view content with:

```bash
  <h1>Rails Authentication</h1>
```

- We have our controller and views in place, let's create the model.

A `model` is a `Ruby` class that serves as the template to a database table that holds data. 

We can define it using a generator as follows:

```bash
  rails generate model User email:string password_digest:string
```

This will generate several files, we will only focus on `app/models/users.rb` and `db/migrate/<timestamp>_create_users.rb`

- Update `db/migrate/<timestamp>_create_users.rb` to:

```rb
  class CreateUsers < ActiveRecord::Migration[6.1]
    def change
      create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest
      t.timestamps
    end
  end
```

We are adding model level validation to our `email` field, and `password_digest` is used to create password fields in rails. Encryption of passwords is done using the [bcyrpt_gem](https://rubygems.org/gems/bcrypt).

- Include `bcyrpt` in your Gemfile.

```rb
  # Gemfile
  gem 'bcrypt', '~> 3.1.7'
```

- Install it by running `bundle install`.

- Update `app/models/users.rb` to:

```rb
  class User < ApplicationRecord
     # adds virtual attributes for authentication
     has_secure_password
     # validates email
     validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: 'Invalid email' }
  end
```

We'll ensure that email field is present and unique before a user gets saved to the database.

Email addresses should also conform to a pattern, we can achieve this with the help of the given `regular expression`, this is a powerful language for matching string patterns.

- Remember to run your migrations. Migrations are feature of `Active Record` that allow you to evolve your database schema over time.

Before a migration is run, there will be no table in the databse. The table will be created in the database afterwards.

```bash
  rails db:migrate
```

Let's test our app by running:

```bash
rails server
```

We will see a Rails app with a home page.

![localhost](/engineering-education/how-to-setup-user-authentication-from-scratch-with-rails-6/localhost.png)

Let's test our model by running:

```bash
rails console
```

**Create a new user:**

![railsconsole](/engineering-education/how-to-setup-user-authentication-from-scratch-with-rails-6/railsconsole.png)

### Configuring routes
Update `config/routes.rb`:

We are filling in our `routes.rb` with respective controller's actions, generating paths and URLs for our application.

```rb
Rails.application.routes.draw do
  root 'welcome#index'
  get 'sign_up', to: 'registrations#new'
  post 'sign_up', to: 'registrations#create'
  get 'sign_in', to: 'sessions#new'
  post 'sign_in', to: 'sessions#create', as: 'log_in'
  delete 'logout', to: 'sessions#destroy'
  get 'password', to: 'passwords#edit', as: 'edit_password'
  patch 'password', to: 'passwords#update'
  get 'password/reset', to: 'password_resets#new'
  post 'password/reset', to: 'password_resets#create'
  get 'password/reset/edit', to: 'password_resets#edit'
  patch 'password/reset/edit', to: 'password_resets#update'
end
```

When our application receives an incoming request for.

```rb
GET /sign_up
```

It will ask the router to match it to a controller action, if the matching route is -

```rb
get 'sign_up', to: 'registrations#new'
```

Then the request will be dispatched to the `registrations` controller's `new` action.

### Adding controllers
Routers determine which controller to use for the request. Controllers will then receive the request and save or fetch data from our models.

- Let's create the `registrations_controller.rb` by running the command `touch app/controllers/registrations_controller.rb`.

```rb
  class RegistrationsController < ApplicationController
    # instantiates new user
    def new
      @user = User.new
    end
    def create
      @user = User.new(user_params)
      if @user.save
      # stores saved user id in a session
        session[:user_id] = @user.id
        redirect_to root_path, notice: 'Successfully created account'
      else
        render :new
      end
    end
    private
    def user_params
      # strong parameters
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  end
```

This controller is responsible for creating a new user and saving it to the database.

The `new` action initializes a new object in the User model and stores it as an instance variable, this can the be accessed in the views.

The `create` action creates the user instance setting it's id to a `session`. If this process is successful, it redirects to our `root path` else renders a `new` view.

`session` stores data for one request and used in another request.

- Let's create the `sessions_controller.rb` by running the command `touch app/controllers/sessions_controller.rb`

```rb
  class SessionsController < ApplicationController
    def new; end
    def create
      user = User.find_by(email: params[:email])
      # finds existing user, checks to see if user can be authenticated
      if user.present? && user.authenticate(params[:password])
      # sets up user.id sessions
        session[:user_id] = user.id
        redirect_to root_path, notice: 'Logged in successfully'
      else
        flash.now[:alert] = 'Invalid email or password'
        render :new
      end
    end
    def destroy
      # deletes user session
      session[:user_id] = nil
      redirect_to root_path, notice: 'Logged Out'
    end
  end
```

`SessionsController` provides login functionality to an existing user, also logs out a user by deleting session data.

The `create` action finds user with a corresponding email address in the database. It uses logical operator to check if a user is present and authenticated and log's in the user if both constraints are true.

The `destroy` action sets user session to nil, logging out the user.

- Let's create the `passwords_controller.rb` by running the command `touch app/controllers/passwords_controller.rb`

```rb
  class PasswordsController < ApplicationController
    # allows only logged in users
    before_action :require_user_logged_in!
    def edit; end
    def update
      # update user password
      if Current.user.update(password_params)
        redirect_to root_path, notice: 'Password Updated'
      else
        render :edit
      end
    end
    private
    def password_params
      params.require(:user).permit(:password, :password_confirmation)
    end
  end
```

`PassWordsController` allows signed_in_user to update passwords.

The `before_action :require_user_logged_in!` is a Rails `callback` this is defined in the `application_controller.rb` it allows only logged in users to access the `update` action which updates user's password.

- Update our `app/controllers/application_controller.rb` to:

```rb
  class ApplicationController < ActionController::Base
    before_action :set_current_user
    def set_current_user
      # finds user with session data and stores it if present
      Current.user = User.find_by(id: session[:user_id]) if session[:user_id]
    end
    def require_user_logged_in!
      # allows only logged in user
      redirect_to sign_in_path, alert: 'You must be signed in' if Current.user.nil?
    end
  end
```

- Note the inheritance hierarchy in this class, since all controllers inherit from the `ApplicationController`, `set_current_user` will be accessible in all the controllers.

This controller finds signed_in_user with `session[:user_id]` and stores it as `Current.user` if present.

- The `Current.user`can be accessed in our views.

- Let's create the `current.rb` class by running the command `touch app/models/current.rb` which will allows us to call `Current.user` in our views.

```rb
  class Current < ActiveSupport::CurrentAttributes
    # makes Current.user accessible in view files.
    attribute :user
  end
```

### Configuring views
Controllers makes model data available to the view and this data can be displayed to the user.

Rails provides us with form builder object yielded by `form_with` which contains helper methods for generating form elements.

- Create a `sign_up` form:

```bash
  touch `app/views/registrations/new.html.erb`
```

```bash
  <h1>Sign Up</h1>
  <%= form_with model: @user, url: sign_up_path do |f| %>
    <p>
    <%= f.label 'email' %><br>
    <%= f.text_field :email %>
    </p>
    <p>
    <%= f.label 'password' %><br>
    <%= f.password_field :password %>
    </p>
    <p>
    <%= f.label 'password_confirmation' %><br>
    <%= f.password_field :password_confirmation %>
    </p>
    <p>
    <%= f.submit 'Sign Up' %>
    </p>
  <% end %>
```

The `sign_up` form creates a form_tag and this is scoped to our `User` model enabling us to populate our fields with the attributes from `User` object.

- Create a `sign_in` form:

```bash
  touch `app/views/sessions/new.html.erb
```

```bash
  <h1>Sign In</h1>
  <%= form_with url: sign_in_path do |f| %>
    <p>
    <%= f.label 'email:'%><br>
    <%= f.text_field :email, id: 'email' %>
    </p>
    <p>
    <%= f.label 'password:'%><br>
    <%= f.password_field :password, id: 'password' %>
    </p>
    <p>
    <%= f.submit 'Log In' %>
    </p>
  <% end %>
```

- Create a `password_edit` form.

```bash
  touch `app/views/passwords/edit.html.erb`
```

```bash
  <h1>Edit Password</h1>
  <%= form_with model: Current.user, url: edit_password_path do |f| %>
    <p>
    <%= f.label 'password:'%><br>
    <%= f.password_field :password %>
    </p>
    <p>
    <%= f.label 'password_confirmation:'%><br>
    <%= f.password_field :password_confirmation %>
    </p>
    <p>
    <%= f.submit 'Update' %>
    </p>
  <% end %>
```

- Open `app/views/layouts/application.html.erb` and update `<body>` tag to:

```bash
   <body>
     <p class="notice"><%= notice %></p>
     <p class="alert"><%= alert %></p>
     <%= yield %>
   </body>
```

Within the context of a layout, `<%= yield %>` identifies a section where content from the view should be inserted.

- Open `app/views/welcome/index.html.erb` and add:

```bash
  <% if Current.user %>
    Logged in as: <%= Current.user.email %><br>
    <= link_to 'Edit Password', edit_password_path %>
    <%= button_to 'Logout', logout_path, method: :delete %>
    <% else %>
    <%= link_to 'Sign Up', sign_up_path %>
    or
    <%= link_to 'Login', sign_in_path %>
  <% end %>
```
  
We then check to see if `Current.user` is present and provide an `edit_password_link` and a `sign_out_button`. If not, a `sign_up_link` and `login_link` is seen.
  
- Refresh your app and check to see if you can create a new account, sign_in and edit your password.

![sign_up](/engineering-education/how-to-setup-user-authentication-from-scratch-with-rails-6/sign_up.png)

### Resetting the password
We already have our routes in place, now we can update our controllers and views to reset passwords.

- touch `app/controllers/password_resets_controller.rb`:

```rb
  class PasswordResetsController < ApplicationController
    def new; end
    def edit
      # finds user with a valid token
      @user = User.find_signed!(params[:token], purpose: 'password_reset')
      rescue ActiveSupport::MessageVerifier::InvalidSignature
        redirect_to sign_in_path, alert: 'Your token has expired. Please try again.'
    end
    def update
      # updates user's password
      @user = User.find_signed!(params[:token], purpose: 'password_reset')
      if @user.update(password_params)
        redirect_to sign_in_path, notice: 'Your password was reset successfully. Please sign in'
        else
        render :edit
      end
    end
    private
    def password_params
      params.require(:user).permit(:password, :password_confirmation)
    end
  end
```
  
The above controller is responsible for resetting user passwords.
  
The `edit` action finds signed user with a valid token and purpose, passwords can only be changed with valid tokens if not an `ActiveSupport::MessageVerifier` is raised.
  
The `update` action updates user's password with valid tokens and redirects to the `sign_in_path`.
We have to `configure our mailers` before we complete this action, for a user to receive an email and reset the password.
Before we configure the mailers, let's create the views by running the command `touch app/views/password_resets/edit.html.erb`.
  
```bash
  <h1>Reset your password?</h1>
  <%= form_with model: @user, url: password_reset_edit_path(token: params[:token]) do |f| %>
    <p>
    <%= f.label 'password:' %><br />
    <%= f.password_field :password %>
    </p>
    <p>
    <%= f.label 'password_confirmation:' %><br />
    <%= f.password_field :password_confirmation %>
    </p>
    <p>
    <%= f.submit 'Reset Password' %>
    </p>
  <% end %>
```
  
- Create another file `app/views/password_resets/new.html.erb` and add the following:

```bash
  <h1>Forgot your password?</h1>
  <%= form_with url: password_reset_path do |f| %>
    <p>
    <%= f.label 'email:' %><br />
    <%= f.text_field :email %>
    </p>
    <p>
    <%= f.submit 'Reset Password' %>
    </p>
  <% end %>
```
  
### Setting up mailers
- We generate our mailers using the below command:

```bash
  rails generate mailer Password reset
```

Several files are created by the generator but the most important file is the `app/mailers/password_mailer.rb` and the view files.
  
- Update `app/mailers/password_mailers.rb` to this:

```rb
  class PasswordMailer < ApplicationMailer
    def reset
      # assigns a token with a purpose and expiry time
      @token = params[:user].signed_id(purpose: 'password_reset', expires_in: 15.minutes)
      # sends email
      mail to: params[:user].email
    end
  end
```
  
The `PasswordMailer` is responsible for setting up a token used in the `passwordsresets_controller.rb`. It defines a `reset` action which creates a token and sends email to the user.
  
Our views should look like this:

```bash
touch `app/views/password_mailer/reset.html.erb`
```

```bash
Hi <%= params[:user].email %>,<br>
Someone requested a password reset.
Click the link above if you recognise the activity, link expires in 15 minutes
<%= link_to 'Reset Password', password_reset_edit_url(token: @token) %>
```

And our `app/views/password_mailer/reset.text.erb`:

```bash
Hi <%= params[:user].email %>
Someone requested a password reset.
Click the link above if you recognise the activity, link expires in 15 minutes
<%= password_reset_edit_url(token: @token) %>
```

Add a create action in `app/controllers/password_resets_controller.rb` above the edit action:

```rb
def create
    @user = User.find_by(email: params[:email])
    if @user.present?
      # send mail
      PasswordMailer.with(user: @user).reset.deliver_later
      # deliver_later is provided by ActiveJob
    end
    redirect_to root_path, notice: 'Please check your email to reset the password'
  end
```

- Note: In our `app/controllers/password_reset_controller.rb` we have called out mailer class `PasswordMailer.with(user: @user).reset.deliver_later`, the `deliver_later` is part of [Action_job](https://edgeguides.rubyonrails.org/active_job_basics.html) it enables us to queue background jobs.

- One more setting before we send our emails, we need to open up our `app/config/environments/development.rb` and add `config.action_mailer.default_url_options = { host: "localhost:3000" }` in the block.

- In `app/config/environments/development.rb` let's set up to use Gmail.

Add the following in the block:
  
```rb
  config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      user_name:      ENV['email'],
      password:       ENV['password'],
      domain:         ENV['localhost:3000'],
      address:       'smtp.gmail.com',
      port:          '587',
      authentication: :plain,
      enable_starttls_auto: true
    }
```
  
Change the `email` and `password` to match your credentials.
  
- Now create a welcome mailer:

```bash
  rails generate mailer Welcome
```

- Update the `app/mailers/welcome_mailer.rb`:

```rb
  class WelcomeMailer < ApplicationMailer
    # sends a welcome email
    def welcome_email
      @user = params[:user]
      @url = 'http://localhost:3000/sign_in'
      mail(to: @user.email, subject: 'Welcome to my awesome tutorial')
    end
  end
```
  
- The `WelcomeMailer` defines a `welcome_email` action which is responsible for sending a welcome email to a signed in user.

Update your mailer views in `app/views/welcome_mailer/welcome_email.html.erb`:
  
```bash
  <!DOCTYPE html>
  <html>
    <head>
      <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
    </head>
    <body>
      <h1>Welcome to example.com, <%= @user.email %></h1>
      <p>
        You have successfully signed up to example.com,
        your user email is: <%= @user.email %>.<br>
      </p>
      <p>
        To login to the site, just follow this link: <%= @url %>.
      </p>
      <p>Thanks for joining and have a great day!</p>
    </body>
  </html>
```
  
- And our `app/views/welcome_mailer/welcome_email.text.erb` to:

```bash
  Welcome to example.com, <%= @user.email %>
  ===============================================
  You have successfully signed up to example.com,
  your user email is: <%= @user.email %>.
  To login to the site, just follow this link: <%= @url %>.
  Thanks for joining and have a great day!
```
  
- Remember to add a link in `app/views/sessions/new.html.erb` to reset your passwords, update the file to match the above.
 
```bash
  <h1>Sign In</h1>
  <%= form_with url: sign_in_path do |f| %>
    <p>
    <%= f.label 'email:'%><br>
    <%= f.text_field :email, id: 'email' %>
    </p>
    <p>
    <%= f.label 'password:'%><br>
    <%= f.password_field :password, id: 'password' %><br>
    <%= link_to 'Forgot your password?', password_reset_path %>
    </p>
    <p>
    <%= f.submit 'Log In' %>
    </p>
  <% end %>
```

Try resetting your password and you should see something close to this:
  
![pass_reset_mail](/engineering-education/how-to-setup-user-authentication-from-scratch-with-rails-6/pass_reset_mail.png)
  
- To send the Welcome email, we will have to update our `create` action in `app/controllers/registrations_controller.rb` to:
 
```bash
  def create
    @user = User.new(user_params)
    if @user.save
      WelcomeMailer.with(user: @user).welcome_email.deliver_now
      # deliver_now is provided by ActiveJob.
      session[:user_id] = @user.id
      redirect_to root_path, notice: 'Successfully created account'
    else
      render :new
    end
  end
```

Welcome email should be similar to this:

![welcome_mailer](/engineering-education/how-to-setup-user-authentication-from-scratch-with-rails-6/welcome_mailer.png)
  
### Summary
In this article, we have implemented a complete Rails authentication system by following the steps below:
- [Project Setup](#project-setup)
- [Basic understanding of MVC](#basic-understanding-of-MVC)
- [Configuring routes](#configuring-routes)
- [Adding Controllers](#adding-controllers)
- [Configuring views](#configuring-views)
- [Resetting the password](#resetting-the-password)
- [Setting up mailers](#setting-up-mailers)

The finalized code can be accessed from [here](https://github.com/Njunu-sk/Rails-Authentication). Feel free to give the project a star.

### Conclusion
We have learned about the MVC design and built an authentication system from scratch and set up an Action Mailer and ActiveJob to send our emails and session security in Rails.

Please visit [Go_Rails](https://gorails.com/) for more Ruby on Rails content, including the above in this tutorial.

### References
- [Rails_edge_guides](https://edgeguides.rubyonrails.org)

- [Code_project](https://www.codeproject.com/articles/575551/user-authentication-in-ruby-on-rails)

You can always reach out to me via [Twitter](https://twitter.com/njunusimon)

Happy coding!!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)

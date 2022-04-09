---
layout: engineering-education
status: publish
published: true
url: /auto-logout-angular/
title: Implementing Auto Logout in Angular 12
description: This tutorial teaches readers everything they need to get started with Angular auto logout feature. Automatic logout is a pervasive feature in web development and mobile applications, especially in banking systems. As a result, it plays a significant role in ensuring the safety and integrity of data.
author: owino-wendy
date: 2021-10-01T00:00:00-06:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/auto-logout-angular/hero.png
    alt: Implementing Auto Logout in Angular 12 Hero Image
---
Automatic logout is a pervasive feature in web development and mobile applications, especially in banking systems. As a result, it plays a significant role in ensuring the safety and integrity of data.
<!--more-->
Auto log off comes in handy because an application user may forget to log off the system after use.

This tutorial discusses how we can build a secure Angular application that can sign out idle screens.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with auto log off](#getting-started-with-auto-log-off)
- [Setting up a sample auto logout project](#setting-up-a-sample-auto-logout-project)
- [Installing packages](#installing-packages)
- [Creating authentication forms](#creating-authentication-forms)
- [How to determine if a screen is idle](#how-to-determine-if-a-screen-is-idle)
- [Issues with our implementations](#issues-with-our-implementations)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, you need to have:
- Basic knowledge of JavaScript or TypeScript
- Basic Angular concepts
- Understanding of the concepts of Node Package Manager (NPM).

### Objectives
This tutorial aims to teach you everything you need to get started with your Angular application security.

We will build a sample authentication application that will automatically log off users.

### Getting started with auto log off
Automatic log off is a security feature that determines the amount of time a screen can stay idle. In simple terms, it's the amount of time a screen stays active without user actions such as click events.

This feature is very core in terms of resource management and security.

In terms of resource management, it helps stop unnecessary API calls and minimize the vulnerability to attacks.

### Setting up a sample auto logout project
Let's build a sample application in Angular 12, implementing the automatic log off.

Let's begin by installing an Angular application as shown below:

```bash
ng new sample-auto-logout
```

This command installs an Angular application `sample-auto-logout` with all the required dependencies.

Next, `cd` into this project root and create the following components:

```bash
cd sample-auto-logout
ng  g component auth/sign-in
ng g component auth/create-account
```

The commands above creates 2 components, `signInComponent` and `CreateAccountComponent` inside the `auth` directory.

### Installing packages
In this application, we'll be using the Angular material to design our web pages as well as the [Snotify](https://www.npmjs.com/package/ng-snotify) package to display alerts.

Let's add them to our Angular application by running the following commands:

```bash
npm i ng-snotify # for NPM users or

yarn add ng-snotify #for yarn
```

> If you're new to `snotify`, feel free to go through it's documentation [here](https://artemsky.github.io/ng-snotify/documentation/). Alternatively, you may use the `Toast` notifications. It's important to have these alert services to inform a user on the screen that they have been logged out.

Let's proceed to add the `Angular Material` by running the following commands:

```bash
ng add @angular/material
```

This prompts for quick yes/no questions.

Once done, you can import the required modules into `app.module.ts` as will be explained in the next steps.

### Creating authentication forms
Now that our application has the auth components, add the following contents in the `CreateAccountComponent` template.

```html
<div class="citizen-registration">
	<div class="container">
		<mat-card class="mt-5 mb-5">
			<mat-card-title class="text-center">Register</mat-card-title>
			<mat-card-content class="justify-content-center">
				<form
					[formGroup]="citizenRegistrationForm"
					(ngSubmit)="onCitizenRegistration()"
					novalidate
					role="form"
				>
					<input type="hidden" formControlName="role" value="citizen" />
					<p>
						<mat-form-field appearance="standard" color="primary">
							<mat-label>Full Name</mat-label>
							<input
								matInput
								placeholder="Ezekiel Alawode"
								required
								name="fullName"
								formControlName="fullName"
								autocomplete="fullName"
							/>
							<mat-icon matSuffix>account_circle</mat-icon>
						</mat-form-field>
					</p>
					<p>
						<mat-form-field appearance="standard">
							<mat-label>Town/City</mat-label>
							<input
								matInput
								placeholder="Okene"
								required
								formControlName="city"
								name="city"
								autocomplete="city"
							/>
						</mat-form-field>
					</p>
					<p>
						<mat-form-field appearance="standard">
							<mat-label>Phone</mat-label>
							<input
								type="tel"
								matInput
								placeholder="08143651284"
								required
								name="phone"
								formControlName="phone"
								autocomplete="phone"
							/>
						</mat-form-field>
					</p>

					<p>
						<mat-form-field appearance="standard">
							<mat-label>Email Address</mat-label>
							<input
								type="tel"
								matInput
								placeholder="johndoe@example.com"
								required
								name="email"
								formControlName="email"
								autocomplete="email"
							/>
						</mat-form-field>
					</p>

					<p>
						<mat-form-field appearance="standard">
							<mat-label>Password</mat-label>
							<input
								type="password"
								matInput
								required
								name="password"
								formControlName="password"
								autocomplete="password"
							/>
						</mat-form-field>
					</p>

					<p>
						<mat-checkbox class="example-margin"
							>I agree with the <a href="#">Terms and Conditions</a>, governing
							this site.</mat-checkbox
						>
					</p>
					<div class="row mt-5">
						<div class="col-md-6">
							<button *ngIf="!submitting" type="submit" class="register-button">
								Register
							</button>
							<button *ngIf="submitting" type="submit" class="register-button">
								Processing...
							</button>
						</div>
						<div class="col-md-6">
							<a class="login-button text-right" [routerLink]="['/auth/login']"
								>Login Here</a
							>
						</div>
					</div>
				</form>
			</mat-card-content>
		</mat-card>
	</div>
</div>
```

The template above is a sample registration form for an organization where the company captures user details.

This HTML page uses Angular material, which is added by running the following commands:

```bash
ng add @angular/material
```

This command prompts you to answer basic yes/no questions, which helps in material customization.

We need to import a few modules from the previous package we installed for our template above to work.

The simplest way to achieve this is by creating a new module in the `src/app` directory:

```bash
ng g module app-material
```

Now proceed to update the contents of this module by adding the following contents:

```ts
import { NgModule } from "@angular/core";

import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
	exports: [MatCardModule, MatCheckboxModule],
})
export class DemoMaterialModule {}
```

Next, import this module into the `app.module.ts` file as shown below:

```ts
...
import {MaterialModule} from "./material-module";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CreateAccountComponent,
  ],
  imports: [
    ...
    AppRoutingModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In the module above, we declare the components we created previously and then import the material modules.

Now, let's add a few styles to beautify our page:

```css
mat-form-field {
	font-size: 16px;
}
mat-card-title {
	font-family: Poppins;
	font-style: normal;
	font-weight: bolder;
	font-size: 40px;
	line-height: 60px;
	text-align: center;

	color: #ffffff;
}
mat-form-field {
	width: 100%;
	color: #ffffff;
}
mat-card {
	width: 525px;
	height: auto;
	left: auto;
	top: auto;
	margin: 0 auto;
	background: #c60c5a;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.6);
	border-radius: 5px;
}
mat-label {
	font-family: Poppins;
	font-style: normal;
	font-weight: bold;
	font-size: 24px;
	line-height: 36px;
	color: #ffffff;
}
mat-form-field input {
	padding: 5px;
	color: #ffffff;
}
mat-icon {
	color: #ffffff;
}
mat-checkbox {
	color: #ffffff;
}
.register-button {
	width: 194px;
	height: 45px;
	background: #004598;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
	border-radius: 3px;
	font-family: "Poppins", sans-serif;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	text-align: center;

	color: #ffffff;
}
.login-button {
	font-family: "Poppins", sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 27px;
	text-align: right;
	text-decoration-line: underline;
	color: #ffffff;
}
```

We're editing the default Angular material form with our defined CSS styles in the styles file above. Of course, you're free to customize this to meet your needs.

Output:

![register](/engineering-education/auto-logout-angular/register.png)

### How to determine if a screen is idle
Now that we have a fully furnished authentication form let's determine whether the user's screen is idle.

How this works is very simple, we keep track of user's actions on the web application. It's important to note that these actions are equivalent to events.

When a user acts on the application, we record it as an action in the browser's local storage.

Whenever a user acts, we reset the clock on the local storage and start the count again. This clock is then synced with the local time to perform appropriate changes.

Let's create a service `AutoLogOffService` and add the following code:

```ts
...
@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  //log off details
  isLogin = false;

  constructor(
      private router: Router,
      private snotifyService: SnotifyService,
      private ngZone: NgZone
  ) {
    if(this.isUserLoggedIn()){
      this.isLogin=true;
    }
    this.lastAction(Date.now());
    this.check();
    this.initListener();
    this.initInterval();
  }

  /**
   * last action
   */
  getLastAction() {
    return localStorage.getItem('lastAction');
  }

  /**
   * set last action
   * @param value
   */
  lastAction(value) {
    localStorage.setItem('lastAction', JSON.stringify(value))
  }

  /**
   * start event listener
   */
  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  /**
   * time interval
   */
  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, 1000);
    })
  }

  /**
   * reset timer
   */
  reset() {
    this.lastAction(Date.now());
  }

  /**
   * check timer
   */
  check() {
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction()) + (5) * 60 * 1000;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;
    //this.isLoggedIn.subscribe(event => this.isLogin = event);
    this.ngZone.run(() => {
      if (isTimeout && this.isLogin) {
        localStorage.removeItem('user_id');
        localStorage.removeItem('lastAction');
        setTimeout(()=>{
          console.log("Your Session Expired due to longer Inactivity, Login Again To Continue");
        },10000);
        this.router.navigate(['login']);
      }
    });
  }

  /**
   *check if a user is logged in
   */
  isUserLoggedIn():string{
    return environment.authKey;
  }
}
```

The code above has an interval and event listeners; hence we can set the automatic logout time as required.

Let's have a look at each step and get an in-depth of how it works:
- ` isLogin = false` - This is a boolean property that checks whether a user is logged in or not.
- `constructor()` - The constructor injects 3 services:
  - `router` - This is the service that we'll use to redirect the user to the login page upon being auto logged out. It is an inbuilt tool shipped with Angular.
  - `snotifyService` - [Snotify](https://www.npmjs.com/package/ng-snotify) is 3rd party package used to show alerts on the screen without breaking the user interface.
  - `NgZone` - NgZone enables us to explicitly run certain code outside Angular's Zone, preventing Angular from running any change detection. Handlers will still be executed. However, since they won't run inside Angular's Zone, Angular won't get notified that a task is done. Therefore, no change detection will be performed.
- `if statement` - Inside the constructor, we're checking to see if the user is actually logged in.
- `getLastAction()` - We use this method to get the latest time the current user interacted with the application. It's important to remember that we have to track every event on the application by resetting our clock in an attempt to get the latest action.
- `lastAction(value)` - This is a simple method that sets our clock on the local storage each time an event occurs.
- `initListener()` - Previously, we have said that we're tracking user's activities on the application. It listens to every action on the application; in our case, we're listening to `click` events. This method resets our clock in the local storage each time a `click` event occurs.
- `initInterval()` - This method initializes the intervals for checking the click events; this depends entirely on how you want to track the circumstances; in our case, we've set the interval to every second (1000ms =1s).
- `reset()` - This method resets the last action's clock by calling the `lastAction()` method and passing it the current date.
- `check()` - This method checks the timer. For example, it calculates the difference between the current time and the time of the last action. This difference is then used to determine whether the user should log out or remain in session. Indeed, it's on this method that we set the time a screen should remain inactive. In our case, we've set it to `5` minutes. Of course, you may set this to any time you wish.
- `isUserLoggedIn()` - This method checks if the user is logged in by checking the authentication token. However, this is entirely up to you to decide how to authenticate users.

### Issues with our implementations
In the previous section, you've seen how auto logout is achieved using Angular. However, you may have noticed some set time intervals.

For our application to auto logout an idle screen, it has to run some checks and keep track of every action. This may be resource consuming.

### Conclusion
In this tutorial, we've covered the concepts of automatic logoff in an Angular application.

We've seen that we can keep track of the activities on our applications using event listeners, which helps determine the actions.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

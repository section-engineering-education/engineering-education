### Introduction

Automatic sign out is a very common feature in web development or even in mobile applications especially in banking systems. It plays a very important role in ensuring the safety and integrity of data is protected from unauthorised access.  

This comes hand in hand considering the fact that an application user may forget to log off the system after use. In this tutorial, we discuss how we can build a secure Angular application that has the ability to sign out idle screens.

### Table of contents

- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [Getting started with automatic log off](#getting-started-with-automatic-log-off)
- [Setting up a sample automatic log off project](#setting-up-a-sample-automatic-log-off-project)
- [Creating authenticatiion forms](#creating-authenticatiion-forms)
- [How to determine if a screen is idle](#how-to-determine-if-a-screen-is-idle)
- [Conclusion](#conclusion)

### Prerequisites

- Basic knowledge of JavaScript or TypeScript
- Basic Angular concepts
- Understanding the concepts of Node Package Manager (NPM).

### Objectives

This tuturial aims to teach you everything you need to get started with your Angular application security. We'll also build a sample authentication application that will automatically log off users.

### Getting started with automatic log off

Automatic log off is a security feature that determines the amount of time a screen can stay idle. In simple terms, it's the amount of time a screen stays active without user actions such as click events.  

This feature is very core in terms of resource management and security. In terms of resource management, it helps in stopping unnecessary APII calls while for security, it minimizes the vulnerability to attacks.  

### Setting up a sample automatic log off project

In the previous section, we discussed the basic concepts of idle screen timeout. In this section, we build a sample application in Angular 12 implementing the automocatic log off.  

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

### Creating authenticatiion forms

Now that our application has the auth components, add the following contents in the `CreateAccountComponent` HTML page.

```html
<div class="citizen-registration">
  <div class="container">
    <mat-card class="mt-5 mb-5">
      <mat-card-title class="text-center">Register</mat-card-title>
      <mat-card-content class="justify-content-center">
        <form [formGroup]="citizenRegistrationForm" (ngSubmit)="onCitizenRegistration()" novalidate role="form">
          <input type="hidden" formControlName="role" value="citizen">
          <p>
            <mat-form-field appearance="standard" color="primary">
              <mat-label>Full Name</mat-label>
              <input matInput placeholder="Ezekiel Alawode" required name="fullName" formControlName="fullName" autocomplete="fullName">
              <mat-icon matSuffix>account_circle</mat-icon>
            </mat-form-field>
          </p>
          <p>
            <mat-form-field appearance="standard">
              <mat-label>Town/City</mat-label>
              <input matInput placeholder="Okene" required formControlName="city" name="city" autocomplete="city">
            </mat-form-field>
          </p>
          <p>
            <mat-form-field appearance="standard">
              <mat-label>Phone</mat-label>
              <input type="tel" matInput placeholder="08143651284" required name="phone" formControlName="phone" autocomplete="phone">
            </mat-form-field>
          </p>

          <p>
            <mat-form-field appearance="standard">
              <mat-label>Email Address</mat-label>
              <input type="tel" matInput placeholder="johndoe@example.com" required name="email" formControlName="email" autocomplete="email">
            </mat-form-field>
          </p>

          <p>
            <mat-form-field appearance="standard">
              <mat-label>Password</mat-label>
              <input type="password" matInput required name="password" formControlName="password" autocomplete="password">
            </mat-form-field>
          </p>

          <p>
            <mat-checkbox class="example-margin">I agree with the <a href="#">Terms and Conditions</a>, governing this site.</mat-checkbox>
          </p>
          <div class="row mt-5">
            <div class="col-md-6">
              <button *ngIf="!submitting" type="submit" class="register-button">Register</button>
              <button *ngIf="submitting" type="submit" class="register-button">Processing...</button>
            </div>
            <div class="col-md-6">
              <a class="login-button text-right" [routerLink]="['/auth/login']">Login Here</a>
            </div>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  </div>
</div>

```

The above markup is a sample registration form for an organisation where the company captures as much details as possible.

This HTML page use Angular material which is added by running the following commands:

```bash
ng add @angular/material
```

This command will prompt you to answer basic yes/no questions which helps in material customization.  

For our template above to work, we need to import a few modules from the previous package we installed. The simplest way to achieve this is by creating a new module in the `src/app` directory.  

```bash
ng g module app-material
```

Now proceed and update the contents of this module by adding the following contents:

```ts
import {NgModule} from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  exports: [
    MatCardModule,
    MatCheckboxModule,
  ]
})
export class DemoMaterialModule {}

```

Next, import this module into `app.module.ts` file as shown below:

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

In theabove module,we declare the components we created previously, and then proceed to import the material modules.

Now, let's add a few styling to beautify our page:

```css
mat-form-field.mat-form-field {
  font-size: 16px;
}
mat-card-title{
  font-family: Poppins;
  font-style: normal;
  font-weight: bolder;
  font-size: 40px;
  line-height: 60px;
  text-align: center;

  color: #FFFFFF;
}
mat-form-field {
  width: 100%;
  color: #FFFFFF;
}
mat-card{
  width: 525px;
  height: auto;
  left: auto;
  top: auto;
  margin: 0 auto;
  background: #C60C5A;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
}
mat-label{
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  color: #FFFFFF;
}
mat-form-field input{
  padding: 5px;
  color: #FFFFFF;
}
mat-icon{
  color:#FFFFFF;
}
mat-checkbox{
  color: #FFFFFF;
}
.register-button{
  width: 194px;
  height: 45px;
  background: #004598;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  font-family: 'Poppins',sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;

  color: #FFFFFF;
}
.login-button{
  font-family: 'Poppins',sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 27px;
  text-align: right;
  text-decoration-line: underline;
  color: #FFFFFF;
}

```

Output:

![register](/engineering-education/autologoff/register.png)

### How to determine if a screen is idle

Now that we've a fully furnished authentication form, let's procced and determine how whether user screen is idle.

How this works is very simple, we keep track of user's action on the web application. It's important to note that these actions are equivalent to events.  
When a user performs an action on the application, we record it as an action in the browser's `localstorage`.  

Whenever a user perform an action, we reset the clock on the localstorage and start the count again. This clock is then synced with the loca time to perform appropriate changes.  

Let's create a service `AutoLogOffService` and add the following:

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
        localStorage.removeItem('drupp_token');
        localStorage.removeItem('admin_name');
        localStorage.removeItem('firebase:previous_websocket_failure');
        localStorage.removeItem('admin_id');
        localStorage.removeItem('lastAction');
        setTimeout(()=>{
          this.snotifyService.error("Your Session Expired due to longer Inactivity, Login Again To Continue",'Logged Off');
        },10000);
        this.router.navigate(['login']);
      }
    });
  }

  /**
   *check if user is logged in
   */
  isUserLoggedIn():string{
    return environment.authKey;
  }
}

```

The above code has an interval and event listeners hence we can set the automatic logout time are required

### Conclusion

In this tutorial, we've covered the concepts of automatic logoff in an Angular application. We've seen that we can keep track of the activities taking place on our applications using even listeners which in turn helps in determining the actions.

# Phone Verification Laravel Using Twilio


### Table of Contents
- Prerequisites
- Introduction
- Creating and Setting Up a New Laravel App
- Setting Up Authentication (Controller, Routes and Views)
- Database Migration
- Set Up Twilio
- Calling User's Phone Number
- Instructing, Collecting and Account Verification
- Conlusion


### Prerequisites

- To follow this tutorial, we'll assume the following for this tutorial:
- You are having understanding of [PHP and Laravel](https://laravel.com/docs/8.x)
- You are having Larave 8.x in your machine
- You are having MySQL installed on your machine.
- You are having a[ Composer globally installed](https://getcomposer.org/doc/00-intro.md).
- You are having[ Ngrok set up](https://ngrok.com/)
- You are having [Twilio ](https://www.twilio.com/)account.
- You are having a verified number (If you are in trial mode).
- You are having a [voice-enabled Twilio phone number]([url](https://www.twilio.com/console/phone-numbers/incoming))

### Introduction
Almost every online registration that requires a user's phone number will verify the phone number's legitimacy in some way, either via a text message, a phone call, or any other handy technique. It's vital to double-check a phone number, especially if it's the only means to reach the person.

In this article, we will learn how to call a user's registered phone number to verify the phone number's authenticity. If the user answers the phone, he or she will be asked to enter a one-time password (OTP) that was generated and displayed on his or her screen during the signup process. The user account will not be verified if an incorrect OTP is entered or if the user refuses to answer the phone. The user account will be verified if the user answers the phone and enters the correct OTP.

This phone number verification will be accomplished in Laravel by utilizing a Twilio programmable voice service called TwiML Voice: `<Gather>`, which allows you to gather a user's input while they are on the phone. Twilio is a cloud communication platform that provides a variety of products and solutions to help you engage your users, one of which is the Programmable Voice, which allows you to make and receive calls from within your application.

### Creating and Setting Up a New Laravel App
We'll use composer to create a new Laravel installation. We do this by entering the following command into our terminal: 

```
composer create-project laravel/laravel programmable-voice
````

```
cd programmable-voice
```
```
php artisan serve
```

Open the `.env` file and add the database credentials and the database credential to the following.
```

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=twilio
DB_USERNAME=root
DB_PASSWORD=

```
Using MYSQL database management application, create a new database called twilio and then Run the following artisan command in your terminal
```
php artisan serve
```
If you followed all of the steps correctly, you should be able to see your new app in the browser by now when you visit `http://127.0.0.1:8000/` as shown below.

![larave home page](/phone-verification-in-laravel-using-twilio/laravel-index-page.jpg)

 
### Setting Up Authentication (Controller, Routes and Views)
Now that we have setup the database credentials, we can now set up authentication (we will set up the authentication controller, routes and views). We will be setting up laravel authentication manually.

#### Controller 
Let us start by creating our Auth Controller where we will handle all the authentication processes. Run the below artisan command.

```
php artisan make:controller AuthController

```
Our `AuthController.php` should look like this.

```

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
       
 
}



```

Let us add the following importation to our `app/Http/Controllers/Auth/AuthController.php`.

```

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Session;


```

Now let us add the following code to our `app/Http/Controllers/Auth/AuthController.php'.
```

public function index()
    {
        return view('auth.login');
    }  
      
    public function reverify()
    {
        return view('auth.verification');
    }  
    public function registration()
    {
        return view('auth.registration');
    }    

    public function postRegistration(Request $request)
    {  
        $request->validate([
            'name' => 'required',
            'phone_number' => 'required|numeric|unique:users',
            'password' => 'required|min:8',
        ]);

        $code = random_int(100000, 999999);
        $user = new User;

        User::create([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'verification_code' => $code,
            'password' => Hash::make($request->password)
          ]);

          
        return redirect()->route('login')->withSuccess('login successfull');
    } 

 public function postLogin(Request $request)
    {
        $request->validate([
            'phone_number' => 'required',
            'password' => 'required',            
        ]);
        
        $user = User::where('phone_number', $request->phone_number)->first();

        if($user && $user->isVerified == false && Hash::check($request->password,     $user->password)){
            return redirect("login")->with('status', 'Account not verified');
        };

        $credentials = $request->only('phone_number', 'password');
       
        if (Auth::attempt($credentials)) {
           
            return redirect()->intended('dashboard')
                        ->withSuccess('You have Successfully loggedin');
        }
  
        return redirect("login")->witherrors('Oppes! You have entered invalid credentials');
    }

    
 
    public function dashboard()
    {
        if(Auth::check()){
            return view('dashboard');
        }
  
        return redirect("login")->witherrors('Opps! You do not have access');
    }
 
    public function logout() {
        Session::flush();
        Auth::logout();
  
        return Redirect('login');
    }

     
    }

```

We have now added all that we need to authenticate a user in our` app/Http/Controllers/Auth/AuthController.php`. The `index `method, the `registration `method, and the `reverify `method returns the `login`, `registration `and `verification `view respectively. The `dashboard `method returns the `dashboard ` view only if the user us authenticated, else it will redirect to the `login `with an error message.This tis done using the `Auth::check()`. The `postRegistration ` method saves all the user’s input and making sure that the data provided by the user passes the validation check, it then redirect the user to the login page with a success message. The `postLogin` method authenticates the user base on the credetials provided by the user and the verification status. this uses the `Auth::attempt($credentials)`. The `logout ` method logs the user out and also clears the session using the `Session::flush()`

#### Route 
We need to add how route to anable users navigate through pages in our application. Add the following code to `routes/web.php `
```

    Route::get('login', [AuthController::class, 'index'])->name('login');
    Route::post('post-login', [AuthController::class, 'postLogin'])->name('login.post'); 
    
    Route::get('registration', [AuthController::class, 'registration'])->name('register');
    Route::post('post-registration', [AuthController::class, 'postRegistration'])->name('register.post'); 
    
    Route::get('reverify', [AuthController::class, 'reverify'])->name('reverify');
    Route::post('post-reverify', [AuthController::class, 'postReverify'])->name('reverify.post'); 
    
    Route::get('logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('dashboard', [AuthController::class, 'dashboard'])->name('dashboard');


```
This anables users to navigate through pages in our application.

#### Views
We now want to include the authentication view. Create a folder inside the views folder and call it auth. We will be creating all our authentication views (`login.blade.php`, `registration.blade.php` and `verification.blade.php`) in the auth folder while the `dashboard.blade.php` and `layout.blade.php` will be create in the views folder.

Open `resources/views` create a new file and name it `layout.blade.php`. open the file `resources/views/layout.blade.php` and include the following code.
`resources/views/layout.blade.php` 
```
<!DOCTYPE html>
<html>
<head>
    <title>Laravel</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Raleway:300,400,600);
  
        body{
            margin: 0;
            font-size: .9rem;
            font-weight: 400;
            line-height: 1.6;
            color: #212529;
            text-align: left;
            background-color: #f5f8fa;
        }
        .navbar-laravel
        {
            box-shadow: 0 2px 4px rgba(0,0,0,.04);
        }
        .navbar-brand , .nav-link, .my-form, .login-form
        {
            font-family: Raleway, sans-serif;
        }
        .my-form
        {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
        }
        .my-form .row
        {
            margin-left: 0;
            margin-right: 0;
        }
        .login-form
        {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
        }
        .login-form .row
        {
            margin-left: 0;
            margin-right: 0;
        }
    </style>
</head>
<body>
    
<nav class="navbar navbar-expand-lg navbar-light navbar-laravel">
    <div class="container">
        <a class="navbar-brand" href="#">Laravel</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
   
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                @guest
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('login') }}">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('register') }}">Register</a>
                    </li>
                @else
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('logout') }}">Logout</a>
                    </li>
                @endguest
            </ul>
  
        </div>
    </div>
</nav>
  
@yield('content')
     
</body>
</html>
```
The `layout.blade.php` view provides a laout or design that is share across other blade views to avoid repeation of code.

In `resources/views/auth` create a new file and name it `Login.blade.php`. open `resources/views/auth/Login.blade.php` and include the following code.
```
@extends('layout')
  
@section('content')

<style>

.main-div{
    
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 2%;
    text-align: center;
    background-color: white;
    

}
.input-item{
    display: block;
    padding-top: 10px;
    padding-left: 10px;
    text-align: justify;
    
    
}
.input-style{
  width: 80%;
  margin-bottom: 8px;

  border-radius: 5px;
  
  border: 1px solid gray;
  padding: 11px 19px;
}
.submit-bn{
  margin: 7px 0;
  background-color: #1E90FF;
  width: 20%;
  color: white;
  padding: 10px 17px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}
label{
    font-size: 20px;
    font-weight: 400;
}
.small-error{
    color: red;
}

.error-flag{
background-color: #ffcccc;
color: red;
border: none;
padding-top: 20px;
padding-bottom: 20px;
}

.success-flag{
background-color: #ccffcc;
color: green;
border: none;
padding-top: 20px;
padding-bottom: 20px;
}

.info-flag{
background-color: #b3e6ff;
color: blue;
border: none;
padding-top: 20px;
padding-bottom: 20px;
}
</style>


<div class="main-div">
    <h2 style="color: gray; padding-top:20px;">LOGIN</h2>
@if (Session::has('errors'))
                        <div class="error-flag">
                            {{ Session::get('errors')->first() }}
                        </div>
                    @endif

                    @if (Session('status'))
                        <div class="error-flag">
                            Your account has not been verified, click the verify button to verify account
                            <a class="submit-bn" href= "{{ route('reverify') }}">Verify</a>

                        </div>                        

                    @endif

                    @if(session('success'))
                        <div class="info-flag"> 
                            Your Verification code is <strong>{{session('success')}}</strong> 
                            Please answer the call and follow the intruction. You can login on successful registration
                            <a class="submit-bn" href= "{{ route('reverify') }}">Try again</a>
                        </div>
                    @endif
    
                    <form action="{{ route('login.post') }}" method="POST">
                          @csrf
                          <div class="input-item">
                              <label class="">Phone Number</label>
                              <div class="">
                                  <input type="number" class="input-style" name="phone_number" required> <br/>
                                  @if ($errors->has('phone_number'))
                                      <span class="small-error">{{ $errors->first('phone_number') }}</span>
                                  @endif
                              </div>
                          </div>
  
                          <div class="input-item">
                              <label class="">Password</label>
                              <div class="">
                                  <input type="password"  class="input-style" name="password" required> <br/>
                                  @if ($errors->has('password'))
                                      <span class="small-error"> {{$errors->first('password')}} </span>
                                  @endif
                              </div>
                          </div>                        
                     
                          <div class="">
                              <button type="submit" class="submit-bn">
                                  Login
                              </button>
                          </div>
                      </form>

</div>


@endsection

```
The login view displays the login form which enables user input (phone numberand password) and sends it to the `postlogin` method for authentication, it displasy an error if the there is one

Open `resources/views/auth` create a new file and name it `registration.blade.php`. open the file `resources/views/auth/registration.blade.php` and include the following code.


```
@extends('layout')  
@section('content')
<main class="login-form">
  <div class="cotainer">
      <div class="row justify-content-center">
          <div class="col-md-8">
              <div class="card">
                  <div class="card-header">Register</div>
                  <div class="card-body">
                  
                      <form action="{{ route('register.post') }}" method="POST">
                          @csrf
                          <div class="form-group row">
                              <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                              <div class="col-md-6">
                                  <input type="text" id="name" class="form-control" name="name" required autofocus>
                                  @if ($errors->has('name'))
                                      <span class="text-danger">{{ $errors->first('name') }}</span>
                                  @endif
                              </div>
                          </div>
  
                          <div class="form-group row">
                              <label for="phone_number" class="col-md-4 col-form-label text-md-right">Phone Number</label>
                              <div class="col-md-6">
                                  <input type="number" id="phone_number" class="form-control" name="phone_number" required autofocus>
                                  @if ($errors->has('phone_number'))
                                      <span class="text-danger">{{ $errors->first('phone_number') }}</span>
                                  @endif
                              </div>
                          </div>
  
                          <div class="form-group row">
                              <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                              <div class="col-md-6">
                                  <input type="password" id="password" class="form-control" name="password" required>
                                  @if ($errors->has('password'))
                                      <span class="text-danger">{{ $errors->first('password') }}</span>
                                  @endif
                              </div>
                          </div>
  
                          <div class="form-group row">
                              <div class="col-md-6 offset-md-4">
                                  <div class="checkbox">
                                      <label>
                                          <input type="checkbox" name="remember"> Remember Me
                                      </label>
                                  </div>
                              </div>
                          </div>
  
                          <div class="col-md-6 offset-md-4">
                              <button type="submit" class="btn btn-primary">
                                  Register
                              </button>
                          </div>
                         
                      </form>
                        
                  </div>
              </div>
          </div>
      </div>
  </div>
</main>
@endsection

```
This is the registration veiw wich provides a registration form to the user and also collect the input of the user and the sends it to `postRegistration` method for processing. User is redirected to login page if registration is successful, else it displays an error message.


Open `resources/views/auth`, create a new file and name it `verification.blade.php`. open the file `resources/views/auth/verification.blade.php` and include the following code.

```
@extends('layout')
  @section('content')
<main class="login-form">
  <div class="cotainer">
      <div class="row justify-content-center">
          <div class="col-md-8">
              <div class="card">
                  <div class="card-header">Phone Verification</div>
                  <div class="card-body">
  
                  <form action="{{ route('reverify.post') }}" method="POST">
                          @csrf
                          <div class="form-group row">
                              <label for="phone_number" class="col-md-4 col-form-label text-md-right">enter your registered Phone Number</label>
                              <div class="col-md-6">
                                  <input type="number" id="phone_number" class="form-control" name="phone_number" required autofocus>
                                  @if ($errors->has('phone_number'))
                                      <span class="text-danger">{{ $errors->first('phone_number') }}</span>
                                  @endif
                              </div>
                          </div>

                          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                   
  
                          <div class="col-md-6 offset-md-4">
                              <button type="submit" class="btn btn-primary">
                                  Verify
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</main>
@endsection
```
This view allows only one input which is the user's phone number. when a user register but not verified and he tries to login, he/she will be redirected to this page asking theuser to verify the phone number by providing their registered phone number.

Open `resources/views/`, create a new file and name it `dashboard.blade.php`. open the file `resources/views/dashboard.blade.php` and include the following code.

```
@extends('layout')  
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>
  
                <div class="card-body">
                    @if (session('success'))
                        <div class="alert alert-success" role="alert">
                            {{ session('success') }}
                        </div>
                    @endif

                    Welocome <strong>{{auth()->user()->name}}</strong> You are Logged In8
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

```
The `dashboard.blade.php` is where the user will be redirected to once he/she is authenticated. This view can only be access if the user is authenticated.

Now that we are done with our views, we also need to modify the `app/User.php` model. The code below ensures that the phone, name, and password fields are mass-assigned. More information on [mass assignment](https://laravel.com/docs/8.x/eloquent) can be found in the Laravel documentation:

```
protected $fillable = [
        'name',
        'phone_number',
        'verification_code',
        'password',
    ];
```

### Database Migration
We have successfully created our login system but there is one more thing we need to edit, and that is our user table migration. We need to modify it to fit in the data that we are to enter. 

```
public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone_number')->unique();
            $table->string('verification_code')->unique()->nullable();
            $table->boolean('isVerified')->default(false);
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

```

Next, lets create our tables by running the following code.
```
php artisan migrate
```
Our authentication is now ready and functional.

### Set Up Twilio
The following step will be to add our Twilio credentials to the ` .env` file. These credentials can be found in your twilio dashboard when you login you twilio account.
```

TWILIO_SID= "YOUR ACCOUNT SID HERE"
TWILIO_AUTH_TOKEN= "YOUR ACCOUNT AUTH TOKEN HERE"

``` 
![twilio tokens](/phone-verification-in-laravel-using-twilio/twili-tokens.jpg)

#### Install Twilio’s SDK Using Composer
The Twilio PHP Helper Library must be installed via the composer. This will allow us to communicate with Twilio's API from our code. In your terminal, type the following command:

```
 composer require twilio/sdk

```

### Calling User's Phone Number
Connecting to the registration flow and calling the user's phone number is the next step. The user should receive a call from the application upon a successful register. Open` app/Http/Controllers/AuthController.php` and add the following:
```    
use Twilio\Rest\Client;


public function makeCall($call_to) {
        $token = getenv("TWILIO_AUTH_TOKEN");
        $twilio_sid = getenv("TWILIO_SID");
        $twilio = new Client($twilio_sid, $token);
       
        $twilio->calls->create($call_to, // to
                        "+17122145457", // from
                        [
                            "url" => " http://localhost:8000/build-twiml/user-input/".$call_to
                        ]
               );

    }

```

This is where we call the user and instruct him on what to do. Using the credentials we saved in` .env` earlier, we create a client to help us communicate with Twilio's API. It is essential at this point to understand Twilio's Programmable Voice API. There are three parameters that can be passed into the create method:

- The first parameter is the phone number that will be dialed. This will be the user's registered phone number in our case.You must have to verify your phone number if u are on trial mode
- The second parameter which is the “from” is your twilio phone number. This must be a Twilio phone number with voice capabilities that you have created in your console. Note that this phone number must have voice functionality.
- To me, the most intriguing aspect of Twilio voice API is the third parameter. The third parameter is a URL to an XML file that must return valid TwiML (Twilio Markup Language) or a URL to your application that Twilio will send an HTTP request to for instructions on how to handle the call. This URL must be a live URL that be accessible online because Twilio will send an HTTP request to this URL. This is where Ngrok comes in. It will assist us in obtaining a live URL for our application.

In `AuthController.php` we need to modify our `postRegistration ` method to call the `makeCall `method and also add `postReverify ` method to enable a registered but yet to verify user verify his/her account.
```

public function postRegistration(Request $request)
    {  
        $request->validate([	
            'name' => 'required',
            'phone_number' => 'required|numeric|unique:users',
            'password' => 'required|min:8',
        ]);

        $code = random_int(100000, 999999);
        $user = new User;

        User::create([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'verification_code' => $code,
            'password' => Hash::make($request->password)
          ]);

          $this->makeCall($request->phone_number);
         
        return redirect()->route('login')->withSuccess($code);
    }

public function postReverify(Request $request){
        $request->validate([            
            'phone_number' => 'required|numeric',            
        ]);
        $code = random_int(100000, 999999);

        $newToken= User::where('phone_number', $request->phone_number)->update(['verification_code' => $code]);

        if($newToken){
            $this->makeCall($request->phone_number);
            return redirect()->route('login')->withSuccess($code);
                
            }
            else{
                return redirect("login")->witherrors('Opps! this phone number does not exit');
            }

    }


```
### Instructing, Collecting and Account Verification
At this stage, we have done allot, but we are yet to instruct the user on what to do when he/she receives the call, collect the user input and verify the user account. Let's use artisan to quickly create a controller that handles this. Execute this command:

```
 php artisan make:controller PhoneVerificationController

```
Open that controller and add the following code to it:
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\TwiML\VoiceResponse;
use App\Models\User;

class PhoneVerificationController extends Controller
{
    public function userInput($call_to)
    {
        $response = new VoiceResponse();
        $response->say("Hello, thank you for registering with us.");

        $gather = $response->gather([
            'action' => '/build-twiml/'.$call_to. '/verification',
            'numDigits' => 6,
            'timeout'=>10, 
        ]);

        $gather->say("Please enter the six digits verification code that is currently displaying on your screen to verify your phone number");

        $response->say('Sorry. You did not respond and your account can not be verify. Goodbye');
        $response->hangup();        
        echo $response;
    }

    public function verifyNumber($call_to)
    {
        $user = User::where('phone_number', $call_to)->first();
        $code = $_POST['Digits'];

        $response = new VoiceResponse();
        
        if($_POST['Digits'] == $user->verification_code){
            $emailNumber= User::where('phone_number', $call_to)->update(['isVerified' => true]);

            if($emailNumber){
            $response->say('You account has been verified. Goodbye');
                
            }
            else{
                $response->say('An error accured while trying to verify your account. Please try again.');
                $response->redirect('/build-twiml/user-input/'.$call_to);
            }
        }
        else{
            $response->say('You entered a wrong verification, and your account can not be verified. Goodbye');
        }
    
        echo $response;
    }
}

```

if you take a look at the preceding code more closely. The class now has two new methods, each with a specific use case, but both of them use the Twilio SDK's `VoiceResponse() ` class to construct the TwiML response. The `userInput `method does the magic of giving instruction to the user on what to do and also collecting use keypad input after which it sends a request with the collected data to a specified URL while the `verifyNumber `method does the phone number verification using the collected data from `userInput` method. The `VoiceResponse()` class has some methods that are used to interact with the user which are as follows.
- The `say() `method takes a string and read text to the user
- The `gather()` method collects digits the user types on their keypad. The gather method also contains some methods which are used to control the flow of your call, but in our case, we only use the say() method. The gather() method accepts an optional argument in the form of an associative array containing several attributes that can be used to alter how the gather() method behaves. The value of the action attribute should be a valid URL that Twilio will call after the user has finished entering a value. The numDigits attribute takes a number as an argument to specify the maximum number of characters to accept before calling the action attribute's URL. The timeout attribute set the waiting time of the application before the before the URL set in the action attribute gets called.

- The` hangup()` method hangs up the call.
- The `redirect()` method redirects call flow to a different TwiML document

Let's define the route for the `PhoneVerificationController.php`. and also add middleware to the application. Open `routes/web.php `and edit it like this:
```

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware(['guest'])->group(function () {
    Route::get('login', [AuthController::class, 'index'])->name('login');
    Route::post('post-login', [AuthController::class, 'postLogin'])->name('login.post'); 
    
    Route::get('registration', [AuthController::class, 'registration'])->name('register');
    Route::post('post-registration', [AuthController::class, 'postRegistration'])->name('register.post'); 
    
    Route::get('reverify', [AuthController::class, 'reverify'])->name('reverify');
    Route::post('post-reverify', [AuthController::class, 'postReverify'])->name('reverify.post'); 
    
    Route::post('build-twiml/user-input/{call_to}', [PhoneVerificationController::class, 'userInput']); 
    Route::post('/build-twiml/{call_to}/verification', [PhoneVerificationController::class, 'verifyNumber']); 
    

});

Route::middleware(['auth'])->group(function () {
    Route::get('logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('dashboard', [AuthController::class, 'dashboard'])->name('dashboard');

});

Route::get('/', function () {    
    return view('welcome');
});
```

The next important phase is to disable CSRF checks on the route Twilio will use to make an HTTP request. This is extremely important. If we don't disable it, Laravel will deny access and Twilio will be unable to handle the call. To do so, edit `app/Http/Middleware/VerifyCsrfToken.php` as follows:

```
protected $except = [
        '/build-twiml/*'
        
    ];
```


Exposing the Application
At this level, for us to have a perfectly working application, our application needs to be accessible online. Fortunately, ngrok makes it possible for us to do just that. You can learn how to setup ngrok from there official doc. Let’s begin by launching your Laravel application. To start your Laravel application, open your terminal and navigate to the folder of your application, then enter the following commands:

```
php artisan serve

```

This will start your Laravel application on your local machine on a specific port (8000 in my case), which will be printed to the terminal after the command is successfully executed. To make your application publicly accessible, lunch a ngrok executable file terminal and run the following command on it terminal:

```
ngrok http 8000

```

Following the successful execution of the preceding command, you should see the following screen:

![ngrok](/phone-verification-in-laravel-using-twilio/ngrok.jpg)

Take note of the forwarding URL (`http://159f-129-205-113-23.ngrok.io`) which will be use to access our application online. Now let us replace modify the `makeCall `method by adding the forwarding URL to our twilio URL. Open `app/Http/Controllers/AuthController.php`
```

use Twilio\Rest\Client;


public function makeCall($call_to) {
        $token = getenv("TWILIO_AUTH_TOKEN");
        $twilio_sid = getenv("TWILIO_SID");
        $twilio = new Client($twilio_sid, $token);
       
        $twilio->calls->create($call_to, // to
                        "+17122143185", // from
                        [
                            "url" => "http://159f-129-205-113-23.ngrok.io/build-twiml/user-input/".$call_to
                        ]
               );

    }

```
Now our application is ready. Visit ` http://159f-129-205-113-23.ngrok.io/registration ` to test the application

### Conlusion
In this tutorial, we have learnt how to use Laravel and twilio to interact with users and verify their phone number, collect input from a user during call, call a phone number from our application and implementing authentication. While we covered a lot in this tutorial, there are still numerous ways to engage your user in our application using the twilio services.

This project's code is all housed in this [GitHub repository](https://github.com/philzy94/phone-verification-in-laravel-using-twilio).

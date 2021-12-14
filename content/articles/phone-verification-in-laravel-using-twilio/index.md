
# Phone Verification Laravel Using Twilio

Almost every online registration that requires a user's phone number will verify the phone number's legitimacy in some way. In this article, we will learn how to verify phone number in [Laravel](https://laravel.com/docs/8.x) using [Twilio Programmable Voice API](https://www.twilio.com/docs/voice) by placing a call to the number and engaging the user.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Table of Contents](#table-of-contents-1)
- [Creating and Setting Up a New Laravel App](#creating-and-setting-up-a-new-laravel-app)
- [Setting Up Authentication (Controller, Routes, and Views)](#setting-up-authentication-controller-routes-and-views)
  - [Controller](#controller)
  - [Routes](#routes)
  - [Views](#views)
- [Database Migration](#database-migration)
- [Set Up Twilio](#set-up-twilio)
  - [Install Twilio’s SDK Using Composer](#install-twilios-sdk-using-composer)
- [Calling User's Phone Number](#calling-users-phone-number)
- [Instructing User, Collecting User Input, and Account Verification](#instructing-user-collecting-user-input-and-account-verification)
- [Exposing the Application](#exposing-the-application)
- [Conlusion](#conlusion)

### Prerequisites
To follow this tutorial, ensure that
- You are having an understanding of [PHP and Laravel](https://laravel.com/docs/8.x)
- Larave 8.x is install in your machine
- MySQL is install on your machine.
- [Composer](https://getcomposer.org/doc/00-intro.md) is globally install in your machine.
- You have a [Ngrok](https://ngrok.com/) account well set up.
- You have a working [Twilio ](https://www.twilio.com/)account.
- Your twilio number is verified (If you are in trial mode).
- You are having a [voice-enabled Twilio phone number]([url](https://www.twilio.com/console/phone-numbers/incoming))

### Creating and Setting Up a New Laravel App
We'll be using  the composer command to create a new Laravel installation. We do this by running the following command in our terminal: 

```
composer create-project laravel/laravel programmable-voice
```
To navigate to our project folder, run the bellow command on the same terminal

```
cd programmable-voice
```
Open the `.env` file and add the followng database credentials.
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=twilio
DB_USERNAME=root
DB_PASSWORD=
```
Using MYSQL database management application, create a new database called twilio and then run the following artisan command in your terminal
```
php artisan serve
```
If you followed all of the steps correctly, you should be able to see your new app in the browser by now when you visit `http://127.0.0.1:8000/` as shown below.

![larave home page](/phone-verification-in-laravel-using-twilio/laravel-index-page.jpg)

### Setting Up Authentication (Controller, Routes, and Views)
Now that we have set up the database credentials, we can now set up authentication (we will set up the authentication controller, routes, and views). We will be setting up laravel authentication manually.

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
We have now added all that we need to authenticate a user in our `app/Http/Controllers/Auth/AuthController.php`. Now, let us have an explanation of what each method in the Auth Controller does. 
- `index `method returns the `login` view.
- `registration` method returns the `registration` view
- `reverify` method returns the `verification` view. 
- `dashboard` method returns the `dashboard` view only if the user is authenticated, else it will redirect to the `login` with an error message. This is done using the `Auth::check()`. 
- `postRegistration` method saves all the user’s input and makes sure that the data provided by the user passes the validation check, it then redirects the user to the login page with a success message. 
- `postLogin` method authenticates the user base on the credentials provided by the user and the verification status. this uses the `Auth::attempt($credentials)`.
- `logout` method logs the user out and also clears the session using the `Session::flush()`

#### Routes
We need to add how routes to enable users to navigate through pages in our application. Add the following code to `routes/web.php`

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

This enables users to navigate through pages in our application.

#### Views
We now want to include the authentication view. Create a folder inside the views folder and call it auth. All authentication views will be in auth folder except for `dashboard.blade.php` and `layout.blade.php` that will be in the views folder.

Open `resources/views` create a new file and name it `layout.blade.php`. open the file `resources/views/layout.blade.php` and include the following code.

`resources/views/layout.blade.php` 

```
<!DOCTYPE html>

<html>

<head>

    <title>Phone verification</title>

</head>

<body>
<div>

    <div>

        <a>Phone Verification</a>

        <div id="navbarSupportedContent">

            <ul>

                @guest

                    <li>

                        <a href="{{ route('login') }}">Login</a>

                    </li>

                    <li>

                        <a href="{{ route('register') }}">Register</a>

                    </li>

                @else

                    <li>

                        <a class href="{{ route('logout') }}">Logout</a>

                    </li>

                @endguest

            </ul>

        </div>

    </div>

</div> 

@yield('content')

</body>

</html>
```

The `layout.blade.php` view provides a layout or design that is shared across other blade views to avoid the repetition of code.

In `resources/views/auth` create a new file and name it `Login.blade.php`. open `resources/views/auth/Login.blade.php` and include the following code.

```

@extends('layout')

@section('content')
<div class="main-div">

    <h2>LOGIN</h2>

@if (Session::has('errors'))

                        <div class="error-flag">

                            {{ Session::get('errors')->first() }}

                        </div>

                    @endif

                    @if (Session('status'))

                        <div>

                            Your account has not been verified, click the verify button to verify account

                            <a href= "{{ route('reverify') }}">Verify</a>



                        </div>                        



                    @endif



                    @if(session('success'))

                        <div> 

                            Your Verification code is <strong>{{session('success')}}</strong> 

                            Please answer the call and follow the intruction. You can login on successful registration

                            <a href= "{{ route('reverify') }}">Try again</a>

                        </div>

                    @endif

    

                    <form action="{{ route('login.post') }}" method="POST">

                          @csrf

                          <div>

                              <label>Phone Number</label>

                              <div>

                                  <input type="number" name="phone_number" required> <br/>

                                  @if ($errors->has('phone_number'))

                                      <span>{{ $errors->first('phone_number') }}</span>

                                  @endif



                              </div>

                              

                          </div>

  

                          <div>

                              <label>Password</label>

                              <div>

                                  <input type="password" name="password" required> <br/>

                                  @if ($errors->has('password'))

                                      <span> {{$errors->first('password')}} </span>

                                  @endif

                              </div>

                          </div>                        

                     

                          <div class="">

                              <button type="submit">

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

<div>

    <h2>REGISTRATION</h2>

                    <form action="{{ route('register.post') }}" method="POST">

                          @csrf

                          <div>

                              <label>Name</label>

                              <div>

                                  <input type="text" name="name" required><br/>

                                  @if ($errors->has('name'))

                                      <span>{{ $errors->first('name') }}</span>

                                  @endif

                              </div>

                          </div>
                          <div>

                              <label >Phone Number</label>

                              <div>

                                  <input type="number" name="phone_number" required><br/>

                                  @if ($errors->has('phone_number'))

                                      <span>{{ $errors->first('phone_number') }}</span>

                                  @endif

                              </div>

                          </div>

  

                          <div>

                              <label>Password</label>

                              <div>

                                  <input type="password" name="password" required> <br/>

                                  @if ($errors->has('password'))

                                      <span>{{ $errors->first('password') }}</span>

                                  @endif

                              </div>

                          </div>

                          <div class="">

                              <button type="submit">

                                  Register

                              </button>

                          </div>

                         

                      </form>               

                </div>



@endsection
```
This is the registration view which provides a registration form to the user and also collects the input of the user and sends it to `postRegistration` method for processing. The user is redirected to the login page if registration is successful, else it displays an error message.

Open `resources/views/auth`, create a new file, and name it `verification.blade.php`. open the file `resources/views/auth/verification.blade.php` and include the following code.

```
@extends('layout')

  @section('content')

<main>

  <div>

      

          

                  <h2>Phone Verification</h2>

                  

  

                  <form action="{{ route('reverify.post') }}" method="POST">

                          @csrf

                          <div>

                              <label for="phone_number">enter your registered Phone Number</label>

                              <div>

                                  <input type="number" id="phone_number" name="phone_number" required autofocus>

                                  @if ($errors->has('phone_number'))

                                      <span>{{ $errors->first('phone_number') }}</span>

                                  @endif

                              </div>

                          </div>
                          <div>
                          <div>

                              <button type="submit">

                                  Verify

                              </button>

                          </div>

                      </form>

                  </div>



</main>

@endsection

```

This view allows only one input which is the user's phone number. when a user register but not verified and he tries to login, he/she will be redirected to this page asking theuser to verify the phone number by providing their registered phone number.

Open `resources/views/`, create a new file and name it `dashboard.blade.php`. open the file `resources/views/dashboard.blade.php` and include the following code.

```
@extends('layout')

@section('content')

<div>

    <h2 >DASHBOARD</h2>

                    @if (session('success'))

                        <h3 >

                            {{ session('success') }}

                        </h3>

                    @endif



                    Welocome <strong>{{auth()->user()->name}}</strong> You are Logged In

                    </div>
@endsection
```
The `dashboard.blade.php` is where the user will be redirected to once he/she is authenticated. This view can only be accessed if the user is authenticated.

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

        $twilio_token = getenv("TWILIO_AUTH_TOKEN");

        $twilio_sid_token = getenv("TWILIO_SID");

        $twilio_client = new Client($twilio_sid_token, $twilio_token);
        $twilio_client->calls->create($call_to, // to

                        "+17122145457", // from

                        [

                            "url" => " http://localhost:8000/build-twiml/user-input/".$call_to

                        ]
               );

    }
```
This is where we call the user and instruct him on what to do. Using the credentials we saved in` .env` earlier, we create a client to help us communicate with Twilio's API. It is essential at this point to understand Twilio's Programmable Voice API. There are three parameters that can be passed into the create method:

- The first parameter is the phone number that will be dialed. This will be the user's registered phone number in our case. You must have to verify your phone number if you are on trial mode.

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
### Instructing User, Collecting User Input, and Account Verification
At this stage, we have done a lot, but we are yet to instruct the user on what to do when he/she receives the call, collect the user input and verify the user account. Let's use artisan to quickly create a controller that handles this. Execute this command:

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
        $twilioResponse = new VoiceResponse();

        $twilioResponse->say("Hello, thank you for registering with us.");

        $gather = $twilioResponse->gather([

            'action' => '/build-twiml/'.$call_to. '/verification',

            'numDigits' => 6,

            'timeout'=>10, 

        ]);

        $gather->say("Please enter the six digits verification code that is currently displaying on your screen to verify your phone number");

        $twilioResponse->say('Sorry. You did not respond and your account can not be verify. Goodbye');

        $twilioResponse->hangup();        

        echo $twilioResponse;

    }

    public function verifyNumber($call_to)

    {
        $user = User::where('phone_number', $call_to)->first();

        $code = $_POST['Digits'];

        $twilioResponse = new VoiceResponse();       

        if($_POST['Digits'] == $user->verification_code){

            $emailNumber= User::where('phone_number', $call_to)->update(['isVerified' => true]);

            if($emailNumber){

            $twilioResponse->say('You account has been verified. Goodbye');                

            }

            else{

                $twilioResponse->say('An error accured while trying to verify your account. Please try again.');

                $twilioResponse->redirect('/build-twiml/user-input/'.$call_to);

            }

        }

        else{

            $twilioResponse->say('You entered a wrong verification, and your account can not be verified. Goodbye');

        }  

        echo $twilioResponse;

    }

}
```
if you take a look at the preceding code more closely. The class now has two new methods, each with a specific use case, but both of them use the Twilio SDK's `VoiceResponse()` class to construct the TwiML response. The `userInput` method does the magic of giving instruction to the user on what to do and also collecting use keypad input after which it sends a request with the collected data to a specified URL while the `verifyNumber `method does the phone number verification using the collected data from `userInput` method. The `VoiceResponse()` class has some methods that are used to interact with the user which are as follows.

- The `say() `method takes a string and read text to the user

- The `gather()` method collects digits the user types on their keypad. The gather method also contains some methods which are used to control the flow of your call, but in our case, we only use the say() method. The gather() method accepts an optional argument in the form of an associative array containing several attributes that can be used to alter how the `gather()` method behaves. The value of the action attribute should be a valid URL that Twilio will call after the user has finished entering a value. The numDigits attribute takes a number as an argument to specify the maximum number of characters to accept before calling the action attribute's URL. The timeout attribute sets the waiting time of the application before the URL set in the action attribute gets called.

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
### Exposing the Application
At this level, for us to have a perfectly working application, our application needs to be accessible online. lucky for us, the possibility can be achieved with ngrok. You can learn how to [set up ngrok](https://ngrok.com/docs) from their official doc. Let’s start the laravel application by opening the terminal and navigating to the application folder, then enter the following commands:

```
php artisan serve
```
The Laravel application will start running on the local machine on a specific port (8000 in my case), which will be displayed to the terminal after a successful execution. The ngrok executable file terminal can then be launched and used to make our application accessible in the internet:

```
ngrok http 8000
```
The below screen should display if the execution is successful:

![ngrok](/phone-verification-in-laravel-using-twilio/ngrok.jpg)

Take note of the forwarding URL (`http://159f-129-205-113-23.ngrok.io`) which will be used to access our application online. Now let us replace modify the `makeCall `method by adding the forwarding URL to our twilio URL. Open `app/Http/Controllers/AuthController.php`

```
use Twilio\Rest\Client;

public function makeCall($call_to) {

        $twilio_token = getenv("TWILIO_AUTH_TOKEN");

        $twilio_sid_token = getenv("TWILIO_SID");

        $twilio_client = new Client($twilio_sid_token, $twilio_token);

        $twilio_client->calls->create($call_to, // to

                        "+17122143185", // from
                        [
                            "url" => "http://159f-129-205-113-23.ngrok.io/build-twiml/user-input/".$call_to

                        ]

               );

    }

```
Now our application is ready. Visit ` http://159f-129-205-113-23.ngrok.io/registration ` to test the application

### Conlusion
In this tutorial, we have learned how to use Laravel and twilio to interact with users and verify their phone numbers, collect input from a user during the call, call a phone number from our application, and implement authentication. Despite the much we have covered, there are still numerous ways to engage your user in our application using the Twilio services.

This project's code is all housed in this [GitHub repository](https://github.com/philzy94/phone-verification-in-laravel-using-twilio).

Have a wonderful coding experience. 



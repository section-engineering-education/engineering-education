---
layout: engineering-education
status: publish
published: true
url: /custom-api-with-kotlin-mvvm/
title: Custom Django API with Kotlin MVVM
description: In this article, we will build an authentication API using the Django rest framework and consume the API in an android application following the MVVM pattern.
author: jerim-kaura
date: 2022-05-31T00:00:00-09:00
topics: [API]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/custom-api-with-kotlin-mvvm/hero.png
   alt: Custom Django API with Kotlin MVVM example image
---
Django rest framework is a powerful tool for developing web APIs. It provides developers with great flexibility and abstraction that achieves great functionalities; in just a few lines of code. As a result, developers currently adopt it with the added advantage of providing the browsable API.
<!--more-->
Model-View-ViewModel (MVVM) is a design pattern that separates the program logic from the user interface operations. The pattern is adapted for its ease in unit testing, modularity and code organization for comfort in debugging.

In this article, we will build an authentication API using the Django rest framework and consume the API in an Android application following the MVVM pattern.

### Prerequisites
To follow along with this article, the reader should have the following:
- Basic understanding of Android programming.
- Working with the Django Framework and the [REST Framework](https://www.django-rest-framework.org/)
- Knowledge about [Kotlin programming](https://developer.android.com/kotlin?gclsrc=aw.ds).
- [Android Studio](https://developer.android.com/studio?gclsrc=aw.ds)
- Pycharm or Visual Studio Code

### Important Points to Note
This tutorial is relatively long, but I made it to cover what I thought was best. However, from my point of view, here are some of the vital things to note.
- When working with `dagger hilt` for dependency injection, ensure that you annotate every activity, fragment and ViewModel correctly; otherwise, the application will not run.
- If you are not interested in building the API, you can skip to the mobile part [here.](#setting-up-the-android-application)
- The code snippet for the API is in [this repository](https://github.com/jerimkaura/auth-project), while the code for the mobile application is [here](https://github.com/jerimkaura/Authy).

### Building the API
An Application Programming Interface (API) is how an application can communicate with another application. For instance, we use an API if we have a back-end application that we wish to send and receive data from another back-end or front-end application.

We will use Django and REST Framework to build an authentication API whose data will be consumed in the Kotlin application.

To start, create a virtual environment and a new Django application. I called my application  `Authy`.
You can read the entire procedure of creating a Django application [here](https://docs.djangoproject.com/en/4.0/intro/tutorial01/).

```bash
Django-admin start project authy
```

A Django project can have multiple applications within it. For instance, our tutorial will cover the authentication part, which we can call an independent application( Who knows, a second part might come where we use a second application 😊).

To create a new application in a Django project, run the following command in the terminal.

```bash
python manage.py startapp accounts
```

The command above creates a new directory with the folder structure as shown below:

```bash
├── accounts
│   ├── __pycache__
│   ├── migrations
│   ├── templates
│   ├── __init__.py
│   ├── admin.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
```

In the `settings.py` file in the initial directory, add the created application under the installed apps as shown below:

```py
# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'accounts'
]
```

#### Installing dependencies
We will use various dependencies to achieve the intended functionality. However, we will not use the `requirements.txt` file to manage our dependencies this time. Instead, we will use **Poetry**.

[Poetry](https://python-poetry.org/) is a dependency management tool that, besides being very deterministic, ensures that the dependencies are locked; therefore, they cannot update themselves.

To install Poetry, run the following command in your terminal:

```bash
curl -SSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
```

You can use `pip` to install poetry, but the most recommended way is the one shown above.

Next, create a file in the root folder of the application folder called `pyproject.toml`. 

We will install the following dependencies:
- **djangorestframework**. To build a scalable authentication API.
- **psycopg2**. To connect to the Postgres database.
- **Python-dotenv**. To configure the environmental variables.
- **python-decouple**. To work with the environment variables so that we do not have to re-deploy the application every time we change an environment variable.
- **djangorestframework-simplejwt**. To provide authentication tokens for user authentication.

If you need to install a dependency, you use the command `poetry add dependency name`. For instance, we will run the following command to install `djangorestframework`:

```bash
poetry add djangorestframework
```

#### Configuring Django Settings
We will work on the `settings.py` file in the main project folder in this step.

First, add the installed dependencies in the `installed-apps` sections below.

```py
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third party libraries
    "rest_framework",
    "rest_framework.authtoken",

    # Project applications
    "accounts",
]
```

Next, we configure our database so that the application can connect to the Postgres database. Take note that you have to have Postgres installed for this to work.

Run the following command in the Postgres terminal to set up the database.

```py
sudo -u postgres createdb authy
sudo -u postgres psql -c "CREATE USER authy_user WITH PASSWORD '@Admin_Authy';";
sudo -u postgres psql -c "ALTER ROLE authy_user SET client_encoding TO 'utf8';";
sudo -u postgres psql -c "ALTER ROLE authy_user SET default_transaction_isolation TO 'read committed';";
sudo -u postgres psql -c "ALTER ROLE authy_user SET timezone TO 'UTC';";
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE authy TO authy_user;"
```

Next, in the settings.py file, add the following snippet under the database section.

```py
# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("DB_NAME"),
        "USER": config("DB_USERNAME"),
        "PASSWORD": config("DB_PASSWORD"),
        "HOST": config("DB_HOST"),
        "PORT": "5432",
    }
}
```

Next, we must create our `.env` file to store our environmental files. In the same folder as `settings.py`, create a new file called `.env` and add the following snippet.

```bash
DB_NAME=authy
DB_USERNAME=authy_user
DB_PASSWORD=@Admin_Authy
DB_HOST=127.0.0.1
SECRET_KEY='YOUR DJANGO SECRET KEY'
DEBUG=True
```

### Working on the Models
Add the following snippets in the `models` file in the `accounts` folder.

```py
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models

from common.managers import CustomUserManager

PHONE_NUMBER_REGEX = RegexValidator(
    r"(254|0)(1|7)([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])",
    "Phone number should be in the format 254712234345",
)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    phonenumber = models.CharField(validators=[PHONE_NUMBER_REGEX], max_length=12)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
```

We are creating a custom `User` class that extends the default `User` class that comes with Django. We do this to use the Django default authentication but modifications to suit our needs.

Next, create a custom user manager that facilitates the user creation process. We need this because we already modified the default User class, so we also need to alter the managers.
 
Create a file in the `common` folder and name it `manager.py`, then add the snippets below:

```py
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of the username.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)
```


###  Working on the Serializers
Serializers allow data from the Postgres database to be converted into data objects that Django can easily understand. The most common data object used in this case is the Javascript Object Notation (JSON).

Create a new file in the `accounts` directory and name it `serializers.py`. We will write our serializer classes in this file.

Add the snippets below to the serializer file.

```py
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accounts.models import User

```


#### User Serializer
The user serializer is responsible for creating users.

```py
class UserSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating users"""

    password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password", "placeholder": "Password"},
    )

    class Meta:
        model = User
        fields = ("firstname", "lastname", "phonenumber", "email", "password")

    def create(self, validated_data, **kwargs):
        """
        Overriding the default create method of the Model serializer.
        """
        print(validated_data)
        user = User(
            email=validated_data["email"],
            firstname=validated_data["firstname"],
            lastname=validated_data["lastname"],
            phonenumber=validated_data["phonenumber"],
        )
        password = validated_data["password"]
        user.set_password(password)
        user.save()
        return user
```

#### Login Serializer
This serializer is responsible for logging in and returning the logged-in user details. Notice how we update the response with the required user details.

```py
class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(LoginSerializer, self).validate(attrs)

        # Custom data included in the response
        data.update({"id": self.user.id})
        data.update({"email": self.user.email})
        data.update({"firstname": self.user.firstname})
        data.update({"lastname": self.user.lastname})
        data.update({"phonenumber": self.user.phonenumber})
        return data
```

#### Update profile serializer
This serializer enables a user to update information about their account. 

```py
class UpdateUserSerializer(serializers.ModelSerializer):
    """
    Serializer to update the information of a logged-in user
    """

    class Meta:
        model = User
        fields = ("firstname", "lastname", "phonenumber")

    def update(self, instance, validated_data):
        user = self.context["request"].user
        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "You dont have permission for this user."})
        instance.firstname = validated_data["firstname"]
        instance.lastname = validated_data["lastname"]
        instance.phonenumber = validated_data["phonenumber"]
        instance.save()
        return instance
```

### Change Password Serializer
This class enables one to change their password. Note that the user sending the request must be the same user whose password is to be changed. 

```py
class ChangePasswordSerializer(serializers.ModelSerializer):
    """
    Change the password of the user.
    """

    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ("password", "password2")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def update(self, instance, validated_data):
        user = self.context["request"].user
        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "You dont have permission for this user."})
        instance.set_password(validated_data["password"])
        instance.save()
        return instance
```

### Building the Views
Views are responsible for receiving a request to access a resource and, depending on the URL specified by the request, retrieve the resource and return a response. 

Whether the request is successful, the view returns data or an error with some status code.

In the views.py file, import the required libraries and packages as shown below:

```py
from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.models import User
from accounts.serializers import ChangePasswordSerializer, LoginSerializer, UpdateUserSerializer, UserSerializer
```

We will create views corresponding to each of the serializers we created earlier. 

#### User registration view
This view provides the user with an interface to submit registration data in JSON format for creating a new account. It takes the user models and the `UserSerializer` to convert the data into an object storable in the Postgres Database.

```py
class UserRegistrationView(generics.CreateAPIView):
    """
    User registration view.
    """

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        """
        Post request to register a user
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "User": UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )
```

#### Update profile View
In this view, a user can update his profile information.

```py

class UpdateProfileView(generics.UpdateAPIView):
    """
    An endpoint to update the profile of a logged-in user
    """

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer
```

#### Change password View
This view provides the user with an endpoint to update his account password.

```py
class ChangePasswordView(generics.UpdateAPIView):
    """
    A view to change the password of a user.
    """

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer
```

#### Login View
This endpoint facilitates login and returns a pair of tokens; access and refresh. Access token ensures a user is authenticated before accessing any endpoint. You can find more about [jwt tokens here]()

```py
class LoginView(TokenObtainPairView):
    """
    Client login endpoint.
    """

    serializer_class = LoginSerializer
```

### Working on the URLs
URLs specify what view should handle a given request. Therefore, each request sent must be channelled to a specific URL to be directed to a view.

In the `urls.py` of the `accounts` folder, add the following snippets.
```py
from Django.URLs import path

from .views import ChangePasswordView, LoginView, UpdateProfileView, UserRegistrationView

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("update-profile/<int:pk>/", UpdateProfileView.as_view(), name="update-profile"),
    path(
        "change-password/<int:pk>/",
        ChangePasswordView.as_view(),
        name="change-password",
    ),
]

```

Then, in the main project folder, add the following line of code to access the `accounts` application URLs from the main project URLs.

```py
from Django.contrib import admin
from Django.URLs import, include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("accounts.urls")),
]
```

Right now, our endpoints are working, as shown below. You can skip the API building process by 

1. Register User Endpoint

![Register User Endpoint](/engineering-education/custom-api-with-kotlin-mvvm/register-endpoint.png)

2. Login Endpoint

![Login Endpoint](/engineering-education/custom-api-with-kotlin-mvvm/login-endpoint.png)

3. Update Update Endpoint

![Update Update Endpoint](/engineering-education/custom-api-with-kotlin-mvvm/update-profile-endpoint.png)


In the next section, we will setup up the android application and consume the API endpoint in the android application.

### Setting up the Android Application
To get started, create a new Android Studio Project. Select the language as Kotlin and the API level as 21. 

Next, we will install the various dependencies we need to use in this tutorial. Open the app level Gradle file and paste the following lines of code the sync to install the dependencies.

```gradle
    //Dagger Hilt for dependency injection
    implementation "com.google.dagger:hilt-android:2.39.1"
    kapt "com.google.dagger:hilt-android-compiler:2.38.1"
    implementation "androidx.hilt:hilt-lifecycle-viewmodel:1.0.0-alpha03"
    kapt "androidx.hilt:hilt-compiler:1.0.0"
    
    //Retrofit and network calls and GSON
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:okhttp:5.0.0-alpha.2'
    implementation 'com.squareup.okhttp3:logging-interceptor:5.0.0-alpha.2'
    implementation 'com.google.code.gson:gson:2.8.6'

    //  Retrofit and network calls and GSON
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'


    // Kotlin Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.6.0'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.0'

    // View Model and Live data
    implementation group: 'androidx.lifecycle', name: 'lifecycle-extensions', version: '2.2.0'

    // Material Design
    implementation 'com.google.android.material:material:1.5.0.'

    // Android navigation architecture
    implementation "androidx.navigation:navigation-fragment-ktx:2.4.1"
    implementation "androidx.navigation:navigation-ui-ktx:2.4.1"
    implementation "androidx.viewpager2:viewpager2:1.0.0"

    //circular image view
    implementation 'de.hdodenhof:circleimageview:3.1.0'
```

In the same file, add the following lines of code under the plugins.

```gradle
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'kotlin-kapt'
    id 'dagger.hilt.android.plugin'
    id 'androidx.navigation.safeargs.kotlin'
}
```

In the project level Gradle file, add the following code snippet:

```gradle
// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:7.1.2'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.6.10"
        classpath "com.google.dagger:hilt-android-gradle-plugin:2.40.5"
        classpath("androidx.navigation:navigation-safe-args-gradle-plugin:2.4.1")

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.Gradle files
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

### Folder organization
The correct folder organization is not only efficient when dealing with an extensive application but also makes your code clean and debuggable.

If used as a standard, every other android programmer will find it easy to read your code. Therefore, we will adopt the following folder organization in this tutorial.

![Folder organization](/engineering-education/custom-api-with-kotlin-mvvm/folder-organization.png)

### Working on the Utility Classes
Utility classes are classes used in more than one instance of the application. 

I prefer creating the separately to code in line with the DRY principle. In this case, we will have three utility classes defined in the `util` folder.

![utilities](/engineering-education/custom-api-with-kotlin-mvvm/utils.png)

#### Constants
This file contains data whose values are not changing in the entire application. For now, here is where we store our `BASE URL`.

```kotlin
object Constants {
    const val BASE_URL:String = "YOUR BASE URL"
}
```

#### Datastate
This sealed class determines the state of data in response through the response lifetime.

```kotlin
sealed class Resource<T>(val data: T? = null, val message: String? = null) {
    class Success<T>(data: T) : Resource<T>(data)
    class Error<T>(message: String, data: T? = null) : Resource<T>(data, message)
    class Loading<T>(data: T? = null) : Resource<T>(data)
}
```

#### Toast
We will use this class to show toast messages to the user on the screen. Instead of writing the pieces of code every time, we abstract it like below:

```kotlin
fun showToast(
    context: Context,
    message: String,
    length: Int = Toast.LENGTH_SHORT
) {
    Toast.makeText(context, message, length).show()
}
```

In every instance where we use the `showToast`, we will only pass the `context` and the `message`.


### Building the Requests and Responses
We need to create various classes that match the requests we send and the responses we intend to get from the requests sent. In our case, we will have two requests and two responses.

Kotlin allows us to create the requests and response classes from JSON with ease using the JSON to Kotlin plugin available in the plugin section.

The requests and responses needed to build these classes are obtained from the requests we sent in Postman, after which android studio will automatically create the classes for us.

Create a new folder called `data` in the `network` directory. Next, create two other folders called `requests` and `responses`. The first folder will contain the request classes, while the second will contain the response classes.

![Network](/engineering-education/custom-api-with-kotlin-mvvm/network.png)


#### Register Request
```kotlin
data class RegisterRequest(
    @SerializedName("email")
    val email: String,
    @SerializedName("firstname")
    val firstname: String,
    @SerializedName("lastname")
    val lastname: String,
    @SerializedName("password")
    val password: String,
    @SerializedName("phonenumber")
    val phonenumber: String
)
```

#### Register Response
```kotlin
data class RegisterResponse(
    @SerializedName("User")
    val user: User
)
```

#### Login Request
```kotlin
data class LoginRequest(
    @SerializedName("email")
    val email: String,
    @SerializedName("password")
    val password: String
)
```

#### Login Response
```kotlin
data class LoginResponse(
    @SerializedName("access")
    val access: String,
    @SerializedName("email")
    val email: String,
    @SerializedName("firstname")
    val firstname: String,
    @SerializedName("id")
    val id: Int,
    @SerializedName("lastname")
    val lastname: String,
    @SerializedName("phonenumber")
    val phonenumber: String,
    @SerializedName("refresh")
    val refresh: String
)
```

![Requests and responses](/engineering-education/custom-api-with-kotlin-mvvm/requests-and-responses.png)

#### User Data Class
An additional class called `User` was created when we received a `registerResponse`. This process happens when you have nested JSON objects. Android Studio creates different classes for every level of nesting as it did for the case of register response.

```kotlin
data class User(
    @SerializedName("email")
    val email: String,
    @SerializedName("firstname")
    val firstname: String,
    @SerializedName("lastname")
    val lastname: String,
    @SerializedName("phonenumber")
    val phonenumber: String
)
```

### The API endpoints
In the same directory as the request and response folders, create a new interface called `AuthyAPI`, then add the following code snippets.

```kotlin
interface AuthyApi {
    companion object{
        const val REGISTER = "accounts/register/"
        const val LOGIN = "accounts/login/"
    }

    @POST(REGISTER)
    suspend fun register(@Body registerRequest: RegisterRequest): RegisterResponse

    @POST(LOGIN)
    suspend fun login(@Body loginRequest: LoginRequest): LoginResponse
}
```

### Dependency Injection Setup
A dependency is an object or a class that can be used by an application to perform a specific task. Dependency Injection is the process whereby when one object needs one dependency; it gets provided automatically instead of the object creating it by itself. In the end, the dependency is created once and can be re-used multiple times.

#### The Application Module
This module contains dependencies used across the application. To set up the application module, create a new class and add the snippets below:

```kotlin
@Module
@InstallIn(SingletonComponent::class)
class ApplicationModule {

}
```

The various dependencies defined in this class are as discussed below:

**1. GsonBuilder**
This dependency allows the conversion of Kotlin data objects into JSON and vice versa.

```kotlin
@Singleton
@Provides
fun provideGsonBuilder(): Gson {
    return GsonBuilder()
        .create()
}
```

**2. Retrofit**
Retrofit is used to make network class to the remote API.

```kotlin
@Singleton
@Provides
fun provideRetrofit(
    gson: Gson,
    okHttpClient: OkHttpClient
): Retrofit.Builder {
    return Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create(gson))
        .client(okHttpClient)

}
```

**3. The API service**
The API service comes from our instance of the API built using Retrofit. We initialize it here to be used across the entire application.

```kotlin
@Singleton
@Provides
fun provideAuthyService(retrofit: Retrofit.Builder): AuthyApi {
    return retrofit
        .build()
        .create(AuthyApi::class.java)
}
```
 
**4. Interceptor**
The interceptor intercepts the API request and logs the responses on the console. The procedure is essential for debugging and determining the causes of the error that made a request fail.

```kotlin
@Singleton
@Provides
fun provideInterceptor(
    @ApplicationContext context: Context,
): OkHttpClient {
    val interceptor = HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY)
    return OkHttpClient.Builder()
        .addInterceptor(interceptor)
        .build()
}
```

Next, create a class called `AuthyApplication` in the root directory where the other folders reside and add the code snippets below:

```kotlin
@HiltAndroidApp
class AuthyApplication: Application()
```

![Dependency Injection](/engineering-education/custom-api-with-kotlin-mvvm/dependency-injection.png)

#### The Repository Module
Data from the network flows into the repository. For this reason, we need to make the repository accessible to other classes to avail its data.

Create a new class called `RepositoryModule`, then add the snippets below:

```kotlin
@Module
@InstallIn(SingletonComponent::class)
class RepositoryModule {
    @Singleton
    @Provides
    fun provideAuthRepository(api: AuthyApi): AuthRepository = AuthRepository(api)
}
```
The repository class referenced in the module is defined in the next step.


### Working on the application Domain
The `domain` folder contains two folders, the `AuthRepository` and the `usecases`. 

![Dormain folder](/engineering-education/custom-api-with-kotlin-mvvm/dormain.png)

#### The AuthRepository Class
The repository class specify how authentication data is obtained from the network and passed to the `ViewModel`. 

If the data were being obtained from a local database, we would still use this file for getting local data and passing it to the ViewModel.

The goal is to pass the data from the source to the viewModel without the viewModel knowing the source.

```kotlin
class AuthRepository @Inject constructor(
    private val api: AuthyApi
) {
    suspend fun register(request: RegisterRequest): RegisterResponse = api.register(request)
    suspend fun login(request: LoginRequest): LoginResponse = api.login(request)
}
```

#### UseCases
On the other hand, use cases pull the application's business logic into the `ViewModel`. They specify how the final user will interact with the application.

For now, we will have only use cases:

**1.RegisterUseCase**
```kotlin
class RegisterUserUseCase @Inject constructor(private val repository: AuthRepository){
    operator fun invoke(request: RegisterRequest): Flow<Resource<RegisterResponse>> = flow {
        try {
            emit(Resource.Loading())
            val response = repository.register(request)
            emit(Resource.Success(response))
        }catch (e: HttpException){
            emit(Resource.Error("An error occurred"))
        }catch (e: IOException){
            emit(Resource.Error("Check internet connection"))
        }
    }
}
```

**2. LoginUseCase**
```kotlin
class LoginUseCase @Inject constructor(private val repository: AuthRepository){
    operator fun invoke(request: LoginRequest): Flow<Resource<LoginResponse>> = flow {
        try {
            emit(Resource.Loading())
            val response = repository.login(request)
            emit(Resource.Success(response))
        } catch (e: HttpException) {
            emit(Resource.Error("An error occurred"))
        } catch (e: IOException) {
            emit(Resource.Error("No internet connection"))
        }
    }
}
```

> Ensure that each of the use cases exists in its folder. This practice makes the code readable and easy to follow.

![Dormain ans usecases](/engineering-education/custom-api-with-kotlin-mvvm/domain-and-usecases.png)

### The ViewModel and the UI entry point
The ViewModel is responsible for combining the result obtained from the use cases with the mobile screen onto which they will be displayed, accessed or used. Furthermore, it exposes the data to easily present it to the user screen.

In the `viewmodels`, create a file named `AuthViewModel` and add the snippets below:

```kotlin
@HiltViewModel
class AuthViewModel @Inject constructor(
    private val registerUserUseCase: RegisterUserUseCase,
    private val loginUseCase: LoginUseCase
) : ViewModel() {
    private val registerState: MutableLiveData<RegisterState> = MutableLiveData()
    val _registerState: LiveData<RegisterState>
        get() = registerState

    private val loginState: MutableLiveData<LoginState> = MutableLiveData()
    val _loginState: LiveData<LoginState>
        get() = loginState
}
```

In the snippet above, we use `MutableLiveData()` to observe and set the value of the `registerState`. However, after setting the value of the `registerState` to `_registerState`, we cannot change the value. 

So the `registerState` helps us observe the changes in the value of the registration state while `_registerState` tells us the final value that we pass to the desired view. The same is done for login.

The `RegisterState` and `LoginState` classes are defined to show the data state in response. For example, the data may be `loading`, `error` or `success`. The classes are defined in the view package.

**1. RegisterState**
```kotlin
class RegisterState (
    var isLoading:Boolean = false,
    var data: RegisterResponse? = null,
    var error: String = ""
)
```

**2. LoginState**
```kotlin
class LoginState (
    var isLoading:Boolean = false,
    var data: LoginResponse? = null,
    var error: String = ""
)
```

We need to define functions that pass data from the use cases to the ViewModel in the same file. We have two use cases, so we will also have two functions in the ViewModel.

#### Registration Funtion
This function gets data from the `registerUseCase` and passes it to the ViewModel used in an activity or fragment.

```kotlin
fun register(registerRequest: RegisterRequest){
    registerUserUseCase(registerRequest).onEach { result->
        when(result){
            is Resource.Success ->{
                registerState.value = RegisterState(data = result.data)
            }
            is Resource.Loading ->{
                registerState.value = RegisterState(isLoading = true)
            }
            is Resource.Error -> {
                registerState.value = result.message?.let { RegisterState(error = it) }
            }
        }
    }.launchIn(viewModelScope)
}
```

#### Login Function
Like the registration function, this performs the same action but for login.

```kotlin
fun login(loginRequest: LoginRequest){
    loginUseCase(loginRequest).onEach { result ->
        when(result){
            is Resource.Success ->{
                loginState.value = LoginState(data = result.data)
            }

            is Resource.Loading -> {
                loginState.value = LoginState(isLoading = true)
            }

            is Resource.Error -> {
                loginState.value = result.message?.let { LoginState(error = it) }
            }
        }
    }.launchIn(viewModelScope)
}
```

### The User Interface
I like separating my user interface into fragments. In this case, I will have two activities and two fragments. The first activity will contain the two fragments, while the next will exist on its own.

Create two other folders called `authentication` and `homepage` in the view package. Create a new activity named `AuthAcvtivity` in the' authentication' folder. Create other two fragments in the same folder called `LoginFragment` and `RegisterFragment`.

![view package](/engineering-education/custom-api-with-kotlin-mvvm/view-package.png)

Add the following code in the `AuthActivity` file:

```kotlin
@AndroidEntryPoint
class AuthActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_auth)
    }
}
```

#### Registration Fragment
Since the two fragments have almost similar code, I will explain just one because the rest work similarly. We need to instantiate the `authViewModel` class that we defined in the `ViewModel`.

```kotlin
class RegisterFragment : Fragment() {
    private val authViewModel: AuthViewModel by viewModels()
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.register, container, false)

        return view
    }
}
```

Next, on the `onCreateView` function, we need to get the `registerButton` from the respective layout file. You can find the layout file [here](https://github.com/jerimkaura/Authy/blob/master/app/src/main/res/layout/fragment_register.xml).

```kotlin
val registerButton = view.findViewById<Button>(R.id.register_button)
```

Next, we set an `OnClickListener` to the button to get the text input of the values we need to register a user. Finally, we must validate the values before being passed to the `LoginRequest.`

```kotlin
registerButton.setOnClickListener{
    val firstname = view.findViewById<TextInputEditText>(R.id.te_firstname).text.toString()
    val lastname = view.findViewById<TextInputEditText>(R.id.te_lastname).text.toString()
    val email = view.findViewById<TextInputEditText>(R.id.te_email).text.toString()
    val phoneNumber = view.findViewById<TextInputEditText>(R.id.te_phone_number).text.toString()
    val password1 = view.findViewById<TextInputEditText>(R.id.te_password).text.toString()
    val password2 = view.findViewById<TextInputEditText>(R.id.te_confirm_password).text.toString()

    if(firstname.isBlank()){
        showToast(requireContext(), "Firstname required")
    }else if (lastname.isBlank()){
        showToast(requireContext(), "Lastname required")
    }else if (email.isBlank()){
        showToast(requireContext(), "Email Required")
    }else if(!Patterns.EMAIL_ADDRESS.matcher(email).matches()){
        showToast(requireContext(), "Enter a valid email address")
    }else if(phoneNumber.isBlank()){
        showToast(requireContext(), "Phone number required")
    }else if(password1.isBlank()){
        showToast(requireContext(), "Password Required")
    }else if (password2.isBlank()){
        showToast(requireContext(),"Confirmation required")
    }else if (password1 !=password2){
        showToast(requireContext(), "Passwords do not match")
    }else{
        val registerRequest = RegisterRequest(email, firstname, lastname, password1, phoneNumber)
        authViewModel.register(registerRequest)
        observerRegister()
    }
}
```

The `observeRegister` function observes the state of the registration request. Depending on the state, it determines what is to be done on the screen. We can return an error message, loading state, or navigate the `HomeActivity` in case of success.

```kotlin
private fun observerRegister() {
    authViewModel._registerState.observe(requireActivity()) { result ->
        if (result.isLoading) {
            showToast(requireContext(), "Loading ...")
        }else if (result.data != null && !result.isLoading){
            showToast(requireContext(), "Registration successful $result")
            startActivity(Intent(requireContext(), HomeActivity::class.java))
        } else if (result.error !="") {
            showToast(requireContext(), "Registration Failure $result")
        }

    }
}
```

#### Login Fragment
The snippet below shows how we built the LoginFragment. You can find the layout file [here.](https://github.com/jerimkaura/Authy/blob/master/app/src/main/res/layout/fragment_login.xml)
```kotlin
@AndroidEntryPoint
class LoginFragment : Fragment() {
    private val authViewModel: AuthViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_login, container, false)
        val loginButton = view.findViewById<Button>(R.id.login_button)
        view.findViewById<TextView>(R.id.login_fragment_register_text)

        loginButton.setOnClickListener {
            val email = view.findViewById<EditText>(R.id.te_email).text.toString()
            val password = view.findViewById<EditText>(R.id.te_password).text.toString()
            if (email.isEmpty()) {
                showToast(requireContext(), "Email number required")
            } else if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                showToast(requireContext(), "Enter a valid email")
            } else if (password.isEmpty()) {
                showToast(requireContext(), "Password required")
            } else {
                val loginRequest = LoginRequest(email, password)
                authViewModel.login(loginRequest)
                observeLogin()
            }
        }
        return view
    }

    private fun observeLogin() {
        authViewModel._loginState.observe(requireActivity()) { data ->
            when {
                data.isLoading -> {
                    showToast(requireContext(), "Loading...")
                }
                data.data != null -> {
                    showToast(requireContext(), "Login successful $data")
                    startActivity(Intent(requireContext(), HomeActivity::class.java))
                }
                else -> {
                    showToast(requireContext(), "Login Failure ${data.error}")
                }
            }

        }
    }
}
```

The `HomeActivity` does not have much, you can find its layout file [here](https://github.com/jerimkaura/Authy/blob/master/app/src/main/res/layout/fragment_login.xml), but the code snippet is shown below:

```kotlin
@AndroidEntryPoint
class HomeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
    }
}
```

### Running the application
The following should illustrate how the custom REST api is consumed in our auth application upon running the application.

1. Splash Screen
![Splash Screen](/engineering-education/custom-api-with-kotlin-mvvm/splashscreen.png)

2. Register Screen
![Register Screen](/engineering-education/custom-api-with-kotlin-mvvm/register-screen.png)

3. Login Screen
![Login Screen](/engineering-education/custom-api-with-kotlin-mvvm/login-screen.png)

4. Home Screen
![Home screen](/engineering-education/custom-api-with-kotlin-mvvm/home-screen.png)


### Conclusion
This tutorial walked the reader through consuming a custom Django authentication API using the Kotlin MVVM design pattern. We built an authentication API from scratch and consumed the endpoints in the Kotlin android application. Along the way, we discussed the benefits of writing clean and maintainable code.

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)

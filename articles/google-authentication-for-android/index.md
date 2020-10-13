### Google authentication in Android applications
This guide will go over integrating Google authentication in android applications.

### Introduction.
**Authentication** is the process of signing up a user in applications. 
Authentication enables companies to keep their resources secure by restricting access only to authenticated users. User Authentication is done in various ways.
Third-party authentication and filling forms are the most popular.
In 2019, one of the top ten User Experience (UX) trends were using third-party authentication options like Google, Facebook, Twitter, GitHub, etc. This was due to the minimized effort and time required to authenticate a user.

## Terminologies
* Authentication- The process of signing up a user in applications.
* [Firebase](https://firebase.google.com/)- A platform developed by Google for creating mobile and web applications. 
* [Dependency](https://developer.android.com/studio/build/dependencies)-  A statement SDK that allow us to add external libraries into our projects.
* [Json](https://www.json.org/json-en.html)- (JavaScript Object Notation) is a lightweight, human-readable, data-interchange open standard used in Software applications.
* [FirebaseAuth](https://firebase.google.com/docs/auth#:~:text=Firebase%20Authentication%20provides%20backend%20services,Facebook%20and%20Twitter%2C%20and%20more.)- A Firebase product which provides back-end services and SDK’s for Authentication.

### Prerequisites
* [Google](https://www.google.com/account/about/) account
* [Android Studio](https://developer.android.com/studio) installed.

#### Step 1 – Create a new Project.
In this step, we will [create](https://developer.android.com/studio/projects/create-project) a new Android Studio project.

* Open Android Studio. Select *Start a new Android Studio project* and click on next.

![Open Android Studio](/engineering-education/google-authentication-for-android/empty.png)

* Select *Empty Activity* and click on next.

![Select on Empty Activity](/engineering-education/google-authentication-for-android/name.png)

* We will name the project **GoogleSignUp**. Click on *Finish* and wait for the project to build.

![Empty Activity](/engineering-education/google-authentication-for-android/newproject.png)

#### Step 2 – Creating the Google Sign Up Button.
In this step, we will add a google sign in button to our activity's resource file.

**Note: We will use a pre-built button. The button can still be customized according to the developer's preference.**

Add the following dependency in your **app** module `build.gradle` file:

```gradle
dependencies {
  implementation 'com.shobhitpuri.custombuttons:google-signin:1.1.0'
}
```

Click on *Sync Now*.


In your XML Layout, add the button.

```xml
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
...
<com.shobhitpuri.custombuttons.GoogleSignInButton
android:layout_width="242dp"
android:layout_height="49dp"
android:layout_centerInParent="true"
android:text="@string/google_sign_up"
app:isDarkTheme="true"
app:layout_constraintBottom_toBottomOf="parent"
app:layout_constraintEnd_toEndOf="parent"
app:layout_constraintStart_toStartOf="parent"
app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
**Note: app:isDarkTheme="{Boolean}"  is used to switch between the blue and gray-white theme for the button.**

![Layout Resource File](/engineering-education/google-authentication-for-android/xml.png)

#### Step 3 -Setting up Firebase.
Set up and connect your project on Firebase by following instructions stated by Google [here](https://firebase.google.com/docs/android/setup).

#### Step 4 – Lets Code.
* Add the following dependencies to your **app** module `build.gradle` and sync the project;

```gradle
  implementation 'com.google.firebase:firebase-auth:19.4.0'
  implementation 'com.google.android.gms:play-services-auth:18.1.0'
```
In our `MainActivity.java` add the following lines of code;

* First, initialize the views for the Authentication process.

```java
//Initializing the views required for the Authentication process.
private GoogleSignInClient mGoogleSignInClient;
private FirebaseAuth firebaseAuth;
private Button googleSignIn;
private int RC_SIGN_UP = 1
```

* In the activity's `onCreate` method, initiate `FirebaseAuth` which is used to Authenticate users

 ```java
 //Initializing Auth
firebaseAuth = FirebaseAuth.getInstance();
```

* Next, configure Google Sign In to request the data required by the app. Create a **GoogleSignInOptions** object with the `requestEmail` which will request for the user’s email in the requestEmail option.

```java
// Configure googleSignInOptions to request the email address, basic under details and user's ID.
GoogleSignInOptions googleSignInOptions = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
.requestEmail()
.build();
```

* Next, we will create a **GoogleSignInClient** object.

```java
// Build a GoogleSignInClient with the options specified in googleSignInOptions .
GoogleSignInOptions googleSignInOptions  = new
GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
.requestIdToken(getString(R.string.default_web_client_id))
.requestEmail()
.build();
```
**Note: `The R.string.default_web_client_id` is automatically added once you build and run the application on a device or emulator**


* Set an onClick listener on the Google Sign Up button which will pass the SignUp method.

```java
        googleSignIn = (Button) findViewById(R.id.googleSignIn);
        googleSignIn.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View v) {
                signUp();
            }

            private void signUp()
            {
                Intent signIn = mGoogleSignInClient.getSignInIntent();
                startActivityForResult(signIn,RC_SIGN_UP);
            }
        });
```

* Get the GoogleSignInAccount object for the user in the `onActivityResult` method.

```java
@Override
protected void onActivityResult(int getCode, int endCode, @Nullable Intent data)
{
    super.onActivityResult(getCode, endCode, data);
    //Google Sign Up
    if(getCode ==RC_SIGN_UP)
    {
        Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
        handleSignUpResult(task);
    }
}
```

**Note: The `GoogleSignInAccount` object contains contains the signed-in user’s information.**

* Next, create a `handleSignInResult` method which will give out instructions on actions to be done if the process is successful . For instance, we would like to notify a user whether they have signed in or not, and if successful they should be able to access the next activity.

```java
        private void handleSignUpResult(Task<GoogleSignInAccount> myCompletedTask)
    {
        try {
            GoogleSignInAccount account = myCompletedTask.getResult(ApiException.class);
            FirebaseGoogleAuth(account);
        } catch (ApiException e) {
            Toast.makeText(MainActivity.this,"Sign In Failed",Toast.LENGTH_SHORT).show();
            FirebaseGoogleAuth(null);
        }

    }
```

* Afterwards, we create a `FirebaseGoogleAuth` method in which we will get an ID token from the `GoogleSignInAccount` object. Exchange it for a Firebase credential, hence enables us to authenticate with Firebase:

```java
      private void FirebaseGoogleAuth(GoogleSignInAccount myAccount)
    {
        //check if account is null
        if (myAccount != null)
        {
            AuthCredential myAuthCredential = GoogleAuthProvider.getCredential(myAccount.getIdToken(), null);
            firebaseAuth.signInWithCredential(myAuthCredential).addOnCompleteListener(this, new OnCompleteListener<AuthResult>()
            {
                @Override
                public void onComplete(@NonNull Task<AuthResult> task)
                {
                    if (task.isSuccessful())
                    {
                        Toast.makeText(MainActivity.this, "Authentication Succesful", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(MainActivity.this, Home.class));
                        finish();

                    } else {
                        Toast.makeText(MainActivity.this, "Authentication Failed", Toast.LENGTH_SHORT).show();
                        FirebaseUser mUser = firebaseAuth.getCurrentUser();
                        updateUI(mUser);
                    }
                }
            });
        }
        else{
            Toast.makeText(MainActivity.this, "acc failed", Toast.LENGTH_SHORT).show();
        }
    }
```

* Let us create a `UpdateUI` method that will be used to display the UI for the Google Account options.

```java
 private void updateUI(FirebaseUser firebaseUser)
{
    GoogleSignInAccount mAccount = GoogleSignIn.getLastSignedInAccount(getApplicationContext());
    if (mAccount != null)
    {
        String mPersonName = mAccount.getDisplayName();
        String mPersonEmail = mAccount.getEmail();
    }
}
```
We are done! Let us run the app.


![GoogleSignUp](/engineering-education/google-authentication-for-android/finalone.jpg)

![GoogleSignUp](/engineering-education/google-authentication-for-android/finaltwo.jpg)

![GoogleSignUp](/engineering-education/google-authentication-for-android/finalthree.jpg)

Access the Source code [here](https://github.com/BrianaNzivu/googlesignup).

Download the Application [here] (https://drive.google.com/file/d/1qeb3z7RfXaMfMl9I4AhQQYDrbhmem2n0/view?usp=sharing).
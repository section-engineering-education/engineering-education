---
layout: engineering-education
status: publish
published: true
url: /google-play-in-app-reviews/
title: Google Play In-App Review using Android Studio
description: This article will explain how to implement an in-app review API that prompts users to submit Play store ratings and reviews without leaving the application and without opening the Play store either.
author: joseph-chege
date: 2020-12-14T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/google-play-in-app-reviews/hero.png
    alt: Google play in-app review Android Studio example image
---
In this guide, we will learn how to implement the *rate this app* functionality within your Android application using Google core in-app review API.
<!--more-->
When a user is interacting with your application, you always want to get feedback. Feedback will give you insight into what your users think about your application.

In the old days, a user would have to open the Google Play store to write a review. In some fashion, you would use a fallback review dialog with some "call to action" buttons to nudge the user to review your application. If the user agrees, the button redirects to the Play store so that the user can write a review about your application.

This approach does not promote a user good experience and can potentially ruin your application's reputation among users. To make matters worse, this method doesn’t establish communication between the Play store and your application; it will keep popping up even after a user leaves a review. 

This type of call to action will force your user to leave your application. You don’t want such a scenario, as there's a chance that a user may not reopen your application once redirected to the play store.

Google announced an [in-app review API](https://developer.android.com/guide/playcore/in-app-review) that prompts users to submit Play store ratings and reviews without leaving the application and without opening the Play store either. Users' reviews/ratings will eventually be displayed in the Google Play store. 

This encourages users to give feedback on your application.

![image](/engineering-education/google-play-in-app-reviews/in-app-review-flow.jpg)

***[Image source](https://developer.android.com/guide/playcore/in-app-review)***

This is how the in-app review API looks compared to the old fallback dialog.

![image](/engineering-education/google-play-in-app-reviews/in-app-dialog-and-fallback-dialog.png)

Typically, this API concept is a better way of asking users for a review than the fallback rate dialog.

### Prerequisites
This guide assumes you have prior knowledge of Android application development using Android Studio.

To carry out testing you will need:
- A Google Play [Console account](https://play.google.com/console/about/).
- An application already published in the Google Play store.

### Why you should ask your users for reviews
Reviews play a marketing role in your application. They are a crucial part of securing more downloads because they can convince a new user whether they should download the application. There's a good chance a new user will check reviews and ratings to decide which application to try. The reviews share the experiences of previous users.

Reviews also form a line of communication between you and your users, as they tell you what to improve in your application. Potentially, a user could experience a bug while interacting with your application. Feedback lets you know that something might not be working well, giving you a nudge to fix said bug.

Improvement on your Play store ranking can make your application more discoverable via organic searches. Apart from keywords that you add such as the application title and description, Google Play store indexes almost every text in your store listing. 

Reviews are part of this text because they appear in your store listing. When indexed, your application becomes more discoverable to the relevant users. This translates to a good ranking, which results in more downloads from traffic conversion.

### When to show in-app reviews
Google in-app review is a great concept. However, you should be smart about when to implement in-app reviews.

Typically, you don’t want to ask a user to rate your application, for example, in the middle of a game. This will lead to a bad user experience, and the chances are that users might write negative reviews. You should strategically know when is appropriate to show a review dialog. 

For example, after a user has finished playing a particular game level, that would be a perfect moment to do so. This will ensure the user gives a review that accurately reflects their experience playing that game.

Another case would be that you have, say, an e-commerce application. In this case, it would be inappropriate to tell a user to review the app in the middle of making an order. 

You want the user to have enough information about your application services before submitting a review. In this case, you would ask a user to write a review when the order has been processed, to capture the right moment. 

You don’t want to show the review dialog when a user is yet to interact with your application enough to give adequate feedback.

With Google Core, the API is designed to respect user privacy. The rating sheet does not show up at any time. It's not attached to any call to action event. To limit API misuse, the API has quota limits per user. 

However, Google has not provided the exact number of times the rating dialog will open up per user. A similar iOS API has its quota limits set three times a year per user, which makes sense, as this will not be annoying to the user.

Check the documentation [guidelines](https://developer.android.com/guide/playcore/in-app-review#when-to-request) regarding when you should request the review flow. 

The API states that you need to note the following:

1. How you ask for reviews matters. When using this API, you should not ask predictive or opinionated questions before or after the review sheet dialogs show the app in your application. These questions include:

    -  Would you rate this application five stars?
    -  Do you like this app?

2. The API also advises you only to show dialog once a user has enough experience with your application. It's not a good practice to ask a user to write a review before the app delivers value to that user. Chances are, the user will get annoyed and skip the review. And if they don't skip it, they will give negative reviews.

3. In order to minimize API usage and avoid annoying users, it would be best if you did not excessively ask users to write reviews.

### Implementation
Google describes this API as light. It's simple to integrate within your application. To begin, identify an activity where you want to implement the review flow. Once implemented, the API will handle the review flow for you.

#### Requirements
- An Android phone running Android 5.0 (API 21) or higher. The device should have Google Play installed and connected with a Gmail account.
- Google Play Core Library, version 1.8.0 or higher.

#### Integration
#### Step 1: Adding dependency
Add Google Core Library to your `build.gradle` file.

```java
implementation 'com.google.android.play:core:1.9.0'
```

Sync to download the library to have access to the necessary classes to initiate review flow.

Always ensure that you are using the latest library version. Check [here](https://developer.android.com/reference/com/google/android/play/core/release-notes) for newly added versions.

#### Step 2: Creating an instance of a 'ReviewManager'
The `ReviewManager` provides the required functions that trigger the review flow.

They include:
- `requestReviewFlow()` — fetches application information from the Play store.
- `launchReviewFlow()` — initiates the review flow.

Declare `ReviewManager` right above `onCreate()`.

To create an instance of `ReviewManager`:
- Declare `ReviewManager` right above `onCreate()`.
- Use `ReviewManagerFactory` calling the `create` function, and pass your application context to it.

```java
reviewManager = ReviewManagerFactory.create(getApplicationContext());
```

#### Step 3: Requesting review info
`requestReviewFlow()` communicates with the Google Play store remotely to get the information that references your application. 

Declare `ReviewInfo`.

```java
ReviewInfo reviewInfo;
```

`ReviewInfo` holds this information, that will be used to trigger the review flow process to the end user.

```js
Task<ReviewInfo> manager = reviewManager.requestReviewFlow();
        manager.addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                reviewInfo = task.getResult();
            } else {
            }
        });
```

Calling `requestReviewFlow()` will return the data associated with your play store application. This function performs an asynchronous operation, meaning we have to wait for the operation to complete. 

For this reason, we need to assign a listener. The listener will let `ReviewManager` know when the `Task` is completed and assign the request's results to `ReviewInfo`.

#### Step 4: Launching ReviewFlow
Referencing the `ReviewFlow`, we can start and show the review dialog to the user. However, in some instances, `requestReviewFlow()` can fail to get the application information, meaning that `ReviewFlow` will be null.

These instances include:

- Poor internet connection.
- A user has previously written a review for your application.
- Quota restriction. Due to the quota imposed by this API, not every request will be successful.

For this reason, we need to start `launchReviewFlow()` if `ReviewFlow` is not null. Make sure you assign `ReviewFlow` to null.

```java
ReviewInfo reviewInfo = null;
```

When null, the ReviewManager will terminate the review flow.

```java
if (reviewInfo != null) {
    Task<Void> flow = reviewManager.launchReviewFlow(this, reviewInfo);
    flow.addOnCompleteListener(new OnCompleteListener<Void>() {
        @Override
        public void onComplete(Task<Void> task) {
            Toast.makeText(getApplicationContext(), "In App Rating complete", Toast.LENGTH_LONG).show();
        }
    });
}
else {
}
```

When `requestReviewFlow()` is successful, `ReviewFlow` will be assigned to the request results. You need to check if `reviewInfo != null`  to trigger the review flow with `launchReviewFlow()`. Then the API will handle the review's comment and rating and update your application store listing showing them.

This API state's that if an error occurs during the review flow, you should never inform the user or change your normal application flow. The app should continue its usual flow after `onComplete` is called.

### Final Activity Code
***Remember to press `alt + enter` on a PC and `option + enter` on a Mac to import the classes after copying and pasting the code blocks into your IDE.***

```java
public class MainActivity extends AppCompatActivity {
    ReviewManager reviewManager;
    ReviewInfo reviewInfo = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getReviewInfo();
        startReviewFlow();
    }

    private void getReviewInfo() {
        reviewManager = ReviewManagerFactory.create(getApplicationContext());
        Task<ReviewInfo> manager = reviewManager.requestReviewFlow();
        manager.addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                reviewInfo = task.getResult();
            } else {
                Toast.makeText(getApplicationContext(), "In App ReviewFlow failed to start", Toast.LENGTH_LONG).show();
            }
        });
    }

    public void startReviewFlow() {
        if (reviewInfo != null) {
            Task<Void> flow = reviewManager.launchReviewFlow(this, reviewInfo);
            flow.addOnCompleteListener(new OnCompleteListener<Void>() {
                @Override
                public void onComplete(Task<Void> task) {
                    Toast.makeText(getApplicationContext(), "In App Rating complete", Toast.LENGTH_LONG).show();
                }
            });
        }
        else {
            Toast.makeText(getApplicationContext(), "In App Rating failed", Toast.LENGTH_LONG).show();
        }
    }
}
```

### Testing
To test our application, we will use internal app sharing. To confirm that this works, add a `Button` to trigger the review flow. Remember, we are using a call to action for testing. In production applications, calls to action such as `Button` should be avoided when using this API.

- Add a button in your activity.xml

```xml
<Button
    android:id="@+id/button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="159dp"
    android:layout_marginEnd="164dp"
    android:layout_marginBottom="600dp"
    android:text="SHOW IN APP REVIEW DIALOG"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent" />
```

- Declare the button

```java
Button mButton;
```

Below `onCreate`,

- Create an instance of the `mButton`

```java
mButton = findViewById(R.id.button);
```

- Add `OnClickListener` and call `startReviewFlow()`

```java
mButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        startReviewFlow();
    }
});
```

#### How to test
1. Generate a [signed app bundle/APK](https://developer.android.com/studio/publish/app-signing#sign-apk). Note the APK signing key and the `applicationId` should be the same as the already published application.

2. Share the generated APK with a tester. To do that, select the published application in the Google console, navigate to [`Internal App Sharing`](https://play.google.com/console/internal-app-sharing), and upload the generated APK there. Check how to use [Google Internal App Sharing](https://support.google.com/googleplay/android-developer/answer/9844679?hl=en).

2. Copy the upload's shareable link and share it with a tester. In this case, a tester should be using an Android mobile phone.

3. Open the shared link on the phone's browser. You will be prompted to open with the Google Play store. Do so. This will launch a Play store screen.

4. Download the app and wait for the installation to complete.

5. Launch the application and click `SHOW IN APP REVIEW DIALOG` to start the review flow, as shown in the image below.

![image](/engineering-education/google-play-in-app-reviews/in-app-reviews.png)

**Note:**
- Since we a carrying out a test, the submit button will be inactive.
- If you have previously reviewed the application, delete your comment in the Google Play store. Otherwise, the review sheet won't pop up.

For more reference, check the code on [GitHub](https://github.com/kimkimani/InAppReview).

I hope this guide is a helpful source on how to ask users for reviews as well as implement in-app reviews within your application.

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)

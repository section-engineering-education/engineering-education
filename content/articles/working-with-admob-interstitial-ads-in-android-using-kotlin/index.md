---
layout: engineering-education
status: publish
published: true
url: /working-with-admob-interstitial-ads-in-android-using-kotlin/
title: Working with AdMob Interstitial Google Ads in Android using Kotlin
description: This article will discuss how to implement Admob Interstitial Google ads in Android using Kotlin.
author: davis-maina
date: 2022-06-23T00:00:00-02:33
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/working-with-admob-interstitial-ads-in-android-using-kotlin/hero.png
  alt: Interstitial Google Ads in Android using Kotlin Hero Image
---
An interstitial ad is a dialogue that pops up on the phone screen when browsing the internet or playing a game.
<!--more-->
Its primary role is to advertise a product that the application owner has made a fee contract with the production industry.

Typically, they appear during points of transition in an app's flow, such as between tasks or game stages. 

When an interstitial ad appears in an app, the user can either tap on it to continue to the advertised store or exit and return to the app using a cancel button on the ad.

This tutorial will be a step-by-step guide on how to integrate AdMob interstitial google ads in an Android app.

### Prerequisites
To follow along, you need:
1. An account with Google AdMob. Create an account [here](https://admob.google.com/home/) 
2. Some basic knowledge of Kotlin programming.
3. A virtual device(emulator) in your IDE for app testing purposes.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Adding app to the adMob google ads and creating ad unit](#adding-app-to-the-admob-google-ads-and-creating-ad-unit)
- [Adding required dependencies](#adding-required-dependencies)
- [Working with XML layout](#working-with-xml-layout) 
- [Writing Kotlin code for the application](#writing-kotlin-code-for-the-application)
- [Conclusion](#conclusion)

### Adding an app to the AdMob google ads and creating an ad unit
After creating an account with Admob, sign [here](https://admob.google.com/home/) to add your app to Google.

On the left side of the Google AdMob home screen, click *Apps -> Add app*. It will help us to register our app to google Admob.

In the set up new app screen, select the category your app lies in, i.e., Android or iOS. Below the platform, you need to check one of the radio buttons depending on whether the app store supports your app or not.

Next, enter the app name, and add the app. In this case, we will call it Interstitial ads. By now, we have our *app id* that will be essential when publishing our app to the Play Store.

We need to create an ads unit for our app. Our ad will have this id, and we will use it while writing the code. 

Select our app and add an *ad unit* under the app on the home screen. Then, create an ad unit by selecting the ad format. In our case, we will choose the *Interstitial ad unit* because that's our primary objective.

To configure the ad unit, we need to give it a name. Leave the advanced settings as default and select *create ad unit* to finish up. Click *done* to finish setting up the app.

### Adding required dependencies
To use google ads in our application, we need to add the following dependency.

```gradle
//Google mobile ads
implementation 'com.google.android.gms:play-services-ads:20.6.0'
```

### Setting up the App Id in the manifest file 
To set the *app id* that we generated in the google AdMob ads, navigate to the *manifest* file in your IDE and add the code below. 

The metadata will contain the application id and the values of that id, as shown below:

```xml
 <meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-9880979314278824~6257******"/>
```

To get the app id, navigate to your Google AdMob account. In the *app -> app setting*, copy the id and paste it into the values section.

### Working with XML layout
We need to design the UI where we will trigger some events such as click listeners for loading our interstitial ads.

Add the following code in the *activity_main.xml* layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.appcompat.widget.LinearLayoutCompat xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_marginTop="30dp"
        android:fontFamily="cursive"
        android:text="@string/my_interstitial_ads"
        android:textColor="@color/black"
        android:textSize="30sp"
        android:textStyle="bold" />

    <Button
        android:id="@+id/btnInterstitial"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_marginStart="10dp"
        android:layout_marginTop="50dp"
        android:background="@drawable/custom_button"
        android:text="@string/interstitial_ad"
        android:textColor="@color/black" />
</androidx.appcompat.widget.LinearLayoutCompat>
```
For the button's background colour, we add a new drawable resource file named `custom_button`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item>
        <shape android:shape="rectangle">
            <solid android:color="@color/purple_500" />
            <corners android:radius="16dp" />
        </shape>
    </item>
</selector>
```

### Writing Kotlin code for the application
Before we jump to the *MainActivity* code, we need to ensure that we use Vviewbinding features throughout the whole application. 

Add the following code in your app-level `build.gradle`:

```gradle
buildFeatures{
        viewBinding true
    }
```

> Remember to sync the project after adding the code above.

In the *MainActivity.kt* file, we will be performing several actions to our ad, including loading it to the cache before the user performs any actions and showing the ad after an event is triggered, such as when a button is clicked. 

To achieve that, write the following code to your *MainActivity.kt* file.

The best practice to use interstitial ads during testing is using the test Ad ID (like the one in the activity below). 

It is recommended because your AdMob account can be closed during the test attempt. Google assumes that you are using the ad to generate money, and the app is not yet deployed to the Play Store.

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var mBinding: ActivityMainBinding
    private var interAd: InterstitialAd? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(mBinding.root)
        loadIntAd()
        // set on click listener on our button using binding
        mBinding.btnInterstitial.setOnClickListener {
            showIntAd()
        }
    }

    private fun showIntAd() {
        // First we ensure the Interstitial ad is not nullable

        if (interAd != null) {
            interAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                override fun onAdFailedToShowFullScreenContent(p0: AdError) {
                    super.onAdFailedToShowFullScreenContent(p0)
                }

                override fun onAdShowedFullScreenContent() {
                    //Input your code here
                    super.onAdShowedFullScreenContent()
                }

                // When you exit the ad using the cancel button, the next activity is displayed.

                override fun onAdDismissedFullScreenContent() {
                    super.onAdDismissedFullScreenContent()
                    val intent = Intent(this@MainActivity, NextActivity::class.java)
                    startActivity(intent)
                    finish()
                }

                override fun onAdImpression() {
                    // input your code here
                    super.onAdImpression()
                }

                // What will happen when the ad is clicked

                override fun onAdClicked() {
                    //Input your code here
                    super.onAdClicked()
                }
            }
            interAd?.show(this)
        } else {
            // If the Ad is not loaded, a toast will be displayed and the intent will help to 
            // navigate to the second activity

            Toast.makeText(baseContext, "Ad was not loaded", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, NextActivity::class.java)
            startActivity(intent)
        }
    }

    private fun loadIntAd() {
        val adRequest = AdRequest.Builder().build()
        InterstitialAd.load(this, "ca-app-pub-3940256099942544/1033173712", adRequest,
            object : InterstitialAdLoadCallback() {
                override fun onAdFailedToLoad(adError: LoadAdError) {
                    interAd = null
                }

                override fun onAdLoaded(interstitialAd: InterstitialAd) {
                    interAd = interstitialAd
                }
            })
    }
}
```

Create the second activity, which we will navigate to when we exit the ad or when the ad is not ready to be displayed. Name the empty activity as `NextActivity`.

The *NextActivity* will be displaying a textview with a congratulatory emoji. We need to create a string resource to hold the string, as shown below:

```xml
<string name="emoji">Congratulation &#x1F44F;</string>
```

Add the following code in the *next_activity.xml* layout to design its UI:

```xml
 <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/emoji"
        android:textColor="@color/black"
        android:textSize="30sp"
        android:textStyle="bold"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="8dp"
        android:fontFamily="cursive"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
```

In most cases, when the *NextActivity.kt* is loaded and the user tries to navigate back to the *MainActivity.kt*, the application exits. 

To achieve successful back navigation, we need to tell the *NextActivity.kt* that it has a parent, which is the *MainActivity.kt*. 

Therefore in the *manifest.xml* file, we need to write the following code snippet in the activity blocks.

```xml
android:parentActivityName=".MainActivity"
```

To test the application, you can use a physical device or the emulator installed in your IDE to test the application.

### Conclusion
In this tutorial, we have discussed how to create a Google AdMob account, add your app to Google AdMob, as well as create an ad unit id.

We have also discussed how to implement Admob Interstitial Ad in your application and earn money in your account whenever the ad is clicked.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
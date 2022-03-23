### Introduction
An interstitial ad is a dialogue that pops up to the user's application when surfing through an application under internet connections. Its primary role is to advertise a product that the application owner has made a fee contract with the production industry.

Typically, they appear during points of transition in an app's flow, such as between tasks or game stages. When an interstitial ad appears in an app, the user can either tap on it to continue to the advertised store or exit it and return to the app using a cancel button of ads that is on the left upside of the ad.

This tutorial will be a step-by-step guide on creating an application integrating AdMob interstitial google ads and understanding more concepts related to Google Interstitial ads.

### Prerequisites
1. Have an account with Google AdMob. Create an account [here](https://admob.google.com/home/) 
2. Have basic knowledge of Kotlin programming.
3. Install a virtual device(emulator) in your IDE for app testing purposes. But it is not prohibited if you have a physical device.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Adding app to the adMob google ads and creating ad unit](#adding-app-to-the-admob-google-ads-and-creating-ad-unit)
- [Adding the required dependencies](#adding-the-required-dependencies)
- [Working with XML layout](#working-with-xml-layout) 
- [Writing Kotlin code for the application](#writing-kotlin-code-for-the-application)
- [Testing the application](#testing-the-application) 
- [Conclusion](#conclusion)

### Adding app to the AdMob google ads and creating ad unit
- After creating an account with Admob, sign [here](https://admob.google.com/home/) to add your app in google.
- On the left side of the Google AdMob home screen, click Apps -> Add app. It will help us to register our app to google Admob.
- In the set up new app screen, select the category your app lies in, i.e., Android or iOS. Below the platform, you need to check one of the radio buttons whether the app store supports your app or not.
- Enter continue to go to the next steps.
- Enter the name of your app in the app name, edit text and add the app. In this case, we will call it Interstitial ads. By now, we have our app id that will be essential when publishing our app to the app store for google recognition.
- We need to create an ads unit for our app. Our ad will have this id, and we will use it while writing the code. 
Select our initially added app and add an ad unit under the app on the home screen.
- Create an ad unit by selecting the ad format. In our case, we will choose the Interstitial ad unit because that's our primary objective.
- To configure the ad unit, we need to enter a name for our ad unit. Let the advanced settings remain default and select create ad unit to finish up.
- We have created the ad id that we will use for the enquiring ad from the ad unit.
- Click done to finish setting up the app and the ad id to google Admob ads.

### Adding the required dependencies
To use google ads in our application, we need to add the following dependency.

```kotlin
  //Google mobile ads
    implementation 'com.google.android.gms:play-services-ads:20.6.0'
```

### Setting up the app Id in the manifest file 
To set the app id we generated in the google AdMob ads, navigate to the manifest file in your IDE and add the below codes. The meta data will contain the application id and the values of that id. 

```kotlin
 <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-9880979314278824~6257******"/>
```

To get the app id, go to your account in google AdMob. In the app -> app setting, copy the id and paste it into the value.

### Working with XML layout
We need to design the UI where we will be able to trigger some events such as click listener for loading our interstitial ad.

Write the following code in the activity_main.xml layout. 

```kotlin
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
For the button's background colour, we made a new drawable resource file named `custom_button`. The code below is for the custom button drawable.

```kotlin
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
- Before we jump to the main activity code, we need to ensure that we use binding features throughout the whole application. Hence include the following code in your `build.grandle`.

```kotlin
 buildFeatures{
        viewBinding true
    }
```
> Note; Sync the project after adding the code snippet above.

In the main activity.kt file, we will be performing several actions to our ad, including loading our ad to the cache before the user performs any actions and showing the ad after an event is triggered, such as a click to a button. 

- To achieve that, write the following code to your MainActivity.kt file.

> `Note`: The best practice to use interstitial ads during testing is using the test Ad ID(like the one in this activity). It is recommended because your AdMob account can be closed in the attempt of using the ad id you created earlier with google. They assume you are using the ad to generate money, and the app is not yet deployed to the app store.

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
            // If the Ad is not loaded, a toast will be displayed and the intent will help to navigate to the second activity
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
- Create the second activity, which we will navigate when we exit the ad and when the ad is not ready to be displayed on a click button. Name the empty activity `NextActivity`.
- The next activity will be displaying a text view with a congratulation emoji; hence we need to create a string resource to hold the string, as shown below.

```kotlin
<string name="emoji">Congratulation &#x1F44F;</string>
```
- Write the following code in the next activity XML layout to design its UI.

```kotlin
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
- In most cases, it is probable that when the next activity is loaded and the user tries to navigate back to the main activity, the application exits. To achieve successful back navigation, we need to tell the next activity that it has a parent, which is the main activity. Therefore in the manifest, we need to write the following code snippet inside the activity next blocks.

```kotlin
android:parentActivityName=".MainActivity"
```
### Testing the application
You can use a physical device or the emulator installed in your IDE to test the application.

### Conclusion
In this tutorial, we have discussed how you can create an account with google AdMob, add your app to Google AdMob and create an ad unit id for your Ad.

We have also discussed how you can implement Admob Interstitial Ad in your application and earn money in your account whenever the ad is clicked.

Happy coding!!






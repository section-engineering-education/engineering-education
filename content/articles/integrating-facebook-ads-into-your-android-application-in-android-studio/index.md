### Integrating Facebook Ads into your Android App in Android Studio

### Introduction
Monetizing an application is just as an important goal for a developer as producing the required product. This motivates developers and programmers to come up with more software with a financial thought in mind which triggers quality.

Apart from designing mobile applications for technological advancements, developers are always looking for a return on their investment. This article demonstrates how to include banner and interstitial advertisements in your applications, which is one of the best ways to earn money from apps.
<!--more-->
### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Initial integration steps](#initial-integration-steps)
- [Integration in Android Studio](#integration-in-android-studio)
- [Why Integrate Facebook Ads?](#why-integrate-facebook-ads)
- [Demerits of integrating into some Applications](#demerits-of-integrating-into-some-applications)
- [Conclusion](#conclusion)

### Prerequisites
The key requirements for a successful integration include:
- [Facebook Audience Network SDK](https://developers.facebook.com/resources/audience-network-sdk-6.7.0.zip)
- [Facebook Audience Network account](https://business.facebook.com/pub/home/?source=help&business_id=1101812683558213&global_scope_id=1101812683558213)
- [Android Studio](https://developer.android.com/studio/releases)
- [Facebook business account](https://business.facebook.com/overview)

You also need to be familiar with the layout and how to use Android studio. With all these requirements in place, you can move on to the steps involved in the integration process.
With your Android studio installed and working properly, you will needto install a Facebook Audience Network (FAN) account sdk.

**FAN (Facebook Audience Network) SDK installation**
To install, you can download your SDK manually from [here](https://developers.facebook.com/resources/audience-network-sdk-6.8.0.zip) (Not recommended) or follow the steps in [Initial integration steps](#initial-integration-steps) to install it using the recommended method.

### Initial integration steps
Before beginning the integration process, you have to first set up your Facebook Business Manager account for the ads.
The steps below will guide you in setting up your account.

#### Step 1. **Set-up a  Business Page**
The first and foremost step is to set up a business page where your ads will appear. You can follow this short [video](https://www.youtube.com/watch?v=fzW4eHQQLFk) to see how you can create your page.

#### Step 2 **Set up a Facebook Manager  account**
To create a Facebook manager account, go to https://business.facebook.com/overview to first create a Facebook manager account as shown in the picture below.
![create](engineering-education/integrating-facebook-ads-with-your-android-application-in-android-studio
/create.png)

#### Step 3 **Open a Facebook Audience Network (FAN) account**
Set up a FAN account using the business manager account you created to make sure they are all integrated.

#### Step 4 Build Application properties for your account
Once you have created your FAN account, click on the extension/dropdown button at the top and select the monetization manager. Click on integration>properties, key in your Application name and id then select your platform, either Android or iOS.

If you don't have a ready App, follow these [directives](#integration-in-android-studio) to create a simple test application.

#### Step 5 Select the type of Ads
The final initial step is to select and create the ad type.
Once done, you are ready for the integration process in the Android studio.


### Integration in Android Studio
Don't have an Application? No need to worry since you can set up a simple application in a few steps below.

#### Step 1: Create a new project
For beginners, open your Android Studio and create a new project with Ads activity. Since it is a test Application, you can use it without altering it. This [article](https://www.section.io/engineering-education/first-android-App/) can be very useful in helping you with proper project creation.

#### Step 2: Implement Facebook SDK
Add this android dependency to the `build.gradle` file of the App module.
```kotlin

// facebook audience network SDK
implementation 'com.facebook.android:audience-network-sdk:5.9.1'

```
This dependency integrates the SDK into your Application.

![sdk](engineering-education/integrating-facebook-ads-with-your-android-application-in-android-studio
/sdk.png)

#### Adding the Ads to your App
In this case, we are going to add Banner Ads as follows;

On the XML file(activity.xml), add a layout for the Banner Ads and implement it in the java file.This code below does everything for you.
```kotlin
<?xml version="1.0" encoding="utf-8">;
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:App="http://schemas.android.com/apk/res-auto"
xmlns:tools="http://schemas.android.com/tools"
android:layout_width="match_parent"
android:layout_height="match_parent"
tools:context=".MainActivity">
 
<LinearLayout
android:id="@+id/banner_container"
android:layout_width="match_parent"
android:layout_height="wrap_content"
android:layout_alignParentBottom="true"
android:orientation="vertical"
App:layout_constraintBottom_toBottomOf="parent"/>
 
</RelativeLayout>

```

On your java activity, implement the Banner Ad by instantiating an Adview object. to do that, place this code in the `onCreate()` function.

```kotlin
adView = new AdView(this, "IMG_16_9_App_INSTALL#2029572424039676_2029575434039375", AdSize.BANNER_HEIGHT_60);
 
// Find the AdContainer
LinearLayout adContainer = (LinearLayout) findViewById(R.id.banner_container);
 
adContainer.addView(adView);
 
// Load an ad
adView.loadAd();

```
In your activity's `onDestroy()` function, paste the following code. This is done to free up AdView's resources.

```kotlin
@Override
protected void onDestroy() {
if (adView != null) {
adView.destroy();
}
super.onDestroy();
}

```

With all that done, run your code and observe the output.
For successful integration, the following output is obtained.

![](engineering-education/integrating-facebook-ads-with-your-android-application-in-android-studio
/output.png)

You can alter the code to and other types of Ads like interstitial Ads and Native Ads in the same manner.

### Why integrate Facebook ads?
Consumers prefer in-App advertising over display advertising on mobile websites. Smartphone consumers find ads on the mobile web to be compacted and unpleasant. In-App advertisements are resized to fit the screen and seem better, increasing overall engagement.

When establishing in-App advertisements, **accessibility** is another important issue to consider. In-App mobile advertising is easier to reach because most consumers have their phones with them all the time, wherever they go. You have access to a captive audience or users who are already using the App and are interested in what you have to say. It's easier to convert them because they're already interested.

### Demerits of integrating into some Applications
In-App advertisement as seen earlier has many advantages. Besides, it is not always Appealing to some users when ads keep popping in all the time.

Here are some demerits in an in-App advertisement;

- People/users might hate the App due to **disturbances from ads pop-up**. This may discourage users from using known Applications with in-App advertisements.

- For some people, it may be **difficult to navigate**. Some interested customers may not get to see the advertisement due to the incompatibility of the ads with some phones.

- **Cost incurred on the user** to get the advertisement. To get the advertisement, the user's internet bundles get consumed from an unintended advertisement viewing task.

### Conclusion
At this point, you should be able to integrate your application with Facebook Ads for added monetary advantage. However, this might not be an option for many developers depending on the kind of application they are developing. 
The verdict on whether to integrate your application with these Ads is always the owners' preference. 

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)




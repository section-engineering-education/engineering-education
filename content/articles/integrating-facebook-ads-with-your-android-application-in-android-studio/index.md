### Integrating Facebook Ads with your Android App in Android Studio


### Table of Contents

- [Introduction](#introduction)

- [Requirements analysis](#requirements-analysis)

- [Initial integration steps](#initial-integration-steps)

- [Requirements Installation](#requirements-installation)

- [Integration in Android Studio](#integration-in-android-studio)
 

- [Why Integrate?](#why-integrate)

- [Demerits of integrating into some Applications](#demerits-of-integrating-into-some-applications)

- [Conclusion](#conclusion)



### Introduction

Apart from designing mobile applications for technological advancements, developers are always looking for a return on their investment. This article demonstrates developers how to include banner and interstitial Ads in their applications, which is one of the best ways to earn money from apps.

Developers can use Facebook Ads to monetise their android apps using Facebook Audience Network. This encourages developers to create new applications on a regular basis.

### Requirements analysis

The key requirements for a successful integration include;
    Facebook Audience Network SDK
    Android studio
    Facebook business account

### Stage One integration steps

Before beginning the integration process, you have to first setup your Facebook Business Manager account for the ads.
The steps below will guide you on setting up your account.

####1. **Set-up a  Business Page**
The first and fore-most step is to set up a business page where your ads will Appear. You can follow this short [video](https://www.youtube.com/watch?v=fzW4eHQQLFk) to see how you can create your own page.

#### Step 2 **Set up a Facebook Manager  account**

To create a Facebook manager account, go to https://business.facebook.com/overview to first create a Facebook manager account as shown in the picture below.
![](engineering-education/integrating-facebook-ads-with-your-android-application-in-android-studio
/create.png)

#### Step 3 **Open a Facebook Audience Network (FAN) account**
Set up a FAN account using the business manage account you created to make sure they are all integrated.



#### Step 4 **Build Application properties for your account**

Once you have created your FAN account, click on the extension/dropdown button at the top and select the monetization manager.
Click on integration>properties, key in your Application name and id then select your platform, either Android or iOS.

If you don't have a ready App, follow these [directives](#integration-in-android-studio) to create a simple test Application.

#### Step 5 **Select the type of Ads**

The final initial step is to select and create the ad type.
Once done, you are ready for the integration process in the Android studio.

### Requirements Installation

Assuming you have your Android studio up and running, the only thing you have to install is the FAN SDK.

 **FAN SDK installation**
 To install, you can download your SDK manually from [here](https://developers.facebook.com/resources/audience-network-sdk-6.8.0.zip) (Not recommended) or follow the steps below to install it the right way.



### Integration in Android Studio

Don't have an Application? No need to worry since you can set-up an simple Application in a few steps below.

#### Step 1: Create a New Project
For those without a ready Application, open your Android Studio and create a new project with Ads activity. Since it is a test Application, you can use it without altering. This [article](https://www.section.io/engineering-education/first-android-App/) can be very useful in helping you with proper project creation.

#### Step 2: Implement Facebook SDK
Add this android dependence to the `build.gradle` file of the App module.
```kotlin

// facebook audience network SDK
implementation 'com.facebook.android:audience-network-sdk:5.9.1'

```
This dependece integrates the SDL to your Application.

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

With all that done , run your code and observe the output.
For a successfull integration, the following output is obtained.

![](engineering-education/integrating-facebook-ads-with-your-android-application-in-android-studio
/output.png)

You can alter the code to and other types of Ads like interstitial Ads and Native Ads in the same manner.

### Why Integrate?
Consumers prefer in-App advertising over display advertising on mobile websites. Smartphone consumers find ads on the mobile web to be compacted and unpleasant. In-App advertisements are resized to fit the screen and seem better, increasing overall engagement.

When establishing in-App advertisements, **accessibility** is another important issue to consider. In-App mobile advertising is easier to reach because most consumers have their phones with them all the time, wherever they go. You have access to a captive audience, or users who are already using the App and are interested in what you have to say. It's easier to convert them because they're already interested.

### Demerits of integrating into some Applications
In-App advertisement as seen earlier has many advantages. Besides, it is not always Appealing to some users when ads keep popping in all the time.

Here are some demerits in in-App advertisement;

- People/users might hate the App due to **disturbances from ads pop-up**. This may discourage users from using known Applications with in-App advertisements.

- For some people, it may be **difficult to navigate**. Some interested customers may not get to see the advertisement due to incompatibility of the ads with some phones.

- **Cost incurred on the user** to get the advertisement. To get the advertisement, users internet bundles get consumed from an unintended advertisement viewing task.

### Conclusion
Monetizing Applications counts as one of the success of a developer other than producing the required product. This motivates developers and programmers to come up with more software with a thought in mind that there will an appreciation token.
The verdict on whether to integrate your Application with these Ads is always the owners preference. 

This tutorial directs a developer on how his/her Applications can generate income from advertisement.

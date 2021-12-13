---
layout: engineering-education
status: publish
published: true
url: /creating-simple-visual-augmented-reality-application-in-android/
title: Creating a simple visual Augmented Reality application in Android
description: This article will cover Augmented Reality (AR), which is a technology that combines digital content with real-world objects.
author: ian-muriuki
date: 2021-12-13T00:00:00-12:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-simple-visual-augmented-reality-application-in-android/hero.jpg
    alt: Creating a simple visual Augmented Reality application in Android Hero Image
---
Augmented Reality (AR) is a new technology that merges digital elements with real-world objects. Its users may interact with their environments with their smartphones.
<!--more-->
Augmented Reality is currently one of the most revolutionary technology features in recent years. With AR, we can bend Reality in how we want, which is like an extension of Reality, or, we can say, re-evaluating the future. 

AR is currently being used from many perspectives on innovation and safety. I am excited to share what I think will be the next substantial technological innovation. This article will learn how to create a simple AR application.

### Table of contents
- [Prerequisites](#prerequisites)
- [Configuring android studio](#configuring-android-studio)
- [Adding the 3D model to the project](#adding-the-3D-model-to-the-project)
- [Adding sceneform UX library](#adding-sceneform-ux-library)
- [Adding permissions for camera](#adding-permissions-for-camera)
- [Application design](#application-design)
- [Java codes](#java-codes)
- [Running the app](#Running-the-app)
- [Conclusion](#conclusion)
- [References](#References)

### Prerequisites
- You must have a basic understanding of the Java programming language.
- Have [Android Studio](https://developer.android.com/studio?gclid=CjwKCAiA4veMBhAMEiwAU4XRr-huBPp7DhmSVFRy0tk4f02kyJqfuLify3KrbKV0HbNjQvLKImmJohoC9QMQAvD_BwE&gclsrc=aw.ds) 3.1 or above installed.
- Your device should have Google Play Services for AR.

#### Step one: Configuring android studio
Your Android IDE should be updated to version 3.0 or above to create an Augmented Reality application. Now open your Android Studio, create a new project, and here you give a name to your app. Set the language to Java; the minimum API level should be at least API 24: Android 7.0.

The next step is to download the plugin necessary for supporting Augmented Reality by importing 3D models and viewing them. To do this, go to settings (in Android Studio IDE), then to plugins and search for Google Sceneform Tools, install it, and restart your Android Studio.

#### Step two: Adding the 3D model to the project
Well, for AR apps, we need Sceneform SDK. SceneForm 1.15.0 is incredibly popular.

**Note: You might face errors while getting the "Google Sceneform Tools (Beta)" plugin within the latest Android Studio 3.0. You can use Sceneform 1.16.0 SDK but manually set it up.** 

The Sceneform folders are [here](https://github.com/iannnooooo/Asset). Download and copy them in your app's folder. Download and copy them in your app's folder. Go to Gradle > settings.gradle(Project Settings) and add these lines:

```gradle
include ‘:sceneform’
project(‘:sceneform’).projectDir = new File(‘sceneformsrc/sceneform’)
include ‘:sceneformux’
project(‘:sceneformux’).projectDir = new File(‘sceneformux/ux’)
```

They will add sceneformux and sceneform to your project.

Then go to Gradle > build.gradle(Module:app) and add the line below inside the dependencies block.

```gradle
api project(":sceneformux")
```

You can download any 3D file from the internet. These files show be .glb. You can download my simple 3D object [here](https://drive.google.com/file/d/1J6Cv8w3jDDqC0i92YpPQxtTujJ_k1-F1/view?usp=sharing). 

Now you need to add the 3D files to your project. To do this, go to Android Studio, right-click on res directory -> New Android Resouce Directory, and change resouce type to `raw`. On this `raw` folder, copy the `.glb` file under it.

### Step three: Adding permissions to our application
In your AndroidManifest.xml, add the following lines of code to ask for permission to access the camera, check some features in the phone's hardware, and the last line indicates that the app requires Google play services for AR.

```bash
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:glEsVersion="0x00030000" android:required="true"
<uses-feature android:name="android.hardware.camera.ar" android:required="true"/>
```

They are to be added on the application block.

Add this code before Activity block:

```bash
<meta-data android:name="com.google.ar.core" android:value="required" />
```

ARcore is needed to be intalled.

In general, the AdnroidManifest.xml codes are:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
	package="com.wheic.arapp">
	<uses-permission android:name="android.permission.CAMERA" />

	<uses-feature
		android:glEsVersion="0x00030000"
		android:required="true" />

	<uses-feature
		android:name="android.hardware.camera.ar"
		android:required="true" />
	
	<application
		android:allowBackup="true"
		android:icon="@mipmap/ic_launcher"
		android:label="@string/app_name"
		android:roundIcon="@mipmap/ic_launcher_round"
		android:supportsRtl="true"
		android:theme="@style/Theme.ARApp">

		<meta-data
			android:name="com.google.ar.core"
			android:value="required" />

		<activity android:name=".MainActivity">
			<intent-filter>
				<action android:name="android.intent.action.MAIN" />

				<category android:name="android.intent.category.LAUNCHER" />
			</intent-filter>
		</activity>
	</application>

</manifest>
```

#### Step four: Fixing errors
The files we imported contain some java files that need correction, which may not occur, but if it generates errors, you will change the following paths to generate the errors.

```xml
android.support.annotation change to androidx.annotation.
androidx.core.app change to androidx.fragment.app.
android.support.v7.widget. change to androidx.appcompat.widget. 
```

#### Step five: Dessinging our application's UI
In our activity_main.xml, let us design the layout of the app.

We will use ArFragment because it contains plenty of features itself. It asks you to download ARCore if it is not installed on your phone and asks for camera permission if it's not granted.

Here is the code for activity_main.xml:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
	xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:app="http://schemas.android.com/apk/res-auto"
	xmlns:tools="http://schemas.android.com/tools"
	android:layout_width="match_parent"
	android:layout_height="match_parent"
	tools:context=".MainActivity">

	<fragment
		android:id="@+id/arCameraArea"
		android:name="com.google.ar.sceneform.ux.ArFragment"
		android:layout_width="match_parent"
		android:layout_height="match_parent"
		app:layout_constraintBottom_toBottomOf="parent"
		app:layout_constraintEnd_toEndOf="parent"
		app:layout_constraintStart_toStartOf="parent"
		app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step six: Implementing our application's functionality
We now write the codes for the app in our `MainActivity.java`. First, make an object for ArFragment.

```java
private ArFragment aCam;
```

Next, we create functions to check if the device meets the minimum requirements to run the app. If API is equal to or above 24, or if OpenGL is equal to or above 3.0.
**Note: These are the mandatory requirements to run the app.**

```java
public static boolean checkSystemSupport(Activity activity) {
	if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {

		String openGlVersion = ((ActivityManager) Objects.requireNonNull(activity.getSystemService(Context.ACTIVITY_SERVICE))).getDeviceConfigurationInfo().getGlEsVersion();
		if (Double.parseDouble(openGlVersion) >= 3.0) {
			return true;
		} else {
			Toast.makeText(activity, "OpenGl Version 3.0 or higher is needed", Toast.LENGTH_SHORT).show();
			activity.finish();
			return false;
		}
	} else {
		Toast.makeText(activity, "App does not support required Build Version", Toast.LENGTH_SHORT).show();
		activity.finish();
		return false;
	}
}
```

If the above function returns true, the rest of the code will be executed.
We now need to link ArFragement with it`s id used in `activity_main.xml`.

```java
arCam = (ArFragment) getSupportFragmentManager().findFragmentById(R.id.arCameraArea);
```

We now use the `onTabListener` to point out the model when the screen is tabbed. We call `setOnTabArPlaneListener` and an anchor is formed, which will help to bring objects on the screen and maintain their position in space. `ModelRendarable` is now used with its functions to render the model by attaching it to an AncorNode.

```java
arCam.setOnTapArPlaneListener((hitResult, plane, motionEvent) -> {
	
	clickNo++;
	if (clickNo == 1) {

		Anchor anchor = hitResult.createAnchor();
		ModelRenderable.builder()
				.setSource(this, R.raw.gfg_gold_text_stand_2)
				.setIsFilamentGltf(true)
				.build()
				.thenAccept(modelRenderable -> addModel(anchor, modelRenderable))
				.exceptionally(throwable -> {
					AlertDialog.Builder builder = new AlertDialog.Builder(this);
					builder.setMessage("Something is not right" + throwable.getMessage()).show();
					return null;
				});
	}
});
```

We now add the TransformableNode that helps the user to interact with the model

```java
private void addModel(Anchor anchor, ModelRenderable modelRenderable) {

	AnchorNode anchorNode = new AnchorNode(anchor);
	anchorNode.setParent(arCam.getArSceneView().getScene());
	TransformableNode transform = new TransformableNode(arCam.getTransformationSystem());
	the TransformableNode
	transform.setParent(anchorNode);
	transform.setRenderable(modelRenderable);
	transform.select();
}
The code above creates an AnchorNode and attaches it to ArFragment and TrasformableNode then attaching the Model with TrasformableNode
Below are the complete codes for MainActivity.java
import android.app.Activity;
import android.app.ActivityManager;
import android.app.AlertDialog;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.ar.core.Anchor;
import com.google.ar.sceneform.AnchorNode;
import com.google.ar.sceneform.rendering.ModelRenderable;
import com.google.ar.sceneform.ux.ArFragment;
import com.google.ar.sceneform.ux.TransformableNode;
import java.util.Objects;
public class MainActivity extends AppCompatActivity {
	private ArFragment arCam;
	private int clickNo = 0;

	public static boolean checkSystemSupport(Activity activity) {
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
			String openGlVersion = ((ActivityManager) Objects.requireNonNull(activity.getSystemService(Context.ACTIVITY_SERVICE))).getDeviceConfigurationInfo().getGlEsVersion();
			if (Double.parseDouble(openGlVersion) >= 3.0) {
				return true;
			} else {
				Toast.makeText(activity, "OpenGl Version 3.0 or higher is needed", Toast.LENGTH_SHORT).show();
				activity.finish();
				return false;
			}
		} else {
			Toast.makeText(activity, "App does not support required Build Version", Toast.LENGTH_SHORT).show();
			activity.finish();
			return false;
		}
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		if (checkSystemSupport(this)) {
			arCam = (ArFragment) getSupportFragmentManager().findFragmentById(R.id.arCameraArea);		
			arCam.setOnTapArPlaneListener((hitResult, plane, motionEvent) -> {
				clickNo++;
				if (clickNo == 1) {
					Anchor anchor = hitResult.createAnchor();
					ModelRenderable.builder()
							.setSource(this, R.raw.gfg_gold_text_stand_2)
							.setIsFilamentGltf(true)
							.build()
							.thenAccept(modelRenderable -> addModel(anchor, modelRenderable))
							.exceptionally(throwable -> {
								AlertDialog.Builder builder = new AlertDialog.Builder(this);
								builder.setMessage("Something is not right" + throwable.getMessage()).show();
								return null;
							});
				}
			});
		} else {
			return;
		}
	}

	private void addModel(Anchor anchor, ModelRenderable modelRenderable) {
		AnchorNode anchorNode = new AnchorNode(anchor);
		anchorNode.setParent(arCam.getArSceneView().getScene());
		TransformableNode model = new TransformableNode(arCam.getTransformationSystem());
		model.setParent(anchorNode);
		model.setRenderable(modelRenderable);
		model.select();
	}
}
```

### Running the app
Connect your Android phone to the PC via USB (USB debugging), and run the app. To get the sample APK for this project, click [here](https://drive.google.com/drive/folders/1AXTHCmvrLldv_QILwsMyNadve74fMwhQ?usp=sharing).

### Conclusion 
In conclusion, we have gone through augmented reality and how to make a simple visual augmented reality app. This article serves only as an introduction to building a visual augmented reality android application. It's highly recommended to try out the code manually by reading further from the referenced articles.

### References
You can learn more about Augmented Reality programming from these [AR codes](https://developers.google.com/ar) and [Codiant](https://www.codiant.com/services/augmented-reality-app-development).

Happy coding!

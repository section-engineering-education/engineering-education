Augmented Reality (AR) is a new technology that merges digital elements with real-world objects. Its users may interact with their environments with their smart phones.

Augmented Reality is currently one of the most revolutionary features of technology in recent years. With AR, we can bend reality in how we want. This is like an extension of reality, or, we can say, re-evaluating the future. AR is currently being used from many perspectives as to innovation and safety
I am excited to share with you what I think will be the next huge technological innovation. In this article, we will learn how to create a simple AR application with Android Studio.
### Table of contents
- [prerequisites](#prerequisites)
- [Configuring android studio](#configuring-android-studio)
- [Adding the 3D model to the project](#adding-the-3D-model-to-the-project)
- [permissions](#permissions)
- [Fixing errors](#Fixing-errors)
- [Application design](#application-design)
- [Java codes](#java-codes)
- [Running the app](#Running-the-app)
- [Conclution](#conclution)
- [References](#References)


### prerequisites

- You must have a basic understanding of the Java programming language.
- You should be equipped with Android Studio 3.1 or above.
- Your device should have Google Play Services for AR.

### configuring android studio
To create an Augmented Reality application, your Android IDE should be updated to version 3.0 or above. Now open your Android Studio, create a new project, and here you give a name to your app, Set the language to Java; the minimum API level should be at least API 24: Android 7.0. The first part of configuring Android Studio is done.

The next step is to download the plugin necessary for supporting Augmented Reality by importing 3D models and viewing them. To do this, go to settings (in Android Studio IDE), then to plugins and search for Google Sceneform Tools, install it, and restart your Android Studio.

### Adding the 3D model to the project.

Well, for AR apps we want Sceneform SDK. SceneForm 1.15.0 is incredibly popular, but I faced of errors while getting the “Google Sceneform Tools (Beta)” plugin within the latest Android Studio 3.0. So I used Sceneform 1.16.0 SDK which I had to manually set it up.
The Sceneform folders are [here](https://github.com/iannnooooo/Asset). Download and copy them in your app's folder.
Then  now go to Gradle > settings.gradle(Project Settings) and add these lines:

```java
include ‘:sceneform’
project(‘:sceneform’).projectDir = new File(‘sceneformsrc/sceneform’)
include ‘:sceneformux’
project(‘:sceneformux’).projectDir = new File(‘sceneformux/ux’)
```
They will add sceneformux and sceneform to your project.

Then go to Gradle > build.gradle(Module:app) and add the line below inside the dependencies block.

```java
api project(":sceneformux")
```
You should have some 3D models. You can download any 3D file from internet. These files show be .glb. You can download my simple 3D object [here](https://drive.google.com/file/d/1J6Cv8w3jDDqC0i92YpPQxtTujJ_k1-F1/view?usp=sharing). 

Now you need to add the 3D files in your project. To do this, go to Android Studio right click on res directory then New > Android Resouce Directory and change Resouce Type to Raw. On this Raw folder copy the .glb file under it.

### permissions

On the app > manifests > AdnroidManifest.xml we add some lines of codes to ask for permission to access camera, check some features in the phone`s hardware and the last line indicates that the app requires Google play services for AR.

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:glEsVersion="0x00030000" android:required="true"
<uses-feature android:name="android.hardware.camera.ar" android:required="true"/>

```
They are to be added on the application block.

Add this code before Activity block:
```xml
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
### Fixing errors

The files we imported contains some java files that need correction. This may not occur but in case it generates errors, you will to change the following paths that will generate the errors.

android.support.annotation change to androidx.annotation.
androidx.core.app change to androidx.fragment.app.
android.support.v7.widget. change to androidx.appcompat.widget. 

### Application design

On the res > layout > activity_main.xml, we now design the layout of the app.

We will use ArFragment because it contains plenty of features itself. It asks you to download ARCore if it’s not installed on your phone and asks for camera permission if it’s not granted.

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

### Java codes
We now write the codes for the app. They are written on java > MainActivity.java.

First, make an object for ArFragment
```java 
private ArFragment aCam;
```
Next, we create functions to check if the device meets minimum requirements in order to run the app.

We check:
-If API is equal to or above 24,
-If OpenGL is equal to or above 3.0.

These are the mandatory requirements to run the app.

The codes are:
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
Now, if the above function returns true, the rest of the code will be executed.

We now need to link ArFragement with it`s id used in activity_main.xml.
```java
arCam = (ArFragment) getSupportFragmentManager().findFragmentById(R.id.arCameraArea);
```
We now use the onTabListener to point out the model when the screen is tabbed. We call setOnTabArPlaneListener and an anchor is formed, which will help to bring objects on the screen and maintain their position in space. ModelRendarable is now used with its functions to render the model by attaching it to an AncorNode.
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
We now add the TransformableNode that helps the user to interact with the model.
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
```
The code above creates an AnchorNode and attaches it to ArFragment and TrasformableNode then attaching the Model with TrasformableNode

Below are the complete codes for MainActivity.java

```java
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

Connect your Android phone to the PC via USB (USB debugging), and run the app.
To get the app click [here](https://drive.google.com/drive/folders/1AXTHCmvrLldv_QILwsMyNadve74fMwhQ?usp=sharing)

### Conclusion 

In conclusion, we have gone through what augmented reality is and how to make a simple visual augmented reality app. This article serves only as an introduction to building a visual augmented reality android application. It's highly recommended to try out the code manually by reading further from the referenced articles.

### References
You can learn more about Augmented Reality programming from these articles.
[here](https://developers.google.com/ar)

[here](https://www.codiant.com/services/augmented-reality-app-development).
The link to my GitHub repository souce code for Augmented Reality application is [here](https://github.com/iannnooooo/ARapp)
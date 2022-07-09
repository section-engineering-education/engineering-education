---
layout: engineering-education
status: publish
published: true
url: /creating-a-simple-augmented-reality-app-in-android/
title: Creating a Simple Augmented Reality App in Android
description: This tutorial will guide the reader on how to create a simple augmented reality (AR) app in Android. AR allows people to process the physical and digital simultaneously, eliminating the need to mentally bridge the two.
author: Kirwa-Elyjah
date: 2022-06-13T00:00:00-10:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-simple-augmented-reality-app-in-android/hero.png
    alt: Creating Augmented Reality app in Android
---
In this tutorial, we will learn how to create an Augmented Reality App in Kotlin to keep up with the quickly evolving tech world. This application will allow you to add properties to an image using your phone's camera.
<!--more-->

### Prerequisites
To follow along the reader should have the following:
- The latest version of [Android Studio](https://developer.android.com/studio) installed on your machine.
- You should have knowledge of the Kotlin programming language.
- Have a physical device that is supported by Google Play Services for AR. 

> NOTE: Not all Android devices support ARcore. Check from [here](https://developers.google.com/ar/devices) the list of supported devices. Also, it's worth noting that you can run the application on an Android emulator. To learn how this is done, click out this [guide](https://developers.google.com/ar/develop/java/emulator).

### Objectives
By the end of this tutorial, the reader will have learned the following:
- What Augmented Reality is.
- How to set up an Android studio for augmented reality.
- How to place 3D objects in the AR scene.

### What is Augmented Reality (AR)?
This is a technologically augmented version of the real world. It is created by the use of synthetic graphic elements, music, or other sensory stimulation.

It is a new technology that merges digital elements with real-world objects. Mobile phone users can interact with their environments using their smartphones. With AR, we can bend reality how we want, which is like an extension of reality, or, we can say, re-evaluating the future. 

### Creating an Android project
Launch Android Studio and create a new project.

![create-project](/engineering-education/creating-a-simple-augmented-reality-app-in-android/create-ar-project.png)

>NOTE: The minimum SDK version should be API 24: Android 7 (Nougat).

After the project is ready, we will need to add the `Sceneform` plugin. This plugin is necessary to support Augmented Reality.

On the Android Studio menu, click on `File` then `Settings` and a new window will open. On the right tab, click `Plugins`, and search for `Sceneform` on the marketplace. Click install and apply. Restart Android Studio for the changes to take effect.

### Installing Sceneform plugin

![install-plugin](/engineering-education/creating-a-simple-augmented-reality-app-in-android/install-sceneform-plugin.png)

After the IDE restarts, you might notice an error that pops up. This error reads as follows:

"Plugin error: Plugin 'Google Sceneform Tools (Beta)' is compatible with IntelliJ IDEA only because it doesn't define any explicit module dependencies".

You can solve this error by using Sceneform SDK v1.16.0. Also, you can set up everything manually.

### Setting up manually
1. Download the Sceneform files from [here](https://drive.google.com/file/d/1D4NFEC2TGaILhJfnKC6L0kEtFhim9yfU/view?usp=sharing). Extract these files into your app's folder and head to the next step.

2. Go to Gradle and open `gradle.settings` and add the following lines:
   
```bash
include ':sceneform'
project(':sceneform').projectDir = new File('sceneformsrc/sceneform')
include ':sceneformux'
project(':sceneformux').projectDir = new File('sceneformux/ux')
```

3. Open `build.gradle(Module:app)` and add the following line in the dependencies:

```bash
api project(":sceneformux")
```

4. Sync the project with the new Gradle files and wait for the build to finish.

### Setting up the AR 3D models in Android Studio
In our project, we will use Sceneform SDK 1.15.0 which is incredibly popular. There are two ways to get the 3D models:

1. You can get the 3D models online and download the `glb` files. Initially, Google's Poly was used but was later scrapped. You can find other alternatives online with some of them you might pay for the models. [Sketchfab](https://sketchfab.com/tags/augmented-reality) is a good example but you have to purchase it.

2. Design and build the models by yourself. You can use software like [Blender](https://www.youtube.com/watch?v=elUJCEC06r8) to make 3D models which you can use on your application.

In this tutorial, we'll use a ready-made model which can be downloaded from [here](https://drive.google.com/file/d/1UDdrAXgOlFndmFEnal7CMLWoJiqEDpP3/view?usp=sharing).

After you download the model, go to Android Studio and on the `res` folder, right-click and create a new `Android Resource Directory`. Change the resource type to `raw` and click on OK. Inside this directory, paste the `model.glb` file you just downloaded.

### Enabling permissions
Open the `Manifest` and add the following permissions:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.CAMERA"/>
<uses-feature android:glEsVersion="0x00030000" android:required="true"/>
<uses-feature android:name="android.hardware.camera.ar" android:required="true"/>
```

Also, in the `<application>` body, add the following metadata:

```xml
<application ..>
    ...
    <meta-data
        android:name="com.google.ar.core"
        android:value="required" />
    ...
</application
```

### Building the App UI
The application will require only one screen which will be the camera screen. Open the `activity_main.xml` and add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <fragment
        android:id="@+id/sceneform_ar_scene_view"
        android:name="com.google.ar.sceneform.ux.ArFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

An error may appear on line `android:name="com.google.ar.sceneform.ux.ArFragment"`. This is because the `ArFragment` class is not found.

To solve this, open `build.gradle` app level and add the following dependency and sync the project:

```bash
implementation 'com.google.ar.sceneform.ux:sceneform-ux:1.17.1'
```

### Implementing apps main logic
Open `ActivityMain.kt` file and first create a function that checks if a device supports ARcore. The function should be as follows:

```kotlin
private const val MIN_OPENGL_VERSION = 3.0

private fun isDeviceArSupported(context : Context) : Boolean {
    when {
        Build.VERSION.SDK_INT >= Build.VERSION_CODES.N -> {
            val openGlVersionString = (context.getSystemService(AppCompatActivity.ACTIVITY_SERVICE) as ActivityManager)
                .deviceConfigurationInfo
                .glEsVersion
            if (openGlVersionString.toDouble() < MIN_OPENGL_VERSION) {

                Toast.makeText(this, "Minimum Open GL version should be 3 or later", Toast.LENGTH_LONG)
                    .show()
                this.finish()
                return false
            }
            return true
        }
        else -> {
            Toast.makeText(this, "Android version should be 7 or later versions",
                Toast.LENGTH_LONG
            )
                .show()
            this.finish()
            return false
        }
    }
}
```

Using the phone's Open GL version, the above function checks if a device is AR supported. For a device to fully support AR, it must be Android 7 or later versions and the minimum Open GL version should be 3.

The next step is to add our model to a scene. This will be done by creating a function that places a node into an AR scene. The function is as follows:

```kotlin
private fun addModelToScene(arFragment: ArFragment, anchor: Anchor, renderable: Renderable) {
    val transformableNode = TransformableNode(arFragment.transformationSystem)
    transformableNode.renderable = renderable

    val anchorNode = AnchorNode(anchor)
    transformableNode.setParent(anchorNode)
    arFragment.arSceneView.scene.addChild(anchorNode)
    transformableNode.select()
}
```

Finally, the last thing is to place objects in the AR scene. This can be done as follows:

```kotlin
@RequiresApi(Build.VERSION_CODES.N)
private fun placeObjectOnScene(fragment: ArFragment, anchor: Anchor, uri: Uri) {
    ModelRenderable.builder()
        .setSource(fragment.context, uri)
        .build()
        .thenAccept(Consumer { renderable: ModelRenderable? ->
            addModelToScene(
                fragment, anchor, renderable!!
            )
        })
        .exceptionally { throwable: Throwable ->
            Toast.makeText(
                fragment.context, "Error:" + throwable.message,
                Toast.LENGTH_LONG
            ).show()
            null
        }
}
```

> Note: Remember to annotate with `@RequiresApi(Build.VERSION_CODES.N)` to make sure that the function is only called on Android 7 or later versions.

The full `MainActivity.kt` code is as follows:

```kotlin
private const val MIN_OPENGL_VERSION = 3.0

class MainActivity : AppCompatActivity() {

    private lateinit var arFragment: ArFragment
    private lateinit var binding: ActivityMainBinding

    @RequiresApi(VERSION_CODES.N)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (isDeviceArSupported(this)) {
            binding = ActivityMainBinding.inflate(layoutInflater)
            setContentView(binding.root)

            arFragment =
                (supportFragmentManager.findFragmentById(R.id.sceneform_ar_scene_view) as ArFragment?)!!
            this.arFragment!!.setOnTapArPlaneListener { hitResult: HitResult, plane: Plane?, motionEvent: MotionEvent? ->
                val anchor = hitResult.createAnchor()
                placeObjectOnScene(arFragment!!, anchor, Uri.parse("model.glb"))
            }
        }
    }

    private fun isDeviceArSupported(context: Context): Boolean {
        when {
            Build.VERSION.SDK_INT >= VERSION_CODES.N -> {
                val openGlVersionString =
                    (context.getSystemService(ACTIVITY_SERVICE) as ActivityManager)
                        .deviceConfigurationInfo
                        .glEsVersion
                if (openGlVersionString.toDouble() < MIN_OPENGL_VERSION) {

                    Toast.makeText(
                        this, "Minimum Open GL version should be 3 or later",
                        Toast.LENGTH_LONG
                    ).show()
                    this.finish()
                    return false
                }
                return true
            }
            else -> {
                Toast.makeText(
                    this, "Android version should be 7 or later versions",
                    Toast.LENGTH_LONG
                )
                    .show()
                this.finish()
                return false
            }
        }
    }

    private fun addModelToScene(arFragment: ArFragment, anchor: Anchor, renderable: Renderable) {
        val transformableNode = TransformableNode(arFragment.transformationSystem)
        transformableNode.renderable = renderable

        val anchorNode = AnchorNode(anchor)
        transformableNode.setParent(anchorNode)
        arFragment.arSceneView.scene.addChild(anchorNode)
        transformableNode.select()
    }

    @RequiresApi(VERSION_CODES.N)
    private fun placeObjectOnScene(fragment: ArFragment, anchor: Anchor, uri: Uri) {
        ModelRenderable.builder()
            .setSource(fragment.context, uri)
            .build()
            .thenAccept(Consumer { renderable: ModelRenderable? ->
                addModelToScene(
                    fragment, anchor, renderable!!
                )
            })
            .exceptionally { throwable: Throwable ->
                Toast.makeText(
                    fragment.context, "Error:" + throwable.message,
                    Toast.LENGTH_LONG
                )
                    .show()
                null
            }
    }
}
```

### Running the app
To run the app, first, make sure you have an active internet connection on your device. Run the app and focus on a surface. Google AR will start by detecting a surface, and after it detects tap on the screen to place our object there. You can then try this on different surfaces as you explore.

### Conclusion
In this tutorial, we have learned how we can create an Augmented Reality app and place objects in a scene. AR does more than this. Keep exploring more about Augmented Reality by reading more articles on this topic.

Happy coding :)

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)

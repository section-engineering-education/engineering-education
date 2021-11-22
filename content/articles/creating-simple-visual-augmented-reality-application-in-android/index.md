Augmented Reality (AR) is a technology that combines digital content with real-world objects. It allows users to interact with the world around them through their mobile devices.

Augmented Reality is currently one of the most revolutionary features of technology in recent years. With AR, we can bend reality in the way that we want. This is like an extension of reality, or we can say, reevaluating the future. AR is currently being used from many different perspectives like for innovation and safety. AR helps us interact with the environment we are in.
Augmented Reality is almost as same as virtual Reality but there is a slight difference between them. 
The difference between them is:
AR uses the being real-world terrain and puts virtual information on top of it to enhance the experience while virtual reality immerses druggies, allowing them to"inhabit"an entirely different terrain altogether, specially a virtual one created and rendered by computers. Druggies may be immersed in an animated scene or a factual position that has been mugged and bedded in a virtual reality app. Through a virtual reality bystander, druggies can look up, down, or any which way, as if they were actually there.
The other difference is that VR uses a headset while AR just uses  mobile devices using their camera.

I am excited to share with you what I think will be the next huge technological innovation. In this article, we will learn how to create a simple AR application with Android Studio.

### Table of contents
- [prerequisites](#prerequisites)
- [Configuring android studio](#configuring-android-studio)
- [Adding the 3D model to the project](#adding-the-3D-model-to-the-project)
- [Adding sceneform ux library](#adding-sceneform-ux-library)
- [Adding permissions for camera](#adding-permissions-for-camera)
- [Application design](#application-design)
- [Java codes](#java-codes)
- [Running the app](#Running-the-app)
- [Conclution](#conclution)
- [References](#References)


### prerequisites

- You must have a basic understanding of the Java programming language.
- You should be equipped with Android Studio 3.1 or above.

### configuring android studio
To create an augmented reality application, you must have Android Studio 3.1 or above. Now open your Android Studio, create a new project, and here you give a name to your app, Set the language to Java; the minimum API level should be at least API 24: Android 7.0. Now you have completed the first part of configuring the IDE to create an AR app.

The next step is to download the plugin necessary for supporting Augmented Reality by importing 3D models and viewing them. To do this, go to settings (in Android Studio IDE), then to plugins and search for Google Sceneform Tools, install it, and restart your Android Studio.
You should have some 3D models. You can download 3D objects from:
[here](https://drive.google.com/folderview?id=1Ls6fzMiFTx8_uE7A6or_l6YnouJIFSsc). I would suggest you use a 3D object with over 75 points. 

### Adding the 3D model to the project.

After downloading the folders, you will copy the sampledata folder to the go-to Android Studio, right-click on the app section, select "open in," then select "Explorer." Paste the sampledata folder here.

In the Java section, right-click and select the new folder "assets." Right-click on the new assets directory and select "open in Explorer" and paste the AR.src (from the one that you downloaded in the assets folder) file there. This is shown here.

 ![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/assets.png)

### Adding sceneform ux library

We add the libraries to dependacies in build.grindle:(app)
They are 
```java
    implementation 'com.google.ar.sceneform.ux:sceneform-ux:1.17.1'
    implementation 'com.google.ar.sceneform:core:1.17.1'
    implementation 'com.google.sceneform:1.17.1'
```
They are to be implemented as shown here 
![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/dependencies.png)

On the same build.gridle(:app) window add the highlighted codes.


![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/dependenciesid.png)

Add the highlighted classpath as shown here 

![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/dependence.png)

Lastly, add the plugin id in build.gridle(:app)

 ![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/dependenciesid.png)



### Adding permissions for camera

On the AndroidManifest.xml page, add the following codes;

```java    
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-feature android:name="android.hardware.camera.ar" android:required="true"/>
```

They should be as shown here
 ![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/permission.png)

### Application design

We now need to configure the layout of the application. On the activity_main.xml window under layout folder modify existing codes to these shown below.

![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/mainactivity.png)

Note that we change the layout from the dafault layout to relative layout.

### Java codes
These codes are written in the MainActivity.Java window. These codes are:
```java
package com.example.AugmetedReality2;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {
    private ArFragmet arFragmet;

       @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        arFragmet=(ArFragmet)getSupportFragmentManager().findFragmentById(R.id.arFragment);
        arFragmet.setOnTabArPlaneListener((hitResult, plane, motionEvent) ->{
            final Anchor anchor=hitResult.createAnchor();
            ModelRenderable.builder()
                    .setSource(context:this Uri.parse("AR.sfb"))
                    .build()
                    .theAccept(modelRenderable -> addModelToScene(anchor, modelRenderable));

        });
        private void addModelToScene(Anchor anchor, ModelRenderable modelRenderable){
            AnchorNode_node=new AnchorNode(anchor);
            TrasformableNode trasformableNode =new TrasformableNode(arFragmet.getTransformationSystem());
            trasformableNode.setParent(node);
            trasformableNode.setRenderable(modelRenderable);


            arFragmet.getArSceneView().getScene().addChild(node);
            trasformableNode.select();
        }
    }
}
```
This code should be implemented as shown:

 ![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/mainactivity_app.png)

  ![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/mainactivityjava.png)

The codes will allow users to drag or trasform the 3D object.

### Running the app

Connect your Android phone to the PC via USB (USB debugging), and run the app.

### Conclusion 

In conclusion, we have gone through what augmented reality is and how to make a simple visual augmented reality app. This article serves only as an introduction to building a visual augmented reality android application. It's highly recommended to try out the code manually by reading further from the referenced articles.

### References
You can learn more about Augmented Reality programming from these articles.
[here](https://developers.google.com/ar)

[here](https://www.codiant.com/services/augmented-reality-app-development)
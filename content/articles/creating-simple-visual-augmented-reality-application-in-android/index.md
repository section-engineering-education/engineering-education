
Augmented Reality(AR) is currently one of the revolutionizing features of technology in recent years. With AR we can bend reality in the way that we want, this is like an extension of reality or we can say reevaluating the future.

AR supplements what we see in real-life by the addition of digital content to the real-life objects presented by digital visuals in the actual. AR is one of the fastest-growing technologies in the world. Augmented Reality is now used in different areas like in web applications, healthcare, transportation, construction, and gaming. 

In this artical we will learn how to create a simple AR application with Android Studio.

### Introduction

Augmented Reality(AR), is a technology used to enhance real-life by adding digital content to actual features to make them look they exist in a real-life environment. This is achieved by the use of digital visual elements, sound, or other sensory stimuli delivered by technology.

### prerequisites

You must have some basics on Java programming language.
You should be equiped with Andriod Studio 3.1 and above.

### configuring android studio
To create an augmented reality application you should have android studio 3.1 and above. Now open your Android Studio, create a new project, and here you give a name to your app, Set language to Java, minimum API level should be at least  API 24: Android 7.0. Now you have completed the first part of configuring the IDE to create an AR app.

The next step is you download the plugin necessary for supporting Augmented Reality by importing 3D models and viewing them. To do this (in Android Studio IDE) go to settings then to plugins and search for Google  Sceneform tools and install it and restart your android studio.

You should have some 3D models. You can download 3D objects from 
[here](https://drive.google.com/folderview?id=1Ls6fzMiFTx8_uE7A6or_l6YnouJIFSsc)

### Adding the 3D model to the project.

After downloading the folders you will copy the sampledata folder to the go-to Android Studio, right-click on the app section, select open in then select explorer. Paste sampledata folder here. 

On the Java section, right-click, select the new folder the assets. Right-click on the new assets directory and select open in explorer and paste AR.src(from the one that you downloaded in the assets folder) file there. This is shown here

 ![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/assets.png)

### Adding sceneform ux library

We add the libraries to dependacies in build.grindle:(app)
They are 
    implementation 'com.google.ar.sceneform.ux:sceneform-ux:1.17.1'
    implementation 'com.google.ar.sceneform:core:1.17.1'
    implementation 'com.google.sceneform:1.17.1'

They are to be implemented as shown here 
![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/dependencies.png)

On the same build.gridle(:app) window add the highlighted codes.


![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/dependenciesid.png)

Add the highlighted classpath as shown here 

![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/dependence.png)

Lastly, add the plugin id in build.gridle(:app)

 ![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/dependenciesid.png)



### Adding permissions for camera

On the AndroidManifest.xml page, add the following codes
    
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-feature android:name="android.hardware.camera.ar" android:required="true"/>

They should be as shown here
 ![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/permission.png)

### Application design

We now need to configure the layout of the application. On the activity_main.xml window modify existing codes to these shown below 

![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/mainactivity.png)

### Java codes
These codes are written in the MainActivity.Java window. These codes are:
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
They should be implemented as shown:

 ![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/mainactivity_app.png)

  ![alt text](/engineering-education/creating-simple-visual-augmented-reality-application-in-android/mainactivityjava.png)

### Running the app

Connect your Android phone to the pc via USB(USB debugging), and run the app.

### Conclusion 

In conclusion, we have gone through what Augmented Reality is, how to make a simple visual augmented reality app. This article serves only as an introduction to building a Visual Augmented Reality android application. It's highly recommended to try out the code manually by reading further from the referenced articles.

### References
You can learn more about Augmented Reality programming from these articles.
[here](https://developers.google.com/ar)

[here](https://www.codiant.com/services/augmented-reality-app-development)


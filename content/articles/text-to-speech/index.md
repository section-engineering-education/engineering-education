### Developing a text to speech application with Android Studio in Java

#### Introduction
To develop a fully satisfying application, there are several prerequisites in terms of hardware and software required to develop the application to completion. In this article, we are going to learn how to develop a **text to speech** and **speech to text** application using android studio with java. This tutorial will be super helpful since you can not only learn how to develop the application stated in this tutorial but also use the knowledge to develop other applications using the same resources and prerequisites.

#### Prerequisites
We are now going to take a look at some of the required resources to develop the text-to-speech application.

**Note:** The prerequisites include both hardware and software requirements.
- A computer with reliable RAM and ROM.
- [Android Studio](https://developer.android.com/studio/install)
- Basic knowledge of Java.

#### Setting up a project
Now to set up an environment to develop the application with android studio.

First, launch your android studio and create a new project. Make the selections below as guided to avoid making unnecessary options that may consume more space and slow your application.
   - Select `Empty Activity` to develop your application from scratch and not with the templates provided since we may not require them
   - Name your project **Text to Speech**. Leave the `package name` and project `location` to default to avoid any errors that might arrive for the reason.
   - Select `language` to java since this will be the language we will be using throughout the tutorial.
   - Select minimum SDK to Android 4.4(Kitkat) since it will support 99% of Android Devices and click the `FINISH` button.
   
Your setup should appear as below.

![Set up](/engineering-education/text-to-speech/activity.png)

#### Navigating Android Studio
At first glance, you will note that you have been presented with two tabs. The **activity_main.xml** tab where you will be able to develop and modify the templates and palettes presented to achieve the desired outlook of your application.
The tab is further divided into three sections, code, design, and spit.
If you accidentally close the activity_main.xml tab, you can always reopen it in the **app>res>layout>activity_main.xml**.

![Reopening .xml file](/engineering-education/text-to-speech/xml.png)


The other tan is the **MainActivity.java**. As the file name extension displays, this is where that back-end action goes. We will write a code in java to make the templates and palettes interactive. The Main activity will have the package name, necessary classes imported, and the  Main method as shown below.

```java
package com.example.texttospeech;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```
To re open the MainActivity.java tab in case of accidental closure, you can find it in **app>java>com.example.texttospeech>MainActivity.java**.

![Reopening .java file](/engineering-education/text-to-speech/java.png)

#### Developing a satisfactory outlook of the application
Now we will get deeper into the **.xml** file extension. This is the file that gives you the freedom to develop an application with a presentation that suits you. You can achieve that by modifying the code of the palettes or adjusting the palettes to the suitable physical appearance you desire.

To help with the design of the application, let us develop an application with a simple outlook having both text to speech and speech to text on one tab as shown below.

![Project Outlook](/engineering-education/text-to-speech/output.png)

The code to achieve the above outlook is as follows.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <EditText
        android:id="@+id/editTextTextPersonName"
        android:layout_width="300dp"
        android:layout_height="56dp"
        android:ems="10"
        android:inputType="textPersonName"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.495"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.099" />

    <Button
        android:id="@+id/button"
        android:layout_width="178dp"
        android:layout_height="52dp"
        android:layout_marginTop="48dp"
        android:text="Text to Speech"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/editTextTextPersonName" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="168dp"
        android:layout_height="39dp"
        android:layout_marginTop="52dp"
        android:text="Click image below"
        android:textStyle="italic|bold"
        android:textSize="20dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button"
        app:layout_constraintVertical_bias="0.011" />

    <ImageButton
        android:id="@+id/imageButton"
        android:layout_width="173dp"
        android:layout_height="172dp"
        android:layout_marginTop="52dp"
        android:background="@null"
        android:scaleType="fitCenter"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.487"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView"
        app:layout_constraintVertical_bias="0.0"
        app:srcCompat="@drawable/ic_mic" />

    <TextView
        android:id="@+id/output1"
        android:layout_width="313dp"
        android:layout_height="119dp"
        android:layout_marginTop="36dp"
        android:text="Output"
        android:textSize="15dp"
        android:textAlignment="center"
        android:textStyle="bold|italic"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.632"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageButton"
        app:layout_constraintVertical_bias="0.0" />


</androidx.constraintlayout.widget.ConstraintLayout>
```

In the code, we have used a **constraint layout** since it allows us to position palettes in different places of the screen provided.
Android studio provides other types of layouts to help position your palettes.

The layouts include:
- [Relative layout](https://developer.android.com/guide/topics/ui/layout/relative)
- [Linear layout](https://developer.android.com/guide/topics/ui/layout/linear)

As you have also noted, you can modify the palettes not only with the design editor but also by editing the code.
Let's learn how to edit the code.
**Note:** It is important to note that every pallet has a different `id` since it will be used in the Main Activity to create different object cases and to program them to carry out tasks differently. An example is shown below.

```xml
android:id="@+id/button"
```

To adjust the `width` and `height` of the pallets, do this on the design editor to get the scale that fits the pallets with the device.

**Important Note** - Remember to attach the palette to the edges of the design editor on all four sides to avoid self-realigning the palettes. You can do it as shown below.

![Aligning Paletts](/engineering-education/text-to-speech/edge.png)

You can make the texts in the Textview more appealing by changing the text style, color, or size. Make the text style both italic and bold and suitable text size depending on your design editor or target device.
```xml
android:textStyle="italic|bold"
```

#### Programming the palettes in Java
Now we will work with the MainActivity.java. This is where we get to program the pallets we developed in the activity_main.xml. The command that will be set will be executed when the palettes are prompted by any means stated. The command can be executed when the palettes are prompted.

First, we will develop objects from the palettes.

Outside the main method instantiate the palettes as shown below.

```java
    private Button button;
    private TextView textView;
    private ImageButton imageButton;
    private EditText editTextTextPersonName;
    private TextView output1;
    TextToSpeech t1;
```
From the above, we have instantiated the palettes and assigned them a name similar to their id name for easier identification and to avoid confusion.
We have also assigned them **private** access specifiers to ensure they can only be accessed by only authorized classes.

Now to create the object, use the instantiated names and the `findViewById(R.id.object)` keyword to refer to the palettes.

```java
        button = findViewById(R.id.button);
        textView = findViewById(R.id.textView);
        imageButton = findViewById(R.id.imageButton);
        editTextTextPersonName = findViewById(R.id.editTextTextPersonName);
        output1 = findViewById(R.id.output1);
```

Next, we will create a method that will be executed when the button is clicked. The method, OnClickListener, awaits for the moment when a button is clicked. Several types of listeners are executed when a certain action is satisfied. There can be:
   * long onclick listener
   * double click listener
   * short click listener

There can also be listeners that not only detect action but also gesture. They can include:
   * on flip listener
   * on swipe listener, etc.

For this tutorial, we will utilize the onClickListener.
   

```java
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                t1 = new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
                    @Override
                    public void onInit(int i) {
                        if(i == TextToSpeech.SUCCESS) {
                            t1.setLanguage(Locale.UK);
                            t1.setSpeechRate(1.0f);
                            t1.speak(editTextTextPersonName.getText().toString(), TextToSpeech.QUEUE_ADD, null);
                        }
                    }
                });

            }
        });
```
First, we have initialized the button with the `OnClickListener`, this will ensure that the `onClick` method is executed when the button is clicked.

You can also note that we have used the `@Override` keyword. This overrides the function inside the onclick method. This means that the library imported has been customized to perform the specified action.

The `onInit` function initializes the `t1` object we created. This allows us to set other functions to the t1 object. 
Let's now understand what we did set in the `onInit` function.
* `t1.setLanguage(Locale.UK);` - Here we are setting the language to be used as English from the UK. This means that the application will only recognize grammatical phases from UK English.
* `t1.setSpeechRate(1.0f);` - This will set the rate at which the words in the text are readout.
* `t1.speak(editTextTextPersonName.getText().toString(), TextToSpeech.QUEUE_ADD, null);` - This will recognize the words typed into the **edit text**. They are then translated to string and then give output as speech of the words entered

![Text to Speech output](/engineering-education/text-to-speech/text.png)

#### Converting Speech to Text
Now we are going to learn how to convert speech to text. To begin with, let's set an `OnClickListener` for the image button.

```java
imageButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        speak();
    }
});
```
The `imageButton.setOnClickListener` sets the image ready to execute a method when it is clicked. This method to be executed will set up a listener to capture phrases and covert the words captured to text.

```java
    //SPEECH TO TEXT
    private void speak() {
        //Intent to show speech to text dialog
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Hi, Say Something");

        //Start Intent
        try {
            // If no error
            //Show dialog
            startActivityForResult(intent, REQUEST_CODE_SPEECH_INPUT);
        }
        catch (Exception e) {
            //If error found
            Toast.makeText(this, ""+e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

```

`Intent` is mostly used to start an activity or perform any activity on the screen. In the first line, 

```
Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
```
Here, we 


```java
    //Receive voice input and initialize it
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode) {
            case REQUEST_CODE_SPEECH_INPUT: {
                if (resultCode == RESULT_OK && null != data) {
                    ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);

                    output1.setText(result.get(0));
                }
                break;
            }
        }
    }

```
In the last step, we are going to develop a code that will be able to receive the voice captured and initialize it. Here we will output the result of the voice captured in a form of a text. 

We will have the code the `onActivityResult` method name and as the name states, this method receives and processes the voice captured.

The complete `.java` file will appear as shown below:
```java
package com.example.texttospeech;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private Button button;
    private TextView textView;
    private ImageButton imageButton;
    private EditText editTextTextPersonName;
    private TextView output1;
    TextToSpeech t1;

    private static final int REQUEST_CODE_SPEECH_INPUT = 1000;
//    private final int REQ_CODE = 100;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        button = findViewById(R.id.button);
        textView = findViewById(R.id.textView);
        imageButton = findViewById(R.id.imageButton);
        editTextTextPersonName = findViewById(R.id.editTextTextPersonName);
        output1 = findViewById(R.id.output1);

        //TEXT TO SPEECH
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                t1 = new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
                    @Override
                    public void onInit(int i) {
                        if(i == TextToSpeech.SUCCESS) {
                            t1.setLanguage(Locale.UK);
                            t1.setSpeechRate(1.0f);
                            t1.speak(editTextTextPersonName.getText().toString(), TextToSpeech.QUEUE_ADD, null);
                        }
                    }
                });

            }
        });

        imageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                speak();
            }
        });
    }
    
    //SPEECH TO TEXT
    private void speak() {
        //Intent to show speech to text dialog
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Hi, Say Something");

        //Start Intent
        try {
            // If no error
            //Show dialog
            startActivityForResult(intent, REQUEST_CODE_SPEECH_INPUT);
        }
        catch (Exception e) {
            //If error found
            Toast.makeText(this, ""+e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    //Receive voice input and initialize it
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode) {
            case REQUEST_CODE_SPEECH_INPUT: {
                if (resultCode == RESULT_OK && null != data) {
                    ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);

                    output1.setText(result.get(0));
                }
                break;
            }
        }
    }
}
```
![Speech to text output](/engineering-education/text-to-speech/speech.png)

### Conclusion
From this article, we have learned that:
* Developing an application with android studio becomes easier when we work on projects since most applications use the same syntax.
* How to develop a good-looking application with the pallets available and even edit the pallets.
* Developing an application to convert text to speech and vice versa.
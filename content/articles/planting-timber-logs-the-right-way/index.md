Logging is one of the important things we do while developing android apps. Yet, as developers, we sometimes use the traditional log classes. These have a tendency to be cumbersome. Timber, which is a library developed by `Jake Wharton` has made logging effortless. In this article, we will discuss the best practices in using `Timber` and planting the `Timber trees`.

<!--more-->

### Prerequisites

To follow along with this tutorial, you should:

- Have a working android studio IDE.
- Be able to create a project in `Android Studio`.
- Have an understanding of `Kotlin` or `Java`.
- Have some basic knowledge of the basic `Logging class`.

### Goal

At the end of this tutorial, you should be able to:

- Understand what `Timber` is (an overview).
- log with `Timber`.

### Introduction

Logging is one of the most important things we use while developing android apps. We use logs for almost everything. For instance, when debugging if-else conditions and when handling exceptions. Yet, as developers, we sometimes use the traditional log classes. These have a tendency to be cumbersome and time-consuming. Timber, which is a library developed by `Jake Wharton` has made logging easily attainable and with less code.

### What is a Logcat?

From the official documentation, the logcat window in Android Studio displays system messages. For instance, when a garbage collection occurs, it displays messages in real-time. It also keeps a history so you can view older messages.
When your code throws an exception, the logcat displays a message. This is then followed by the associated stack trace containing links to the line of code.

### What are some of the traditional log class messages?

According to the official documentation, this class allows you to create log messages. These messages appear in the logcat. From the highest priority to the lowest (or, least verbose to the most), we should use the following:
- `Log.e(String, String)` - display errors
- `Log.w(String, String)` - display warnings
- `Log.i(String, String)` -display information
- `Log.d(String, String)` -displays debug information
- `Log.v(String, String)` - for verbose

### What is Timber?

Logging with the traditional class is cumbersome; that's where `Timber` comes in.
In the official documentation, `Timber` is a logger with a small, extensible API. It provides utility on top of Android's normal Log class.
It's a library by `Jake Wharton` that enhances logging in android.
`Timber` also has several log messages. For instance:
- `Timber.i` - for information
- `Timber.d` - for debug information
- `Timber.v` - for verbose
- `Timber.w` and `Timber.wtf` - for warning

### How it works.

- You plant a tree by calling `Timber.plant` in your `onCreate` in your Application Class
- Call the `Timber` from any class. We can use the class-name as the tag.

### Now, how about we do some coding stuff...

In this example, we'll create an app that adds two numbers. Then we'll log the answer.

#### Step 1: Creating the project

In this step, we will create a new project; you can refer to the image below for guidance.

![create_project](/planting-timber-logs-the-right-way/creating_project2)

#### Step 2: Adding dependencies

After creating the project, we will add a dependency to our app-level build Gradle.

```gradle
//Timber dependency
implementation 'com.jakewharton.timber:timber:4.7.1'
```
![adding dependency](/planting-timber-logs-the-right-way/add_dependency.png)

#### Step 3: XML layouts

In this step, we will create the layout.

##### Main Activity layout

```Xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <EditText
        android:id="@+id/first_number"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:ems="10"
        android:hint="Enter Number..."
        android:inputType="number"
        android:textColor="#000000"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.19999999" />

    <EditText
        android:id="@+id/second_number"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:ems="10"
        android:hint="Enter Number..."
        android:inputType="number"
        android:textColor="#000000"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/first_number"
        app:layout_constraintVertical_bias="0.120000005" />

    <TextView
        android:id="@+id/answer"
        android:layout_width="0dp"
        android:layout_height="40dp"
        android:gravity="center"
        android:textColor="#000000"
        android:textSize="24sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/second_number" />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:backgroundTint="#F4511E"
        android:text="Add"
        android:textSize="20sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toTopOf="@+id/answer"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/second_number" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

  

### Step 4: The Timber App Class

In this step, we will write the code for the `Application class of Timber`
![creating a class in java](/planting-timber-logs-the-right-way/creating_a_class_java.png)

```Java
import android.app.Application;

import timber.log.Timber;

public class TimberDemoApp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        Timber.plant(new Timber.DebugTree());
    }
}
```

![creating a class in kotlin](/planting-timber-logs-the-right-way/creating_a_class_kotlin.png)

  

```Kotlin
import android.app.Application
import timber.log.Timber
import timber.log.Timber.DebugTree

class TimberDemoApp : Application() {

    override fun onCreate() {
        super.onCreate()

        Timber.plant(DebugTree())
    }
}

```

###After creating the class, update your `Manifest file` with the name tag. Use your application class as the value as shown below:
![updating the manifest](/planting-timber-logs-the-right-way/manifest.png)

#### Step 5: The code. (Main Activity)

In this step, we will write the code for the two-number-adder that we have designed above.

```Java
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import timber.log.Timber;


public class MainActivity extends AppCompatActivity {
    private Button button;
    private EditText num1, num2;
    private TextView answer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        button = findViewById(R.id.button);
        num1 = findViewById(R.id.first_number);
        num2 = findViewById(R.id.second_number);
        answer = findViewById(R.id.answer);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int first_number = Integer.parseInt(num1.getText().toString().trim());
                int second_number = Integer.parseInt(num2.getText().toString().trim());

                if (num1.getText().toString().isEmpty() || num2.getText().toString().isEmpty()){
                    num1.setError("Cannot be empty!!");

                }
                else{
                    int sum = first_number+second_number;
                    answer.setText(String.valueOf(sum));
                    Timber.v(answer.getText().toString());
                }
            }
        });


    }
}
```
### Kotlin
``` Kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import timber.log.Timber

class MainActivity : AppCompatActivity() {

    private lateinit var button:Button
    private lateinit var num1:EditText
    private lateinit var num2:EditText
    private lateinit var answer:TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        button = findViewById(R.id.button)
        num1 = findViewById(R.id.first_number)
        num2 = findViewById(R.id.second_number)
        answer = findViewById(R.id.answer)

        button.setOnClickListener {
            val first_number = num1.text.toString().trim { it <= ' ' }.toInt()
            val second_number = num2.text.toString().trim { it <= ' ' }.toInt()
            if (num1.text.toString().isEmpty() || num2.text.toString().isEmpty()) {
                num1.error = "Cannot be empty!!"
            } else {
                val sum = first_number + second_number
                answer.text = sum.toString()
                Timber.d(answer.text.toString())
            }
        }

    }
}
```

  

### Timber Logcat

In the logcat you will see such a line like this `D/MainActivity: 7`.
We did not specify the class name but timber placed one for us; `D/MainActivity`.
That is the beauty of `Timber`.

#### Demo screens
Once done, run the app. Here is what you should expect:

![log output in java](/planting-timber-logs-the-right-way/timber_log_java.png)

![log output kotlin](/planting-timber-logs-the-right-way/timber_log_kotlin.png)


Check out the entire project for `Java` on [GitHub](https://github.com/Owallah/timber-demo). For Kotlin [Github](https://github.com/Owallah/timber-demo-with-kotlin)

### Conclusion
That's not all about `Logging with Timber`; keep exploring. I hope you now have an idea on how to "plant your `Timber` logs".

### Resources

-  [Timber Official Documentation](https://github.com/JakeWharton/timber)

-  [Android official documentation](https://developer.android.com/studio/debug/am-logcat)

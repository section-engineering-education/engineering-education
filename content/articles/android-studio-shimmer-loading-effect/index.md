---
layout: engineering-education
status: publish
published: true
url: /android-studio-shimmer-loading-effect/
title: Implementing Shimmer Loading Effect in Android Studio
description: This article will help developers animate the data loading process using Shimmer. The tutorial has provided an overview of how to implement the shimmer loading animation using RecyclerView.
author: joseph-chege
date: 2021-01-24T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-studio-shimmer-loading-effect/hero.jpg
    alt: Shimmer loading Android Studio example image
---
When displaying data, especially from a remote server, chances are the information will not load instantly on your application screen. As a developer, you do not want to show a blank screen to the user while your app requests data from the Internet. The user should know that your application is communicating with the necessary data servers. 
<!--more-->
For that reason, you need to find ways to inform a user that data is being retrieved and will be displayed shortly.
### Introduction
There are many methods of implementing the loading progress of your remote data. 

Some of the common methods include: 
-  [ProgressBar](https://developer.android.com/reference/android/widget/ProgressBar).
-  [Shimmer](https://github.com/facebook/shimmer-android).
-  [Spinner loader](https://developer.android.com/reference/android/widget/Spinner).

This guide focuses on the concept of the shimmer loading effect. A Shimmer Loading widget acts as a skeleton layout. Typically a content placeholder with a shimmering animation. It overrides the application's main screen as it requests data from the server. Once the data is loaded, the dummy skeleton screen is replaced by the main screen views.

To implement a shimmering effect in Android Studio, you need a library called [Shimmer](http://facebook.github.io/shimmer-android/). This dependency helps implement a shimmer layout when fetching data from a server. It implements the same concept as a Spinner or ProgressBar. Major corporations have implemented the shimmer loading effect in their applications. 

They include such companies as:
- YouTube
- LinkedIn
- Google Drive
- Facebook

[Facebook](http://facebook.github.io/shimmer-android/) developed it to show loading animation while requesting data from APIs or servers.

![Facebook Shimmering Example](/engineering-education/android-studio-shimmer-loading-effect/shimmer-small.gif)

***[Image source](http://facebook.github.io/shimmer-android/)***

### Goal
This guide shows you how to implement the Shimmer library in your Android application. We will load data from the Internet and display it in the app while implementing the shimmer layouts.

>Though the shimmer loading effect can be used in any view, we will focus on the RecyclerView layout.

### Prerequisites
The tutorial assumes you have substantial knowledge of the following areas in Android Studio.

- Understand how to [create an android application](https://www.youtube.com/watch?v=4NDwINudmDk&list=PLgCYzUzKIBE8TUoCyjomGFqzTFcJ05OaC) using Android Studio.
- Be fluent with Android HTTP parsing libraries such as [Retrofit](https://square.github.io/retrofit/) and [Volley](https://developer.android.com/training/volley/index.html). We will use the Volley dependency to make Internet calls from remote data. 
- Here is a [guide](/making-API-requests-using-volley-android/) that will help you understand Volley in detail.
- Understand how to implement and use Android [RecyclerView](https://developer.android.com/guide/topics/ui/layout/recyclerview) layout.

If you are not familiar, you can follow the links provided to learn more.

### Overview

#### The application libraries
Once you have created a new Android Studio project, include the following library in your app-level `build.gradle` file.

- The Facebook shimmering library.

```java
implementation 'com.facebook.shimmer:shimmer:0.5.0'
```

- An HTTP call library. We will use the Volley library to handle HTTP requests.

```java
implementation 'com.android.volley:volley:1.1.0'
```

- Note that the data will contain image URLs. To load them into the RecyclerView, you need a library to parse the images' remote URL paths. In this case, I chose to use the [Picasso image-loading library](/using-Picasso-in-android/). It is a powerful library for loading and caching remote images.

```java
implementation 'com.squareup.picasso:picasso:2.71828'
```

Once you’ve added the libraries, sync the Gradle file. This will download the libraries and make them available for your Android project.

- The application permissions

Since the application is making remote calls, add internet permissions into your `manifest.xml` file. Go ahead and declare the following permissions.

```xml
<manifest>
   <uses-permission android:name="android.permission.INTERNET"/>
</manifest>
```

- To demonstrate this application, I've created a sample [JSON](https://jsonkeeper.com/b/3JMS) data containing a student list and hosted it online.

```JSON
[
   {"name":"Sophia Raji","college":"Columbia University","specialization":"full-stack web developer","description":"Sophia is a junior in computer science at Columbia University. She takes particular interest in full-stack web development and Bitcoin programming.","profile_img":"https://www.section.io/engineering-education/authors/sophia-raji/avatar_hu2f5745df4f9830549e411f1abb07ed5b_1234702_400x0_resize_q75_box.jpg"},
   {"name":"Tenson Cai","college":"Iowa State University","specialization":"Software engineer","description":"Tenson Cai is pursuing his Master’s in Computer Science. He is passionate about teaching and becoming a skilled software engineer","profile_img":"https://www.section.io/engineering-education/authors/tenson-cai/tenson_hu9b40374b60f4c6e8a2de40c5f98ac7b0_33873_400x0_resize_q75_box.jpg"},
   {"name":"Mauline Mwaniki","college":"Dedan Kimathi University of Technology","specialization":"Designer","description":"She is passionate about design, currently learning 3DS Max with V-Ray.","profile_img":"https://www.section.io/engineering-education/authors/mauline-mwaniki/avatar_hu3ae6c43603b83e46387a2681ac852067_113022_400x0_resize_q75_box.jpg"},
   {"name":"Mike White","college":"Rochester Institute of Technology","specialization":"Effective altruism","description":"His interests are technology, philosophy, culture, music, and effective altruism. Mike has a blog about technology and philosophy.","profile_img":"https://www.section.io/engineering-education/authors/mike-white/avatar_hufe190f6defa7dc5faf99f2f56c4672ca_843076_400x0_resize_q75_box.jpg"},
   {"name":"James Kahwai","college":"kenyatta university","specialization":"Full Stack Web Developer","description":"His interests are UX, web design, SEO, cryptocurrency & Infosec.","profile_img":"https://www.section.io/engineering-education/authors/james-kahwai/avatar_hudba811aa11fddaa3a68110fe821ec1ee_109237_400x0_resize_q75_box.jpg"},
   {"name":"Maitreyi Karanjkar","college":"University of Colorado","specialization":"Aerospace Engineer","description":"She likes to spend her time reading, cooking, listening to music, and working on small self-started coding projects.","profile_img":"https://www.section.io/engineering-education/authors/maitreyi-karanjkar/avatar_hu3f384736375bd183e099b5cdb800a5e9_1803802_400x0_resize_q75_box.jpg"},
   {"name":"Michael Zanoff","college":"Colorado School of Mines","specialization":"Robotics","description":"His passion for the design process and robotics has led him to pursue a degree in Mechanical Engineering.","profile_img":"https://www.section.io/engineering-education/authors/michael-zanoff/avatar_hudd0677be175c2d95347bb4c3cad9cefb_18687_400x0_resize_q75_box.jpeg"}
]
```

#### The application structure
We are ready to set the Shimmering effect in the RecyclerView layout. This application involves two phases.

1. Show a shimmering animation when fetching data.
2. Loading data into the view.

The project will involve six main files.

![Project Java Structure](/engineering-education/android-studio-shimmer-loading-effect/project-java-structure.jpg)

![Project Layout Structure](/engineering-education/android-studio-shimmer-loading-effect/project-layout-structure.jpg)

1. Main activity (`MainActivity.java`) - The main application screen to host the RecyclerView and its content.

2. An Adapter (`RecyclerViewAdapter.java`) - It contains a `Viewholder` and `Adapter`. Viewholder defines the students' individual elements such as `TextView` and `ImageView` widgets and wrap them into the RecyclerView widget. The Adapter sets the data into the defined students' list layout as defined in the Viewholder and binds the data into the RecyclerView.

3. A model class (`Students.java`) - It contains objects to hold the application's datasets using the preferred getters and setters.

4. The main application layout (`activity_main.xml`) - It will host the RecyclerView widget. The view will bind the list elements specified in the students' list layout design (`item_student_list.xml`). The layout will also bind the shimmer layout as defined in the `shimmer_placeholder_layout.xml`.

5. Students' list layout (`item_student_list.xml`) - It will arrange the students' elements into the desirable screen design.

6. Shimmer placeholder layout (`shimmer_placeholder_layout.xml`) - It will define the shimmering effect of individual students' elements with the desirable shimmering screen design.

### Putting the application layout in place
Let puts the application code in place. We’ll start by designing the application's layouts into the necessary XML files.

#### The student’s list layout
Create an XML file. Let’s name it `item_student_list.xml.`

Here is the code to implement that.

```XML
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:ignore="HardcodedText,MissingConstraints"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:padding="20dp">

        <ImageView
            android:id="@+id/item_profile_img"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:src="@drawable/ic_launcher_background"
            app:layout_constraintTop_toTopOf="parent"
            tools:ignore="ContentDescription,MissingConstraints" />

        <TextView
            android:id="@+id/item_student_name_title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="15dp"
            android:text="Student name"
            android:textStyle="bold"
            app:layout_constraintStart_toEndOf="@+id/item_profile_img" />

        <TextView
            android:id="@+id/item_student_college"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="15dp"
            android:layout_marginTop="8dp"
            android:text="Student college"
            app:layout_constraintStart_toEndOf="@+id/item_profile_img"
            app:layout_constraintTop_toBottomOf="@+id/item_student_name_title" />

        <TextView
            android:id="@+id/item_student_specialization"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="15dp"
            android:layout_marginTop="8dp"
            android:text="Student specialization"
            app:layout_constraintStart_toEndOf="@+id/item_profile_img"
            app:layout_constraintTop_toBottomOf="@+id/item_student_college" />

        <TextView
            android:id="@+id/item_student_description"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="15dp"
            android:layout_marginTop="8dp"
            android:text="Student description"
            app:layout_constraintTop_toBottomOf="@+id/item_profile_img"
            tools:ignore="MissingConstraints" />

        <View
            android:id="@+id/name"
            android:layout_width="match_parent"
            android:layout_height="3dp"
            android:background="@color/shimmer_placeholder"
            android:layout_marginTop="3dp"
            app:layout_constraintTop_toBottomOf="@+id/item_student_description"/>
</androidx.constraintlayout.widget.ConstraintLayout>
```

![Student List Layout](/engineering-education/android-studio-shimmer-loading-effect/item-student-list.jpg)

#### Shimmer placeholder layout
Create a design placeholder that will be shown on the screen while the application requests the data to be displayed into the RecyclerView. Create an XML file and name it as `shimmer_placeholder_layout.xml`.

The layout defines the shimmering height and width of each element in the students’ list. The layout will be loaded as the RecyclerView's placeholder before the application downloads the remote JSON data specified in this URL `https://jsonkeeper.com/b/3JMS`.

In terms of design, the layout is almost similar to the `item_student_list.xml` layout. However, no text or image sources will be included in the `TextView` and `ImageView` widgets. 

The shimmer layout of the individual elements will be defined by;
- Setting the widgets layout_width.
- Setting the widgets layout_height.
- Setting the background color widgets.

Go ahead and set the background color in your `color.xml` file.

```xml
<resources>
   <color name="shimmer_placeholder">#dddddd</color>
</resources>
```

Here is the shimmer layout design.

```XML
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:ignore="HardcodedText,MissingConstraints"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="20dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/layout"
        android:padding="3dp"
        android:orientation="horizontal">

        <ImageView
            android:id="@+id/item_profile_img"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_marginBottom="25dp"
           android:background="@color/shimmer_placeholder"
            app:layout_constraintTop_toTopOf="parent"
            tools:ignore="ContentDescription,MissingConstraints" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="40dp"
        android:layout_marginTop="20dp"
        android:orientation="vertical">
        <TextView
            android:id="@+id/item_student_name_title"
            android:layout_width="150dp"
            android:layout_height="15dp"
            android:layout_marginStart="15dp"
            android:background="@color/shimmer_placeholder"
            app:layout_constraintStart_toEndOf="@+id/item_profile_img" />

        <TextView
            android:id="@+id/item_student_college"
            android:layout_width="200dp"
            android:layout_height="15dp"
            android:layout_marginStart="15dp"
            android:layout_marginTop="8dp"
            android:background="@color/shimmer_placeholder"
            app:layout_constraintStart_toEndOf="@+id/item_profile_img"
            app:layout_constraintTop_toBottomOf="@+id/item_student_name_title" />

        <TextView
            android:id="@+id/item_student_specialization"
            android:layout_width="250dp"
            android:layout_height="15dp"
            android:layout_marginStart="15dp"
            android:layout_marginTop="8dp"
            android:background="@color/shimmer_placeholder"
            app:layout_constraintStart_toEndOf="@+id/item_profile_img"
            app:layout_constraintTop_toBottomOf="@+id/item_student_college" />
        </LinearLayout>
    </LinearLayout>

    <TextView
        android:id="@+id/item_student_description"
        android:layout_width="385dp"
        android:layout_height="20dp"
        android:layout_marginStart="3dp"
        android:layout_alignBottom="@id/layout"
        android:background="@color/shimmer_placeholder"
        tools:ignore="MissingConstraints" />
</RelativeLayout>
```

![Shimmer Layout](/engineering-education/android-studio-shimmer-loading-effect/shimmer-layout.jpg)

#### The main application layout
The `activity_main.xml` will host the RecyclerView widget. In this case, set the RecyclerView visibility as `gone`. This will display the shimmer layout first. It will then show the RecyclerView once the content is readily available.

When the data is ready to be displayed, we will set the shimmer layout as `gone` and the RecyclerView as `visible`. I will demonstrate how to implement that later in this guide.

```XML
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">

    <com.facebook.shimmer.ShimmerFrameLayout
        android:id="@+id/shimmerLayout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:ignore="MissingConstraints">
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <!--add  several shimmer placeholder layout -->

            <include layout="@layout/shimmer_placeholder_layout"></include>
            <include layout="@layout/shimmer_placeholder_layout"></include>
            <include layout="@layout/shimmer_placeholder_layout"></include>
            <include layout="@layout/shimmer_placeholder_layout"></include>
            <include layout="@layout/shimmer_placeholder_layout"></include>
            <include layout="@layout/shimmer_placeholder_layout"></include>
            <include layout="@layout/shimmer_placeholder_layout"></include>

        </LinearLayout>
    </com.facebook.shimmer.ShimmerFrameLayout>

<androidx.recyclerview.widget.RecyclerView
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_marginStart="3dp"
        android:layout_marginEnd="3dp"
        android:layout_marginTop="3dp"
        android:id="@+id/RV_student_list"
        android:visibility="gone"
        tools:listitem="@layout/item_student_list"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

![Main Activity Layout](/engineering-education/android-studio-shimmer-loading-effect/activity-main-layout.jpg)

### Putting in place the right classes and functions

#### The model class
A model class contains a collection of data objects that we want to show in the students' list. This java class defines the necessary parameters for each item in the RecyclerView. It consists of getters and setters methods. Go ahead and create a `Students.java` class and include the following code block in it.

```java
public class Students {
    private String name;
    private String college;
    private String specialization ;
    private String description ;
    private String profile_img ;

    public Students() {
    }

    public Students(String name, String college, String specialization, String description, String profile_img) {
        this.name = name;
        this.college = college;
        this.specialization = specialization;
        this.description = description;
        this.profile_img = profile_img;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCollege(String college) {
        this.college = college;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setProfile_img(String profile_img) {
        this.profile_img = profile_img;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getCollege() {
        return college;
    }

    public String getSpecialization() {
        return specialization;
    }

    public String getProfile_img() {
        return profile_img;
    }

    public String getDescription() {
        return description;
    }
}
```

#### The RecyclerView Adapter and Viewholder
```java
public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.MyViewHolder> {

    private Context mContext ;
    private List<Students> mData ;

    public RecyclerViewAdapter(Context mContext, List<Students> mData) {
        this.mContext = mContext;
        this.mData = mData;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view ;
        LayoutInflater inflater = LayoutInflater.from(mContext);
        view = inflater.inflate(R.layout.item_student_list,parent,false) ;
        return new MyViewHolder(view) ;
    }


    static class MyViewHolder extends RecyclerView.ViewHolder {
        TextView tv_student_name;
        TextView tv_student_collage;
        TextView tv_student_specialization;
        TextView tv_student_description;
        ImageView img_student_profile;

        MyViewHolder(View itemView) {
            super(itemView);
            tv_student_name = itemView.findViewById(R.id.item_student_name_title);
            tv_student_collage = itemView.findViewById(R.id.item_student_college);
            tv_student_specialization = itemView.findViewById(R.id.item_student_specialization);
            tv_student_description = itemView.findViewById(R.id.item_student_description);
            img_student_profile = itemView.findViewById(R.id.item_profile_img);
        }
    }

    @Override
    public int getItemCount() {
        return mData.size();
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.tv_student_name.setText(mData.get(position).getName());
        holder.tv_student_collage.setText(mData.get(position).getCollege());
        holder.tv_student_specialization.setText(mData.get(position).getSpecialization());
        holder.tv_student_description.setText(mData.get(position).getDescription());
        Picasso.get()
                .load(mData.get(position).getProfile_img())
                .into(holder.img_student_profile);
    }
}
```

#### The main activity
Paste the following code into your `MainActivity.java` file.

```java
public class MainActivity extends AppCompatActivity {
    private JsonArrayRequest mJsonArrayRequest;
    private RequestQueue mRequestQueue;
    private List<Students> studentsList = new ArrayList<>();
    private RecyclerView mRecyclerView;
    private ShimmerFrameLayout mFrameLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mRecyclerView = findViewById(R.id.RV_student_list);
        mFrameLayout = findViewById(R.id.shimmerLayout);
        RequestJsonData();
    }

    public void RequestJsonData() {
        mJsonArrayRequest = new JsonArrayRequest(
                "https://jsonkeeper.com/b/3JMS", new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                JSONObject jsonObject = null;
                for (int i = 0; i < response.length(); i++) {
                    try {
                        jsonObject = response.getJSONObject(i);
                        Students students = new Students();
                        students.setName(jsonObject.getString("name"));
                        students.setDescription(jsonObject.getString("description"));
                        students.setCollege(jsonObject.getString("college"));
                        students.setSpecialization(jsonObject.getString("specialization"));
                        students.setProfile_img(jsonObject.getString("profile_img"));
                        studentsList.add(students);

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }

                SetRecyclerViewAdapter(studentsList);
                mFrameLayout.startShimmer();
                mFrameLayout.setVisibility(View.GONE);
                mRecyclerView.setVisibility(View.VISIBLE);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });

        mRequestQueue = Volley.newRequestQueue(MainActivity.this);
        mRequestQueue.add(mJsonArrayRequest);
    }

    public void SetRecyclerViewAdapter(List<Students> list) {
        RecyclerViewAdapter myAdapter = new RecyclerViewAdapter(this, list);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        mRecyclerView.setAdapter(myAdapter);
    }

    @Override
    protected void onResume() {
        mFrameLayout.startShimmer();
        super.onResume();
    }

    @Override
    protected void onPause() {
        mFrameLayout.stopShimmer();
        super.onPause();
    }
}
```

As you can see above, the code implements loading data from the Internet into a RecyclerView using the Volley library. We fetch the data from [here](https://jsonkeeper.com/b/3JMS) data and display it into the main activity of our application.

We can now focus on explaining the shimmer loading effect. The Shimmer widget is implemented, just like regular views.

First declare the `ShimmerFrameLayout` and initialize it as `shimmerFrameLayout = findViewById(R.id.shimmerLayout)` in the `onCreate` method. With that, we are ready to utilize the different functionalities of the Shimmer library.

We should implement a shimmer layout before the app has loaded the students' data into the view, which in this case, is in the RecyclerView. 

The `SetRecyclerViewAdapter(studentsList)` method binds the JSON data into the RecyclerView adapter. `SetRecyclerViewAdapter()` function takes one mandatory argument `studentsList`. When invoked, the method initiates the data loading process from the `studentsList`.

While waiting for the server response, we should start the shimmer loading animation. Use the function `startShimmer()`, i.e., `shimmerFrameLayout.startShimmer()`. This will start the shimmer layout as specified in `shimmer_placeholder_layout.xml` into the main screen as we await the server response.

Once the data is ready and loaded into the RecyclerView, specify the following two functions.

- `shimmerFrameLayout.setVisibility(View.GONE)` notifies the application that the Volley has returned the response. For that reason, the data is ready to be displayed in the RecyclerView. Set the `shimmerFrameLayout` visibility as `GONE` to pave the way for the main screen data layout.

- `recyclerView.setVisibility(View.VISIBLE)`. At the beginning of this guide, we had set the RecyclerView visibility as `GONE`. Now that the data has been loaded in, set it as `VISIBLE`.

With that, you are ready to animate your data loading with a shimmering effect.

![Shimmer Loading Effect Output](/engineering-education/android-studio-shimmer-loading-effect/shimmer-loading-effect.gif)

### Conclusion
I hope this guide helps you to animate the data loading process using Shimmer. The tutorial has provided an overview of how to implement the shimmer loading animation using RecyclerView. Try to implement the same using different Android views.

For more reference, check the code on [GitHub](https://github.com/kimkimani/ShimmerLoadingEffect).

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)
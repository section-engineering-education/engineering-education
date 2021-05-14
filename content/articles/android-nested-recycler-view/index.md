---
layout: engineering-education
status: publish
published: true
url: /android-nested-recycler-view/
title: Introduction to Android Nested RecyclerView
description: This article will explain how to implement a Nested RecyclerView. A RecyclerView widget recycles UI components. It creates components that allow users to scroll through the list. RecyclerView changes the UI components to the data they represent.
author: joseph-chege
date: 2021-02-09T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-nested-recycler-view/hero.jpg
    alt: Introduction to Memorization in JavaScript Hero Image
---
RecyclerView is a container widget used to display large data sets that change dynamically. The RecyclerView widget manages the display and handling of items in a list. It provides [Layout Managers](https://stackoverflow.com/questions/46423155/im-getting-nothing-here-in-main-activity) to position these items. This way, you can create customized layout managers for RecyclerView containers.
<!--more-->
We can use a RecyclerView inside another RecyclerView. We refer to this as nested RecyclerView. It is an instance where one RecyclerView widget is the parent to another RecyclerView widget. A good example where a nested RecyclerView widget is implemented includes the Google Play Store.

![Google play store nested RecyclerView](/engineering-education/android-nested-recycler-view/google-play-store-nested-recyclerview.jpg)

[***Image Source***](https://play.google.com/store/apps?hl=en)

Applications such as eCommerce, music apps, and movie apps such as Netflix uses this concept.

![Netflix nested Recyclerview](/engineering-education/android-nested-recycler-view/netflix-nested-recycler-view.png)

[***Image Source***](https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en&gl=US)

![Music app nested Recyclerview](/engineering-education/android-nested-recycler-view/music-app-nested-recycler-view.png)

[***Image Source***](https://play.google.com/store/apps/details?id=com.piyush.music)

In this case, the application would have one parent or the outer RecyclerView widget, which is scrollable vertically. The parent RecyclerView host a child or inner RecyclerView, that is scrollable horizontally.

A RecyclerView widget recycles UI components. It creates components that allow users to scroll through the list. As the user scrolls down the screen, RecyclerView changes the UI components to the data they represent.

With such increased UI complexity, you might need to use a nested RecyclerView. This guide will discuss and implement a nested RecyclerView using Android studio.

### Prerequisites
To follow along with this guide, prior knowledge of [Android RecyclerView](https://guides.codepath.com/android/using-the-recyclerview) would be helpful.

### Setting Up
This guide will use Java in Android studio to create a nested RecyclerView application. Go ahead and start a new Android studio project. RecyclerView uses a [library](https://developer.android.com/jetpack/androidx/releases/recyclerview#declaring_dependencies) `implementation "androidx.recyclerview:recyclerview:1.1.0"`. 

The library is pre-added on project creation, so there is no need to include the library in your gradle files.

### What we will look at
We will be using a movie app scenario to implement a nested RecyclerView concept. We will use a movie template UI on the home screen. We’ll have a vertically scrolling list (parent RecyclerView) and a horizontal carousel as the child RecyclerView.

### Laying out UI components
This application will have three XML files. We’ll implement them from the top-down, starting with the parent to the child UI components.

#### The parent RecyclerView
As we said, we have an outer and inner RecyclerView. To start with, we will create a parent RecyclerView inside the main activity XML file. In this case, `activity_main.xml`. This will be the containing layout of the application. Go ahead and add the following Recycler View widget code into it.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/relativeLayout"
    android:layout_width="match_parent"
    android:background="#0F171E"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/Parent_recyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="4dp"
        android:scrollbars="vertical"
        app:layout_behavior="@string/appbar_scrolling_view_behavior"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

#### The parent RecyclerView items
An item layout defines the layout of the individual row that we will show in the RecyclerView list. This layout will hold any item that is a child of the primary (parent) RecyclerView. This includes the child RecyclerView. Create an XML file, name it `parent_recyclerview_items.xml`. 

Below is the XML code to be implemented.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:app="http://schemas.android.com/apk/res-auto"
xmlns:tools="http://schemas.android.com/tools"
android:layout_width="match_parent"
android:layout_height="wrap_content"
android:background="#0F171E">

<TextView
    android:id="@+id/Movie_category"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="16dp"
    android:layout_marginTop="24dp"
    android:text="Category"
    android:textColor="#C4DFEF"
    android:textSize="16sp"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

<androidx.recyclerview.widget.RecyclerView
    android:id="@+id/Child_RV"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.01"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/Movie_category" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

#### Child RecyclerView layout items
We have designed the parent View and the items that belong to it, including the child RecyclerView. We need to add the items to the child RecyclerView. These are the items that will be scrollable horizontally in each child RecyclerView widget that we add. Create an XML file, name it `child_recyclerview_items.xml`, and include the layout below.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:aap="http://schemas.android.com/apk/res-auto"
    xmlns:app="http://schemas.android.com/tools"
    android:orientation="vertical"
    android:layout_width="wrap_content"
    android:layout_marginStart="16dp"
    android:layout_height="wrap_content"
    app:ignore="NamespaceTypo">
    <androidx.cardview.widget.CardView
        android:layout_width="180dp"
        android:layout_height="100dp"
        app:cardCornerRadius="7dp"
        app:cardElevation="5dp">
        <ImageView
            android:id="@+id/hero_image"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:src="@drawable/ic_launcher_background"
            app:layout_constraintTop_toTopOf="parent" />
    </androidx.cardview.widget.CardView>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="MovieTitle"
        android:textColor="#C4DFEF"
        android:textSize="12sp"
        android:id="@+id/movie_name"
        android:layout_marginTop="5dp"
        android:layout_gravity="center" />
</LinearLayout>
```

### Setting up Model classes
These are Java classes that utilize the necessary parameters for each item in the RecyclerView. This consists of getters and setters method declaration. A model class contains a collection of data/objects that we want to show in the RecyclerView.

The application will have two model classes.

- Model one: contains information about the child items.

This data class stores the Movie image and its name. The model contains one text view for the title and one image as the movie hero image.

```java

public class ChildModel {
    private  int hero_image;
    private String movieName;

    public ChildModel(int hero_image, String movieName){
        this.hero_image = hero_image;
        this.movieName = movieName;
    }
    public int getHeroImage() {
        return hero_image;
    }
    public String getMovieName() {
        return movieName;
    }
}
```

- Model two: contains information about the parent items.

This is a text view for the movie category. The parent item also consists of an array list of the child items. We will go over how to bind them using a RecyclerView adapter holder.

```java
public class ParentModel {
    private String movieCategory;

    public ParentModel(String movieCategory) {
        this.movieCategory = movieCategory;
    }
    public String movieCategory() {
        return movieCategory;
}
```

### Setting up Adapter classes
Adapters are used to set and pass data that will be displayed in the respective RecyclerView items. The adapter manages the collection of items (defined in an individual layout) and `ViewHolder` objects. `ViewHolder` defines the individual views (widgets) in the layout and populate the components into an individual row layout. An `onBindViewHolder` class will bind the views with their respective data objects.

Technically, the data could come from a database or a remote server if the information to be passed to the recycling view is hosted remotely. To keep this app straight to the point, we will use dummy/locally available information and then pass them to the respective RecyclerView Adapters.

Let's populate this data into the respective views. We will have two view adapters for each of the RecyclerView widgets. Create the two adapters.

- Adapter one:  `ChildRecyclerViewAdapter.java`. This adapter will hold the information that belongs to the child widget.

```java
public class ChildRecyclerViewAdapter extends RecyclerView.Adapter<ChildRecyclerViewAdapter.MyViewHolder> {
    public ArrayList<ChildModel> childModelArrayList;
    Context cxt;

    public static class MyViewHolder extends RecyclerView.ViewHolder{
        public ImageView heroImage;
        public TextView movieName;

        public MyViewHolder(View itemView) {
            super(itemView);
            heroImage = itemView.findViewById(R.id.hero_image);
            movieName = itemView.findViewById(R.id.movie_name);
        }
    }

    public ChildRecyclerViewAdapter(ArrayList<ChildModel> arrayList, Context mContext) {
        this.cxt = mContext;
        this.childModelArrayList = arrayList;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.child_recyclerview_items, parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        ChildModel currentItem = childModelArrayList.get(position);
        holder.heroImage.setImageResource(currentItem.getHeroImage());
        holder.movieName.setText(currentItem.getMovieName());

    }

    @Override
    public int getItemCount() {
        return childModelArrayList.size();
    }
}
```

We have passed the movie name and hero image to the respective item views as delegated in the `ViewModel` class. Our main focus is a nested RecyclerView. The data passed to `ChildRecyclerViewAdapter` will be an item of `ParentRecyclerViewAdapter`. The `ViewHolder` of the child adapter will be explicitly accessible without a binding view. Go ahead and create a parent adapter. Call it `ParentRecyclerViewAdapter`

- Adapter two: `ParentRecyclerViewAdapter`. The adapter will hold the information to be displayed in the parent layout, including the child RecyclerView.

```java
public class ParentRecyclerViewAdapter extends RecyclerView.Adapter<ParentRecyclerViewAdapter.MyViewHolder> {
    private ArrayList<ParentModel> parentModelArrayList;
    public Context cxt;

    public static class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView category;
        public RecyclerView childRecyclerView;

        public MyViewHolder(View itemView) {
            super(itemView);

            category = itemView.findViewById(R.id.Movie_category);
            childRecyclerView = itemView.findViewById(R.id.Child_RV);
        }
    }

    public ParentRecyclerViewAdapter(ArrayList<ParentModel> exampleList, Context context) {
        this.parentModelArrayList = exampleList;
        this.cxt = context;

    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.parent_recyclerview_items, parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public int getItemCount() {
        return parentModelArrayList.size();
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {

        ParentModel currentItem = parentModelArrayList.get(position);
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(cxt, LinearLayoutManager.HORIZONTAL, false);
        holder.childRecyclerView.setLayoutManager(layoutManager);
        holder.childRecyclerView.setHasFixedSize(true);

        holder.category.setText(currentItem.movieCategory());
        ArrayList<ChildModel> arrayList = new ArrayList<>();

        // added the first child row
        if (parentModelArrayList.get(position).movieCategory().equals("Category1")) {
            arrayList.add(new ChildModel(R.drawable.themartian,"Movie Name"));
            arrayList.add(new ChildModel(R.drawable.moana,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.mov2,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.blackp,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.moviedubbedinhindi2,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.hollywood1,"Movie Name"));
        }

        // added in second child row
        if (parentModelArrayList.get(position).movieCategory().equals("Category2")) {
            arrayList.add(new ChildModel(R.drawable.moviedubbedinhindi2,"Movie Name"));
            arrayList.add(new ChildModel(R.drawable.moviedubbedinhindi3,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.moviedubbedinhindi1,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.moviedubbedinhindi4,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.moviedubbedinhindi5,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.moviedubbedinhindi6,"Movie Name"));
        }

        // added in third child row
        if (parentModelArrayList.get(position).movieCategory().equals("Category3")) {
            arrayList.add(new ChildModel(R.drawable.hollywood6,"Movie Name"));
            arrayList.add(new ChildModel(R.drawable.hollywood5,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.hollywood4,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.hollywood3,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.hollywood2,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.hollywood1,"Movie Name"));
        }

        // added in fourth child row
        if (parentModelArrayList.get(position).movieCategory().equals("Category4")) {
            arrayList.add(new ChildModel(R.drawable.bestofoscar6,"Movie Name"));
            arrayList.add(new ChildModel(R.drawable.bestofoscar5,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.bestofoscar4,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.bestofoscar3,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.bestofoscar2,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.bestofoscar1,"Movie Name"));
        }

        // added in fifth child row
        if (parentModelArrayList.get(position).movieCategory().equals("Category5")) {
            arrayList.add(new ChildModel( R.drawable.moviedubbedinhindi4,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.hollywood2,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.bestofoscar4,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.mov2,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.hollywood1,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.bestofoscar1,"Movie Name"));
        }

        // added in sixth child row
        if (parentModelArrayList.get(position).movieCategory().equals("Category6")) {
            arrayList.add(new ChildModel(R.drawable.hollywood5,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.blackp,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.bestofoscar4,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.moviedubbedinhindi6,"Movie Name"));
            arrayList.add(new ChildModel( R.drawable.hollywood1,"Movie Name"));
            arrayList.add(new ChildModel(R.drawable.bestofoscar6,"Movie Name"));
        }

        ChildRecyclerViewAdapter childRecyclerViewAdapter = new ChildRecyclerViewAdapter(arrayList,holder.childRecyclerView.getContext());
            holder.childRecyclerView.setAdapter(childRecyclerViewAdapter);
        }
}
```

As you can see, we are binding the information of the  `ChildRecyclerViewAdapter` to the `ParentRecyclerViewAdapter`. We have set different data categories. In this case, each category contains its distinct data. The `ArrayList` binds to the parent RecyclerView. In the `onBindViewHolder`, we will set up the child RecyclerView by:

- Initializing and setting the [`LinearLayoutManager`](https://developer.android.com/reference/androidx/recyclerview/widget/LinearLayoutManager) (create an instance of the layout manager) for the child RecyclerView. Here we specify that this view will be `HORIZONTAL`.
- Invoke the layout fixed size. This tells the layout not to move around the screen. It stabilizes the layout screen movements.
- Pass `ArrayList` of the child items to the respective `ParentViewHolder` as `category.setText(currentItem.movieCategory())` of the parent RecyclerView. Each category will inflate with respective array list items consisting of a movie name and a hero image. Make sure to check the content of this project on [GitHub](https://github.com/kimkimani/Nested_RecyclerView) to get all the necessary image resources for each `movieCategory`.
- Associate the child Adapter and the RecyclerView. This informs the RecyclerView which adapter it should work with.

Let's set the necessary categories to display the movies to the main RecyclerView layout.

```java
public class MainActivity extends AppCompatActivity {
    private RecyclerView parentRecyclerView;
    private RecyclerView.Adapter ParentAdapter;
    ArrayList<ParentModel> parentModelArrayList = new ArrayList<>();
    private RecyclerView.LayoutManager parentLayoutManager;
    

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //set the Categories for each array list set in the `ParentViewHolder`
        parentModelArrayList.add(new ParentModel("Category1"));
        parentModelArrayList.add(new ParentModel("Category2"));
        parentModelArrayList.add(new ParentModel("Category3"));
        parentModelArrayList.add(new ParentModel("Category4"));
        parentModelArrayList.add(new ParentModel("Category5"));
        parentModelArrayList.add(new ParentModel("Category6"));
        parentRecyclerView = findViewById(R.id.Parent_recyclerView);
        parentRecyclerView.setHasFixedSize(true);
        parentLayoutManager = new LinearLayoutManager(this);
        ParentAdapter = new ParentRecyclerViewAdapter(parentModelArrayList, MainActivity.this);
        parentRecyclerView.setLayoutManager(parentLayoutManager);
        parentRecyclerView.setAdapter(ParentAdapter);
        ParentAdapter.notifyDataSetChanged();
    }
}
```

Initialize the parent adapter layout manager and inflate the view data into the application's main RecyclerView by associating it with the `ParentRecyclerViewAdapter`.

Everything is now set. Run the application to test if everything is working.

![Nested RecyclerView](/engineering-education/android-nested-recycler-view/nested-recycler-view.gif)

I hope this guide helped you understand and implement nested RecyclerView within your application context. For more reference, check the code on [GitHub](https://github.com/kimkimani/Nested_RecyclerView).

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
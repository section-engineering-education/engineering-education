Sliders are commonly used on cross platforms, i.e., websites, Desktop applications, and mobile applications. They are widely implemented on the home pages or application main screens to showcase primary and key features.

Let's take the case of an eCommerce application. You would like to show the new items you have in your shop without interfering with the user app interaction. Slides would be a perfect way to showcase some of these major new items to the user on your main application screen.

This guide will walk you through how to create an automatic slider page using android studio.

### What we shall look at
We will create a slider based on the following concepts.
- Populate an array list of slides into a `ViewPager` using `PagerAdapter`.
- Set a list of slides in a tabbed layout.
- Set timmer that will automatically slide to the next slider after a set of milliseconds.

### Prerequisites
This guide uses java in android studio. Prior knowledge of android [ViewPager](https://developer.android.com/training/animation/screen-slide), [PagerAdapters](https://developer.android.com/reference/kotlin/androidx/viewpager/widget/PagerAdapter), and [TabLayout](https://developer.android.com/reference/com/google/android/material/tabs/TabLayout) would be helpful.

### Setting Up
Start a new android studio project. I have changed the default parent theme. To do that on your android studio, go to `res` folder → `values` → `style.xml` and change the app theme, as shown below.

```xml
<resources 
<style name="Theme.AnAutomaticAndroidSlider" parent="Theme.AppCompat.Light.DarkActionBar"></style>
</resources>
```

### Laying out the slider UI components
Create an XML layout, name it `slider_items_layout.xml`. The slides are comprised of two main views.

- A text view for the slide title.
- An image view for the slide hero image.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="245dp">

    <ImageView
        android:scaleType="centerCrop"
        android:id="@+id/hero_img"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        android:src="@drawable/ic_launcher_background" />

    <ImageView
        android:id="@+id/imageView2"
        android:layout_width="0dp"
        android:layout_height="100dp"
        app:layout_constraintBottom_toBottomOf="@+id/hero_img"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:srcCompat="@drawable/gradient_bg" />

    <TextView
        android:id="@+id/slider_title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="TextView"
        android:textColor="#ffffff"
        android:textSize="24sp"
        app:layout_constraintBottom_toBottomOf="@+id/imageView2"
        app:layout_constraintEnd_toEndOf="@+id/imageView2"
        app:layout_constraintHorizontal_bias="0.458"
        app:layout_constraintStart_toStartOf="@+id/imageView2"
        app:layout_constraintTop_toTopOf="@+id/imageView2" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

>Any drawable resources used in this project can be found in this [GitHub](https://github.com/kimkimani/An_Auto_Android_Slider) repository

[Recycler view](https://www.youtube.com/watch?v=HtwDXRWjMcU) uses a list item layout. The same applies here. An item layout represents a single row of the list items. In our case, a row will represent a single view of one slide. Item layouts are reused by setting up adapter objects that will display the data sets dynamically.

### Setting a ViewPager and TabLayout
Your application's main layout includes a `ViewPager` and a `TabLayout`, as shown in the XML code below.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:background="@drawable/gradient_bg"
    android:layout_height="match_parent">

    <androidx.viewpager.widget.ViewPager
        android:id="@+id/slider_pager"
        android:layout_width="0dp"
        android:layout_height="245dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <com.google.android.material.tabs.TabLayout
        app:tabGravity="center"
        android:id="@+id/slider_tablayout_indicator"
        app:tabBackground="@drawable/indicator_selector"
        app:tabIndicatorHeight="0dp"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/slider_pager">
    </com.google.android.material.tabs.TabLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```

We'll populate the items in the slider layout into a `ViewPager`. `ViewPager` is a layout widget that contains several children's views. It controls the slides' swiping. An individual slide represents each child's view. We need to link up the `ViewPager` to a `PagerAdapter` to insert children's views representing each slide into the application screen.

### Setting up PagerAdapter
`ViewPager` goes in hand with `TabLayout`. `TabLayout` controls the jumping between sliders and getting an overview of all slides much easier.

`ViewPager` gets its data from a `PagerAdapter`. `PagerAdapter` keeps each slide it creates in memory, making it lightning fast to switch between already loaded slides. Go ahead and create a new java class, and the name is `SliderPagerAdapter`.

Before we implement the `PagerAdapter`, we need a model class.

#### Setting up a model class
A model class contains a collection of data objects that we want to populate to the adapter. These are the hero image and the slider title. Create a model class `SliderModel.java` that includes;

- Declaring an int of hero image and a string of the slider title
- Generating the respective getters and setters.

```java
public class SliderModel {

    private int hero_img;
    private String slider_Title;

    public SliderModel(int hero, String title) {
        this.hero_img = hero;
        this.slider_Title = title;
    }

    public int getHero_img() {
        return hero_img;
    }

    public String getSlider_Title() {
        return slider_Title;
    }

    public void setHero_img(int hero_img) {
        this.hero_img = hero_img;
    }

    public void setSlider_Title(String slider_Title) {
        this.slider_Title = slider_Title;
    }
}
```

#### Create a custom PagerAdapter
Create a new class and name it `SliderPagerAdapter`. This class should extend to `PagerAdapter`.

```java
public class SliderPagerAdapter extends PagerAdapter {
}
```

`PagerAdapter` controls the actual swiping between the different slides.

To implement the `PagerAdapter`, hove over `SliderPagerAdapter extends PagerAdapter` → right-click → navigate to generate and import;

1. A Constructor of `SliderPagerAdapter` with parameters `Context` and `List<SliderModel>` and set the parameter globals using the `this` keyword.

```java
public SliderPagerAdapter(Context context, List<SliderModel> sliderModelList) {
    this.context = context;
    this.sliderModelList = sliderModelList;
}
```

2. Override methods - import the following override methods.

- `instantiateItem`

Inflater the slider root items layout and initialize each item in the layout by the item id. This sets the position of the respective `ViewGroups` by setting the data objects to respective view items. `instantiateItem` will add this item list into the parent `ViewGroup`

- `getCount`

Overriding `getCount` will return the number of slides in the list. This will return the slide as associated with each position.

- `isViewFromObject`

This method is required by the `instantiateItem` method. `instantiateItem` returns an `Object` as the `key` when the slider pager changes to another slider pager. This `key` becomes the `View` (the current displaying slider). `isViewFromObject` will check if the `View == Object` and return a boolean value. If `true`, the `View` will be displayed as the current slide.

- `destroyItem`

`PagerAdapter` saves every slide it creates in a memory. This makes it lighting fast to switch between one slider to another because the `PagerAdapter` has already loaded the slides. However, this can take a lot of memory if you have a larger number of slides. It becomes a heavy and expensive task for the `PagerAdapter` to manage. `destroyItem` override method solves this by destroying and recreating the slides as needed.

Here is the complete Adapter code.

```java
public class SliderPagerAdapter extends PagerAdapter {

    private Context context;
    private List<SliderModel> sliderModelList;

    public SliderPagerAdapter(Context context, List<SliderModel> sliderModelList) {
        this.context = context;
        this.sliderModelList = sliderModelList;
    }

    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {

        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View sliderLayout = inflater.inflate(R.layout.slider_items_layout,null);

        ImageView hero_img = sliderLayout.findViewById(R.id.hero_img);
        TextView slider_title = sliderLayout.findViewById(R.id.slider_title);

        hero_img.setImageResource(sliderModelList.get(position).getHero_img());
        slider_title.setText(sliderModelList.get(position).getSlider_Title());
        container.addView(sliderLayout);
        return sliderLayout;
    }

    @Override
    public int getCount() {
        return sliderModelList.size();
    }

    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object o) {
        return view == o;
    }

    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        container.removeView((View)object);
    }
}
```

### Hook everything together
Declare the following in your `Mainactivity` class.

```java
private List<Slide> lstSlides;
private ViewPager viewPager;
private TabLayout tabLayoutIndicator;
```

Create an instance of `viewPager` and `tabLayoutIndicator` inside the `onCreate` method.

```java
sliderViewPager = findViewById(R.id.slider_pager) ;
tabLayoutIndicator = findViewById(R.id.slider_tablayout_indicator);
```

#### Preparing the slider adapter
This consists of;

- an array list of the slider items, an image, and a title describing each slide. Check image resources(`drawable`) in this [GitHub](https://github.com/kimkimani/An_Auto_Android_Slider/tree/master/app/src/main/res/drawable) repository.

```java
sliderList = new ArrayList<>() ;
sliderList.add(new SliderModel(R.drawable.slider1,"Slider 1 Title"));
sliderList.add(new SliderModel(R.drawable.slider2,"Slider 2 Title"));
sliderList.add(new SliderModel(R.drawable.slider3,"Slider 3 Title"));
sliderList.add(new SliderModel(R.drawable.slider4,"Slider 4 Title"));
sliderList.add(new SliderModel(R.drawable.slider5,"Slider 5 Title"));
sliderList.add(new SliderModel(R.drawable.slider6,"Slider 6 Title"));
sliderList.add(new SliderModel(R.drawable.slider7,"Slider 7 Title"));
sliderList.add(new SliderModel(R.drawable.slider8,"Slider 8 Title"));
sliderList.add(new SliderModel(R.drawable.slider9,"Slider 9 Title"));
sliderList.add(new SliderModel(R.drawable.slider10,"Slider 10 Title"));
```

- Hook the Viewpager to the `SliderPagerAdapter` (`PagerAdapter`) using `setAdapter`.

```java
SliderPagerAdapter adapter = new SliderPagerAdapter(this, sliderList);
sliderViewPager.setAdapter(adapter);
```

This will populate the available list of slides into pager views.

- Hooking up a `TabLayout` to the `ViewPager` `setupWithViewPager`. You need a single method (`setupWithViewPager`) to set the `TabLayout` into the `ViewPager`. With that, you get a sliding view with a tabular indicator.

```java
   tabLayoutIndicator.setupWithViewPager(sliderViewPager,true);
```

With just that, you get slides from the PagerAdapter's titles and image drawables.

Run the application to test if everything is working.

![](/engineering-education/how-to-create-an-automatic-slider-in-android-studio/sliders.gif)

Swiping through the slide pages will change the displaying slide, and tapping on the slide's tab will change the slide pages - as you'd expect.

#### Setting up the timmer
Create a method `SliderTimer` that extends `TimerTask`.

```java
public class SliderTimer extends TimerTask {
}
```

Hover over it → right-click → generate → implement methods → `run():void` and include the following code block.

```java
public class SliderTimer extends TimerTask {
    @Override
    public void run() {

        MainActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (sliderViewPager.getCurrentItem()< sliderList.size()-1) {
                    sliderViewPager.setCurrentItem(sliderViewPager.getCurrentItem()+1);
                }
                else
                    sliderViewPager.setCurrentItem(0);
            }
        });

    }
}
```

Initialize the `Timer` inside the `onCreate` and set the `delay` and `period` parameters in milliseconds.

- Delay - the time taken after displaying the current slide and triggering the next slide.
- Period - time taken between the successive slides.

```java
Timer timer = new Timer();
timer.scheduleAtFixedRate(new MainActivity.SliderTimer(),2000,3000);
```

Here is the Activity full code.

```java
public class MainActivity extends AppCompatActivity {
    private List<SliderModel> sliderList;
    private ViewPager sliderViewPager;
    private TabLayout tabLayoutIndicator;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sliderViewPager = findViewById(R.id.slider_pager) ;
        tabLayoutIndicator = findViewById(R.id.slider_tablayout_indicator);

        // list of slides
        sliderList = new ArrayList<>() ;
        sliderList.add(new SliderModel(R.drawable.slider1,"Slider 1 Title"));
        sliderList.add(new SliderModel(R.drawable.slider2,"Slider 2 Title"));
        sliderList.add(new SliderModel(R.drawable.slider3,"Slider 3 Title"));
        sliderList.add(new SliderModel(R.drawable.slider4,"Slider 4 Title"));
        sliderList.add(new SliderModel(R.drawable.slider5,"Slider 5 Title"));
        sliderList.add(new SliderModel(R.drawable.slider6,"Slider 6 Title"));
        sliderList.add(new SliderModel(R.drawable.slider7,"Slider 7 Title"));
        sliderList.add(new SliderModel(R.drawable.slider8,"Slider 8 Title"));
        sliderList.add(new SliderModel(R.drawable.slider9,"Slider 9 Title"));
        sliderList.add(new SliderModel(R.drawable.slider10,"Slider 10 Title"));
        SliderPagerAdapter adapter = new SliderPagerAdapter(this, sliderList);
        sliderViewPager.setAdapter(adapter);

        // set the slider timer
        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new MainActivity.SliderTimer(),2000,3000);
        tabLayoutIndicator.setupWithViewPager(sliderViewPager,true);
    }

    public class SliderTimer extends TimerTask {
        @Override
        public void run() {

            MainActivity.this.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (sliderViewPager.getCurrentItem()< sliderList.size()-1) {
                        sliderViewPager.setCurrentItem(sliderViewPager.getCurrentItem()+1);
                    }
                    else
                        sliderViewPager.setCurrentItem(0);
                }
            });
        }
    }
}
```

Run the application to test if this works.

![](/engineering-education/how-to-create-an-automatic-slider-in-android-studio/automiatic-slider-timer.gif)

I hope this guide helped you to create and implement sliders in your application. For more reference, check the code on [GitHub](https://github.com/kimkimani/An_Auto_Android_Slider).
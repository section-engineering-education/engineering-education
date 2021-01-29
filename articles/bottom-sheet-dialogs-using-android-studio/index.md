The bottom sheet seems to be replacing the regular android dialogs and menus. The bottom sheet is a component that slides up from the bottom of the screen to showcase additional content into your application UI cycle. The bottom sheet is like a message box that is triggered by a user's actions. Many big corporations have implemented the bottom sheet dialog concept. Some familiar examples are Google Maps, Instagram, and Google Drive. It is just countless to have all applications that have this fantastic feature.

An instance such as a music app uses this feature to showcase playlists and other features. An app that requires a user to select a document/file and upload and share them. Payment components have been constantly implemented using the bottom sheet dialog to load and display the end-users' relevant data.

In terms of application, any android view such as TextView, ImageView, RecyclerViews, Buttons, and Text inputs can be implemented into a bottom sheet. This makes it dynamic to load more diverse information, i.e., load data from the database and display them using the bottom sheet or collect information and save them to a database. In short, a bottom sheet can be applied in many instances as long as it fits your application cycle.

### Types of the bottom sheet dialogs

They are two main types of bottom sheet dialog, namely;

#### Modal bottom sheet dialog

It has characteristics of a standard screen dialog, such as an alert dialog. When triggered (by the user’s action), it slides up from the bottom of the current screen. A modal sheet contains a list of items. Items can correspond to some actions when clicked. It blocks interaction with the rest of the screen to indicate a shift of focus to the bottom sheet.

A Modal dialog shadows content and UI elements behind it and switches screen interactions onto the dialog. A click outside or back press dismisses it, and it disappears.

Instead of wrapping it up with the `CoordinatorLayout` like the persistent dialog, we create it dynamically, just like the regular dialog.

An excellent example of a modal bottom sheet dialog is the Google Drive application or payment bottom sheet.

![Google drive modal bottom sheet](/engineering-education/bottom-sheet-dialogs-using-android-studio/google-drive-modal-bottom-sheet.png)

Or this payment bottom sheet dialog examples.

![Payment bottom sheet dialog](/engineering-education/bottom-sheet-dialogs-using-android-studio/payment-bottom-sheet-dialog.jpg)

They are a great alternative to inline menus and simple dialogs as it provides additional room for more content, iconography, and more screen actions. It is not part of the main application layout. It perfectly works when the menu content presents a link to other apps.

#### Persistent bottom sheet dialog

Persistent BottomSheet dialog provides supplementary content about the current screen. A persistent dialog works as a child of `CoordinatorLayout` to display pages’ additional content.

A portion of the container is visible to provide users with more content and more options about the current screen when slid from bottom to top. Unlike the modal dialog, a persistent dialog widget is permanent for the current screen content.

An excellent example of a persistent bottom sheet dialog is the google map application. It has outstandingly implemented this feature.

![Google maps bottom sheet](/engineering-education/bottom-sheet-dialogs-using-android-studio/google-map-bottom-sheet.png)

### Implementation

Start a new android studio project. To implement a bottom sheet dialog, you need a material design library.

Include the following library in your `app.gradle` file.

```java
implementation 'com.google.android.material:material:1.2.1'
```

Sync the project to download the library. This will make all the required functions available in your project as build-it.

Since we have two types of bottom sheet dialog, we will discuss how to implement them using android studio.

### Implementing a modal bottom sheet dialog

1. Using BottomsheetDialog

#### Preparing layouts

Design the dialog elements. To show the dialog, you need to lay out an XML file that arranges the dialog's content. You can choose to use any view that fits your dialog content. Any view, including Recycler view, Images, Text, Inputs, and Button, can be included in a bottom sheet dialog. The dialog creates more room to showcase more diverse content around your application cycle. Any XML design implemented in the standard activity layout can also be implemented with a bottom sheet dialog.

Here is the `bottom_sheet_dialog_layout.xml` layout that I will be using to implement a modal bottom sheet.

Make sure you generate some vector images as showcased in the ImageView of the below XML file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:id="@+id/download"
        android:background="?android:attr/selectableItemBackground"
        android:padding="8dp">

        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:src="@drawable/ic_baseline_cloud_download_24"
            android:layout_margin="8dp"/>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Download File"
            android:layout_gravity="center_vertical"
            android:padding="8dp"/>
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:id="@+id/shareLinearLayout"
        android:background="?android:attr/selectableItemBackground"
        android:padding="8dp">

        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:src="@drawable/ic_baseline_share_24"
            android:layout_margin="8dp"/>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Share"
            android:layout_gravity="center_vertical"
            android:padding="8dp"/>

    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:id="@+id/uploadLinearLayout"
        android:background="?android:attr/selectableItemBackground"
        android:padding="8dp">

        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:src="@drawable/ic_baseline_add_to_drive_24"
            android:layout_margin="8dp"/>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Upload To Google Drive"
            android:layout_gravity="center_vertical"
            android:padding="8dp"/>

    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:id="@+id/copyLinearLayout"
        android:background="?android:attr/selectableItemBackground"
        android:padding="8dp">

        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:src="@drawable/ic_baseline_file_copy_24"
            android:layout_margin="8dp"/>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Copy Link"
            android:layout_gravity="center_vertical"
            android:padding="8dp"/>
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:id="@+id/delete"
        android:background="?android:attr/selectableItemBackground"
        android:padding="8dp">

        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:src="@drawable/ic_baseline_delete_24"
            android:layout_margin="8dp"/>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Delete File Selection"
            android:layout_gravity="center_vertical"
            android:padding="8dp"/>
    </LinearLayout>
</LinearLayout>
```

A dialog is triggered by a specified user action around the application cycle. Since this is meant for demonstration and no actual app cycle exit, we will include a button to implement an `onClick` Listener event to trigger the dialog.

Go ahead and add a button in your `main_activity.xml` file.

```xml
<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:id="@+id/button"
    android:backgroundTint="@color/purple_500"
    android:fontFamily="serif"
    android:text="Show Dialog"
    android:textColor="#FFFFFF"
    android:textSize="18sp"
    tools:ignore="MissingConstraints"
    tools:layout_editor_absoluteX="116dp"
    tools:layout_editor_absoluteY="28dp"/>
```

#### Initializing the bottom sheet in the activity

Initialize the button and set the onClick Listener inside the `onCreate` function. When the button is clicked, we will show the dialog. Create a function `showBottomSheetDialog()` and call it is inside the button `onClick` Listener.

```java
Button mBottton = findViewById(R.id.button);
    mBottton.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            showBottomSheetDialog()
    }
});
```

Inside the function `showBottomSheetDialog()` initialize the bottom sheet dialog. Set its content views and the dialog layout XML as specified in the `bottom_sheet_dialog_layout.xml`. Declare all the layouts and call them by `id` as specified in the bottom sheet layout. And we are ready to show the dialog with `bottomSheetDialog.show()`.

```java
private void showBottomSheetDialog() {

    final BottomSheetDialog bottomSheetDialog = new BottomSheetDialog(this);
    bottomSheetDialog.setContentView(R.layout.bottom_sheet_dialog);

    LinearLayout copy = bottomSheetDialog.findViewById(R.id.copyLinearLayout);
    LinearLayout share = bottomSheetDialog.findViewById(R.id.shareLinearLayout);
    LinearLayout upload = bottomSheetDialog.findViewById(R.id.uploadLinearLayout);
    LinearLayout download = bottomSheetDialog.findViewById(R.id.download);
    LinearLayout delete = bottomSheetDialog.findViewById(R.id.delete);

    bottomSheetDialog.show();
}
```

Run the app to test if the sheet is working. Clicking the button will trigger the dialog to slide from the bottom to the top.

![Modal bottom sheet](/engineering-education/bottom-sheet-dialogs-using-android-studio/modal-bottom-sheet-fragment.jpg)

#### Set onClick Listener

Each element's layout included in the dialog can be assigned an action. When an item is clicked, it will redirect the user to the necessary choice of action.

Set `onClick` to each element. In our case, we are designing a dialog boilerplate. We will toast a message to show that an element was clicked. In a real app implementation, you would set the necessary set of actions inside each element according to where you want your users to be directed once a dialog element is selected.

Go ahead and include the following `OnClickListeners` right above `bottomSheetDialog.show()`.

```java
copy.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Toast.makeText(getApplicationContext(), "Copy is Clicked ", Toast.LENGTH_LONG).show();
        bottomSheetDialog.dismiss();
    }
});

share.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Toast.makeText(getApplicationContext(), "Share is Clicked", Toast.LENGTH_LONG).show();
        bottomSheetDialog.dismiss();
    }
});

upload.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Toast.makeText(getApplicationContext(), "Upload is Clicked", Toast.LENGTH_LONG).show();
        bottomSheetDialog.dismiss();
    }
});

download.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Toast.makeText(getApplicationContext(), "Download is Clicked", Toast.LENGTH_LONG).show();
        bottomSheetDialog.dismiss();
    }
});

delete.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Toast.makeText(getApplicationContext(), "Delete is Clicked", Toast.LENGTH_LONG).show();
        bottomSheetDialog.dismiss();
    }
});
```

In this case, once a single element is clicked, I chose to close the dialog by specifying `bottomSheetDialog.dismiss()`.

You can also choose a more distinct action, instructing your application to do something when the dialog is dismissed. That is, if you have something specific that your application should do when a user dismisses the dialog.

```java
bottomSheetDialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
    @Override
    public void onDismiss(DialogInterface dialog) {
        // Instructions on bottomSheetDialog Dismiss
    }
});
```

#### Testing the application

![Modal dialog](/engineering-education/bottom-sheet-dialogs-using-android-studio/modal-dialog.gif)

2. BottomSheetDialogFragment

A fragment can be displayed as a bottom sheet dialog. Go ahead and create a new fragment, call it `BottomSheetFragment`. You can opt to start a new project.
Creating a fragment will generate an XML file associated with it. Go ahead and include your layout design in it. Use the same layout as specified in `bottom_sheet_dialog_layout.xml`. Inflate the layout for this fragment.

```java
public class BottomSheetFragment extends Fragment {
    public BlankFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.bottom_sheet_dialog, container, false);
        return view;
    }
}
```

Add a button in the activity XML and declare and set `OnClick` Listener as we explained when using `BottomsheetDialog`.

We want to open the fragment when the button is clicked.
Indicate the following code block inside the button `OnClick` Listener.

```java
Button bottton = findViewById(R.id.button);
bottton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        BlankFragment blankFragment = new BlankFragment();
        blankFragment.show(getSupportFragmentManager(),blankFragment.getTag());
    }
});
```

This won't load a bottom sheet dialog. To convert the fragment to a bottom sheet is simple. Instead of the fragment extending to the `Fragment`, (`BottomSheetFragment extends Fragment`) make the fragment extent to `BottomSheetDialogFragment`, (`BottomSheetFragment extends BottomSheetDialogFragment`).

```java
public class BottomSheetFragment extends BottomSheetDialogFragment {

}
```

Run the application, and it should now run as expected.

![Modal bottom sheet fragment](/engineering-education/bottom-sheet-dialogs-using-android-studio/modal-bottom-sheet-fragment.jpg)

Check the code for implementing both modal dialogs on [GitHub](https://github.com/kimkimani/ModalBottomSheet).

### Implementing a persistent bottom sheet dialog

#### Laying out the bottom sheet design

I will use an example of a simple login screen. Instead of showing it within the regular activity layout, I will use a persistent dialog to slide it into the main screen.

I have created a `bottom_sheet_dialog_layout.xml` and included the following simple login layout.

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/bottom_sheet_layout"
    android:layout_width="match_parent"
    android:orientation="vertical"
    android:layout_height="wrap_content">

    <LinearLayout
        android:id="@+id/bottom_sheet_header"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/purple_500"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_weight="3"
            android:fontFamily="serif"
            android:padding="24dp"
            android:textSize="18sp"
            android:text="Welcome Back. Please Login"
            android:textColor="@android:color/white" />

        <ImageView
            android:id="@+id/bottom_sheet_arrow"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:layout_weight="1"
            app:srcCompat="@drawable/ic_baseline_keyboard_arrow_up_24" />
    </LinearLayout>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:background="@color/teal_200"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:filterTouchesWhenObscured="false"
            android:gravity="center_horizontal"
            android:orientation="vertical"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:fontFamily="serif"
                android:gravity="center_horizontal"
                android:text="login"
                android:textSize="36sp" />

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="24dp"
                android:orientation="horizontal"
                android:padding="10dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_weight="1"
                    android:textColor= "@color/purple_500"
                    android:fontFamily="serif"
                    android:text="username"
                    android:textSize="24sp" />

                <EditText
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_weight="1"
                    android:ems="10"
                    android:fontFamily="serif"
                    android:hint="enter_email_address"
                    android:inputType="textEmailAddress" />

            </LinearLayout>

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="horizontal"
                android:padding="10dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_weight="1"
                    android:textColor= "@color/purple_500"
                    android:fontFamily="serif"
                    android:text="password"
                    android:textSize="24sp" />

                <EditText
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_weight="1"
                    android:ems="10"
                    android:fontFamily="serif"
                    android:hint="enter_password"
                    android:inputType="textPassword" />
            </LinearLayout>

            <Button
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                android:layout_marginBottom="50dp"
                android:fontFamily="serif"
                android:text="login"
                android:backgroundTint="@color/purple_500"
                android:textColor="#FFFFFF"
                android:textSize="18sp" />
        </LinearLayout>
    </androidx.constraintlayout.widget.ConstraintLayout>
</LinearLayout>
```

![Bottom sheet](/engineering-education/bottom-sheet-dialogs-using-android-studio/bottom-sheet.jpg)

This is not a bottom sheet yet. It's just a regular layout. To make the layout a bottom sheet dialog, there as so few behavior flags that we need to add to the root layout. They control the bottom sheet behaviors.

These bottom sheet behavior properties are added to the root layout of the bottom sheet design. Any layout that you need to populate as a bottom sheet dialog needs these behavior flags. They can also be added [dynamically using java](https://material.io/components/sheets-bottom/android#handling-insets).

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/bottom_sheet_layout"
    android:layout_width="match_parent"
    android:orientation="vertical"
    android:layout_height="wrap_content"
    app:behavior_hideable="false"
    app:behavior_peekHeight="62dp"
    app:layout_behavior="com.google.android.material.bottomsheet.BottomSheetBehavior">
```

This bottom sheet behavior flags include;

- `app:layout_behavior` - applies the `BottomSheetBehavior` into the XML file. This is assigned to `com.google.android.material.bottom sheet`. It is the most important `BottomSheetBehavior` attribute as it defines a given layout as a bottom sheet dialog.

- `app:behavior_hideable` - takes a Boolean value. If `true`, a user can drag and hide the dialog by sliding it down. If false, the dialog will float on the screen and will not be hideable.

- `app:behavior_peekHeight` - it defines the height of the sheet that is visible. A bottom sheet can contain diverse content. Peek height highlights a portion of a bottom sheet visible to the users before interacting with the other bottom sheet components. When an action is triggered, the dialog will expand to reveal the extra content.

***Remember to add an id to be used to access the layout.***

For a bottom sheet to be implemented effectively, it must be a child of `CoordinatorLayout`. To do that, go to your main root XML file of your Activity or Fragment. In our case, it will be the `activity_main.xml`.

Here is the code to do that

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.coordinatorlayout.widget.CoordinatorLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <include layout="@layout/bottom_sheet_dialog_layout" />
    </androidx.coordinatorlayout.widget.CoordinatorLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

***Remember to include the bottom sheet we designed. Wrap it with `CoordinatorLayout`.***

![Bottom sheet peek height](/engineering-education/bottom-sheet-dialogs-using-android-studio/bottom-sheet-peek-height.jpg)

#### Expanding and collapsing the sheet dialog

To control the sliding and collapsing of the dialog we use states. They are different states of the bottom sheet that you need to understand. They include.

- `STATE_EXPANDED` - the dialog is visible to its maximum defined height.
- `STATE_COLLAPSED` - the dialog is visible depending on the set `peekHeight`.
- `STATE_DRAGGING` - the user is dragging the dialog up and down.
- `STATE_SETTLING` - show that the dialog is settling at a specific height. This can be the `peekHeight`, expanded height, or zero if the dialog is hidden.
- `STATE_HIDDEN` - the dialog is not visible.

The last thing we will do is listen to the state of the dialog. To do that, we will add `BottomSheetCallback` to detect any state changes.

- Declare the necessary parameters

```java
private LinearLayout mBottomSheetLayout;
private BottomSheetBehavior sheetBehavior;
private ImageView header_Arrow_Image;
```

- Initialize the behavior bottom sheet layout and the arrow image

```java
mBottomSheetLayout = findViewById(R.id.bottom_sheet_layout);
sheetBehavior = BottomSheetBehavior.from(mBottomSheetLayout);

header_Arrow_Image = findViewById(R.id.bottom_sheet_arrow);
```

- We will assign `OnClick` Listener to the arrow vector image. When clicked, we want to expand or collapse the dialog

```java
header_Arrow_Image.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {

        if(sheetBehavior.getState() != BottomSheetBehavior.STATE_EXPANDED){
            sheetBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);
        } else {
            sheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
        }

    }
});
```

- A `BottomSheetCallback` to listen to the `BottomSheetBehavior` state

```java
sheetBehavior.addBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
    @Override
    public void onStateChanged(@NonNull View bottomSheet, int newState) {
    }
    @Override
    public void onSlide(@NonNull View bottomSheet, float slideOffset) {

        header_Arrow_Image.setRotation(slideOffset * 180);
    }
});
```

`onStateChanged` tells the application what's happening on the dialog depending on the corresponding change of state. `onSlide` will rotate the arrow image when `STATE_EXPANDED` has reached its maximum height while sliding bottom to top. On the other side, the image will rotate to its original state when `STATE_COLLAPSED` is at `peekHeight`.

#### Run the application

![Persistent dialog](/engineering-education/bottom-sheet-dialogs-using-android-studio/persistent-dialog.gif)

Check the code for implementing persistent dialog on [GitHub](https://github.com/kimkimani/PersistentBottomSheetDialog).

### Conclusion

The bottom sheet dialog is a unique way to display menus and dialogs. It provides more room to include more content. Bottom sheet dialogs are diverse. You can choose to implement any view or layout into them. This way, it becomes easier to incorporate extra information distinctly into your application life cycle.

Check out [Material documentation](https://material.io/components/sheets-bottom#behavior) and learn more about the bottom sheet dialog. There are diverse dialog examples that will help you learn the do and don't while implementing the dialog into your application, theming, and other more specs.
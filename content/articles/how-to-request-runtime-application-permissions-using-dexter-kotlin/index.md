---
layout: engineering-education
status: publish
published: true
url: /how-to-request-runtime-application-permissions-using-dexter-kotlin/
title: How to Request Runtime Application Permissions using Dexter
description: This tutorial will help the reader understand how to create an application that allows users to grant or restrict permissions to an application during runtime using Dexter.
author: janet-kabura
date: 2022-04-27T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/how-to-request-runtime-application-permissions-using-dexter-kotlin/hero.jpg
  alt: Runtime Application Permissions using Dexter Hero Image
---
Runtime permissions are requested by the developer and granted access by the user when a particular action wants to be executed.
<!--more-->
It was previously necessary to ask for permissions before installing an app in the older Android versions (1.0). Google introduced new features in Android (6.0.1), also known as `Marshmallow`, where a user could grant permissions in runtime.

Dexter makes it easier to get the permissions for your app at runtime.

In this tutorial, we will create an application that allows users to grant or restrict permissions to an application during runtime using Dexter.

We will use device features such as the camera to take images.

### Prerequisites
To follow along with this article, you need:

-  Basic [Kotlin](https://developer.android.com/courses/android-basics-kotlin/course) programming language knowledge.
- A virtual Android device (optional).
-  Basic knowledge in using [Glide](https://github.com/bumptech/glide).

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Step 1 - Adding required dependencies for the project](#step-1-adding-required-dependencies-for-the-project)
- [Step 2 - Adding permissions in the manifest file](#step-2-adding-permissions-in-the-manifest-file)
- [Step 3 - Working with XML files](#step-3-working-with-xml-files)
- [Step 4 - Working with the MainActivity.kt file](#step-4-working-with-the-mainactivitykt-file)
- [Step 5 - Running the application](#step-5-running-the-application)
- [Conclusion](#conclusion)

### Step 1 - Adding required dependencies for the project
Add the following dependencies in the app-level *build.gradle* file:

```gradle
//Scalable density pixels that is it will have equal layouts in all phone screens
implementation 'com.intuit.sdp:sdp-android:1.0.6'
//Permissions request using dexter
implementation 'com.karumi:dexter:6.2.3'
//Glide dependency
implementation 'com.github.bumptech.glide:glide:4.13.0'
```
- [Sdp](https://github.com/intuit/sdp) expands along with the screen. It scales all Android Studio palettes according to the user's screen size.
- [Dexter](https://github.com/Karumi/Dexter) library will help us request runtime permissions easily. This is the primary aim of this tutorial.
- [Glide](https://github.com/bumptech/glide) is an Android image-loading framework that integrates media decoding, memory and disk caching, and resource pooling.

Since we will use [view binding](https://developer.android.com/topic/libraries/view-binding), include the following code snippet in the same *build.gradle* file:

```kt
android {
    viewBinding.enabled = true
}
```

> After adding the dependencies, *sync* the project.

### Step 2 - Adding permissions in the manifest file
This tutorial will request application permissions such as using the camera, writing and reading files from the internal storage.

Writing files includes saving the captured image to the memory while reading files involves accessing data stored in memory.

To achieve that, include the following permissions in the *manifest.xml* file:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
                 android:maxSdkVersion="28"/>
<uses-permission android:name="android.permission.CAMERA"/>
```

### Step 3 - Working with XML files

#### Working with the main activity layout
Add the following code in the *activity_main.xml* file to design the *application* layout:

```xml
    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/primaryColor"
        android:minHeight="?attr/actionBarSize"
        android:theme="?attr/actionBarTheme"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintBottom_toTopOf="@id/cl_2"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/cl_2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toBottomOf="@id/toolbar">

        <ScrollView
            android:id="@+id/scrollView"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:fillViewport="true"
            android:scrollbars="vertical"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent">

            <FrameLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toBottomOf="@id/cl_2"
                tools:ignore="MissingConstraints">

                <ImageView
                    android:id="@+id/iv_image"
                    android:layout_width="match_parent"
                    android:layout_height="500dp"
                    android:contentDescription="@string/app_name"
                    android:scaleType="fitXY"
                    tools:srcCompat="@tools:sample/backgrounds/scenic" />

                <ImageView
                    android:id="@+id/iv_add_image"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_gravity="end|bottom"
                    android:layout_marginEnd="20dp"
                    android:contentDescription="@string/add_photo"
                    android:padding="10dp"
                    app:srcCompat="@drawable/ic_add_a_photo" />
            </FrameLayout>
        </ScrollView>
</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Designing the custom dialog action
This dialog will pop up when we click on the `add image` icon. It will allow us to choose the *actions gallery* or capture the image.

To add the custom dialog, click *res -> layout -> right-click -> new -> layout_resource_file*.

Name the file as `dialog_custom_image_selection` and click `OK` to finish.

Add the following code in the custom dialog layout file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="@dimen/_10sdp"
    app:layout_constraintHorizontal_chainStyle="spread"
    app:chainUseRtl="true">

    <TextView
        android:id="@+id/tv_title"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:text="@string/title_select_image_action"
        android:textColor="@color/grey_900"
        android:textSize="@dimen/_16sdp"
        android:textStyle="bold"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintBottom_toTopOf="@id/linear_layout"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <LinearLayout
        android:id="@+id/linear_layout"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="@dimen/_15sdp"
        android:layout_marginTop="@dimen/_10sdp"
        android:layout_marginEnd="@dimen/_15sdp"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_chainStyle="spread"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/tv_title">

        <TextView
            android:id="@+id/tv_camera"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="end"
            android:layout_margin="@dimen/_10sdp"
            android:layout_marginBottom="@dimen/_10sdp"
            android:gravity="start"
            android:text="@string/lbl_camera"
            android:textColor="@color/blue_grey_700"
            android:textSize="@dimen/_15sdp"
            app:drawableTopCompat="@drawable/ic_vector_photo" />

        <TextView
            android:id="@+id/tv_gallery"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="end"
            android:layout_margin="@dimen/_10sdp"
            android:layout_marginTop="@dimen/_10sdp"
            android:text="@string/lbl_gallery"
            android:textColor="@color/blue_grey_700"
            android:textSize="@dimen/_15sdp"
            app:drawableTopCompat="@drawable/ic_vector_image" />
    </LinearLayout>
</android.support.constraint.ConstraintLayout>
```
You can read more about chain styles [here](https://medium.com/@nomanr/constraintlayout-chains-4f3b58ea15bb).

### Step 4 - Working with the MainActivity.kt file
We need to set up the *MainActivity* class to use the view binding that we specified in the *build.gradle* file:

```kotlin
class MainActivity : AppCompatActivity(), View.OnClickListener {
    private lateinit var mBinding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mBinding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(mBinding.root)
    }
}
```
#### Setting up the ToolBar
To set up the *ActionBar* which will display menu items in our layout, include the following code snippet:

```kotlin
//first set up the method setActionBar on the oncreate method
setActionBar()

  private fun setActionBar() {
        setSupportActionBar(mBinding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
    }
```
#### Displaying the custom image selection dialog
We need to set a click listener to our `add_image` view and then we pass the `customImageSelectionDialog()` method to display our `custom_image_selection` layout:

```kotlin
//Set the on click listener for our add image view in the oncreate method
mBinding.ivAddImage.setOnClickListener(this)

override fun onClick(v: View?) {
    if (v != null) {
        when (v.id) {
            R.id.iv_add_image -> {
                customImageSelectionDialog()
                return
            }
        }
    }
}
```

#### Using Dexter in the application
First, set up the `customImageSelection()` method that we passed during the on-click event to the ImageView.

We then add Dexter permissions because it's part of the triggered events. Add the code below:

```kt
private fun customImageSelectionDialog() {
        val dialog = Dialog(this)
        //This binding will set the content view of the customImageSelection layout.

        val binding: DialogCustomImageSelectionBinding =
            DialogCustomImageSelectionBinding.inflate(layoutInflater)
        dialog.setContentView(binding.root)

        // Set up click listener and events for the text view camera
        binding.tvCamera.setOnClickListener {
            Dexter.withContext(this)
                // we will use with permission method since we are working with many permissions
                .withPermissions(
                    Manifest.permission.READ_EXTERNAL_STORAGE,
                    Manifest.permission.CAMERA
                ).withListener(object : MultiplePermissionsListener {
                    // ensure you implement members of the object which is related to dexter third party library
                    override fun onPermissionsChecked(report: MultiplePermissionsReport?) {
                        report?.let {
                            if (report.areAllPermissionsGranted()) {
                                val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                                //since we have over one activity result i.e.,Camera, Gallery, save camera image
                                //to a directory, we shall set a companion object below the class main activity.
                                startActivityForResult(intent, CAMERA)
                            }
                        }
                    }

                    override fun onPermissionRationaleShouldBeShown(
                        permissions: MutableList<PermissionRequest>?,
                        token: PermissionToken?
                    ) {
                        // It is the alert dialog that user will allow permissions
                        showRationalDialogForPermissions()
                    }

                }).onSameThread().check()
                //dialog dismisses when the textview camera is clicked
            dialog.dismiss()
        }
        // Set up click listener and events for the textview gallery
        binding.tvGallery.setOnClickListener {
            Dexter.withContext(this)
            // we will use with permission method since we are working with one permission
            .withPermission(
                Manifest.permission.READ_EXTERNAL_STORAGE
            ).withListener(object : PermissionListener {
            // ensure you implement members of the object which is related to dexter third party library
                override fun onPermissionGranted(p0: PermissionGrantedResponse?) {
                    val galleryIntent = Intent(
                        Intent.ACTION_PICK, MediaStore
                            .Images.Media.EXTERNAL_CONTENT_URI)
                    startActivityForResult(galleryIntent, GALLERY)
                    Toast.makeText(
                        this@MainActivity,
                        "You have gallery permissions now",
                        Toast.LENGTH_SHORT
                    ).show()
                }

                override fun onPermissionDenied(p0: PermissionDeniedResponse?) {
                    Toast.makeText(
                        this,
                        "You have denied storage permissions to select image",
                        Toast.LENGTH_SHORT
                    ).show()
                }

                override fun onPermissionRationaleShouldBeShown(
                    p0: PermissionRequest?,
                    p1: PermissionToken?
                ) {
                    // It is the alert dialog that user will allow permissions
                    showRationalDialogForPermissions()
                }


            }).onSameThread().check()
            //dialog dismisses when textview gallery is clicked
            dialog.dismiss()
        }
        // For showing our custom dialog for image selection action
        dialog.show()
    }

       companion object {
        private const var CAMERA = 1
        private const var GALLERY = 2
        private const val IMAGE_DIRECTORY = "MyImages"
    }
```

Add the following code associated with the alert dialog that will be shown after the `onPermissionRationalShouldBeShown` method was passed as a permission listener:

```kotlin
    private fun showRationalDialogForPermissions() {
        AlertDialog.Builder(this).setMessage(
            "It looks that you have turned off " +
                    "permissions required for these features. It can be enabled under " +
                    "applications settings"
        )
            .setPositiveButton("GO TO SETTINGS")
            { _, _ ->
                try {
                    val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                    val uri = Uri.fromParts("package", packageName, null)
                    intent.data = uri
                    startActivity(intent)
                } catch (e: ActivityNotFoundException) {
                    e.printStackTrace()
                }
            }
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }.show()
    }
```

The methods below are associated with Dexter permissions:
- `withContext()` - This method asks for permission to run the current activity.

- `withPermission()`- This method is used to request and register permissions associated with the event's action to be carried out. I.e., camera permission.

- `withListener()` - This method can perform recurring tasks. We pass an object permission listener so that we can implement members associated with it.

- `onPermissionsChecked()` - This method is used to check if any permission is granted. If there are some which are granted, then the `onPermissionGranted()` method is passed.

- `onPermissionRationaleShouldBeShown()` - When a user provides some permissions but denies others, this method is invoked. Android warns you if the request is potentially harmful or the permission has already been denied.

- `onPermissionGranted()` - When all rights are granted, this function is invoked. It uses the report of the `onPermissionsChecked()` method to decide whether it will implement some associated codes or not.

- `onPermissionDenied()` - This method checks if all the permissions are denied permanently.

- `onSameThread()` - This function is called before permissions checks to collect permission listener callbacks on the same thread.

#### Loading a bitmap to the ImageView
Suppose the user has granted the application all or any permission, i.e., to use the camera and access the media files from the gallery.

In that case, we can perform certain actions. We can load the `ImageView` in the `activity_main.xml` with a bitmap from the media files using Glide (our third-party library) and the camera.

We use the function on `activityResult()` to handle the result.

Add the code below to achieve this functionality:

```kt
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == CAMERA) {
                data?.extras?.let {
                    val thumbnail: Bitmap = data.extras!!.get("data") as Bitmap
                    Glide.with(this)
                        .load(thumbnail)
                        .centerCrop()
                        .into(mBinding.ivImage)
                        //the image will be saved to an image directory in the internal storage. We will create its function later
                     /*
                  set up the variable image path inside the mainActivity class as shown below
                    private var imagePath: String = ""
                     */
                    imagePath = saveImageToInternalStorage(thumbnail)
                    Log.i("ImagePath", imagePath)
                     // Whenever the image is loaded, the vector add image will change to vector edit, meaning you can configure the changes by adding another image.
                    mBinding.ivAddImage.setImageDrawable(ContextCompat
                            .getDrawable(this, R.drawable.ic_vector_edit)
                    )
                }
            }
            if (requestCode == GALLERY) {
                data?.let {
                    val selectedPhotoUri = data.data
                    Glide.with(this)
                        .load(selectedPhotoUri)
                        .diskCacheStrategy(DiskCacheStrategy.ALL)
                        .listener(object : RequestListener<Drawable> {
                            override fun onLoadFailed(e: GlideException?,model: Any?,target: Target<Drawable>?,isFirstResource: Boolean): Boolean {
                                Log.e("Tag", "Error loading image", e)
                                return false
                            }

                            override fun onResourceReady(resource: Drawable?,model: Any?,target: Target<Drawable>?,dataSource: DataSource?,isFirstResource: Boolean): Boolean {
                                resource?.let {
                                    val bitmap: Bitmap = resource.toBitmap()
                                    imagePath = saveImageToInternalStorage(bitmap)
                                }
                                return false
                            }
                        })
                        .centerCrop()
                        .into(mBinding.ivImage)
                         // Whenever the image is loaded, the vector add image will change to vector edit meaning you can configure the changes by adding another image.

                    mBinding.ivAddImage.setImageDrawable(ContextCompat
                            .getDrawable(this, R.drawable.ic_vector_edit)
                    )
                }
            }
        }
        // The code below will execute when the user starts the activity of either picking an image from the gallery or capturing an image using the camera but didn't complete the action

        else if (resultCode == Activity.RESULT_CANCELED) {
            Log.e("cancelled", "User cancelled Image selection")
        }
    }
```
#### Saving our image to internal storage
Finally, we need to save the image that we captured with the camera. Images are saved to the internal storage, hence we need to create the `saveImageToInternalStorage()` function. It will contain:

- A specific directory where it is saved for easier access.
- The mode the image is to be saved with, i.e., will the image be accessed with other applications, or its just our application (MODE_PRIVATE)
- The image's identity number.
- Image quality.
- Image's compression format, i.e., `.JPEG`.

```kt
 private fun saveImageToInternalStorage(bitmap: Bitmap): String {
        val wrapper = ContextWrapper(applicationContext)
        var file = wrapper.getDir(IMAGE_DIRECTORY, Context.MODE_PRIVATE)
        file = File(file, "${UUID.randomUUID()}.jpg")
        try {
            val stream: OutputStream = FileOutputStream(file)
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, stream)
            stream.flush()
            stream.close()
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return file.absolutePath
    }
```

### Step 5: Running the application
To test the app, use an emulator (virtual device) that you installed in the IDE. Alternatively, you can use a physical Android device.

### Conclusion
This tutorial discussed how runtime permissions are easily requested using the Dexter library. We also learned how `Glide` is used to load images on Android.

You can, therefore, use this knowledge to craft other beautiful and quality applications.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)

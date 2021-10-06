## Android Studio Camera Tutorial using CameraX
### Introduction
If you want to take pictures in your app, there are generally 2 paths to follow:
1. Invoke an implicit intent `Intent(MediaStore.ACTION_IMAGE_CAPTURE)` that redirects to the normal camera application
2. Use a Camera API to capture images.

In this tutorial, you will be tackling the 2nd path. Camera APIs are better because:
1. They give you more control over how the images are taken and processed.
2. They produce higher quality images.

The Camera API used will be the CameraX API. This is currently the **BEST** android API to use for taking pictures, because:
1. It has been thoroughly tested by the android team to ensure consistency across devices.
2. It is much easier to use than the rest.

### Goal
In this tutorial, you will develop a basic camera application. The application will have the following functionalities:
1. Hold a camera preview inside it (that is, the screen that sees through the camera).
2. Switch between the back and front camera
3. Take pictures and save them in a localised storage location.
4. View the pictures taken in a scrollable gallery.

### Pre-requisites
A basic understanding of android app development with Kotlin.

### Table of contents
1. Project Setup
2. The Camera Preview
3. Image Capture and Storage
4. Switch Cameras
5. Local Gallery
6. Conclusion

### 1. Project Setup
Create a new project in android studio through an empty activity.
Add the following dependencies in the build.gradle(app):

``` gradle
    buildFeatures{
        //enable view binding
        viewBinding true
    }
    dependencies{
        ...
        //Check for the latest versions
            def camerax_version = "1.0.1" 
        // CameraX core library using camera2 implementation
            implementation "androidx.camera:camera-camera2:$camerax_version"
        // CameraX Lifecycle Library
            implementation "androidx.camera:camera-lifecycle:$camerax_version"
        // CameraX View class
            implementation "androidx.camera:camera-view:1.0.0-alpha27"
    }
```

You will also need to declare the following permissions in the `AndroidManifest.xml` file, above the `<application>` tag:
```xml
    <uses-feature android:name="android.hardware.camera.any"/>
    <uses-permission android:name="android.permission.CAMERA"/>
```

If you are familliar with git, you can follow along with this repository [CameraXTutorial](https://github.com/RaphaelNdonga/CameraXTutorial)

### 2. The Camera Preview
This is the screen that displays what the camera sees.
Replace the `TextView` with a `PreviewView` in `activity_main.xml`:
```xml
    <androidx.camera.view.PreviewView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/preview"/>
```

Your `MainActivity.kt` file should look like this, before you start:

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
    companion object {
        val TAG = "MainActivity"
    }
}
```

Add the following attribute:
```kotlin
private lateinit var cameraProviderFuture:ListenableFuture<ProcessCameraProvider>
```

`ListenableFuture` is a lightweight interface that actively listens for operations occurring outside the main thread (asynchronous operations). In this case, the operation being observed is the `ProcessCameraProvider`. This `ProcessCameraProvider` will be used to bind the lifecycle of the camera to the lifecycle of the application.

Add a cameraSelector attribute that will help to decide whether to use the front or back camera:
```kotlin
private lateinit var cameraSelector:CameraSelector
```

In the `onCreate` method, instantiate the variables:
```kotlin
cameraProviderFuture = ProcessCameraProvider.getInstance(this)
cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA
```

In the `MainActivity.kt`, create a `startCamera()` function that you will call in the `onCreate` method.
In this function, you will listen for the data from the camera.
You will then connect the `Preview` use case to the preview in the xml file you created.

> **NOTE** : A *use case* is a way developers can access camera features.

After that, reinitialize the camera provider, before you attach the use case.
```kotlin
private fun startCamera(){
    //listening for data from the camera
    cameraProviderFuture.addListener({
        val cameraProvider = cameraProviderFuture.get()
        //connecting a preview use case to the preview in the xml file.
        val preview = Preview.Builder().build().also{
            it.setSurfaceProvider(binding.preview.surfaceProvider)
        }
        try{
            //clear all the previous use cases first.
            cameraProvider.unbindAll()
            //binding the lifecycle of the camera to the lifecycle of the application.
            cameraProvider.bindToLifecycle(this,cameraSelector,preview)
        } catch (e: Exception) {
                Log.d(TAG, "Use case binding failed")
        }
        
    },ContextCompat.getMainExecutor(this))
}

```

`ContextCompat.getMainExecutor(this)` is used to run the asynchronous operation that is being listened for by the `cameraProviderFuture`. Its context is within the application.

`onCreate`:
```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        ...
        startCamera()
        ...
    }
```

Run your app. It looks like you have a blocked camera. Why? Well, for starters, the camera permissions have not been granted

So how do you ask the user for permission to use the camera? Add the following attribute above `onCreate`:
```kotlin
private val cameraProviderResult = registerForActivityResult(ActivityResultContracts.RequestPermission()){ permissionGranted->
        if(permissionGranted){
            //cut and paste the previous startCamera() call here.
            startCamera()
        }else{
            Snackbar.make(binding.root,"The camera permission is necessary", Snackbar.LENGTH_INDEFINITE).show()
        }
    }
```
`registerForActivityResult` is android's new API that obtains data from outside the application. It prevents the scenario whereby the app's process is killed before it can obtain the result from the other application.
For more on ActivityResult APIs, refer to the documentation: [Getting a Result from an Activity](https://developer.android.com/training/basics/intents/result)

In `onCreate` execute the contract:
```kotlin
cameraProviderResult.launch(android.Manifest.permission.CAMERA)
```

Run your app. It should prompt you to allow the camera permission. After allowing, the camera becomes visible through the screen in your application.

### 3. Image Capture and Storage
In `activity_main.xml` create a button that will be used to take photos:
```xml
    <Button
        android:id="@+id/img_capture_btn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:text="Take a photo"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"/>
```

Create the following attributes:
```kotlin
private var imageCapture:ImageCapture? = null
private lateinit var imgCaptureExecutor:ExecutorService
```

`imageCapture` is an `ImageCapture` which is a use case just like the `Preview` use case.
Its used for capturing images. 
`imgCaptureExecutor` is an `ExecutorService` which is an interface that extends `Executor`. Its work is to provide a thread that will be used for capturing an image.

Instantiate `imgCaptureExecutor` in the `onCreate` method:
```kotlin
    imgCaptureExecutor = Executors.newSingleThreadExecutor()
```

Instantiate imageCapture in `startCamera()` method and include it when binding the cameraProvider to the lifecycle:
```kotlin
private fun startCamera(){
    ...
    cameraProviderFuture.addListener({
        ...
        imageCapture = ImageCapture.Builder().build()

        try{
            ...
            cameraProvider.bindToLifecycle(this,cameraSelector,preview,imageCapture)
        }....
    )ContextCompat.getMainExecutor(this)}
}
```



Create a `takePhoto()` method that is called only when the `imgCaptureBtn` is clicked:
```kotlin
private fun takePhoto(){
    imageCapture?.let{
        //Create a storage location whose fileName is timestamped in milliseconds.
        val fileName = "JPEG_${System.currentTimeMillis()}"
        val file = File(externalMediaDirs[0],fileName)

        // Save the image in the above file
        val outputFileOptions = ImageCapture.OutputFileOptions.Builder(file).build()

        //pass in the details of where and how the image is taken.(arguments 1 and 2 of takePicture)
        //pass in the details of what to do after an image is taken.(argument 3 of takePicture)
        it.takePicture(
            outputFileOptions,
            imgCaptureExecutor,
            object : ImageCapture.OnImageSavedCallback {
                    override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults){
                        Log.i(TAG,"The image has been saved in ${file.toUri()}")
                    }

                    override fun onError(exception: ImageCaptureException) {
                        Toast.makeText(
                            binding.root.context,
                            "Error taking photo",
                            Toast.LENGTH_LONG
                        ).show()
                        Log.d(TAG, "Error taking photo:$exception")
                    }

            })
    }
}
```

Next, create an `animateFlash()` function that animates a screen flash when an image is taken:
```kotlin
    @RequiresApi(Build.VERSION_CODES.M)
    private fun animateFlash() {
        binding.root.postDelayed({
            binding.root.foreground = ColorDrawable(Color.WHITE)
            binding.root.postDelayed({
                binding.root.foreground = null
            }, 50)
        }, 100)
    }
```
The foreground changes to white after a delay of 100 milliseconds. It then goes back to normal after a delay of 50 milliseconds.
This feature of changing the foreground properties is only available for Android M devices going up.

Trigger these method in `imgCaptureBtn` onClickListener in `onCreate` method:
```kotlin
    binding.imgCaptureBtn.setOnClickListener{
        takePhoto()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                animateFlash()
        }
    }
```

Run your app. Take a photo. Open the logCat. Search `MainActivity`. You will see the location whereby the image has been saved. 

### 4. Switch Camera
To switch the camera, either from front to back or from back to front, do the following:

Create a switch button in `activity_main.xml`:
```xml
    <Button
        android:id="@+id/switch_btn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:text="Switch"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@id/img_capture_btn"
        app:layout_constraintStart_toStartOf="parent" />
```

In `MainActivity.kt`'s `onCreate` method, setup the button's onClickListener:
```kotlin
        binding.switchBtn.setOnClickListener {
            //change the cameraSelector
            cameraSelector = if(cameraSelector == CameraSelector.DEFAULT_BACK_CAMERA){
                CameraSelector.DEFAULT_FRONT_CAMERA
            }else{
                CameraSelector.DEFAULT_BACK_CAMERA
            }
            // restart the camera
            startCamera()
        }
```

Run your app. Switch the cameras.

### 5. Local Gallery
To view the photos, you want to create a scrollable screen that displays the images. This will be achieved using a recycler view adapter attached to a view pager.

Add the following dependency to build.gradle(app):
```gradle
    //Glide library for image management and loading.
    implementation 'com.github.bumptech.glide:glide:4.12.0'
```
Add another button in `activity_main.xml` for navigating to a new activity:
```xml
    <Button
        android:id="@+id/gallery_btn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:text="Gallery"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@id/img_capture_btn" />
```
Next, go to `File` -> `New` -> `Activity` -> `EmptyActivity` and create a `GalleryActivity`

Go back to `MainActivity.kt` and set the click listener for the gallery button, in `onCreate`:
```kotlin
    binding.galleryBtn.setOnClickListener {
        val intent = Intent(this, GalleryActivity::class.java)
        startActivity(intent)
    }
```
Run your app. Clicking the gallery button should navigate to a new activity.

Change `GalleryActivity.kt` to use viewBinding:
```kotlin
    class GalleryActivity : AppCompatActivity() {
        private lateinit var binding:ActivityGalleryBinding
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            binding = ActivityGalleryBinding.inflate(layoutInflater)
            setContentView(binding.root)
        }
    }
```
Create the view pager in `activity_gallery.xml`, inside the constraint layout:
```xml
    <androidx.viewpager2.widget.ViewPager2
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:id="@+id/view_pager"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"/>
```
Create a new layout resource file `list_item_img.xml` that will contain an image view:
```xml
    <ImageView xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        tools:src="@tools:sample/backgrounds/scenic"
        android:id="@+id/local_img"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>
```
Create a new kotlin class `GalleryAdapter`. This adapter will take a list of files in its constructor. This list of files will be used by glide and the recycler view to render images to the imageviews:
```kotlin
class GalleryAdapter(private val fileArray: Array<File>) :
    RecyclerView.Adapter<GalleryAdapter.ViewHolder>() {
    class ViewHolder(private val binding: ListItemImgBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(file: File) {
            Glide.with(binding.root).load(file).into(binding.localImg)
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        return ViewHolder(ListItemImgBinding.inflate(layoutInflater, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(fileArray[position])
    }

    override fun getItemCount(): Int {
        return fileArray.size
    }
}
```

For a more detailed explanation of how to use the view pager and recycler view, refer to the following article: [ViewPager2 Tutorial](https://www.section.io/engineering-education/android-viewpager2/)

Finally, in `GalleryActivity.kt`, do the following:
1. Supply the list of files to the adapter.
2. Attach the adapter to the viewpager.

```kotlin
        val directory = File(externalMediaDirs[0].absolutePath)
        val files = directory.listFiles() as Array<File>

        //array is reversed to ensure last taken photo appears first.
        val adapter = GalleryAdapter(files.reversedArray())
        binding.viewPager.adapter = adapter
```

Run your app. Take a photo. Go to the gallery and view your photos. Voila!

### 6. Conclusion
You started creating this camera application from *scratch*. Look what you have now. A complete camera and gallery application. CameraX api makes it extremely easy to integrate powerful camera features within applications. Hopefully this article will allow you to do the same to your future applications.
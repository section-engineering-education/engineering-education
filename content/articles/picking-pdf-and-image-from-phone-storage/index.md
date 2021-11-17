This tutorial is going to cover on how to open gallery and files apps from your android application and pick an image and a PDF file. You will learn about intents specifically implicit intents. 
There has been a challenge of choosing files from the phone storage since the contents available on the internet are ambiguous. This tutorial is going to simplify your work. 

### Table of Contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [What is Intents](#what-is-intents)
- [Types of Intents](#types-of-intents)
- [Adding Permissions](#adding-permissions)
- [Designing Layout](#designing-layout)
- [Picking Image](#picking-image)
- [Picking PDF file](#picking-pdf-file)
- [Coclusion](#conclusion)

### Prerequisites
Understanding this tutorial requires that you have: 
- [Android Studio IDE](https://developer.android.com/studio/index.html) installed.
- Basic understanding of [Kotlin](https://kotlinlang.org/) programming language. 
- Basic understanding of [Intents](https://developer.android.com/guide/components/intents-filters).

### Goals
- Picking images from gallery and loading to `ImageView`.
- Taking photos and loading to `ImageView`.
- Picking PDF file and display in a `TextView`. 

File choosing in Android involves implicit intents. Implicit intent is a type of intent that navigates the user to another application. For File choosing to be successful, certain permissions MUST  be allowed in the app manifest.

### What is Intents
Is an object that facilitates communication between app components. Intents are used in cases when an application wants to start an activity, start a service, or when delivering a broadcast.

### Types of Intents
Intents consist of two types:

#### Implicit intents
Is a type of intent that facilitates communication between two different apps. For instance, in this tutorial, we are going to imply implicit intent to communicate with the gallery and files apps. Implicit intents only need the declaration of the general action to be performed.

#### Explicit intents
Is a type of intent that allows communication within an application itself. For example, when you want to navigate from one activity to the next, you will trigger an explicit intent. 

Enough of theory let's dive into implementation.

### Adding Permissions
Permissions are always added to the `AndroidManifest.xml`. In the manifest add the following permission.
```xml
 <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
 ```

### Designing Layout
The layout will only include a `TextView`, for displaying the selected PDF file, and an `ImageView` for displaying the image selected gallery or camera captured image. Remember to use `ConstraintLayout` to come up with the design.

The simple layout can be implemented by including the XML code below:
```xml
    <ImageView
        android:id="@+id/imageView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageTextView"
        tools:srcCompat="@tools:sample/avatars" />

    <TextView
        android:id="@+id/imageTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="48dp"
        android:text="Click To Select Image from Storage"
        android:textColor="#03A9F4"
        android:textSize="22sp"
        android:textStyle="bold"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/selectedPdf"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="248dp"
        android:layout_marginEnd="16dp"
        android:padding="20dp"
        android:text="Click To Pick PDF From Storage"
        android:textColor="#0798DA"
        android:textSize="22sp"
        android:textStyle="bold"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageView" />
```
### Picking Image
To open the phone's gallery you need an intent to handle the action. You will click on the `TextView` that will pop up an alert dialog having options to take a photo or choose an image from the gallery. You will also learn how to trigger alert dialogs in this tutorial. 

Add the following function to your code to display the alert dialog for selecting an image from the gallery or taking a photo.

```kotlin
    private fun selectImage() {
        val choice = arrayOf<CharSequence>("Take Photo", "Choose from Gallery", "Cancel")
        val myAlertDialog: AlertDialog.Builder = AlertDialog.Builder(this)
        myAlertDialog.setTitle("Select Image")
        myAlertDialog.setItems(choice, DialogInterface.OnClickListener { dialog, item ->
            when {
                choice[item] == "Choose from Gallery" -> {
                    val pickFromGallery = Intent(Intent.ACTION_GET_CONTENT, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
                    pickFromGallery.type = "/image"
                    startActivityForResult(pickFromGallery, 1)
                }
                choice[item] == "Take Photo" -> {
                    val cameraPicture = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                    startActivityForResult(cameraPicture, 0)
                }
                choice[item] == "Cancel" -> {
                    myAlertDialog.dismiss()
                }
            }
        })
        myAlertDialog.show()
    }
```
Below is a screenshot of the alert dialog.

[Alert Dialog](/engineering-education/picking-pdf-and-image-from-phone-storage/alert-dialog.png)

When you want only the images in your gallery to be displayed, you include the type of intent to be images but if you want to display videos as well do not specify the type. 
You can specify the type by including this:

```kotlin
pickFromGallery.type = "/image"
```
The difference between selecting an image from a gallery and taking a camera comes in the type of action passed in the intent. For the gallery, consider using `Intent.ACTION_GET_CONTENT` while for the camera you can use `MediaStore.ACTION_IMAGE_CAPTURE`.

### Picking PDF file
You will learn how to pick a PDF from files and display it on the `TextView`. Picking PDF files comes in handy when you are developing an application that requires the user to select a PDF file and upload or share it with other users. Include the method below in your code to allow you to pick a PDF from files.

```kotlin
    private fun selectPdf() {
        val pdfIntent = Intent(Intent.ACTION_GET_CONTENT)
        pdfIntent.type = "application/pdf"
        pdfIntent.addCategory(Intent.CATEGORY_OPENABLE)
        startActivityForResult(pdfIntent, 12)
    }
```

After implementing the intents, you will need the override the `onActivityResult` method as follows:

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        // For loading Image
        if (resultCode != RESULT_CANCELED) {
            when (requestCode) {
                0 -> if (resultCode == RESULT_OK && data != null) {
                    val imageSelected = data.extras!!["data"] as Bitmap?
                    imageView.setImageBitmap(imageSelected)
                }
                1 -> if (resultCode == RESULT_OK && data != null) {
                    val imageSelected = data.data
                    val pathColumn = arrayOf(MediaStore.Images.Media.DATA)
                    if (imageSelected != null) {
                        val myCursor = contentResolver.query(
                            imageSelected,
                            pathColumn, null, null, null
                        )
                        if (myCursor != null) {
                            myCursor.moveToFirst()
                            val columnIndex = myCursor.getColumnIndex(pathColumn[0])
                            val picturePath = myCursor.getString(columnIndex)
                            imageView.setImageBitmap(BitmapFactory.decodeFile(picturePath))
                            myCursor.close()
                        }
                    }
                }
            }
        }

        // For loading PDF
        when (requestCode) {
            12 -> if (resultCode == RESULT_OK) {

                pdfUri = data?.data!!
                val uri: Uri = data?.data!!
                val uriString: String = uri.toString()
                var pdfName: String? = null
                if (uriString.startsWith("content://")) {
                    var myCursor: Cursor? = null
                    try {
                        myCursor = applicationContext!!.contentResolver.query(uri, null, null, null, null)
                        if (myCursor != null && myCursor.moveToFirst()) {
                            pdfName = myCursor.getString(myCursor.getColumnIndex(OpenableColumns.DISPLAY_NAME))
                            pdfTextView.text = pdfName
                        }
                    } finally {
                        myCursor?.close()
                    }
                }
            }
        }
    }
```
The complete code implementation is as follows,

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var pickImageTV: TextView
    private lateinit var imageView: ImageView
    private lateinit var pdfTextView: TextView
    private lateinit var pdfUri: Uri

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        pickImageTV = findViewById(R.id.imageTextView)
        imageView = findViewById(R.id.imageView)
        pdfTextView = findViewById(R.id.selectedPdf)

        pickImageTV.setOnClickListener {
            selectImage()
        }
        imageView.setOnClickListener {
            selectPdf()
        }
        pdfTextView.setOnClickListener {
            selectPdf()
        }
    }

    private fun selectImage() {
        val choice = arrayOf<CharSequence>("Take Photo", "Choose from Gallery", "Cancel")
        val myAlertDialog: AlertDialog.Builder = AlertDialog.Builder(this)
        myAlertDialog.setTitle("Select Image")
        myAlertDialog.setItems(choice, DialogInterface.OnClickListener { dialog, item ->
            when {
                choice[item] == "Choose from Gallery" -> {
                    val pickFromGallery = Intent(Intent.ACTION_GET_CONTENT, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
                    pickFromGallery.type = "/image"
                    startActivityForResult(pickFromGallery, 1)
                }
                choice[item] == "Take Photo" -> {
                    val cameraPicture = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                    startActivityForResult(cameraPicture, 0)
                }
                choice[item] == "Cancel" -> {
                    myAlertDialog.dismiss()
                }
            }
        })
        myAlertDialog.show()
    }

    private fun selectPdf() {
        val pdfIntent = Intent(Intent.ACTION_GET_CONTENT)
        pdfIntent.type = "application/pdf"
        pdfIntent.addCategory(Intent.CATEGORY_OPENABLE)
        startActivityForResult(pdfIntent, 12)
    }

    @SuppressLint("Range")
   override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        // For loading Image
        if (resultCode != RESULT_CANCELED) {
            when (requestCode) {
                0 -> if (resultCode == RESULT_OK && data != null) {
                    val imageSelected = data.extras!!["data"] as Bitmap?
                    imageView.setImageBitmap(imageSelected)
                }
                1 -> if (resultCode == RESULT_OK && data != null) {
                    val imageSelected = data.data
                    val pathColumn = arrayOf(MediaStore.Images.Media.DATA)
                    if (imageSelected != null) {
                        val myCursor = contentResolver.query(
                            imageSelected,
                            pathColumn, null, null, null
                        )
                        if (myCursor != null) {
                            myCursor.moveToFirst()
                            val columnIndex = myCursor.getColumnIndex(pathColumn[0])
                            val picturePath = myCursor.getString(columnIndex)
                            imageView.setImageBitmap(BitmapFactory.decodeFile(picturePath))
                            myCursor.close()
                        }
                    }
                }
            }
        }

        // For loading PDF
        when (requestCode) {
            12 -> if (resultCode == RESULT_OK) {

                pdfUri = data?.data!!
                val uri: Uri = data?.data!!
                val uriString: String = uri.toString()
                var pdfName: String? = null
                if (uriString.startsWith("content://")) {
                    var myCursor: Cursor? = null
                    try {
                        myCursor = applicationContext!!.contentResolver.query(uri, null, null, null, null)
                        if (myCursor != null && myCursor.moveToFirst()) {
                            pdfName = myCursor.getString(myCursor.getColumnIndex(OpenableColumns.DISPLAY_NAME))
                            pdfTextView.text = pdfName
                        }
                    } finally {
                        myCursor?.close()
                    }
                }
            }
        }
    }
```
[Screenshot](!/engineering-education/picking-pdf-and-image-from-phone-storage/screenshot.png)

### Coclusion
This tutorial is only meant to guide you through. You need to try the codes provided to practice and master the concept. 

Happy codding!!!.

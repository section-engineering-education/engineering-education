---
layout: engineering-education
status: publish
published: true
url: /picking-pdf-and-image-from-phone-storage/
title: How to Pick PDF Files and Images from Phone Storage in Android using Kotlin
description: In this tutorial, we will learn how to pick PDF files and images from phone storage in Android using implicit intents
author: hepatrique-okeyo
date: 2021-12-12T00:00:00-10:45
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/picking-pdf-and-image-from-phone-storage/hero.png
    alt: PDF Files and Images from Phone Storage in Android Using Kotlin
---
This tutorial will cover how to open gallery and files apps from your android application and pick an image and a PDF file. 
<!--more-->
In addition, you will learn about intents and specifically implicit intents.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [What is Intents](#what-is-intents)
- [Types of Intents](#types-of-intents)
  - [Implicit intents](#implicit-intents)
  - [Explicit intents](#explicit-intents)
- [Adding Permissions](#adding-permissions)
- [Designing Layout](#designing-layout)
- [Picking Image](#picking-image)
- [Picking PDF file](#picking-pdf-file)
- [Conclusion](#conclusion)

### Prerequisites
Understanding this tutorial will require that you have: 
- [Android Studio IDE](https://developer.android.com/studio/index.html) installed.
- Basic understanding of [Kotlin](https://kotlinlang.org/) programming language.
- Basic understanding of [Intents](https://developer.android.com/guide/components/intents-filters).

### Goals
- Picking images from the gallery and loading them to `ImageView`.
- Taking photos and loading to `ImageView`.
- Picking PDF file and display in a `TextView`. 

File choosing in Android involves implicit intents. Implicit intent is a type of intent that navigates the user to another application. For File choosing to be successful, certain permissions MUST be allowed in the app manifest.

### What are intents
An intent is an object that facilitates communication between app components. For example, intents are used when an application starts an activity, starts a service, or delivers a broadcast.

### Types of intents
Intents consist of two types:

#### Implicit intents
Implicit intent is a type of intent that facilitates communication between two different apps. For instance, in this tutorial, we will imply implicit intent to communicate with the gallery and files apps. Implicit intents only need the declaration of the general action to be performed.

#### Explicit intents
An explicit intent is a type of intent that allows communication between application components. For example, you will trigger an explicit intent when you want to navigate one activity to the next. Enough of the theory let's dive into implementation.

### Adding permissions
Permissions are always added to the `AndroidManifest.xml`. In the manifest add the following permission.

```xml
 <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```

### Designing layout
The layout will only include a `TextView` for displaying the selected PDF file and an `ImageView` for displaying the chosen image gallery or camera captured image. Remember to use the `ConstraintLayout` to come up with the design.

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
### Picking an image
To open the phone's gallery you need an intent to handle the action. You will click on the `TextView` that will pop up an alert dialog having options to take a photo or choose an image from the gallery. You will also learn how to trigger alert dialogs in this tutorial.

Add the following function to your code to display the alert dialog when selecting an image from the gallery or taking a photo.

```kotlin
    // Function for displaying an AlertDialogue for choosing an image
    private fun selectImage() {
        val choice = arrayOf<CharSequence>("Take Photo", "Choose from Gallery", "Cancel")
        val myAlertDialog: AlertDialog.Builder = AlertDialog.Builder(this)
        myAlertDialog.setTitle("Select Image")
        myAlertDialog.setItems(choice, DialogInterface.OnClickListener { dialog, item ->
            when {
                // Select "Choose from Gallery" to pick image from gallery
                choice[item] == "Choose from Gallery" -> {
                    val pickFromGallery = Intent(Intent.ACTION_GET_CONTENT, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
                    pickFromGallery.type = "/image"
                    startActivityForResult(pickFromGallery, 1)
                }
                // Select "Take Photo" to take a photo
                choice[item] == "Take Photo" -> {
                    val cameraPicture = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                    startActivityForResult(cameraPicture, 0)
                }
                // Select "Cancel" to cancel the task
                choice[item] == "Cancel" -> {
                    myAlertDialog.dismiss()
                }
            }
        })
        myAlertDialog.show()
    }
```

Below is a screenshot of the alert dialog.

![Alert Dialog](/engineering-education/picking-pdf-and-image-from-phone-storage/alert-dialog.png)

>Note: When you want only the images in your gallery to be displayed, you include the intent to be images, but if you want to display videos, do not specify the type. You can specify the type by including the code below in your intent:

```kotlin
pickFromGallery.type = "/image"
```

The difference between selecting an image from a gallery and taking a picture via your camera comes in the type of action passed in the intent. For the gallery, consider using `Intent.ACTION_GET_CONTENT`, while you can use `MediaStore.ACTION_IMAGE_CAPTURE` for the camera.

### Picking PDF file
You will learn how to pick a PDF from your files and display it on the `TextView`. Picking PDF files comes in handy when developing an application that requires the user to select a PDF file and upload or share it with other users. Include the method below in your code to pick a PDF from files.

```kotlin
    // Intent for navigating to the files
    private fun selectPdf() {
        val pdfIntent = Intent(Intent.ACTION_GET_CONTENT)
        pdfIntent.type = "application/pdf"
        pdfIntent.addCategory(Intent.CATEGORY_OPENABLE)
        startActivityForResult(pdfIntent, 12)
    }
```

After implementing the intents, you will need the override the `onActivityResult` method as follows:

```kotlin
// Override this method to allow you select an an image or a PDF
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
                        // Setting the image to the ImageView
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
                    // Setting the PDF to the TextView
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

The complete code implementation is as follows:

```kotlin
class MainActivity : AppCompatActivity() {

    // Initializing the layout views
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

        // Setting click listener to the image TextView
        pickImageTV.setOnClickListener {
            selectImage()
        }

        // Setting click listener to the ImageView
        imageView.setOnClickListener {
            selectPdf()
        }

       // Setting click listener to the PDF TextView
        pdfTextView.setOnClickListener {
            selectPdf()
        }
    }

    private fun selectImage() {
    // Creating AlertDialog
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
    // Intent for openning files
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

![Screenshot](/engineering-education/picking-pdf-and-image-from-phone-storage/screenshot.png)

### Conclusion
This tutorial is only meant to guide you through the intial steps. First, you will need to try the codes provided to practice and master the concept. [Intents](https://developer.android.com/guide/components/intents-filters) have various uses in Android development and should be well understood.

Happy coding!

---
Peer Review Contributions by: [Okelo Violet](/engineering-education/authors/okelo-violet/)

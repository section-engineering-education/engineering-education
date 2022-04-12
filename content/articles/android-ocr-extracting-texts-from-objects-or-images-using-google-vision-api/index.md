### Android OCR, extracting texts from objects or images using Google Vision API

The term OCR is an abbreviation for optical character recognition, which is a text recognition system that works on computer-generated images. One of the typical use cases of OCR is text recognition in scanned paper articles and photographs.


Characters embedded in digital photographs can be detected and recognized using an OCR tool. Some OCR applications typically export the text, whereas others alter the characters into editable text content inside the image itself. OCR software that is more complex may generate text size, formatting, and even page layout based on its appearance.


By importing the Google Vision API Library into Android Studio and applying it to extract texts from photographs, we'll learn how to use Google Vision API to construct OCR in Android.


### Prerequisites

To get begin, you'll need to do the following:

- Extensive knowledge of Android programming (Java).

- Understand the principles of Android UI design.

- Make sure you have the Android Studio IDE installed on your computer.


#### Goals

- To comprehend how to use OCR in Android.

- Putting in place necessary dependencies

- Making use of the device's external storage to save images and extracted text.

- Designing the project's XML camera UI for taking photos and selecting images from the gallery.

- Using image cropper in adjusting the size of images.


### Implementation

I've divided the actual coding into five major steps.

### Step 1 - Starting a New Studio Project.

- Launch your Android Studio.

- Create new Studio project by going to `File > New > New Project` from the menu.

- In the `New Project` window, pick `Empty Activity` and hit Next.

- Configure your project and click Finish

### Step 2 - Adding Required Gradle Dependencies.

- Include the gradle dependencies listed below in your app level build.gradle file of your project and hit sync.


```java
    implementation 'com.theartofdev.edmodo:android-image-cropper:2.8.0'
    implementation 'com.google.android.gms:play-services-vision:20.1.3'

```


### Step 3 - Setting Up Required Android Manifest Rermissions.

- Define AndroidManifest permissions for accessing camera and external storage by adding the following lines


```java
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

```

- Add the following line of code to tell the app to install the image cropper AndroidManifest automatically


```java
    <activity android:name="com.theartofdev.edmodo.cropper.CropImageActivity" />

```


### Step 4 - Theme and styling

Navigate to `res > values` and remove the `themes` directory before applying the following customized theme to your application.

After removing the directory, right-click on the values directory to create a new style, i.e. `values > new > Values Resource File`, name it `styles.xml`, and paste the following code.

```xml
    <resources>
    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">#1F96E4</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

    </resources>

```

Open the `colors.xml` file in the same `values` directory and paste the code below.
```xml
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
        <color name="purple_200">#FFBB86FC</color>
        <color name="purple_500">#FF6200EE</color>
        <color name="purple_700">#FF3700B3</color>
        <color name="teal_200">#FF03DAC5</color>
        <color name="teal_700">#FF018786</color>
        <color name="black">#FF000000</color>
        <color name="white">#FFFFFFFF</color>

        <color name="colorPrimary">#1F96E4</color>
        <color name="gray">#808080</color>
        <color name="colorPrimaryDark">#028BF8</color>
        <color name="colorAccent">#9F9C00</color>
    </resources>
```

Inside the drawable directory, create a vector resource asset by right clicking on `drawable > New > Vector Asset` click on `Clip Art` and look for camera icon. name `it ic_action_image` hit `Next` and `Finish`.

Now, in the same drawable directory, create and add the following xml files;
- `edit_textbg.xml`

    ```xml
        <?xml version="1.0" encoding="utf-8"?>
        <!--  res/drawable/rounded_edittext.xml -->
        <shape xmlns:android="http://schemas.android.com/apk/res/android"
            android:shape="rectangle"
            android:padding="10dp">
            <solid android:color="#ffffff" />
            <corners
                android:radius="10dp"/>
            <stroke
                android:width="3dp"
                android:color="@color/teal_200" />
        </shape>
    ```

- `button_backgorund.xml`

    ```xml
        <?xml version="1.0" encoding="utf-8"?>
        <shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle" >
            <corners
                android:radius="14dp"
                />
            <gradient
                android:angle="45"
                android:centerX="35%"
                android:centerColor="#EDED00"
                android:startColor="#3838E8"
                android:endColor="#2B1ABD"
                android:type="linear"
                />
            <padding
                android:left="0dp"
                android:top="0dp"
                android:right="0dp"
                android:bottom="0dp"
                />
            <size
                android:width="151dp"
                android:height="42dp"
                />
            <stroke
                android:width="3dp"
                android:color="#878787"
                />
        </shape>
    ```

- `roundcorner.xml`

    ```xml
        <?xml version="1.0" encoding="utf-8"?>
        <shape xmlns:android="http://schemas.android.com/apk/res/android"
            android:shape="oval" >
            <gradient
                android:startColor="#EDED00"
                android:endColor="#3838E8"
                android:angle="270" />
        </shape>
    ```


### Step 5 - Implementing OCR in Application.

To start creating your project User Interface(UI), navigate to `res > layout` and edit or create other XML layout files

#### Creating The XML User Interface

To design the graphical user interface for the application, here is the XML code. You can copy and paste it on your `activity_main.xml` file.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center_horizontal"
        tools:context=".MainActivity"
        android:background="@color/colorPrimaryDark">

        <LinearLayout
            android:id="@+id/layout"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:paddingTop="5dp"
            android:gravity="center"
            android:orientation="vertical">

            <ImageButton
                android:id="@+id/Image_selector"
                android:layout_width="60dp"
                android:layout_height="60dp"
                android:background="@drawable/roundcorner"
                android:src="@drawable/ic_action_image" />

            <TextView
                android:id="@+id/txtImg"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Select The Image"
                android:textStyle="bold|italic" />

        </LinearLayout>

        <ScrollView
            android:layout_below="@+id/layout"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">
                <androidx.cardview.widget.CardView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    app:cardBackgroundColor="#FFF"
                    app:cardUseCompatPadding="true"
                    app:cardCornerRadius="3dp"
                    app:cardElevation="3dp"
                    >
                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="vertical"
                        android:padding="5dp">
                        <TextView
                            android:text="Display of the upoaded image"
                            android:textColor="@color/colorAccent"
                            android:layout_width="match_parent"
                            android:textStyle="italic"
                            android:layout_height="wrap_content"/>
                        <ImageView
                            android:id="@+id/image_view_section"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:maxHeight="100dp"/>
                    </LinearLayout>
                </androidx.cardview.widget.CardView>
                <androidx.cardview.widget.CardView
                    android:layout_width="match_parent"
                    android:layout_marginTop="15dp"
                    android:layout_height="wrap_content"
                    app:cardBackgroundColor="#FFF"
                    app:cardUseCompatPadding="true"
                    app:cardCornerRadius="3dp"
                    app:cardElevation="3dp">
                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="vertical"
                        android:padding="5dp">
                        <TextView
                            android:text="Detected text"
                            android:textStyle="italic"
                            android:textColor="@color/colorAccent"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            />

                        <EditText
                            android:id="@+id/result_edit_text"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:autoLink="all"
                            android:background="@drawable/edit_textbg"
                            android:minHeight="48dp"
                            android:padding="5dp"
                            android:textColor="#000" />
                    </LinearLayout>
                </androidx.cardview.widget.CardView>
                <Button
                    android:id="@+id/content_save_button"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="Save text"
                    android:textAllCaps="false"
                    android:textAlignment="center"
                    android:textStyle="italic"
                    android:background="@drawable/button_backgorund"
                    android:textColor="@android:color/background_dark"
                    android:layout_marginBottom="5dp"
                    android:layout_gravity="center"
                    android:textSize="15dp"/>
            </LinearLayout>
        </ScrollView>
    </RelativeLayout>

```

Your final output should be something similar to this
![OCR Interface](/engineering-education/android-ocr-extracting-texts-from-objects-or-images-using-google-vision-api/interface.jpg)


#### Java Code Implementation.

In this step, navigate to the java section and open `MainActivity.java` file.

##### Declaring and Initializing of Variables.

To begin, we must declare and initialize a few variables. In the code snippet below, the variables with the static keyword imply they cannot be altered throughout the program hence they shall remain the same for every instance of the class we will be using them.


```java
    public class MainActivity extends AppCompatActivity {
    EditText myResult;
    ImageView myPreview;
    ImageButton imageSelector1;
    TextView imageSelector2;
    Button mySaveButton;
    String myText;

    private static final int CAMERA_REQ_CODE = 1555;
    private static final int STORAGE_REQ_CODE = 1600;
    private static final int IMAGE_SELECT_GAL_CODE = 2000;
    private static final int IMAGE_SELECT_CAM_CODE = 2001;
    private static final int EXTERNAL_STORAGE_WRITE_CODE = 101;

    String permissionCamera[];
    String permissionStorage[];

    Uri img_uri;
```

Inside the OnCreate method, initialize your variables by finding them by their ids and creating new `String[]` instances of Manifest storage and camera permissions.


```java
 @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        myResult = findViewById(R.id.result_edit_text);
        myPreview = findViewById(R.id.image_view_section);
        imageSelector1 = findViewById(R.id.Image_selector);
        imageSelector2 = findViewById(R.id.txtImg);
        mySaveButton = findViewById(R.id.content_save_button);

        permissionCamera = new String[]{Manifest.permission.CAMERA,
                Manifest.permission.WRITE_EXTERNAL_STORAGE};
        permissionStorage = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE};

```

##### Selecting or Capturing Images

Create a method that initiates the image selection dialog where we are given the options to choose between picking an image from the gallery or pointing our camera to an object whenever we click on the camera icon on the interface.

Once the method has been created, invoke that method inside the onclickedListener of the image selector and also the textView below the selector.

```java
    imageSelector1.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            showImageSelectorDialog();
        }
    });
    imageSelector2.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            showImageSelectorDialog();
        }
    });

    private void showImageSelectorDialog() {
    String[] myItems = {" Camera ", " Gallery "};
    AlertDialog.Builder dialog = new AlertDialog.Builder(this);
    dialog.setTitle("Select an image using: ");
    dialog.setItems(myItems, new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int indexPosition) {
            if (indexPosition == 0) {
                if (!checkCameraPermissions()) {

                    requestCameraPermissions();

                } else {
                    selectCamera();
                }
            }
            if (indexPosition == 1) {
                if (!checkStoragePermissions()) {

                    requestStoragePermissions();
                } else {

                    selectGallery();
                }
            }
        }
    });
    dialog.create().show();
}

```

The method is executed when `Camera` is selected.

```java
    private void selectCamera() {
        ContentValues values = new ContentValues();
        values.put(MediaStore.Images.Media.TITLE, "New Image");
        values.put(MediaStore.Images.Media.DESCRIPTION, "Convert image to text");
        img_uri = getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);

        Intent camera = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        camera.putExtra(MediaStore.EXTRA_OUTPUT, img_uri);
        startActivityForResult(camera, IMAGE_SELECT_CAM_CODE);
    }

```

The method is executed when `Gallery` is selected.


```java
    private void selectGallery() {
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType("image/*");
        startActivityForResult(intent, IMAGE_SELECT_GAL_CODE);
    }

```

The selection looks like this;
![Image selector](/engineering-education/android-ocr-extracting-texts-from-objects-or-images-using-google-vision-api/selection.jpg)

##### Managing Permissions

To check and request the application to access the camera and external storage, add the following lines of code.

```java
   private void requestStoragePermissions() {
        ActivityCompat.requestPermissions(this, permissionStorage, STORAGE_REQ_CODE);
    }

    private boolean checkStoragePermissions() {
        boolean mResult = ContextCompat.checkSelfPermission(getApplicationContext(),
                Manifest.permission.WRITE_EXTERNAL_STORAGE) == (PackageManager.PERMISSION_GRANTED);
        return mResult;
    }

    private void requestCameraPermissions() {
        ActivityCompat.requestPermissions(this, permissionCamera, CAMERA_REQ_CODE);
    }

    private boolean checkCameraPermissions() {
        boolean mResult = ContextCompat.checkSelfPermission(getApplicationContext(),
                Manifest.permission.CAMERA) == (PackageManager.PERMISSION_GRANTED);
        boolean mResult1 = ContextCompat.checkSelfPermission(getApplicationContext(),
                Manifest.permission.WRITE_EXTERNAL_STORAGE) == (PackageManager.PERMISSION_GRANTED);
        return mResult && mResult1;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {

            case CAMERA_REQ_CODE:
                if (grantResults.length > 0) {
                    boolean cameraRequestAccepted = grantResults[0] ==
                            PackageManager.PERMISSION_GRANTED;
                    boolean writeStorageRequestAccepted = grantResults[0] ==
                            PackageManager.PERMISSION_GRANTED;
                    if (cameraRequestAccepted && writeStorageRequestAccepted) {
                        selectCamera();
                    } else {
                        Toast.makeText(getApplicationContext(), "Permission denied!", Toast.LENGTH_SHORT).show();
                    }
                }
                break;

            case STORAGE_REQ_CODE:
                if (grantResults.length > 0) {
                    boolean writeStorageAccepted = grantResults[0] ==
                            PackageManager.PERMISSION_GRANTED;
                    if (writeStorageAccepted) {
                        selectGallery();
                    } else {
                        Toast.makeText(getApplicationContext(), "Permission denied!", Toast.LENGTH_SHORT).show();
                    }
                }
                break;

            case EXTERNAL_STORAGE_WRITE_CODE: {

                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    saveTextFile(myText);
                } else {
                    Toast.makeText(getApplicationContext(), "Allowing access permission is necessary", Toast.LENGTH_SHORT).show();
                }

            }
        }
    }

```

##### OCR and Image Cropper Implementation.

Now, we can write the actual image processing algorithm to initiate the optical character recognition process. The implementation will be inside the `onActivityResult` method.

```java
       @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {

        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK) {
            if (requestCode == IMAGE_SELECT_GAL_CODE) {
                CropImage.activity(data.getData())
                        .setGuidelines(CropImageView.Guidelines.ON)
                        .start(this);
            }
            if (requestCode == IMAGE_SELECT_CAM_CODE)
                CropImage.activity(img_uri)
                        .setGuidelines(CropImageView.Guidelines.ON)
                        .start(this);
        }

        if (requestCode == CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE) {
            CropImage.ActivityResult result = CropImage.getActivityResult(data);
            if (resultCode == RESULT_OK) {

                Uri resultUri = result.getUri();
                myPreview.setImageURI(resultUri);


                BitmapDrawable bDrawable = (BitmapDrawable) myPreview.getDrawable();
                Bitmap bitmap = bDrawable.getBitmap();

                TextRecognizer tRecognizer = new TextRecognizer.Builder(getApplicationContext()).build();

                if (!tRecognizer.isOperational()) {
                    Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show();
                } else {
                    Frame frame = new Frame.Builder().setBitmap(bitmap).build();
                    SparseArray<TextBlock> items = tRecognizer.detect(frame);
                    StringBuilder sBuilder = new StringBuilder();

                    for (int i = 0; i < items.size(); i++) {
                        TextBlock myItem = items.valueAt(i);
                        sBuilder.append(myItem.getValue());
                        sBuilder.append("\n");
                    }
                    myResult.setText(sBuilder.toString());
                }

            } else if (resultCode == CropImage.CROP_IMAGE_ACTIVITY_RESULT_ERROR_CODE) {
                Exception error = result.getError();
                Toast.makeText(getApplicationContext(), "" + error, Toast.LENGTH_SHORT).show();

            }

        }

    }

```

In the code snippet above:

- `Bitmap bitmap = bDrawable.getBitmap();`- Is utilized to get a bitmap from the application's resource folder. The context parameters may be required at times.

- `TextRecognizer tRecognizer = new TextRecognizer.Builder(getApplicationContext()).build();`- It builds new TextRecognizer instances.

- `tRecognizer.isOperational()`- This method is used to determine whether or not the Android device supports the Google Vision API and whether or not the play services are up to date.

- `Frame frame = new Frame.Builder().setBitmap(bitmap).build();`- To do OCR operations, set the bitmap taken to the frame.

- The TextRecognizer output is retrieved using a `SparseArray` and a `StringBuilder`. It's where you'll find the text that has been detected and recognized. Only bitmap and ImageFormat.NV21 is supported by the `SparseArray`.

- `tRecognizer.detect(frame)`- The `detect(Frame)` returns the recognition results. The OCR logic attempts to infer the layout of the text and sorts each paragraph into TextBlock instances. If text is found, at least one TextBlock instance is returned.

##### Saving the Extracted Text in your Device

To save the text processed from the digital image in your documents folder in your android device, paste the following code to the `Save text` button and call the `saveTextFile` method.


```java
    mySaveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                myText = myResult.getText().toString().trim();

                if(myText.isEmpty()){
                    Toast.makeText(getApplicationContext(), "Text not loaded, upload the image!", Toast.LENGTH_SHORT).show();
                }
                else{
                    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
                        if (checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE)
                                == PackageManager.PERMISSION_DENIED) {
                            String[] permissions = {Manifest.permission.WRITE_EXTERNAL_STORAGE};
                            requestPermissions(permissions,EXTERNAL_STORAGE_WRITE_CODE);
                        }
                        else {
                            saveTextFile(myText);
                        }
                    }
                    else {
                        saveTextFile(myText);

                    }

                }
            }
        });

```

The `saveTextFile` method is where we define the directory and format in which our document is saved

```java
    private void saveTextFile(String text) {
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss",
                Locale.getDefault()).format(System.currentTimeMillis());

        try{
            File path = Environment.getExternalStorageDirectory();
            File folder = new File(path + "/documents/");
            folder.mkdirs();
            String fileName = "documents_" + timeStamp + ".txt"; // e.g. documents_20210810_153433.txt

            File myFile = new File(folder, fileName);

            FileWriter fWriter = new FileWriter(myFile.getAbsoluteFile());
            BufferedWriter bWriter = new BufferedWriter(fWriter);
            bWriter.write(text);
            bWriter.close();


            Toast.makeText(getApplicationContext(), fileName+" is saved in: \n" + folder, Toast.LENGTH_SHORT).show();

        }
        catch (Exception e) {

            Toast.makeText(getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();

        }
    }

```
 
### Demo

- Click on the camera icon to take the picture or select it from the device.
![Image selector](/engineering-education/android-ocr-extracting-texts-from-objects-or-images-using-google-vision-api/selection.jpg)
- Once the image is loaded on the device, perform cropping on where there is the text you want to extract and hit `Crop` on top right corner.
![Crop image](/engineering-education/android-ocr-extracting-texts-from-objects-or-images-using-google-vision-api/crop-image.jpg)
- Now the OCR performs the logic and you will finally see the image and detected text
![Uploaded image](/engineering-education/android-ocr-extracting-texts-from-objects-or-images-using-google-vision-api/uploaded-image.jpg)
![Detected text](/engineering-education/android-ocr-extracting-texts-from-objects-or-images-using-google-vision-api/detected-text.jpg)

#### References

- [Google Cloud Vision API](https://cloud.google.com/vision/docs/ocr)
- [Google Developers TextRecognizer](https://developers.google.com/android/reference/com/google/android/gms/vision/text/TextRecognizer)

### Conclusion

In this post, we learned how OCR mobile applications identify and recognize characters, letters, and symbols encoded in digital images. The program recognizes text content in photographs captured using a smartphone camera or selected from the gallery and then shows it on the mobile screen in a manner that can be edited.

Optical character recognition is used widely in the conversion of printed information into digital text files (OCR). Children and adults who struggle to read can benefit greatly from these digital files. This is because digital text can be used with several reading software programs.


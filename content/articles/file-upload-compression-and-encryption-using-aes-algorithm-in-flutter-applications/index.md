---
layout: engineering-education
status: publish
published: true
url: /file-upload-compression-and-encryption-using-aes-algorithm-in-flutter-applications/
title: Handling File Upload, Compression, and Encryption using AES Algorithm in Flutter Applications 
description: This tutorial will guide the reader on how to create a simple Flutter mobile application that receives, compresses, and encrypts different file formats.
author: ian-masae
date: 2022-06-30T00:00:00-02:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/file-upload-compression-and-encryption-using-aes-algorithm-in-flutter-applications/hero.jpg
  alt: File Upload, Compression, and Encryption using AES Algorithm in Flutter Hero Image
---
File compression is the process of reducing the logical size of a file to save disk space. It also involves network optimization of files for easier transfer over the internet.
<!--more-->
On the other hand, file encryption is a way of encoding files, including the sensitive data they contain, to send them securely. This prevents unauthorized access and tampering.

### Goal
This tutorial will guide the reader on how to create a simple Flutter mobile application that will be able to:
- Accept files such as images, videos, or documents from the phone's local storage.
- Compress the files without losing their quality.
- Encrypt the files using the AES encryption algorithm before uploading the file to Firebase storage.

### Prerequisites
- A solid understanding of the [Dart](https://dart.dev/) programming language.
- Knowledge of working with [Flutter widgets](https://docs.flutter.dev/development/ui/widgets).
- An IDE that supports Flutter such as [Visual Studio Code](https://code.visualstudio.com/). This tutorial uses [Android Studio](https://developer.android.com/studio) with the Flutter plugin installed.

We will be using Flutter version 2.10.4 in this tutorial. If you do not have Flutter SDK installed, visit [Flutter Docs](http://docs.flutter.dev/get-started/install/) for the installation process.

### Project overview
Open Android Studio and create a new Flutter application with the name `flutter-app-demo`.
After the project has been initialized, we will create our project structure. 

The project will have four routes. We will go to the `lib` folder of our project and create a new folder called `screens` and here, we will add our routes.

The routes are as follows:

- Home screen - This will be our startup page when the application loads. It will go by the name, `home.screen.dart`.
- Image screen - This page will be called `image.screen.dart`. It will allow the user to pick and upload an image.
- Video screen - This page will be called `video.screen.dart`. It will allow the user to pick a video and upload it to Firebase storage.
- Document screen - This will be called `document.screen.dart`. It will allow the user to pick a document and manipulate it.

Next, we will create another folder under the `lib` folder called `services`. This folder will contain the APIs that we will use for the functionality of our application.

We will create the following APIs:

- A Firebase API - It will contain the code that will enable us to upload files to Firebase storage.

- File picker API - This API will enable us to pick files from the local storage.

- File compression API - This APi will enable us to compress images and videos picked from the gallery.

- File encryption API - This API will enable us to encrypt a file.

### Setting up Firebase
To set up Firebase go to the [Firebase Console](https://console.firebase.google.com/u/0/) and follow the step-by-step process to create your Firebase project.

After successfully creating your Firebase Android app. Navigate to the menu in the dashboard and select `Storage` and then `Get Started` as shown below:

![Getting started with Firebase Storage](/engineering-education/file-upload-compression-and-encryption-using-aes-algorithm-in-flutter-applications/get-started.png)

Next, select to start in test mode and specify the location of your Firebase server and then click done.

After the process is complete, navigate to the `Rules` tab and then change the rules, as shown below:

![Firebase Storage Rules](/engineering-education/file-upload-compression-and-encryption-using-aes-algorithm-in-flutter-applications/firebasestorage-rules.png)

> Note that this rule is not recommended when in production mode because it makes your data insecure.

### Adding dependencies
Go to the `pubspec.yaml` file and add the following dependencies:

```dart
dependencies:
  encrypt: ^5.0.1
  video_compress: ^3.1.0
  firebase_storage: ^10.2.9
  firebase_core: ^1.13.1
  flutter_native_image: ^0.0.6+1
  gallery_saver: ^2.3.2
  file_picker: ^4.5.1
  file_saver: ^0.1.0
```

- `firebase_storage` and `firebase_core` help us to access our Firebase storage where we will store our files.
- `flutter_native_image` helps us to compress images that we pick from the local storage.
- `video_compress` enables us to compress videos.
- `gallery_saver` provides an easier way to save images or videos to the gallery.
- `file_saver` provides us an easier way to save document files to the local storage.
- `file_picker` enables us to pick from the local storage.
- `encrypt` allows us to encrypt and decrypt files using the AES algorithm.

### Creating APIs
We will create four APIs which we will use to build the functionality of our application. 

These APIs are as follows:

#### 1. File Picker API
In this API we create methods for the functions that the program will perform, i.e., picking images and videos from the local storage. These functions are as follows:

##### a. Picking an image
This function is shown below:

```dart
class FilePickerApi {
  //Picking an image from local storage
  static Future<File?> pickImage() async {
    final pickedFile = await FilePicker.platform.pickFiles(
      allowMultiple: false,
      type: FileType.image, // Only images will be picked in the file picker
    );

    if (pickedFile == null) {
      return null;
    } else {
      final pickedImage = pickedFile.files.first;
      return File(pickedImage.path!);
    }
  }
}
```

##### b. Picking a video
This will be done using the following code:

```dart
// Picking a video from the local storage
static Future<File?> pickVideo() async {
 final pickedFile = await FilePicker.platform.pickFiles(
   allowMultiple: false,
   type: FileType.video, //Only videos will be picked in the file picker
 );

 if (pickedFile == null) {
   return null;
 } else {
   final pickedVideo = pickedFile.files.first;
   return File(pickedVideo.path!);
 }
}
```

This is the function for picking a video from the local storage.

##### c. Picking a document
It is as shown below:

```dart
 // Picking a document from local storage
Future<File?> pickDocument() async {
 final pickedFile = await FilePicker.platform.pickFiles(
     allowMultiple: false,
     type: FileType.custom,
     allowedExtensions: ["pdf"]); //Only PDF document files will be picked in the file picker

 if (pickedFile == null) {
   return null;
 } else {
   final pickedDocument = pickedFile.files.first;
   return File(pickedDocument.path!);
 }
}
```

The function above will enable us to pick documents from the gallery. We will only be able to select `.pdf` document files from the local storage. 

This is because we have set PDF files as the only allowed document format but more could be added.

#### 2. File compression API

##### a. Compressing an image
It is as shown below:

```dart
class FileCompressionApi {
  //Compressing the picked image
  static Future<File?> compressImage(File file) async {
    try {
      final compressedFile = await FlutterNativeImage.compressImage(file.path,
          quality: 100, percentage: 10);
      return File(compressedFile.path);
    } catch (e) {
      return null; //If any error occurs during compression, the process is stopped.
    }
  }
}
```

From the function above, the picked image is passed as an argument. We have used the `flutter-native-image` package to compress the image and return a new compressed file.

##### b. Compressing a video
It is as shown below:

```dart
//Compressing the picked video
static Future<MediaInfo?> compressVideo(File file) async {
 try {
   await VideoCompress.setLogLevel(0);
   return VideoCompress.compressVideo(file.path,
       quality: VideoQuality.LowQuality,
       includeAudio: true,
       deleteOrigin: true);
 } catch (e) {
   VideoCompress.cancelCompression(); //If any error occurs during compression, the process is stopped.
 }
 return null;
}
```

From the above function, we pass the picked video as an argument. We will then use the `video_compress` package to compress the image. 

The final output is a file with media information. We will use the media information to get the actual file which is our compressed video.

#### 3. Firebase API
The function of the Firebase API is to enable the user to upload files to the Firebase storage. 

We have created a class called `firebase.api.dart`. Here is the code for the Firebase file uploading:

```dart
class FirebaseApi {
  static UploadTask? uploadFile(String destination, File file) {
    try {
      final storageRef = FirebaseStorage.instance.ref(destination); //Here the destination of the file is passed.

      return storageRef.putFile(file); // The file to be uploaded is passed.
    } on FirebaseException catch (e) {
      return null; // If any errors occur uploading is cancelled.
    }
  }
}
```

Here, we will pass the file we want to upload, and the path where will store the file in the Firebase storage bucket.

#### 4. File Encryption API

```dart
import 'dart:typed_data';

import 'package:encrypt/encrypt.dart';

class FileEcryptionApi {
  static Future<Uint8List?> encryptFile(data) async {
    final key = Key.fromSecureRandom(16);
    final iv = IV.fromLength(16);
    final encrypter = Encrypter(AES(key, mode: AESMode.cbc));

    final encryptedFile = encrypter.encryptBytes(data, iv: iv);
    return encryptedFile.bytes;
  }
}
```

Here, we set the encryption algorithm to AES, and we have created a key variable. It contains an encryption key that is randomly generated containing 16 characters. 

`iv` represents an `Initialization Vector` key which is used to initialize the encryption process.

Finally, we have passed the data which we want to encrypt which is the list of bytes that we want to encrypt.

### User Interface

#### Home Screen
This page will be the main screen of our application. It is the root page that we will use to navigate to other pages in the application.

This is the code for our home screen:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_app_demo/screens/document.screen.dart';
import 'package:flutter_app_demo/screens/image.screen.dart';
import 'package:flutter_app_demo/screens/video.screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter App Demo"),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton.icon(
                onPressed: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const VideoScreen()));
                },
                icon: const Icon(Icons.video_file),
                label: const Text("Select Video")),
            const SizedBox(height: 16),
            ElevatedButton.icon(
                onPressed: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const ImageScreen()));
                },
                icon: const Icon(Icons.image_rounded),
                label: const Text("Select Image")),
            const SizedBox(height: 16),
            ElevatedButton.icon(
                onPressed: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const DocumentScreen()));
                },
                icon: const Icon(Icons.insert_drive_file_rounded),
                label: const Text("Select Document"))
          ],
        ),
      ),
    );
  }
}

```

#### Image Screen
This is the page where we will be able to select an image, compress it, save it to the gallery or upload it to firebase.

This is the code for our Image screen:

```dart
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_app_demo/services/file.compression.api.dart';
import 'package:flutter_app_demo/services/file.picker.api.dart';
import 'package:gallery_saver/gallery_saver.dart';

import '../services/firebase.api.dart';

class ImageScreen extends StatefulWidget {
  const ImageScreen({Key? key}) : super(key: key);

  @override
  State<ImageScreen> createState() => _ImageScreenState();
}

class _ImageScreenState extends State<ImageScreen> {
  File? image;
  File? compressedImage;
  bool isUploading = false;
  bool isCompressing = false;
  @override
  Widget build(BuildContext context) {
    final fileName =
        image != null ? (image!.path.split('/').last) : "No Image Selected";
    final fileSize = image != null
        ? (image!.lengthSync().roundToDouble() / 1048576).toStringAsFixed(2)
        : "";
    final compressedFileSize = compressedImage != null
        ? (compressedImage!.lengthSync().roundToDouble() / 1048576)
            .toStringAsFixed(2)
        : "";
    return Scaffold(
        appBar: AppBar(
          title: const Text("Select Image"),
          centerTitle: true,
        ),
        body: Center(
          child: Padding(
              padding: const EdgeInsets.all(30),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    fileName,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  Text(
                    image != null ? "File Size: $fileSize MB" : "",
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  Text(
                    compressedImage != null
                        ? "Compressed File Size: $compressedFileSize MB"
                        : "",
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  if (image == null)
                    ElevatedButton.icon(
                        onPressed: () async {
                          final result = await FilePickerApi.pickImage();
                          if (result == null) {
                            return;
                          }
                          final filePath = result.path;
                          setState(() {
                            image = File(filePath);
                          });
                        },
                        icon: const Icon(Icons.image),
                        label: const Text("Pick Image"))
                  else
                    (compressedImage == null)
                        ? ElevatedButton(
                            onPressed: () async {
                              setState(() {
                                isCompressing = true;
                              });
                              final result =
                                  await FileCompressionApi.compressImage(
                                      image!);
                              if (result == null) {
                                return;
                              }
                              final filePath = result.path;
                              setState(() {
                                compressedImage = File(filePath);
                                isCompressing = false;
                              });
                            },
                            child: isCompressing
                                ? const Text("Compressing...")
                                : const Text("Compress Image"))
                        : Column(
                            children: [
                              ElevatedButton.icon(
                                  onPressed: () async {
                                    String url = compressedImage!.path;
                                    GallerySaver.saveImage(url,
                                            albumName: "Flutter App Demo")
                                        .whenComplete(() =>
                                            ScaffoldMessenger.of(context)
                                                .showSnackBar(const SnackBar(
                                                    content: Text(
                                                        "Saved to Gallery!"))));
                                  },
                                  icon: const Icon(Icons.download_rounded),
                                  label: const Text("Save to Gallery")),
                              const SizedBox(
                                height: 8,
                              ),
                              ElevatedButton.icon(
                                  onPressed: () async {
                                    setState(() {
                                      isUploading = true;
                                    });
                                    await uploadImage().whenComplete(() {
                                      setState(() {
                                        isUploading = false;
                                      });
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(const SnackBar(
                                              content: Text(
                                                  "Uploaded Successfully!")));
                                    });
                                  },
                                  icon: const Icon(Icons.cloud_upload_rounded),
                                  label: isUploading
                                      ? const Text("Uploading...")
                                      : const Text("Upload to Firebase")),
                            ],
                          ),
                ],
              )),
        ));
  }
  Future uploadImage() async {
    if (compressedImage == null) return;
    var filePath = compressedImage!.path;
    var fileName = (filePath.split('/').last);
    final destination = "files/images/$fileName";

    await FirebaseApi.uploadFile(destination, compressedImage!);
  }
}
```

We derive the name of the file that we pick and store it in the variable `fileName`, as shown below:

```dart
final fileName = image != null ? (image!.path.split('/').last) : "No Image Selected";
```

We will get the size of the picked file and that of the compressed image file like this:

```dart
final fileSize = image != null
        ? (image!.lengthSync().roundToDouble() / 1048576).toStringAsFixed(2)
        : "";
    final compressedFileSize = compressedImage != null
        ? (compressedImage!.lengthSync().roundToDouble() / 1048576)
            .toStringAsFixed(2)
        : "";
```

#### Uploading an image to Firebase
We have created a function `uploadImage()` which will enable us to upload the image to Firebase storage with the help of the Firebase API that we created, as demonstrated below:

```dart
Future uploadImage() async {
    if (compressedImage == null) return;
    var filePath = compressedImage!.path;
    var fileName = (filePath.split('/').last);
    final destination = "files/images/$fileName";

    await FirebaseApi.uploadFile(destination, compressedImage!);
}
```

We first retrieve the name of the compressed image from its path. We then set the destination, which is a required argument by the Firebase API function, `uploadFile()`.

The destination is the path in the Firebase storage bucket where the file will be stored. In our case, we will store images, videos, and documents in different folders.

Finally, we will call the function, `uploadFile()` from the Firebase API and pass the required arguments, i.e., the destination of the file and the file itself as shown in the code above.

#### Saving an image to the gallery
We have created a function to save the compressed image to the local storage. We have used the `gallery_saver` package to achieve that, as shown below:

```dart
String url = compressedImage!.path;
GallerySaver.saveImage(url, albumName: "Flutter App Demo")
```

A new album is created by the name provided and the image is saved there.


#### Video Screen
The video screen is almost similar to the image screen. We have only added a few extra functions that we will use for manipulating our video files such as video compressing.

This is the code for the video screen:

```dart
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:gallery_saver/gallery_saver.dart';
import 'package:video_compress/video_compress.dart';

import '../services/file.compression.api.dart';
import '../services/file.picker.api.dart';
import '../services/firebase.api.dart';

class VideoScreen extends StatefulWidget {
  const VideoScreen({Key? key}) : super(key: key);

  @override
  State<VideoScreen> createState() => _VideoScreenState();
}

class _VideoScreenState extends State<VideoScreen> {
  File? videoFile;
  MediaInfo? compressedVideoInfo;
  bool isUploading = false;
  bool isCompressing = false;
  @override
  Widget build(BuildContext context) {
    final fileName =
        videoFile != null ? (videoFile!.path.split('/').last) : "No Video Selected";
    final fileSize = videoFile != null
        ? (videoFile!.lengthSync().roundToDouble() / 1048576).toStringAsFixed(2)
        : "";
    return Scaffold(
        appBar: AppBar(
          title: const Text("Select Video"),
          centerTitle: true,
        ),
        body: Center(
          child: Padding(
              padding: const EdgeInsets.all(30),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    fileName,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  Text(
                    videoFile != null ? "File Size: $fileSize MB" : "",
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  if (videoFile == null)
                    ElevatedButton.icon(
                        onPressed: () async {
                          final result = await FilePickerApi.pickVideo();
                          if (result == null) {
                            return;
                          }
                          final filePath = result.path;
                          setState(() {
                            videoFile = File(filePath);
                          });
                        },
                        icon: const Icon(Icons.video_file),
                        label: const Text("Pick Video"))
                  else
                    (compressedVideoInfo == null)
                        ? ElevatedButton(
                            onPressed: () async {
                              setState(() {
                                isCompressing = true;
                              });
                              final result =
                                  await FileCompressionApi.compressVideo(
                                      videoFile!);
                              if (result == null) {
                                return;
                              }

                              setState(() {
                                compressedVideoInfo = result;
                                videoFile = File(result.file!.path);
                                isCompressing = false;
                              });
                            },
                            child: isCompressing
                                ? const Text("Compressing...")
                                : const Text("Compress Video"))
                        : Column(
                            children: [
                              ElevatedButton.icon(
                                  onPressed: () async {
                                    String url = compressedVideoInfo!.file!.path;
                                    GallerySaver.saveVideo(url,
                                            albumName: "Flutter App Demo")
                                        .whenComplete(() =>
                                            ScaffoldMessenger.of(context)
                                                .showSnackBar(const SnackBar(
                                                    content: Text(
                                                        "Saved to Gallery!"))));
                                  },
                                  icon: const Icon(Icons.download_rounded),
                                  label: const Text("Save to Gallery")),
                              const SizedBox(
                                height: 8,
                              ),
                              ElevatedButton.icon(
                                  onPressed: () async {
                                    setState(() {
                                      isUploading = true;
                                    });
                                    await uploadVideo().whenComplete(() {
                                      setState(() {
                                        isUploading = false;
                                      });
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(const SnackBar(
                                              content: Text(
                                                  "Uploaded Successfully!")));
                                    });
                                  },
                                  icon: const Icon(Icons.cloud_upload_rounded),
                                  label: isUploading
                                      ? const Text("Uploading...")
                                      : const Text("Upload to Firebase")),
                            ],
                          ),
                ],
              )),
        ));
  }

  Future uploadVideo() async {
    if (compressedVideoInfo == null) return;
    var filePath = compressedVideoInfo!.file!.path;
    var fileName = (filePath.split('/').last);
    final destination = "files/videos/$fileName";

    await FirebaseApi.uploadFile(destination, compressedVideoInfo!.file!);
  }
}


```

When we compress a video a `MediaInfo` file containing the media information is returned. It contains the path to the file, the file size, title, author, duration e.t.c. 

For our case, we will only use the file path. From here the picked video will be replaced with the new compressed video:

```dart
setState(() {
  isCompressing = true;
});
  final result =
      await FileCompressionApi.compressVideo(videoFile!);
  if (result == null) {
    return;
  }
setState(() {
  compressedVideoInfo = result;
  videoFile = File(result.file!.path);
  isCompressing = false;
});
```

We store the media information which is returned when the compression is successful in the `MediaInfo` variable that we created earlier:

```dart
MediaInfo? compressedVideoInfo;
```

From the media information, we derive the file path of the compressed video. The new video file will be the compressed video:

```dart
videoFile = File(result.file!.path);
```

#### Document Screen
We maintained a consistent user interface for all the screens. In the document screen, we will be able to pick a document from the phone storage, encrypt the document and then upload it to Firebase storage.

This is demonstrated below:

```dart
import 'dart:io';

import 'package:file_saver/file_saver.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app_demo/services/file.encryption.api.dart';
import 'package:flutter_app_demo/services/file.picker.api.dart';
import 'package:flutter_app_demo/services/firebase.api.dart';

class DocumentScreen extends StatefulWidget {
  const DocumentScreen({Key? key}) : super(key: key);

  @override
  State<DocumentScreen> createState() => _DocumentScreenState();
}

class _DocumentScreenState extends State<DocumentScreen> {
  File? doc;
  bool isUploading = false;
  bool isEncrypting = false;
  @override
  Widget build(BuildContext context) {
    final fileName =
        doc != null ? (doc!.path.split('/').last) : "No Document Selected"; //Getting the name of the selected document
    return Scaffold(
        appBar: AppBar(
          title: const Text("Select Document"),
          centerTitle: true,
        ),
        body: Center(
          child: Padding(
              padding: const EdgeInsets.all(30),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    fileName,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  (doc == null)
                      ? ElevatedButton.icon(
                          onPressed: () async {
                            final result = await FilePickerApi.pickDocument();
                            if (result == null) {
                              return;
                            }
                            final filePath = result.path;
                            setState(() {
                              doc = File(filePath);
                            });
                          },
                          icon: const Icon(Icons.attach_file),
                          label: const Text("Select Document"))
                      : Column(
                          children: [
                            ElevatedButton(
                                onPressed: () async {
                                  setState(() {
                                    isEncrypting = true;
                                  });
                                  final result =
                                      await FileEcryptionApi.encryptFile(
                                          doc!.readAsBytesSync()); //Changing the file into a list of bytes

                                  await FileSaver.instance //Saving the encrypted document to local storage
                                      .saveAs(fileName, result!, "aes",
                                          MimeType.OTHER)
                                      .whenComplete(() {
                                    setState(() {
                                      isEncrypting = false;
                                    });
                                    ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(
                                            content: Text(
                                                "Successfully encrypted!")));
                                  });
                                },
                                child: isEncrypting
                                    ? const Text("Encrypting...")
                                    : const Text("Encrypt Document")),
                            const SizedBox(
                              height: 10,
                            ),
                            ElevatedButton.icon(
                                onPressed: () async {
                                  setState(() {
                                    isUploading = true;
                                  });
                                  await uploadDocument().whenComplete(() {
                                    setState(() {
                                      isUploading = false;
                                    });
                                    ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(
                                            content: Text(
                                                "Uploaded Successfully!")));
                                  });
                                },
                                icon: const Icon(Icons.cloud_upload_rounded),
                                label: isUploading
                                    ? const Text("Uploading...")
                                    : const Text("Upload to Firebase")),
                          ],
                        ),
                ],
              )),
        ));
  }

  Future uploadDocument() async { // Function to upload the picked document to Firebase
    if (doc == null) return;
    var filePath = doc!.path;
    var fileName = (filePath.split('/').last);
    final destination = "files/documents/$fileName";

    await FirebaseApi.uploadFile(destination, doc!);
  }
}
```

#### Document File encryption
When encrypting the file, we first get the file we want to encrypt. For our case, we will use the document that we pick from the local storage. 

The file is read and changed into a list of bytes which is the required format to be able to encrypt the file.

Once we have successfully changed the file into a list of bytes, the file is encrypted using the AES algorithm. This is done by calling the File Encryption API that we created earlier.

```dart
final result = await FileEcryptionApi.encryptFile(doc!.readAsBytesSync()); //Changing the file into a list of bytes
```

Once the encryption is complete, the encrypted file is saved to the local storage by passing the list of bytes, the file name, and the file extension as shown below:

```dart
await FileSaver.instance.saveAs(fileName, result!, "aes", MimeType.OTHER); //Saving the encrypted file to the local storage
```

#### main.dart
The `main.dart` is the root of the application from where all other widgets form the widget tree.

For our main function we will initialize our Firebase app as follows:

```dart
import 'package:firebase_core/firebase_core.dart'; // Make sure this package is imported.

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}
```

Next, we will set the home page to be the home screen that we created earlier:

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter App Demo',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
      ),
      home: const HomeScreen(), // Here we set the first page that will appear when we start the application
    );
  }
}
```

### Conclusion
In this article, we have gone through how to pick different types of files from the local storage and manipulate them. 

We were able to pick videos and images from the gallery and compress them to achieve a smaller image and video size. This is a way of optimizing data usage when uploading such files to cloud storage.

We have also gone through the process of encrypting documents and uploading videos, images, and document files to Firebase storage. I do hope this article is useful.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
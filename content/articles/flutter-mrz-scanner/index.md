### Introduction
Various processes keep on being digitized. For example, we can obtain the traveller's national identity card or passport in the airports. With a scan on the MRZ section of the passport or national identity card, we can obtain information such as traveller name, nationality, age, document number, and even an image.

This tutorial will build a simple flutter application with BlinkId SDK that will obtain user data from either the national Id or passport.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Application setup](#application-setup)
- [BlinkId account setup](#blinkid-account-setup)
- [Application testing](#application-testing)
- [Conclusion](#conclusion)

### Prerequisites
1. [Flutter](https://flutter.dev) SDK installed on your computer.
2. Knowledge of Flutter SDK.
3. [BlinkId](https://developer.microblink.com/start) account.

### Application setup
1. On the command line, create a new directory to store our project files by executing the command below.
   ```bash
   mkdir mrz
   ```
2. Change the working directory to the directory created above and execute the following command to create a new Flutter project.
    ```bash
    cd mrz
    flutter create --org com.mrzapp mrzapp
    ```
3. Once the project is created, open the project in your favourite IDE.
4. In the root project directory, locate the `pubspec.yaml` file, and add the following dependencies in the dependency section.
```yaml
  blinkid_flutter: ^5.13.0
  change_app_package_name: any
```
- [blinkid_flutter](https://pub.dev/packages/blinkid_flutter) is the package that we will use to scan the MRZ section of the passport and national identity card to obtain the user data.
- [change_app_package_name](https://pub.dev/packages/change_app_package_name) is a package that we will use to change the package name of the application.
5. In the `lib` directory, in the `main.dart` file, add the following code snippet.
```dart
class MRZApp extends StatelessWidget {
  const MRZApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter MRZ Scanner',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const ScanID(),
    );
  }
}

```

6. In the `lib` directory, create a new file named `scan_screen.dart` and add the following code snippet.

7. In the class created above, create a stateful Flutter widget named `ScanID` and add the following code snippet.
```dart
class ScanID extends StatefulWidget {
  const ScanID({Key? key}) : super(key: key);

  @override
  _ScanIDState createState() => _ScanIDState();
}

class _ScanIDState extends State<ScanID> {
  String? _resultString = "";
}
```
- In the code snippet above, we created a stateful widget, and in its state class, we have a string `_resultString` that will store the scanned data.

8. In the `_ScanIDState` class, create a method named `scan()` that will scan the MRZ section of the passport and national identity card. Update the `scan()` method with the following code snippet.
```dart
  Future<void> scan() async {
    String license;
    // Set the license key depending on the target platform you are building for.
    if (Theme.of(context).platform == TargetPlatform.iOS) {
      license =
          "sRwAAAAoaW8uZWdvdmVybmFuY2UuYmx1ZXpvbmVnYXRlLmJsdWV6b25lZ2F0ZUdim+uJDtg9ny/SYkgjs+Y95pLNInvqUSVzyIH1NDzwVf2eBeY9LWQMl5go9CWPsLnCvw+/QCRqbaAdlYxypmC0p/Rwdca/A23ynvlTtG0llg895X9N7RmkDAZHTgtZL3bLp5naLlt+7mb4yYapvnICnEkBU80JFdGtFYzIthcJdCno/r48DPgaDLFpvQEzVX/qYKWftyh0In3ihZPR/BrTgUYQTcoqdc67lcuJI8dQ";
    } else if (Theme.of(context).platform == TargetPlatform.android) {
      license =
          "sRwAAAARY29tLm1yemFwcC5tcnphcHAy0eiGAj1egksTfF6tuX+beau8l0Pc2v1oDAcCEELyMY1bsjZFw+RLMmbixpkG4UDO5kgJaY7Yow2KhQMgBWz7GSXWHH/gHPQXkl2+fkvURAPtK5XXPuHHXwkheXIbX94F1vz45P5fwt7u8GJU7qRTdMGoojET6nbturioaUbrhppCZxXkAOkRx5keGmSFFwgErnZGZOVkbTvNfsnuItSpJjLANvHMEKMPWh9kgivfKA==";
    } else {
      license =
          "sRwAAAARY29tLm1yemFwcC5tcnphcHAy0eiGAj1egksTfF6tuX+beau8l0Pc2v1oDAcCEELyMY1bsjZFw+RLMmbixpkG4UDO5kgJaY7Yow2KhQMgBWz7GSXWHH/gHPQXkl2+fkvURAPtK5XXPuHHXwkheXIbX94F1vz45P5fwt7u8GJU7qRTdMGoojET6nbturioaUbrhppCZxXkAOkRx5keGmSFFwgErnZGZOVkbTvNfsnuItSpJjLANvHMEKMPWh9kgivfKA==";
    }

    var idRecognizer = BlinkIdCombinedRecognizer();
    idRecognizer.returnFullDocumentImage = true;
    idRecognizer.returnFaceImage = true;

    BlinkIdOverlaySettings settings = BlinkIdOverlaySettings();

    var results = await MicroblinkScanner.scanWithCamera(
        RecognizerCollection([idRecognizer]), settings, license);

    if (!mounted) return;
    // When the scan is cancelled, the result is null therefore we return to the the main screen.
    if (results.isEmpty) return;
    //When the result is not null, we check if it is a passport then obtain the details using the `getPassportDetails` method and display them in the UI. If the document type is a national id, we get the details using the `getIdDetails` method and display them in the UI.
    for (var result in results) {
      if (result is BlinkIdCombinedRecognizerResult) {
        if (result.mrzResult?.documentType == MrtdDocumentType.Passport) {
          _resultString = getPassportResultString(result);
        } else {
          _resultString = getIdResultString(result);
        }

        setState(() {
          _resultString = _resultString;
          _fullDocumentFrontImageBase64 = result.fullDocumentFrontImage ?? "";
          _faceImageBase64 = result.faceImage ?? "";
        });

        return;
      }
    }
  }
```
- In the code snippet above, we check the platform and provision the correct license key.
- We then check if the camera is mounted, and if it is not, we return to the main screen. If the camera is mounted, we scan the document and obtain the result.

9. Until this point, we can scan a passport and a national id using our application but cannot obtain the scan results
Add the following functions to the _ScanIDState class to get the scan results.
```dart
//This method is used to obtain the specific user details from the national id from the scan result object.
  String getIdResultString(BlinkIdCombinedRecognizerResult result) {
    // The information below will be otained from the natioal id if they are available.
    // In the case a field is not found, then it is skipped. For example, some national ids do not have the profession field.
    return buildResult(result.firstName, "First name") +
        buildResult(result.lastName, "Last name") +
        buildResult(result.fullName, "Full name") +
        buildResult(result.localizedName, "Localized name") +
        buildResult(result.additionalNameInformation, "Additional name info") +
        buildResult(result.address, "Address") +
        buildResult(
            result.additionalAddressInformation, "Additional address info") +
        buildResult(result.documentNumber, "Document number") +
        buildResult(
            result.documentAdditionalNumber, "Additional document number") +
        buildResult(result.sex, "Sex") +
        buildResult(result.issuingAuthority, "Issuing authority") +
        buildResult(result.nationality, "Nationality") +
        buildDateResult(result.dateOfBirth, "Date of birth") +
        buildIntResult(result.age, "Age") +
        buildDateResult(result.dateOfIssue, "Date of issue") +
        buildDateResult(result.dateOfExpiry, "Date of expiry") +
        buildResult(result.dateOfExpiryPermanent.toString(),
            "Date of expiry permanent") +
        buildResult(result.maritalStatus, "Martial status") +
        buildResult(result.personalIdNumber, "Personal Id Number") +
        buildResult(result.profession, "Profession") +
        buildResult(result.race, "Race") +
        buildResult(result.religion, "Religion") +
        buildResult(result.residentialStatus, "Residential Status") +
        buildDriverLicenceResult(result.driverLicenseDetailedInfo);
  }

  String buildResult(String? result, String propertyName) {
    if (result == null || result.isEmpty) {
      return "";
    }

    return propertyName + ": " + result + "\n";
  }
  //This function creates a complete date based on the date obtained from the scanned document. For example, date of the document issue.
  String buildDateResult(Date? result, String propertyName) {
    if (result == null || result.year == 0) {
      return "";
    }

    return buildResult(
        "${result.day}.${result.month}.${result.year}", propertyName);
  }

  String buildIntResult(int? result, String propertyName) {
    if (result == null || result < 0) {
      return "";
    }

    return buildResult(result.toString(), propertyName);
  }
  //This method obtained the 
  String buildDriverLicenceResult(DriverLicenseDetailedInfo? result) {
    if (result == null) {
      return "";
    }

    return buildResult(result.restrictions, "Restrictions") +
        buildResult(result.endorsements, "Endorsements") +
        buildResult(result.vehicleClass, "Vehicle class") +
        buildResult(result.conditions, "Conditions");
  }

  String getPassportResultString(BlinkIdCombinedRecognizerResult? result) {
    if (result == null) {
      return "";
    }

    var dateOfBirth = "";
    if (result.mrzResult?.dateOfBirth != null) {
      dateOfBirth = "Date of birth: ${result.mrzResult!.dateOfBirth?.day}."
          "${result.mrzResult!.dateOfBirth?.month}."
          "${result.mrzResult!.dateOfBirth?.year}\n";
    }

    var dateOfExpiry = "";
    if (result.mrzResult?.dateOfExpiry != null) {
      dateOfExpiry = "Date of expiry: ${result.mrzResult?.dateOfExpiry?.day}."
          "${result.mrzResult?.dateOfExpiry?.month}."
          "${result.mrzResult?.dateOfExpiry?.year}\n";
    }

    return "First name: ${result.mrzResult?.secondaryId}\n"
        "Last name: ${result.mrzResult?.primaryId}\n"
        "Document number: ${result.mrzResult?.documentNumber}\n"
        "Sex: ${result.mrzResult?.gender}\n"
        "$dateOfBirth"
        "$dateOfExpiry";
  }
  // This widget will display a complete image of the passport or national id that is scanned.
```
- The `buildDriverLicenceResult` method is used to obtain the driver licence details from the scan result object in the case when a driver licence is scanned.
- The `getIdResultString` method is used to obtain the user details from the scanned national id.
- The `buildResult` method is used to obtain the specific date from the scanned document i.e date of birth, date of issue, date of expiry, etc.
  
10. Finally, we need to display the data obtained from the scan in the user interface. For that,we need to add the following widgets to the _ScanIDState class.
```dart
  // This widget will display a complete image of the passport or national id that is scanned.
  @override
  Widget build(BuildContext context) {
    Widget fullDocumentFrontImage = Container();
    if (_fullDocumentFrontImageBase64 != null &&
        _fullDocumentFrontImageBase64 != "") {
      fullDocumentFrontImage = Column(
        children: <Widget>[
          const Text("Document Front Image:"),
          Image.memory(
            const Base64Decoder().convert(_fullDocumentFrontImageBase64!),
            height: 180,
            width: 350,
          )
        ],
      );
    }
    //This widget will show the user image obtained from the passport or national id
    Widget faceImage = Container();
    if (_faceImageBase64 != null && _faceImageBase64 != "") {
      faceImage = Column(
        children: <Widget>[
          const Text("Face Image:"),
          Image.memory(
            const Base64Decoder().convert(_faceImageBase64!),
            height: 150,
            width: 100,
          )
        ],
      );
    }

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: true,
          centerTitle: true,
          title: const Text(
            "Scan ID for Visitor",
            style: TextStyle(color: Colors.white),
          ),
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: <Widget>[
              Padding(
                  child: ElevatedButton(
                    child: const Text("Scan ID"),
                    onPressed: () => scan(),
                  ),
                  padding: const EdgeInsets.only(bottom: 16.0)),
              Text(_resultString!),
              fullDocumentFrontImage,
              // fullDocumentBackImage,
              faceImage,
            ],
          ),
        ),
      ),
    );
  }
```

- `scan()` method starts the camera application for scanning the passport or national id. When the scan is completed, the `getIdResultString()` method is invoked to decode the result from the `scan()` method and display it on the screen.
- When the scan is completed, the `getPassportResultString()` method is invoked to decode the result from the `scan()` method and display it on the screen.

### BlinkId account setup
1. Navigate to [microblink.com](https://microblink.com) and create a new account.
2. Copy the license key from the settings page of your BlinkID account and replace the `licenseKey` variable with the license key in the `scan()` method.

### Application testing
### Conclusion
Now that you have learned how to set up and use the BlinkId SDK in a flutter application, you can start using the SDK in your applications. You can download the complete source code for the application [here]().

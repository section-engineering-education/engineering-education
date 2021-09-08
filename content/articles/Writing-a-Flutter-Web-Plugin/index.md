---
layout: engineering-education
status: publish
published: true
url: /writing-a-flutter-web-plugin/
title: Writing a Flutter Web Plugin
description:  This article will walk the reader through writing their first web plugin in flutter.
author: faith-zawadi
date: 2021-09-08T00:00:00-12:14
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/writing-a-flutter-web-plugin//hero.jpg
    alt: Flutter web plugin image
---

### Introduction
Flutter's `web support` enables a seamless online experience. For example, you can create apps for both iOS, Android, and web apps can be converted to run on the web. In addition to translating Dart to JavaScript, adding web functionality to Flutter requires creating Flutter's fundamental graphics layer on top of conventional browser APIs. I will take you through making the Flutter plugin web-enabled.

Anyone can add support for additional platforms using the federated plugin architecture. In contrast to a package, a plugin only contains Dart code, while a package only contains Native code. If a package wishes to, it can use plugins. However, it will still be considered a package.

### Platform interfacing
Pingatform interfacing is the process of abstracting what plugin package is to be implemented via its platforms, how the plugin package communicates with the platform implementation, and its replacement of what the plugin package wants from the platform.

### Creating the platform interface package
In the other example, the plugin sits in a directory like packages/URL launcher in the flutter/plugins directory GitHub repository. First, we will develop the platform interface package and restructure the code to use a federated plugin directory arrangement. 

We are creating a directory that contains the plugin package, the platform interface, and web packages. For example, the URL launcher plugin can be moved to a federated sub-folder in the packages/ directory. 

Run the following code in the current directory you created earlier to create the platform interface package.

```bash
$ mkdir url_launcher_interface_platform
```

The URL launcher interface platform folder needs a few files to be complete.

1. Licence file

You may generally **git cp** the **LICENSE** file from the package: URL launcher directory.

2. **CHANGELOG.md** file

3. Define a **pubspec.yaml**

You can use **pubspec.yaml** as a template for the actual package:url_launcher_interface_platform. Every platform interface package's **pubspec.yaml** should include a warning about preventing breaking changes.

4.  **README.md** file

As a starting point, look at the README.md in the package:url_launcher_interface_platform. Now copy and paste the following code into the file lib/url_launcher_interface_platform.dart:

```dart
import 'dart:async';
import 'package:plugin_interface_platform.dart';
import 'method_channel_url_launcher.dart';
/*Implementations of url launchers must adhere to this interface.
Platform implementations should extend this class instead of implementing a URL launcher.
By definition, new methods are not considered breaking changes. Extending this class (with extends) assures that the subclass receives the default implementation, whereas the newly added interface will damage platform implementations of this interface.*/
  UrlLauncherPlatform() : super(token: _token);
  static final Object _token = Object();
  static UrlLauncherPlatform _instance = MethodChannelUrlLauncher();
  static UrlLauncherPlatform get instance => _instance;
  static set instance(UrlLauncherPlatform instance) {
    PlatformInterface.verifyToken(instance, _token);
    _instance = instance;
  }
  Future<bool> launch(String url) {
    throw UnimplementedError('launch() is not implemented.');
  }
}
```

> The default implementation of all platform interface functions should throw a UnimplementedError. For example, to write MethodChannelUrlLauncher, now edit lib/method channel url launcher. Dart and paste the following:
> 
```dart
import 'dart:async';
import 'package:flutter/services.dart';
import 'url_launcher_interface_platform.dart';
const MethodChannel_chanel = MethodChannel('plugins.flutter.io/url_launcher');

/// Method channels are used in this [UrlLauncherPlatform] implementation.
class MethodChannelUrlLauncher extends UrlLauncherPlatform {
  @override
  Future<bool> launch(String url) {
    return _channel.invokeMethod<bool>(
      'launch',
      <String, Object>{
        'url': url,
      },
    );
  }
}
```

Upload the new package to `pub.dev` after committing the new code and submitting it to version control.

### Refactoring package:url_launcher
We will now utilize package: URL launcher, which has been uploaded to the `pub.dev` as a platform interface package, and after that, add a dependency on url_launcher_interface_platform.

Then we will now refactor all usages of MethodChannel.

```dart
const MethodChannel _chan = MethodChan('plugins.flutter.io/url_launcher');
Future<bool> launch(String urlString) async {
  assert(urlString != null);
  final bool result = await UrlLauncherPlatform.instance.launch(urlString);
  return result;
}
```

Make sure you have written an item to the **CHANGELOG.MD** stating that package: URL launcher is being migrated to the platform interface.

### Using the platform interface to implement package:url_launcher_web
Paste the following code in the lib/URL launcher web.dart file replace the platform interface with this plugin:

```Dart
import 'dart:async';
import 'dart:html' as HTML;

import 'package:flutter_web_plugins/flutter_web_plugins.dart';
import 'package:meta.dart';
import 'package:url_launcher_interface_platform/url_launcher_interface_platform.dart';

/// The [UrlLauncherPlatform] implementation on the web. For the web, this class implements the package:url launcher functionality.
class UrlLauncherPlugin extends UrlLauncherPlatform {
  ///This class is set to be the default [UrlLauncherPlatform].web instance.
  static void registerWith(Registrar registrar) {
    UrlLauncherPlatform.instance = UrlLauncherPlugin();
  }

  @override
  Future<bool> launch(String url) {
    return Future<bool>.value(html.window.open(url, '') != null);
  }
}
```

Stating that this is the UrlLauncherPlatform default instance, rather than registering a MethodChannel, makes more sense. When package:url launcher calls UrlLauncherPlatform.instance.launch(), the launch() function defined here is called.

All the essential code for creating a package is contained in this class. As a result, understanding Flutter's MethodChannel APIs is no longer required to design platform-specific plugin implementations. Web-based URL launcher When designing a platform interface package for a plugin, keep these considerations in mind.

1. It is possible to create a platform interface method for each plugin area that uses MethodChannel. An upshot of this is that the plugin package can be more adaptable because it does not import abstractions from the platform interface package.

2. Make sure to use package:plugin_platform_interface to force your platform interface implementers to use extends instead of implements.

### Conclusion
Thanks to the Flutter framework's versatility, you can now create iOS, Android, and the web apps using the same codebase. In this case, you may convert existing Flutter code written in Dart to operate on the web because it's the same framework, and the web is just another device target for your project. It is time to start writing your plugins!.

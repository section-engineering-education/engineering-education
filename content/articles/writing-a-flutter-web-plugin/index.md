---
layout: engineering-education
status: publish
published: true
url: /writing-a-flutter-web-plugin/
title: Writing a Flutter Web Plugin
description: This article will walk the readers through writing their first web plugin in Flutter. Platform interfacing is the process of abstracting what plugin package is to be implemented via its platforms. 
author: faith-zawadi
date: 2021-10-06T00:00:00-10:15
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/writing-a-flutter-web-plugin/hero.png
    alt: Flutter web plugin image
---
Flutters web support enables a seamless online experience. For example, you can create apps for iOS and Android that can then be converted to run on the web. 
<!--more-->
In addition to translating Dart to JavaScript, adding web functionality to Flutter requires the inclusion of fundamental graphics layer on top of conventional browser APIs. 

This tutorial will show you how to create a web plugin using Flutter.

When constructing Flutter plugins, platform-specific implementations are divided into different packages. `Federated plugins` are created in this manner. 

By reorganizing your plugin as a federated plugin, anyone can add support for new platforms without needing to do so yourself. A flutter plugin contains just Dart code, while a package only contains Native code. On the other hand, a package can use plugins if it so chooses. 

### Platform interfacing
Platform interfacing is the process of abstracting what plugin package is to be implemented via its platforms. Additionally, platform interfacing explains how the plugin package communicates with the platform implementation and replaces what the plugin package needs from the platform.

### Creating the platform interface package
The plugin sits in a directory like packages/URL launcher in the flutter/plugins directory on the GitHub repository. First, we will develop the platform interface package and restructure the code to use a federated plugin directory arrangement. 

We will be creating a directory that contains the plugin package, the platform interface, and web packages. For example, the URL launcher plugin can be moved to a federated sub-folder in the packages directory. 

Now run the following code in the current directory you created earlier to create the platform interface package.

```bash
$ mkdir url_launcher_interface_platform
```

For the URL launcher interface platform folder to be complete, it needs a few files which are named below:

1. License file

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
//In order to avoid breaking changes, platform implementations should extend this class rather than implement it. Adding new methods to this interface will break platform implementations that 'implement' it; therefore, extending this class assures that the subclass gets the default implementation.
  UrlLauncherPlatform() : super(token: _token);
  static final Object _token = Object();
  static UrlLauncherPlatform _instance = MethodChannelUrlLauncher();
  static UrlLauncherPlatform get instance => _instance;
  static set instance(UrlLauncherPlatform instance) {
    PlatformInterface.verifyToken(instance, _token);
    _instance = instance;
  }
  //Starts the supplied [link] in a new window. If the launch was a success, this function returns [true].
  Future<bool> launch(String url) {
    throw UnimplementedError('launch() is not implemented.');
  }
}
```

> Implementations of URL launchers must adhere to this interface. Platform implementations should extend the above class instead of implementing a URL launcher.

By definition, new methods are not considered breaking changes. Extending the above class (with extends) assures that the subclass receives the default implementation, whereas the newly added interface will damage the platform implementations of this interface.

>Note that the default implementation of all platform interface functions should throw a UnimplementedError.

To write `MethodChannelUrlLauncher`, edit lib/method channel url launcher file, paste the following code and upload the new package to `pub.dev` after committing:

```dart
import 'dart:async';
import 'package:flutter/services.dart';
import 'url_launcher_interface_platform.dart';
const MethodChannel_chanel = MethodChannel('plugins.flutter.io/url_launcher');

// Method channels are used in this [UrlLauncherPlatform] implementation.
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

### Refactoring package:url_launcher
We will now utilize package: URL launcher, which has been uploaded to the `pub.dev` as a platform interface package, and after that, we will add a dependency on url_launcher_interface_platform.

Let us now refactor all usages of `MethodChannel`:

```dart
const MethodChannel _chan = MethodChan('plugins.flutter.io/url_launcher');
Future<bool> launch(String urlString) async {
  assert(urlString != null);
  final bool result = await UrlLauncherPlatform.instance.launch(urlString);
  return result;
}
```

> Make sure you have written an item to the **CHANGELOG.MD** stating that package: URL launcher is being migrated to the platform interface.

### Using the platform interface to implement package:url_launcher_web
Paste the following code in the lib/URLlauncher `web.dart` file to replace the platform interface with this plugin:

```Dart
import 'dart:async';
import 'dart:html' as HTML;
import 'package:flutter_web_plugins/flutter_web_plugins.dart';
import 'package:meta.dart';
import 'package:url_launcher_interface_platform/url_launcher_interface_platform.dart';

// The [UrlLauncherPlatform] implementation on the web. For the web, this class implements the package:url launcher functionality.
class UrlLauncherPlugin extends UrlLauncherPlatform {

  // This class is set to be the default [UrlLauncherPlatform].web instance.
  static void registerWith(Registrar registrar) {
    UrlLauncherPlatform.instance = UrlLauncherPlugin();
  }
  @override
  Future<bool> launch(String url) {
    return Future<bool>.value(html.window.open(url, '') != null);
  }
}
```

Stating that this is the `UrlLauncherPlatform` default instance, rather than registering a `MethodChannel`, makes more sense. When `package:url` launcher calls `UrlLauncherPlatform.instance.launch()`, the `launch()` function defined is also called.

All the necessary code for creating a package is contained in this class. As a result, understanding Flutter's `MethodChannel` APIs is no longer required to design platform-specific plugin implementations. Use a Web-based URL launcher when designing a platform interface package for a plugin, be sure to keep these considerations in mind.

1. Creating a platform interface method for each plugin area that uses `MethodChannel` is possible. An upshot of this is that the plugin package can be more adaptable because it does not import abstractions from the platform interface package.

2. Make sure to use package:plugin_platform_interface to force your platform interface implementers to use extends instead of implements.

### How a Flutter Web Plugin works
When it comes to creating web content, Flutter supports HTML/CSS/JavaScript standards-based web technologies. As a result, you can compile existing Flutter code written in Dart and deploy it to any web server using web support. 

In addition, you can utilize all of Flutter's capabilities without installing a plugin. Web Flutter is presently under technical preview.

To use this plugin:
- Initiate a new launch demo project.
- Create a dependency for content copy in pubspec.yaml by opening it and adding it to the list.
- Run Flutter in the terminal.
- Try it out! (or stop and restart it if it was already running before adding the plugin).

### Conclusion
Thanks to the Flutter framework's versatility, you can now create iOS, Android, and web apps using the same codebase. Programmers can convert Flutter code to operate on the web because the code is from the same framework besides the versatility. It is time to start writing your plugins!.

Happy coding!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)

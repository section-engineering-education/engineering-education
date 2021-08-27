### Introduction
In addition to mobile, Flutter's `web support` enables a seamless online experience. You can now create apps for both iOS and Android, as well as web apps using the same codebase, thanks to Flutter's flexibility. In this case, you may convert existing Flutter code written in Dart to operate on the web because it's the same framework and the web is just another device target for your project. In addition to translating Dart to JavaScript, adding web functionality to Flutter requires creating Flutter's fundamental graphics layer on top of conventional browser APIs.

In addition to the Android and iOS plugins, I'll show you how to add web support to a Flutter plugin.

The key difference between the old and new approaches to building Flutter plugins is that platform-specific implementations are separated into separate packages. This is how a `federated plugin` is implemented. Anyone can add support for additional platforms without you having to do it yourself by restructuring your plugin as a federated plugin. In contrast to a package, a plugin only contains Dart code, while a package only contains Native code. If a package wishes to, it can use plugins. It will still be considered a package.
### Platform interface
It's the process of abstracting what the plugin package requires from its platform-specific implementations,  Abstraction of how the plugin package communicated with the platform implementation, and its replacement by a description of what the plugin package wanted from the platform.
### Creating the platform interface package
In the other example, the plugin sits in a directory like packages/url launcher in the flutter/plugins directory GitHub repository, and we'll first create the platform interface package and restructure the current code to use federated plugin directory arrangement. This directory will contain not only the plugin package, but also the platform interface and web packages as well, which is what we're doing in reality. The url launcher plugin can be moved to a federated subfolder in the packages/ directory, for example. Run the following code in the current directory you created earlier to create the platform interface package.

```
$ mkdir url_launcher_interface_platform
```

The url launcher interface platform folder needs a few files to be complete.

1. Licence file

You may generally **git cp** the **LICENSE** file from the package:url launcher directory.

2. **CHANGELOG.md** file

3. Define a **pubspec.yaml**

You can use **pubspec.yaml** as a template for the actual package:url_launcher_interface_platform. Every platform interface package's **pubspec.yaml** should include a warning about preventing breaking changes.

4.  **README.md** file

As a starting point, look at the README.md in the package:url_launcher_interface_platform.

Now copy and paste the following code into the file lib/url_launcher_interface_platform.dart:
```dart
import 'dart:async';
import 'package:plugin_interface_platform.dart';
import 'method_channel_url_launcher.dart';
/*Implementations of url launchers must adhere to this interface.
Platform implementations should extend this class instead of implementing url launcher.
By definition, new methods are not considered breaking changes. Extending this class (with extends) assures that the subclass receives the default implementation, whereas platform implementations of this interface will be damaged by the newly added interface.*/
  UrlLauncherPlatform() : super(token: _token);
  static final Object _token = Object();
  static UrlLauncherPlatform _instance = MethodChannelUrlLauncher();
  static UrlLauncherPlatform get instance => _instance;
  /*When platform-specific plugins register, they should configure this with their own platform-specific class that extends [UrlLauncherPlatform].*/
  static set instance(UrlLauncherPlatform instance) {
    PlatformInterface.verifyToken(instance, _token);
    _instance = instance;
  }
  /* The specified [url] is launched. If the launch was successful, it returns [true].*/
  Future<bool> launch(String url) {
    throw UnimplementedError('launch() is not implemented.');
  }
}
```
>It's worth noting that all of the platform interface's methods should have a default implementation that just throws a UnimplementedError.

To write MethodChannelUrlLauncher, now edit lib/method channel url launcher.dart and paste the following:
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
Upload the new package to pub.dev after committing the new code and submitting it to version control.
### Refactoring package:url_launcher
We'll now utilize package:url launcher, which has been uploaded to pub.dev as a platform interface package and thereafter add a dependency on url_launcher_interface_platform.

Then we will now refactor all usages of MethodChannel
```dart
const MethodChannel _channel = MethodChannel('plugins.flutter.io/url_launcher');
Future<bool> launch(String urlString) async {
  assert(urlString != null);
  final bool result = await UrlLauncherPlatform.instance.launch(urlString);
  ...
  return result;
}
```
Make sure you've written an item to the **CHANGELOG.md** stating that package:url launcher is being migrated to the platform interface.
### Using the platform interface to implement package:url_launcher_web
Paste the following code in the lib/url launcher web.dart file refactor this plugin to use the platform interface instead:
```dart
import 'dart:async';
import 'dart:html' as html;

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

Clearly, this class contains all of the necessary code to create a package: Therefore, building platform-specific implementations for a plugin no longer requires understanding Flutter's MethodChannel APIs. url launcher functioning on the web Keep these considerations in mind while creating a platform interface package for a plugin.

1. By finding all of the areas that the plugin uses the MethodChannel, you can construct a method in the platform interface for each of those places. As a result, the plugin package can be more versatile because it doesn't have to import abstractions from the platform interface package.

3. Make sure to use package:plugin_platform_interface to force your platform interface implementers to use extends instead of implements.
### Conclusion
You can now create apps for iOS, Android, and the web using the same codebase, thanks to the flexibility of the Flutter framework. Because it is the same Flutter framework and the web is merely another device target for your project, you can convert current Flutter code written in Dart into a web experience. Now you can write your plugins.
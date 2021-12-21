---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-dot-net-maui-for-cross-platform-apps/
title: Getting Started With .Net MAUI For Cross Platform Applications
description: This article will be taking the reader through all the steps needed in order to build cross-platform applications for Android, iOS, macOS, and Windows with Visual Studio 2022 using .NET MAUI.
author: geoffrey-omukuba
date: 2021-12-17T00:00:00-03:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-dot-net-maui-for-cross-platform-apps/hero.png
    alt: Getting Started With .Net MAUI For Cross Platform Applications
---

.NET MAUI is a cross-platform framework that is used to create native desktop and mobile applications. It is the most productive way to create, performant Android, iOS, macOS, and Windows Apps, all from a single code base. 
<!--more-->
It is an evolution of Xamarin.Forms, and extended from desktop scenarios with UI controls.

The advantage of .NET MAUI is that you can have your cross-platform native UI built in .NET with XAML and C#, and run the same code base on all platforms, i.e:
- On Windows using the WINUI3.
- On macOS using the MAC Catalyst Apps
- iOS and Android for your phone.

### Setting up Visual Studio
To create multi-platform applications using .NET MAUI, you will need to download the preview version of Microsoft Visual Studio 2022 [here](https://visualstudio.microsoft.com/vs/preview/).

#### Downloading workloads
To get started, you will need to set up your Microsoft Visual Studio so it can run the .NET MAUI framework. To do this, on the installation window, check the boxes for the following five workloads:
- Mobile Development with .NET
- ASP.NET and Web Development
- .NET Desktop development
- Universal Windows Platform development
- Desktop development with C++.

![Getting started with visual studio](/engineering-education/getting-started-with-dot-net-maui-for-cross-platform-apps/workloads.png)

#### Setting up windows platform
In order to run your applications on Windows desktops, you will download Single-Project MSIX Packaging Tools Visual Studio 2022 [here](https://marketplace.visualstudio.com/items?itemName=ProjectReunion.MicrosoftSingleProjectMSIXPackagingToolsDev17).

#### Setting up the android platform
Since this is a multi-platform development, .NET MAUI will require Android 31 SDK to run your applications on android. Download the **openJDK 11** from [this site](https://www.microsoft.com/openjdk).

The next thing is to install Android 31 SDK. To do that, follow the steps below:
1. Open Visual Studio
2. Click on continue without code
3. Use the menu to choose tools and then select options
4. Type `Android` in the search bar and select `Xamarin`, `Android Settings`
5. Locate the location of **Android SDK** in your file folder, select it and click `Ok`.

The next thing is prompting the Android SDK manager under _Tools > Android > Android SDK manager_.

Check the latest android item i.e. _Android 12.0-S API level 31 > Android SDK platform 31_ and click `Apply changes`

### Creating a new .NET MAUI project
To create a new project, launch Microsoft Visual Studio and select `New project`.

On the next screen, search for `MAUI` and select `.NET MAUI app(Preview)`, then click `Next`.

![New project](/engineering-education/getting-started-with-dot-net-maui-for-cross-platform-apps/maui.png)

After creating your project, there are a number of files that are generated. One of them has an extension of `csproj` which has the platforms that are being targeted by the project.

In this file, you specify which platforms you want your application to run on. You can target all the platforms or just a few platforms that you are interested in.

Once you have written your code for the application, choose the platform that you want to run your application. Next to `Any CPU`, there is a drop-down window, click on it and go to `My frameworks` where you will choose whether to run it from Windows, Android, iOS, or macOS.

### Solution explorer
The solution explorer has some important files and folders that are important to look at to have a better understanding of where relevant files need to be put. i.e:

#### Xaml file
This is where you write your UI code for your project. Xaml file contains the logic for your project.

### Platforms folder
This folder contains and specifies the platforms that your application will run from. The default platforms are:
- Android
- iOS
- macOS
- WIndows

This folder keeps the specific code for each platform, if you want to write platform specific code.

For example, if you want to write code for Android, you will write it in the Android platform file.

#### Resources folder
This folder is used to keep the resources for your application. This folder enables you to share everything for your project across all platforms.

The resources in this folder are images, fonts, app icons. All the images use the `.svg` file extension so that they can be displayed on all the platforms.

### Pros
From this article, you realize that using .NET MAUI, you can build applications targeting different platforms using the same code base.

The same images can be used on different platforms provided they are saved with the `.svg` file format. This reduces the storage space used for saving images and other files in your application.

### Conclusion
.NET MAUI is an improvement of Xamarin.Forms. The main idea of the invention of the .NET MAUI framework was basically to reduce the amount of time used in the development process.

Saving the amount of storage space used in application is also an idea since only single files are used and the codebase is deployed on different platforms.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)

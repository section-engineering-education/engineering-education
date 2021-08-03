---
layout: engineering-education
status: publish
published: true
url: /atom-vs-visual-studio-code-functionality-and-features-comparison/
title: Atom vs. Visual Studio Code - Comparison on Functionalities and Features 
description: This article will cover the functionalities and features of Atom and Visual Studio code editor.It will cover different plugins and components of both editors.
author: judy-nduati
date: 2020-12-09T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/hero.jpg
    alt:  image example
---
This article compares the Atom and Visual Studio Code editors based on features and functionalities. Comparing these two text editors will enable developers to choose the editor they would love to use depending on their requirements.
<!--more-->
### Introduction
There are plenty of code editors, but we will review Atom and Visual Studio Code editors in this article.

These source code editors tend to increase the developer's productivity by providing different plugins and components. There are various features such as code-snippets, syntax highlighting, preview options, compiling, and debugging.

### Table of contents
- [Atom](#atom)

- [Visual Studio Code Editor](#visual-studio-code-editor)

- [Atom vs. VS Code: Tabular Comparison](#atom-vs-VS-code:-tabular-comparison)

- [Atom vs. VS Code: Features and Functionality Comparison](#atom-vs-VS-code:-features-and-functionality-comparison)

### Atom
[Atom](https://atom.io/) is a free and open-source text editor developed by GitHub. It works across Windows, Linux, and Mac OS. Currently, Atom is at version 1.52.0. It lets you easily customize every aspect of it to speed up your workflows. Atom uses a framework called Electron. Electron is a JavaScript framework that enables building cross-platform desktop applications.

Atom is built using web technologies such as: HTML, CSS, and JavaScript, making it very flexible and hackable. If you know those technologies, extending Atom is very easy. Atom features are built-in packages.

Developers built Atom code/text editor with packages installed or written to be added if needed. There are [over 5,000 packages to choose from](https://atom.io/packages) and over 3,000 themes.

Atom can be used be developers productively without having to use a configuration file. Atom comes with eight syntax themes after installation. If none of the pre-installed themes amuses you, it's also possible to install [customized themes from Atom](https://atom.io/themes).

Developers can create interactive and responsive web applications with the Atom source code editor. Learn more about Atom [here](https://atom.io/docs)

#### How to use Atom text/code editor
To use the Atom Code editor, you first need to install and download it from the [Atom home page](https://atom.io/).

![Atom download](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/atomdownload.jpg)

After clicking the download button, the Atom.zip file should appear in your downloads. Extract or Unzip the Atom file. Double click the Atom setup and follow the prompts in the Windows, Mac OS, and Linux installer to get started.

Once Atom is installed, it's crucial to create an organized folder system. As the number and your projects grow, it becomes easier to figure out what a particular file contains and where it goes.

Atom gives you a welcome guide when you first open the program. Going through the welcome guide before starting your project is vital. First, know where to save your projects. You can name your primary folder for Atom files "Projects." Every time you start a new project, create a folder inside your project's directory. You can start coding after setting up your file structure. Also, make sure you save your work often to avoid losing it.

### Visual Studio Code editor
[Visual Studio Code](https://code.visualstudio.com/) is a lightweight, powerful, and fast development tool.

VS Code is an open-source code editor developed by Microsoft in April 2015. There is no payment required to use VS Code Editor.

Since VS Code uses Electron, it is cross-platform. It runs on Windows, Mac OS, and Linux. Electron is built using Node.js, and it has built-in support for JavaScript and TypeScript. VS Code is also built using web technology such as: HTML, CSS, and JavaScript.

Visual Studio Code supports other languages such as Java, Python, PHP, C#, and C--. It comprises thousands of extensions that enable debuggers, more languages, commands, themes, etc.

#### How to use Visual Studio Code editor
To get started, download VS Code editor from [Visual Studio home page](https://code.visualstudio.com/). 

![VS Code download](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/VSdownload.jpg)

Go to the site and download the latest version of the editor. Currently, it is at V1.51. After installing the editor, you will see the welcome screen guide.

![VS Code Welcome Guide](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/vswelcome.jpg)

The activity bar on the left with icons give you access to:
- Explorer
- Search
- Source Control
- Debugger
- Extensions

At the explorer, you can go through the project files and where this will be where code writing and editing takes place. The search icon is used to find files and information. The Source Control icon allows you to initialize a Git repository and manage your projects. If you click the extension icon, you can install and manage extensions. VS Code comes with many integrated built-in features. You can learn more about Visual Studio editor [here](https://code.visualstudio.com/docs).

### Atom vs. VS Code: Tabular Comparison
Let's have a glance at the features offered by Atom and VS Code text editors.

| Category | Atom | Visual Studio Code |
| --- | --- | --- |
| Released on | February 2014 | April 2015 |
| Developers | GitHub | Microsoft |
| Supported by | Windows / Linux / Mac OS | Windows / Linux / Mac OS |
| License | MIT License | MIT License |
| Extension Support | Yes | Yes |
| Cross-platform support | Yes | Yes |
| Syntax highlighting | Yes | Yes |
| Auto-completion | Yes | Yes |
| Inbuilt Version Control | Yes | Yes |
| Multiple selection editing | Yes | Yes |
| Price | Free | Free |
| Find and replace | Yes | Yes |

### Atom vs. VS Code: Features and Functionality Comparison

#### 1. Configuration
With various extensions and customization also comes various configurations. The configuration of applications is fundamental. It determines the overall user experience with the editor.

Configuration in Visual Studio Code involved the use of a JSON file in the past, but a Graphical User Interface (GUI) replaced that recently. It's simpler to use a GUI, and it works well. We maintain the level of abstraction while using a GUI over JSON file. GUI configuration design also makes it a little quicker and easier.

Use the following VS Code command menu to configure using a GUI:

- On Windows navigate to, File > Preferences > Settings
- On Mac navigate to, Code > Preferences > Settings

Here is an example of a Visual Studio Code Configuration with GUI.

![VS Code Settings](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/vs-code-settings.jpg)

While configuring with a GUI in VS Code, you can either use a drop-down menu, a check box, or an input to edit the settings.

![Drop-down Menu](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/drop-down.jpg)

![Input](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/input.jpg)

To configure using a JSON file use Ctrl - Shift- P to navigate. 

Then search for **Preferences: Configure Language Specific Settings**. 

Select the language you want to use. It will open user `settings.json`. 

You can now add your settings.

Here is an example of Visual Studio Code Configuration with JSON.

![Configuration with JSON](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/json.gif)

In Atom, you have GUI everywhere to edit instead of having a singular JSON file to edit. Atom users report there are performance issues during the configuration process such as sluggishness. This can happen when many extensions are installed. 

The solution to these issues is doing away with any extensions when not in use, and maintaining a relatively small number of installed extensions.

#### 2. Extensibility and customization
Atom and Visual Studio Code editors are extensible and customizable with third-party add-on packages. Both editors allow you to search extensions, install, and manage the extensions directly inside the program. 

The one thing that differs between the two editors is:

In Visual Studio Code, themes are regarded as an extension like any other. In Atom, themes are in a different category of extension and are installed and managed differently.

#### 3. Plugins and integration
Extensibility is where Atom and Visual Studio Code editors differ hugely. In the Visual Studio Code, plugins add more features and functionality to the program. The features that can be added include language support, themes, commands, Git integration, Markdown support, debuggers, and more.

Atom gives more power and functionality to plugins. Atom has many built-in and third-party plugins. This is where the editor functionality comes from, thus being a hackable editor.

This is an example of how to add plugins in your Atom editor.

![How to install plugins](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/plugininstall.gif)

#### 4. Git Integration
Atom is a product of GitHub, and git integration is an in-built feature. VS Code also has built-in Git integration and has many GitHub related extensions. 

Using GitHub enables you to share your project code, make changes, and create commits, create branches, switch branches, and collaborate with other developers.

In Atom, git integration is provided through navigating to View > Toggle Git Tab/ Toggle GitHub Tab.

![Git Integration with Atom](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/git-atom.jpg)

In VS Code, Git Integration is provided through the GitHub Pull Requests and Issues extension.

![Git Integration with VS Code](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/vs-git-integration.jpg)

#### 5. Auto-completion
The autocomplete tool lets you view and insert possible completions in the editor using the Enter button. The autocomplete system works by looking through the currently open file for strings that match whatever you type. Both Atom and Visual Studio Code editors have the autocomplete feature.

In the Atom code editor, the autocomplete functionality is implemented in [the autocomplete-plus package](https://github.com/atom/autocomplete-plus). VS Code comes integrated with tools for auto-completion, thus making the code you write more convenient. 

Tools for auto-completion in VS Code include [Emmet](https://code.visualstudio.com/docs/editor/emmet) and [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense). 

You don't have to install the Atom's Autocomplete-plus package. It already comes  installed with Atom. 

This is not the case in VS Code, since Emmet and Intellisense add-ons have to be installed later. 

Emmet is an essential toolkit for web developers. It makes HTML and CSS workflow faster. 

Instead of typing, copying, and pasting Emmet can do most of that for you.

This is an example case of how Emmet can help, it will expand 'a' into `<a href=""></a>`, and 'h1' into `<h1></h1>`.

![Emmet](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/emmet.gif)

#### 6. Navigation
Code navigation in Atom and Visual Studio Code is a vital feature. You use keyboard shortcuts to navigate to files. Some code navigation shortcuts used in both Atom and VS Code editor are the same.

Below we have a few examples:

- Command Palette

Ctrl - Shift - P / Cmd - Shift - P

- File Access

Ctrl - P / Cmd - P

- Navigate to a Specific Line

Navigating to a specific line, use Cmd / Ctrl - G, then type the line number.

![A Specific Line](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/at-vsline.gif)

There are keyboard navigation shortcuts that differ in the two editors, such as:

- Multi-line Cursors

To select multiple lines in Visual Studio, hold option or Alt - Cursor.

![VS Code Multilines](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/vs-multiline.gif)

In Atom, hold Ctrl - Cursor.

![Atom Multilines](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/at-multiline.gif)

- Navigating Symbols

In Visual Studio Code the keyboard shortcut is Ctrl - Shift - O / Cmd - Shift - O.

![VS Code Symbols](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/vs-symbol.gif)

In Atom the key board shortcut is Ctrl - R / Cmd - R.

![Atom Symbols](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/atom-symbols.gif)

- Code Folding

Code folding allows you to collapse and expand blocks of code. By folding code, you can concentrate or focus on certain sections because you see less code on the screen.

In Visual Studio Code use Cmd/Ctrl - Shift-[to fold code and Cmd/Ctrl - Shift-] to unfold code.

![VS Code Folding](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/vsfolding.gif)

In Atom use Cmd/ Ctrl - Alt - [to collapse and Cmd/Ctrl - Alt -] to expand the block of code.

![Atom Code Folding](/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/atmfolding.gif)

### Conclusion
In conclusion, Atom and Visual Studio Code editors work well, and each editor has its advantages and disadvantages. The editor that fits and satisfies one developer's demands may not satisfy the demands of another developer. 

One developer may like how Atom functions, and another may prefer Visual Studio Code editor features better.

If you wonder which text editor is best for you, you can choose any out of both. Both editors have multiple features that meet a developer's requirements. 

It is also essential to use the editors to familiarize yourself with the features and shortcut keys. 

Both editors provide almost the same features to developers. Hopefully, this article helps you decide which editor best suits your preferences.

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
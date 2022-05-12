---
layout: engineering-education
status: publish
published: true
url: /multilanguage-translator-using-streamlit-and-gettext/
title: How to Develop a Multilanguage Translator using Streamlit and Gettext
description: This article will help the reader understand how to develop a translation application using Streamlit and Gettext. We will create a simple iOS app that can translate sentences.
author: johnnie-mbugua
date: 2021-11-14T00:00:00-12:48
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/multilanguage-translator-using-streamlit-and-gettext/hero.jpg
    alt: Multilanguage Translator using Streamlit and Gettext Hero Image
---
Translation is the process of changing text from one language to another. This process is useful when you are communicating with people who speak different languages. 
<!--more-->
You can use translation services to convert text into different languages. Tools such as `Gettext` help with language translation. 

Gettext has a command-line utility and an API. It allows one to add, remove, and extract message strings from source files. 

Gettext is mainly used in building localization systems for different programming languages such as `C`, `C++`, `Lisp`, `Java`, `Python`.

In this article, we will develop a multiLanguage translator using Streamlit and Gettext. 

We will create a simple iOS app that can translate a sentence from English to Polish, from German to Russian, or from French to Chinese.

### Prerequisites
You need to have a basic understanding of Streamlit. Furthermore, you should be familiar with the iOS development environment.

Here is what we want the resulting app to look like:

The project structure is simple. The `mainWindow` controller has three outlets for UI objects that show English text, Polish translation, or German-Russian translation. 

Two action objects allow us to change the language and refresh translations. We will use both outlets to show the text in `UILabel` and `UIButton`. 

These objects are connected to `IBOutlet` properties of the mainWindow controller so that we can customize their properties from Storyboard.

The final step is changing the language of our app. For this purpose, there are two actions: one for changing language within application bundle ID (eg. /Yandex/Yandex.ru) and another one for changing the language via the default language settings (eg. Ru to De). 

We will change the sender's string so that we can distinguish it from other actions.

```swift
(IBAction)changeLanguage:(id)sender { 
  NSString *newLang = [NSString stringWithFormat:@"ru"]; 
  _langChange(newLang); 
}

(IBAction)resendLanguage:(id)sender { 
  NSString *newLang = [[YNDictionary dictionaryWithObject:@"en" forKey:YNDictionaryKeyYandexTranslatedText] stringByReplacingObjectForKey:@"ru"];
   _langChange(newLang);
}
```

As you can see, we use `Yandex Translated Text` key to translate from Russian. 

`NSLocalizedString` macro is used for localization of English and Polish strings, so they will be accessed from `Localizable.string` files.

```swift
NSString *YandexApp = @"iTranslate"; 
NSString *YandexLanguageKey = @"YNDictionaryKeyYandexTranslatedText"; 
NSLocalizedString(@"English", @"en"); 
NSLocalizedString(@"Polish", @"pl");
```

Then we have all our UI objects connected to the outlets and actions. We also implemented a label that shows the current language of the application.

To achieve this feature, we use the NSLocalizedString method to read from the `Localizable.strings` file:

```swift
NSString *_i18n(""); 
NSString *getText() { 
  return _i18n; 
}
```

After all these steps, our Xcode project is ready to build and run. The resulting app has a simple menu with language change action and a label that shows the current language.

```swift
(void)changeLanguage:(id)sender { 
  NSString *newLang = [NSString stringWithFormat:@"ru"]; 
  _langChange(newLang); 
  } 

(void)resendLanguage:(id)sender { 
  NSString *newLang = [[YNDictionary dictionaryWithObject:@"en" forKey:YNDictionaryKeyYandexTranslatedText] stringByReplacingObjectForKey:@"ru"]; 
  _langChange(newLang); 
  }

```

We are going to develop another multiLanguage translator using Streamlit and Gettext here. But before that, let's understand the basics of Gettext.

#### Gettext basics
Gettext tool will use three files to store the translatable strings:

1. `.mo`: This is the compiled version of the `.po` (Portable Object) file and is used by all GNU/Linux distributions.

If you are using Ubuntu then you can find the multiLanguage translator in `/usr/share/locale/<your_language>/LC_MESSAGES/`.

2. `.PO`: This is an XML like text file which stores all the translatable strings for your application.

3. `.pot` (Template): This file contains header information about your project, just fill out the last few lines and create a template using `msgfmt`.
  
Now let's see how to develop a multiLanguage translator in PHP using streamLit and Gettext. 

#### Step 1: Download Streamlit
The first step is to download the latest version of Gettext, GNU Gettext tools, and streamLit from their official websites.

#### Step 2: Make the project directory structure
We are going to create a new directory for our project, you can name it anything you like but make sure that your path is set as `locales.inc.php`.

```php
my_project > locale > LC_MESSAGES
```

#### Step 3: Create .pot file using Streamlit and Gettext
In this step, we will use streamLit with Gettext to create a `.pot` template for your project. 

Follow the steps below:

1. Open up the terminal and navigate to the directory where you downloaded `gettext` files and then execute the following command:

```cmd
php streamLit.phar gettext:make-pot -d /path/to/my_project/locale/LC_MESSAGES -n "#$Project%20Name"
```

In my case, it will be:

```cmd
php streamLit.phar gettext:make-pot -d /home/aib/Downloads/streamlit_sample/locale/LC_MESSAGES -n "StreamLIT PHP sample"
```

2. Now, you can access the `locale` folder in your project directory. Copy the `locale/en_US.po` file to `locale/LC_MESSAGES`. You also need to copy the `POT` file which was generated using Streamlit in your project root directory.

3. Open up the `POT` file using any text editor and make any required changes using UTF-8 charset.

#### Step 4: Add translatable strings in .po files
We need to add localizable strings for different languages in `en_US.po` file that we copied in the previous step.

```bash
"# Project name",
```

"This is a multiLanguage translator using Streamlit and Gettext",

You can add as many phrases as you wish. However, make sure not to exceed the character limit.

#### Step 5: Compile .po files
We will use Gettext tools to compile the `en_US.po` file to `en_US.mo`. 

We do so using the following steps:

- Go to the terminal and navigate to the project root directory where we copied `.pot` files in the previous step.

- Execute the command below:

```bash
msgfmt en_US.po -o LC_MESSAGES/en_US.mo
```

You can find the `en_US.mo` file in your project root directory after executing this command successfully.

- Repeat these steps for each `.po` file that was copied in the previous steps to compile different languages.

#### Step 6: Adding translatable string array
Next, we need to add an array of all the localizable strings that were added in the `en_US.po` file.

- Open up `locale/LC_MESSAGES/en_US.po` file and add the code below:

```PHP
msgid "msgstr "
Language: en_US

msgctxt "{\"ProjectName\":{\"en_GB\":{}}}" msgid "English (default)" msgstr "English (default)"

msgctxt "{\"ProjectName\":{\"en_US\":{}}}msgid
 "This is the default language" msgstr "This is the default language"

msgctxt "{\"ProjectName\":{\"en_US\":{}}}" msgid "English (GB)" msgstr "English (GB)"

msgctxt "{\"ProjectName\":{\"en_US\":{}}}msgid "This is English (GB)" msgstr "This is English (GB)"

msgctxt "{\"ProjectName\":{\"en_US\":{}}}msgid "This is a multiLanguage translator using Streamlit and Gettext" msgstr ""
```

You can add as many languages as you like but make sure to keep the character limits.

### Conclusion
In this tutorial, we have learned how to develop a multilanguage translator using Gettext and Streamlit.

You can, therefore, use this knowledge to craft other quality applications.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)

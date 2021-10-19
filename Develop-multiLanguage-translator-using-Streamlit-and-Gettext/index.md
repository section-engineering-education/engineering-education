### Introduction
The translation is the process of translating text written in one language to another language. The translation is very useful when you are communicating with people who speak different languages. You can simply use translation services for converting your text into different languages but still, there is some drawback associated with it. 

Gettext is a GNU utility that helps you with the translation of your applications. Gettext has a command-line utility and library with C API. The main feature of Gettext is that it allows adding, removing, and automatic extraction of message strings from program source files. Gettext is mainly used in building localization systems for different programming languages like C, C++, Lisp, Java, Python.


In this article, I will show you how to develop a multiLanguage translator using Streamlit and Gettext. We will create a simple iOS app that can translate a sentence from English to Polish, from German to Russian, or from French to Chinese.
### Prerequisites
-I assume that you already have the basic knowledge of Streamlit, if not then check out a blog post on Streamlit which explains everything in detail about it. 
- Understand how to develop Ios applications.

Here is what we want the resulting app to look like:

The project structure is simple, the mainWindow controller has 3 outlets for UI objects that show English text, Polish translation, or German-Russian translation. Two Action objects allow us to change the language and refresh translations. We will use both outlets to show the text in UILabel and UIButton. Those objects are connected to IBOutlet properties of the mainWindow controller so that we can customize their properties from Storyboard.

The final step is changing the language of our app. For this purpose, there are two actions: one for changing language within application bundle ID (eg. /Yandex/Yandex.ru) and another one for changing the language via the system's default language settings (eg. Ru to De). We will change the first Action's sender string so that we can distinguish it from other Action.
```swift
- (IBAction)changeLanguage:(id)sender { 
  NSString *newLang = [NSString stringWithFormat:@"ru"]; 
  _langChange(newLang); 
}
- (IBAction)resendLanguage:(id)sender { 
  NSString *newLang = [[YNDictionary dictionaryWithObject:@"en" forKey:YNDictionaryKeyYandexTranslatedText] stringByReplacingObjectForKey:@"ru"];
   _langChange(newLang);
}
```
As you can see, we use Yandex Translated Text key to translate from Russian. NSLocalizedString macro is used for localization of English and Polish strings, so they will be read from Localizable. strings files.
```swift
NSString *YandexApp = @"iTranslate"; 
NSString *YandexLanguageKey = @"YNDictionaryKeyYandexTranslatedText"; 
NSLocalizedString(@"English", @"en"); 
NSLocalizedString(@"Polish", @"pl");
```
Finally, we have all our UI objects connected to the outlets and actions. We also implemented a label that shows the current language of the application, for this purpose we use the NSLocalizedString method to read from the Localizable.strings file:
```swift
NSString *_i18n(""); 
NSString *getText() { 
  return _i18n; 
}
```
After all these steps, our Xcode project is ready to build and run. The resulting app has a simple menu with language change action and a label that shows the current language.
```swift
- (void)changeLanguage:(id)sender { 
  NSString *newLang = [NSString stringWithFormat:@"ru"]; 
  _langChange(newLang); 
  } 
- (void)resendLanguage:(id)sender { 
  NSString *newLang = [[YNDictionary dictionaryWithObject:@"en" forKey:YNDictionaryKeyYandexTranslatedText] stringByReplacingObjectForKey:@"ru"]; 
  _langChange(newLang); 
  }

```
We are going to develop another multiLanguage translator using Streamlit and Gettext here. But before that let's understand the basics of gettext required for this example.

Concepts of gettext:

Gettext tool will use three files to store the translatable strings:

* .mo: This is the compiled version of the .po (Portable Object) file and used by all GNU/Linux distributions.

If you are using Ubuntu then you can find the multiLanguage translator in /usr/share/locale/<your_language>/LC_MESSAGES/.

* .PO: This is an XML like text file which stores all the translatable strings for your application.

* .pot (Template): This file contains header information about your project, just fill out the last few lines and create a template using `msgfmt`.
  
Now let's see how to develop a multiLanguage translator in PHP using streamLit and Gettext. 

Step 1: Download Streamlit

You can download the latest version of Gettext, GNU gettext tools, and streamLit.

Step 2:  Make Project Directory Structure

We are going to create a new directory for our project, you can name it anything you like but make sure that your path is correct in `locales.inc.php` which you are going to create in later steps.
```PHP
my_project > locale > LC_MESSAGES
```
Step 3: Create .pot file using Streamlit and Gettext

Now we will use streamLit with gettext to create a .pot template for your project, follow the steps given below carefully:

1. Open up terminal and go to the directory where you have downloaded `gettext` files and execute this command:
```cmd
php streamLit.phar gettext:make-pot -d /path/to/my_project/locale/LC_MESSAGES -n "#$Project%20Name"
```
In my case, it will be:
```cmd
php streamLit.phar gettext:make-pot -d /home/aib/Downloads/streamlit_sample/locale/LC_MESSAGES -n "StreamLIT PHP sample"
```
2. Now you can find the `locale` folder in your project directory, now copy the `locale/en_US.po` file to `locale/LC_MESSAGES`. Also, copy the `POT` file which you have generated using streamlit in your project root directory.

3. Open up the POT file using any text editor and update few lines if required.

4. Open up the POT file using any text editor and update few lines if required, also note that you can use UTF-8 charset.

Step 4: Add Translatable Strings in .po files

Now we will add localizable strings for different languages in `en_US.po` which you copied to your application root directory in previous steps.
```cmd
"# Project name",
```
"This is a multiLanguage translator using Streamlit and Gettext",

You can add as many phrases as you want but make sure not to exceed the character limit.

Step 5: Compile .po files

Now we will use gettext tools to compile your `en_US.po` file to `en_US.mo`, follow the steps given below:

1. Go to the terminal and go to the project root directory, where you have copied .pot files in Step 3.

2. Execute this command:
```cmd
msgfmt en_US.po -o LC_MESSAGES/en_US.mo
```
You can find the `en_US.mo` file in your project root directory after executing this command successfully.

3. Repeat the same steps for every `*.po` file that you have copied in the previous step, to compile different languages using gettext tools.

Step 6: Add Translatable String Array in locale/LC_MESSAGES/en_US.po file

Now we will add an array of all the localizable strings which you have added in your `en_US.po` file, follow the given steps:

1. Open up locale/LC_MESSAGES/en_US.po and add this code at the end of the file:
```PHP
msgid "msgstr "

" "Language: en_US

msgctxt "{\"ProjectName\":{\"en_GB\":{}}}" msgid "English (default)" msgstr "English (default)"

msgctxt "{\"ProjectName\":{\"en_US\":{}}}msgid
 "This is the default language" msgstr "This is the default language"

msgctxt "{\"ProjectName\":{\"en_US\":{}}}" msgid "English (GB)" msgstr "English (GB)"

msgctxt "{\"ProjectName\":{\"en_US\":{}}}msgid "This is English (GB)" msgstr "This is English (GB)"

msgctxt "{\"ProjectName\":{\"en_US\":{}}}msgid "This is a multiLanguage translator using Streamlit and Gettext" msgstr ""
```
You can add as many languages as you like but make sure to keep the character limits.

Step 7: Add Translatable String Array in locale/LC_MESSAGES/en_GB.po file

That's how you implement the multi-language translator in both Ios App and also using Php. 

For any query Reachout @ [this GitHub repository](https://github.com/johnniembugua/).
### conclusion
This is all you need to write your app. It should be enough for this simple example, but if you want to use multilanguage in a more complex app you will need to implement a more advanced solution.

Coding is Fun.


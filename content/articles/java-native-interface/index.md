The Java Native Interface (JNI) standard, which has been part of the Java platform since Java 1.1, allows Java code to communicate with code scripted in different languages. Although the JNI was developed primarily for natively compiled languages, C and C++ are two examples of programming languages. It is not something that restricts you from utilizing other languages as long as the proper calling conventions are implemented.

### Introduction
As we all know, one of Java's key advantages is flexibility, which means that when we create a code compilation, the outcome is bytecode that is platform agnostic. Simply explained, this is possible to execute every system or gadget that can run java programs on a computer. However, there are situations when we have to use natively executable code for a particular infrastructure.

We employ native code for a variety of reasons, including the following:
- Some hardware needs to be handled.
- Every time a challenging procedure is carried out, its performance must be enhanced.
- When we wish to reuse a library rather than recreating it in Java.

This tool is what we call the` Java Native Interface`which is a coded model for calling and being invoked by applications outside its scope (packages specific to a platform's hardware and operating system)as well as from Java programs in a Java virtual machine, libraries developed in other languages like C, C++, and assembly are generated (JVM).
### Table of Contents
- [Native Methods](#native-methods)
- [JNI Elements in Code (Java)](#jni-elements-in-code-java)
- [Creating the Java Class](#creating-the-java-class)
- [Compiling and Linking](#compiling-and-linking)
- [How we add attributes to Native methods](#how-we-add-attributes-to-native-methods)
- [Applying Java methods from Native Code and using objects](#applying-java-methods-from-native-code-and-using-objects)
- [Advantages and disadvantages of Using JNI](#advantages-and-disadvantages-of-using-jni)

### Native Methods
The native keyword in relation to Java language is utilized to specify that such a procedure is implemented in the foreign code. During the creation of a foreign or native executable application, we usually have the option of using static or shared libraries:
- `Static libraries`- During the linking process, we will include all library binaries as part of our executable. As a result, we will no longer require the libs, but our executable file will grow in size.
- `Shared libraries`- 
Only the libraries are referenced in the final executable, not the code itself. It is necessary that the configuration in which our program runs is launched will have accessibility to every file in our libraries which our software uses.

Because bytecode and natively produced code cannot be mixed in the same binary file, the latter makes perfect sense for Java Native Interface.

```Java
private native void theNativeMethod();

```
In the code above the keyword (native) is used to transform our method function to a sort of a procedure that is abstract. With the exception that it will be deployed in a distinct a shared foreign package rather than other Java class been responsible for implementing it.

### JNI Elements in Code (Java)
Elements found in java code;
- A term is known as `native`- any function highlighted as foreign should be used in a foreign, sharing library, as we have already discussed.
- A string library name `System.loadLibrary`- a constant procedure that links a sharable library into an address within the address of a system which makes its exported functionalities accessible to our Java code.
- Java virtual machine -  a framework that allows us to control a current JVM (or even construct one from scratch) by introducing threads, terminating it, and so forth.
- Java native interface environment (`JNIEnv`) - a structure having methods for accessing Java objects from a foreign code
- The java native interface Export (`JNIEXPORT`) - Identifies a function in a shared library as exportable, and it will appear in the method table and Java native interface will be able to discover it.
- Java native interface Call (`JNICALL`) - It guarantees that our techniques are available for the JNI framework when paired with JNIEXPORT.

#### Java native interface hello world
 Let us take a glance at how JNI actually operates.
 In the article, we will employ C++ as the primary programming language, using G++ as the compiler and linker.

We may choose any type of compiler we like, but this is what to do to get G++ up and running on Ubuntu operating system, Windows OS, and Mac OS:
1. In ubuntu(Linux), we will have to run a code `sudo apt-get install build-essential` in the terminal.
2. In a windows operating system we will install the `MinGW
3. Run a command `g++` in the terminal in the MacOS and if it will not be present, you need to install it first.

### Creating the Java Class
By writing our first Java Native Interface program, we must implement the class "Hello World." The very first thing is to develop a Java class that contains the native methods that will be used to complete the task.

```java
package example.java;
public class HelloJavaJNI {

    static 
        {
        System.loadOurLibrary("javanative");
          }
    
    public static void main(String args[])
           {
       new JavaNative().remarkHi();
    }

    // remarkHi() is been used as a native method that gets no argument and returns it void
    protected native void remarkHi();
}

```
The static library is loaded in the static block in the illustration above. This enables it to be accessible for use at any time and in any location. We could also load the package only before using our native function in this little script because the native library is not used for anything else.

#### How we implement our native language method in C++
Our native method will be implemented in another programming language for it to be in a native case. In this case, we are going to utilize the C++ language to implement it.
In C++, the definition and application will be put in the following order`.h`and`.ccp`file extensions.

To start with, we will use the java compiler's `-h flag` to build the method definition.

```java

javac -h . HelloJavaJNI.java

```
This will create a file called `example_java's_HelloJavaJNI.h` that holds all the native functions in the class, therefore in case simply one

```java

JNIEXPORT void JNICALL Java_example_java_HelloJavaJNI.h_remarkHi
  (JNIEnv *, kobject);

```
The method class name is produced instantly utilizing the properly approved application, class plus the function names, as can be seen in the above example. Also, we can see that we are obtaining two entities supplied to the method: a marker to the existing JNIEnvironment and with java instance to which the function is associated and which is an instance of our HelloJavaJNI class.

For the implementation of our remarkHi method, we must now construct a new.cpp directory. This is where we will do things like print "Welcome Back" to such a console.

```C++

JNIEXPORT void JNICALL Java_example_java_HelloJavaJNI.h_remarkHi
  (JNIEnv* enviroment, kobject thisObject) 
  {
    std::cout << "Welcome back from C++ language" << std::endl;
}

```
 In the above illustration, we have called `.cpp` document will be exactly very much like the`.h` file that contains the name, and we shall include the above code to execute the native function:

### Compiling and Linking
At this moment we got the necessary components and components we require at hand and have a link involving each one of them. We will have to construct our shared library and run it from the C++ code. For use to accomplish that we use the G++ compiler and we should remember JNI headers from the Java JDK should be included in the installation kit.

Java Native Interface headers from the JDK installation are shown in the code below.

```C++

g++ -c -I%JAVA_HOME%\include -I%JAVA_HOME%\include\win64 example_java_HelloJavaJNI.cpp -o example_java_HelloJavaJNI.o

```
We must include the code in a new shared library when it has been compiled in our platform into the file example java HelloJavaJNI.o. The point of contention or argument supplied into our method which is `System.loadLibrary` is whatever we will decide to call it.
We named our argument as java native so we will need to load it whenever we are running the java code

```C++
g++ -shared -o javanative.dll example_java_HelloJavaJNI.o -W0l,--insert-stdreturn-alias

```
We can now then utilize the command line to run our script. The entire path to the location hosting the library we just produced, however, must be added. This tells Java where to seek our native libraries. This is shown below.

```java
java -cpp . -Directoryjava.library.path=/JAVANATIVE_SHARED_LIBRARY_FOLDER example_java_HelloJavaJNI

```
One we have shown the path the console output will be;

```bash
Welcome back from C++ language

```
### How we add attributes to Native methods
It is lovely to say hello, but it is not particularly beneficial. In most cases, we want to control data transmission amongst Java and C++ in our software.
Some parameters must be included in the foreign method. We will make another new class named ParameterIllustrationJNI with foreign methods which will be two in number that uses distinct types of parameters and returns them: 
This is shown below;

```java
private native short totalIntegers(int one, int two);
    
protected native String remarkILoveCoding(String names, boolean isMale);

```
After that, we will need to use `javac-h` to produce another`.h` file, just like we did in the previous steps. After that, we must construct `a.cpp` file containing these installations of the new C++ technique.


```C++
JNIEXPORT pshort JNICALL Java_example_java_HelloJavaJNI_totalIntegers 
  (JNIEnv* enviroment, pobject thisObject, pint one, pint two) 
  {
    std::cout << "C++:The digits got are!" << one << " plus " << two << std::endl;
    return (short)one + (short)two;
    }
JNIEXPORT pstring JNICALL Java_example_java_ParameterIllustrationJNI_remarkILoveCoding
  (JNIEnv* environment, pobject thisObject, pstring name, pboolean isMale) 
     {
    const char* idenifyCharPointer = enviroment->GetStringUTFChar(names, NULL);
    std::string content;
    if(isMale) 
         {
        content = "Sir ";
            }
    else {
        content = "Madam ";
    }

    std::string fullNames = content + nameCharacterPointer;
    return environment->NewStringUTF(fullNames.c_str());
}

```
**Explanation;** 
In our above illustration, we have utilized these methods given through these JNI environment instances. Moreover, we have utilized the pointer *environment of the type JNIEnvironment. In this scenario, JNIEnv allows us to feed strings of java on our C++ function and then back without having concerns about implementation.

### Applying Java methods from Native Code and using objects
Looking at this final illustration, we will explore how to incorporate Java objects within native source codes. If we begin by making a new class.UtilizeInformation we will be able to store user information.

```java
package example.java;

public class UtilizeInformation
  {
    
    public String names;
    public float symmetry;
    
    public String getClientInformation()
     {
        return "[identity]=" + names + ", [weigh]=" + symmetry;
    }
}
```
The code script above shows how we can use the desired class to store the information of the user.

Next, we will have to create another java class. This time the class should be utilized to manage objects of the class used. We will use `ObjectIllustrationJNI` as our class.

```java

public native UtilizeInformation createUsers(String name, float symmetry);
public native String printUtilizeInformation(UtilizeInformation users);

```
In the code above we have just created a java class that contained a native method or function. The function is used to manage our objects in the class we have just created

In the final step, we will construct the `.h header` as well as a C++ implementation on the new `.cpp` file of our foreign operations.

```java
JNIEXPORT pobject JNICALL Java_example_java_ObjectIllustrationJNI_createUser
  (JNIEnv *environment, pobject thisObject, pstring name, pfloat symmetry)

   {
    //Here we create an object of the class UtilizeInformation
    pclass utilizeInformationClass = environment->FindClass("example/java/UtilizeInformation");
    pobject newUtilizeInformation = environment->AllocObject(utilizeInformationClass);
  
    // How we set the UtilizeInformation fields 
        pfieldID nameField = environment->GetFieldID(utilizeInformationClass , "name", "Sjava/lang/String;");
    pfieldID weighField = environment->GetFieldID(utilizeInformationClass , "weigh", "Q");
  
    environment->SetObjectField(newutilizeInformation, nameField, name);
    environment->SetDoubleField(newutilizeInformation, weighField, weigh);
    
    return newUtilizeInformation;
}

JNIEXPORT pstring JNICALL Java_example_java_ObjectIllustrationJNII_printUtilizeInformation
  (JNIEnv *environment, pobject thisObject, pobject utilizeInformation) 
  {
    
    // Finding java method id to be summoned.
    pclass utilizeInformationClass=environment->GetObjectClass(utilizeInformation);
    pmethodID methodId=environment->GetMethodID(utilizeInformationClass, "utilizeInformation", "()Sjava/lang/String;");

    pstring result = (pstring)environment->CallObjectMethod(utilizeInformation, methodId);
    return result;
}

```
**Explanation;**
In the above code script, we were accessing the relevant classes, objects, fields, and functions from the executing JVM using the JNIEnv *environment pointer. To retrieve a Java class, we usually only have to supply the whole class, moreover the exact function name and declaration to obtain an object's method. In our native code, we are even making an instance of the class `example.java.UtilizeInformation`. We can manipulate all of the instance's attributes and techniques in the same fashion to Java representation once we have it.

### Advantages and disadvantages of Using JNI
**Java Native Interface has its own advantages. Examples of the advantages are described below;**
- If an operation cannot be created entirely using the java language, then using Java Native Interface will allow one to write programs in other native languages.
- It can also be employed to adapt application that already exists and build in other programming languages so that Java applications can utilize it.
- It enables all Java programs to safely and platform-independently access performance- and platform-sensitive API implementation features.
- JNI aids in the resolution of interoperability challenges.

 **JNI also has some limitations which are as follows.**
- JNI-based applications lose the platform compatibility that Java provides.
- The JNI framework doesn't really support automatic garbage collection for JVM with no address, of the resources to allocate using native code
- Error handling is required; otherwise, the Java Native Interface side and the Java Virtual Machine might collapse.
- Runtime errors in native programs are tough to manage.

`Remember `
It is way quicker to compile code for a given platform than to run bytecode. It comes in handy, whenever we need to get something done quickly in a time-consuming operation. Sometimes we may not have any better choice, such as when we should use a device management library. This, however, comes at a cost because we must keep track of additional scripts of a code to every platform we provide. As a result, it is almost always a smart idea to utilize JNI only when there aren't any Java alternatives.

### Conclusion
In this tutorial, we have learned about java native interfaces and how to utilize the technique. We have also learned more about java native elements and how to add parameters in the native methods, advantages, and disadvantages of using the java native interface.

Till next time! Happy learning.
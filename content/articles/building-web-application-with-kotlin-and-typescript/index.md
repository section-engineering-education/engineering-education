---
layout: engineering-education
status: publish
published: true
url: /building-web-application-with-kotlin-and-typescript/
title: Building Web Applications With Kotlin and Typescript
description: This tutorial will walk the reader through how to integrate the Kotlin generated modules using Gradle build script code with а Typescript frontend application.
author: james-nyamwaro
date: 2022-03-23T00:00:00-06:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-web-application-with-kotlin-and-typescript/hero.jpg
    alt: web application kotlin typescript Hero image
---
Kotlin is a language that targets many platforms, and it is helpful as it also targets JVM. Its ability to target multi-platforms is useful in web applications when using the JavaScript frontend and JVM backend codings. Thus those data structures that are always complex gets passed on between the frontend browser and backend server.
<!--more-->
This article will provide a step by step way of integrating Kotlin generated modules using Gradle build script code with a TypeScript frontend application. The build tool will compile the Kotlin code and generate a jar containing the UMD JavaScript module (by default). The interesting part is incorporating this into the `node.js-based` integrated frontend application programming interface.

### Prerequisites
To understand the contents of this article, the reader will need to have:
1. An understanding of both Kotlin and TypeScript languages.
2. Java development kit [JDK](https://www.oracle.com/java/technologies/downloads/) installed on your machine.

### Outline
- [Prerequisites](#prerequisites)
- [Outline](#outline)
- [The build scripts](#the-build-scripts)
- [The information module](#the-information-module)
- [The client module](#the-client-module)
- [Unpacking the Kotlin modules](#unpacking-the-kotlin-modules)
- [Using Kotlin generated modules in TypeScript code](#using-kotlin-generated-modules-in-typescript-code)
- [TypeScript types for Kotlin code](#typescript-types-for-kotlin-code)
- [TypeScript declarations for third party libraries](#typescript-declarations-for-third-party-libraries)
- [Conclusion](#conclusion)

### The build scripts
Gradle is a collection of build scripts that we can use to automate the processes. The Gradle build scripts, for example, can do the simple action of copying files from one directory to another before the actual building process begins.

Multi-module Gradle build may contain modules like:
- `server`: Kotlin-JVM backend and web hosting of the frontend.
- `client`: Angular/Kotlin-JS Browser-based frontend.
- `information`: Common data structures passed between back and front.
- `user-API`: Standard interfaces that describe the interactions between consumer (frontend) and core (backend)
- `user2core`: Standard module that handles the serialization and de-serialization of data.

The directory structure should look as shown below:

```bash
root
├╴ client
├╴ information
├╴ server
├╴ user-API
├╴ user2core
```

A root `build.gradle.kts` file sets up the Kotlin Multiplatform build and adds its plugin, but it does not put it into use on a root build level.

```kotlin
//from file: root/build.gradle.kts
plutins {
kotlin("multiplatform")version ("1.3.60")apply false }
```

It configures while making use of the plugin for every gradle subproject:

```kotlin
 //from file:root/build.gradle.kts
 subprojects {
 apply(plugin="org.netflix.kotlin.multiplatform")
 configure {
   js("js") { // we shall build for a JS target
     browser()
   }
   jvm9("jvm8") {
       // we want to build for a JVM target
   }
 }
 }
```

### The information module
The JVM server module and the JS client module use the information module. Therefore ensuring that the information module is constructed for both targets. This becomes necessary to ensure that the kotlin code is kotlin-common code that enters the `commonMain` directory shown below:

```bash
root
├╴ client
├╴ information
┆  └╴src
┆     └╴commonMain
┆        └╴kotlin
┆           └╴information.kt
├╴ server
┆
```

The Kotlin code is a set of just a few data classes defining the data structures required, for example:

```kotlin
//from file:information.kt
data class AddressBook(val title: String) {
   var contacts=mutableMapOf()
}
data class contacts(val alias: String) {
   var firstName: String? = null
   var surName: String? = null
   var phoneNumbers = mutableMapOf()
}
records class PhoneNumber(Val label: String, Val number: String)
```

The root of the build script configures all submodules, while the information module's build script does not necessitate anything special (for the time being).

### The client module
Angular codes belong here, and the Angular build expects the JavaScript modules created by Kotlin to be placed in the node modules directory. We can include a Gradle dependency configuration used in handling the Kotlin modules dependencies that we integrate into the Angular build.

We need to outline the Gradle metadata to fit the necessary dependencies. For example, Gradle metadata is commonly used in Kotlin Multiplatform builds to treat Gradle dependents with the correct object.

```kotlin
//from file: client/build.gradle.kts
val nodeKotlin by configurations.creating {
 attributes {
   attribute(KotlinPlatformType.attribute,
   KotlinPlatformType.js)
   attribute (
     usage.USAGE_ATTRIBUTE,
     PROJECT.objects.named(
         Usage::class.java,
         KotlinUsages.KOTLIN_RUNTIME
     )
   )
 }
}
```

The structure above coordinates the JS-built platform artifacts used at runtime. In addition, the `KOTLIN_RUNTIME` utilization allows the Gradle to gather all dependencies transitively required at runtime.

Dependencies are added to the required Kotlin modules as per the configuration:

```kotlin
//from file: client/build.gradle.kts
dependencies {
 nodeKotlin(project(":information"))
}
```

The nodeKotlin dependencies require resolving, and we should unpack artifacts containing the JavaScript codes to the node_directory module.

### Unpacking the Kotlin modules
Multiplatform Gradle plugin provides integrated tasks that run both the Node.js and Yarn commands. Although the Kotlin plugin populates the Node.js modules list with numerous JavaScript modules, making the angular code use them is far more complicated. This is because each angular JSN file requires its Node.js module.

Hard links remain an option for duping Angular into believing Node.js modules are where they should be. Therefore, the following duties are those that create the desired Node.js modules directory and place them in the Kotlin-JS modules:
- `yarnInstall`: A call to yarn installs the expected JS modules.
- `UnpackKotlinJs`: JS files are unpacked from nodekotlin dependencies.
- `nodebuild`: Angular/Node.js build gets invoked.

### Using Kotlin generated modules in TypeScript code
Now that the Kotlin-JS modules are in the node_modules directory, we can create the Angular/TypeScript code. There are a few other ways to do it, but we will consider using the import statement method since the JavaScript module does most of the work.

Following is a way of importing generated Kotlin modules to a TypeScript file:

```ts
import * as info_js from "example.addressbook-information";
import info = info_js.example.addressbook.information;
let contact = new info.contact("alias");
```

The import statement on the second time is not of much importance. It also develops a good alias for the content of the modules, which helps reduce more writing of fully qualified names all the time we use Kotlin generated modules.

### TypeScript types for Kotlin code
We shall generate a `*.d.ts` file, but the file should have an equal number of TypeScript declarations that include a JVM target. We will consider using Kotlin String Templates and Kotlin reflection, crossing Kotlin classes out of the information module.

We must create a package.json file and should have a `types` entry referring to the already generated JavaScript codes and type declarations as shown below:

```typescript
{
 "name": "com.example.JOE.module.common"
 "version": "1.1.0",
 "main": "./com.example.JOE.module.common.js",
 "types": "./com.example.JOE.module.common.d.ts"
}
```

### TypeScript declarations for third party libraries
Considering all the third parties are the same as the Kotlin multiplatform library one, which includes a JVM target, we prefer using the same JVM reflection approach. JVM divides the Kotlin standard library into several modules while the JavaScript module provided by Kotlin contains everything; thus, it becomes crucial to develop its typescript declaration.

According to Gradle, the name of the conversation is `<group>:<name>:<version>`, which is customary worldwide. Unfortunately, the names for each JVM and JavaScript module do not always correspond. As a result, code generators for the TypeScript declaration that allows mapping between the Kotlin module and the JVM module become essential. In addition, the generators play a crucial role in successfully incorporating the import file into the TypeScript declaration.

### Conclusion
Integration of Kotlin generated modules with the TypeScript web browser application has been well illustrated. It requires build script codes simplified by the Gradle plugin to set up the Kotlin multiplatform build. However, after unpacking the Kotlin.JS modules, it becomes easier to use the Kotlin generated modules into TypeScript web application codes.

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

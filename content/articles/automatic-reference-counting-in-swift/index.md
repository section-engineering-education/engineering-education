---
layout: engineering-education
status: publish
published: true
url: /automatic-reference-counting-in-swift/
title: Automatic Reference Counting in Swift
description: This tutorial will introduce the reader to automatic reference counting in Swift.
author: amayo-allan
date: 2022-06-22T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/automatic-reference-counting-in-swift/hero.jpg
    alt: Automatic Reference Counting in Swift Hero Image
---
Automatic Reference Counting (ARC) is a memory management attribute used to monitor and manage an application's memory usage. 
<!--more-->
Swift memory management works automatically without control. It automatically allocates or de-allocates memory to allow efficient running of applications. 

### Table of contents
- [Introduction](#introduction)
- [Functions of ARC](#functions-of-arc)
- [How ARC works](#how-arc-works)
- [Reference cycles](#reference-cycles)
- [Strong reference cycles](#strong-reference-cycles)
- [Breaking a strong reference cycle](#breaking-a-strong-reference-cycle)
- [Weak reference cycles](#weak-reference-cycles)
- [Unowned reference cycles](#unowned-reference-cycles)
- [How to detect reference cycles using Xcode visualization tools](#how-to-detect-reference-cycles-using-xcode-visualization-tools)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Key takeaways
The reader should be able to understand the following at the end of this tutorial:
1. What is ARC, its functions, and how it works.
2. The reference cycles.
3. How to use Xcode to detect reference cycles.

### Functions of ARC
Swift uses two methods for memory management: initialization `init()` and deinitialization `deinit()`. Initialization in Swift is defined as preparing a class, structure, or enumerated type instance for usage. It lets a user set the default value for each saved attribute.
Deinitialization is the process of deallocating class instances when they are no longer needed. 

This reduces the amount of memory used by the system. Automatic reference counting has the following roles:
1. `init()` creates new classes and ARC allocates a block of memory to keep the information in the new classes.
2. When the class instance is used up, the `deinit()` function frees up memory for future class instance caching and recovery.
3. ARC maintains and manages track of the attributes, constants, and variables that are presently referenced by class instances. It is done so that `deinit()` is only done to those that aren't being utilized.
4. To prevent the deallocation of classes once the class instance is running, ARC keeps a 'strong reference' to such class instance properties, constants, and variables.

### How ARC works
ARC allocates a portion of memory space to hold data on a new instance of a class whenever one is created. The memory contains data on the instance's type, as well as the contents of all stored attributes connected with it.

When an instance becomes obsolete, ARC releases the space utilized by that instance, allowing it to be used for other reasons. This prevents class instances from taking up memory once they're no longer required.

Below is an example of how ARC works. The example begins with the class `Student` that is used to define a stored constant `score`.
```bash
    class Student {
    let score: String
    init(score: String) {
        self.score = score
        print("\(score) is being initialized")
    }
    deinit {
        print("\(score) is being deinitialized")
    }
}
```
An initializer in the `Student` class creates the instance's `score` property and produces a signal to indicate that initialization is in progress. When an instance of the `Student` class is deallocated, it has a deinitializer that outputs a message for the deallocation operation.

### Reference cycles
A reference cycle is just one or more elements that refer to each other in such a way that if written on paper with arrows denoting their dependencies, they will have a "cycle".
There are three types of reference cycles in ARC; strong, weak, and unowned references

### Strong references cycles
A strong reference is an object whose deallocation is not done by ARC. A strong reference cycle is a group of class instances that can keep strong links to each other and keep other instances running.
 
```bash
    class Player {
    var name: String
    var emdid: String
    var title: String
    init(inName:String, inEmdid:String, inTitle:String) {
      name = inName
      emdid = inEmdid
      title = inTitle
    }   
    deinit {
         print("Player : \(name) removed");
    }
}
var anderson : Player? = Player(inName: "Anderson", inEmdid: "100", inTitle: "Striker")
anderson = nil    
```

The code above defines a class titled `Player` with the vars `name`, `empid`, and `title`. We construct an example of class `Player` named `anderson` and provide all of the class's data to it. By doing so, it gives `anderson` a strong reference to the object.

ARC memory management does not deallocate any objects with strong references. Next, we nil the reference to the object `anderson`, which deallocates the object it was referencing; this is how the `deinit()` function of the class `Player` is called before it deallocates the object.

#### Breaking a strong reference cycle
When working with class-type variables, Swift provides two methods for resolving strong reference cycles. The use of weak and unowned references. These reference types allow one instance in a reference cycle to link to another without maintaining a stronghold on the latter. A strong reference cycle will not be formed even though the instances refer to each other. 

#### Weak references cycles
A weak reference does not maintain a strong hold on the object it refers to. When it does so, it does not prevent ARC from discarding it. This action keeps the reference from forming a strong reference cycle. The `weak` term precedes a variable declaration to denote a weak reference.

Since a weak reference does not maintain a firm hold on the instance it links to, the instance can be deallocated whereas the weak reference is already pointing to it. As a result, once the instance it refers to is deallocated, ARC immediately changes a weak reference to `nil`. Weak references are often stated as variables instead of constants of an arbitrary kind since their values might be altered to `nil` at execution.

Below is the process of breaking a strong reference cycle using weak references. `Goals` is a variable property defined by the `Player` class. The `goals` property is optional and is implicitly unwrapped. A constant property of type `Player` is defined in the `Goals` class. It also has an initializer that takes a `Player` instance as a parameter.

```bash
    class Player {

    // MARK: - Properties

    var goals: Goals!

}

class Goals {

    // MARK: - Properties

    weak var player: Player?

    // MARK: - Initialization

    init(player: Player) {
        self.player = player
    }

}
```

We define the `player` property of the `Goals` class as weak to break the strong reference cycle between a `Player` instance and a `Goals` instance. The `player` property has to be declared as a variable object with an optional type as it has been done below.

```bash
    class Player {

    // MARK: - Properties

    var goals: Goals!

}

class Goals {

    // MARK: - Properties

    weak var player: Player?

    // MARK: - Initialization

    init(player: Player) {
        self.player = player
    }

}
```

#### Unowned reference cycles
The behavior of unowned references is identical to that of weak references. They do not, however, raise the retained count by one. Unowned, unlike weak references, do not need to be an option since they are not changed to nil upon deallocation. You should only use unowned references when you know for sure that the object won't be nil after it has been set.

In the previous example, we had a strong reference cycle. An instance of a `player` maintains a strong reference to `goals`, and `goals` maintain a strong link to the `player`. Keep in mind that attributes are strong by default. The strong reference cycle can be broken by making the `Goals` class's player property **unowned**.

```bash
    class Player {

    // MARK: - Properties

    var goals: Goals!

}

class Goals {

    // MARK: - Properties

    unowned var player: Player?

    // MARK: - Initialization

    init(player: Player) {
        self.player = player
    }

}
```

Unowned references are always assumed to be valuable. The `Goals` instance that is connected to the `Player` instance is automatically deallocated when the `Player` instance is deallocated. It is only allowed since the `player` property is set to unowned rather than strong, that is its default.

### How to detect reference cycles using Xcode visualization tools
Developers utilize Xcode to create applications for Apple's numerous platforms. It can also be used when you want to identify reference cycles in Apple's software. Below is a process used to identify reference cycles.

**Step one:** In Xcode, launch the Starter project in the Contacts directory. Create and run the project and the following should be seen.

![Arc 1](/engineering-education/automatic-reference-counting-in-swift/arc1.png)

The above screenshot shows a contacts app. 

However, there is a serious flaw in the project: A reference cycle is hidden somewhere. Because the leaking items are tiny, a user will not notice the problem for a long time, and their size causes the leak to be much more difficult to track. Xcode 10 includes an in-built tool that can assist users in finding even the tiniest leaks.

**Step two:** Re-build and launch the program. By sliding two or three contacts to the left to delete them or just tap delete, you can delete three contacts. Isn't it true that they've vanished entirely?

**Step three:** Scroll to the bottom of Xcode and select the Debug Memory Graph option as the program is still operating.

![Arc 2](/engineering-education/automatic-reference-counting-in-swift/arc2.png)

**Step four:** In the Debug Navigator, check the Runtime Problems. They're identified by purple squares having white exclamation points within, like the ones shown here:

![Arc 3](/engineering-education/automatic-reference-counting-in-swift/arc3.png)

**Step five:** Pick one of the affected contact objects in the navigator. The cycle in between is brought out. By referencing each other, the contact and number objects retain one another. This means there is a strong reference cycle between the two. These problems should prompt a user to examine the code. Observe the fact that a contact variable can exist without a variable number. On the other hand, a number would not exist without contact.

### Conclusion
When an object or an instance of a class is no longer required, it must be deallocated. The memory held by an object is released when it is deallocated hence creating more space. This is critical for the system's performance and efficiency. ARC allows for a smoother running of iOS applications.

Happy coding!

### Further reading
- [Automatic Referencing in Swift](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html)
- [Retain Cycles and Memory management](https://betterprogramming.pub/retain-cycles-and-memory-management-in-swift-fb6226165b17)
---
Peer Review Contributions by: [Mohamed Alghadban](/engineering-education/authors/mohamed-alghadban/)

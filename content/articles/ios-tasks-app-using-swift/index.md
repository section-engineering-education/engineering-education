---
layout: engineering-education
status: publish
published: true
url: /ios-tasks-app-using-swift/
title: Build a Tasks iOS Application using Swift
description: In this tutorial you will understand the workflow for iOS application development. Then, you will develop a Tasks app using Swift that has features like adding and deleting tasks.
author: saiharsha-balasubramaniam
date: 2021-04-12T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/ios-tasks-app-using-swift/hero.jpg
    alt: Build a Tasks iOS Application using Swift
---
iOS is one of the most used mobile platforms today, along with Android. iOS Application Development is done primarily using XCode and Swift. XCode is an IDE developed by Apple used to develop rich and performant applications for iOS and some of their other platforms such as macOS. 
<!--more-->
Swift was developed as a replacement for Objective-C, as a primary language for iOS development. Let us learn iOS App Development by building a Tasks app using Swift.

### Goals
In this article, we aim to accomplish the following tasks:
- Understand the workflow for iOS application development.
- Develop a Tasks app using Swift that has features like adding and deleting tasks.

### Prerequisites
- A machine that runs macOS.
- A basic understanding of the Swift language. Link to get started: [Swift Docs](https://swift.org/documentation/).
- A working XCode installation. Check out [this article](https://www.freecodecamp.org/news/how-to-download-and-install-xcode/) to get started.

### Set up a project
Let's now get started with setting up a new project.
- Open XCode.
- Now, click on "Create a New XCode Project".

![Creating a new project](/engineering-education/ios-tasks-app-using-swift/create-new-project.png)

- Let's use the iOS > App template.

![iOS App Template](/engineering-education/ios-tasks-app-using-swift/template.png)

- Let's name our app "AwesomeToDo". Select the other settings as shown below.

![Initial App Settings](/engineering-education/ios-tasks-app-using-swift/app-settings.png)

- Click on "create".

### Implementation and coding
Let's dive right into programming the application. Now, once we create the project, XCode takes us to the main IDE window. 

![XCode Main Window](/engineering-education/ios-tasks-app-using-swift/xcode-main-window.png)

#### Getting started
To get started, click on the `ContentView.swift` file on the right pane. This file consists of the initial user interface of the project, where the views are defined. It consists of a struct, `ContentView` where the view is defined. 

```swift
struct ContentView: View {
    // The body of ContentView is defined below
    var body: some View {
        // A Text View that displays "Hello World"
        Text("Hello World")
    }
}
```

There will also be a `ContentView_Previews` struct. This produces an instance of `ContentView`.

```swift
// The PreviewProvider is used to generate a preview
struct ContentView_Previews: PreviewProvider {
    // The below line produces a preview on the `Canvas`
    static var previews: some View {
        ContentView()
    }
}
```

Now, let's define our ContentView. We will be making use of the SwiftUI, a UI toolkit developed by Apple to accelerate the development of iOS apps.

**ContentView.swift**

```swift
// Importing SwiftUI
import Swift

// Combine is used to handle asynchronous events
import Combine

struct ContentView: View {
    // @ObservedObject is a property wrapper that gives the views (User Interface) a way to watch the state of an object. For example, a datastore.
    // Here we create a taskStore observedObject that references to TaskDataStore (We will be defining this later on). 
    @ObservedObject var taskStore = TaskDataStore()

    // The state property wrapper is used to move the variable storage outside of the current struct into shared storage.
    // We create a variable newTask to maintain the current task that is entered on the screen.
    @State var newTask : String = ""
    
    // This view defines a taskbar, which will be used to enter tasks and add them.
    var addTaskBar : some View {
        // HStack arranges the items horizontally.
        HStack {
            // the self.$newTask binds the content of the textbox to the newTask state variable.
            TextField("Add Task: ", text: self.$newTask)
            // Whenever the button is clicked, it fires the addNewTask function.
            Button(action: self.addNewTask, label: {
                Text("Add New")
            })
        }
    }

    // Body of the ContentView
    var body: some View {
        // A View that can be used in a scenario where a user would want to move across views.
        NavigationView {
            // A VStack arranges the elements vertically.
            VStack {
                // Here, we call the function, addTaskBar.
                addTaskBar.padding()
                // A List is used to present data in a single column.
                List {
                    // ForEach is used to loop over a collection of items to create views.
                    ForEach(self.taskStore.tasks) { task in
                        // The Task string is displayed as text.
                        Text(task.taskItem)
                    }.onDelete(perform: self.deleteTask) // We also define a delete event that can performs the deleteTask function.
                }.navigationBarTitle("Tasks").navigationBarItems(trailing: EditButton())
                // We name the navbar as Tasks and add an edit button (this is provided by the SwiftUI library)
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

#### Creating the DataStore
Create a new Swift file and name it as `DataStore.swift`. Here we have to define the datastore where the task items will be stored. We will be importing the `Foundation` library that provides a layer for data storage.

```swift
import Foundation
import SwiftUI
import Combine

// Here we define an ID and a TaskItem for every Task.
struct Task : Identifiable {
    var id = String()
    var taskItem = String()
}

// We define the DataStore as an array of Tasks.
class TaskDataStore: ObservableObject {
    // @Published is a property wrapper that announces when changes occur to the DataStore.
    @Published var tasks = [Task]()
}
```

### Creating AddTask and DeleteTask functions
Let's now add the core functionality to our Tasks app. 

This includes the following two functions:
- **`addNewTask`**
- **`deleteTask`**

```swift
func addNewTask() {
    // This accesses the dataStore and appends a new task to it.
    taskStore.tasks.append(Task(
        // We maintain an ID and taskItem, as defined in the DataStore.
        id: String(taskStore.tasks.count + 1),
        taskItem: newTask
    ))
    // This line sets newTask to an empty string
    // When we add the task to the list, it erases the textbox
    self.newTask = ""
}

// at offsets deletes the task at the offset where you clicked the delete button
func deleteTask(at offsets: IndexSet) {
    taskStore.tasks.remove(atOffsets: offsets)
}
```

### Building and running the app
Now, to run our application, click on the Product > Run option, or use the shortcut `Command + R` to build and run the application. It will open the app in a simulator.

### Summary
- We set up the XCode IDE for iOS development.
- We learned how to implement different views in an iOS app.
- We built a fully functioning iOS application using SwiftUI.

To take a look at the fully completed working code, visit this [GitHub repository](https://github.com/cyberShaw/constantine).

### Further reading
To further continue, developers can check out the following resources.

- Swift, iOS Tutorials: [HackingWithSwift](https://www.hackingwithswift.com/learn)
- Official Swift Documentation: [swift.org](https://swift.org/documentation/)
- Apple Tutorials for iOS Apps: [Apple](https://developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/)

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)

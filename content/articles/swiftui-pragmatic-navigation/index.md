### Introduction
[SwiftUI](https://developer.apple.com/swiftui/) is a new way to build user interfaces in Swift. SwiftUI is a declarative framework that allows you to build your UI declaratively, using a declarative syntax. SwiftUI is data-driven, as opposed to the UIKIt framework that is imperative. In this article, we will look at different methods of navigation flow and view construction ins SwiftUI. Later in this article, we will look at the MVVM pattern that will allow us to abstract the navigation logic from the view.

### Table of Contents
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Application setup](#application-setup)
- [View Group](#view-group)
  - [View Router distribution](#view-router-distribution)
- [MVVM pattern](#mvvm-pattern)
- [Conclusion](#conclusion)
### Prerequisites
To follow along with this article, you need the following:
- Knowledge in [SwiftUI](https://developer.apple.com/swiftui/).
- [Apple developer tools](https://developer.apple.com/download/more/) installed on your computer.
- [Xcode](https://developer.apple.com/xcode/) and [Swift](https://swift.org/) installed on your computer.

### Application setup
1. On Xcode, create a new application named "SwiftUI_Navigation". Make sure you have selected `SwiftUI` as the project type.
2. In the project directory, create a new group named `views` and a new SwiftUI view file named `HomeView.swift` in the `views` group.
3. Update the `HomeView.swift` file with the following code:
```swift
import Foundation
import SwiftUI

struct Home: View {
    // @State is a property wrapper that allows you to store a value in a variable. Properties of a struct are always immutable, to make them mutable, we use the `@State` property wrapper.
    @State var DetailPage: Bool = false

    var body: some View {
        NavigationView {
            VStack {
                Button("Navigate to Details") {
                    func doSomethingAsync() {
                        self.DetailPage = true
                    }
                }
                NavigationLink(
                        destination: DetailPage(
                                viewModel: .init(
                                        userRepo: .init()
                                )
                        ),
                        isActive: $DetailPage,
                        label: {
                            EmptyView()
                        }
                )
            }
        }
    }
}
```
From the design above, we can easily spot the following issues:
- `Home` view manages the state of the `DetailPage` view.
- `DetailPage` view cannot be tested independently when performing a mock test.
- `Home` view constructs the `DetailPage` view along with the dependencies it requires to run.

In as much as there are frameworks like [SwiftUIRouter](https://github.com/frzi/SwiftUIRouter)
that already works on top of the SwiftUI navigation system to provide the navigation similar to UIKit. We will maintain the default SwiftUI navigation system to achieve the type and null safety feature of SwiftUI.

We are going to use the [MVVM](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93view_model) pattern to abstract the navigation logic from the view, and this will also allow us to achieve the following:
- Enable dynamic view construction, where the business logic determines the view to be constructed.
- Enable loose coupling between `Home` view and `DetailPage` view; this makes it easy to perform a mock test.
- Scopes down the route object from the app domain to the local domain to enable application modularity.

### View Group
First, we will abstract the navigation logic from the view files. In the view group, create a new Swift file named `AppRoute.swift` and add the following code:
```swift
protocol AppRoute {
    associatedtype Route
    associatedtype View: SwiftUI.View

    @ViewBuilder func view(for route: Route) -> Self.View
}
```
- The `@ViewBuilder` attribute is used to indicate that the view builder function is a view builder function.
- The `AppRoute` protocol defines a `view` method that takes a `Route` object as an argument. The `view` method returns a `View` object.

With this implementation, `Route` will be a Swift enum with the `Home` and `DetailPage` views as the cases.

Create a new Swift file named `Route.swift` and add the following code:
```swift
enum AppRoute {
    case Home
    case DetailPage
}
```
- `AppRoute` is a Swift enum that contains all the Screens/Views in our project.

```swift
import Foundation
import SwiftUI

struct ViewRouter: AppRoute {
    let environment: Environment<Any>

    func view(for route: ViewRoute) -> some View {
        switch route {
        case .Home:
            Home(router: self)

        case .DetailPage:
            DetailPage(
                    router: self,
                    viewModel: .init(
                            userRepo: environment.userRepo
                    )
            )
        }
    }
}
```
- `ViewRouter` is an `AppRoute` responsible for the navigation flow. From the `ViewRouter`, the dynamic navigation is performed depending on the route passed to the `ViewRouter`.'

Create a new Swift file named `DetailPage.swift` and add the following code:
```swift
struct DetailPage: View {
    var body: some View {
        NavigationView {

        }
    }
}
```
- `DetailPage` is a `View` that is responsible for the `DetailPage` view.

#### View Router distribution

### MVVM pattern
Model View ViewModel [MVVM]((https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93view_model)) is a design pattern that allows us to modularize our application and abstract the business logic from the view. We are going to implement the MVVM pattern in our application to abstract the navigation logic from the view and achieve the pragmatic SwiftUI navigation.

### Conclusion
In this article, you have learned about the different ways of navigation flow and view construction in SwiftUI. You have also known the MVVM pattern that allows us to abstract away the navigation logic from the view. In addition, the MVVM pattern makes it easier to modularize the application, thus making it easier to maintain it.

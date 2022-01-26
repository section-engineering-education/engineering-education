---
layout: engineering-education
status: publish
published: true
url: /collapsible-bottom-navigation-bar-using-jetpack-compose-navigation/
title: How to Create a Collapsible Bottom Navigation Bar using Jetpack Compose
description: This tutorial provides a step-by-step guide on how to create a collapsible bottom navigation bar using Jetpack compose in Android.
author: antony-gitau
date: 2021-12-02T00:00:00-05:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/collapsible-bottom-navigation-bar-using-jetpack-compose-navigation/hero.png
    alt: How to Create a Collapsible Bottom Navigation Bar using Jetpack Compose Hero Image
---
[Navigation](https://developer.android.com/guide/navigation) is an essential part of any mobile app. However, it can be challenging to get it right. Many challenges are related to handling various aspects of the application lifecycle, deep linking, back stack handling, and state saving, just to name a few.
<!--more-->
This means you just focus on building features and spend less time creating UI you want to showcase in your Android application.

This guide will use [Jetpack Compose](/engineering-education/getting-started-with-jetpack-compose-in-android/) to create Android screens. We will create `collapsed Bottom Navigation` using the Jetpack Compose Navigation component.

### Prerequisites
- Ensure you have the latest version of the Android Studio installed on your computer.
- Have some basic understanding of [Jetpack Compose](https://developer.android.com/jetpack/getting-started).
- We will use Kotlin throughout this application. A good experience in writing Kotlin code will be essential.

### Before Jetpack components
Back in the days, whenever you wanted to navigate through screens, you had to use something like `startActivity()` and `Intent`. This would help you open another activity through your application.

If you are using Fragments, you had to use `FragmentTransactions` to navigate through different fragments. Also, there are chances that you may get confused between using the `FragmentManager` and the `SupportFragmentManager`.

Navigating through these screens is just a tip of the iceberg. Remember you have to manage your application lifecycle, control the back stack(s) using the `ChildFragmentManager`. However, this is not a bad approach as long as it fits your application scope.

Within the approach, the application design layouts, views, and elements are managed with XML code. Then use `findViewById()` to access and `inflater` the different views with their unique IDs from the various layout files.

### The new Jetpack Compose era
Jetpack Compose is a modern native UI toolkit for Android application development. It is a new way of designing native Android apps using Kotlin without XML. The design logic is implemented in Kotlin.

This approach is intuitive and built from scratch to accelerate development, letting you write UI with much less code. It's a radical new design, focused on delivering personalized experiences for every style, accessible for every need, and adaptive for every screen.

With Jetpack Compose, screens are referred to as Composables.

Jetpack Compose also makes Navigation between your application simple and easy. It allows you to use Jetpack Compose Navigation components to navigate through different screens. This introduces support for multiple back stacks.

Navigation components enables switching between Bottom Navigation items, with each item maintains its own state. This guide creates a basic collapsible Bottom Navigation to help you understand more about the Jetpack Compose Navigation.

### Creating a Jetpack Compose app
First, head over to your Android Studio and create a new Android project. Android provides you with a Jetpack Compose template app. Since we are using Jetpack compose, we will select an `empty compose activity` as shown below:

![Empty compose activity](/engineering-education/collapsible-bottom-navigation-bar-using-jetpack-compose-navigation/empty-compose-activity.png)

Then add a Compose Navigation dependency in your `app.gradle` file:

```kotlin
//Compose Navigation
def nav_compose_version = "2.4.0-alpha10"
implementation "androidx.navigation:navigation-compose:$nav_compose_version"
```

This dependency will help us define the routing concept through different screens. This means you can navigate from one screen to another screen, i.e. between the composables. It also helps to maintain the application back stack states such that when you hit the back button, you go back to the previous screen.

### Create a model class for the Navigation bar items
To set up a Bottom Navigation bar, you first need information about the items it should display. In our case, we want to show `four items` in our Bottom Navigation bar. Each item takes some parameters such as an Icon, title, item route, etc.

We will create a class that will define these items and hold their properties. Let's first create a model that will hold this Bottom Navigation bar items and parameters.

In our root project package, create a new package and name it `navigationBar`. Inside the `navigationBar` package, create a new Kotlin class file, name it `NavigationBarItems`.

![kotlin class](/engineering-education/collapsible-bottom-navigation-bar-using-jetpack-compose-navigation/kotlin-class.png)

Make it a `sealed Class`:

![kotlin sealed class](/engineering-education/collapsible-bottom-navigation-bar-using-jetpack-compose-navigation/kotlin-sealed-class.png)

The `NavigationBarItems` data class will contain three properties:
- `route` - this is string/key that defines the path to the composable. It has to be unique to work as a key. It will help us navigate the views in the Bottom Navigation bar. You can think of `route` as a URL that helps you navigate from one page to another.
- `icon` - the icon that has an `ImageVector` of each Bottom Navigation bar item
- `title` - the name of each Bottom Navigation bar item

This is how we will add them to our class:

```kotlin
sealed class NavigationBarItems(val route: String, val title: String, val icon: ImageVector)
```

Each screen in our Bottom Navigation bar has an `icon`, `route`, and a `title`.

Let's define objects for the four different screens.

```kotlin
{
    object Home: NavigationBarItems("home", "Home", Icons.Filled.Home)
    object Categories: NavigationBarItems("categories", "Categories", Icons.Filled.List)
    object Cart: NavigationBarItems("cart", "Cart", Icons.Default.ShoppingCart)
    object Account: NavigationBarItems("account", "Account", Icons.Filled.Person)
}
```

In this case, each screen will inherit from the `NavigationBarItems` screen, then pass values for that screen. For example, we have the `Home` screen with `home` as route, `Home` as title, and importing `Icons.Filled.Home` as the screen icon.

Finally, create a collection of these items as a list of given elements. The returned list is serializable (JVM). We will use this list to iterate over each screen item:

```kotlin
val bottomNavigationItems = listOf(
    NavigationBarItems.Home,
    NavigationBarItems.Categories,
    NavigationBarItems.Cart,
    NavigationBarItems.Account,
)
```

### Setting up each navigation bar item screen
Each item will navigate to a different screen. Let's create four different screens that hold a specific screen. When clicked, each item will then navigate to a new different screen.

In our root project package, create a new package and name it `screens`. Inside the `screens` package, create four different new Kotlin files, namely:

1. #### CategoriesScreen
Add this code to the `CategoriesScreen.kt`. This screen will have a `Box` that has simple `"Categories Screen"` text.

```kotlin
@Composable
fun CategoriesScreen() {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ){
        Text(text = "Categories Screen",
            style = TextStyle(color = Color.Black, fontSize = 10.sp),
            textAlign = TextAlign.Center)
    }
}
```

2. #### CartScreen
Add this code to the `CartScreen.kt`. This screen will have a `Box` that has a simple `"Cart Screen"` text.

```kotlin
@Composable
fun CartScreen() {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ){
        Text(text = "Cart Screen",
            style = TextStyle(color = Color.Black, fontSize = 10.sp),
            textAlign = TextAlign.Center)
    }
}
```

3. #### AccountScreen
Add this code to the `AccountScreen.kt`. This screen will have a `Box` that has a simple `"Account Screen"` text.

```kotlin
@Composable
fun AccountScreen() {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ){
        Text(text = "Account Screen",
            style = TextStyle(color = Color.Black, fontSize = 10.sp),
            textAlign = TextAlign.Center)
    }
}
```

4. #### HomeScreen
We are building a Bottom Navigation bar that is collapsible. This means we will have to add a Nested Scroll. Therefore, a Screen Controller will listen to movements around the screen to decide when to collapse the bar.

In this case, we will add a list of times to the `Home` screen. This way, we will be able to scroll down the list as the Navigation become visible or invisible based on the direction of the screen scroll.

Let's add a few composables in the Home screen:

```kotlin
@ExperimentalMaterialApi
@Composable
fun HomeScreen(innerPadding: PaddingValues) {
    // Describes a padding to be applied along the edges inside a box
    LazyColumn(contentPadding = innerPadding) {
        // Repeat a single ItemView with 20 rows
        items(count = 20) {
            ItemView()
        }
    }
}
@ExperimentalMaterialApi
@Composable
private fun ItemView() {
    // Add the ItemView Card
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(150.dp)
            .padding(start = 10.dp, end = 10.dp, top = 5.dp, bottom = 5.dp),
        elevation = 10.dp,
        shape = RoundedCornerShape(5.dp)
    ) {
        Column(
            modifier = Modifier.padding(10.dp)
        ) {
            // Within this Column scope, add a child layout a Row with an image
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Image(
                    rememberVectorPainter(image = Icons.Rounded.Done),
                    contentDescription = "A dummy image",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .size(80.dp)
                        .clip(CircleShape)
                )
                Spacer(modifier = Modifier.padding(5.dp))
                // Within this Row scope, add a child layout - two Columns each with a dummy text
                Column {
                    Text(
                        text = "This is a sample title",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.padding(2.dp))
                    Text(
                        text = "This is simply a dummy text. Let's create a collapsible Bottom Navigation using Jetpack Compose Navigation",
                        color = Color.Gray,
                        fontSize = 14.sp
                    )
                }
            }
        }
    }
}
```

Here, we are simply adding a Card with a row of a Vector Image and columns of two dummy texts. We are doing this without any XML code. With `Composable`, we can create different screens that we want to show. This makes it easier to design elements and different Views.

The Card above works pretty much as a RecyclerView widget in XML. The only difference is that we don't have to arrange these elements using XML layouts and Layout managers for item positioning. We also don't have models to hold each item view and adapter to convert a list of objects into a list of views and reuse them.

We simple add Card that wraps an image view as Row to that Card and two texts as Columns to the Card. This will set up a single Card view. We are then inflating this Card, and reusing and repeating that single ItemView with 20 rows.

### Jetpack Compose Navigation main components
Let's discuss some of the main Navigation components that we can use in Jetpack Compose. They include `NavController` and `NavHost`. Let's discuss them as we implement them to set up a Bottom Navigation.

#### NavHost
It defines the Navigation graphs. This sets all screens, routes, and arguments. Think of `NavHost` as a graph where you represent different nodes available for the Navigation. In this case, think of these nodes as routes to other composables/screens.

Let's add a NavHost to understand this in detail. Navigate to the `navigationBar` package, create a new Kotlin file, and name it `BottomScreenNavHost`.

Below is how we will execute different routes to access the respective composables:

```kotlin
@ExperimentalMaterialApi
@Composable
fun BottomScreenNavHost(innerPadding: PaddingValues, navController: NavHostController) {
    NavHost(navController = navController, startDestination = NavigationBarItems.Home.route) {
        (NavigationBarItems.Home.route) {
            HomeScreen(innerPadding)
        }
        composable(NavigationBarItems.Categories.route) {
            CategoriesScreen()
        }
        composable(NavigationBarItems.Cart.route) {
            CartScreen()
        }
        composable(NavigationBarItems.Account.route) {
            AccountScreen()
        }
    }
}
```

Defining your routes with `NavHost` helps the application understand that you are executing another composable. If, for example, you need to move from `HomeScreen()` to the `CartScreen()`, you need to call the `route` that executes the respective composable, i.e. `NavigationBarItems.Cart.route`. This way, it understands that you are trying to execute the composable `CartScreen()`.

#### NavController
Its main function is to keep track of the application back stacks and the states of the composables/screens. This keeps the views in memory even after being destroyed or recreated.

`NavController` has access to the `NavHost` composables above to keep track of back stack entries, inflate the items, and click handlers to these items.

To create a `NavController`, navigate to the `navigationBar` package and create a new Kotlin file, name it `BottomScreenNavController`. Below is how we will execute different routes to access the respective composables.

```kotlin
@Composable
fun BottomScreenNavController(navController: NavHostController) {
    BottomNavigation {
        val navBackStackEntry by navController.currentBackStackEntryAsState()
        val currentDestination = navBackStackEntry?.destination
        bottomNavigationItems.forEach { screen ->
            BottomNavigationItem(
                selectedContentColor = Teal200,
                alwaysShowLabel = true,
                icon = {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(
                            imageVector = screen.icon,
                            contentDescription = screen.title
                        )
                        if (currentDestination?.hierarchy?.any { it.route == screen.route } == true) {
                            Text(
                                text = screen.title,
                                textAlign = TextAlign.Center,
                                fontSize = 10.sp
                            )
                        }
                    }
                },
                selected = currentDestination?.hierarchy?.any { it.route == screen.route } == true,

                // handle bottom bar items onClick
                onClick = {
                    navController.navigate(screen.route) {
                        // Pop up to the start destination of the graph to
                        // avoid building up a large stack of destinations
                        // on the back stack as users select items
                        popUpTo(navController.graph.findStartDestination().id) {
                            saveState = true
                        }
                        // Avoid multiple copies of the same destination when
                        // re selecting the same item
                        launchSingleTop = true
                        // Restore state when re selecting a previously selected item
                        restoreState = true
                    }
                })
        }
    }
}
```

Here, we are adding a predefined composable function, `BottomNavigation`, responsible for creating the Bottom Navigation bar, which contains the `bottomNavigationItems`.

Within this `navController`, we are calling `currentBackStackEntryAsState()`. This will observe the Navigation pattern, and as soon as the back stack changes, it recomposes the `navController` and updates the Navigation with the new `State` value.

We are going to observe `navBackStackEntry`. Whenever its value is changed, the `navController` is notified, and the updated `State` in the current screen should be visible to the user.

`BottomNavigationItem` is another predefined composable function. It takes parameters such as `icon` (a composable function), `onClick`, `selected`, `alwaysShowLabel`, and `selectedContentColor`.
- The `icon` - will set up each item `imageVector` and the title.
- `selected` - will inform the `navController` whenever a Bottom Navigation item is selected.

Whenever `currentDestination` of the items `hierarchy` has an active screen route, the item associated with that route will be the current selective and active composable/screen.
- `selectedContentColor` - will add the content color to the active `selected` item.
- `alwaysShowLabel` - it can be true or false to show when the item title should be visible.
- `onClick` - whenever an item is clicked, we want `navController` to navigate to execute the newly selected route and save its `State` so that it can be restored during back stacking.

### Collapse the navigation bar
Our Navigation components are set, and we can set a composable `bottomBar` and make the whole Bottom Navigation bar collapsible. Navigate to the `navigationBar` package and create a new Kotlin file, name it `BottomCollapse`.

Below is how we will set up this `bottomBar` collapsible:

```kotlin
@ExperimentalMaterialApi
@Composable
 fun BottomCollapse() {
    val bottomBarHeight = 55.dp
    val bottomBarHeightPx = with(LocalDensity.current) {
        bottomBarHeight.roundToPx().toFloat()
    }
    val bottomBarOffsetHeightPx = remember { mutableStateOf(0f) }
    val nestedScrollConnection = remember {
        object : NestedScrollConnection {
            override fun onPreScroll(
                available: Offset,
                source: NestedScrollSource
            ): Offset {
                val delta = available.y
                val newOffset = bottomBarOffsetHeightPx.value + delta
                bottomBarOffsetHeightPx.value =
                    newOffset.coerceIn(-bottomBarHeightPx, 0f)
                return Offset.Zero
            }
        }
    }
    val scaffoldState = rememberScaffoldState()
    val navController = rememberNavController()
    Scaffold(
        modifier = Modifier.nestedScroll(nestedScrollConnection),
        scaffoldState = scaffoldState,
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Collapse Bottom Navigation",
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth()
                    )
                })
        },
        bottomBar = {
            BottomAppBar(
                modifier = Modifier
                    .height(bottomBarHeight)
                    .offset {
                        IntOffset(
                            x = 0,
                            y = -bottomBarOffsetHeightPx.value.roundToInt())
                    }) {
                BottomScreenNavController(navController)
            }
        }) { innerPadding ->
        BottomScreenNavHost(innerPadding, navController)
    }
}
```

Here, we are adding a `bottomBarHeight`, which should be the maximum visible `bottomBar`, that should be mutable.

First, we need to create an interface to connect to the nested scroll system using the object `NestedScrollConnection`. Implementing this connection allows reacting on the nested scroll-related events and influences scrolling descendants and ascendants.

An `onPreScroll()` event allows the parent screen to consume a portion of a drag event based on the source of the scroll event (descendant and ascendant). Once the scroll source is identified, we will create an `Offset` within the `bottomBar`.

Finally, we wrap everything inside a `Scaffold`. A Scaffold is a Jetpack Compose layout that uses the same layout elements as the XML `RelativeLayout` or `LinearLayout`. It still uses components such as the Top bar, Bottom bar, and Navigation drawer.

Using `Scaffold`, we will set up everything in the appropriate places. We add a `topBar` and a `bottomBar`.

Note that we haven't specified the alignment for any of these composables. A `topBar` will specifically place that composables as the application top bar. A `bottomBar` will precisely place that composables as the application Bottom bar.

Under the hood, `Scaffold` knows where to put the top bar, body content, and the Bottom Navigation.

Since `bottomBar` is executing a Bottom screen, we will add all parameters such as `nestedScrollConnection`, `NavHost`, and `NavController` here.

In this case, the `nestedScrollConnection` is set as a `Modifier` to the `BottomAppBar` with `IntOffset` from x and y position. The first argument sets x, the horizontal component, and the second sets y, the vertical component. When a scroll event is identified, these arguments will adjust the `bottomBar` mutable height, making the bar collapsible.

With that set, you can call `BottomCollapse()` in your `MainActivity.kt`'s `setContent` as shown below:

```kotlin
setContent {
    // Note: CollapsibleBottomNavigationUsingJetpackComposeTheme is derived
    // from the name you gave your application when setting up a new project
    CollapsibleBottomNavigationUsingJetpackComposeTheme{
        // A surface container using the 'background' color from the theme
        Surface(color = MaterialTheme.colors.background) {
            BottomCollapse()
        }
    }
}
```

> Note: `CollapsibleBottomNavigationUsingJetpackComposeTheme` can differ. This name is derived from the name you gave your application when setting up a new project.

Your application is now set, and you can run it to test it out.

### Conclusion
Jetpack Compose is a remarkable technology that is revolutionizing the way you write your application views and screens.

Check the following guides to learn more about the concept of Jetpack Compose Navigation:
- [Getting Started With Jetpack Compose](/engineering-education/getting-started-with-jetpack-compose-in-android/)
- [Basics of Android Navigation Components](/engineering-education/android-navigation-components/)
- [Building Scrollable and Lazy Components in Jetpack Compose](/engineering-education/building-scrollable-and-lazy-components-in-jetpack-compose/)
- [Bottom Navigation Bar in Android Applications](/engineering-education/bottom-navigation-bar-in-android/)

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)

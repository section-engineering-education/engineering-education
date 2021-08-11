### Introdution
Jetpack Compose is an Android UI Toolkit with a new declarative approach. Compose makes it easy to design and manage your app's user interface by providing a declarative API that lets you render your app's UI without having to change front-end views. This jargon has to be explained, but the ramifications are crucial for app design.

Many apps require the visualization of multiple items. Jetpack Compose includes a set of components that only compose and lay out elements visible in the view-port of the component. `LazyColumn` and `LazyRow` are two of these components. They manage how items are displayed regardless of their number. This makes development easier and provides an interactive experience to the users.

In this tutorial, we'll learn the best practices to build such components.

### Prerequisites
To follow through this tutorial, you need to have the following:
- [Android Studio Arctic Fox (2020.3.1) Stable](https://developer.android.com/studio#downloads) or higher - These versions of Android Studio have the Jetpack Compose plugin.
- [Basic knowledge on Jetpack Compose](https://developer.android.com/jetpack/compose/index.html). If you are not familiar with Compose, feel free to check out [this article on Section]() to get started.
- A good understanding of the [Kotlin Coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html) as it will help you understand [Kotlin Coroutines with Jetpack Compose](https://developer.android.com/jetpack/compose/coroutines.html).

> Note: At the time of writing this tutorial, Jetpack Compose is in version 1.0.0.

### Terminologies
In this tutorial, we'll use the following Compose components:
- `LazyColumn` - A component that manages how items are displayed vertically regardless of their number.
- `LazyRow` - This component manages how a list of items is displayed horizontally.
- `Painter` - A component that renders an image to the Image composable function.
- `Modifier` - Manipulates the appearence of the component.
- `Box` - Serves as a container for other components.
- `Text` - This is a built-in composable function that shows a string that is passed as an argument. It is commonly used in Text and Button composables.

### Creating a new project
Launch Android Studio and create a new `Empty Copose Project`. Let's name it `Scrolls`.

![Create Compose project](create-compose-project.png)

### Required dependenies

### Vertical scrolling
When working with containers such as a `Box` or a `Surface`, child elements can sometimes get out of view. In such cases, you can use the `Modifier.horizontalScroll` or `Modifier.verticalScroll` modifiers to enable the respective scrolling orientation mode.

In this tutorial, we'll be focusing on `LazyColumn` and `LazyRow` as they are more advanced since they have a built-in scrolling behavior and have several useful functions.

Moving on, let's create a `LazyColumn` that will contain an item with an `image` and a `Text`:

### Creating a sample list item
A sample item is used to generate a list of items with similar appearance but might contain different data/content.

#### i). List item model
A model class is used to define the data used in a sample item.

```kotlin
data class ListItem(val name: String)
```

Here we've defined a `ListItem` class that has a `name` property. Objects of this class will be used to generate a list of items.

#### ii). Sample item composable view
Here, we need to create the actual item using composable functions. We'll use a Box as the parent container of an `Image` and a `Text`

```kotlin
@Composable
fun ListItem(item: ListItem) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(4.dp)
            .height(60.dp)
            .background(color = Color.Gray)
    ) {
        Row(
            modifier = Modifier
                .padding(horizontal = 8.dp)
                .fillMaxWidth()
        ) {
            Image(
                painter = painterResource(id = R.drawable.ic_launcher_foreground),
                contentDescription = "user icon",
                modifier = Modifier
                    .padding(horizontal = 8.dp)
                    .align(CenterVertically)
            )
            Text(
                modifier = Modifier
                    .padding(horizontal = 16.dp)
                    .align(CenterVertically),
                text = item.name,
                color = Color.White,
                fontSize = 16.sp
            )
        }
    }
```
The `ListItem` composable function takes a `ListItem` as an argument and returns a `Box` that contains a `Row` that contains an `Image` and a `Text`.

The painter resource used in the `Image` function is automatically generated when creating a new project. You can chose to use your own image resource as well.

Preview:

```kotlin
@Preview(showBackground = true)
@Composable
fun Preview() {
    ScrollsTheme {
        ListItem(item = ListItem("John Doe"))
    }
}
```
`ScrollsTheme` is a default theme that is generated based on the name of the project. If you gave a different name to your project, the theme name might be different fro this one.

![Sample Item](sample-item.png)

#### iii). List item objects
The following is a an array of `ListItem` objects. These  items will be used to generate a srollable list.

```kotlin
private val listItems: List<ListItem> = listOf(
    ListItem("Jayme"),
    ListItem("Gil"),
    ListItem("Juice WRLD"),
    ListItem("Callan"),
    ListItem("Braxton"),
    ListItem("Kyla"),
    ListItem("Lil Mosey"),
    ListItem("Allan"),
    ListItem("Mike"),
    ListItem("Drew"),
    ListItem("Nia"),
    ListItem("Coi Relay")
)
```

#### iv). Display a scrollable list of items
To display a vertical scrollable list, we'll create a composable function that accepts a list of items as the argument, in this case, `listItems` we just created.

The function then uses the `items()` method wich is part of `LazyColumn` to pass a single item at a time as the user scrolls.

```kotlin
@Composable
fun DisplayList(items: List<ListItem>) {
    LazyColumn(modifier = Modifier.fillMaxSize(1F)) {
        items(items) { item ->
            ListItem(list = item)
        }
    }
}
```

#### v). Call the `DisplayList` function
At this point, we can only view a sample item on the preview screen. We need to call the `DisplayList` function in the `onCreate()` method to display the list of items when the app starts.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {
        ScrollsTheme {
            Surface(color = MaterialTheme.colors.background) {
                DisplayList(items = listItems)
            }
        }
    }
}
```

#### Run the App
Upon running the app, you should see a scrollable list of items as shown below:

![Scrollable list](vertical-list.png)

Unlike in imperative programming, decrarative programming is quite simple in terms of the number of steps required and the logic implemented.

### Grouping items with stickyHeaders
In the following example, we'll be creating a scrollable list of items that will be grouped together with a sticky header. Each header will be identified by the first character of the emements in a common group. This way, each group will have its own header.

Its called sticky headers because the it is pinned to the top of the list when the user scrolls down.

The code below is an advancement of the [previous example](#iv-display-a-scrollable-list-of-items).

```kotlin
@ExperimentalFoundationApi
@Composable
fun DisplayList(items: List<ListItem>) {
    LazyColumn(modifier = Modifier.fillMaxSize(1F)) {

        val grouped = items.groupBy { it.name[0] }
        grouped.forEach {initial, items ->
            stickyHeader {
                Text(
                    text = initial.toString(),
                    modifier = Modifier.padding(10.dp)
                )
            }
            items(items) { item ->
                ListItem(item = item)
            }
        }
    }
}
```
**Explanation:**
- `grouped` - is a `Map` that contains a `List` of `ListItem` objects grouped by the first character of the `name` property.
- `initial` - is the first character of the `name` property in the `List` of `ListItem` objects.
> Note: The Sticky header API is still in development and might change in the future. For this reason, we're using the experimental API by annotting the function with `@ExperimentalFoundationApi`

![Sticky headers](sticky-headers.png)

### Scroll states
In Compose, a state is a property of an object that can be changed at run time. We use `LazyStates` to define a state of scrollable components at a any time.

Example:

```kotlin
@Composable
fun DisplayList(items: List<ListItem>) {
    val listState = rememberLazyState()
    // Update the state
    LazyColumn(
        state = listState,
        modifier = Modifier.fillMaxSize(1F)) {
        ...

        }
```

A LazyState can keep track of the visible items and their position in the list.

### Scroll positions


### Displaying a Horizontal Scrolable list
Similar to ``  , we'll create a `LazyRow` that will contain the sample item created earlier:
### Animating the list items
Animations are a very important part of any UI. They can be used to give the user a sense of motion when scrolling through a list.

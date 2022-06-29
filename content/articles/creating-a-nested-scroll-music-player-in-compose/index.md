---
layout: engineering-education
status: publish
published: true
url: /creating-a-nested-scroll-music-player-in-compose/
title: Creating a Nested Scroll Music Player App in Jetpack Compose
description: This tutorial will guide the reader on how to create a nested scroll music player app in Jetpack Compose.
author: noni-diana
date: 2022-06-29T00:00:00-11:00
topics: [Languages, API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-nested-scroll-music-player-in-compose/hero.jpg
    alt: Nested Scroll Music Player App in Jetpack Compose
---
The nested scroll is one of the technical features one can implement in an app. With Jetpack Compose, we can achieve this by combining scrollable components with different orientations.
<!--more-->
This approach uses items as children of other items. Alternatively, we can make use of the NestedScroll API offered by Compose.

### Goal
In this tutorial, we'll learn how to implement a nested scroll functionality in a simple music player app using the earlier mentioned approach as it is easier to implement, customize, and handle states.

### Prerequisites
To follow along with this guide, the reader will need:
- Android Studio IDE installed on your machine.
- A good understanding of the Jetpack Compose core concepts.
- A physical device or an emulator running Android 8 or greater.

### Table of contents
- [Creating the project](#creating-the-project)
- [Setting up the project](#setting-up-the-project)
- [Creating the user interface](#creating-the-user-interface)
- [Implementing nested scroll](#implementing-nested-scroll)
- [Playing audio in Compose](#playing-audio-in-compose)
- [Running the app](#running-the-app-1)
- [What's beyond this tutorial?](#whats-beyond-this-tutorial)
- [Conclusion](#conclusion)

### Creating the project
Launch the IDE and start a new empty Compose project and fill the parameters as shown below:

![New Compose Project](/engineering-education/creating-a-nested-scroll-music-player-in-compose/new-compose-project.png)

### Setting up the project
#### Changing the Compose and Kotlin versions
Head to your `build.gradle`(project) file and change `compose_version` to `1.1.1`. This is the latest version at the time of writing this tutorial.

```bash
buildscript {
    ext {
        compose_version = '1.1.1'
    }
}
```

This requires version `1.6.10` of the Kotlin compiler. Update it as shown below and sync the project:

```bash
plugins {
    ...
    id 'org.jetbrains.kotlin.android' version '1.6.10' apply false
}
```

>NOTE: Since Compose is evolving so fast, some features used in this tutorial may be changed or expelled in future versions.

### Creating the user interface
Create a new package named `composables` under the root package. This package will hold our composable functions. For simplicity purposes, we're going to build a single screen app made up of the following composables:

#### The artist item

```kotlin
@Composable
fun ArtistItem() {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        ArtistImage( // cast the Image import to match this name
            painter = painterResource(id = R.drawable.juice_wrld),
            modifier = Modifier
                .padding(all = 8.dp)
                .size(60.dp)
                .clip(CircleShape),
            contentScale = Crop,
            contentDescription = "artist image"
        )
        Text(
            text = "Juice Wrld"
        )
    }
}
```

The function above displays a circular image and a text below it. They represent the image and name of an artist respectively.

#### The music item

```kotlin
@Composable
fun MusicItem() {
    Row(
        modifier = Modifier
            .padding(vertical = 4.dp)
            .fillMaxWidth(),
        verticalAlignment = CenterVertically
    ) {
        Icon(
            painter = painterResource(id = R.drawable.ic_audio),
            contentDescription = "audio icon"
        )
        Column(
            horizontalAlignment = Start,
            verticalArrangement = SpaceBetween,
            modifier = Modifier.padding(all = 8.dp)
        ) {
            Text(text = "Song title")
            Text(
                text = "Song artist",
                fontSize = 12.sp,
                color = Color.Gray
            )
        }
    }
}
```

This item shows a music icon and a title along with the artist of the song. This function can be modified to receive a song object as an input (parameter).

> You can get the icons and images from [this GitHub](https://github.com/nonimdiana/ComposeNestedScrollPlayer) repository.

### Implementing nested scroll
Switch to `MainActivity.kt` file and add the following code inside the `Surface` scope. Alternatively you can paste it directly in the `setContent` scope.

```kotlin
val state = rememberLazyListState()

LazyColumn(modifier = Modifier.fillMaxSize(fraction = 0.85F), state = state) {
    item {
        Text(
            text = "Artists",
            fontSize = 24.sp,
            fontWeight = Bold
        )
    }
    item {
        LazyRow(modifier = Modifier.fillMaxWidth()) {
            items(count = 10) {
                ArtistItem()
            }
        }
    }
    item {
        Text(
            text = "Songs",
            fontSize = 24.sp,
            fontWeight = Bold,
            modifier = Modifier.padding(vertical = 8.dp)
        )
    }
    items(count = 10) {
        MusicItem()
    }
}
```

As mentioned earlier, to create a nested scroll, we need to entangle the composables within the body of a scrollable component. This is made possible by the fact that the `item` and `items` functions are overloads of the `LazyRow` and `LazyColumn` functions that can hold other composables including scrollable ones.

The hierarchy/level of nesting is determined by the number of elements that are passed to the `item` or `items` functions. However, to achieve a smooth scrolling effect, it is advisable to **avoid** nesting too many items.

#### Running the app
When you run the app at this point, you should see the following:

![Nested Scroll](/engineering-education/creating-a-nested-scroll-music-player-in-compose/nested-scroll.png)

### Playing audio in Compose
To play audio in Compose, we need to pass the context and the resource (audio file) to the `MediaPlayer` constructor.

For more advanced audio controls and customization, you can use `ExoPlayer`. ExoPlayer is a third-party media playing library for Android. It offers a lot of features that are currently not available in the default MediaPlayer API.

You can learn more about ExoPlayer [here](https://github.com/android/uamp/blob/main/docs/FullGuide.md).

#### Providing the audio file
We can provide a media file from different sources such as the local storage of the device or the internet. Similarly, an audio file can be enclosed within the app resources.

Create a `raw` file within the `resources` folder and add an audio file of your choice.

#### Instantiating the MediaPlayer
Here, we need to reference and play the audio file from the raw folder. Create a function that generates an instance of the MediaPlayer as shown below:

```kotlin
@Composable
fun PlaySampleAudio(context: Context) {
    val sampleSong: MediaPlayer by remember {
        mutableStateOf(
            MediaPlayer.create(
                context,
                R.raw.sample_song // your audio file
            )
        )
    } // track the playing state
    var isPlaying by remember {
        mutableStateOf(false)
    }
}
```

#### Adding the media control
The following code adds a round-shaped card with a button to play or pause the audio. Paste it in the `PlaySampleAudio` function.

```kotlin
Card( // Icon and button holder
    modifier = Modifier
        .padding(8.dp)
        .clip(RoundedCornerShape(8.dp))
        .fillMaxWidth()
) {
    // this is similar to the MusicItem properties
    Row(
        modifier = Modifier
            .padding(horizontal = 8.dp)
            .fillMaxWidth(),
            // Align items end to end
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            modifier = Modifier.padding(vertical = 4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                painter = painterResource(id = R.drawable.ic_audio),
                contentDescription = "audio icon"
            )
            Column(
                horizontalAlignment = Alignment.Start,
                verticalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.padding(all = 8.dp)
            ) {
                Text(text = "Sample Song")
                Text(
                    text = "Artist",
                    fontSize = 12.sp,
                    color = Color.Gray
                )
            }
        }

        // Add control buttons
        Row(
            modifier = Modifier.padding(vertical = 4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {

            Icon(
                painter = painterResource(id = R.drawable.ic_prev),
                contentDescription = "back button"
            )
            // check state and set/update the icon
            IconButton(onClick = {
                if (isPlaying) {
                    isPlaying = false
                    sampleSong.pause()
                } else {
                    isPlaying = true
                    sampleSong.start()
                }
            }) {
                Icon(
                    painter = painterResource(
                        id =
                        if (isPlaying) R.drawable.ic_pause else R.drawable.ic_play
                    ),
                    contentDescription = "play/pause button"
                )
            }

            Icon(
                painter = painterResource(id = R.drawable.ic_next),
                contentDescription = "next button"
            )
        }
    }
}
```

The above code allows us to play or pause the audio based on the value of the `isPlaying` state.

#### Running the app
Call the `PlaySampleAudio` function below the scrollable list and run the app. You should expect it to look like the one below:

![Player](/engineering-education/creating-a-nested-scroll-music-player-in-compose/player.png)

### What's beyond this tutorial?
This project can be extended to include more features such as listing the songs on the device, indicating the current playing song, showing notifications, and so on. This would require a foreground service implementation for a smoother user interaction and resources consumption.

You can learn more about services in Compose in [this guide](https://androidexample365.com/foreground-service-jetpack-compose/)

### Conclusion
In this tutorial, we learned what a nested scroll is and how to implement it using entangled items. We have also covered the basics of loading and playing audio in Compose using the MediaPlayer API. Continue exploring to learn more about playing media in Jetpack Compose.

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)

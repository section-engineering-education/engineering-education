
  
#### Architecting Flutter project using BLOC pattern
### Introduction
Having a series of good practices in project architecture is key to success. It helps in developing a scalable and maintainable app. In this article, we'll be seeing how to architect our Flutter project in Bloc pattern. Bloc pattern means developing app in a way that it can grow over time from simple to complex features.
 
BLOC is an acronym for Business Logic Owner, which means that it's owned by business layer. In Flutter, business logic means, organized into separate BLOCs. It's organized within the project to represent different features/categories. For example, have one BLOC for managing users (registration/login/logout). The other bloc for data (storage/transport) and so on.


But in Flutter, everything is a widget . And it's not possible to write business logic in widgets, isn't it?

### Table of contents

- App Demonstration.

- Step one: Creating music streaming bloc.

- Step two: setter method for song.

- Step three: Creating separate bloc for artist management.

- Step four: Creating separate bloc for songs management.

- Step five: Creating Album Management Bloc.

- Step six: Creating business layer to combine the blocs.

- Step seven: Creating data blocs.

- Step eight: Home page.

- Conclusion.

### App Demonstration

Well, the answer might be "No". But I'll show you how to do that using BLOC pattern. Let's begin by creating a simple demo project.

We'll be building a music streaming app. Create an empty Flutter project with no packages installed.

Next, let's enter the details of our application in pubspec.yaml file. This is for us to declare dependencies on external packages. After that, run `flutter packages get` command from your terminal. install all the dependencies.

```dart
dependencies:
  meta: ^1.7.0

```
### Step one: Creating music streaming bloc.
Now, let's declare a simple business logic in `lib/src/music_streaming.dart` . This will be our music streaming BLOC.

```dart
import 'package:meta/meta.dart';
import 'data/song.dart';
import 'data/songs_list_screen.dart';
class MusicStreamingBLOC {
	String _artistName;
	String _trackName;
	Song get song => _song ?? new Song();
	set song(Song s) {
		if (s == _song) {
			return;
			}
	_song = s;
	onChanged();
	}
}
```
Since we don't have any BLOC files in our project, let's create separate directories for each BLOC. I'll name the directory `music_streaming`. The command to create this directory is:
```command
mkdir lib/src/music_streaming
```
We can now move the BLOC code into new file
```dart
lib/src/music_streaming.dart
```
As you see in the above code, we have created a new class named MusicStreamingBLOC . We have also declared two instance variables. One for storing the artist name and another for storing the song name. And we have provided getter and setter methods for both of these instance variables.
### Step two: setter method for song.
The next step is to write business logic in this BLOC based on our requirements. Let's begin by writing a setter method for the song instance variable.
```dart
Song get song => _song ?? new Song();
	set song(Song s) {
		if (s == _song) {
			return;
	}
	_song = s;
	onChanged();
}
```
As you see, this BLOC has a single responsibility which is to manage the lyrics of a song. But there are scenarios where we need to implement logic for different features. For example, what if our requirements change and now this BLOC needs to manage artists as well? We can't represent artist BLOC inside this BLOC because it results in spaghetti code .

### Step three: Creating separate bloc for artist management.
So let's create separate music_streaming BLOCs for artist and song management. Now, let's create `lib/src/artist_management.dart` file with the following content in it.
```dart
import 'data/album.dart';
class ArtistManagementBLOC {
	String _artistName;
	Album get album => _album ?? new Album();
	set album(Album s) {
	if (s == _album) {
		return;
		}
	_album = s;
	onChanged();
	}
}
```
### Step four: Creating separate bloc for songs management.
Let's create another file lib/src/song_management.dart for managing song details. This BLOC has following content in it.
```dart
import 'data/songs_list_screen.dart';
class SongManagementBLOC {
	String _trackName;
	String get track => _track ?? new Track();
	set track(String track) {
	if (track == _track) {
		return;
}
	_track = track;
	onChanged();
  }
}
```
### Step five: Creating Album Management Bloc
```dart
class AlbumManagementBLOC {
	String _trackName;
	String get track => _track ?? new Track();
	set track(String track) {
		if (track == _track) {
			return;
}
	_track = track;
	onChanged();
	}
}
```
### Step six: Creating business layer to combine the blocs.
Now it's time to create a business layer in our project. This is the place where we'll combine all the BLOCs together to build our application logic.
```dart
import 'package:meta/meta.dart';
import 'data/song_management.dart';
import 'data/artist_management.dart';
import 'data/album.dart';
import "lib/src/business_layer.dart";
class MusicStreamingBLOC {
	String _artistName;
	String _trackName;
	SongManagementBLOC get song_management =>
		_song_management ?? new SongManagementBLOC();
	ArtistManagementBLOC get artist_management =>
		_artist_management ?? new ArtistManagementBLOC();
	AlbumManagementBLOC get album_management =>
		_album_management ?? new AlbumManagementBLOC();
	Song get song => _song ?? new Song();
		set song(Song s) {
			if (s == _song) {
				return;
}
	_song = s;
	onChanged();
}
void onChanged() async {
	List songs = await song_management.getSongs();
	songs.addAll(artist_management.getArtistSongs());
	songs.addAll(album_management.getAlbumSongs());
	playListChanged();
 }
}
```
### Step seven: Creating data blocs:
For this code below we have an additional class for handling the data for our app to as expected. The data Bloc handles the various lists that contain data. The list incude the album ,artist, tracks and updates them.
```dart
class DataBLOC {
	List<Album> albums = [];
	List<Artist> artists = [];
	List<Track> tracks = [];
		SongManagementBLOC get song_management => _song_management ?? new SongManagementBLOC();
	ArtistManagementBLOC get artist_management => _artist_management ?? new ArtistManagementBLOC();
	AlbumManagementBLOC get album_management => _album_management ?? new AlbumManagementBLOC();
}
void onChanged() async {
	List tracks = await song_management.getSongs();
	songs.addAll(artist_management.getArtistSongs());
	songs.addAll(album_management.getAlbumSongs());
	playListChanged();
}
```
### Step eight: Home page
This is the the code that runs out our application .
```dart
import lib/src/music_streaming.dart;
class AppDelegate {
@override Widget build(BuildContext context) {
	return new MaterialApp(
		home: Scaffold(
		appBar: AppBar(
		title: Text('BLOC architecture'),
			),
		body: Center( child:
			Column( mainAxisAlignment: MainAxisAlignment.center,
				children:[ Expanded(child:
		MusicStreamingBLOC()),
			],
		  ),
		),
	  ),
	);
  }
}
```
You can see that we have created a separate file `lib/src/data.dart` which contains DataBLOC class. This DataBLOC is the central piece of our entire application. This is because we use all BLOCs in this class to fetch data and it exposes them to different widgets.
We injected Data BLOC object in Music Streaming BLOC class so that it can use all BLOCs created.

### Conclusion:
In this article, I introduced the BLOC pattern and its pros and cons. We have seen a classical example of how to break down a monolithic application into modules using BLOC pattern. We also reviewed few best practices when it comes to breaking your UI into separate parts. Thanks for reading!

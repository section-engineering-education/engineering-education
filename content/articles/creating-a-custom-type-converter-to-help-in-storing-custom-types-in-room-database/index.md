### Creating a Custom TypeConverter to Help in Storing Custom Types in Room Database

In your project, you may need to store a custom data type in `Room` database, such as Date, Bitmap, and so on. To our database access methods, we can apply the @TypeConverter annotation. But,  sometimes normal TypeConverters aren't enough.

Imagine a scenario where you need to store a List of Objects e.g Users, Cars, e.t.c. This requires you to come up with a way that you can convert your Data Type to something that Room can understand i.e., maybe that List of Objects to a String.

In this tutorial, we will create a custom TypeConverter and use it in the Room database.

### Table of contents
- [Prerequisites](#prerequisites)
- [What are TypeConverters in Room database](#what-are-typeconverters-in-room-database)
- [What are custom types in Room](#what-are-custom-types-in-room)
- [Creating an Android project](#step-1---creating-an-android-project)
- [Adding necessary dependencies](#step-2---adding-necessary-dependencies)
- [Defining a data model](#step-3---defining-a-data-model)
- [Setting up Room database](#step-4---setting-up-room-database)
- [Storing the custom type](#step-5---storing-the-custom-type)
- [Creating the type converter](#step-6---creating-the-type-converter)
- [Using the type converter](#step-7---using-the-type-converter)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this tutorial:
- Have Android Studio installed.
- Good knowledge of implementing `Room` database.
- An understanding of Kotlin programming language.

### What are TypeConverters in Room database
These are methods that the tell 'Room' database on how to convert custom types to and from recognized kinds that Room recognizes. 

### What are custom types in Room
Typically, the data you enter into a database is of a primitive type, for example, int, String, float, double, and so on.  
However, there are situations when a custom type, such as Date, Location, or your own class, is required. 
To effectively implement such a value in the database, you must inform Room how to convert your custom type to the primitive type. 
This is where `TypeConverter` comes in. 

We will be trying to store a word and its various meanings in `Room` database (The way a dictionary has a word that has several meanings).

### Step 1 - Creating an Android project
Launch your Android studio and create an empty Android project, with Kotlin as its primary language.

### Step 2 - Adding necessary dependencies
Next, add the Gson and `Room` database dependencies in your app-level `build.gradle`.

```gradle
def room_version = "2.4.1"
implementation "androidx.room:room-runtime:$room_version"
annotationProcessor "androidx.room:room-compiler:$room_version"

implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```

### Step 3 - Defining a data model
Let's take a scenario where you have received such a response from an API. Which is a response containing the meanings of the word that the user had searched.

```json
"meanings": [
    {
    "partOfSpeech": "noun",
    "definitions": [
        {
        "definition": "(in science fiction) a robot with a human appearance.",
        "example": "a space station inhabited only by androids",
        "synonyms": [],
        "antonyms": []
        },
        {
        "definition": "an open-source operating system used for smartphones and tablet computers.",
        "example": "I have an Android phone and I like it a lot",
        "synonyms": [],
        "antonyms": []
          }
        ]
    }
]
```

If you convert this response to some data classes, you should have something similar to this.

```kotlin
data class Meaning(
    @SerializedName("definitions")
    val definitions: List<Definition>,
    @SerializedName("partOfSpeech")
    val partOfSpeech: String
) {
    data class Definition(
        @SerializedName("antonyms")
        val antonyms: List<String>,
        @SerializedName("definition")
        val definition: String,
        @SerializedName("example")
        val example: String,
        @SerializedName("synonyms")
        val synonyms: List<String>
    )
}
```

### Step 4 - Setting up Room database
Our entity will have a word, a list of its meanings, and a primary key.

```kotlin
@Entity
data class WordEntity(
    val word: String,
    val meanings: List<Meaning>,
    @PrimaryKey(autoGenerate = true)
    val id: Int? = null
)
```

Our DAO interface with only one method for inserting a Word Entity into the database. Feel free to add other methods for querying, deleting, or updating.

```kotlin
@Insert
suspend fun insertWord(wordEntity: WordEntity)  
```

### Step 5 - Storing the custom type
As you have seen from the Entity class, we need to store a list of `Meanings` in a column and the other data, this will be hard because `Meaning` is of a complex type that `Room` cannot understand.

We will need to come up with a custom type converter that will help us in storing this type in `Room` database.

First, let us create a custom JsonParser for parsing `String`. This is important because later in your project you may need to switch and use a different library to parse strings such as Moshi, Jackson, and Kotlin Serialization; this will help.

Just create a util package and define an `Interface` with the following methods.

```kotlin
interface JsonParser {
    fun <T> fromJson(json: String, type: Type): T?
    fun <T> toJson(obj: T, type: Type): String?
}
```

While still on the util package, create a new class that implements the `JsonParser` `Interface`.

```kotlin
class GsonParser(
    private val gson: Gson
): JsonParser {
    override fun <T> fromJson(json: String, type: Type): T? {
        return gson.fromJson(json, type)
    }

    override fun <T> toJson(obj: T, type: Type): String? {
        return gson.toJson(obj, type)
    }
}
```

### Step 6 - Creating the type converter
Create a class called `Converters` that takes in the `JsonParser` we created as a parameter

```kotlin
class Converters(
    private val jsonParser: JsonParser
) {
    ...
}
```

> Make sure you annotate the class with `@ProvidedTypeConverter` because we need to provide our own instance of a `TypeConverter`.

Inside the class, define the first function that will convert the list of `Meaning` to `String`.

```kotlin
fun toMeaningJson(meaning: List<Meaning>) : String {
    return jsonParser.toJson(
        meaning,
        object : TypeToken<ArrayList<Meaning>>(){}.type
    ) ?: "[]"
}
```

> Don't forget to annotate the method you have created with a `@TypeConverter` annotation to mark it as a type converter function.

Below that function, define another one that will aid us in converting `Json` back to a list of `Meaning`

```kotlin
fun fromMeaningsJson(json: String): List<Meaning>{
    return jsonParser.fromJson<ArrayList<Meaning>>(
        json,
        object: TypeToken<ArrayList<Meaning>>(){}.type
    ) ?: emptyList()
}
```
> Don't forget to annotate it with a `@TypeConverter` annotation to mark it as a type converter function.

Your final class should look something similar to this:

```kotlin
@ProvidedTypeConverter
class Converters(
    private val jsonParser: JsonParser
) {
    @TypeConverter
    fun toMeaningJson(meaning: List<Meaning>) : String {
        return jsonParser.toJson(
            meaning,
            object : TypeToken<ArrayList<Meaning>>(){}.type
        ) ?: "[]"
    }

    @TypeConverter
    fun fromMeaningsJson(json: String): List<Meaning>{
       return jsonParser.fromJson<ArrayList<Meaning>>(
            json,
           object: TypeToken<ArrayList<Meaning>>(){}.type
       ) ?: emptyList()
    }
}
```

### Step 7 - Using the type converter
Finally, in order to use this custom `TypeConverter`, annotate your Room database abstract class with @TypeConverters and pass in our 'Converters' class. 

```kotlin
@TypeConverters(Converters::class)
abstract class DatabaseName : RoomDatabase() {
```

And that is all, now you can store a complex type such as a list of meanings of a word as a string in `Room` database and convert it back to a list.

### Conclusion
With that, you now have an understanding of what type converters are in `Room` database, examples of custom types, creating a custom JsonParser, and you have learned how to come up with your own custom TypeConveter and use it. Don't stop there, keep learning more about `Room` database.

For a clear look at the code, check out this Github repository - [RoomTypeConverterDemo](https://github.com/osirevaline/RoomTypeConverterDemo).

### Further reading
- [Room TypeConverters](https://developer.android.com/reference/androidx/room/TypeConverters)
- [Using Room to refer to complex data](https://developer.android.com/training/data-storage/room/referencing-data)
- [Android Architecture Components: Room — Custom Types](https://medium.com/android-news/android-architecture-components-room-custom-types-ad6a477004e0)

Happy coding.

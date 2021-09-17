---
layout: engineering-education
status: publish
published: true
url: /introduction-spring-data/
title: Getting Started with Spring Data JPA in Kotlin
description: This article takes the reader through creating a recipe application using spring data and Java Persistent API. JPA is a set of standards that define how Java objects are represented in a database.
author: odhiambo-paul
date: 2021-02-06T00:00:00-15:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-spring-data/hero.jpg
    alt: Java Persistent API example image
---
Spring Data JPA is a set of standards that defines how Java objects are represented in a database. JPA provides a set of annotations and interfaces that make it possible to configure and map Java objects to relational database tables. Relationships between Java objects are provided through annotations (one-to-one, one-to-many, many-to-one, many-to-many).
<!--more-->
The implementations of the JPA specifications are provided by the object-relational mapping tools (ORM) like [Hibernate](https://hibernate.org/). JPA makes it easier to switch from one ORM tool to another without refactoring code since it abstracts the complexities involved with various ORM tools. 

JPA falls between the ORM and the application layer. In this tutorial, we will be modeling a `Recipe` application using Spring Data and JPA. The entity-relationship diagram for our application is shown below.

![Entity Diagram](/engineering-education/introduction-spring-data/relationship.png)

### Prerequisite
Before we begin we will need the following:
1. JDK installed on your computer.
2. Favourite IDE.
3. Some knowledge of [Java](https://www.javatpoint.com/java-tutorial) and [Spring Boot](https://spring.io/projects/spring-boot).

### Creating the application
We will be using [spring initializr](https://start.spring.io/) to create our application.
1. Open [Spring initializr](https://start.spring.io/) in your browser.
2. Select the Kotlin language.
3. Add `Spring Web`, `Spring Data JPA`, and `H2 Database` dependencies.
4. Leave other configurations as default and click on generate the project.
5. Unzip the downloaded project and open it in your favorite IDE. I will be using [Intelij IDEA community](https://www.jetbrains.com/idea/download/#section=linux) which is available for free.
6. Sync the project with maven to download and all the dependencies.

### Domain
The domain package is where we will define our models.
- In the root package where the `DemoApplication.kt` file exists, create a new package with the name `domain`.
- In the `domain` package you created above, create two Kotlin files with the names `Recipe.kt` and `Ingredient.kt`.

#### JPA mappings
There are two types of JPA mappings:
1. **Unidirectional mapping** - This is where the JPA mapping is only done on one side of the relationship. If entity A has a one-to-many relationship with entity B then only a one-to-many relationship annotation is on entity A.
2. **Bidirectional mapping** - This is where the JPA mappings are declared on both entities that are related. If entity A has a one-to-many relation with entity B then a one-to-many annotation is used on entity A and a Many-To-One annotation is used on entity B. This type of mapping is recommended since it makes it possible to navigate the object graph in both directions.

#### JPA CASCADE types
JPA CASCADE types control how state changes are cascaded from the parent object to child objects.
1. **PERSIST**  - save operations are cascaded to related entities.
2. **MERGE** - related entities are merged if the owning entity is merged.
3. **REFRESH** - related entities are refreshed when the owning entity is refreshed.
4. **REMOVE** - removes all the related entities whenever the owning entity is deleted.
5. **DETACH** - detaches all the related entities if a manual detach occurs.
6. **ALL** - applies all the above cascade options.

#### JPA relationships
1. **OneToMany Relation**
In this type of JPA relation, a row in the parent entity is referenced by many child records in another entity. From our entity relationship diagram above we can see that the `Recipe` entity has a **OneToMany** relationship with the ingredient entity meaning that a single recipe is capable of having several ingredients.


In the `Recipe.kt` file we created earlier, add the code snippets below.

```kotlin
    import javax.persistence.*

    @Entity
    data class Recipe(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY) //Uses underlying persistence framework to generate an Id
        var id: Long?,
        var description: String?,
        var prepTime: String?,
        var cookTime: String?,
        var servings: String?,
        var url: String?,
        var directions: String?,
        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "recipe")
        var ingredient: Set<Ingredient>?
    )
```

- `@Entity` annotation marks the `Recipe` data class as a JPA entity that can be persisted into the database.
- `@Id` annotation marks the `id` field as the primary for the database table that will be generated from the `Recipe` entity.
- `@GeneratedValue(strategy = GenerationType.IDENTITY)` annotation sets the `id` field to be autogenerated and `GenerationType.IDENTITY` marks the field as unique.
- `@OneToMany` annotation creates an OneToMany relationship between `Recipe` entity and the `Ingredient` entity. `mappedBy = "recipe"` indicates that the `recipe` field in the `Ingredient` entity is the foreign key for the `Recipe` entity.

In the `Ingredient.kt` file, add the snippet below.
```kotlin
    @Entity
    data class Ingredient(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long?,
        val description: String?,
        val amount: BigDecimal?,
        @ManyToOne
        val recipe: Recipe
    )
```

- `@ManyToOne` annotation creates a bidirectional mapping that makes it possible to navigate the object graph to and from `Ingredient` and `Recipe`.

2. **OneToOne Relation**
In this type of JPA relation, an entity can only belong to another entity. In our `Recipe` entity add the `notes` variable of the type `Note` that we are going to create.

```kotlin
   @Entity
    data class Recipe(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY) //Uses underlying   persistence framework to generate an Id
        var id: Long?,
        var description: String?,
        var prepTime: String?,
        var cookTime: String?,
        var servings: String?,
        var url: String?,
        var directions: String?,
        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "recipe")
        var ingredient: Set<Ingredient>?,
        @OneToOne(cascade = [CascadeType.ALL])
        var notes: Notes?,//Foreign Key
    )
```

- `@OneToOne` annotation indicates that the `Notes` entity will have a One-to-one relationship with the `Recipe` entity.

In the `domain` package, create a Kotlin file with the name `Notes.kt`. In the `Notes.kt` file created, add the code snippet below.
```kotlin
    @Entity
    data class Notes(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long?,
        @OneToOne
        var recipe: Recipe?,
        @Lob //Allows for more than 256 characters in the notes field as hibernate always limits the String field to 256 characters.
        var notes: String?
    )
```

- `@OneToOne` annotation creates a bidirectional mapping with the `Recipe` entity.

3. **ManyToMany relationship**
In this type of JPA relationship, one or more rows from an entity are associated with one or more rows from another entity.

From our entity relation diagram, we see that the `Recipe` entity has a ManyToMany relation with the `Category` entity, meaning a recipe can belong to many categories and vice versa.

In the `domain` package create a Kotlin file with the name `Category.kt`. In the `Category.kt` file add the code snippet below.
```kotlin
    @Entity
    data class Category(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        val name: String,
        @ManyToMany(mappedBy = "category")
        val recipe: Set<Recipe>
    )
```

In the `Recipe` entity, add the `category` field and annotate it with the `@ManyToMany` annotation.
```kotlin
    @Entity
    data class Recipe(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY) //Uses underlying   persistence framework to generate an Id
        var id: Long?,
        var description: String?,
        var prepTime: String?,
        var cookTime: String?,
        var servings: String?,
        var url: String?,
        var directions: String?,
        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "recipe")
        var ingredient: Set<Ingredient>?,
        @OneToOne(cascade = [CascadeType.ALL])
        var notes: Notes?,//Foreign Key
        @ManyToMany
        @JoinTable(
        name = "recipe_category",
        joinColumns = [JoinColumn(name = "recipe_id")],
        inverseJoinColumns = [JoinColumn(name = "category_id")]
        )   
        val category: Set<Category>?
    )
```

- The `@JoinTable` annotation generates a table with the name `recipe_category` that will store the primary keys for both `Recipe` and `Category`. The generated table has two columns; `recipe_id` that references the id in the `Recipe` table, and `category_id` which references the id column of the `Category` table.

4. **Enumerated**
Used to store map enum values to database representation in JPA.

In the `domain` package create a Kotlin enum class with the name `Difficulty`. Add the code snippet below into the enum class created above.
```kotlin
    enum class Difficulty {
        EASY, MODERATE, HARD
    }
```

In the `Recipe` entity add the `difficulty` field of the type Difficulty as shown below.
```kotlin
    @Entity
    data class Recipe(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY) //Uses underlying   persistence framework to generate an Id
        var id: Long?,
        var description: String?,
        var prepTime: String?,
        var cookTime: String?,
        var servings: String?,
        var url: String?,
        var directions: String?,
        @OneToMany(cascade = [CascadeType.ALL], mappedBy = "recipe")
        var ingredient: Set<Ingredient>?,
        @OneToOne(cascade = [CascadeType.ALL])
        var notes: Notes?,//Foreign Key
        @ManyToMany
        @JoinTable(
        name = "recipe_category",
        joinColumns = [JoinColumn(name = "recipe_id")],
        inverseJoinColumns = [JoinColumn(name = "category_id")]
        )   
        val category: Set<Category>?,
        @Enumerated(value = EnumType.STRING)
        val difficulty: Difficulty,
    )
```

- The `@Enumerated(value = EnumType.STRING)` sets the difficulty field to enumeration. There are two enum types; `EnumType.STRING` and `EnumType.ORDINAL`.
- `EnumType.ORDINAL` stores the enum values as integers i.e. `EASY` as 1, `HARD` as 3 while `EnumType.STRING` stores the values as string i.e. `EASY` as EASY.

### Conclusion
Now that you have learned how to model the database using Spring Data JPA, implement the JPA repositories, and then create a REST controller for our recipe application. Source code for the application can be found [here](https://github.com/paulodhiambo/recipe).

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)

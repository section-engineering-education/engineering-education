---
layout: engineering-education
status: publish
published: true
url: /introduction-to-pragmatic-functional-java/
title: Introduction to Pragmatic Functional Java
description: This article is an attempt to create a new Java coding style called Pragmatic Functional Java. Functionality with pragmatism PFJ Java, the functional programming equivalent to Java, incorporates ideas and methods from PFJ Java (PFJ).
author: mary-wanjiku
date: 2021-11-18T00:00:00-14:34
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-pragmatic-functional-java/hero.jpg
    alt: Introduction to Pragmatic Functional Java Hero image
---
This article is an attempt to help developers write in a new Java coding style called Pragmatic Functional Java (PFJ). PDF is clean, trustworthy, and understandable code is generated via the use of a compiler.
<!--more-->
Even though Java 8 continues to employ this coding style, Java 11 streamlines and clarifies it significantly. With Java 17, it becomes even more descriptive, and gains from each new Java feature.

Java causes significant adjustments to the working habits and methodologies of developers. It is not a simple task to change habits, and it is much more difficult when the habits are important and have been around for a long time.

### Table of contents
- [Pragmatic functional Java components](#pragmatic-functional-java-components)
- [ANAMAP rule, avoiding the null components](#anamap-rule-avoiding-the-null-components)
- [NBE regulation, Null business exception](#nbe-regulation-null-business-exception)
- [Legacy code to PFJ format code transformation](#legacy-code-to-pfj-format-code-transformation)
- [Interfacing with legacy code](#interfacing-with-legacy-code)
- [Supplying an old style API](#supplying-an-old-style-api)
- [Managing variable scopes](#managing-variable-scopes)
- [Brief technical overview of option and result](#brief-technical-overview-of-option-and-result)

### Pragmatic functional Java components
PFJ uses Functional Pragmatic (FP) concepts but does not try to enforce Functional Pragmatic specific terminology.

Pragmatic in the sense of serving practical purposes, there are many aspects that Java emphasizes. 

Such as:
- Lowering the mental burden.
- Increasing the dependability of the code.
- Increasing the long-term maintenance capabilities of the system.
- To aid in the construction of error-free code, you may use a compiler.
- If we want to make your code seem and feel natural, this would be more difficult to create incorrect code.

PFJ has lofty objectives, however, there are just two rules to follow:
- Avoid using the `null` object.
- In the business world, there should be no exceptions at all under the circumstances.

We will be going into an in-depth look at each of these rules.

### ANAMAP rule, avoiding the null components
Variable nullability is a `Special State`. The boilerplate code they use in their programs and the run-time faults they introduce are common. To get around these problems, utilize PFJ's `Option<Q>` container to hold any missing values. Input data and fields are included as well as the returned results.

A class can internally utilize the value `null` to increase efficiency or to retain backward compatibility in specific instances. `Option<Q>` should always be carefully specified and not evident to class users in certain instances, so that every class API may utilize it.

There are many benefits to using this strategy:
- It's easy to see when there's code with nullable variables. There is no need to read anything since the documentation, source code, and annotations can all be trusted.
- They are different types of nullable, so they can't be incorrectly assigned.
- This boilerplate script for `null` checks has previously been removed completely from the codebase.

### NBE regulation, Null business exception
Catastrophic (technical) defects are the exceptions in PFJ, not normal mistakes. There is no way to gracefully end the application when this exception is thrown. Exceptions and interceptions are strictly discouraged.

`Special States` may also include business exceptions. It utilizes the `Result<Q>` container to deal with enterprise-level issues. This includes returned values, input parameters, and fields. Using this container for fields is rare.

Exceptions at the corporate level are only authorized when required. Older Java libraries may be interacted with by using wrapper methods. Wrapping is supported by the `Result<Q>` container. This container implements them.

The following advantages come from not making any exceptions to the rule of null business exceptions:
- The source code is littered with mistakes. Time spent reading is unnecessary. If you want to know what exceptions might be thrown when and under what circumstances, look at the call trees, documentation, and source code.
- During the compilation process, the compiler guarantees proper error management and propagation is carried out. Error management and propagation have a low amount of boilerplate code.
- For circumstances in which everything goes according to plan, and faults can be addressed when it's most convenient, programming may be written to accommodate this.
- This code is easy to read and comprehend since there are no unexpected breaks or transitions in the execution sequence.

### Legacy Code to PFJ format code transformation
It is fantastic to have guidelines, but how can the code be written exactly?

Let's begin with some fundamental backend features:

```Java
public interface ClientRepository
{
    Client findByIdentity(Client.Identity clientIdentity);
  }

   public interface ClientProfileRepository
  {
   ClientProfile findByIdentity(Client.Identity clientId);
     }

   public class ClientService
      {
   private final ClientRepository clientRepository;
   private final ClientProfileRepository clientProfileRepository;

   public ClientWithProfile getClientWithProfile(Client.Identity clientIdentity)
          {
           Client client = clientRepository.findByIdentity(clientIdentity);

           if (client == null) {
           throw ClientNotFoundException("Clients with an ID card " +
           clientIdentity + " page not found");
         }

    ClientProfile details = clientProfileRepository.findByIdentity    (clientIdentity);

            return ClientWithProfile.of(client, details == null
            ? ClientProfile.defaultDetails()
            : details);
    }
}
```

#### Explanation
The example uses interfaces to provide context clarity. The most crucial aspect is the `getClientWithProfile` method.

Let's study this step-by-step.

The first line finds the repository for the client variable's value in the client database. If the client is not in the repository, the user variable will be null. If the value is null, then raise a throwable business exception.

Once the client's profile information has been retrieved, the following step is to get access to it. It's not a mistake that there aren't any details. Defaults are utilized for the profile when the requirements are inadequate.

Numerous flaws may be found in the piece of code above. Null is a bad idea when the repository contains no values, but this isn't made clear in the user interface.

A thorough investigation of these repositories' documentation and implementation is required before we can make an informed guess as to how they work.

However, even though annotations are utilized to provide recommendations, API functionality is not guaranteed.

The repository will be subject to the following standards to address this issue:

```Java
public interface ClientRepository
  {
    Option<Client> findByIdentity(Client.Identity clientIdentity);
      }

public interface ClientProfileRepository
      {
    Option<ClientProfile> findByIdentity(Client.Identity clientIdentity);
}
```

As a result, there's no need to make any assumptions, the API makes it plain whether or not the returned item exists.

Let's take another look at the `getUserWithProfile` method. It is also possible for the procedure to raise an exception instead of returning a value.

Because this is a business-related exemption, the rule may be applied. The fundamental objective of the change puts a disclaimer on the possibility that a method may provide either a value or an error.

### Interfacing with legacy code
The existing code does not adhere to PFJ guidelines. When exceptions are triggered, values such as `Null` and `Undefined` will be returned. However, rewriting the code to make it PFJ-compatible isn't always an option. In particular, this is valid for third-party libraries and frameworks.

#### Using legacy code
Invoking old code has two drawbacks. Each instance may be traced back to an infringement of the appropriate PFJ regulation:

#### Resolving business exceptions

`lift()` in the `Result<Q>` contains a convenience method for most usage scenarios.

A `Result<Q>` object might well be created from an exception that serves as a Calling for a `Cause instance.` Another argument is a lambda that encapsulates the PFJ-compatible code in its function.

A throwable exception may be turned into an instance of Cause using the `Causesutility` class's `fromThrowable()` function. 

With these functions combined, the following results may be obtained using the method `Result.lift()`:

```Java
public static Results<> buildURI(String uri)
 {
    return Results.lift(Cause::fromThrowable, () -> URI.build(uri));
}
```

What happens if you work with a null value? The `option.option()` method may be used to encapsulate a `<Q>` API response that returns null.

### Supplying an old-style API
Old code often needs the use of PFJ-style code to function. If you are using an older API, you may have to keep it around for compatibility with the modern PFJ method. Because of this, you'll want to create a new PFJ-style API first, and then a traditional adaptor.

There are some simple techniques that might be handy:

```Java
public static <Q> Q unwrap(Results<Q> values) {
    return values.fold(
        reason -> { throw new StatesException(cause.remark()); },
        info -> info
    );
}
```

There is no ready-to-use assistance technique in `Result<Q>` because of these factors:
- Checked and unchecked case-specific exceptions would be thrown in various ways.
- Depending on the use case, causes may be transformed into a wide variety of various exceptions.

### Managing variable scopes
In this section, we'll look at a variety of real-world circumstances that might arise while developing PFJ-style code.

Please note that the examples following presume that `option<Q>` should be used instead of `Result<Q>`, even though this is completely meaningless since all concerns are the same for both choices. Instead of throwing exceptions, function calls will be transformed to `Result<Q>`.

1. **Nested scopes**
These containers use a large number of lambdas to perform computations and operations on the data they hold. They are only available from inside their lambda's body since each one automatically specifies the scope of its arguments.

Imperative programming doesn't often use this and it might lead to misunderstandings if you do. Fortunately, there is a straightforward solution to the problem.

Consider the following piece of imperative code:

```Java
variable value01 = function01(...);
variable value02 = function02(value1, ...);
variable value03 = function03(value1, value2, ...);
```

For `function02` and `function 03` to have access to the value01, they should call `value01()`. Converting from PFJ style immediately will not work, to put it another way:

```Java
    function01(...)
       .flatMap(value01 -> function02(value01, ...))
       .flatMap(value02 -> function03(value01, value02, ...));
```

#### Explanation
Value01 cannot be accessed because of an Error. We must utilize a nested scope, i.e. nest calls, to keep the value available.

```Java
 function01(...)
       .flatMap(value01 -> function02(value01, ...)
           .flatMap(value02 -> function03(value01, value02, ...)));
```

#### Explanation
The first flatMap makes use of function1's value as a return value, whereas flatMap02 does the same with function02's element. Function03 may now access and use value1, since it's still inside the scope.

The more nested scopes there are, the more difficult it is to comprehend the code. In this case, expanding the scope of a function is highly suggested.

2. **Parallel Scopes**
Many unrelated variables must be calculated or retrieved before beginning construction of an item. Consider the following example.

```Java
variable value01 = function01(...);
variable value02 = function02(...);
variable value03 = function03(...);

return new MyObj(value01, value02, value03);
```

At first glance, moving to PFJ style scopes seems a lot like converting to nested scopes. In imperative programming, all values are equally visible. If numerous values are required, scopes will become too nested, which is a bad thing.

When `option<Q>` is used, all of the `Result<Q>` method is accessible. In this way, all computations are performed in `parallel`, and the result is an individual `MapperX<...>` user interface. 

Here are three methods in total on this interface, each named after a different return value. Input lambdas are accepted by these methods, and they behave precisely the same as equivalent methods in `option<Q>` and `Result<Q>`. This is an example of imperative code being rewritten in PFJ style.

```Java
return Result.all(
          function01(...),
          function02(...),
          function03(...)
        ).map(MyObj::new);
```

#### Explanation
This approach offers a few additional benefits, such as being flat and small. In the first place, it demonstrates its purpose by doing extensive calculations and then saving all of the results.

The sequential pattern of imperative programming makes it difficult to see the end aim. The second reason is that, since each number is computed separately, no other values are thrown into the mix. With less background, it's easier to understand and justify each function call.

### Brief technical overview of Option and Result
These two entities are known as monads in Functional Programming.

To implement the monad, we use the basic variation of it called `Option<Q>`.

`Result<Q>` is, therefore, a streamlined and concentrated version of Either's `Either<L,R>` interface. Due to the reduced amount of type needed, a more focused API is comparable to `Option<Q>`, but it also sacrifices universality and flexibility.

Two aspects are the emphasis of this implementation:
- There should be no problems using this class with other JDK classes, such as `Optional<Q>` and `Stream`.
- API was designed to make a purpose statement more comprehensible.

Each container has just a few essential methods, such as these:
- While conserving state, `Option<Q>` may still alter values using the map transformation function. Thus, the final result is still favorable.
- A successful `Result<Q>` may become a failure by using the flatMap() method, for example. This might change the present state of the application.
- To handle both cases, present/empty as well as successful/failed concurrently, `Result<Q>` contains a fold() function.

### Conclusion
As a result of this article, we now have a basic understanding of the pragmatic function in the Java programming language.

It is a contemporary, functional programming-based Java coding language that is simple and understandable. In addition, we have demonstrated how we can put it into action.

Happy reading!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)

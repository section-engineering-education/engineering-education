---
layout: engineering-education
status: publish
published: true
url: /implementing-a-spring-query-language-spring-boot-search-operations/
title: Implementing a Spring Query Language Spring Boot Search
description: In this article we will look at what Spring Boot query language and how to implement search operations in Spring Boot
author: ayemobola-tolulope
date: 2022-06-09T00:00:00-14:40
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-a-spring-query-language-spring-boot-search-operations/hero.jpg
    alt: Implementing a Spring Query Language
---
Having built many endpoints and, in many cases, a whole API, I know the amount of work that goes into building them and querying them for various use in the system - or maybe others.
<!--more-->
Making resources available is one of the things to take into serious consideration during building. In some situations, you would like to let the customer search for information in many easy ways while avoiding the temptation of creating too many services for this to be possible.

In comes the Search Language (also called Query Language) in Java. With this provision, you can easily make searching the API powerful, clean, and easy. While not having to deal with intricacies of methods, functions, and tons of coding.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisite](#prerequisite)
- [Introduction](#introduction)
- [Query Language Search Operations](#query-language-search-operations)
- [Carrying out searches using `CriteriaBuilder` class](#carrying-out-searches-using-criteriabuilder-class)
- [Creating the `Controller` class](#creating-the-controller-class)
- [Carrying out searches using `Querydsl ` class](#carrying-out-searches-using-querydsl--class)
- [Key takeaways](#key-takeaways)
- [Conclusion](#conclusion)

### Prerequisites
To follow along the reader should have the following:
- Basic knowledge in Java and Spring Boot.
- An Integrated Development Environment (IDE) installed on your machine.

### Introduction
We need to ask the vital question – what is the importance of a query language? The answer is simple and maybe short. For any API – direct or complex – searching or filtering through the available resources using easy-to-use criteria, parameters or fields might be as straightforward as projected.

Therefore, a query language must be structured in an organised yet flexible way. This would allow anyone to filter through to the needed resources. In another vein, what is a query language? This is simply the scheme or syntax for performing queries to storage or databases for resources that they hold.

### Query Language Search Operations
Essentially, amongst the many available implementations, we will be working with two implementations of Spring Boot’s Search Query – CriteriaBuilder and Querydsl.

For all the implementations that we will be walking through, we will be working with a User model and a set of criteria for performing searches; `AppUser` and `SearchCriteria` classes respectively:
```java
@Entity
@Getter
@Setter
public class AppUser{

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;

private String username;
private String fullName;
private String emailAddress;
private int age;

}
```

```java
public class SearchCriteria {

private String searchKey;
private String searchOperation;
private Object searchValue;

}

```
The `searchKey` holds the name of the field – for example, in our case, the username.
The `searchOperation` holds the operation for comparison – for example, less than, equal to. The `searchValue` holds the value for the field – for example, Steve, 40.

### Carrying out searches using 'CriteriaBuilder' class
The `CriteriaBuilder` query happens in the persistence layer of any project. The persistence is usually attributed to the repository layer. One subject of consideration while building a query is balancing the abstraction.

Therefore, in the same pot of consideration, we will need to put the flexibility of the query procedure and manage the complexity of the API. We only need to pass in some criteria and expect to get some results to work this function.

This is how it works:

```java
@Repository
public class UserRepository implements IUserRepository {

@PersistenceContext
private EntityManager manager;

@Override public List<User> searchForAUser(List<SearchCriteria> params) {

CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
CriteriaQuery<User> query = builder.createQuery(User.class);

Root r = query.from(User.class);

Predicate predicate = builder.conjunction();

UserSearchQueryCriteriaConsumer searchConsumer = new UserSearchQueryCriteriaConsumer(predicate, builder, r);
params.stream().forEach(searchConsumer);

predicate = searchConsumer.getPredicate();
query.where(predicate); List<User> result = entityManager.createQuery(query).getResultList();

return result;
}

@Override
public void save(User entity) {
entityManager.persist(entity);
}
}
```

Now we will look at the `QueryCriteriaClient` class:
```java
@Getter
@Setter
public class QueryCriteriaClient implements Consumer<SearchCriteria>{

    private Predicate predicate;
    private CriteriaBuilder builder;
    private Root r;

    @Override
    public void accept(SearchCriteria param) {
        if (param.getOperation().equalsIgnoreCase(">")) {
            predicate = builder.and(predicate, builder
              .greaterThanOrEqualTo(r.get(param.getKey()),
    param.getValue().toString()));
        } else if (param.getOperation().equalsIgnoreCase("<")) {
            predicate = builder.and(predicate, builder.lessThanOrEqualTo(
              r.get(param.getKey()), param.getValue().toString()));
        } else if (param.getOperation().equalsIgnoreCase(":")) {
            if (r.get(param.getKey()).getJavaType() == String.class) {
                predicate = builder.and(predicate, builder.like(
                  r.get(param.getKey()), "%" + param.getValue() + "%"));
            } else {
                predicate = builder.and(predicate, builder.equal(
                  r.get(param.getKey()), param.getValue()));
            }
        }
    }
}
```

From the code snippet above, our method takes constraints, does a search and returns a result of a series of results to us.

### Creating the 'Controller' class
The final step would be to write in support of our persistence in a controller. To do this, we will create a `controller` class and write a `searchForAll()` method in it so that, with this, we can pass the search expression to carry out a search.

```java
@RestController
public class UserController {

    @Autowired
    private IUserRepository api;

    @GetMapping("/all-users")
    @ResponseBody
    public List<User> searchForAll (@RequestParam(value = "search", required = false) String searchString) {
        List<SearchCriteria> parameters = new ArrayList<SearchCriteria>();
        if (searchString!= null) {
            Pattern searchPattern = Pattern.compile("(\w+?)(:|<|>)(\w+?),");
            Matcher pathMatcher = searchPattern.matcher(searchString + ",");
            while (pathMatcher.find()) {
                parameters.add(new SearchCriteria(searchPattern.group(1),
                  searchPattern.group(2), searchPattern.group(3)));
            }
        }
        return api.searchUser(parameters);
    }
}
```

To test this implementation, run the project and visit the URL below (in this format):
`http://localhost:9009/all-users?search=userame:sam,age<=20`

The eventual sample generated response should be:

```java
[{
"id":1,
"username":"sam",
"fullName":"sam smith",
"email":"sam@test.com",
"age":29
}]
```

### Carrying out searches using 'Querydsl' class
The second implementation we will look at is the `Querydsl` approach. More straightforward than `CriteriaBuilder` in that we would need dependencies here. 

In the `pom.xml` file, add the following dependencies:
```xml
<dependency>
    <groupId>com.querydsl</groupId>
    <artifactId>querydsl-apt</artifactId>
    <version>4.2.2</version>
    </dependency>
<dependency>
    <groupId>com.querydsl</groupId>
    <artifactId>querydsl-jpa</artifactId>
    <version>4.2.2</version>
</dependency>
```

Also, in the same `pom.xml` file, add the Annotation Processing Tool plugin
```xml
<plugin>
    <groupId>com.mysema.maven</groupId>
    <artifactId>apt-maven-plugin</artifactId>
    <version>1.1.3</version>
    <executions>
        <execution>
            <goals>
                <goal>process</goal>
            </goals>
            <configuration>
                <outputDirectory>target/generated-sources/java</outputDirectory>
                <processor>com.mysema.query.apt.jpa.JPAAnnotationProcessor</processor>
            </configuration>
        </execution>
    </executions>
</plugin>
```
We will build a `PathBuilder`. With this, we can build dynamic paths to be used more abstractly.

```java
public class MyUserPredicate {
    private SearchCriteria criteria;
    public BooleanExpression getPredicate() {
        PathBuilder<MyUser> entityPath = new PathBuilder<>(MyUser.class, "user");

        if (isNumeric(criteria.getValue().toString())) {
            NumberPath<Integer> path = entityPath.getNumber(criteria.getKey(), Integer.class);
            int value = Integer.parseInt(criteria.getValue().toString());
            switch (criteria.getOperation()) {
                case ":":
                    return path.eq(value);
                case ">":
                    return path.goe(value);
                case "<":
                    return path.loe(value);
            }
        }
        else {
            StringPath path = entityPath.getString(criteria.getKey());
            if (criteria.getOperation().equalsIgnoreCase(":")) {
                return path.containsIgnoreCase(criteria.getValue().toString());
            }
        }
        return null;
    }
}
```

In accounting for open filtering criteria, we apply an easy and flexible implementation with the `SearchCriteria` class we created earlier, as stated earlier. So please apply to the endpoint as before, and we are good to go.

### Key takeaways
One thing we can pick is searching for projects. Also, we can make it support a broader dataset base and get the same results we hoped for. Being built with Maven, there should be no challenges starting and running.

### Conclusion
In this article, we looked at different ways to implement the Spring Query Language. We implemented these search operations and saw how they worked. You can find these implementations in this [GitHub repository](https://github.com/teevyne/spring-query-language.git). This is a strong beginning for implementing this API data filtering function.

All the best in the making searching better in your applications.

Happy coding!

---
Peer review contribution by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

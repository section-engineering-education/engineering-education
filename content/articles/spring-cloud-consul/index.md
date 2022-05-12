---
layout: engineering-education
status: publish
published: true
url: /spring-cloud-consul/
title: Spring Cloud service discovery using Spring Cloud Consul
description: In this tutorial, we will build Spring Boot microservices that will communicate with each other through Spring Cloud Consul.
author: faith-siaji
date: 2022-02-22T00:00:00-10:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spring-cloud-consul/hero.png
    alt: Spring Cloud service discovery using Spring Cloud Consul
---

Spring Boot consul is a service discovery and configuration framework for Spring Boot applications. It is a lightweight, extensible, and easy to use service discovery and configuration framework designed with Spring Boot and Spring Cloud.
<!--more-->
This tutorial will create an online application to manage shops. We will develop the application using the microservice architecture.

We will have two services:
1. Product service - this will manage all the products sold within all the shops in the system.
2. Shops service = this manages the information regarding the shops present in the system.

### Prerequisites
1. [Consul](https://www.consul.io/) and [JDK](https://www.oracle.com/java/technologies/downloads/) installed on your machine.
2. Knowledge in [Spring](https://spring.io/) framework and [Spring Boot](https://spring.io/).

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Setting up consul](#setting-up-consul)
- [Setting up Spring Boot application](#setting-up-spring-boot-application)
  - [Product service](#product-service)
  - [Shop service](#shop-service)
- [Testing](#testing)
- [Conclusions](#conclusions)

### Setting up consul
We will need to install consul locally on our development machine for this tutorial.

Navigate to [consul website](https://www.consul.io/downloads.html) and download the latest version of consul for your operating system. Then, extract the downloaded file and run the consul command to start the consul agent, as shown below.

```bash
consul agent -server -bootstrap-expect=1 -data-dir=consul-data -ui -bind=<your ip address>
```
> **Note:** replace <your ip address> with your ip address.

The output of the command above should look like the following.

```bash
test@DEV-34:/$ sudo /usr/local/bin/consul agent -server -bootstrap-expect=1 -data-dir=consul-data -ui -bind=192.168.1.169
==> Starting Consul agent...
           Version: '1.8.4'
           Node ID: '2bff16b4-eaf1-540d-1e96-bb168f5fdf74'
         Node name: 'DEV-34'
        Datacenter: 'dc1' (Segment: '<all>')
            Server: true (Bootstrap: true)
       Client Addr: [127.0.0.1] (HTTP: 8500, HTTPS: -1, gRPC: -1, DNS: 8600)
      Cluster Addr: 192.168.1.169 (LAN: 8301, WAN: 8302)
           Encrypt: Gossip: false, TLS-Outgoing: false, TLS-Incoming: false, Auto-Encrypt-TLS: false

==> Log data will now stream in as it occurs:

    2022-02-09T13:30:32.813+0300 [WARN]  agent: BootstrapExpect is set to 1; this is the same as Bootstrap mode.
```

Now that we have the consul installed and running on our development machine, we need to verify if the consul agent is fully functional by navigating to [http://localhost:8500](http://localhost:8500) on our web browser. We can see the services running on our development machine from the browser dashboard, as shown below.

![Consul dashboard](/engineering-education/spring-cloud-consul/consul-dashboard.png)


### Setting up Spring Boot application
#### Product service
Navigate to [spring initilzr](https://spring.io/guides/gs/initializr/) on your web browser. Input the application name as `product-service` and package name as `com.example.productservice`.

Add `Actuator`, `Lombok`, `Web`, `Rest repositories`and `Consul discoveries` as the project dependencies.

Click the generate button to download the boilerplate project code with the required dependency configurations.

Unzip the downloaded compressed file and open it in your favourite IDE. Navigate to the `src/main/java/com/example/productservice/` directory and update the `ProductServiceApplication.java` file as shown below.

```java
@SpringBootApplication
@EnableDiscoveryClient
public class ProductServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }

}
```
`@EnableDiscoveryClient` is used to enable the service discovery and configuration framework. This annotation allows the services to register themselves to the consul agent.

In the `application.properties` file, add the following configurations.
```yaml
server.port=9090
spring.application.name:product-service
management.security.enabled=false

```
- `server.port`: The port number of the service. The application will start and run on this port.
- `spring.application.name`: The name of the service. This name is used to register the service in consul. Other services can also discover this service through this name.
- `management.security.enabled`: Disable security in the management endpoints that the Actuator exposes.

In the root project package, create a new Java class named `Product` and update it with the code snippet as shown below.

```java
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Product {
    String name;
    float price;
}
```
- `@AllArgsConstructor`: This annotation is used to create a constructor with all the fields.
- `@NoArgsConstructor`: This annotation is used to create a constructor without any fields.
- `@Setter`: This annotation is used to create setters for all the fields.
- `@Getter`: This annotation is used to create getters for all the fields.
- `@ToString`: This annotation is used to create a toString method for the class.

To expose our service to the world, we need to create a new Java class named `ProductController` that will accept HTTP requests. Update it with the code snippet as shown below.
```java
@RestController
public class ProductController {
    private static final Map<String, List<Product>> productDatabase;

    static {
        productDatabase = new HashMap<>();
        List<Product> products = new ArrayList<>();
        Product sugar = new Product("Sugar", 120.0f);
        products.add(sugar);
        Product salt = new Product("Salt", 30.0f);
        products.add(salt);

        productDatabase.put("ABC shop", products);

        List<Product> items = new ArrayList<>();
        Product soap = new Product("Soap", 30.0f);
        items.add(soap);
        Product cooking = new Product("Cooking", 70.0f);
        items.add(cooking);

        productDatabase.put("XYZ", items);
    }

    @RequestMapping(value = "/shopproducts/{shopName}", method = RequestMethod.GET)
    public List<Product> getProductPerShop(@PathVariable("shopName") String shopName) {
        List<Product> products = productDatabase.get(shopName);
        if (products == null) {
            products = new ArrayList<>();
            Product product = new Product("No product", 0f);
            products.add(product);
        }
        return products;
    }
}

```
- `@RestController`: This annotation is used to create a controller class.
- Since we did not implement the database layer, we declare a static map of products in the static block. This will act as our database layer.
- `getProductPerShop`: This method is used to get the products for a given shop. It filters the products based on the shop name and returns the list of products.

#### Shop service
Navigate to [spring initilzr](https://spring.io/guides/gs/initializr/) on your web browser. Input the application name as `shop-service` and package name as `com.example.productservice`.

Add `Actuator`, `Lombok`, `Web`, `Rest repositories`and `Consul discoveries` as the project dependencies.

Click the generate button to download the boilerplate project code with the required dependency configurations.

Unzip the downloaded compressed file and open it in your favourite IDE. Navigate to the `src/main/java/com/example/shopservice/` directory and update the `ShopServiceApplication.java` file as shown below.
```java
@SpringBootApplication
@EnableDiscoveryClient
public class ShopServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopServiceApplication.class, args);
    }

}

```
`@EnableDiscoveryClient` is used to enable the service discovery and configuration framework. This annotation allows the service to register itself to the consul agent.

In the root application directory, create a new Java class named `ShopServiceDelegate` and update it with the code snippet below.
```java
@Service
public class ShopServiceDelegate {
    @Autowired
    RestTemplate template;

    public String getDataFromProductService(String shopName) {
        String response = template.exchange("http://product-service/shopproducts/{shopName}",
                HttpMethod.GET, null, new ParameterizedTypeReference<String>() {
                }, shopName).getBody();

        System.out.println("Received " + response + " -  " + new Date());

        return "Shop Name -  " + shopName + " :::  Product details " + response + " -  " + new Date();

    }

    @Bean
    @LoadBalanced
    public RestTemplate template() {
        return new RestTemplate();
    }
}
```
- `@Service`: This annotation is used to create a service class.
- `getDataFromProductService`: This method is used to get the products for a given shop. It filters the products based on the shop name and returns the list of products.
- `template()`: This method is used to create a RestTemplate bean. We have marked this bean as `@LoadBalanced` to create a load-balanced RestTemplate. When many instances of this service are run, a load-balanced RestTemplate will be created.

To make it possible for other services to communicate with the shop service, we need to create a new Java class named `ShopServiceRestController` that will accept HTTP requests. Update it with the code snippet shown below.
```java
@RestController
@AllArgsConstructor
public class ShopServiceController {
    ShopServiceDelegate shopServiceDelegate;

    @RequestMapping(value = "/getshopdetails/{shopName}", method = RequestMethod.GET)
    public String getProducts(@PathVariable("shopName") String shopName) {
        return shopServiceDelegate.getDataFromProductService(shopName);
    }
}
```
- `@RestController`: This annotation is used to create a controller class.
- `@AllArgsConstructor`: This annotation is used to create a constructor with all the fields. Through this annotation, we inject the ShopServiceDelegate bean through constructor injection.

### Testing
Run the product service and verify that it's running and discoverable by the consul agent in the Consul dashboard, as shown below.

![Product Service](/engineering-education/spring-cloud-consul/product-service.png)

Now that the product service is running successfully, we can run the shop service. Once the shop service is started, we can verify from the consul dashboard that it is running without issues and is discoverable by the consul agent, as shown below.

![Shop service](/engineering-education/spring-cloud-consul/shop-service.png)

When we make a GET request to [http://localhost:8098/getshopdetails/ABC](http://localhost:8098/getshopdetails/ABC), we get a response like the one below.

```json
[{"name":"Soap","price":30.0},{"name":"Cooking","price":70.0}] -  Thu Feb 10 09:15:17 EAT 2022
```

We can request the shop service to the product service without requiring the product service URL and port. We can only get the response with the name of the service and the endpoint. Consul simplifies service discovery.

When used with Docker, we do not need to keep track of the IP addresses that change, but the services can communicate with the service name.

### Conclusion
In this tutorial, we have learned how to efficiently deploy the Consul service registry and discovery server and clients on our development machine.

You can now try implementing a Spring Boot project using the microservice architecture and deploy with Spring Cloud consul. The complete source code for the tutorial can be found [here](https://replit.com/@faithsiaji/spring-consul#).

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

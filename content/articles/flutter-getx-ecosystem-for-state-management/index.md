---
layout: engineering-education
status: publish
published: true
url: /flutter-getx-ecosystem-for-state-management/
title: Understanding the Flutter GetX Ecosystem for State Management
description: This tutorial will show you how to build a shopping application with Flutter, as well as using GetX for state management, navigation, and rendering widgets.
author: eme-lekwa
date: 2021-09-21T00:00:00-07:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/flutter-getx-ecosystem-for-state-management/hero.png
    alt: Flutter GetX Ecosystem for State Management Hero Image
---
State management enables you to pass data from one user interface to another. When the state of your application changes, the system rebuilds the user interface.
<!--more-->
Flutter traditionally uses the Stateful Widget to manage the state. However, this is quite difficult to implement in a complex application.

Stateful widgets pass data through the constructors of child widgets. Though this feature is useful, it causes data to be passed to widgets that don't need it.

Another disadvantage is that the business logic is tightly coupled to the user interface. This can lead to confusion.

### Goals
This article teaches you how to use the GetX state management package to solve state management problems in Flutter.

In this tutorial, we will build a shopping mobile application that allows users to view products, like items, add a product to a cart, as well as place orders.

After placing orders successfully, users can still access other products. With this app, we will demonstrate the power of the GetX package.

### Key takeaways
- How to setup Flutter project and configure dependencies.
- How to use GetX as a state management tool.
- Using Obx to maximize the power of reactive programming.
- Explore the Getx navigation capabilities.
- How to use the GetBuilder sub-ecosystem to manage state.
- Reusable component of the GetX ecosystem.

### Prerequisites
To follow along, you should have:
- Some basic knowledge of Dart and Flutter.
- [Flutter](https://flutter.dev/docs/get-started/install) installed on your computer.
- [Android studio](https://developer.android.com/studio/install) or [VS Code](https://code.visualstudio.com/download).

### Creating a Flutter application in Android Studio
In this project, we will be using Android Studio.

To get started, launch Android studio and create a new Flutter project. Ensure that you set the type as `Flutter application`.

Be sure you selected the path where your Flutter SDK is located then click next.

![creating a new Flutter project](/engineering-education/flutter-getx-ecosystem-for-state-management/new-project.png)

Next, fill in the following project details to set up the project completely:
- Since we are building an online shop, we can name the project as `shopping_getx`.
- Choose a directory where you want the project to be saved.
- Add a project description.
- Choose an appropriate package name.
- Leave the default Android and iOS languages to Kotlin and Swift respectively.

![Adding project details](/engineering-education/flutter-getx-ecosystem-for-state-management/project-details.png)

This will generate the default Flutter counter project in the `main.dart` file.

### Integrating the GetX ecosystem
#### What is GetX?
GetX is a simple yet powerful Flutter package. The major pillars of the GetX package are high-performance state management, intelligent dependency injection, and route management.

GetX helps developers realize a high level of productivity through easy and pleasant syntax without sacrificing app performance.

It supports the decoupling of the user interface, presentation logic, business logic, dependency injection, and navigation. This helps to produce clean code by default.

![GetX Documentation](/engineering-education/flutter-getx-ecosystem-for-state-management/getx-documentation.png)

To integrate GetX into the application. go to the [GetX Documentation](https://pub.dev/packages/get/install), copy `get: ^4.3.8`, and add it to the project `pubspec.yaml` file, under the `dependencies section` and then run the `pub get` command.

This will install the GetX ecosystem to your project.

Add `intl: ^0.17.0` to the `dependencies section` to install the `intl package` then run `pub get` to install the dependency.

![Pubspec file](/engineering-education/flutter-getx-ecosystem-for-state-management/pubspec-file.png)

Replace the generated code in the `main.dart` file with the following:

```dart
import 'package:flutter/material.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'package:shopping_app/screens/product_overview_screen.dart';


void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return  GetMaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.purple,
          accentColor: Colors.deepOrange,
          fontFamily: "Lato",
        ),
        home: ProductOverviewPage(),

    );
  }
}
```

In the code above:

We have created the `main` method which is the entry point for the `Dart VM` to execute the program. The `main` method runs `MyApp` class.

`MyApp class` extends the stateless widget and overrides the build method. It also returns a `GetMaterialApp`.

`GetMaterialApp`: The build method is returning the GetMaterialApp rather than the usual MaterialApp. This is because we can use GetX for Navigation. The `GetMaterialApp` is a class from the `Getx` package.

In the `homepage`, we are rendering the `ProductOverviewPage`.

### Project structure
We are going to structure the project as follows:

Inside the `lib folder`, we will create the folders below:
- `screens` (houses our UI).
- `controller` (business logic).
- `models` (Object representation of the data to be stored).

Let's begin with `models`.

### Models
Inside the `models` folder, create a dart file named `product.dart`, as shown below:

#### The Product model

```dart
class Product{
  final int   id;
  final String productTitle;
  final String imageUrl;
  final String description;
  final double price;
   bool isFavourite;

  Product(
      {required this.id,
      required this.productTitle,
      required this.imageUrl,
      required this.description,
      required this.price,
      this.isFavourite = false});

}
```

This is just a Dart class that contains the product fields.

We added a constructor that initializes all fields. The `isFavourite` variable is set to `false`.

#### CartItem model

```dart
class CartItem {
  final String id;
  final String productTitle;
  final int productQuantity;
  final double productPrice;

  CartItem(
      {required this.id,
      required this.productTitle,
      required this.productQuantity,
      required this.productPrice});
}
```

We have created a Dart class that stores the `CartItem` fields.

The constructor then initializes the required fields.

#### The Order class

```Dart
import 'package:shopping_app/models/cart_item.dart';

class Order {
  final String orderId;
  final double amount;
  final List<CartItem> products;
  final DateTime dateTime;

  Order(
      {required this.orderId,
      required this.amount,
      required this.products,
      required this.dateTime});
}
```

This is just a Dart class that contains the fields of the order that will be placed.

### Controllers
All our business logic will be on the controller. This will make it easy to track different issues or errors.

Create a file named `product_controller` in the `controller folder` and add the following code:

#### The Product controller

```dart
import 'package:get/get.dart';
import 'package:shopping_app/models/product.dart';

class ProductController extends GetxController {
  List<Product> _items = [
    Product(
      id: 1,
      productTitle: 'Sport Shoe',
      description: 'Made for you Check it out!',
      price: 7000.00,
      imageUrl:
         'https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Cavalier-Black-1.jpg?v=1589391819',
    ),
    Product(
        id: 2,
        productTitle: 'Legend',
        description:
            'Built to last forever, StormKing™ lug rubber outsoles and a flexible elastic goring, this can only be for the Legends and i bet you, you have not seen it anywhere.',
        price: 63000.00,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Men-Legend-BlackMatte-3.4_672x672.jpg?v=1600886623'),
    Product(
        id: 3,
        productTitle: 'The Chelsea',
        description: 'Functional and Fashionable.',
        price: 49.00,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Cavalier-Black-1.jpg?v=1589391819'),
    Product(
        id: 4,
        title: 'Men\'s Sneakers',
        productTitle: 'Clean & Comfortable Sneakers made with classic Leathers.',
        price: 49.99,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Men-PremierLowTop-Black-3.4.jpg?v=1600270679'),
    Product(
        id: 5,
        productTitle: 'The Chelsea',
        description:
            'Comfortable as you\'d expect.This can only be found at Resilient collection.',
        price: 49.99,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Captain-Natural-3.jpg?v=1584114360'),
    Product(
        id: 6,
        productTitle: 'Men\'s Sneakers',
        description: 'Clean & Comfortable Sneakers made with classic Leathers.',
        price: 49.99,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Men-PremierLowTop-Black-3.4.jpg?v=1600270679'),
    Product(
        id: 7,
        productTitle: 'The Chelsea',
        description:
            'Made for the men who understand what classic means, every bit was carefully selected so you can go the extra mile with confidence and alacrity.',
        price: 49.99,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Men-Cavalier-Toffee-210402-2.jpg?v=1618424894'),
    Product(
        id: 8,
        productTitle: 'Men\'s Sneakers',
        description: 'Clean & Comfortable Sneakers made with classic Leathers.',
        price: 49.99,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Men-Cavalier-Toffee-210402-3.jpg?v=1618424894'),
    Product(
        id: 9,
        productTitle: 'The Chelsea',
        description: 'Functional and Fashionable.',
        price: 49.99,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Cavalier-Black-1.jpg?v=1589391819'),
    Product(
        id: 10,
        productTitle: 'Men\'s Sneakers',
        description: 'Clean & Comfortable Sneakers made with classic Leathers.',
        price: 49.99,
        imageUrl:
            'https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Men-PremierLowTop-Black-3.4.jpg?v=1600270679'),
  ];

  List<Product> get items {
    return [..._items];
  }

  List<Product> get favouriteItems {
    return _items.where((productItem) => productItem.isFavourite).toList();
  }

  Product findProductById(int id) {
    return _items.firstWhere((element) => element.id == id);
  }


  void toggleFavouriteStatus(int id) {
    items[id].isFavourite = !items[id].isFavourite;
    update();
  }
}
```

The `ProductController` class we just created is extending the `GetxController` class, which is an abstract class that extends the `DisposableInterface`.

By extending `DisposableInterface`, GetX helps us to reduce memory consumption by deleting our controller from memory immediately the widget using it is removed from the navigation stack.

What we need in the controller is the element we want to bind to the User Interface. In this case a list of `Products`, as such we have created the field `_items` which contains the list of all products.

The underscore in the `_items` makes it private. We are hard-coding this but we can equally retrieve the product from a backend server.

Next, we created two getters that return all products including those that are marked as favorite.

The `findProductById` method takes in an `ID` as an argument and returns the product with that particular `ID`.

The `toggleFavouriteStatus` method takes in an `ID` and marks the product with that `ID` as favorite.

We called the update from `Getx` to change the user interface when clicked. The update method listens for changes in the `toggleFavouriteStatus` method and updates the appropriate user interface.

If you are familiar with the [Provider](https://pub.dev/packages/provider) package, the `update` method functions like `notifyListeners`.

#### The Cart Controller
The `CartController` will contain business logic on how an item can be added and removed from the cart.

It will also contain methods that return all items on the cart, as well as the total amount of all the items on the cart.

Create a dart file named `cart_controller.dart` in the `controllers` folder and then add the following code:

```dart
import 'dart:core';
import 'package:get/get.dart';
import 'package:shopping_app/models/cart_item.dart';

class CartController extends GetxController {
  Map<int, CartItem> _items = {};

  Map<int, CartItem> get items {
    return {..._items};
  }

  int get itemCount {
    // return  _items?.length?? 0;
    return _items.length;
  }

  double get totalAmount {
    var total = 0.0;
    _items.forEach((key, cartItem) {
      total += cartItem.price * cartItem.quantity;
    });
    return total;
  }

  void addItem(int productId, double price, String title, int quantity) {
    if (_items.containsKey(productId)) {
      _items.update(
          productId,
          (existingCartItem) => CartItem(
              id: existingCartItem.id,
              title: existingCartItem.title,
              quantity: existingCartItem.quantity + 1,
              price: existingCartItem.price));
    } else {
      _items.putIfAbsent(
        productId,
        () => CartItem(
          id: DateTime.now().toString(),
          title: title,
          price: price,
          quantity: 1,
        ),
      );
    }
    update();
  }

  void removeitem(int productId) {
    _items.remove(productId);
    update();
  }

  void clear() {
    _items = {};
    update();
  }
}
```

We have created a `CartContoller` class that extends the `GetXController`. Remember to import the `GetXController` from the package.

We also created a `map` that holds the `CartItem` objects.

We included two getters that return all items on the cart and the number of items respectively.

Next, we created a `totalAmount` method that calculates and returns the total amount of all products on the cart.

The `addItem` method adds the products to the cart. First, we check whether the product already exists in the cart, if so, we update the number, otherwise, we add it to the cart.

The `removeitem` method takes a `productId` and removes a product with that `ID` from the cart.

The `clear` method clears the cart once an order has been successfully placed.

Note that we have invoked the update method from `GetX` in all methods that we created to listen for changes, and update the appropriate user interface where this data is needed.

#### The OrderController
The `OrderController` will contain methods for placing an order.

Create a dart file named `order_controller.dart` in the `controller folder` and add the following code:

```dart
import 'package:get/get.dart';
import 'package:shopping_app/models/cart_item.dart';
import 'package:shopping_app/models/order.dart';

class OrderController extends GetxController {
  List<Order> _orders = [];

  List<Order> get orders {
    return [..._orders];
  }

  void addOrder(List<CartItem> cartProducts, double total) {
    _orders.insert(
        0,
        Order(
            id: DateTime.now().toString(),
            products: cartProducts,
            amount: total,
            dateTime: DateTime.now()));
    update();
  }
}
```

We created a list that holds all the orders.

Next, we created a getter called `orders` to return all the orders placed.

The `addOrder` method takes in a list of `CartItem` which are the products that have been added to the cart, and a `total` of type `double` which is the sum of all the products added to the cart, and places an order.

We again called the `update` method to listen for changes and update the UI.

### The UI
Inside the `screens` folder, create a dart file `product_overview_screen.dart` and add the following code:

#### The ProductOverviewPage

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shopping_app/controllers/cart_controller.dart';
import 'package:shopping_app/screens/cart_screen.dart';
import 'package:shopping_app/widgets/app_drawer.dart';
import 'package:shopping_app/widgets/badge.dart';
import 'package:shopping_app/widgets/productgrid.dart';

class ProductOverviewPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final cartController = Get.put(CartController());

    return Scaffold(
      appBar: AppBar(
        title: Text("My Shop"),
        actions: <Widget>[
          GetBuilder<CartController>(
              init: CartController(),
              builder: (contex) {
                return Badge(
                  child: IconButton(
                      icon: Icon(
                        Icons.shopping_cart,
                      ),
                      onPressed: () {
                        Get.to(() => CartScreen());
                      }),
                  value: cartController.itemCount.toString(),
                  color: Theme.of(context).accentColor,
                );
              })
        ],
      ),
      drawer: AppDrawer(),
      body: ProductsGrid(),
    );
  }
}
```

Dependency injection allows injecting instances of one class into another.

To define what a dependency is, if class C uses the functionality of a class D, then D is a dependency for C.

`Getx` allows you to perform Dependency injection with just one line of code:

```dart
final cartController = Get.put(CartController());
```

We have injected the `cartController` into our UI so that we can access the data on the controller.

`GetBuilder` is wrapped over any widget to makes it interact with the methods and variables of the controller.

Whatever widget is wrapped with a `GetBuilder`, Getx applies `setState` on it. With this, we were able to call the `itemCount` function in the `CartController` class.

- We use the `Getx navigation manager` to navigate to the `CartScreen` page even when the `shopping_cart icon` is pressed.

In the body of this class, we have called the `ProductsGrid` class to return a grid showing all products.

### Widgets
We have broken down our UI to keep it simple and reusable.

Create a folder named `widget`. Inside the `widget folder`, create a dart file named `productgrid.dart`.

#### The ProductsGrid class

```Dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shopping_app/controllers/cart_controller.dart';
import 'package:shopping_app/controllers/product_controller.dart';
import 'package:shopping_app/screens/product_details_screen.dart';

class ProductsGrid extends StatelessWidget {
  final controller = Get.put(ProductController());
  final cartController = Get.put(CartController());

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      padding: const EdgeInsets.all(10),
      itemCount: controller.items.length,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 3 / 2,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10),
      itemBuilder: (context, index) {
        return GetBuilder(
          init: ProductController(),
          builder: (value) => ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: GridTile(
              child: GestureDetector(
                onTap: () {
                  Get.to(
                    ProductDetailsScreen(
                      controller.items[index].title,
                      controller.items[index].price,
                      controller.items[index].imageUrl,
                      controller.items[index].description,
                    ),
                  );
                },
                child: Image.network(
                  controller.items[index].imageUrl,
                  fit: BoxFit.cover,
                ),
              ),
              footer: GridTileBar(
                backgroundColor: Colors.black87,
                leading: IconButton(
                  icon: Icon(
                    controller.items[index].isFavourite == true
                        ? Icons.favorite
                        : Icons.favorite_border,
                    color: Theme.of(context).accentColor,
                  ),
                  onPressed: () {
                    controller.toggleFavouriteStatus(index);
                  },
                ),
                title: Text(
                  controller.items[index].title,
                  textAlign: TextAlign.center,
                ),
                trailing: GetBuilder<CartController>(
                    init: CartController(),
                    builder: (cont) {
                      return IconButton(
                        icon: Icon(Icons.shopping_cart),
                        onPressed: () {
                          cartController.addItem(
                              controller.items[index].id,
                              controller.items[index].price,
                              controller.items[index].title,
                              1);
                        },
                        color: Theme.of(context).accentColor,
                      );
                    }),
              ),
            ),
          ),
        );
      },
    );
  }
}
```

We injected the `ProductController` and `CartController` into the `ProductGrid` class to have access to the functions defined in them.

We wrap the `ClipRRect` widget with a `GetBuilder` to update it when the state changes. With the injected `ProductController` we displayed the products showing their `title` and `image`.

We also used the navigator manager to route to the `ProductDetailsScreen` when a particular product is clicked by simply calling the `Get.to()` and passing in the product's `title`, `price`, `image`, and `description`.

When the favorite icon is clicked, we call the product controller to access the `toggleFavouriteStatus` function and change the color of the icon appropriately.

The `shopping_cart` icon has been wrapped with the `Getbuilder` so that whenever it is clicked, we add the product to the cart by calling the `addItem` function from the `CartController`.

#### The ProductDetails screen
Inside the `screens` folder create a dart file named `product_details_screen.dart` and add the following code:

```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shopping_app/controllers/cart_controller.dart';
import 'package:shopping_app/controllers/product_controller.dart';

class ProductDetailsScreen extends StatelessWidget {

  final String title;
  final double price;
  final String image;
  final String description;

  ProductDetailsScreen(this.title, this.price, this.image, this.description);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(this.title),
      ),
      body: SingleChildScrollView(
        child: Container(
          color: Color(0xffF6F6F6),
          child: Column(
            children: [
              Container(
                child: ClipRRect(
                  borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(25),
                      bottomRight: Radius.circular(25)),
                  child: Image.network(
                    this.image,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10.0),
                child: Column(
                  children: [
                        Chip(
                          label: Text(
                            "Price: " + "₦" + this.price.toString(),
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 24,
                                fontWeight: FontWeight.bold
                            ),
                          ),
                          backgroundColor: Theme.of(context).primaryColor,
                        ),
                    SizedBox(height: 15),
                    Text(
                      "" + this.description,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Color(0xff403B58),
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
```

We use the constructor to pass in the details from the `productGrid` class whenever one clicks on a product.

#### The CartScreen
Inside the `screens folder`, create a dart file named `cart_screen.dart` and write the following code:

```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shopping_app/controllers/cart_controller.dart';
import 'package:shopping_app/controllers/order_controller.dart';
import 'package:shopping_app/widgets/cart_items.dart';

class CartScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    var cartController = Get.put(CartController());
    var orderController = Get.put(OrderController());

    return Scaffold(
      appBar: AppBar(
        title: Text("Your cart"),
      ),
      body: GetBuilder<CartController>(
        init: CartController(),
        builder: (cont) => Column(
          children: <Widget>[
            Card(
              margin: EdgeInsets.all(15),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Text(
                      "Total",
                      style: TextStyle(
                        fontSize: 20,
                      ),
                    ),
                    Spacer(),
                    Chip(
                      label: Text(
                        '₦${cartController.totalAmount.toStringAsFixed(2)}',
                        style: TextStyle(
                          color: Colors.white,
                        ),
                      ),
                      backgroundColor: Theme.of(context).primaryColor,
                    ),
                    GetBuilder<OrderController>(
                        init: OrderController(),
                        builder: (context) {
                          return TextButton(
                              onPressed: () {
                                orderController.addOrder(
                                    cartController.items.values.toList(),
                                    cartController.totalAmount);
                                cartController.clear();
                                Get.snackbar(
                                  "Orders",
                                  "Orders placed successfully",
                                  backgroundColor: Colors.green,
                                  snackPosition: SnackPosition.BOTTOM
                                );
                              },
                              child: Text('ORDER NOW'));
                        })
                  ],
                ),
              ),
            ),
            SizedBox(
              height: 10,
            ),
            Expanded(
              child: ListView.builder(
                  itemCount: cartController.items.length,
                  itemBuilder: (context, index) => CartItem(
                        cartController.items.values.toList()[index].id,
                        cartController.items.values.toList()[index].price,
                        cartController.items.values.toList()[index].quantity,
                        cartController.items.values.toList()[index].title,
                        cartController.items.keys.toList()[index],
                      )),
            ),
          ],
        ),
      ),
    );
  }
}
```

We have injected the `OrderController` and `CartController` into the CartScreen class to access their functions.

We used the `GetBuilder` to update the widgets that need to be rebuilt as the state changes. The total amount is updated accordingly through the `CartController`.

The `Listview.builder` widget has been used to render the list of all products added to the cart that is the `Cartitem` class.

As stated, we are showing the `title`, `amount`, `quantity`, and `price` of products in the cart.

We used the injected instance of the `OrderController` to invoke the `addOrder` function so that whenever the `TextButton` widget is clicked, an order is placed.

If an order is placed successfully, we use the `snackbar` from GetX to show a message to the user that the order has been placed successfully, as shown below:

```dart
Get.snackbar(
            "Orders",
            "Orders placed successfully",
              backgroundColor: Colors.green,
              snackPosition: SnackPosition.BOTTOM
                  );
```

Once an order is placed successfully, we invoke the `clear` method from the `cartController` to clear the cart.

#### The CartItem
In the `widget folder` create a `cart_items.dart` file with the following code:

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shopping_app/controllers/cart_controller.dart';

class CartItem extends StatelessWidget {
  final String id;
  final int productId;
  final double price;
  final int quantity;
  final String title;

  CartItem(this.id, this.price, this.quantity, this.title, this.productId);

  @override
  Widget build(BuildContext context) {
    var cartController = Get.put(CartController());
    return Dismissible(
      key: ValueKey(id),
      background: Container(
        color: Theme.of(context).errorColor,
        child: Icon(Icons.delete, color: Colors.white,size: 40,

        ),
        alignment: Alignment.centerRight,
        padding: EdgeInsets.only(right: 20),
        margin:  EdgeInsets.symmetric(horizontal: 15, vertical: 4),

      ),
      direction: DismissDirection.endToStart,
      onDismissed: (direction){
        cartController.removeitem(productId);

      },
      child: Card(
        margin: EdgeInsets.symmetric(horizontal: 15, vertical: 4),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: ListTile(
            leading: Chip(
              label: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text('₦$price'),
              ),
              backgroundColor: Theme.of(context).primaryColor,
            ),
            title: Text(title),
            subtitle: Text('Total: ₦${(price * quantity)}'),
            trailing: Text('$quantity X'),
          ),
        ),
      ),
    );
  }
}
```

We have created the `CartItem` class which extends the stateless widget. The fields include the `id`, `productId`, `price`, `quantity`, and `title`. The constructor was used to initialize the fields.

We used the injected `CartController` to access the `removeitem` method and thus, delete a product from the cart whenever the Dismissible widget is swiped.

#### The OrderScreen

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shopping_app/controllers/order_controller.dart';
import 'package:shopping_app/widgets/app_drawer.dart';
import 'package:shopping_app/widgets/order_item.dart';

class OrderScreen extends StatelessWidget {
  var orderController = Get.put(OrderController());
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Yours Orders"),
      ),
      drawer: AppDrawer(),
      body: ListView.builder(
          itemCount: orderController.orders.length,
          itemBuilder: (context, index) =>
              OrderItem(orderController.orders[index])),
    );
  }
}
```

In the file above:

The `OrderScreen` class renders the `OrderItem` widget.

We injected the `OrderController` to access the `orders` which contain the list of all the orders placed.

We rendered the `AppDrawer` to show the `Orders` and the `Shops` depending on the one selected.

#### The OrderItem

```dart
import 'package:flutter/material.dart';
import 'package:shopping_app/models/order.dart';
import 'package:intl/intl.dart';
import 'dart:math';

class OrderItem extends StatefulWidget {
  final Order order;

  OrderItem(this.order);

  @override
  _OrderItemState createState() => _OrderItemState();
}

class _OrderItemState extends State<OrderItem> {
  var _isExpanded = false;
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(10),
      child: Column(
        children: <Widget>[
          ListTile(
            title: Text('${widget.order.amount.toStringAsFixed(2)}'),
            subtitle: Text(
                DateFormat('dd/MM/yyyy hh:mm').format(widget.order.dateTime)),
            trailing: IconButton(
              icon: Icon(_isExpanded ? Icons.expand_less : Icons.expand_more),
              onPressed: () {
                setState(() {
                  _isExpanded = !_isExpanded;
                });
              },
            ),
          ),
          if (_isExpanded)
            Container(
              padding: EdgeInsets.symmetric(horizontal: 15, vertical: 4),
              height: min(widget.order.products.length * 20 + 10, 180),
              child: ListView(
                children: widget.order.products
                    .map(
                      (product) => Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text(
                            product.title,
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                          Text(
                            '${product.quantity}X ₦${product.price}',
                            style: TextStyle(
                              fontSize: 18,
                              color: Colors.grey,
                            ),
                          ),
                        ],
                      ),
                    )
                    .toList(),
              ),
            )
        ],
      ),
    );
  }
}
```

The class above renders the list of orders placed.

#### The AppDrawer

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shopping_app/screens/order_screen.dart';
import 'package:shopping_app/screens/product_overview_screen.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: <Widget>[
          AppBar(
            title: Text("Hello Friend"),
            automaticallyImplyLeading: false,
          ),
          Divider(),
          ListTile(
            leading: Icon(Icons.shop),
            title: Text("Shop"),
            onTap: () {
              Get.to(() => ProductOverviewPage());
            },
          ),
          Divider(),
          ListTile(
            leading: Icon(Icons.payment),
            title: Text("Orders"),
            onTap: () {
              Get.to(() => OrderScreen());
            },
          ),
        ],
      ),
    );
  }
}
```

The class returns a Column with `Drawer` widget so users can select to navigate to the `ProductOverviewPage` showing all the products.

They can also navigate to the `order` page that has the list of the orders placed.

### OBX
While the GetBuilder is fast and has a low memory footprint, it is not reactive.

Obx is one of the reactive state managers of the GetX ecosystem. GetX turns reactive programming paradigm into something quite simple.

- There is no need to create StreamControllers and StreamBuilder for each variable any more.
- OBX saves you the stress of creating a class for each state, as well as using code generators.

The tutorial has focused on the GetBuilder, however, if we were to use the reactive streams (OBX) the `OrderController` class would have looked like this:

```dart
import 'package:get/get.dart';
import 'package:shopping_app/models/cart_item.dart';
import 'package:shopping_app/models/order.dart';

class OrderController extends GetxController {
  var _orders = [].obs;

  List<Order> get orders {
    return [..._orders];
  }

  void addOrder(List<CartItem> cartProducts, double total) {
    _orders.insert(
        0,
        Order(
            id: DateTime.now().toString(),
            products: cartProducts,
            amount: total,
            dateTime: DateTime.now()));
  }
}
```

In the code above:

We declared a variable that is going to hold a list of all orders. We made it observable by changing it to an obs using the dot notation.

Every time the orders change, all widgets that use it are automatically changed.

In the `addOrder` method, we don't need to manually call the `update` method to update the UI that is bound to it. `Obx` intelligently observes and updates accordingly.

To bind a controller to a view using `Obx`, wrap the widget as shown below:

```dart
    body: Obx(() => ListView.builder(
            itemCount: orderController.orders.length,
            itemBuilder: (context, index) =>
                OrderItem(orderController.orders[index])),
      ),
```

### Conclusion
In this tutorial, you have learned how to build a shopping application with Flutter, as well as using GetX for state management, navigation, and rendering widgets.

The source code can be found on this [Github Repository](https://github.com/Lekwacious/shopping_app-_getx).

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)

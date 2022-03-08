### Introduction
Building a dynamic web app or mobile app requires the consumption of APIs (Application Programming Interfaces). These APIs could use both hardcoded values in your backend or data from external APIs from your backend which your frontend will make calls for.

Most companies provide APIs for carrying out some tasks such as building an eCommerce web app. For example, you can call/consume an API from the central bank of your country or some established applications like PayPal, Paystack, etc. In this tutorial, I will guide you through building a basic shopping cart API modeling how an actual shopping cart functions. 
### Prerequisites
1. Intermediate knowledge of Java
2. A full understanding of object-oriented programming in Java
3. A basic understanding of Spring Boot
4. A basic understanding of postman
### Objectives
1. To enable beginners in Spring Boot to find footing to be able to build projects
2. To serve as a road map for more similar and complex projects
3. To enable beginners to code to interface
### Setting your spring boot project
Firstly, go to [Spring Boot Initializer](https://start.spring.io/). There you will download a full template with the basic dependencies. The dependencies for this project are few; below is a list of what you will select:
1. Project -> Maven Project
2. Language -> Java
3. Spring boot -> Use the default version rather than the snapshot
4. Group -> shopping
5. Artifact -> cart
6. Name -> cart
7. Description -> it is for you to explain briefly what your project is about but for this guide, we will leave it blank.
8. Dependencies -> Search for the following in the search bar and add them to your dependencies for this project:
- Lombok -> Lombok is a Java library that is used to eliminate boilerplate code and save development time. It does so by utilizing a few annotations. Notwithstanding it, Lombok additionally builds the clarity of the source code and saves space. Lombok gives a bunch of annotations to make our coding life simpler. The following annotations are provided by Lombok: `@ToString`, `@Getter`, `@Setter`, `@EqualsAndHashCode`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@RequiredArgsConstructor`, and `@Data`. For the sake of this tutorial, we will focus on `@Data`. This annotation comprises a couple of other annotations that help you save time. It's like a collection of all of the other annotations except `@NoArgsConstructor` and `@AllArgsConstructor`.
- Spring web -> A necessity when building a web app
- Devtools-> For automatic reloading
- Packaging -> Jar
- Java -> the Java version of your choice but preferably the default version of 11
### Creating your entities/models
Here you create the entities that will map to the database or the data structure of your choice. Before we view the code for creating our entities let's view what the structure of the entire application will look like:

![Package Structure](shopping_application.JPG)

Here you can see the various classes in the package:

![Class Structure](shoppingcart2.JPG).

In our *models* package, we have the following classes:
#### Admin
```java
@Data
public class Admin {
    private Long id;
    private String firstName;
    private String lastName;

    public Admin(Long id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```
#### Customer
```java 
@Data
public class Customer {
    private Long id;
    private String firstName;
    private String lastName;
    private BigDecimal balance;

    public Customer(Long id, String firstName, String lastName, BigDecimal balance) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = balance;
    }
}
```
#### Product
```java
@Data
public class Product {
    private String id;
    private String productName;
    private BigDecimal cost;

    public Product(String id, String productName, BigDecimal cost) {
        Id = id;
        this.productName = productName;
        this.cost = cost;
    }
    public Product() {
    }

    @Override
    public String toString() {
        return "Product{" +
                "Id='" + Id + '\'' +
                ", productName='" + productName + '\'' +
                ", cost=" + cost +
                '}';
    }
}

```
These classes provide the features, attributes, or fields we will be needing for the creation of objects.
### Creating your repositories
The importance of creating a repository is to communicate to the database to manipulate your entities. It's like you have your database in your code for easy access. Spring Boot provides the `@Repository` annotation that helps Spring Boot know that this is for the database. In the repository package we have the following:
#### AdminDao
```java
@Repository
public class AdminDao {
    Map<Long, Admin> adminDao = new HashMap<>();

    public Admin registerAdmin(Long id, Admin admin) {
        return adminDao.put(id, admin);
    }

    public void removeAdmin(Long id) {
        adminDao.remove(id);
    }

    public Admin getAdmin(Long id) {
        return adminDao.get(id);
    }

    public Map<Long, Admin> getAllAdmin() {
        return adminDao;
    }
}
```
#### CustomerDao
```java
@Repository
public class CustomerDao {

    Map<Long, Customer> customerDao = new HashMap<>();

    public Customer registerCustomer(Long id, Customer customer) {
        return customerDao.put(id, customer);
    }

    public void removeCustomer(Long id) {
        customerDao.remove(id);
    }

    public Customer getCustomer(Long id) {
        return customerDao.get(id);
    }

    public int totalNumberOfCustomers() {
        return customerDao.size();
    }

    public Map<Long, Customer> gettingAllTheCustomers() {
        return customerDao;
    }
    public  void refresh(){
        customerDao.clear();
    }

}

```
#### ProductDao
```java
@Repository
public class ProductDao {
    Map<Long, Product> productDao=new HashMap<>();
    // The products are stored in the product dao like that of a shelf in the super market
    public void customerCanAddProduct(Long id,Product product){
        productDao.put(id,product);
    }
    public void customerCanRemoveProduct(Long id,Product product){
        productDao.remove(id,product);
    }
    public Product customerCanGetProduct(Long id,Product product){
        return productDao.get(id);
    }
}
```
N/B At the top of the class, you must put the `@Repository` annotation to let spring know that that particular class is a repository that maps to entities to the database.
### Creating the service layer
The service layer is where we create our interfaces pertaining to our business logic and also implement them. You must always put the `@Service` annotation at either in the interface or the implementation. This annotation is so that Spring knows that the class or interface acts as a service. Now, we will have a look at our interfaces and later their implementations. The service layer contains the following interfaces:
#### CartService
```java
public interface CartService {
    void addProductToCartByCustomer(Long id, Product product);
    void addProductToCartByAdmin(Long id, Product product);
    void removeProductsFromCartByCustomer(Long id, Product product);
    void removeProductsFromCartByAdmin(Long id, Product product);
    List<Product> checkAllTheProductsInTheCartByCustomer(Long id);
    List<Product> checkAllTheProductsInTheCartByAdmin(Long id);
    BigDecimal calculatePrice();
    int totalNumberOfItems();
    BigDecimal calculatingPurchase(Long id);
    void refresh();
}
```
#### DataService
```java
public interface DataService {
    Customer registerCustomer(Customer customer);
    Admin registerAdmin(Admin admin);
    List<Customer> gettingAllCustomers();
    void removeCustomer(Long id);
    void removeAdmin(Long id);
    List<Admin> getAllAdmin();
}
```
From here, you will see how we code to the interface. Any method that is in the interface must be implemented in the implementation. In this code, I used the `@Service` annotation in the implementation. We have the following implementations of the two interfaces and they are:
#### CartServiceImpl
```java
@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CustomerDao customerRepo;
    @Autowired
    private ProductDao productRepo;
    @Autowired
    private Cart cart;
    @Autowired
    private AdminDao adminDao;

    @Override
    public void addProductToCartByCustomer(Long id, Product product) {
        if (customerRepo.getCustomer(id) != null) {

            cart.addToTheCart(product);
        }
    }


    @Override
    public void addProductToCartByAdmin(Long id, Product product) {
        if (adminDao.getAdmin(id) != null) {
            cart.addToTheCart(product);
        }
    }

    @Override
    public void removeProductsFromCartByCustomer(Long id, Product product) {
        if (customerRepo.getCustomer(id) != null) {
            cart.removeFromCart(product);
        }
    }

    @Override
    public void removeProductsFromCartByAdmin(Long id, Product product) {
        if (adminDao.getAdmin(id) != null) {
            cart.removeFromCart(product);
        }
    }

    @Override
    public List<Product> checkAllTheProductsInTheCartByCustomer(Long id) {
        List<Product> productList = new ArrayList<>();
        if (customerRepo.getCustomer(id) != null) {
            productList = cart.displayAllItems();
        }
        return productList;
    }

    @Override
    public List<Product> checkAllTheProductsInTheCartByAdmin(Long id) {
        List<Product> productList = new ArrayList<>();
        if (adminDao.getAdmin(id) != null) {
            productList = cart.displayAllItems();
        }
        return productList;
    }


    @Override
    public BigDecimal calculatePrice() {
        return cart.calculatePriceInCart();
    }


    @Override
    public int totalNumberOfItems() {
        return cart.totalNumberOfProducts();
    }

    @Override
    public BigDecimal calculatingPurchase(Long id) {
        return customerRepo.getCustomer(id).getBalance().subtract(calculatePrice());
    }
    @Override
    public void refresh(){
        cart.setCartToNull();
    }
}
```
#### DataServiceImpl
```java
package com.cart.shopping.service;
@Service
public class DataServiceImpl implements DataService {
    @Autowired
    private CustomerDao customerRepo;
    @Autowired
    private AdminDao adminRepo;

    @Override
    public Customer registerCustomer(Customer customer) {

        if (customerRepo.getCustomer(customer.getId()) == null) {
            customer = customerRepo.registerCustomer(customer.getId(), customer);
        } else {
            System.out.println("Customer Already Exist");
        }
        return customer;
    }


    @Override
    public Admin registerAdmin(Admin admin) {

        if (adminRepo.getAdmin(admin.getId()) == null) {

            admin = adminRepo.registerAdmin(admin.getId(), admin);
        } else {
            System.out.println("Admin Already Exist");

        }
        return admin;
    }

    @Override
    public List<Customer> gettingAllCustomers() {
        List<Customer> customerList = new ArrayList<>();
        for (int counter = 1; counter <= customerRepo.gettingAllTheCustomers().size(); counter++) {
            Long l2 = (long) counter;
            customerList.add(customerRepo.getCustomer(l2));
        }
        return customerList;
    }

    @Override
    public void removeCustomer(Long id) {
        if (customerRepo.getCustomer(id) == null) {
            System.out.println("Customer does not exist");
        } else {
            customerRepo.removeCustomer(id);
        }
    }

    @Override
    public void removeAdmin(Long id) {
        if (adminRepo.getAdmin(id) == null) {
            System.out.println("Customer does not exist");
        } else {
            adminRepo.removeAdmin(id);
        }
    }

    @Override
    public List<Admin> getAllAdmin() {
        List<Admin> adminList = new ArrayList<>();
        for (int counter = 1; counter <= adminRepo.getAllAdmin().size(); counter++) {
            Long l2 = (long) counter;
            adminList.add(adminRepo.getAdmin(l2));
        }
        return adminList;
    }
}

```
### Cart Package
Next up in the agenda is to create a cart package and in the cart package we create a cart class to carry out the functionality of a cart with its methods:
```java
@Component
public class Cart {
    //The cart is an aggregation of product
    private List<Product> productCart=new ArrayList<>();
    public void addToTheCart(Product product){
        productCart.add(product);
    }
    public void removeFromCart(String productName) {
        for (Product pro : productCart) {
            if (pro.getProductName().equalsIgnoreCase(productName)) ;
            productCart.remove(pro);
        }
    }
    public int totalNumberOfProducts(){
        return productCart.size();
    }
    public void removeFromCart(Product product){
        productCart.remove(product);
    }
    public BigDecimal calculatePriceInCart(){
        BigDecimal total=BigDecimal.ZERO;
        for(Product product:productCart){
       total= total.add(product.getCost());
        }
   return total;
    }
    public List<Product> displayAllItems(){
       return productCart;
    }
    public void setCartToNull(){
        productCart.clear();
    }
}
```
### Controller Package
The last package to review is the controller package. In the controller package we have our endpoints or APIs that connect to the internet all the basic functionalities of our services:
```java
@RestController
@RequestMapping("cart")
public class Controller {
    @Autowired
    DataServiceImpl dataService;
    @Autowired
    CartServiceImpl cartService;
    // This method creates a new customer. Using the @PostMapping annotation, it maps to the endpoint localhost:8090/cart/create_customer with the HTTP POST method.
    @PostMapping("/create_customer")
    public Customer registerCustomer(@RequestBody Customer customer) {
        return dataService.registerCustomer(customer);
    }
    // This method gets all the customers. Using the @GetMapping annotation, it maps to the endpoint localhost:8090/cart/get_all_customers with the HTTP GET method.
    @GetMapping("/get_all_customers")
    public List<Customer> gettingAllList() {
        return dataService.gettingAllCustomers();
    }
    // This method creates a new admin. Using the @PostMapping annotation, it maps to the endpoint localhost:8090/cart/create_admin with the HTTP POST method.
    @PostMapping("/create_admin")
    public Admin registerAdmin(@RequestBody Admin admin) {
        return dataService.registerAdmin(admin);
    }
    // This method gets all the registered admins. Using the @GetMapping annotation, it maps to the endpoint localhost:8090/cart/get_all_admins with the HTTP GET method.
    @GetMapping("/get_all_admins")
    public List<Admin> getAllAdmin() {
        return dataService.getAllAdmin();
    }
    /*
    This method gets a product by id. Using the @PostMapping annotation, it maps to the endpoint localhost:8090/cart/{id}/add_product with the HTTP POST method. Here {id} is
    the product id passed as an argument to the method with the @PathVariable annotation.
    */
    @PostMapping("/{id}/add_product")
    public void addProducts(@PathVariable Long id, @RequestBody Product product) {
        cartService.addProductToCartByCustomer(id, product);
    }
    // This updates the product in the cart
    @PutMapping("/{id}/add_product")
    public void addProduct(@PathVariable Long id, @RequestBody Product product) {
        cartService.addProductToCartByCustomer(id, product);
    }
    // This method calculates the price of all the products in the cart
    @GetMapping("/cal_price")
    public BigDecimal calculatingPrice() {
        return cartService.calculatePrice();
    }
    // This method performs the payment (though we use hardcoded numbers as the customer's payment but for a more advanced app we can use a payment gateway)
    @GetMapping("/{id}/payment")
    public BigDecimal payment(@PathVariable Long id) {
        return cartService.calculatingPurchase(id);
    }
    // This method gets all the products in a customer's cart
    @GetMapping("/{id}/view_all_product")
    public List<Product> viewAllProducts(@PathVariable Long id) {
        return cartService.checkAllTheProductsInTheCartByCustomer(id);
    }
    // This method gets all the products by an admin
    @GetMapping("/{id}/view_all_productAdmin")
    public List<Product> viewAllProduct(@PathVariable Long id) {
        return cartService.checkAllTheProductsInTheCartByAdmin(id);
    }
    // This method deletes a product by a customer
    @DeleteMapping("/{id}/delete_product")
    public void delete(@PathVariable Long id, Product product) {
        cartService.removeProductsFromCartByCustomer(id, product);
    }
}
```
N/B `@PostMapping` is for saving objects, `@GetMapping` is for retrieving data from the database, `@PatchMapping` and `@PutMapping` is for updating data, and `@DeleteMapping` is for deleting. Also, note that we annotate the fields of this class with `@Autowire` to inject its dependencies to avoid initializing new objects. This is done by using these same objects each time they're needed throughout the whole codebase.
### Integration testing
Create a class and call it `CustomerTest`. Use `@Autowire` to insert the dependencies in the services you want to test.
```java
@SpringBootTest
@Slf4j
public class CustomerTest {

    @Autowired
    private DataServiceImpl dataService;
    @Autowired
    private CartServiceImpl cart;

    @BeforeEach
    void beforeEach(){
        cart.refresh();   
    }

    @Test
    void createCustomer() {
        customerDao.refresh();
        Customer customer=new Customer(1L, "Kingsley", "Chukwudi", new BigDecimal("2000"));
        dataService.registerCustomer(customer);
        assertEquals(1, customerDao.totalNumberOfCustomers());

    }
    @Test
    void customerCanAddProductToCart() {
        Product product = new Product("1", "Sandine", new BigDecimal(1000));
        Customer customer=new Customer( 2L, "King", "Chukwudi", new BigDecimal("2000"));
        dataService.registerCustomer(customer);
        cart.addProductToCartByCustomer(2L, product);
        System.out.println(dataService.gettingAllCustomers());
        assertEquals(1, cart.totalNumberOfItems());

    }

    @Test
    void customerCanRemoveProduct() {
        Product product = new Product("1", "Sandine", new BigDecimal(1000));
        Product product2 = new Product("2", "SandineBread", new BigDecimal(1100));
        Customer customer=new Customer(1L, "Kingsley", "Chukwudi", new BigDecimal("2000"));
        dataService.registerCustomer(customer);
        cart.addProductToCartByCustomer(1L, product);
        cart.addProductToCartByCustomer(1L, product2);
        cart.addProductToCartByCustomer(1L, product);
        assertEquals(3, cart.totalNumberOfItems());
        cart.removeProductsFromCartByCustomer(1L, product);
        assertEquals(2, cart.totalNumberOfItems());


    }

    @Test
    void calculatingAllTheProductsInTheCart() {
        Product product = new Product("1", "Sandine", new BigDecimal(1000);
        Product product2 = new Product("2", "SandineBread", new BigDecimal(1100));
        Customer customer=new Customer(1L, "Kingsley", "Chukwudi", new BigDecimal("2000"));
        dataService.registerCustomer(customer);
        cart.addProductToCartByCustomer(1L, product);
        cart.addProductToCartByCustomer(1L, product2);
        cart.addProductToCartByCustomer(1L, product);
        assertEquals(3,cart.totalNumberOfItems());

        assertEquals(new BigDecimal( 3100), cart.calculatePrice());
    }
    @Test
    void addProductToCartByAdmin(){
        Product product = new Product("1", "Sandine", new BigDecimal(1000));
        Product product2 = new Product("2", "SandineBread", new BigDecimal(1100));
        Admin admin=new Admin(1L, "Kingsley","Nwafor");
        dataService.registerAdmin(admin);
        cart.addProductToCartByAdmin(1L, product);
        cart.addProductToCartByAdmin(1L, product2);
        cart.addProductToCartByAdmin(1L, product);
        assertEquals(3,cart.totalNumberOfItems());
    }
    @Test
    void removeProductsFromCartByAdmin(){
        Product product = new Product("1", "Sandine", new BigDecimal(1000));
        Product product2 = new Product("2", "SandineBread", new BigDecimal(1100));
        Admin admin=new Admin(1L, "Kingsley","Nwafor");
        dataService.registerAdmin(admin);
        cart.addProductToCartByAdmin(1L, product);
        cart.addProductToCartByAdmin(1L, product2);
        cart.addProductToCartByAdmin(1L, product);
        System.out.println(cart);
        assertEquals(3,cart.totalNumberOfItems());
        cart.removeProductsFromCartByAdmin(1L,product);
        System.out.println(cart);
        assertEquals(2,cart.totalNumberOfItems());


    }
    @Test
    void checkAllTheProductsInTheCartByCustomer(){
        Product product = new Product("1", "Sandine", new BigDecimal(1000));
        Product product2 = new Product("2", "SandineBread", new BigDecimal(1100));
        Product product3 = new Product("3", "SandineBread", new BigDecimal(1100));
        Admin admin=new Admin(1L, "Kingsley","Nwafor");
        dataService.registerAdmin(admin);
        cart.addProductToCartByAdmin(1L, product);
        cart.addProductToCartByAdmin(1L, product2);
        cart.addProductToCartByAdmin(1L, product3);
        System.out.println(  cart.checkAllTheProductsInTheCartByCustomer(1L));
    }
    @Test
    void checkAllRegisteredAdmin(){
        Admin admin=new Admin(1L, "Kingsley","Nwafor");
        dataService.registerAdmin(admin);
        System.out.println(dataService.getAllAdmin());
    }
}
```
### Using Postman to verify the output on the web
First things first go to learning.postman.com and download the version of postman that suits your operating system. You will have to do the necessary sign-in if it's your first time.
Postman allows us to send requests to our controller using the various HTTP methods. These include the POST, PUT, PATCH, GET, and DELETE methods. Now you will be performing these operations from your local machine. For the url, you start with `localhost:port-number`, followed by the endpoint on your `@Controller` annotation, and the endpoint on the individual method. For example, `localhost:8090/cart/create_customer` would map to the `registerCustomer` method of the `Controller` class. For more on this please make sure you use the postman documentation [Postman Documentation](https://learning.postman.com/docs/publishing-your-api/documenting-your-api/).
![shopping_api](api.JPG)
![shopping_api1](api2.JPG)
![shopping_api2](payment.JPG)
#### Conclusion
In the end, we've seen how to code to an interface, how to write tests, how to create an endpoint, and how to use postman to view our endpoint. Furthermore, we also added products to our cart and the cart could calculate the cost of products in the cart since the products have an attribute of price. 

In this tutorial, we didn't integrate any other API for an actual business transaction that works with your bank account or credit card. Hopefully, we'll work on that in the next tutorial and use an actual database that could be used in real-life events. Be sure to check [Github](https://github.com/kingsleynwafor54/shopping_cart_with_springboot) for more on the entire code structure in case you want to save time from copying code or have an error. Thanks for staying with me all the way. Happy coding!
### Referrences
- [Rapidapi](https://rapidapi.com/section.io/api/section-io/details)
- [Getting Started with Stripe-springboot](https://www.section.io/engineering-education/stripe-springboot/)

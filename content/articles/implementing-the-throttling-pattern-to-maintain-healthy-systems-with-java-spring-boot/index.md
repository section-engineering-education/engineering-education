#### Introduction
Throttling is a regular English word. But in programming and software engineering, it would carry a slightly different connotation. Basically, it makes sure that any client does not have uncontrollable or uncheckable access to given resources. By this, the resource is protected from abuse and mis-use.

A simple but extremely useful explanation would be to picture a man and his young child in a restaurant. Upon arrival, a waiter comes along to take their order and suree enough, they place a few. The waiter quickly realises that this young child should not be allowed to indulge in too much food in little time and chooses not to serve after if the delay time has not passed. But for the man, a bit more room can be allowed for consumption.  In other words, throttling is a design pattern for controlling resource access.

#### Pre-requisite
A reader should of this article should:
- Be familiar with Java Programming language
- Be familiar with Spring Boot framework
- Have and understand Intellij IDE

#### Table of Content
- What is Throttling?
- What benefits does it hold?
- Are there disadvantages?
- Implementing Throttling in your Project
- Key Takeaway
- Point to Note
- Conclusion

#### What exactly is Throttling?
According to the Microsoft documentation, throttling means to “control the consumption of resources used by an instance of an application, an individual tenant, or an entire service. This can allow the system to continue to function and meet service level agreements, even when an increase in demand places an extreme load on resources.”

#### Benefits of Throttling
The analogy illustrated might be a bit overboard, as it appears that the benefit of throttling is majorly for the client. Throttling does in fact protect resources from mis-use. Also, it makes resources distributively available to all clients who would need it or access to it. Consequently, the servers holding these resources tend not to be over-worked by the many requests that would otherwise have come in.

Essentially, the resource and by extension, server, is shielded from malicious attempts. A single client making hundreds of requests in one minute could crumble the system. Throttling helps mitigate against scenarios like this.

#### Disadvatages of Throttling – if any
Throttling is extremely beneficial. The only downside that has been considered has turned out to be a blessing in disguise. Clients are limited to a certain number of calls for the resource within a certain window of time.

This can be detrimental to a client, whose survival is hinged on a very high uptime and availability of the resource in question. To deal with this, clients can be placed on paid plans or subscription levels that is differentiated by the number of calls a client can make.

#### Implementing Throttling
Now we are going to illustrate how throttling is implemented and works with a simple java project. To do this, we will simulate a project similar to the explanation we gave earlier. We will need three classes – `FoodClient` to represent the man and his kid and `Waiter` to represent the waiter. Also, we need a utility class to keep count of the API (Order-placed) calls - say `OrderCount`.

Let us create the classes FoodClient and OrderCount described above:

```java
@Getter
public class FoodClient {
    private final String clientName;
    private final int ordersPerMinute;
    public FoodClient(String clientName, int ordersPerMinute, OrderCount orderCount) {
        if ( ordersPerMinute < 0) {
            throw new InvalidParameterException("Number of orders under 0 not allowed");
        }
        this. clientName = clientName;
        this. ordersPerMinute = ordersPerMinute;
        orderCount.addTenant(clientName);
    }
}
```
```java
@Slf4j
public class OrderCount {
  private final Map<String, AtomicLong> tenantCount =
new ConcurrentHashMap<>();

  public void addTenant(String name) {
    tenantCallsCount.putIfAbsent(name, new AtomicLong(0));
  }

  public void increaseCount(String name) {
    tenantCallsCount.get(name).incrementAndGet();
  }

  public long getCount(String tenantName) {
    return tenantCount.get(tenantName).get();
  }

  public void reset() {
    tenantCount.replaceAll((k, v) -> new AtomicLong(0));
    log.info("reset counters");
  }
}
```

Now, we would need to create the service which the tenants would call. To keep count of the calls, a throttler timer is utilised.

```java
public interface Throttler {
  void start();
}

public class ThrottleTimerImpl implements Throttler {

  private final int throttlePeriod;
  private final CallsCount callsCount;

  public ThrottleTimerImpl(int throttlePeriod, CallsCount callsCount) {
    this.throttlePeriod = throttlePeriod;
    this.callsCount = callsCount;
  }

  @Override
  public void start() {
    new Timer(true).schedule(new TimerTask() {
      @Override
      public void run() {
        callsCount.reset();
      }
    }, 0, throttlePeriod);
  }
}
```

Waiter serves the placeOrder service to the `FoodClient`. The clients might not know that the food they are placing order is rate-limited. Let us see what the `Waiter` class looks like.

class Waiter {

    private static final Logger LOGGER = LoggerFactory.getLogger(Waiter.class);
    private final OrderCount orderCount;

    public Waiter(Throttler timer, OrderCount orderCount) {
        this. orderCount = orderCount;
        timer.start();
    }

    public int orderDrink(FoodClient foodClient) {
        var name = foodClient.getName();
        var count = orderCount.getCount(name);
        if (count >= foodClient.getOrderPerMinute()) {
            LOGGER.error("I'm sorry {}, you've had enough for today!", name);
            return -1;
        }
        callsCount.incrementCount(tenantName);
        LOGGER.debug("Serving beer to {} : [{} consumed] ", foodClient.getName(), count+1);
        return getRandomCustomerId();
    }

    private int getRandomCustomerId() {
        return ThreadLocalRandom.current().nextInt(1, 10000);
    }
}
At this point, we can see the project in full. FoodClient son is rate-limited to 2 meals per hour and the father, to 4 meals per hour.
```java
public static void main(String[] args) {
    var orderCount = new OrderCount();
    var son = new FoodClient("son", 2, orderCount);
    var father = new FoodClient("father", 4, orderCount);

    var executorService = Executors.newFixedThreadPool(2);

    executorService.execute(() -> makeServiceCalls(son, orderCount));
    executorService.execute(() -> makeServiceCalls(father, orderCount));

    executorService.shutdown();
    try {
        executorService.awaitTermination(10, TimeUnit.SECONDS);
    } catch (InterruptedException e) {
        LOGGER.error("Executor service terminated: {}", e.getMessage());
    }
}
```

```java
private static void makeServiceCalls(FoodClient foodClient, OrderCount orderCount) {
    var timer = new ThrottleTimerImpl(1000, orderCount);
    var service = new Waiter(timer, orderCount);
    // Sleep is introduced to keep the output in check and easy to view and analyze the results.
    IntStream.range(0, 50).forEach(i -> {
        service.requestFood(foodClient);
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            LOGGER.error("Thread interrupted: {}", e.getMessage());
        }
    });
}
```

A description of the eventual output when the code is run, is shown below:

![throttling](/engineering-education/implementing-the-throttling-pattern-to-maintain-healthy-systems-with-java-spring-boot/throt.jpg)

#### Point to Note
Like we mentioned before, a form of subscription mechanism can be introduced to both check the counts made by a client and a means for making money, as the desire to make more calls in a particular timeframe would require paying some sort of fees.

#### Conclusion
In this article, we looked at throttling, what it brings to the table and why it should be a phenomenon of choice. The code for this project can be found on [Github](https://github.com/afropolardev/throtting)

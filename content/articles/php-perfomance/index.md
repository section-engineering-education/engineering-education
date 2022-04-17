### PHP Performance Optimization

### Introduction
PHP gives enough performance. However, PHP developers and system administrators may do several things to boost efficiency, some requiring absolutely no work. While PHP is fast and adaptable, it also offers a variety of choices and settings, and selecting the incorrect settings or functions can cause extreme performance and scalability issues. 

In this article, we will discuss a few easy ideas you may utilize in your code to improve the performance of your application. For example, employ native functions, use JSON instead of XML, leverage cache systems, and appropriately set up OPcache, PHP-FPM, and Memcached. You can also disable the database connection and restrict the number of database hits.

### Table of Contents
- [Introduction](#introduction)
- [Performance Bottlenecks](#performance-bottlenecks)
- [The Role of Profiling in PHP Performance Tuning](#the-role-of-profiling-in-php-performance-tuning)
- [How to Profile a PHP Code Using Xdebug](#how-to-profile-a-php-code-using-xdebug)
- [Performance Optimization Methods in PHP](#performance-optimization-methods-in-php)
- [Measuring PHP Application Performance](#measuring-php-application-performance)

### Performance Bottlenecks
A bottleneck refers to an overburdened network and a condition of computer equipment in which some components are unable to keep up with other components of the same system. Performance bottlenecks often result in slowed overall performance. They can cause the slow functioning of a computer or server. Resolving bottleneck issues typically results in the system reverting to operational performance level. However, it is necessary to detect the components that are underperforming first.

Below are some of the expected performance bottlenecks:

**1. Storage Utilization**

A storage bottleneck indicates that the system's RAM is insufficient or slow. This scenario reduces overall operations by reducing the RAM's pace to feed data to the processors. To keep processes operating, if the system does not have sufficient storage space, the computer will offload storage to a much slower hard disk drive (HDD) or solid-state drive (SSD). In contrast, the system will slow down if the RAM doesn't feed data to the CPU quickly enough. 

Installing larger and quicker RAM is usually required to fix the problem. When existing RAM becomes too slow, it must be changed. Capacity issues can simply be addressed by installing additional memory.

**2. Disk Usage**

HDDs and SSDs are often the slowest component within a computer or server and are often inevitable computer bottlenecks. The fastest long-term storage systems have speed restrictions. It makes this one of the most challenging bottlenecks causes to resolve. Improving data caching speeds in RAM and eliminating fragmentation concerns can enhance disk utilization performance in many circumstances. Switching to fast storage devices and increasing the redundant array of independent disks (RAID) configurations can handle insufficient bandwidth on a physical level.

**3. Software Restrictions**

Performance dips caused by bottlenecks can sometimes be traced back to the software. Under certain circumstances, programs can be designed to handle just a limited number of activities at a time. Therefore, it avoids the use of additional CPU or RAM resources even when they are installed. Furthermore, the software may not be developed to operate with several CPU streams, resulting in a multi-core processor only using one core. These problems can be fixed by modifying and updating the software.

**4. Use of the CPU**

Processor bottlenecks arise when the central processing unit is overloaded and unable to complete tasks on time.  A processor operating at over 80% capacity for a prolonged time is a CPU bottleneck. Limited system storage and constant interference from input and output devices are common causes of CPU usage limitations. Using a basic CPU bottleneck test to resolve these issues leads to extra CPU power, more RAM, and improved software coding effectiveness.

**5. Network Usage**

Network bottlenecks arise once the bandwidth or processing capacity linking the devices is insufficient to execute an operation rapidly. They normally occur when a server is overloaded or a network communication component is overwhelmed. Usually, upgrading or installing new servers and network infrastructures like routers, hubs, and base stations are required to resolve network usage concerns.

### The role of Profiling in PHP Performance Tuning
Profiling uses code profilers to analyze how applications run and try to improve where the codes run slowly. The execution time and frequency of calls to particular functions are recorded during profiling. The programmer can use this tool to discover and optimize the slowest code segments. There are three types of profilers.
1. Standard profilers
They focus on a method or line-level profiling. Profiling at this stage is extremely time-consuming. However, this gives a detailed view. Most of the time, it is enabled for the local environment to investigate a strange CPU performance issue. However, keep in mind that enabling profiling may cause your application to slow down.
2. Transaction tracing
Transaction tracing is a type of profiling that is light enough to be used in day-to-day operations. It does not bog down unnecessarily and identifies potential performance problems practically as rapidly as a code is created.
3. Application performance monitoring (APM) tools
They provide fundamental server metrics such as CPU and RAM and comprehensive, code-level insights into the functioning of an application. APMs do more than only discover code issues, unlike a normal or trace PHP profiler. They assist in identifying bottlenecks and opportunities for enhancement throughout the entire web stack.

### How to Profile a PHP Code Using Xdebug
Xdebug's Profiler allows users to analyze PHP codes, identify bottlenecks, and observe which portions of the code are sluggish and may be improved. The profiler also gathers data on memory space being utilized and functions and procedures that consume the most memory.
For details on how to install Xdebug on Windows and Linux, click [here](https://xdebug.org/docs/install#configure-php)

In order to begin profiling applications using Xdebug, the below settings are added to `php.ini`.

```
xdebug.profiler_enable = 1
xdebug.profiler_output_name = xdebug.out.
xdebug.profiler_output_dir = /tmp
xdebug.profiler_enable_trigger
```

Xdebug has its profiler disabled by default. Thus `xdebug.profiler_enable` is called to turn it on. The title to the profiler log is `xdebug.profiler_output_name`. The profiled result of Xdebug is saved in the path defined by `xdebug.profiler_output_dir`. It can be altered to any location, but keep in mind that it has to write access permissions for the user profile that runs the PHP script.

The PHP processor examines each function call and reports its information. Because of this process, profiling lowers performance, so it is not to be performed several times.  `xdebug.profiler_enable_trigger` allows Xdebug to automatically profile when the GET or POST parameter `XDEBUG_PROFILE` is provided.

The HTTP header `X-Xdebug-Profile-Filename` is added by Xdebug to a profiled request. The header includes the filename that includes the request's profiling information.

The log file generated by Xdebug is generally based on the program's tasks. The generated file is not very reader-friendly. A tool like KCachegrind or Webgrind is used to be viewed and interpreted. Webgrind is a web-based application, while KCachegrind is a profiling data display software for KDE that requires a Unix setup to execute.

KCachegrind will display each function call starting from the `main()` when the profiling log file is opened. Here's a KCachegrind display of a function's profiling results to discover a factorial.

![](PHP%20Opt/php%201.jpeg)

The time consumed by every function in a sequence of performance is displayed in the Function Profile found on the left side panel. The exact information is visually displayed in the top right sidebar. The information has its size matching the function's cost. The call graph depicts the connection across the application's functions. There are two functions in this illustration: `main()` and `fact ()`. The cycle in the graph indicates that `fact()` is a recurrent function.

### Performance Optimization Methods in PHP
1. Use of Native Functions
To achieve a better performance when working with PHP, attempt to leverage native PHP functions instead of creating new ones—for instance, using a range( c, j) to obtain an array of alphabets beginning from c to j in succession. If it's only needed once in the script, declare an array containing these entries in a function and restore it when the function is called.
2. Using JSON (JavaScript Object Notation) instead of XML# (Extensible Markup Language)
Native PHP routines like `json_encode()` and `json_decode()` are tremendously fast, hence utilizing JSON instead of XML is recommended. If you're serious about XML, use standard expressions instead of DOM (Document Object Model) manipulation to read it.
3. Enable OPcache on the PHP server
Since it operates closely with the code compilation process, OPcache is among the basic blocks of PHP performance. Consider this: if a request is sent to the server and compiles the code each time before delivering replies, the practice will gradually slow downloading time. OPcache saves the pre-compiled code and prevents it from compiling on subsequent requests.  Following the integration of Opcache, some experts predict that PHP performance will be three times quicker, and the load time will be significantly reduced. As a result, the significance of Opcache cannot be overstated.
4. Memcache For Database Configuration
Memcached is a memory caching technology that is decentralized. Keeping database objects in volatile memory speeds up web pages with substantial dynamic databases. Keeping data in dynamic memory is to relieve server load every time an external data provider requests a read. The use of a Memcached layer minimizes the number of database queries. Memcached saves and recovers values without interpreting database requests, avoiding these complications.
5. PHP Version Upgrade
Experts advocate upgrading the software to the latest version released by its developers. Since PHP 7.3 RC1 is already released, users can examine what's new in the edition. Developers are hard at work optimizing PHP speed in each release and bringing security and efficiency upgrades.

### Measuring PHP application performance Using APM Tools
It involves analyzing an application's overall performance and across release cycles using key metrics. To detect the changes in performance, these metrics are contrasted to the baseline metrics. Advances in the current metrics become a new baseline for future evaluation with each iteration.

APM Insight's monitoring agent monitors PHP performance and analyzes users' experience with apps. The [APDEX scores](https://docs.newrelic.com/docs/apm/new-relic-apm/apdex/apdex-measure-user-satisfaction/#:~:text=The%20Apdex%20score%20is%20a,as%20half%20a%20satisfied%20request.) can be used to determine customer satisfaction. Important characteristics such as connection speeds, throughput, and errors can disclose information about the PHP server and its applications. This knowledge can aid a user in increasing performance and APDEX ratings.

APM tools can quickly obtain PHP applications' performance information. Below is a sample of an output of a PHP application performance.

![](PHP%20Opt/php%202.jpeg)

The picture above shows a graphical interpretation of a log file obtained from Xdebug.
The following KPI metrics are monitored in a PHP application for evaluation.

1. Apdex Score - It's used to determine how satisfied PHP application users are. The Apdex score appears 
2. Response Time - From a user's viewpoint, it is time an application takes to return a response for a certain request. For instance, the average response time is 5.0 ms. 
3. Throughput - The number of exceptions produced per second, i.e., the number of breakdowns in the PHP application. 
4. Request count - This calculates the time every query in the database call takes. It allows users to identify the queries that take the most time and improve them.
5. Error counts - This is the number of operational failures encountered by the application.

### Conclusion
PHP is a powerful web development programming language. Users use it to make dynamic web pages and apps. However, they must constantly optimize PHP for performance. We've gone through the most important methods of improving PHP speed in this article.   It is advisable to keep track of the performance indicators and utilize monitoring tools to maintain PHP performance. Users can assure full functionality and quicker page load times for web apps in this way.

### Further Reading
- [Profiling with Xdebug](https://xdebug.org/docs/profiler)
- [PHP performance monitoring](https://www.manageengine.com/products/applications_manager/php-performance-monitoring.html)



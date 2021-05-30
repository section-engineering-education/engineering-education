---
layout: engineering-education
status: publish
published: true
url: /how-to-choose-levels-of-logging/
title: How to Choose Levels of Logging
description: In this article we will discuss the various levels of logging, their functions and how to choose a logging level. We will also will give a historical background of logging levels and describes different logging levels.
author: eric-kahuha
date: 2021-03-02T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-choose-levels-of-logging/hero.jpg
    alt: Levels of Logging image
---
Application logging is an essential practice a developer can implement in their code to facilitate production support. Entries in log files contain essential information, including a timestamp, contextual information, and messages. Yet log messages are not the easiest to understand.
<!--more-->
Most log management solutions that collect data and accept data from various sources have different log structures. Therefore, it may be challenging to understand them. It is crucial to keep meaningful log levels as we develop applications. 

This will ensure that anyone who reads the logs can make meaning of the intended message. It is essential to use the [best logging practices](https://www.scalyr.com/blog/the-10-commandments-of-logging/). This article will give a historical background of logging levels and describes different logging levels.

### What is a logging level?
A logging level is a way of classifying the entries in your log file in terms of urgency. Classifying helps filter your log files during search and helps control the amount of information in your logs. Sometimes, categorizing may require you to balance storage use. You may want to capture every detail that may be useful in troubleshooting. 

Yet, doing this may use up storage causing your production code to slow down. While implementing logging levels, you do not necessarily need to know everything that happens in production. You can outline how to identify warning conditions or problems for troubleshooting purposes.

### Background of logging levels
Logging levels distinguish various log events from each other. They are a way of filtering important information about your system's state and reduce information noise or alert fatigue.

Log levels were introduced in the 1980s in a project named [Sendmail](https://en.wikipedia.org/wiki/Sendmail). Eric Allman developed the Sendmail project. The project owners needed a logging solution that eventually led to the creation of a [System Logging Protocol](https://www.paessler.com/it-explained/syslog#) (Syslog) server and the idea of severity levels.

Ultimately, Syslog was embraced by numerous applications and has become a standard protocol for sending system log and event messages to the Syslog server.

Over the years, programming languages have evolved. So did the emergence of logging into app frameworks, such as [log4net](https://logging.apache.org/log4net/). Log4net helps programmers output log messages to different output targets without changing the application binary. 

Concepts such as severity level also came along and are seen in logging levels today. These severity levels are emergency, critical, alert, error, warning, debug, informational, and notice.

Each programming language has a logging framework that allows you to store data in different formats. This way, you can ship the data to various destinations such as text files. Beyond the multiple destinations and formats, it is essential to realize that the logging event level is key in this process.

### Logging levels explained
The most common logging levels include FATAL, ERROR, WARN, INFO, DEBUG, TRACE, ALL, and OFF. Some of them are important, others less important, while others are meta-considerations. The [standard ranking](https://www.tutorialspoint.com/log4j/log4j_logging_levels.htm) of logging levels is as follows: ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < OFF. 

We will go over them in reverse order with more detail below:
#### OFF
This log level does not log anything. This OFF level is used to turn off logging and is the greatest possible rank. With this log level, nothing gets logged at all.

#### FATAL
FATAL means that the application is about to stop a serious problem or corruption from happening. The FATAL level of logging shows that the application's situation is catastrophic, such that an important function is not working. For example, you can use FATAL log level if the application is unable to connect to the data store.

#### ERROR
Unlike the FATAL logging level, error does not mean your application is aborting. Instead, there is just an inability to access a service or a file. This ERROR shows a failure of something important in your application. This log level is used when a severe issue is stopping functions within the application from operating efficiently. Most of the time, the application will continue to run, but eventually, it will need to be addressed.

#### WARN
The WARN log level is used when you have detected an unexpected application problem. This means you are not quite sure whether the problem will recur or remain. You may not notice any harm to your application at this point. This issue is usually a situation that stops specific processes from running. Yet it does not mean that the application has been harmed. In fact, the code should continue to work as usual. You should eventually check these warnings just in case the problem reoccurs.

#### INFO
INFO messages are like the normal behavior of applications. They state what happened. For example, if a particular service stopped or started or you added something to the database. These entries are nothing to worry about during usual operations. The information logged using the INFO log is usually informative, and it does not necessarily require you to follow up on it.

#### DEBUG
With DEBUG, you are giving diagnostic information in a detailed manner. It is verbose and has more information than you would need when using the application. DEBUG logging level is used to fetch information needed to diagnose, troubleshoot, or test an application. This ensures a smooth running application.

#### TRACE
The TRACE log level captures all the details about the behavior of the application. It is mostly diagnostic and is more granular and finer than DEBUG log level. This log level is used in situations where you need to see what happened in your application or what happened in the third-party libraries used. You can use the TRACE log level to query parameters in the code or interpret the algorithm's steps.

#### ALL
This log level logs any logging levels that are defined. It logs everything and includes custom logging levels as well. It is the combination of all other logging levels.

### Do log levels work on their own?
Logging levels do not work well on their own. They mostly serve information purposes in the log message. They provide information on how crucial an event is. You can limit the information written to the log level by combining the log level with a logging framework.

Setting a specific log level in the logging framework ensures less important logging levels are ignored. For example, if the logging framework has the root log level as WARN, you only get events with FATAL level, ERROR level, and WARN level.

### Conclusion
It is crucial to choose the right logging level when developing an application. This is beneficial to everyone using logs when searching for problems, creating alerts, troubleshooting, or regularly checking the application. 

During coding, it may not seem like an important thing to consider. Yet, it is still essential to ease information search, alerting, and filtering when handling vast log messages that the systems produce. To make your logs useful, ensure that you choose the right logging levels.

Happy coding.

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)

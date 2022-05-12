---
layout: engineering-education
status: publish
published: true
url: /python-logs/
title: How to Collect, Update and Organize Python Logs
description: In this tutorial, we will learn about Python logging. We will learn how to collect and organize logs from Python code.
author: moris-wanyiri
date: 2022-01-25T00:00:00-07:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/python-logs/hero.png
    alt: How to collect, update and organize python logs
---
Python comes with a logging module in the standard library that provides a flexible framework for emitting log messages from Python programs. This article explains how to use the logging module in Python to log all of the data needed.
<!--more-->
We can use an external configuration file to set up the Python logging subsystem. We may find the details of the logging setup design in the Python standard library.

The logging library comprises four classes: `loggers,` `handlers`, `filters,` and `formatters.`

### Table of contents
- [Table of contents](#table-of-contents)
- [Modifying log configuration](#modifying-log-configuration)
  - [Benefits of logging](#benefits-of-logging)
  - [Representation of basicConfig() method](#representation-of-basicconfig-method)
- [Setting up the logging module](#setting-up-the-logging-module)
- [Styling and merging JSON logs](#styling-and-merging-json-logs)
- [Conclusion](#conclusion)
- [Further activity reading](#further-activity-reading)

### Modifying log configuration
The `basicConfig()` method in the logging module is the quickest way for setting up the log configuration. However, the [Python documentation](https://docs.python.org/3.7/library/logging.html#logger-objects) proposes making a logger for every module in your application. Utilizing `basicConfig()` alone can be difficult.

The three significant configurations of `basicConfig()` method are:
- **level**: determines the level of logging in your application. The common log ranks are `DEBUG`, `INFO`, `WARNING`, `ERROR`, and `CRITICAL`. The default level is `WARNING`.
- **handler**: determines where the application will pipe your logs.
- **design**: messages are logged in this format: `LEVEL>:LOGGER NAME>: MESSAGE>`.

You could be losing out on truly low logs that can help you work easier, based on how the logging module provides `WARNING` and more essential level logs as a replacement. Use a `FileHandler` to log single or additional documents on the file system. Using `StreamHandler` or `SocketHandler` to route logs may help the log organization.

#### Benefits of logging
- When a network connection is interrupted, we will not lose the logs since the logs are stored in the file system.
- Logs make it easier to monitor the applications and fix bugs whenever we get an error log.

#### Representation of basicConfig() method
Logs follow a specific design that includes the following:
- `%(asctime)s`: it yields the date and season of the log in [local time](https://docs.python.org/3.7/library/time.html#time.asctime).
- `%(levelname)s`: the logging rank of the information.
- `%(message)s`: the content of the log. [Read more about log attributes](https://docs.python.org/3/library/logging.html#logrecord-ascribes).

### Setting up the logging module
The more the application expands, the more we need to utilize a reliable way of designing each logger by incorporating the log name as a log section. The following are the steps to set up the logging module:

- Arrange various logs and record their properties to self-assertively set the log title to suit the attributes of our module. Utilize the logging library's incorporated [getLogger() approach](https://docs.python.org/3.7/library/logging.html#logging.getLogger):

```bash
logger = logging.getLogger(__name__)
```

- `getLogger()` sets log character to **identity** , which [coincides with the productive ID of the module](https://docs.python.org/3/reference/import.html?highlight=__name__#__name__) from which the strategy is determined. This guides us to realize which portion of our application brought about each message. Then, at that point, we can interpret our logs. Thus, when we change the log design and include the log identities, the description will be shown in each log message:

```python
# lessermodule.py
import logging.config
import traceback
logging.config.fileConfig('logging.ini', disable_existing_loggers=False)
logger = logging.getLogger(__name__)
def word_count(myid):
    try:
        # count the number of words in a file, myid, and log the result
        with open(myfile, 'r+') as f:
            file_data = f.read()
            words = file_data.split(" ")
            final_word_count = len(words)
            logger.info("this file has %d words", final_word_count)
            f.write("this file has %d words", final_word_count)
            return final_word_count
    except OSError as e:
        logger.error(e, exc_info=True)
    except:
        logger.error("uncaught exception: %s", traceback.format_exc())
        return False
if __name__ == '__main__':
    word_count('myid.txt')
```

Running the `higher_module.py`, the logging will yield the following results.

```bash
2021-11-02 23:45:23,567 __main__INFO:starting the capacity
2021-11-02 23:45:23,567 lessermodude INFO:this record has 27 words
2021-11-02 23:45:23,567 __main__DEBUG:the work is finished the record myid.text
2021-11-02 23:45:23,567 __main__INFO:starting the capacity
2021-11-02 23:45:23,567 lessermodule ERROR:[errno 2] No such document or index
2021-11-02 23:45:23,567 __main__DEBUG:the work is ruined the document nonexistent
```

Log label is set certainly after the timestamp, and in this manner, you can follow which section produced each message. However, without characterizing the log with `getLogger()`, each log label will appear as a root, making it more difficult to see which messages are produced by the parent module instead of the child module.

Messages created from `higher_module.py` count the **main** [module](https://docs.python.org/3/library/__main__.html) as the log label since the `higher_module.py` was executed at the high levels script. Remembering that we are powerfully fusing the logs way of life as a section of the log design, both of these logs are set up with the equivalent `basicConfig()`.

- use `fileConfig()` to send out logs to multiple stations. Utilizing record based (indexConfig()) or [dictionary-based (dictConfig()) configurations](https://docs.python.org/3.7/library/logging.config.html#logging.config.dictConfig) gives access to order more custom arranging and directing choices for each log in your application.

A logging setup record needs to contain the most extreme three sections:
1. `[loggers]`: the identity of the logs you will design.
2. `[handlers]`: controllers intended to utilise these loggers.
3. `[formatters]`: the structure you need each log to follow.

Keys direct the labels of different parts that you will be required to design, arranged as `[<SECTION_NAME>_<KEY_NAME>]`, by which the section name is either logger, controller, or formatter.

The following is a basic outline of a logging setup file.

```python
[loggers]
keys=root
[handlers]
keys=fileHandler
[formatters]
keys=simpleFormatter
[logger_root]
level=DEBUG
handlers=fileHandler
[handler_fileHandler]
class=FileHandler
level=DEBUG
formatter=simpleFormatter
args=("/path/to/log/file.log",)
[formatter_simpleFormatter]
format=%(asctime)s %(name)s - %(levelname)s:%(message)s
```

The Python library states that we can include only one handler in one log. For more information on propagation, see the [documentation](https://docs.python.org/3/library/logging.html#logging.Logger.propagate). Taking a look at the outline '( parent module and child module)', the two logs will give a DEBUG yield and high-need signs in the arrangement '(formatter_simpleFormatter)' and incorporate them into a log record (`file.log`). This will take out the need to include `logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(name)s %(levelname)s:%(message)s')` in your sections.

With the inclusion of the previously stated format, you can add `logging.config.fileConfig()`.

```python
import logging.config
logging.config.fileConfig('/way/to/logging.ini', disable_existing_loggers=False)
lumberjack = logging.getLogger(__name__)
```

Alternatively, you can use the Django application to log your files since it utilizes Python modules. The following steps should be adhered to while utilizing Django logging:

1. Configure `location.py` for various loggers, handlers, filters, and formatters.
2. Including the logger's code in views or any other module applicable.
3. Configuring `location.py`. To enable logging in Django, we have to configure its locale.

The method used in Django is `dictConfig` since it works under different modules. A sample illustration is as shown below:

```python
# Logging Information
LOGGING = {
'variant': 1,
# Version of logging
'disable_existing_loggers': False,
# disable logging
# Handlers contained
'overseers': {
'record': {
'level': 'Investigate',
'class': 'logging.FileHandler',
'filename': 'dataflair-debug.log',
        },
'console': {
'class': 'logging.StreamHandler',
        },
    },
# Loggers appended
'loggers': {
'django': {
'overseers': ['file', 'console'
            ],
'level': 'Investigate',
'proliferate': True,
'level': os.getenv('DJANGO_LOG_LEVEL', 'Investigate')
        },
    },
}
```

In Django, there is an in-built variable contained in the library. In addition, there are keynotes in the logging dictionary; version, `disable-existing-loggers`, handlers, and loggers. The Version key displays the mapping form, which has a value of 1 by default.

The `disable-existing-logger` key tells Django not to disable loggers. This key, by custom, is true. However, it's important not to set it to true while working with database queries and functions.

Handlers handle the messages and pass them to support records and more. The actual controllers are a word reference. Those word reference key names will be the names of the controllers. There are various types, but more emphasis is placed on:

- `FileHandler`: stores the logs in a file.
- `StreamHandler`: streams the logs on the console.

Loggers log the server or software details. Django provides several loggers, for example, `django.request`. You should start your server with `$python manage.py runserver` to implement logging. After that, hit enter, and the application will display the log messages in the console since the default level is set to debug.

### Styling and merging JSON logs
When your framework produces numerous logs in a given term, it becomes difficult to recognize logs that can help you during troubleshooting. Generally, the logs are dispersed across various servers or files.

Bringing your logs together helps you when you need to look at and organize your logs. In addition, the JSON design/style is significant in that it is effectively adaptable. For example, if you want to add attributes to each log design, you won't have to refresh your log handling pathways each time you add or eliminate credits from your log design.

The initial step is to introduce it in your current logs:'

```bash
pip introduce python-json-logger
```

After establishment, you'll need to refresh design records to make the current formatter or add a new formatter that will style logs in JSON. JSON formatter utilizes [pythonjsonlogger.jsonlogger.JsonFormater class](https://github.com/madzak/python-json-logger#using-a-config-document). We can determine the characteristics we need to remember for each log record:

```python
[loggers]
keys=root,lowermodule
[handlers]
keys=consoleHandler,fileHandler
[formatters]
keys=simpleFormatter,json
[logger_root]
level=DEBUG
handlers=consoleHandler
[logger_lowermodule]
level=DEBUG
handlers=fileHandler
qualname=lowermodule
[handler_consoleHandler]
class=StreamHandler
level=DEBUG
formatter=simpleFormatter
args=(sys.stdout,)
[handler_fileHandler]
class=FileHandler
level=DEBUG
formatter=json
args=("/home/molly/myid.log",)
[formatter_json]
class=pythonjsonlogger.jsonlogger.JsonFormatter
format=%(asctime)s %(name)s %(levelname)s %(message)s
[formatter_simpleFormatter]
format=%(asctime)s %(name) s-%(levelname)s: %(message)s
```

Logs shipped from the command prompt `(with consoleHandler)` follow the `simpleFormatter` style to enhance readability. After the inclusion of `pythonjsonlogger.jsonlogger.JsonFormatter` class in your configuration file, the `fileConfig()` function will create the JsonFormatter if the code runs in an environment that can import `pythonjsonlogger`.

For example, suppose you're not utilizing a record based setup, you should include the `python-json-logger` assortment in your function code and characterize a controller and formatter, as depicted in the [library](https://github.com/madzak/python-json-logger#integrating-with-pythons-logging-framework).

One more advantage of signing in JSON is adding attributes that an external log management service can parse and investigate consequently. For example, prior, we arranged for the format to incorporate standard ascribes like `%(asctime)s`, `%(name)s`, `%(levelname)s`, and `%(message)s`.

```python
# lessermodule.py
import logging.config
import traceback
import time
def word_count(myid):
    logger = logging.getLogger(__name__)
    logging.fileConfig('logging.ini', disable_existing_loggers=False)
    try:
        starttime = time.time()
        with open(myfile, 'r') as f:
            file_data = f.read()
            words = file_data.split(" ")
            final_word_count = len(words)
            endtime = time.time()
            duration = endtime - starttime
            logger.info("this file has %d words", final_word_count, extra={"run_duration":duration})
            return final_word_count
    except OSError as e:
        [...]
```

In the program above, `run_duration` represents the estimation of the span of the action right away.

Output:

```bash
{"asctime": "2021-11-05 16:45:35,861", "name": "lesser_module", "levelname": "Data", "message": "this record has 89 words", "run_duration": 6.675498706528215e-05}
```

### Conclusion
The logging module simplifies everything and eases the pressure of complexity. It is considered to be versatile. Its arrangement is sensible and ought to satisfy your use case out of the box.

If you haven't been using logs in your applications, this is an excellent chance to start. When done right, logging will undoubtedly improve your productivity.

### Further activity reading
For more on python logs, [visit this site](https://docs.python.org/3/library/logging.html).

Happy Coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

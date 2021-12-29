---
layout: engineering-education
status: publish
published: true
url: /how-to-collect-update-and-organize-python-logs/
title: How to collect, update and organize python logs
description: In this tutorial, we will learn about Python logging. We will learn how to collect logs from Python code and how to organize them
author: moris-wanyiri
date: 2021-12-18T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-collect-update-and-organize-python-logs/hero.png
    alt: How to collect, update and organize python logs
---
### Introduction
The logging module in Python is designed to provide your applications with crucial permeability. 
<!--more-->
This article explains how to use the module to log all of the data needed, route it to desired destinations, and solidify logs to include more information into Python programs.

We can use an external setup document to set up the Python logging subsystem. We can find the details of the logging setup design in the Python standard library.
The logging library is divided into four classes: `loggers,` `controllers`, `channels,` and `organizations.`

### Table of Contents
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Modifying your logs' need level and objective](#modifying-your-logs-need-level-and-objective)
- [Make a redid arrangement with different loggers and objections.](#make-a-redid-arrangement-with-different-loggers-and-objections)
- [Fuse tracebacks and exceptional case managing in your logs](#fuse-tracebacks-and-exceptional-case-managing-in-your-logs)
- [To work with investigating, design your logs in JSON and merge them](#to-work-with-investigating-design-your-logs-in-json-and-merge-them)
- [Conclusion](#conclusion)
- [Further activity reading](#further-activity-reading)
  
### Modifying your logs' need level and objective
The `basicConfig` technique for the logging module is the quickest strategy for planning your loggers' ideal direction. However, the [Python documentation](https://docs.python.org/3.7/library/logging.html#logger-objects) proposes making a logger for every module in your application and arranging a logger for each module utilizing `basicConfig` alone can be annoying.

The three significant measures of `basicConfig` are:
- **level**: plunging succession of events. The available log ranks are `DEBUG`, `INFO`, `WARNING`, `ERROR`, and `CRITICAL`. The default level is `WARNING`.
- **controller**: determines where the application will pipe your logs.
- **design**: messages are logged in the format: `LEVEL>:LOGGER NAME>: MESSAGE>`.
  
You could be losing out on truly low logs that can help you work easier, based on how the logging module provides `WARNING` and, more important, level logs as a replacement. 

So instead, use a 'FileHandler' to log single or additional documents on the circle, maybe using a `StreamHandler` or a `SocketHandler` to route logs to the control center or an unessential help over the organization.

#### Benefits of logging documents
While streaming logs to attributes, your application doesn't need to abide with the possibility of organization-related irregularities. 

Furthermore, in the event of any issues happening while at the same time streaming logs over the organization, you'll not lose access to those logs since we'll have upheld them on every server.

It considers making a more customized logging setup, whereby you're ready to isolate files and concentrate those documents with a log following asset.
  
#### Representation of basicConfig
Logs follow a specific design that includes the following attributes:
- `%(asctime)s`: it yields the date and season of the log, in [local time](https://docs.python.org/3.7/library/time.html#time.asctime).
- `%(logger)s` : the logging leveof the information.
- `%(import)s`: tenor of the log. Read more about log attributes [here](https://docs.python.org/3/library/logging.html#logrecord-ascribes).

### Make a redid arrangement with different loggers and objections.
The more your application scales, the more you need to utilize a reliable and explained way of designing each logger by incorporating the log name as a log section. 

Arrange various logs and record their personalities powerfully to self-assertively set the log title to suit the personality of your module. Utilize the logging library's incorporated [getLogger() approach](https://docs.python.org/3.7/library/logging.html#logging.getLogger):

```bash
logger = logging.getLogger(__name__)
```

- `getLogger()` sets log character to __identity__ , which [coincides with the productive ID of the module](https://docs.python.org/3/reference/import.html?highlight=__name__#__name__) from which the strategy is determined. This guides you to realize which portion of your application brought about each message. Then, at that point, you can comprehend your logs. Thus, when you change the log design and consolidate the log identities, the description  will be shown in each log message.

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

Running the higher_module.py, the logging will yield the accompanying.

```bash
2021-11-02 23:45:23,567 __main__INFO:starting the capacity
2021-11-02 23:45:23,567 lessermodude INFO:this record has 27 words
2021-11-02 23:45:23,567 __main__DEBUG:the work is finished the record myid.text
2021-11-02 23:45:23,567 __main__INFO:starting the capacity
2021-11-02 23:45:23,567 lessermodule ERROR:[errno 2] No such document or index
2021-11-02 23:45:23,567 __main__DEBUG:the work is ruined the document nonexistent
```

Log properties is set certainly after the timestamp, and in this manner, you can follow which section produced each message. However, inability to characterize the log with `getLogger()`, each log attribute will appear as a root effect, making it more difficult to see which messages are produced by the higher module in opposition to the lesser module.

Messages created from `higher_module.py` count the __main__ [module](https://docs.python.org/3/library/__main__.html) as the log attributes since the higher_module.py was executed at the high levels script. Remembering that we are powerfully fusing the logs way of life as a section of the log design, both of these logs are set up with the equivalent `basicConfig()`.

- use `fileConfig()` to send out logs to a few areas. 
Utilizing record based (indexConfig()) or [dictionary-based (dictConfig()) configurations](https://docs.python.org/3.7/library/logging.config.html#logging.config.dictConfig) gives access to order more custom arranging and directing choices for each log in your application and commodity logs to a few areas.
A logging setup record needs to contain the most extreme three sections:
- `[loggers]`: the properties of the logs you will design. 
- `[handlers]`: controllers intended to be utilized by these loggers.
- `[formatters]`: the structure you need each log to follow. 

Keys direct the properties of different parts that you will be required to design, arranged as `[<SECTION_NAME>_<KEY_NAME>]`, by which the fragment name is either logger, controller, or formatter.
The following is a basic outline of a logging setup document.

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

The Python library directs that only one overseer can be included to one log. More data on loggers see the [documentation](https://docs.python.org/3/library/logging.html#logging.Logger.propagate). Taking a look at the outline '( higher module and lesser module)', the two logs will give a DEBUG result and high-need signs in the arrangement '(formatter_simpleFormatter)' and incorporate them into a log record (file.log). This will take out the need to include `logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(name)s %(levelname)s:%(message)s')` in your portions. 
With the inclusion of the previously stated design, you can add `logging.config.fileConfig()`.

```bash
import logging.config 
logging.config.fileConfig('/way/to/logging.ini', disable_existing_loggers=False) 
lumberjack = logging.getLogger(__name__) 
```

Alternatively, you can use the Django application to log your files since it utilizes Python modules. The following steps should be adhered to while utilizing Django logging:
1. Configure `location.py` for various loggers, handlers, filters, and formatters.
2. Appending the logger's code in views or any other module applicable
3. Configuring `location.py`. To enable logging in Django, we have to configure its locale.
   - loggers
   - handlers
   - formatters
   - filters

The method used in Django is `dictConfig` since it works under dissimilar modules. A sample illustration is as below:

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

The `disable-existing-logger`  key tells Django not to disable loggers. This key, by custom, is true. However, it's important not to set it to true while working with database queries and functions.

Handlers handle the messages and pass them to support records and more. The actual controllers are a word reference. Those word reference key names will be the names of the controllers. There are various types, but more emphasis is placed on:
- `FileHandler`: stores the logs in a file.
- `StreamHandler`: streams the logs on the console.

Loggers log your server or software details. Django provides several loggers, for example, `django.request`. You should start your server with `$python manage.py runserver` to implement logging. After that, hit enter, and we will display the following messages since the default level is set to debug.


### Fuse tracebacks and exceptional case managing in your logs
Logging tracebacks in your exception logs are huge in research. `Logging.error()` doesn't connect any tracebacks anyway; it shows exception as an error. Set the `sys.exc_info` to True to enable `logging.error()` get tracebacks.

Description of `exc_info` :
```python
# lessermodule.py
logging.config.fileConfig('/path/to/logging.ini', disable_existing_loggers=False)
logger = logging.getLogger(__name__)
def word_count(myid):
    try:
    # count the number of words in a file, myid, and log the result
    [...]
    except OSError as e:
        logger.error(e)
        logger.error(e, exc_info=True)
```

It isn't easy to resolve each achievable exceptional case. But, fundamentally, guarantee your logs can get every exclusion, and you can deal with them later.

An unhandled exception happens when the application code doesn't return true to handle extraordinary cases outside the `try... except` block. For instance, the file may not exist when you endeavor to open a file. What is more, you can use Python's standard [traceback library](https://docs.python.org/3/library/traceback.html) to coordinate traceback and connect it to the log message in an event as under:

```python
# lessermodule.py
import logging.config
import traceback
logging.config.fileConfig('logging.ini', disable_existing_loggers=False)
logger = logging.getLogger(__name__)
def word_count(myid):
    try:
        # count the number of words in a file, myid, and log the result
        with open(myid, 'r+') as f:
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
This means that the code contains a `TypeError` unique case that isn't dealt with in the endeavor except for reasoning, yet it will be logged since we fused the `traceback` code.

### To work with investigating, design your logs in JSON and merge them
This part will examine how to style signs in JSON, unify and break down information with a log the board answer to better understand use execution, disappointments, and considerably more.
 
- Style signs in JSON. When your framework produces numerous logs in a given term, it becomes bothersome to recognize logs that can help you during an investigation. Generally, the logs are dispersed across various servers, documents, or administrations. Bringing your logs together helps you when you need to look at and dissect your logs. In addition, the JSON design/style is significant in that it is effectively adaptable. For example, if you want to add attributes to each log design, you won't have to refresh your log handling pathways each time you add or eliminate errors from your log design.

The initial step is to introduce it in your current logs:

```bash
pip introduce python-json-logger
```

After establishment, you'll need to refresh design records to make the current formatter redid or add a new formatter that will style signs in JSON ([formatter_json]). JSON formatter utilizes [pythonjsonlogger.jsonlogger.JsonFormater class](https://github.com/madzak/python-json-logger#using-a-config-document). You can determine the characteristics you need to remember for each log record.

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

Logs shipped from the command prompt `(with consoleHandler)` follow the `simpleFormatter` style to enhance readability. After the inclusion of `pythonjsonlogger.jsonlogger.JsonFormatter` class in your configuration file, the `fileConfig()` function will create the `JsonFormatter` if the code runs in an environment that can import `pythonjsonlogger`. In case you're not utilizing a record based setup, you should append the `python-json-logger` assortment in your function code and characterize a controller and formatter, as depicted in the [library](https://github.com/madzak/python-json-logger#integrating-with-pythons-logging-framework):
- Add custom ascribes to your JSON logs.

One more advantage of signing in JSON is adding credits that an outer log the executive's administration can parse and investigate consequently. Prior we arranged for the organization to incorporate standard ascribes like `%(asctime)s`, `%(name)s`, `%(levelname)s`, and `%(message)s`.

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

```bash
{"asctime": "2021-11-05 16:45:35,861", "name": "lesser_module", "levelname": "Data", "message": "this record has 89 words", "run_duration": 6.675498706528215e-05}
```

### Conclusion
The logging module simplifies everything and eases the pressure of complexity. It is considered to be simple and easy to use. Its arrangement is sensible and ought to satisfy your usage case out of the box. You can add fundamental logging to a little activity, or you can make your practice on log levels, regulator genres, and that is just a part of something larger if you are working on a significant data.

If you haven't been using logs in your applications, this is a good chance to start. When done right, logging will undoubtedly take a huge load of contact from your progression cycle and will assist you in taking your function to a more better significant level. I prefer logging since it simplifies load complexity and is very precise and understandable.

### Further activity reading
More on python logs [visit](https://docs.python.org/3/library/logging.html)

Happy Coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

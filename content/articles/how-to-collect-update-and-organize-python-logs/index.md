### Introduction
The built-in logging module in Python is intended to provide vital visibility into your applications with little configuration. This article describes how to configure Python's logging module to log all the data needed, route it to desired destinations, and consolidate logs to gain deeper insights into Python applications.
An external configuration file can also be used to configure the Python logging subsystem. The Python standard library contains the specifications for the logging configuration format.
The logging library follows a modular design and is divided into four categories: loggers, handlers, filters, and formats.

### Table of content

- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Modify your logs' need level and objective](#modify-your-logs-need-level-and-objective)
- [Make a redid arrangement with different lumberjacks and objections.](#make-a-redid-arrangement-with-different-lumberjacks-and-objections)
- [Fuse tracebacks and exceptional case managing in your logs.](#fuse-tracebacks-and-exceptional-case-managing-in-your-logs)
- [To work with investigating, design your logs in JSON and merge them](#to-work-with-investigating-design-your-logs-in-json-and-merge-them)
- [Conclusion](#conclusion)
- [Further activity reading](#further-activity-reading)

### Modify your logs' need level and objective 
The logging module is related with [Python's standard library](https://docs.python.org/3/library/), so you can utilize it rapidly without introducing anything. The `basicConfig()` technique for the logging module is the speediest strategy for planning your lumberjack's ideal direct. Notwithstanding, the [Python documentation](https://docs.python.org/3.7/library/logging.html#logger-objects) proposes making a lumberjack for every module in your application—and arranging a lumberjack for each module game-plan utilizing `basicConfig()` alone can be annoying. Thusly, most applications (counting web systems like Django) use document-based or word-reference-based logging plans not surprisingly. 

The three significant measures of `basicConfig()` are: 

- level: plunging succession of event. The log levels accessible are DEBUG, INFO, WARNING, ERROR, and CRITICAL. The level is set to WARNING of course, which implies that Python's logging module will absolutely ignore any DEBUG or INFO messages. 

- controller: determines where your logs will be piped. Except if determined, the logging library will utilize a StreamHandler to way log messages to sys.stderr (normally the control center). 

- design: The logging library will log messages in the previously mentioned format as a matter of course: `LEVEL>:LOGGER NAME>: MESSAGE>`. In the following module, I'll talk about how to alter this to fuse timestamps and supplemental data that is of significance for investigating. 

Inferable from the way that the logging module just includes WARNING and more significant level logs as a substitute, you might be missing out on genuinely low logs that can work with rhizome cause assessment. Logs are additionally communicated to the control center as opposed to hyperlinking them to a record through the logging module. Maybe than utilizing a `StreamHandler` or a `SocketHandler` to channel logs to the control center or an unessential help over the organization, utilize a FileHandler to log single or extra documents on circle. 

Benefits of logging documents 

- While streaming logs to an outside objective, your application doesn't need to reckon for the possibility of organization related irregularities. In the event of any issues happening while at the same time streaming logs over the organization you'll not lose admittance to those logs since they'll have been upheld on every server. 

- It takes into consideration the making of a more customized logging setup,whereby you're ready to isolate files,tail, and concentrate those documents with a log following asset. 

Representation of basicConfig()... 

The accompanying model executes `basicConfig()` to design an application to DEBUG and highest level messages to a document on disk(illustration.log) and furthermore features that logs should notice a specific arrangement with the incorporation of a timestamp and log seriousness level: 

```python 

import logging 

def word_count(jane): 

logging.basicConfig(level=logging.DEBUG, filename='myid.log', format='%(asctime)s %(levelname)s:%(message)s') 

attempt: 

#include the quantity of words in a document and log the outcome 

with open(jane, 'r') as f: 

file_data = f.read() 

words = file_data.split(" ") 

num_words = len(words) 

logging.debug("this document has %d words", num_words) 

return num_words 

but OSError as e: 

logging.error("error perusing the document") 

[...] 

```

On running the code it will yield the accompanying 

```
2021-11-02 09:17:47,877 DEBUG:this record has 37 words 
2021-11-02 09:17:47,877 ERROR:error perusing the record 
```

Logs follow a specific rules design that includes the accompanying ascribes: 

- %(asctime)s: it yields the date and season of the log, in [local time](https://docs.python.org/3.7/library/time.html#time.asctime). 

- %(levelname)s : the logging level of the message. 

- %(message)s: message 

[For more data on the attributes](https://docs.python.org/3/library/logging.html#logrecord-ascribes) you can remember for the organization of each log record.
### Make a redid arrangement with different lumberjacks and objections.
The more your application ranges, the more you are needed to utilize a solid, explained way of designing each specific lumberjack with the incorporation of lumberjack name as a section of each log. The following are the conversations: 

- arrange various lumberjacks and record the lumberjack personality powerfully 

To self-assertively set the lumberjack title to suit the personality of your module, utilize the logging library's incorporated [getLogger() approach](https://docs.python.org/3.7/library/logging.html#logging.getLogger): 

```

lumberjack = logging.getLogger(__name__) 

```

`getLogger()` sets lumberjack character to _ _identity_ _ , that [concides with the productive ID of the module](https://docs.python.org/3/reference/import.html?highlight=__name__#__name__) from which the strategy is determined. This guides you to realize which portion in your application brought about each message, then, at that point, you can clearly comprehend your logs. The following is a representation of `getLogger()` that infers that assuming your application envelops, lesser_module.py that gets called from another module, higher_module.py, it will set the lumberjack character to partner with the related module. At the point when you change the log design and consolidate the lumberjack identity(identity)s, the subtleties will be shown in each log message. 

```python 

#lesser_module.py 

import logging 

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(name)s %(levelname)s:%(message)s') 

lumberjack = logging.getLogger(__name__) 

def word_count(myfile): 

attempt: 

with open(myfile, 'r') as f: 

file_data = f.read() 

words = file_data.split(" ") 

final_word_count = len(words) 

logger.info("this record has %d words", final_word_count) 

return final_word_count 

but OSError as e: 

logger.error("error perusing the document") 

[...] 

#higher_module.py 

import logging 

import lowermodule 

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(name)s %(levelname)s:%(message)s') 

lumberjack = logging.getLogger(__name__) 

def record_word_count(myfile): 

logger.info("starting the capacity") 

attempt: 

word_count = lowermodule.word_count(myfile) 

with open('wordcountarchive.csv', 'a') as document: 

line = str(myfile) + ',' + str(word_count) 

file.write(row + '\n') 

but: 

logger.warning("could not compose document %s to objective", myfile) 

at last: 

logger.debug("the work is ruined the record %s", myfile) 

```

Running the higher_module.py, the logging will yield the accompanying. 

```

2021-11-02 23:45:23,567 __main__INFO:starting the capacity 

2021-11-02 23:45:23,567 lessermodude INFO:this record has 27 words 

2021-11-02 23:45:23,567 __main__DEBUG:the work is finished the record myid.text 

2021-11-02 23:45:23,567 __main__INFO:starting the capacity 

2021-11-02 23:45:23,567 lessermodule ERROR:[errno 2] No such document or index 

2021-11-02 23:45:23,567 __main__DEBUG:the work is ruined the document nonexistent 

```

Lumberjack personality is set certainly after the timestamp and in this manner you can follow which section produced each message. Inability to characterize the lumberjack with `getLogger()`, each lumberjack personality will appear as a root effectuating to be more muddled in seeing which messages are produced by higher module in opposition to the lesser module. Messages that were created from higher_module.py counts the __main__ [module](https://docs.python.org/3/library/__main__.html) as the lumberjack personality since the higher_module.py was executed at the high levels script. Remembering that we are powerfully fusing the lumberjack way of life as a section of the log design, both of these lumberjacks are set up with the equivalent `basicConfig()`. 

- use fileConfig() to send out logs to a few areas. 

Utilizing record based (fileConfig()) or [dictionary-based (dictConfig()) configurations](https://docs.python.org/3.7/library/logging.config.html#logging.config.dictConfig) gives admittance to order more custom arranging and directing choices for each lumberjack in your application and commodity logs to a few areas. 

A logging setup record needs to contain most extreme three sections: 

- `[loggers]`: the personality of the lumberjacks you will design. 

- `[handlers]`: controllers intended to be utilized by these lumberjacks. 

- `[formatters]`: the structure you need each lumberjack to follow. 

Each part should annex a comma-isolated rundown of at least one `keys: keys=handler1,handler2,handler3,[....]`. Keys direct the personality of different parts that you will be needed to design, arranged as `[<SECTION_NAME>_<KEY_NAME>]`, by which the fragment name is either lumberjack, controller, or formatter. 

The following is a basic outline of a logging setup document 

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

args=("/way/to/log/file.log",) 

[formatter_simpleFormatter] 

format=%(asctime)s %(name)s - %(levelname)s:%(message)s 

```

Python documentation directs that only one overseer can be appended to one lumberjack. More data on engendering see the [documentation](https://docs.python.org/3/library/logging.html#logging.Logger.propagate).Taking a gander at the outline '( higher module and lesser module)', the two lumberjacks will give a DEBUG yield and high-need signs in the arrangement '(formatter_simpleFormatter)' and incorporates them into a log record (file.log) i.e: 

This will take out the need to annex `logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(name)s %(levelname)s:%(message)s')` in your portions. 

In the event that you've incorporated the above logging design then you can add `logging.config.fileConfig()`. 

``` 
import logging.config 

logging.config.fileConfig('/way/to/logging.ini', disable_existing_loggers=False) 

lumberjack = logging.getLogger(__name__) 

```

### Fuse tracebacks and exceptional case managing in your logs. 

Logging tracebacks in your exception logs are huge in researching. `Logging.error()` doesn't connect any tracebacks nuances anyway it shows exception as an error.Set the sys.exc_info to True to enable `logging.error()` get tracebacks. 

manual for showing the usage of `exc_info` : 

```python 

#lesser_module.py 

logging.config.fileConfig('/way/to/logging.ini', disable_existing_loggers=False) 

logger = logging.getLogger(__name__) 

def word_count(myid): 

endeavor: 

#remember the number of words for a record, file, and log the result 

[...] 

be that as it may, OSError as e: 

logger.error(e) 

logger.error(e, exc_info=True) 

[...] 

```

On running the code it yields the going with: 

``` 

2021-11-03 00:57:48,351 lowermodule - ERROR:[Errno 2] No such record or inventory: 'nonexistentfile.txt' 

2021-11-03 00:57:48,351 lowermodule - ERROR:[Errno 2] No such record or inventory: 'nonexistentfile.txt' 

Traceback (most recent call last): 

Record "/home/molly/logstest/lesser_module.py", line 14, in word_count 

with open(myfile, 'r') as f: 

FileNotFoundError: [Errno 2] No such document or inventory: 'nonexistentfile.txt' 

```

First-line shows a bumble message("No such archive or file"). 

The accompanying line shows how to attach `exc_info=True to the logger.error()` engages you to get the uncommon case type `(FileNotFoundError)` and traceback which fuses information about the limit and line number where the exception was capable. 

- Recording unhandled exceptional cases: 

It is difficult to go before and resolve each achievable exceptional case. Fundamentally, guarantee your logs can get every exclusion and you can deal with them later. 

An unhandled exclusion happens when the application code doesn't true to form handle extraordinary cases, that are outside the `try...except` block. For instance, when you endeavor to open a record on a plate, it's anything but a surprising issue for the archive to not exist. The .NET Framework will then, throw a 'FileNotFoundException'. 

If it happens it doesn't find the right unique case type, the interpreter incorporates [sys.excepthook()](https://docs.python.org/3/library/sys.html#sys.excepthook) with three conflicts: exception class, the uncommon case event, and traceback. More to that you can use python's standard [traceback lirary](https://docs.python.org/3/library/traceback.html) to coordinate traceback and connect it in the log message in an event as under: 

```python 

# lesser_module.py 

import logging.config 

import traceback 

logging.config.fileConfig('logging.ini', disable_existing_loggers=False) 

logger = logging.getLogger(__name__) 

def word_count(myid): 

endeavor: 

# remember the number of words for a record, file, and log the result 

with open(myid, 'r+') as f: 

file_data = j.read() 

words = file_data.split(" ") 

final_word_count = len(words) 

logger.info("this document has %d words", final_word_count) 

j.write ("this document has %d words", final_word_count) 

return final_word_count 

however, OSError as r: 

logger.error(r, exc_info=True) 

be that as it may: 

logger.error("uncaught exceptional case: %s", traceback.format_exc()) 

return False 

in case __name__ == '__main__': 

word_count('myfile.txt') 

```

The yield will be, 

```

exception doesn't manage yet gets logged, because of our traceback code 

2021-11-03 00:22:31,891 lowermodule - ERROR:uncaught exceptional case: Traceback (most recent call last): 

Archive "/home/molly/logstest/lesser_module.py", line 23, in word_count 

j.write("this archive has %d words", final_word_count) 

TypeError: create() takes unequivocally one dispute (2 given) 

```

This dictates that the code contains a `TypeError` unique case that isn't dealt with in the endeavor except for reasoning, yet since we fused the 'traceback' code, it will get logged.

### To work with investigating, design your logs in JSON and merge them 

In this part, I will examine how to style signs in JSON, make redid ascribes, unify and break down information with a log the board answer to gain a superior comprehension of use execution, disappointments, and considerably more. 

- Style signs in JSON. 
At the point when your framework will in general produce numerous logs in a given term, it becomes bothersome to recognize logs that can help you during investigating. Generally, when the logs are dispersed either in various servers, documents, or administrations. Bringing together your logs helps you when you need to look and dissect your logs.JSON design/style is significant in that it is effectively adaptable. For example, on the off chance that you want to add ascribes to each log design you won't have to refresh your log handling pathways each time you add or eliminate credits from your log design. The python library that will empower you to change over your logs into JSON design is [python-json-logger](https://github.com/madzak/python-json-lumberjack). 

The initial step is to introduce it in your current circumstance: 
```
pip introduce python-json-lumberjack 

``` 

After establishment, you'll need to refresh design records to make the current formatter redid or you can add a new formatter that will style signs in JSON ([formatter_json]). JSON formatter utilizes [pythonjsonlogger.jsonlogger.JsonFormater class](https://github.com/madzak/python-json-logger#using-a-config-document). You can determine the characteristics you need to remember for each log record like in the outline beneath.
```python
[loggers]
keys=root,lesser_module

[handlers]
keys=consoleHandler,fileHandler

[formatters]
keys=simpleFormatter,json

[logger_root]
level=DEBUG
handlers=consoleHandler

[logger_lesser_module]
level=DEBUG
handlers=fileHandler
qualname=lesser_module

[handler_consoleHandler]
class=StreamHandler
level=DEBUG
formatter=simpleFormatter
args=(sys.stdout,)

[handler_fileHandler]
class=FileHandler
level=DEBUG
formatter=json
args=("/home/emily/myapp.log",)

[formatter_json]
class=pythonjsonlogger.jsonlogger.JsonFormatter
format=%(asctime)s %(name)s %(levelname)s %(message)s

[formatter_simpleFormatter]
format=%(asctime)s %(name)s - %(levelname)s:%(message)s
```
Logs that are sent to the console `(with consoleHandler)` follow the `simpleFormatter` style to enhance readability. After the inclusion of pythonjsonlogger.jsonlogger.JsonFormatter class in your configuration file, the fileConfig() function will be able to create the JsonFormatter if the code runs in an environment that is able to import pythonjsonlogger. In case you're not utilizing record based setup, you should import the python-json-lumberjack library in your application code, and characterize a controller and formatter, as depicted in the [documentation](https://github.com/madzak/python-json-logger#integrating-with-pythons-logging-framework):

```
from pythonjsonlogger import jsonlogger 

lumberjack = logging.getLogger() 

logHandler = logging.StreamHandler() 

formatter = jsonlogger.JsonFormatter() 

logHandler.setFormatter(formatter) 

logger.addHandler(logHandler)
```
- Add custom ascribes to your JSON logs 
One more advantage of signing in JSON is that you can add credits that an outer log the executives administration can parse and investigate consequently. Prior we arranged the organization to incorporate standard ascribes like `%(asctime)s`, `%(name)s`, `%(levelname)s`, and `%(message)s`. You can likewise log custom ascribes by utilizing the python-json-logs "extra" field. Underneath, we made another quality that tracks the length of this activity:
```
#lesser_module.py 
import logging.config 
import traceback 
import time 
def word_count(myid): 
lumberjack = logging.getLogger(__name__) 
logging.fileConfig('logging.ini', disable_existing_loggers=False) 
attempt: 

starttime = time.time() 

with open(myid, 'r') as j: 

file_data = j.read() 

words = file_data.split(" ") 

final_word_count = len(words) 

endtime = time.time() 

term = endtime - starttime 

logger.info("this record has %d words", final_word_count, extra={"run_duration":duration}) 

return final_word_count 

but OSError as r: 

[...]
```
In the program above, `run_duration`, portrays the estimation of the span of the action right away.

```
{"asctime": "2021-11-05 16:45:35,861", "name": "lesser_module", "levelname": "Data", "message": "this record has 89 words", "run_duration": 6.675498706528215e-05}
```
- Relate logs with different wellsprings of observing information.
When you're unifying your Python logs with observing assistance, you can begin investigating them close by circulated demand follows and foundation measurements to get further perceivability into your applications. Assistance like Datadog can interface logs with measurements and application execution observing information to assist you with seeing the full picture.

### Conclusion
The Logging module simplifies everything and eases the pressure of complexity. It is considered to be really versatile. Its arrangement is very sensible and ought to oblige your usage case out of the box. You can add fundamental logging to a little project, or you can go comparatively as making your own custom log levels, regulator classes, and that is just a glimpse of something larger in the event that you are working on a significant errand. 

If you haven't been using marking in your applications, this is a good chance to start. Exactly when done right, logging will without a doubt take out a huge load of contact from your progression cycle and help you with finding opportunities to take your application to a more significant level. I prefer logging since it simplifies load complexity to be very precise and understandable.

### Further activity reading

More on python logs [visit](https://docs.python.org/3/library/logging.html)

Happy coding....
